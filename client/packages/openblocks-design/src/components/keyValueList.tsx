import styled from "styled-components";
import { ReactComponent as Bin } from "icons/icon-recycle-bin.svg";
import { TacoButton } from "./button";
import { ReactNode } from "react";
import { BluePlusIcon } from "icons";
import { trans } from "i18n/design";

const KeyValueListItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;

const DelIcon = styled(Bin)<{
  $forbidden?: boolean;
}>`
  height: 16px;
  width: 16px;
  margin-left: 8px;
  flex-shrink: 0;

  g g {
    ${(props) => props.$forbidden && "stroke: #D7D9E0;"}
  }

  :hover {
    cursor: ${(props) => (props.$forbidden ? "default" : "pointer")};
  }

  &:hover g {
    ${(props) => !props.$forbidden && "stroke: #315efb;"}
  }
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
  margin-bottom: 2px;

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

  > svg {
    height: 8px;
    width: 8px;
  }
`;

export const KeyValueList = (props: {
  list: ReactNode[];
  onAdd: () => void;
  onDelete: (item: ReactNode, index: number) => void;
}) => (
  <>
    {props.list.map((item, index) => (
      <KeyValueListItem key={index /* FIXME: find a proper key instead of `index` */}>
        {item}
        <DelIcon
          onClick={() => props.list.length > 1 && props.onDelete(item, index)}
          $forbidden={props.list.length === 1}
        />
      </KeyValueListItem>
    ))}
    <AddBtn onClick={props.onAdd}>
      <AddIcon />
      {trans("addItem")}
    </AddBtn>
  </>
);
