# String case converter and parser
[![](https://img.shields.io/github/license/stein197/js-caser)](LICENSE)
![](https://img.shields.io/npm/v/@stein197/caser)

This tiny package provides means for converting strings between different cases - such as converting `camelCase` to `snake_case` and so on.

## Installation
```
npm install @stein197/caser
```

## Usage:
```ts
import * as caser from "@stein197/caser";

caser.covert("HTMLElement", "header", true); // "HTML-Element"
caser.convert("CONSTANT_VALUE", {separator: "-", leadCharCase: "upper", firstCharCase: "upper", case: "lower"}, false); // "Constant-Value"
caser.split("camelCase"); // ["camel", "Case"]
```

### Predefined cases
- `flat` flatcase
- `camel` camelCase
- `header` Header-Case
- `kebab` kebab-case
- `pascal` PascalCase
- `snake` snake_case
- `upper` UPPER_CASE
- `train` TRAIN-CASE
> For detailed documentation, refer to the source code docblocks

## NPM scripts
- `clean` cleans working directory from compiled files
- `build` compiles source code
- `test` runs unit tests
