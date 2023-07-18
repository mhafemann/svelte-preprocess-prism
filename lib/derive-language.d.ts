/**
 * Given a string of CSS class names, finds the first name that
 * starts with 'language-' and returns the string after it.
 * If no match is found, returns null.
 *
 * @param {string} classNames - A string of space-separated CSS class names.
 * @return {string|null} The language specified in the class name, or null if no language is specified.
 */
export default function deriveLanguage(classNames: string): string | null;
