const splitLines = (str) => str.split(/\r?\n/);
const lineWrapper = (line, i) => `<span class="ln">${i + 1}</span>${line}`;
export default function applyLineStyles(code, opts) {
    return splitLines(code).map((line, i) => {
        return lineWrapper(line, i);
    })
        .join('&#13;&#10;');
}
