import styled from "styled-components";
import { TacoMarkDown } from "./markdown";

interface MarkdownTooltipProps {
  children: string;
}

const Wrapper = styled.div`
  .markdown-body {
    font-size: 12px;
    background-color: transparent;
    color: white;
    p {
      margin-bottom: 4px;
    }
  }
`;

export default function MarkdownTooltip(props: MarkdownTooltipProps) {
  return (
    <Wrapper>
      <TacoMarkDown>{props.children}</TacoMarkDown>
    </Wrapper>
  );
}
