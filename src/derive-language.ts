/**
 * Given a string of CSS class names, finds the first name that 
 * starts with 'language-' and returns the string after it. 
 * If no match is found, returns null.
 *
 * @param {string} classNames - A string of space-separated CSS class names.
 * @return {string|null} The language specified in the class name, or null if no language is specified.
 */
export default function deriveLanguage(classNames: string): string | null {
    // Split the input string into an array of class names.
    const classes = classNames.split(' ');
  
    // Use the `filter()` method to create a new array that contains only 
    // the class names that start with 'language-', then take the first 
    // element of this array.
    const languageClass = classes.filter(className => className.startsWith('language-'))[0];
  
    // If `languageClass` exists, split it on '-' and return the second part (the language name). 
    // If it doesn't exist (meaning no class name started with 'language-'), return null.
    return languageClass ? languageClass.split('-')[1] : null;
  }