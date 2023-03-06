import "mocha";
import * as assert from "assert";
import * as caser from ".";

const testCases: [data: string, parsed: string[], camel: string, upper: string, snake: string, kebab: string, pascal: string, header: string, flat: string, train: string][] = [
	["", [], "", "", "", "", "", "", "", ""],
	["a", ["a"], "a", "A", "a", "a", "A", "A", "a", "A"],
	["A", ["A"], "a", "A", "a", "a", "A", "A", "a", "A"],
	["Aa", ["Aa"], "aa", "AA", "aa", "aa", "Aa", "Aa", "aa", "AA"],
	["aA", ["a", "A"], "aA", "A_A", "a_a", "a-a", "AA", "A-A", "aa", "A-A"],
	["AA", ["AA"], "aa", "AA", "aa", "aa", "Aa", "Aa", "aa", "AA"],
	["aAbB", ["a", "Ab", "B"], "aAbB", "A_AB_B", "a_ab_b", "a-ab-b", "AAbB", "A-Ab-B", "aabb", "A-AB-B"],
	["AaBb", ["Aa", "Bb"], "aaBb", "AA_BB", "aa_bb", "aa-bb", "AaBb", "Aa-Bb", "aabb", "AA-BB"],
	["camelCase", ["camel", "Case"], "camelCase", "CAMEL_CASE", "camel_case", "camel-case", "CamelCase", "Camel-Case", "camelcase", "CAMEL-CASE"],
	["UPPER_CASE", ["UPPER", "CASE"], "upperCase", "UPPER_CASE", "upper_case", "upper-case", "UpperCase", "Upper-Case", "uppercase", "UPPER-CASE"],
	["lowercase", ["lowercase"], "lowercase", "LOWERCASE", "lowercase", "lowercase", "Lowercase", "Lowercase", "lowercase", "LOWERCASE"],
	["snake_case", ["snake", "case"], "snakeCase", "SNAKE_CASE", "snake_case", "snake-case", "SnakeCase", "Snake-Case", "snakecase", "SNAKE-CASE"],
	["kebab-case", ["kebab", "case"], "kebabCase", "KEBAB_CASE", "kebab_case", "kebab-case", "KebabCase", "Kebab-Case", "kebabcase", "KEBAB-CASE"],
	["PascalCase", ["Pascal", "Case"], "pascalCase", "PASCAL_CASE", "pascal_case", "pascal-case", "PascalCase", "Pascal-Case", "pascalcase", "PASCAL-CASE"],
	["Header-Case",["Header", "Case"], "headerCase", "HEADER_CASE", "header_case", "header-case", "HeaderCase", "Header-Case", "headercase", "HEADER-CASE"],
	["innerHTML", ["inner", "HTML"], "innerHtml", "INNER_HTML", "inner_html", "inner-html", "InnerHtml", "Inner-Html", "innerhtml", "INNER-HTML"],
	["SVGElement", ["SVG", "Element"], "svgElement", "SVG_ELEMENT", "svg_element", "svg-element", "SvgElement", "Svg-Element", "svgelement", "SVG-ELEMENT"],
	["MOSTComplexExample-Of_THIS--test___CasesMAP", ["MOST", "Complex", "Example", "Of", "THIS", "test", "Cases", "MAP"], "mostComplexExampleOfThisTestCasesMap", "MOST_COMPLEX_EXAMPLE_OF_THIS_TEST_CASES_MAP", "most_complex_example_of_this_test_cases_map", "most-complex-example-of-this-test-cases-map", "MostComplexExampleOfThisTestCasesMap", "Most-Complex-Example-Of-This-Test-Cases-Map", "mostcomplexexampleofthistestcasesmap", "MOST-COMPLEX-EXAMPLE-OF-THIS-TEST-CASES-MAP"],
];

describe("convert()", () => {
	it("convert(\"...\", {...})", () => {
		assert.equal(caser.convert("HTMLElement", {separator: ":"}, false), "html:element");
		assert.equal(caser.convert("HTMLElement", {separator: ":"}, true), "HTML:element");
	});
	describe("convert(\"...\", \"...\")", () => {
		for (const [data, , camel, upper, snake, kebab, pascal, header, flat, train] of testCases) {
			it(`convert("${data}", "camel") == "${camel}"`, () => assert.equal(caser.convert(data, "camel", false), camel));
			it(`convert("${data}", "header") == "${header}"`, () => assert.equal(caser.convert(data, "header", false), header));
			it(`convert("${data}", "kebab") == "${kebab}"`, () => assert.equal(caser.convert(data, "kebab", false), kebab));
			it(`convert("${data}", "pascal") == "${pascal}"`, () => assert.equal(caser.convert(data, "pascal", false), pascal));
			it(`convert("${data}", "snake") == "${snake}"`, () => assert.equal(caser.convert(data, "snake", false), snake));
			it(`convert("${data}", "upper") == "${upper}"`, () => assert.equal(caser.convert(data, "upper", false), upper));
			it(`convert("${data}", "flat") == "${flat}"`, () => assert.equal(caser.convert(data, "flat", false), flat));
			it(`convert("${data}", "train") == "${train}"`, () => assert.equal(caser.convert(data, "train", false), train));
		}
	});
});

describe("split(string)", () => testCases.forEach(v => it(`split("${v[0]}") == [${v[1].map(s => `"${s}"`).join(", ")}]`, () => assert.deepStrictEqual(caser.split(v[0]), v[1]))));

// TODO
describe("detect()", () => {});
