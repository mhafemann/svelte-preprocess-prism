"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const magic_string_1 = __importDefault(require("magic-string"));
const compiler_1 = require("svelte/compiler");
const prismjs_1 = __importDefault(require("prismjs"));
const index_js_1 = __importDefault(require("prismjs/components/index.js"));
require("prismjs/plugins/treeview/prism-treeview.js");
(0, index_js_1.default)();
const splitLines = (str) => str.split(/\r?\n/);
const sveltePrism = {
    markup: ({ content, filename }) => {
        const ms = new magic_string_1.default(content);
        const ast = (0, compiler_1.parse)(content);
        // @ts-ignore
        (0, compiler_1.walk)(ast.html, {
            enter(node) {
                if (node.type != 'Element' && node.name != 'pre')
                    return;
                /*
                    get the language from the class attribute
                    of the pre tag,
                */
                const lang = node.attributes
                    .filter((/** @type {{ name: string }} */ attr) => attr.name === 'class')[0]
                    .value[0].data.split(' ')
                    .filter((selector) => selector.startsWith('language-'))
                    .map((selector) => {
                    return selector.replace('language-', '');
                })[0];
                /*
                    TODO: handle when there are no language definitions for the
                    specified language
                */
                if (!lang)
                    return;
                const codeTag = node.children.filter((child) => {
                    return child.type === 'Element' && child.name === 'code';
                })[0];
                // TODO: handle when codeTag is undefined but lang is defined
                if (!codeTag)
                    return;
                /*
                        get the start and end of the code tag,
                    */
                const start = codeTag.children[0].start;
                const end = codeTag.children[codeTag.children.length - 1].end;
                const mustacheTag = codeTag.children.filter((child) => {
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
                const highlighted = prismjs_1.default.highlight(cont, prismjs_1.default.languages[lang], lang);
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
                }
                else {
                    ms.update(start, end, `{@html \`${numberedResult}\`}`);
                }
            },
        });
        return {
            code: ms.toString(),
            map: ms.generateMap({ hires: true, file: filename }),
        };
    },
    script: () => { },
    style: () => { },
};
exports.default = sveltePrism;
