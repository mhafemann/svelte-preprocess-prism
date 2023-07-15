import MagicString, { SourceMap } from 'magic-string';
import { parse, walk } from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import { Ast as AstInterface } from 'svelte/types/compiler/interfaces';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import 'prismjs/plugins/treeview/prism-treeview.js';

interface File {
    content: string;
    filename?: string;
}

loadLanguages();

const splitLines = (str: string) => str.split(/\r?\n/);

const sveltePrism: PreprocessorGroup = {
    markup: ({ content, filename }: File) => {
        const ms: MagicString = new MagicString(content);

        const ast: AstInterface = parse(content);

        // @ts-ignore
        walk(ast.html, {
            enter(node: any) {
                if (node.type != 'Element' && node.name != 'pre') return;
                /* 
                    get the language from the class attribute 
                    of the pre tag,
                */
                const lang = node.attributes
                    .filter(
                        (/** @type {{ name: string }} */ attr: { name: string }) =>
                            attr.name === 'class'
                    )[0]
                    .value[0].data.split(' ')
                    .filter((selector: string) => selector.startsWith('language-'))
                    .map((selector: string) => {
                        return selector.replace('language-', '');
                    })[0];

                /* 
                    TODO: handle when there are no language definitions for the 
                    specified language
                */
                if (!lang) return;

                const codeTag = node.children.filter(
                    (child: { type: string; name: string }) => {
                        return child.type === 'Element' && child.name === 'code';
                    }
                )[0];

                // TODO: handle when codeTag is undefined but lang is defined
                if (!codeTag) return;

                /* 
                        get the start and end of the code tag,
                    */
                const start = codeTag.children[0].start;
                const end = codeTag.children[codeTag.children.length - 1].end;

                const mustacheTag = codeTag.children.filter((child: { type: string }) => {
                    return child.type === 'MustacheTag';
                })[0];

                /* 
                    If there is no mustache tag or the mustache tag is not a template literal,
                */
                if (!mustacheTag || mustacheTag.expression.type != 'TemplateLiteral')
                    return;
                /* 
                    get the content of the mustache tag, trim it, and highlight it with Prism.js.
                */
                const cont = ms
                    .slice(mustacheTag.start + 2, mustacheTag.end - 2)
                    .toString()
                    .trim();
                const highlighted = Prism.highlight(cont, Prism.languages[lang], lang);

                /* 
                    replace the mustache tag with the highlighted code nested in a svelte @html block so that it is not escaped,
                */
                const lines = splitLines(highlighted);

                /* 
                    add line numbers,
                */
                const numberedResult = lines
                    .map((line, i) => {
                        return `<span class="line-number">${i + 1}</span>${line}`;
                    })
                    .join('\n');
                if (lang === 'treeview') {
                    ms.update(start, end, `{@html \`${highlighted}\`}`);
                } else {
                    ms.update(start, end, `{@html \`${numberedResult}\`}`);
                }
            },
        });

        return {
            code: ms.toString(),
            map: ms.generateMap({ hires: true, file: filename }),
        };
    },
    script: () => {},
    style: () => {},
};

export default sveltePrism;
