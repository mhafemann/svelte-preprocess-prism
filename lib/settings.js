import deriveLanguage from './derive-language.js';
class Range {
    start;
    end;
    constructor(values) {
        this.start = values[0];
        this.end = Math.max(...values);
    }
    indexInRange(n) {
        return n >= this.start && n <= this.end;
    }
}
export default function deriveSettings(node) {
    let attributes = {
        language: null,
        linenumbers: true,
        highlightRange: undefined
    };
    node.attributes
        .filter((attr) => {
        if (attr.name.startsWith("data-") || attr.name === "class") {
            return attr;
        }
    })
        .map((attr) => {
        switch (attr.name) {
            case "class":
                attributes.language = deriveLanguage(attr.value[0].data);
                break;
            case "data-linenumbers":
                attributes.linenumbers = attr.value[0].data;
                break;
            case "data-highlight":
                const values = attr.value[0].data
                    .split(",")
                    .map((n) => parseInt(n));
                attributes.highlightRange = new Range(values);
                break;
            default:
                break;
        }
    });
    return attributes;
}
