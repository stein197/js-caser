import * as mocha from "mocha";
import * as assert from "assert";
import * as caser from ".";

const testCases: [data: string, parsed: string[], camel: string, upper: string, snake: string, kebab: string, pascal: string, header: string][] = [
	["", [], "", "", "", "", "", ""],
	["a", ["a"], "a", "A", "a", "a", "A", "A"],
	["A", ["A"], "a", "A", "a", "a", "A", "A"],
	["Aa", ["Aa"], "aa", "AA", "aa", "aa", "Aa", "Aa"],
	["aA", ["a", "A"], "aA", "A_A", "a_a", "a-a", "AA", "A-A"],
	["AA", ["AA"], "aa", "AA", "aa", "aa", "Aa", "Aa"],
	["aAbB", ["a", "Ab", "B"], "aAbB", "A_AB_B", "a_ab_b", "a-ab-b", "AAbB", "A-Ab-B"],
	["AaBb", ["Aa", "Bb"], "aaBb", "AA_BB", "aa_bb", "aa-bb", "AaBb", "Aa-Bb"],
	["camelCase", ["camel", "Case"], "camelCase", "CAMEL_CASE", "camel_case", "camel-case", "CamelCase", "Camel-Case"],
	["UPPER_CASE", ["UPPER", "CASE"], "upperCase", "UPPER_CASE", "upper_case", "upper-case", "UpperCase", "Upper-Case"],
	["lowercase", ["lowercase"], "lowercase", "LOWERCASE", "lowercase", "lowercase", "Lowercase", "Lowercase"],
	["snake_case", ["snake", "case"], "snakeCase", "SNAKE_CASE", "snake_case", "snake-case", "SnakeCase", "Snake-Case"],
	["kebab-case", ["kebab", "case"], "kebabCase", "KEBAB_CASE", "kebab_case", "kebab-case", "KebabCase", "Kebab-Case"],
	["PascalCase", ["Pascal", "Case"], "pascalCase", "PASCAL_CASE", "pascal_case", "pascal-case", "PascalCase", "Pascal-Case"],
	["Header-Case",["Header", "Case"], "headerCase", "HEADER_CASE", "header_case", "header-case", "HeaderCase", "Header-Case"],
	["innerHTML", ["inner", "HTML"], "innerHtml", "INNER_HTML", "inner_html", "inner-html", "InnerHtml", "Inner-Html"],
	["SVGElement", ["SVG", "Element"], "svgElement", "SVG_ELEMENT", "svg_element", "svg-element", "SvgElement", "Svg-Element"],
	["MOSTComplexExample-Of_THIS--test___CasesMAP", ["MOST", "Complex", "Example", "Of", "THIS", "test", "Cases", "MAP"], "mostComplexExampleOfThisTestCasesMap", "MOST_COMPLEX_EXAMPLE_OF_THIS_TEST_CASES_MAP", "most_complex_example_of_this_test_cases_map", "most-complex-example-of-this-test-cases-map", "MostComplexExampleOfThisTestCasesMap", "Most-Complex-Example-Of-This-Test-Cases-Map"],
];


mocha.describe("convert()", () => {
	mocha.describe("convert(string, Casing)", () => {
		for (const [data, , camel, upper, snake, kebab, pascal, header] of testCases) {
			mocha.it(`convert("${data}", caser.Casing.Camel) == "${camel}"`, () => assert.equal(caser.convert(data, caser.Casing.Camel, false), camel));
			mocha.it(`convert("${data}", caser.Casing.Header) == "${header}"`, () => assert.equal(caser.convert(data, caser.Casing.Header, false), header));
			mocha.it(`convert("${data}", caser.Casing.Kebab) == "${kebab}"`, () => assert.equal(caser.convert(data, caser.Casing.Kebab, false), kebab));
			mocha.it(`convert("${data}", caser.Casing.Pascal) == "${pascal}"`, () => assert.equal(caser.convert(data, caser.Casing.Pascal, false), pascal));
			mocha.it(`convert("${data}", caser.Casing.Snake) == "${snake}"`, () => assert.equal(caser.convert(data, caser.Casing.Snake, false), snake));
			mocha.it(`convert("${data}", caser.Casing.Upper) == "${upper}"`, () => assert.equal(caser.convert(data, caser.Casing.Upper, false), upper));
		}
	});
});

mocha.describe("split(string)", () => testCases.forEach(v => mocha.it(`split("${v[0]}") == [${v[1].map(s => `"${s}"`).join(", ")}]`, () => assert.deepStrictEqual(caser.split(v[0]), v[1]))));
