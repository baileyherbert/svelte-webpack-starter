# Svelte Webpack Starter
This is my personal starter template for creating [Svelte](https://svelte.dev) apps. It's preconfigured out of the box with Webpack, TypeScript, SASS, Babel, Autoprefixer, and hot module replacement. I've kept it minimal and organized so it's easy to build upon and/or customize.

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
	- [Path aliases](#path-aliases)

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

To run the production build, use the `start` command and open [http://localhost:8080](http://localhost:8080) in your browser.

```bash
npm run start
```

## Usage

### Global styles
The `/src/styles/index.scss` file will be compiled and embedded at the top of the bundled CSS, effectively making it a global stylesheet. You can easily add additional stylesheets to the bundle by editing the `stylesheets` variable at the top of `webpack.config.js`:

```js
const stylesheets = [
    './src/styles/index.scss'
];
```

### Single page applications
If you're building a single page application (which needs multiple routes), edit your package.json file:

- Add the `--history-api-fallback` flag to the `"dev"` command
- Add the `--single` flag to the `"start"` command.

```json
"scripts": {
    "dev": "webpack-dev-server [...] --history-api-fallback",
    "start": "serve [...] --single",
}
```

### Targeting browsers
[Babel](https://babeljs.io/docs/en/) and [Autoprefixer](https://www.npmjs.com/package/autoprefixer) will be used to make bundles work in your target browsers, which are listed under `browserslist` in your package.json file. Check out the list of [browserslist queries](https://github.com/browserslist/browserslist#full-list) to customize this.

```json
{
    "browserslist": [
        "defaults"
    ]
}
```

Note that Babel is only active for production builds by default, so it won't slow down your development.

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

### Path aliases
Path aliases are automatically applied to webpack from the `tsconfig.json` file. This helps shorten the import paths for directories that you commonly import from. For example:

```json
"paths": {
	"stores/*": ["src/some/path/to/stores/*"]
}
```

```js
import { users } from 'stores/users';
```

The root directory is configured as a base path for imports. This means you can also import modules with an absolute path from anywhere in the project.

```js
import { users } from 'src/some/path/to/stores/users';
```
