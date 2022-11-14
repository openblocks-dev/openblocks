import styled from "styled-components";
import { PointIcon } from "icons";
import { EllipsisTextCss, labelCss } from "./Label";
import { TacoButton } from "./button";
import { BluePlusIcon } from "icons";
import { ReactNode } from "react";
import { ActiveTextColor, GreyTextColor } from "constants/style";
import { trans } from "i18n/design";

const InlineEventFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddIcon = styled(BluePlusIcon)`
  height: 8px;
  width: 8px;
  margin-right: 4px;
`;
const AddBtn = styled(TacoButton)`
  height: 13px;
  padding: 0;
  color: #4965f2;
  border: none;
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 13px;
  box-shadow: none;

  :hover {
    color: #315efb;
    border: none;
    background-color: #ffffff;
  }

  :focus {
    color: #315efb;
    border: none;
    background-color: #ffffff;
  }

  &:hover ${AddIcon} g {
    stroke: #315efb;
  }
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
const Icon = styled(PointIcon)`
  cursor: pointer;
  color: ${GreyTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;
const EventTitle = styled.div`
  ${labelCss};
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
      <AddBtn onClick={props.add}>
        <AddIcon />
        {trans("addItem")}
      </AddBtn>
    </TitleDiv>
  );
};
export {
  Icon,
  AddBtn,
  AddIcon as AddEventIcon,
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
