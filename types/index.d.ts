export default sveltePrism;
declare namespace sveltePrism {
    function markup({ content, filename }: {
        content: any;
        filename: any;
    }): {
        code: string;
        map: import("magic-string").SourceMap;
    };
    function script(): void;
    function style(): void;
}
