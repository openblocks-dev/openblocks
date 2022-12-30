import { PropsWithChildren } from "react";
import styled from "styled-components";

export const Title1 = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 28px;
`;

export const Title2 = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 20px;
`;

export const Desc = styled.div`
  font-size: 16px;
  line-height: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin-bottom: 40px;
`;

const TableWrapper = styled.div`
  border: 1px solid #d7d9e0;
  overflow: hidden;
  border-radius: 4px;

  table {
    table-layout: auto;
    color: #333;
    width: 100%;
    th {
      background-color: #f9f9fa;
      text-align: left;
    }
    th,
    td {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      padding: 8px;
      &:last-child {
        border-right: 0;
      }
    }
    tr {
      &:hover {
        td {
          background-color: #f9f9fa;
        }
      }
      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;

export function MarkdownTable(props: PropsWithChildren<{}>) {
  return (
    <TableWrapper>
      <table>{props.children}</table>
    </TableWrapper>
  );
}
