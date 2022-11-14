import { css } from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export const markdownCompCss = css`
  .markdown-body {
    background-color: unset;
    font-size: 13px;
    margin: 3px 0;

    h1,
    h2 {
      border: none;
      padding-bottom: 0;
    }

    p {
      line-height: 1.9;
    }

    h3 {
      padding: 2px 0;
    }

    h4 {
      padding: 4px 0;
    }
  }
`;

export const TacoMarkDown = (props: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [rehypeRaw],
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              "*": [
                ...((defaultSchema.attributes && defaultSchema.attributes["*"]) || []),
                "style",
              ],
            },
          },
        ],
      ]}
      className="markdown-body"
    >
      {props.children}
    </ReactMarkdown>
  );
};
