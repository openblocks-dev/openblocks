import { ArrayNumberControl, NumberControl } from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { MultiCompBuilder } from "comps/generators/multi";
import { stateComp, valueComp, withDefault } from "comps/generators";
import { changeChildAction } from "openblocks-core";
import { ConstructorToNodeType } from "openblocks-core";
import { trans } from "i18n";

const DEFAULT_PAGE_SIZE = 5;

export function getPageSize(
  showSizeChanger: boolean,
  pageSize: number,
  pageSizeOptions: number[],
  changeablePageSize: number
) {
  if (showSizeChanger) {
    return changeablePageSize || pageSizeOptions[0] || DEFAULT_PAGE_SIZE;
  } else {
    return pageSize || DEFAULT_PAGE_SIZE;
  }
}

export const PaginationControl = (function () {
  const childrenMap = {
    showQuickJumper: BoolControl,
    showSizeChanger: BoolControl,
    hideOnSinglePage: BoolControl,
    changeablePageSize: valueComp<number>(5),
    pageSize: NumberControl,
    total: NumberControl,
    pageNo: stateComp<number>(1),
    pageSizeOptions: withDefault(ArrayNumberControl, "[5, 10, 20, 50]"),
  };
  return new MultiCompBuilder(childrenMap, (props, dispatch) => {
    return {
      showQuickJumper: props.showQuickJumper,
      showSizeChanger: props.showSizeChanger,
      total: props.total,
      hideOnSinglePage: props.hideOnSinglePage,
      pageSize: getPageSize(
        props.showSizeChanger,
        props.pageSize,
        props.pageSizeOptions,
        props.changeablePageSize
      ),
      current: props.pageNo,
      pageSizeOptions: props.pageSizeOptions,
      onChange: (page: number, pageSize: number) => {
        props.showSizeChanger &&
          pageSize !== props.changeablePageSize &&
          dispatch(changeChildAction("changeablePageSize", pageSize));
        page !== props.pageNo && dispatch(changeChildAction("pageNo", page));
      },
    };
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.showQuickJumper.propertyView({
            label: trans("table.showQuickJumper"),
          })}
          {children.hideOnSinglePage.propertyView({
            label: trans("table.hideOnSinglePage"),
          })}
          {children.showSizeChanger.propertyView({
            label: trans("table.showSizeChanger"),
          })}
          {children.showSizeChanger.getView()
            ? children.pageSizeOptions.propertyView({
                label: trans("table.pageSizeOptions"),
              })
            : children.pageSize.propertyView({
                label: trans("table.pageSize"),
                placeholder: String(DEFAULT_PAGE_SIZE),
              })}
          {children.total.propertyView({
            label: trans("table.total"),
            tooltip: trans("table.totalTooltip"),
          })}
        </>
      );
    })
    .build();
})();

export type PaginationNodeType = ConstructorToNodeType<typeof PaginationControl>;
