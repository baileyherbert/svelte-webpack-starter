const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Preprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const path = require('path');
const sveltePath = path.resolve('node_modules', 'svelte');


/**
 * Should source maps be generated alongside your production bundle? This will expose your raw source code, so it's
 * disabled by default.
 */
const sourceMapsInProduction = false;

/**
 * Should we run Babel on builds? This will transpile your bundle in order to work on your target browsers (see the
 * `browserslist` property in your package.json), but will impact bundle size and build speed.
 */
const useBabel = true;

/**
 * Should we run Babel on development builds? If set to `false`, only production builds will be transpiled. If you're
 * only testing in modern browsers and don't need transpiling in development, it is recommended to keep this disabled
 * as it will greatly speed up your builds.
 */
const useBabelInDevelopment = false;

/**
 * One or more stylesheets to compile and add to the beginning of the bundle. By default, both SCSS and CSS files are
 * supported. The order of this array is important, as the order of outputted styles will match. Svelte component
 * styles will always appear last in the bundle.
 */
const stylesheets = [
    './src/styles/index.scss'
];


module.exports = {
    entry: {
        bundle: [
            './src/main.ts'
        ]
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    output: {
        publicPath: '/build/',
        path: __dirname + '/public/build',
        filename: '[name].js',
        chunkFilename: '[name].[id].js'
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader-hot',
                    options: {
                        dev: !prod,
                        emitCss: prod,
                        hotReload: !prod,
                        hotOptions: {
                            // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
                            noPreserveState: false,
                            optimistic: true
                        },
                        preprocess: Preprocess({
                            scss: true,
                            postcss: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        })
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !prod,
                            sourceMap: !prod || sourceMapsInProduction
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        hot: true,
        stats: 'minimal',
        contentBase: 'public',
        watchContentBase: true
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    optimization: {
        minimizer: []
    },
    devtool: (prod && !sourceMapsInProduction) ? false: 'source-map'
};

// Add stylesheets to the build
if (Array.isArray(stylesheets) || typeof stylesheets === 'string') {
    if (!Array.isArray(stylesheets)) {
        stylesheets = [stylesheets];
    }

    module.exports.entry.bundle.unshift.apply(
        module.exports.entry.bundle,
        stylesheets
    );
}

// Load path mapping from tsconfig
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = require('fs').existsSync(tsconfigPath) ? require(tsconfigPath) : {};
if ('compilerOptions' in tsconfig && 'paths' in tsconfig.compilerOptions) {
    const aliases = tsconfig.compilerOptions.paths;
    for (const alias in aliases) {
        const paths = aliases[alias].map(p => path.resolve(__dirname, p));

        if (!(alias in module.exports.resolve.alias) && paths.length) {
            module.exports.resolve.alias[alias] = paths.length > 1 ? paths : paths[0];
        }
    }
}

// These options should only apply to production builds
if (prod) {
    // Clean the build directory for production builds
    module.exports.plugins.push(new CleanWebpackPlugin());

    // Minify CSS
    module.exports.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
            map: sourceMapsInProduction ? {
                inline: false,
                annotation: true
            } : false,
        },
    }));

    // Minify and treeshake JS
    module.exports.optimization.minimizer.push(new TerserPlugin({
        sourceMap: sourceMapsInProduction
    }));
}

// Add babel if enabled
if (useBabel && (prod || useBabelInDevelopment)) {
    module.exports.module.rules.unshift({
        test: /\.(?:svelte|m?js)$/,

        // Svelte internals, under node_modules MUST be included.
        //
        // Babel 7 ignores node_modules automatically, but not if they're
        // explicitely included.
        // see: https://github.com/babel/babel-loader/issues/171#issuecomment-486380160
        //
        include: [
            path.resolve(__dirname, 'src'),
            path.dirname(sveltePath)
        ],
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env'
                    ],
                ],
            },
        },
    });
}
