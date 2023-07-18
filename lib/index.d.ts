import 'prism-svelte';
import 'prismjs/plugins/treeview/prism-treeview.js';
declare const sveltePreprocessPrism: {
    name: string;
    markup({ content, filename }: any): {
        code: string;
        map: import("magic-string").SourceMap;
    };
};
export default sveltePreprocessPrism;
