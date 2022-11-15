import { Table } from "antd";
import { ColumnType, TableProps } from "antd/es/table";
import {
  defaultTheme,
  handleToHoverRow,
  handleToSelectedRow,
  TableStyleType,
} from "comps/controls/styleControlConstants";
import { darkenColor } from "openblocks-design";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import styled, { css } from "styled-components";
import { useUserViewMode } from "util/hooks";
import { RowColorViewType } from "comps/comps/tableComp/tableTypes";

function genLinerGradient(color: string) {
  return `linear-gradient(${color}, ${color})`;
}

const getStyle = (style: TableStyleType) => {
  const background = genLinerGradient(style.background);
  const selectedRowBackground = genLinerGradient(style.selectedRowBackground);
  const hoverRowBackground = genLinerGradient(style.hoverRowBackground);
  const alternateBackground = genLinerGradient(style.alternateBackground);
  return css`
    border-color: ${style.border};
    border-radius: ${style.radius};

    .ant-table > .ant-table-container > .ant-table-content > table {
      thead tr th,
      tbody tr td {
        border-color: ${style.border};
      }

      .ant-table-thead > tr > th::before {
        background-color: ${style.border};
      }
    }

    .ant-table-thead {
      tr th {
        background-color: ${style.headerBackground};
        color: ${style.headerText};

        &.ant-table-column-has-sorters:hover {
          background-color: ${darkenColor(style.headerBackground, 0.05)};
        }

        .ant-table-column-sorter {
          color: ${style.headerText === defaultTheme.textDark ? "#bfbfbf" : style.headerText};
        }
      }
    }

    .ant-table-tbody {
      tr:nth-of-type(2n + 1) {
        &,
        td {
          background: ${background};
          color: ${style.cellText};
        }
      }

      tr:nth-of-type(2n) {
        &,
        td {
          background: ${alternateBackground};
          color: ${style.cellText};
        }
      }

      // selected row
      tr:nth-of-type(2n + 1).ant-table-row-selected {
        td {
          background: ${selectedRowBackground}, ${background};
        }

        td.ant-table-cell-row-hover,
        &:hover td {
          background: ${hoverRowBackground}, ${selectedRowBackground}, ${background};
        }
      }

      tr:nth-of-type(2n).ant-table-row-selected {
        td {
          background: ${selectedRowBackground}, ${alternateBackground};
        }

        td.ant-table-cell-row-hover,
        &:hover td {
          background: ${hoverRowBackground}, ${selectedRowBackground}, ${alternateBackground};
        }
      }

      // hover row
      > tr:nth-of-type(2n + 1) > td.ant-table-cell-row-hover {
        &,
        > div:nth-of-type(2) {
          background: ${hoverRowBackground}, ${background};
        }
      }

      > tr:nth-of-type(2n) > td.ant-table-cell-row-hover {
        &,
        > div:nth-of-type(2) {
          background: ${hoverRowBackground}, ${alternateBackground};
        }
      }
    }
  `;
};

const TableTh = styled.th<{ width?: number }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
  ${(props) => props.width && `width: ${props.width}px`};
`;

const TableTd = styled.td<{ background: string }>`
  ${(props) =>
    props.background &&
    `
      background: ${props.background} !important;
   `};
`;

const MinColumnWidth = 55;
const RowContext = React.createContext<{
  hover: boolean;
  selected: boolean;
}>({ hover: false, selected: false });

const ResizeableTitle = (props: any) => {
  const { onResize, onResizeStop, width, viewModeResizable, ...restProps } = props;
  const [widthChild, setWidthChild] = useState(0);
  const elementRef = useRef(null);
  const isUserViewMode = useUserViewMode();

  const setChildWidth = () => {
    if (width && width > 0) {
      // There is width, no need for childWidth
      return;
    }
    setWidthChild((elementRef.current as any).getBoundingClientRect().width);
  };

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    setChildWidth();
  }, []);

  if (isUserViewMode && !viewModeResizable) {
    return <TableTh ref={elementRef} {...restProps} width={width} />;
  }

  return (
    <Resizable
      width={width > 0 ? width : widthChild}
      height={0}
      onResize={(e: React.SyntheticEvent, { size }: { size: { width: number } }) =>
        onResize(size.width)
      }
      onResizeStart={(e) => {
        setChildWidth();
        e.stopPropagation();
        e.preventDefault();
      }}
      onResizeStop={onResizeStop}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <TableTh ref={elementRef} {...restProps} />
    </Resizable>
  );
};
type CustomColumnType<RecordType> = ColumnType<RecordType> & {
  onWidthResize?: (width: number) => void;
};
type CustomTableProps<RecordType> = Omit<TableProps<RecordType>, "components" | "columns"> & {
  columns: CustomColumnType<RecordType>[];
  viewModeResizable: boolean;
  rowColor: RowColorViewType;
};

function TableCellView(props: {
  record: any;
  title: string;
  rowColor: RowColorViewType;
  rowIndex: number;
  children: any;
}) {
  const { record, title, rowIndex, rowColor, children, ...restProps } = props;
  const rowContext = useContext(RowContext);
  if (!record) {
    return <td {...restProps}>{children}</td>;
  }
  const color = rowColor({
    currentRow: record.record,
    currentIndex: rowIndex,
    currentOriginalIndex: record.index,
    columnTitle: title,
  });
  let background = "";
  if (color) {
    background = genLinerGradient(color);
  }
  if (color && rowContext.selected) {
    background = genLinerGradient(handleToSelectedRow(color)) + "," + background;
  }
  if (color && rowContext.hover) {
    background = genLinerGradient(handleToHoverRow(color)) + "," + background;
  }
  return (
    <TableTd {...restProps} background={background}>
      {children}
    </TableTd>
  );
}

function TableRowView(props: any) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <RowContext.Provider value={{ hover: hover, selected: selected }}>
      <tr
        {...props}
        tabIndex={-1}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
      ></tr>
    </RowContext.Provider>
  );
}

/**
 * A table with adjustable column width, width less than 0 means auto column width
 */
function ResizeableTable<RecordType extends object>(props: CustomTableProps<RecordType>) {
  const [resizeData, setResizeData] = useState({
    index: -1,
    width: -1,
  });
  const columns = props.columns.map((col, index) => {
    const width = resizeData.index === index ? resizeData.width : col.width;
    return {
      ...col,
      width: width && width > 0 ? width : -1,
      onCell: (record: RecordType, rowIndex: any) => ({
        record,
        title: col.title as any,
        rowColor: props.rowColor,
        rowIndex: rowIndex,
      }),
      onHeaderCell: (column: any) => ({
        width: column.width,
        title: column.title,
        viewModeResizable: props.viewModeResizable,
        onResize: (width: number) => {
          if (width) {
            setResizeData({
              index: index,
              width: width,
            });
          }
        },
        onResizeStop: (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
          setResizeData({
            index: -1,
            width: -1,
          });
          if (col.onWidthResize) {
            col.onWidthResize(size.width);
          }
        },
      }),
    };
  });

  return (
    <Table<RecordType>
      components={{
        header: {
          cell: ResizeableTitle,
        },
        body: {
          cell: TableCellView,
          row: TableRowView,
        },
      }}
      {...props}
      pagination={false}
      columns={columns}
      scroll={{ x: MinColumnWidth * columns.length }}
    ></Table>
  );
}

ResizeableTable.whyDidYouRender = true;
export { ResizeableTable };

export const TableWrapper = styled.div<{
  $style: TableStyleType;
  $hideFooterBar: boolean;
  $size?: string;
}>`
  overflow: hidden;
  background: white;
  border: 1px solid #d7d9e0;

  .ant-table {
    .ant-table-container {
      border-left: unset;

      .ant-table-content {
        table {
          border-top: unset;

          td {
            ${(props) =>
              props.$size &&
              `padding: ${
                props.$size === "small"
                  ? "8.5px 8px"
                  : props.$size === "middle"
                  ? "12.5px 8px"
                  : "16.5px 16px"
              }`}
          }

          colgroup col {
            min-width: ${MinColumnWidth}px;
          }

          thead > tr:first-child {
            th:last-child {
              border-right: unset;
            }
          }

          tbody > tr > td:last-child {
            border-right: unset;
          }

          .ant-empty-img-simple-g {
            fill: #fff;
          }

          // hide the bottom border of the last row
          ${(props) =>
            props.$hideFooterBar &&
            `
              tbody > tr:last-child > td {
                border-bottom: unset;
              }
          `}
        }
      }
    }
  }

  ${(props) => props.$style && getStyle(props.$style)}
`;
