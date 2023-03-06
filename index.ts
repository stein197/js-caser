const REGEX_SPLIT = /(?<=[a-z0-9])(?=[A-Z0-9])|(?<=[A-Z0-9])(?=[A-Z0-9][a-z0-9])|[^\w]+|_/;
const REGEX_CASE_FLAT = /^[a-z0-9]+$/;
const REGEX_CASE_KEBAB = /^[a-z0-9\-]+$/;
const REGEX_CASE_SNAKE = /^[a-z0-9_]+$/;
const REGEX_CASE_UPPER = /^[A-Z0-9_]+$/;
const REGEX_CASE_TRAIN = /^[A-Z0-9\-]+$/;
const DEFAULT_CASING_ARRAY: {[K in Casing]: Options} = {
	flat: {
		separator: "",
		leadCharCase: "lower",
		firstCharCase: "lower",
		case: "lower"
	},
	camel: {
		separator: "",
		leadCharCase: "upper",
		firstCharCase: "lower",
		case: "lower"
	},
	header: {
		separator: "-",
		leadCharCase: "upper",
		firstCharCase: "upper",
		case: "lower"
	},
	kebab: {
		separator: "-",
		leadCharCase: "lower",
		firstCharCase: "lower",
		case: "lower"
	},
	pascal: {
		separator: "",
		leadCharCase: "upper",
		firstCharCase: "upper",
		case: "lower"
	},
	snake: {
		separator: "_",
		leadCharCase: "lower",
		firstCharCase: "lower",
		case: "lower"
	},
	upper: {
		separator: "_",
		leadCharCase: "upper",
		firstCharCase: "upper",
		case: "upper"
	},
	train: {
		separator: "-",
		leadCharCase: "upper",
		firstCharCase: "upper",
		case: "upper"
	}
};

/**
 * Converts a string to the given case.
 * @param data String to convert.
 * @param casing Options to use or predefined casing name.
 * @param abbr Keep abbreviations.
 * @return String with converted case.
 * @example
 * ```ts
 * convert("camelCase", "kebab"); // "camel-case"
 * convert("HTMLElement", "camel", true); // "HTMLElement"
 * convert("HTMLElement", "camel", false); // "HtmlElement"
 * convert("camelCase", {separator: "-", leadCharCase: "lower", firstCharCase: "upper", case: "lower"}); // "Camel-case"
 * ```
 */
export function convert(data: string, casing: Partial<Options> | keyof typeof DEFAULT_CASING_ARRAY, abbr: boolean = true): string {
	const config = typeof casing === "string" ? DEFAULT_CASING_ARRAY[casing] : {...DEFAULT_CASING_ARRAY.flat, ...casing};
	return config ? split(data).map((w, i) => abbr && w.toUpperCase() === w ? w : w[0][!i && config.firstCharCase === "lower" || i && config.leadCharCase === "lower" ? "toLowerCase" : "toUpperCase"]() + w.substring(1)[config.case === "lower" ? "toLowerCase" : "toUpperCase"]()).join(config.separator) : data;
}

// TODO
export function detect(data: string): Casing | null {
	if (data.toLowerCase() === data) {
		if (data.search(REGEX_CASE_SNAKE) === 0)
			return "snake";
		if (data.search(REGEX_CASE_KEBAB) === 0)
			return "kebab";
		if (data.search(REGEX_CASE_FLAT) === 0)
			return "flat";
	} else if (data.toUpperCase() === data) {
		if (data.search(REGEX_CASE_UPPER) === 0)
			return "upper";
		if (data.search(REGEX_CASE_TRAIN) === 0)
			return "train";
	} else {
		if (convert(data, "camel") === data)
			return "camel";
		if (convert(data, "pascal") === data)
			return "pascal";
		if (convert(data, "header") === data)
			return "header";
	}
	return null;
}

/**
 * Splits the string into array of words that this string consists of, preserving the case.
 * @param string String to split.
 * @returns Array of words.
 * @example
 * ```ts
 * split("");              // []
 * split("camelCase");     // ["camel", "Case"]
 * split("HTMLElement");   // ["HTML", "Element"]
 * split("function_name"); // ["function", "name"]
 * ```
 */
export function split(string: string): string[] {
	return string.split(REGEX_SPLIT).filter(s => !!s);
}

type Casing = "flat" | "camel" | "header" | "kebab" | "pascal" | "snake" | "upper" | "train";

type Options = {

	/**
	 * Which string to use as a separator between words.
	 * @example
	 * ```ts
	 * convert("camelCase", {separator: "-", ...}); // "camel-Case"
	 * ```
	 */
	separator: string;

	/**
	 * Case of the first letters of every word except for the first one. Available values are "upper" and "lower".
	 * @example
	 * ``ts
	 * convert("LeadCharCase", {leadCharCase: "upper", ...}); // "LeadCharCase"
	 * convert("LeadCharCase", {leadCharCase: "lower", ...}); // "Leadcharcase"
	 * ```
	 */
	leadCharCase: "upper" | "lower";

	/**
	 * Case of the very first char in the string. Available values are "upper" and "lower".
	 * @example
	 * ```ts
	 * convert("firstCharCase", {firstCharCase: "upper", ...}); // "FirstCharCase"
	 * convert("firstCharCase", {firstCharCase: "lower", ...}); // "firstCharCase"
	 * ```
	 */
	firstCharCase: "upper" | "lower";

	/**
	 * Case of all other chars in the string. Available values are "upper" and "lower".
	 * @example
	 * ```ts
	 * convert("string", {case: "upper", ...}); // "STRING"
	 * convert("string", {case: "lower", ...}); // "string"
	 * ```
	 */
	case: "upper" | "lower";
}
