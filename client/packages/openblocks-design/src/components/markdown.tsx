import { css } from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

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

interface TacoMarkDownProps extends ReactMarkdownOptions {
  children: string;
}

const components = {
  a: (props: any) => {
    const { node, children, ...otherProps } = props;
    return (
      <a {...otherProps} target="_blank">
        {children}
      </a>
    );
  },
};

export const TacoMarkDown = (props: TacoMarkDownProps) => {
  const { children, ...otherProps } = props;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
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
                "className",
              ],
            },
          },
        ],
      ]}
      className="markdown-body"
      {...otherProps}
    >
      {children}
    </ReactMarkdown>
  );
};
