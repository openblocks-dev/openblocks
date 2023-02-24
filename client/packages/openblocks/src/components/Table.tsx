import { Table as AntdTable } from "antd";
import styled from "styled-components";

export const Table = styled(AntdTable)`
  .ant-table {
    font-size: 13px;
    border: none;
  }

  .ant-table-column-title {
    font-size: 14px;
    font-weight: 400;
  }

  .ant-table-thead {
    margin-bottom: 4px;
    position: relative;
  }

  .ant-table-thead > tr > th {
    color: #8b8fa3;
    background: #ffffff;
    padding-bottom: 9px;
    border: none;
    //border-bottom: 1px solid #8b8fa3; // divider line for the table header
    padding: 3px 12px;
    height: 36px;
    font-size: 14px;
    font-weight: 400;
  }

  .ant-table-thead > tr > th::before {
    display: none;
  }

  .ant-table-measure-row {
    height: 4px !important;
  }

  .ant-table-tbody > tr > td {
    border: none;
  }

  .ant-table-row {
    cursor: pointer;
  }

  tr {
    position: relative;
  }

  .ant-table-thead:after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 0;
    background: #e1e3eb;
    height: 1px;
    border-radius: 10px;
  }

  .ant-table-row:after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 0;
    background: #f0f0f0;
    height: 1px;
    border-radius: 10px;
  }

  .ant-table-row:hover .home-datasource-edit-button {
    opacity: 1;
  }

  .ant-table-tbody > tr > td.ant-table-cell-row-hover:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .ant-table-tbody > tr > td.ant-table-cell-row-hover:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  td.ant-table-column-sort {
    background: unset;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: #f5f7fa;
  }

  .ant-table-cell {
    height: 56px;
    margin-left: 24px;
    max-width: 184px; // actual width + padding right
  }

  /** the two-side shadow when scrollbars exist */

  .ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {
    box-shadow: none;
  }

  .ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container::after {
    box-shadow: none;
  }
  .ant-table-tbody > tr > td {
    padding: 16px 12px;
  }
`;
