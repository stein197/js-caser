/**
 * Contains custom bit flags that is used by {@link convert} function to control the casing more precisely
 */
export enum Casing {
	/** Transforms all letters to lowercase */
	Lowercase = 1 << 0,
	/** Transforms all letters to uppercase */
	Uppercase = 1 << 1,
	/** Transforms the first letter of each word into lowercase */
	FirstLetterLowercase = 1 << 2,
	/** Transforms the first letter of each word into uppercase */
	FirstLetterUppercase = 1 << 3,
	/** Transforms the first letter of the first word into lowercase */
	FirstWordLetterLowercase = 1 << 4,
	/** Transforms the first letter of the first word into uppercase */
	FirstWordLetterUppercase = 1 << 5,
}

/**
 * Converts a string to the given case.
 * @param string String to convert.
 * @param casing To which case convert the string.
 * @param delimiter Optional string that will separate each word.
 */
export function convert(string: string, casing: Casing, delimiter?: string): string;

/**
 * Converts an array of strings to the given case.
 * @param array Array to convert.
 * @param casing To which case convert the array.
 * @param delimiter Optional string that will separate each word.
 */
export function convert(array: string[], casing: Casing, delimiter?: string): string;

/**
 * Converts a string to the given case.
 * @param string String to convert.
 * @param casing To which case convert the string.
 */
export function convert(string: string, casing: Commons): string;

/**
 * Converts an array of strings to the given case.
 * @param array Array to convert.
 * @param casing To which case convert the array.
 */
export function convert(array: string[], casing: Commons): string;

export function convert(data: string | string[], casing: Casing | Commons, delimiter: string = ""): string {
	let words = (typeof data === "string" ? split(data) : data).map(word => word.toLowerCase());
	if (typeof casing === "string") {
		return commons[casing](words);
	} else {
		if (casing & Casing.Lowercase)
			words = words.map(word => word.toLowerCase());
		if (casing & Casing.Uppercase)
			words = words.map(word => word.toUpperCase());
		if (casing & (Casing.FirstLetterLowercase | Casing.FirstWordLetterLowercase))
			words = words.map((w, wIdx) => wIdx && (casing & Casing.FirstWordLetterLowercase) ? w : setFirstLetterCase(w, false));
		if (casing & (Casing.FirstLetterUppercase | Casing.FirstWordLetterUppercase))
			words = words.map((w, wIdx) => wIdx && (casing & Casing.FirstWordLetterUppercase) ? w : setFirstLetterCase(w, false));
		return words.join(delimiter);
	}
}

/**
 * Splits the string into array of words that this string consists of, preserving the case. For example, the word 'camelCase'
 * would be splitted into array ["camel", "Case"].
 * @param string String to split.
 * @returns Array of words.
 */
export const split = (string: string) => string.split(/(?<=[a-z0-9])(?=[A-Z0-9])|(?<=[A-Z0-9])(?=[A-Z0-9][a-z0-9])|[^\w]+|_/).filter(s => !!s);

const setFirstLetterCase = (string: string, upper: boolean) => string.split("").map((l, lIdx) => lIdx ? l : l[upper ? "toUpperCase" : "toLowerCase"]()).join("");

const commons: {[K in Commons]: (data: string[]) => string} = {
	camel: data => data.map((w, wIdx) => wIdx ? setFirstLetterCase(w, true) : w).join(""),
	upper: data => data.join("_").toUpperCase(),
	snake: data => data.join("_"),
	kebab: data => data.join("-"),
	pascal: data => data.map(w => setFirstLetterCase(w, true)).join(""),
	header: data => data.map(w => setFirstLetterCase(w, true)).join("-")
}

type Commons = "camel" | "upper" | "snake" | "kebab" | "pascal" | "header";