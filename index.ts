/**
 * Default casing options.
 */
export enum Casing {
	/** camelCase */
	Camel,
	/** Header-Case */
	Header,
	/** kebab-case */
	Kebab,
	/** PascalCase */
	Pascal,
	/** snake_case */
	Snake,
	/** UPPER_CASE */
	Upper
}

/**
 * Converts a string to the given case.
 * @param data String to convert.
 * @param casing To which case convert the string.
 * @param preserveAbbreviations Do not change case of abbreviations such as 'HTML', 'HTTP' and so on.
 * @return String with converted case.
 * @throws Error If the `casing` is unknown.
 */
export function convert(data: string, casing: Casing, preserveAbbreviations: boolean = true): string {
	const words = split(data).map(word => word.toUpperCase() === word && preserveAbbreviations ? word : word.toLowerCase());
	switch (casing) {
		case Casing.Camel:
			return words.map((w, wIdx) => wIdx ? upperCaseFirstLetter(w) : w).join("");
		case Casing.Header:
			return words.map(w => upperCaseFirstLetter(w)).join("-");
		case Casing.Kebab:
			return words.join("-");
		case Casing.Pascal:
			return words.map(w => upperCaseFirstLetter(w)).join("");
		case Casing.Snake:
			return words.join("_");
		case Casing.Upper:
			return words.join("_").toUpperCase();
	}
	throw new Error(`Unknown casing ${casing}`);
}

/**
 * Splits the string into array of words that this string consists of, preserving the case. For example, the word 'camelCase'
 * would be splitted into array ["camel", "Case"].
 * @param string String to split.
 * @returns Array of words.
 */
export function split(string: string): string[] {
	return string.split(/(?<=[a-z0-9])(?=[A-Z0-9])|(?<=[A-Z0-9])(?=[A-Z0-9][a-z0-9])|[^\w]+|_/).filter(s => !!s);
}

function upperCaseFirstLetter(string: string): string {
	return string.split("").map((char, i) => i ? char : char.toUpperCase()).join("");
}
