import 'prism-svelte';
import 'prismjs/plugins/treeview/prism-treeview.js';
declare const sveltePrism: {
    markup: ({ content, filename }: {
        content: any;
        filename: any;
    }) => {
        code: string;
        map: import("magic-string").SourceMap;
    };
    script: () => void;
    style: () => void;
};
export default sveltePrism;
