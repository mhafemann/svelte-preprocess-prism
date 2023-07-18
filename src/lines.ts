const splitLines = (str: string) => str.split(/\r?\n/);
const lineWrapper = (line: string, i: number) => `<span class="ln">${i + 1}</span>${line}`;

export default function applyLineStyles(code: string, opts: any):string {
    return splitLines(code).map((line, i) => {
        return lineWrapper(line, i);
    })
    .join('&#13;&#10;');
}