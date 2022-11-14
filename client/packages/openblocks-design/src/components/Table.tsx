import { Table } from "antd";
import styled from "styled-components";

const { Column } = Table;
const Container = styled.div`
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: transparent;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 0;
  }
  .ant-table-thead > tr > th {
    font-size: 13px;
    color: #8b8fa3;
    line-height: 13px;
    padding: 8px 0px;
    background-color: transparent;
  }
  .ant-table-tbody > tr > td {
    font-size: 13px;
    color: #333333;
    line-height: 13px;
    padding: 5px 0px 4px 0px;
  }
  .ant-table-tbody > tr > td {
    border-bottom: none;
  }
  /* shadow for scrollbar */
  .ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {
    box-shadow: none;
  }
  .ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container::after {
    box-shadow: none;
  }
`;

export const TableShow = (props: { data: any }) => {
  return (
    <Container>
      <Table dataSource={props.data} pagination={false} scroll={{ x: "max-content", y: 234 }}>
        {Object.keys(props.data[0]).map((item) => {
          return <Column title={item} dataIndex={item} key={item} />;
        })}
      </Table>
    </Container>
  );
};
