import { labelCss } from "openblocks-design";
import { PropsWithChildren } from "react";
import styled from "styled-components";

// re-used empty event
const EmptyEventDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  background: #ffffff;
  border: 1px dashed #d7d9e0;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding-left: 12px;
`;

const EmptyEventSpan = styled.span`
  ${labelCss};
  color: #b8b9bf;
  &:hover {
    cursor: pointer;
  }
`;

interface EmptyItemProps {
  onClick?: () => void;
}

export default function EmptyItem(props: PropsWithChildren<EmptyItemProps>) {
  return (
    <EmptyEventDiv onClick={props.onClick}>
      <EmptyEventSpan>{props.children}</EmptyEventSpan>
    </EmptyEventDiv>
  );
}
