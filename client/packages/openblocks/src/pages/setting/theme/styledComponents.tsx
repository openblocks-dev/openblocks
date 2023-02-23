import { Button, Divider, Table } from "antd";
import { ThemeDetail } from "api/commonSettingApi";
import {
  CustomModal,
  darkenColor,
  isDarkColor,
  ScrollBar,
  TacoButton,
  TacoInput,
} from "openblocks-design";
import styled, { css } from "styled-components";
import { PopoverIcon } from "../permission/styledComponents";

export const ThemeContent = styled.div`
  padding: 32px 24px 0 12px;
  min-width: 600px;
  width: 100%;
`;

export const DetailContainer = styled.div`
  padding-top: 32px;
  width: 100%;
  overflow: auto;
`;

export const CreateButton = styled(Button)`
  background-color: #4965f2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 13px;
  border: 1px solid #4965f2;
  box-shadow: none;
  &.ant-btn-primary:hover,
  &.ant-btn-primary:focus {
    background: #315efb;
    border-color: #315efb;
  }
  &:disabled,
  &:disabled:hover {
    background: #dbe1fd;
    color: #ffffff;
    border-color: #dbe1fd;
  }
  svg {
    margin-right: 2px;
    width: 12px;
    height: 12px;
  }
`;

export const SaveButton = styled(CreateButton)`
  min-width: 84px;
  height: 32px;
`;

export const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const InlineFlexAlignCenter = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const ColumnName = styled(InlineFlexAlignCenter)`
  overflow: hidden;
  margin-right: 20px;
  .ant-typography {
    margin-bottom: 0;
    margin-top: 0;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
`;

export const DetailContent = styled.div`
  max-width: 672px;
  margin-left: 24px;
  padding-bottom: 80px;
  .common {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 24px;
  }
  .chart {
    margin: 29px 0 0 0;
  }
`;

export const ChartDesc = styled.div`
  font-size: 13px;
  color: #333333;
  line-height: 19px;
  margin: 6px 0 5px 0;
  a {
    color: #4965f2;
    &:hover {
      color: #315efb;
    }
  }
`;

export const ChartInput = styled.div`
  .cm-editor {
    max-height: 160px;
    min-height: 76px;
    .cm-content,
    .cm-gutter {
      min-height: 74px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  padding: 24px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 492px);
  background-color: #fff;
  z-index: 1;
  margin-right: 10px;
  &.no-bottom {
    box-shadow: 0 -6px 10px -6px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = styled.div`
  margin: 0 0 37px 24px;
`;

export const DetailTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

export const BackBtn = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  height: 24px;

  :hover {
    color: #4965f2;
  }

  svg {
    transform: rotate(-90deg);
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  :hover svg g path {
    fill: #4965f2;
  }
`;

export const ResetButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;
  font-size: 13px;
  padding: 4px 14px;
  color: #333333;
  svg {
    margin-right: 2px;
  }
  &.ant-btn-default:hover,
  &.ant-btn-default:focus {
    background: #f5f5f6;
    color: #333333;
    border-color: #d7d9e0;
  }
  &:disabled,
  &:disabled:hover {
    background: #ffffff;
    color: rgba(51, 51, 51, 0.3);
    border-color: #efeff1;
    svg g g {
      opacity: 0.3;
    }
  }
`;

export const ModalNameDiv = styled(FlexAlignCenter)`
  display: flex;
  align-items: center;
  padding: 3.5px 0;
  svg {
    margin-right: 4px;
  }
`;

export const TacoInputStyled = styled(TacoInput)`
  margin-bottom: 5px;
  height: 32px;
  > input {
    height: 100%;
  }
  .ant-input-suffix {
    color: #999;
  }
  &.exceed .input-length {
    color: #f73131;
  }
`;

export const ThemeBtn = styled.div<{ theme: ThemeDetail }>`
  width: 180px;
  margin-bottom: 4px;
  height: auto;
  padding: 7px;
  background-color: ${(props) => props.theme.canvas};
  border-radius: 6px;
  border: 1px solid #efeff1;
  font-size: 12px;
  position: relative;
  cursor: pointer;
  color: ${(props) =>
    isDarkColor(props.theme.primarySurface) ? props.theme.textLight : props.theme.textDark};
  .name {
    font-size: 13px;
    font-weight: 600;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover,
  &:focus,
  &:active {
    background-color: ${(props) => props.theme.canvas};
    border-color: #315efb;
    box-shadow: 0 0 1px 4px #d6e4ff;
  }
  > div {
    border-radius: 6px;
    overflow: hidden;
    display: block;
    border: 1px solid ${(props) => darkenColor(props.theme.primarySurface, 0.1)};
    background-color: ${(props) => props.theme.primarySurface};
    span {
      display: inline-flex;
      align-items: center;
    }
    > div {
      display: flex;
      align-items: center;
      padding: 0 6px;
      border-bottom: 1px solid ${(props) => darkenColor(props.theme.primarySurface, 0.1)};
    }
    > div:nth-of-type(1) {
      height: 28px;
      justify-content: space-between;
      overflow: hidden;
      svg {
        margin-right: 2px;
        rect {
          fill: ${(props) => props.theme.primary};
        }
      }
    }
    > div:nth-of-type(2) {
      height: 44px;
      justify-content: space-between;
      > div {
        display: grid;
        margin-right: 7px;
        height: 100%;
      }
      .radio {
        line-height: 1;
        &:nth-of-type(1) {
          margin: 5px 0 4px 0;
        }
        &:nth-of-type(2) {
          margin: 4px 0 5px 0;
        }
        span,
        svg {
          margin-right: 2px;
          circle:nth-of-type(1) {
            stroke: ${(props) => props.theme.primary};
          }
          circle:nth-of-type(2) {
            fill: ${(props) => props.theme.primary};
          }
        }
        span {
          width: 12px;
          height: 12px;
          display: inline-block;
          border: 1px solid #d7d9e0;
          border-radius: 50%;
        }
      }
      > span {
        justify-content: end;
      }
      .input-span {
        margin-left: 3px;
        width: 50px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid #d7d9e0;
        background: #ffffff;
      }
    }
    > div:nth-of-type(3) {
      height: 30px;
      border-bottom: none;
      justify-content: end;
      .button-span {
        border-radius: 3px;
        height: 20px;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${(props) => props.theme.primary};
        color: ${(props) =>
          isDarkColor(props.theme.primary) ? props.theme.textLight : props.theme.textDark};
      }
    }
  }
  > svg {
    circle {
      fill: #4965f2;
    }
    width: 20px;
    height: 20px;
    position: absolute;
    right: 9px;
    top: 9px;
    display: none;
  }
  &.selected {
    border-color: #315efb;
    box-shadow: 0 0 1px 4px #d6e4ff;
    > svg {
      display: inline-block;
    }
  }
`;

export const SelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px 12px;
`;

export const ScrollBarStyled = styled(ScrollBar)`
  > div {
    margin: 0 -4px;
    padding: 0 4px;
  }
  .simplebar-track {
    right: -16px;
  }
`;

export const SelectTitle = styled.div`
  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
  margin: 11px 0 8px 0;
`;

export const SelectTitleTheme = styled(SelectTitle)`
  margin-top: 12px;
`;

export const ConfigItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 6px 0 17px 0;
  .text-desc {
    width: 208px;
    min-width: 208px;
    .name,
    .desc {
      font-size: 13px;
      line-height: 19px;
    }
    .desc {
      color: #8b8fa3;
      margin-top: 2px;
    }
  }
  .config-input {
    width: 100%;
    min-width: 208px;
    &:hover {
      border-color: #3377ff;
    }
    &:focus {
      box-shadow: 0 0 0 3px #3377ff19;
    }
    display: flex;
    margin-top: 5px;
    overflow: hidden;
    > div:nth-of-type(1) {
      border: none;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      width: 28px;
      height: 28px;
      min-width: 28px;
    }
    .ant-input {
      outline: none;
      height: 28px;
      border: none;
      border: 1px solid #d7d9e0;
      margin-left: 8px;
      &:hover,
      &:focus,
      &:active {
        outline: none;
        border-color: #d7d9e0;
        box-shadow: none;
      }
    }
  }
`;

export const Radius = styled.div<{ radius: string }>`
  width: 24px;
  height: 24px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #d7d9e0;
  > div {
    margin: 7px;
    overflow: hidden;
    height: 13px;
    width: 13px;
    > div {
      height: 24px;
      width: 24px;
      border: 2px solid #777;
      border-radius: ${(props) => props.radius};
    }
  }
`;

export const ControlCol = styled(FlexAlignCenter)`
  justify-content: end;
  height: 100%;
`;

export const TableStyled = styled(Table)`
  .ant-table {
    tbody {
      &::before {
        content: " ";
        display: block;
        height: 4px;
      }
    }
    tr {
      display: grid;
      grid-template-columns: 1.34fr 1.34fr 0.42fr;
      padding: 0 12px;
    }
    .ant-table-row {
      cursor: pointer;
      &.row-hover {
        background-color: #f5f7fa;
        border-radius: 8px;
        td {
          background: none;
          .edit-button {
            opacity: 1;
          }
        }
      }
      td {
        display: flex;
        align-items: center;
        border-color: #ebebeb;
        padding: 9.5px 0;
        border-radius: 0;
        &:nth-last-of-type(1) {
          justify-content: end;
        }
      }
    }
    thead tr th {
      background-color: #ffffff;
      color: #8b8fa3;
      font-size: 14px;
      font-weight: 400;
      border-color: #e1e3eb;
      padding: 3px 0;
      height: 36px;
      display: flex;
      align-items: center;
      &::before {
        display: none;
      }
    }
    .default {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      padding: 0 5px;
      border-radius: 8px;
      border: 1px solid #d6e4ff;
      background: #ffffff;
      font-size: 12px;
      color: #4965f2;
      margin-left: 4px;
    }
  }
  .ant-table-empty {
    tbody tr {
      grid-template-columns: 1fr;
      td:nth-last-of-type(1) {
        justify-content: center;
      }
      &:nth-last-of-type(1) td {
        border: none;
      }
    }
  }
  .ant-dropdown {
    min-width: 110px !important;
    .ant-dropdown-menu {
      padding: 8px;
      box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
      border-radius: 8px;
      .ant-dropdown-menu-item {
        padding: 8px;
        span {
          font-size: 13px;
          color: #333333;
          line-height: 13px;
        }
        &:nth-last-of-type(1) span {
          color: #f73131;
        }
        &:hover {
          background: #f2f7fc;
          border-radius: 4px;
        }
      }
    }
  }
`;

export const EditButton = styled(TacoButton)`
  width: 52px;
  height: 24px;
  padding: 5px 12px;
  margin-left: 8px;
  opacity: 0;
`;

export const StyledMoreActionIcon = styled(PopoverIcon)`
  cursor: pointer;
  flex-shrink: 0;

  g {
    fill: #8b8fa3;
  }

  :hover {
    background-color: #e1e3eb;
    border-radius: 4px;
    cursor: pointer;

    g {
      fill: #3377ff;
    }
  }
`;

export const ListDropdown = styled(FlexAlignCenter)`
  height: 100%;
`;

export const MoreIconDiv = styled(FlexAlignCenter)`
  padding-left: 52px;
  height: 100%;
`;

const getTagStyle = (theme: ThemeDetail) => {
  return css`
    background-color: ${theme.canvas};
    padding: 6px 8px;
    .left,
    .right {
      width: 21px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .left {
      background-color: ${theme.primary};
      border-radius: 4px 0 0 4px;
    }
    .right {
      background-color: ${theme.primarySurface};
      border-radius: 0 4px 4px 0;
    }
  `;
};

export const TagDesc = styled.span<{ theme: ThemeDetail }>`
  display: inline-flex;
  margin-right: 12px;
  height: 36px;
  width: 58px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${(props) => getTagStyle(props.theme)}
`;

export const EmptySpan = styled.span`
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      padding: 0 3px;
      color: #4965f2;
      &:hover {
        color: #315efb;
      }
    }
  }
`;

export const EllipsisSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

export const CustomModalStyled = styled(CustomModal)`
  button {
    margin-top: 20px;
  }
`;
