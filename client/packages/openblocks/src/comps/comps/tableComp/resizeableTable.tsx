import { Table } from "antd";
import { ColumnType, TableProps } from "antd/es/table";
import { defaultTheme, TableStyleType } from "comps/controls/styleControlConstants";
import { darkenColor } from "openblocks-design";
import React, { useEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import styled, { css } from "styled-components";
import { useUserViewMode } from "util/hooks";

const getStyle = (style: TableStyleType) => {
  const background = `linear-gradient(${style.background}, ${style.background})`;
  const selectedRowBackground = `linear-gradient(${style.selectedRowBackground}, ${style.selectedRowBackground})`;
  const hoverRowBackground = `linear-gradient(${style.hoverRowBackground}, ${style.hoverRowBackground})`;
  const alternateBackground = `linear-gradient(${style.alternateBackground}, ${style.alternateBackground})`;
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
const MinColumnWidth = 55;

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
};

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
