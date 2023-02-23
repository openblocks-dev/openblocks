import styled from "styled-components";
import { BluePlusIcon } from "icons";
import { EllipsisTextCss, labelCss } from "./Label";
import { LinkButton } from "./button";
import { ReactNode } from "react";
import { trans } from "i18n/design";

const InlineEventFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const attrs = () => ({
  tabIndex: 0,
});
const EventDiv = styled.div.attrs(attrs)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  flex: 1 1 auto;
  padding-right: 8px;
  margin-top: 8px;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1px solid #8b8fa3;
  }

  &:focus {
    box-shadow: 0 0 0 2px #d6e4ff;
    border: 1px solid #3377ff;
  }

  &:first-child {
    margin-top: 0px;
  }
`;
const EventContent = styled.div`
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  height: 100%;
  align-items: center;
  padding-left: 12px;
`;

const EventTitle = styled.div`
  ${labelCss};
  line-height: normal;
  flex: 0 0 30%;
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333333;

  &:hover {
    cursor: pointer;
  }
`;
const EventAction = styled.div`
  ${EllipsisTextCss};
  ${labelCss};
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8b8fa3;
  max-width: 100%;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 3px;
  margin-top: 4px;
`;
const TitleSpan = styled.span`
  ${labelCss};
  color: #222222;
`;
const HighTitle = styled.span`
  ${labelCss};
  color: #8b8fa3;
  display: block;
`;

interface HighContainerProps {
  children: React.ReactNode | JSX.Element;
}

const HighContainer = (props: HighContainerProps) => {
  return (
    <>
      <HighTitle>{trans("eventHandler.advanced")}</HighTitle>
      {props.children}
    </>
  );
};
const AddLine = (props: { title: ReactNode; add: () => void }) => {
  return (
    <TitleDiv>
      <TitleSpan>{props.title}</TitleSpan>
      <LinkButton icon={<BluePlusIcon />} text={trans("addItem")} onClick={props.add} />
    </TitleDiv>
  );
};
export {
  BluePlusIcon as AddEventIcon,
  EventDiv,
  EventContent,
  EventTitle,
  EventAction,
  TitleDiv,
  TitleSpan,
  InlineEventFormWrapper,
  HighContainer,
  AddLine,
};
