import { compile, serialize, middleware, prefixer, stringify } from "stylis";

function styleNamespace(id: string) {
  return `style-for-${id}`;
}

export function evalStyle(id: string, css: string[]) {
  const styleId = styleNamespace(id);

  let compiledCSS = "";
  css.forEach((i) => {
    if (!i.trim()) {
      return;
    }
    compiledCSS += serialize(compile(`#${id}{${i}}`), middleware([prefixer, stringify]));
  });

  let styleNode = document.querySelector(`#${styleId}`);
  if (!styleNode) {
    styleNode = document.createElement("style");
    styleNode.setAttribute("type", "text/css");
    styleNode.setAttribute("id", styleId);
    styleNode.setAttribute("data-style-src", "eval");
    document.querySelector("head")?.appendChild(styleNode);
  }
  styleNode.textContent = compiledCSS;
}

export function clearStyleEval(id?: string) {
  const styleId = id && styleNamespace(id);
  const styleNode = document.querySelectorAll(`style[data-style-src=eval]`);
  if (styleNode) {
    styleNode.forEach((i) => {
      if (!styleId || styleId === i.id) {
        i.remove();
      }
    });
  }
}
