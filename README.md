# String case converter and parser
This tiny package provides means for converting strings between different cases - such as converting `camelCase` to `snake_case` and so on. Amount of different cases isn't strictly defined - you can convert to your own case if you wish.

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
The package provides two functions and two enums:
```js
import caser from "@stein197/caser";

// Use predefined case names
caser.convert("camelCase", caser.Casing.Pascal); // "CamelCase"
caser.convert("PascalCase", caser.Casing.Kebab); // "pascal-case"
// Or use mask
caser.convert("Some word", caser.CasingOption.Lowercase | case.CasingOption.FirstWordLetterUppercase, "/"); // "Some/word"

// You can split any string as well
caser.split("backgroundColor"); // ["background", "Color"]
```
The library automatically detects where it should split the string. If you prefer to use predefined case names instead of mask (which is less flexible) then the following names are available:

- `Casing.Camel`
- `Casing.Header`
- `Casing.Kebab`
- `Casing.Pascal`
- `Casing.Snake`
- `Casing.Upper`

## NPM scripts
- `clean` cleans working directory from compiled files
- `compile` compiles source code
- `test` runs unit tests
- `build` installs all dependencies and builds the entire project (including tests). Outputs index.js for Node.js environment and caser.min.js for browser.
