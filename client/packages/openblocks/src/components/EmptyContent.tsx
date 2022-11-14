import { labelCss } from "openblocks-design";
import { HTMLAttributes } from "react";
import styled from "styled-components";

const NoCompDiv = styled.div`
  min-height: 68px;
  padding: 16px 24px;
  border: 1px dashed #d7d9e0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoCompP = styled.div`
  ${labelCss};
  font-size: 14px;
  color: #b8b9bf;
  text-align: center;
  line-height: 18px;
  user-select: text;
`;

interface EmptyContentProps extends HTMLAttributes<HTMLDivElement> {
  text: React.ReactNode;
}

export const EmptyContent = (props: EmptyContentProps) => {
  const { text, ...divProps } = props;
  return (
    <NoCompDiv {...divProps}>
      <NoCompP>{text}</NoCompP>
    </NoCompDiv>
  );
};
