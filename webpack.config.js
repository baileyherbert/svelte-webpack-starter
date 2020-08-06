const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Preprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const sourceMapsInProduction = false;
const useBabel = true;

const path = require('path');
const sveltePath = path.resolve('node_modules', 'svelte');

module.exports = {
	entry: {
		bundle: [
			'./src/styles/index.scss',
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

if (prod) {
	// Clean the build directory for production builds
	module.exports.plugins.push(new CleanWebpackPlugin());

	// Use babel in production builds
	if (useBabel) {
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

