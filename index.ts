const REGEX_SPLIT = /(?<=[a-z0-9])(?=[A-Z0-9])|(?<=[A-Z0-9])(?=[A-Z0-9][a-z0-9])|[^\w]+|_/;
const DEFAULT_CASINGS: {[K in "flat" | "camel" | "header" | "kebab" | "pascal" | "snake" | "upper" | "train"]: Options} = {
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
export function convert(data: string, casing: Options | keyof typeof DEFAULT_CASINGS, abbr: boolean = true): string {
	const config = typeof casing === "string" ? DEFAULT_CASINGS[casing] : casing;
	if (!config)
		return data;
	const wordArray = split(data);
	for (let i = 0, w = wordArray[i]; i < wordArray.length; i++, w = wordArray[i]) {
		if (abbr && w.toUpperCase() === w)
			continue;
		const isFirstWord = !i;
		w = config.case === "lower" ? w.toLowerCase() : w.toUpperCase();
		if (isFirstWord) {
			w = (config.firstCharCase === "lower" ? w[0].toLowerCase() : w[0].toUpperCase()) + w.substring(1);
		} else {
			w = (config.leadCharCase === "lower" ? w[0].toLowerCase() : w[0].toUpperCase()) + w.substring(1);
		}
		wordArray[i] = w;
	}
	return wordArray.join(config.separator);
	// return config ? split(data).map((w, i) => !config.abbr || w.toUpperCase() !== w ? w : w[0][!i && config.firstCharCase === "lower" || i && config.leadCharCase === "lower" ? "toLowerCase" : "toUpperCase"]() + w.substring(1)[config.case === "lower" ? "toLowerCase" : "toUpperCase"]()).join(config.separator) : data;
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
