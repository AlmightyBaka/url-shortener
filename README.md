# url-shortener

Shortens input URL

```
> index.js -h

Usage: url-shortener [options] [command]

Options:
  -h, --help  output usage information

Commands:
  server      Launch an API endpoint for getting URLs
  <url>      Get a full or shortened version of URL, depending on the input

```

This app is a very simple version of an URL shortener API.
When a new URL is sent to it, it checks if it already exists in the Redis database,
and returns a JSON containing the short URL version.
Sending this short URL to the same API endpoint will return a full URL as well as the amount of times this URL was requested.

#### Requirements

Redis server should be running. All configs are stored in JSON5 format in `config` folder.

##

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
