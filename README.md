# Svelte Template

This is my personal starter template for [Svelte](https://svelte.dev) apps. It's preconfigured out of the box for TypeScript, SASS, and Hot Module Reloading.

## Get started

I recommend using [degit](https://github.com/Rich-Harris/degit) to clone this repo:

```bash
npx degit baileyherbert/svelte-template svelte-app
cd svelte-app
```

Install dependencies...

```bash
npm install
```

Start the development server...

```bash
npm run dev
```

Open your browser to [http://localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src` and once you save it, your browser should automatically load the new changes.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using classic livereload

The default `dev` script uses hot module reloading, which means if you modify a component's source code, the browser will only reload that specific component and preserve the current state where possible.

If hot reloading is causing trouble, you can use the `dev:livereload` script to enable the classic livereload, which will reload the entire app each time changes are saved.
