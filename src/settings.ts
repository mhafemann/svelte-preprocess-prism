import deriveLanguage from './derive-language.js';

export interface Attributes {
  language?: string|null;
  linenumbers?: boolean;
  highlightRange?: Range|undefined;
}

class Range {
  start: number;
  end: number;

  constructor(values: number[]) {
    this.start = values[0];
    this.end = Math.max(...values);
  }

  indexInRange(n: number): boolean {
    return n >= this.start && n <= this.end
  }
}

export default function deriveSettings(node: any): Attributes {
  let attributes: Attributes = {
    language: null,
    linenumbers: true,
    highlightRange: undefined
  };

  node.attributes
    .filter((attr: any) => {
      if (attr.name.startsWith("data-") || attr.name === "class") {
        return attr;
      }
    })
    .map((attr: any) => {
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
            .map((n: any) => parseInt(n));
            attributes.highlightRange = new Range(values);
        break;

        default:
          break;
      }
    });

  return attributes;
}
