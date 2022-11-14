import { trans } from "i18n/design";
import { ReactNode } from "react";
import styled from "styled-components";
import { ReactComponent as ContainerDrag } from "icons/icon-container-drag.svg";

type ContainerPlaceholderProps = {
  children?: ReactNode;
};

const HintText = styled.span`
  font-size: 13px;
  color: #b8b9bf;
  text-align: center;
`;

export function ContainerPlaceholder(props: ContainerPlaceholderProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HintText>
        <ContainerDrag style={{ verticalAlign: "bottom", marginRight: "8px" }} />
        {props.children}
      </HintText>
    </div>
  );
}

export const HintPlaceHolder = (
  <ContainerPlaceholder>{trans("container.hintPlaceHolder")}</ContainerPlaceholder>
);
