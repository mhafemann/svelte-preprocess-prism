import MagicString from 'magic-string';
import { parse, walk } from 'svelte/compiler';
import Prism from 'prismjs';
import 'prism-svelte';
import 'prismjs/plugins/treeview/prism-treeview.js';
import loadLanguages from 'prismjs/components/index.js';
import applyLineStyles from './lines.js';
import deriveSettings from './settings.js';

loadLanguages();

const codeTag = (s: string) => `<code>${s}</code>`;
const mustache = (s: string) => `{@html \`${s}\` }`;
const isCodeTag = (n: any) => n.type === 'Element' && n.name === 'code';
const isMustacheTag = (n: any) => n.type === 'MustacheTag';

const sveltePreprocessPrism = {
  name: 'svelte-prism',
  markup({ content, filename }: any) {
    const ms = new MagicString(content);
    const ast: any = parse(ms.toString());

    walk(ast.html, {
      enter(node: any) {
        if (node.type === 'Element' && node.name === 'pre') {
          const { language, linenumbers, highlightRange } = deriveSettings(node);
          if (!language || !Prism.languages[language]) return;

          const hasCodeTag = node.children.filter(isCodeTag).length > 0;

          const targetNode = hasCodeTag
            ? node.children.filter(isCodeTag)[0].children.filter(isMustacheTag)[0]
            : node.children.filter(isMustacheTag)[0];

          const code = ms
            .slice(targetNode.start + 2, targetNode.end - 2)
            .replace(`<\\\/script>`, `</script>`)
            .toString()
            .trim();

          const marked = Prism.highlight(code, Prism.languages[language], language);

          const styled = applyLineStyles(marked, { linenumbers, highlightRange });

          const tagged = codeTag(mustache(styled));

          ms.overwrite(
            node.children[0].start,
            node.children[node.children.length - 1].end,
            tagged
          );
        }
      },
    });

    return {
      code: ms.toString(),
      map: ms.generateMap({ hires: true, file: filename }),
    };
  },
};

export default sveltePreprocessPrism;
