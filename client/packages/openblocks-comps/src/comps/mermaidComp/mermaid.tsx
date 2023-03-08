import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

function escape(str: string): string {
  const entries: { [index: string]: any } = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str
    .replace(/&(lt|gt|nbsp|amp|quot);/gi, function (_, t) {
      return entries[t];
    })
    .trim();
}

export default ({ id = "graphDiv", code = "" }) => {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
  }, []);

  useEffect(() => {
    if (!code) return;

    mermaid.mermaidAPI.render(id, escape(code)).then((res) => {
      setSvg(res.svg);
    });
  }, [code, setSvg]);

  return <pre className="mermaid" dangerouslySetInnerHTML={{ __html: svg }}></pre>;
};
