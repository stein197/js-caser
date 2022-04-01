# String case converter and parser
[![](https://img.shields.io/github/license/stein197/js-caser)](LICENSE)
![](https://img.shields.io/npm/v/@stein197/caser)

This tiny package provides means for converting strings between different cases - such as converting `camelCase` to `snake_case` and so on.

## Installation
For Node.js:
```
npm i @stein197/caser
```
For browser:
```html
<script src="caser.min.js"></script>
```
If you use embedded version for browser then the `caser` global variable will be defined.

## Usage:
The package provides two functions and one enum:
```js
caser.convert("camelCase", caser.Casing.Pascal); // "CamelCase"
caser.convert("PascalCase", caser.Casing.Kebab); // "pascal-case"
caser.split("backgroundColor");                  // ["background", "Color"]
```
The library automatically detects where it should split the string. There are 6 casing options available:

```ts
caser.Casing.Camel;  // camelCase
caser.Casing.Header; // Header-Case
caser.Casing.Kebab;  // kebab-case
caser.Casing.Pascal; // PascalCase
caser.Casing.Snake;  // snake_case
caser.Casing.Upper;  // UPPER_CASE
```

## NPM scripts
- `clean` cleans working directory from compiled files
- `compile` compiles source code
- `test` runs unit tests
- `build` installs all dependencies and builds the entire project (including tests). Outputs index.js for Node.js environment and caser.min.js for browser.
