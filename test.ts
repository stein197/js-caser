import * as mocha from "mocha";
import * as assert from "assert";
import * as caser from ".";

const testCases: [data: string, parsed: string[], camel: string, upper: string, snake: string, kebab: string, pascal: string, header: string, custom: string][] = [
	["", [], "","","","","","",""],
	["a", ["a"], "a","A","a","a","A","A","a"],
	["A", ["A"], "a","A","a","a","A","A","a"],
	["Aa", ["Aa"], "aa","AA","aa","aa","Aa","Aa","aA"],
	["aA", ["a", "A"], "aA","A_A","a_a","a-a","AA","A-A","a/A"],
	["AA", ["AA"], "aa","AA","aa","aa","Aa","Aa","aA"],
	["aAbB", ["a", "Ab", "B"], "aAbB","A_AB_B","a_ab_b","a-ab-b","AAbB","A-Ab-B","a/AB/B"],
	["AaBb", ["Aa", "Bb"], "aaBb","AA_BB","aa_bb","aa-bb","AaBb","Aa-Bb","aA/BB"],
	["camelCase", ["camel", "Case"], "camelCase","CAMEL_CASE","camel_case","camel-case","CamelCase","Camel-Case","cAMEL/CASE"],
	["UPPER_CASE", ["UPPER", "CASE"], "upperCase","UPPER_CASE","upper_case","upper-case","UpperCase","Upper-Case","uPPER/CASE"],
	["lowercase", ["lowercase"], "lowercase","LOWERCASE","lowercase","lowercase","Lowercase","Lowercase","lOWERCASE"],
	["snake_case", ["snake", "case"], "snakeCase","SNAKE_CASE","snake_case","snake-case","SnakeCase","Snake-Case","sNAKE/CASE"],
	["kebab-case", ["kebab", "case"], "kebabCase","KEBAB_CASE","kebab_case","kebab-case","KebabCase","Kebab-Case","kEBAB/CASE"],
	["PascalCase", ["Pascal", "Case"], "pascalCase","PASCAL_CASE","pascal_case","pascal-case","PascalCase","Pascal-Case","pASCAL/CASE"],
	["Header-Case",["Header", "Case"], "headerCase","HEADER_CASE","header_case","header-case","HeaderCase","Header-Case","hEADER/CASE"],
	["innerHTML", ["inner", "HTML"], "innerHtml","INNER_HTML","inner_html","inner-html","InnerHtml","Inner-Html","iNNER/HTML"],
	["SVGElement", ["SVG", "Element"], "svgElement","SVG_ELEMENT","svg_element","svg-element","SvgElement","Svg-Element","sVG/ELEMENT"],
	["MOSTComplexExample-Of_THIS--test___CasesMAP", ["MOST", "Complex", "Example", "Of", "THIS", "test", "Cases", "MAP"], "mostComplexExampleOfThisTestCasesMap","MOST_COMPLEX_EXAMPLE_OF_THIS_TEST_CASES_MAP","most_complex_example_of_this_test_cases_map","most-complex-example-of-this-test-cases-map","MostComplexExampleOfThisTestCasesMap","Most-Complex-Example-Of-This-Test-Cases-Map","mOST/COMPLEX/EXAMPLE/OF/THIS/TEST/CASES/MAP"],
]

const customCase = {
	delimiter: "/",
	mask: caser.Casing.Uppercase | caser.Casing.FirstWordLetterLowercase
};


mocha.describe("convert()", () => {
	mocha.describe("convert(string, Casing, ?string)", () => {
		for (const [data, , , , , , , , custom] of testCases)
			mocha.it(`convert("${data}", <mask>, "${customCase.delimiter}") == "${custom}"`, () => assert.equal(caser.convert(data, customCase.mask, customCase.delimiter), custom));
	});
	mocha.describe("convert(string[], Casing, ?string)", () => {
		for (const [, parsed, , , , , , , custom] of testCases)
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], <mask>, "${customCase.delimiter}") == "${custom}"`, () => assert.equal(caser.convert(parsed, customCase.mask, customCase.delimiter), custom));
	});
	mocha.describe("convert(string, Commons)", () => {
		for (const [data, , camel, upper, snake, kebab, pascal, header] of testCases) {
			mocha.it(`convert("${data}", "camel") == "${camel}"`, () => assert.equal(caser.convert(data, "camel"), camel));
			mocha.it(`convert("${data}", "upper") == "${upper}"`, () => assert.equal(caser.convert(data, "upper"), upper));
			mocha.it(`convert("${data}", "snake") == "${snake}"`, () => assert.equal(caser.convert(data, "snake"), snake));
			mocha.it(`convert("${data}", "kebab") == "${kebab}"`, () => assert.equal(caser.convert(data, "kebab"), kebab));
			mocha.it(`convert("${data}", "pascal") == "${pascal}"`, () => assert.equal(caser.convert(data, "pascal"), pascal));
			mocha.it(`convert("${data}", "header") == "${header}"`, () => assert.equal(caser.convert(data, "header"), header));
		}
	});
	mocha.describe("convert(string[], Commons)", () => {
		for (const [, parsed, camel, upper, snake, kebab, pascal, header] of testCases) {
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "camel") == "${camel}"`, () => assert.equal(caser.convert(parsed, "camel"), camel));
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "upper") == "${upper}"`, () => assert.equal(caser.convert(parsed, "upper"), upper));
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "snake") == "${snake}"`, () => assert.equal(caser.convert(parsed, "snake"), snake));
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "kebab") == "${kebab}"`, () => assert.equal(caser.convert(parsed, "kebab"), kebab));
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "pascal") == "${pascal}"`, () => assert.equal(caser.convert(parsed, "pascal"), pascal));
			mocha.it(`convert([${parsed.map(s => `"${s}"`).join(", ")}], "header") == "${header}"`, () => assert.equal(caser.convert(parsed, "header"), header));
		}
	});
});


mocha.describe("split(string)", () => testCases.forEach(v => mocha.it(`split("${v[0]}") == [${v[1].map(s => `"${s}"`).join(", ")}]`, () => assert.deepStrictEqual(caser.split(v[0]), v[1]))));
