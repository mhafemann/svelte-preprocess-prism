export interface Attributes {
    language?: string | null;
    linenumbers?: boolean;
    highlightRange?: Range | undefined;
}
declare class Range {
    start: number;
    end: number;
    constructor(values: number[]);
    indexInRange(n: number): boolean;
}
export default function deriveSettings(node: any): Attributes;
export {};
