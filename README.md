# Svelte Webpack Starter
This is my personal starter template for creating [Svelte](https://svelte.dev) apps. It's preconfigured out of the box with:

- Webpack
- Hot module replacement
- TypeScript
- SASS
- Babel
- Autoprefixer

---

- [Getting started](#getting-started)
	- [Installation](#installation)
	- [Starting the development server](#starting-the-development-server)
	- [Building for production](#building-for-production)
- [Usage](#usage)
	- [Global styles](#global-styles)
	- [Single page applications](#single-page-applications)
	- [Targeting browsers](#targeting-browsers)
	- [Disabling Babel](#disabling-babel)
	- [Enabling source maps in production](#enabling-source-maps-in-production)
	- [Path mapping](#path-mapping)

---

## Getting started

### Installation
To quickly get started with this template, use [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit baileyherbert/svelte-webpack-starter svelte-app
cd svelte-app
```

Then, install dependencies.

```bash
npm install
```

### Starting the development server
The `dev` script will compile the app, start the development server, and enable hot replacement for components and styles. Open [http://localhost:8080](http://localhost:8080) in your browser to see the app.

```bash
npm run dev
```

### Building for production
The `build` script will compile the app for production. By default, the bundle will be created at `/public/build/`, which means your public directory will contain everything you need to run the app.

```bash
npm run build
```

To run the production build, use the `start` command and open [http://localhost:8080](http://localhost:8080) in your browser. You can change the port by modifying the command your package.json.

```bash
npm run start
```

## Usage

### Global styles
There's no `global.css` file in this template. Instead, the `/src/styles/index.scss` file will be compiled and embedded at the top of the bundled CSS, effectively making it a global stylesheet.

> 💡  You can edit `webpack.config.js` to change or remove this file from the bundle, or to use a different preprocessor.

### Single page applications
If you're building a single page application (which needs multiple routes), edit the `"dev"` command in your package.json and add the `--history-api-fallback` flag.

```js
"dev": "webpack-dev-server [...] --history-api-fallback"
```

### Targeting browsers
This template will automatically convert your CSS and JavaScript output, using Autoprefixer and Babel, in order to work for your target browsers as listed under `browserslist` in your package.json file. Check out the list of [browserslist queries](https://github.com/browserslist/browserslist#full-list) to customize this.

```json
{
	"browserslist": [
		"defaults"
	]
}
```
Note that you will need to restart the development server before these changes take affect.

### Disabling Babel
In production builds, Babel will transpile your bundle to work on your target browsers. This will increase your bundle size. If you don't need to support older browsers, you can disable Babel entirely by changing the `useBabel` variable at the top of `webpack.config.js`:

```js
const useBabel = false;
```

### Enabling source maps in production
By default, this template won't generate source maps for production bundles in order to avoid exposing your source code. If you need to enable source maps in production (such as for debugging), simply update the `sourceMapsInProduction` variable at the top of `webpack.config.js`.

```js
const sourceMapsInProduction = true;
```

### Path mapping
This template automatically configures Webpack's module resolution aliases according to your `tsconfig.json` file. By default, the `src` alias is mapped to your `src/` directory, which means you can import like this from anywhere in the app:

```js
import Navbar from 'src/components/Navbar.svelte';
```

If you wish to add additional aliases, you only need to edit the `paths` property in your `tsconfig.json`, and they will be automatically applied to Webpack:

```json
"paths": {
	"src": ["src"]
}
```
