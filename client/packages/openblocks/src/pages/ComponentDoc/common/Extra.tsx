import axios from "axios";
import { UICompType } from "comps/uiCompRegistry";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import extras from "../extra";
import { Desc, MarkdownTable, Title1 } from "./Styled";

const Wrapper = styled.div``;

interface IProps {
  compName: UICompType;
}

export default function Extra(props: IProps) {
  const { compName } = props;
  const [content, setContent] = useState("");

  useEffect(() => {
    const markdownPath = extras[compName];
    if (!markdownPath) {
      setContent("");
      return;
    }
    axios
      .create({ baseURL: "/" })
      .get<string>(markdownPath)
      .then((response) => {
        setContent(response.data);
      });
  }, [compName]);

  if (!content) {
    return null;
  }

  return (
    <Wrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ h1: Title1, p: Desc, table: MarkdownTable } as any}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}
