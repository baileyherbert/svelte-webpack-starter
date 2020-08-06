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

> 💡  You can edit `webpack.config.js` to change this path or remove the file from the bundle.

### Single page applications
If you're building a single page application (which needs multiple routes), edit the `"dev"` command in your package.json and add the `--history-api-fallback` flag.

```js
"dev": "webpack-dev-server [...] --history-api-fallback"
```

### Targeting browsers
This template will use [Babel](https://babeljs.io/docs/en/) and [Autoprefixer](https://www.npmjs.com/package/autoprefixer) to make the bundles work in your target browsers, which are listed under `browserslist` in your package.json file. Check out the list of [browserslist queries](https://github.com/browserslist/browserslist#full-list) to customize this.

```json
{
	"browserslist": [
		"defaults"
	]
}
```

Note that Babel is only active for production builds, so it won't slow down your development.

### Disabling Babel
If you don't need to support older browsers, you can reduce your bundle size by disabling Babel. Just change the `useBabel` variable at the top of `webpack.config.js`:

```js
const useBabel = false;
```

### Enabling source maps in production
By default, this template won't generate source maps for production bundles in order to avoid exposing your source code. If you need to enable source maps in production (such as for debugging), update the `sourceMapsInProduction` variable at the top of `webpack.config.js`.

```js
const sourceMapsInProduction = true;
```

### Path mapping
By default, the `src` alias is mapped to your `src/` directory, which means you can import like this from anywhere in the app:

```js
import Navbar from 'src/components/Navbar.svelte';
```

If you wish to add additional aliases, you only need to edit the `paths` property in your `tsconfig.json`, and they will be automatically applied to Webpack:

```json
"paths": {
	"src": ["src"]
}
```

Note that you *do not* need to add the alias to your Webpack configuration. It will be applied automatically from your tsconfig file.
