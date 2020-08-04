import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import hotReload from 'rollup-plugin-hot';

const development = !!process.env.ROLLUP_WATCH;
const production = !development;

const useLiveReload = !!process.env.LIVERELOAD;
const useHotReload = development && !useLiveReload;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// Enable run-time checks when watching
			dev: development,

			// We'll extract any component CSS out into a separate file - better for performance
			css: css => css.write('public/build/bundle.css'),

			// Enable hot module reloading while in watch mode
			hot: useHotReload && {
				// Prevent preserving local component state
				noPreserveState: false,

				// If this string appears anywhere in your component's code, then local state won't be preserved, even
				// when noPreserveState is false
				noPreserveStateKey: '@!hmr',

				// Prevent doing a full reload on next HMR update after fatal error
				noReload: false,

				// Try to recover after runtime errors in component init
				optimistic: false,

				// By default, when the hot option is enabled, the `css` option of this plugin (same option as official
				// plugin) will be changed to `false`, because extracting CSS doesn't work with HMR currently. You can
				// use this option to disable this behaviour if it cause problems with your setup.
				noDisableCss: false,

				// When you change only the <style> part of a component, then only the CSS will be reinjected. Existing
				// component instances won't be recreated. Set `false` to force recreation.
				injectCss: true,

				// Delay to mitigate FOUC (flash of unstyled content) when a component is updated, before the new
				// version with the new CSS is loaded.
				cssEjectDelay: 100,

				// Prevent adding an HMR accept handler to components with accessors option to true, or to components
				// with named exports (from <script context="module">). This have the effect of recreating the consumer
				// of those components, instead of the component themselves, on HMR updates. This might be needed to
				// reflect changes to accessors / named exports in the parents, depending on how you use them.
				acceptAccessors: false,
				acceptNamedExports: false,
			},

			// Options for preprocessors
			preprocess: preprocess({
				sass: {},
			}),
		}),

		// If you have external dependencies installed from npm, you'll most likely need these plugins. In some cases
		// you'll need additional configuration - consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// TypeScript compilation options
		typescript({
			sourceMap: development
		}),

		// In dev mode, call `npm run start` once the bundle has been generated
		development && serve(),

		// Watch the `public` directory and refresh the browser on changes when not in production
		useLiveReload && livereload('public'),

		// If we're building for production, use terser to minify and mangle the output
		production && terser({
			sourceMap: false,
			ie8: false
		}),

		// Options for hot module reloading
		useHotReload && hotReload({
			public: 'public',
			inMemory: true,
			compatModuleHot: !development
		}),
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	// Kills the server if it's running, using `global` to work across configuration reloads.
	function kill() {
		if (global.server) {
			server.kill(0);
		}
	}

	return {
		writeBundle() {
			if (!global.server) {
				global.server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});

				// Kill the server before exiting
				require('exit-hook')(kill);
			}
		}
	};
}
