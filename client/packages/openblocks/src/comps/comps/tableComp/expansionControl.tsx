import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "comps/comps/containerComp/containerView";
import { BoolControl } from "comps/controls/boolControl";
import { SlotControl } from "comps/controls/slotControl";
import { withSelectedMultiContext } from "comps/generators";
import { ControlItemCompBuilder } from "comps/generators/controlCompBuilder";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { trans } from "i18n";
import _ from "lodash";
import { ConstructorToView, wrapChildAction } from "openblocks-core";
import { useContext } from "react";
import { tryToNumber } from "util/convertUtils";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import { OB_ROW_ORI_INDEX, RecordType } from "./tableUtils";
import { NameGenerator } from "comps/utils";
import { JSONValue } from "util/jsonTypes";

const ContextSlotControl = withSelectedMultiContext(SlotControl);

const ContainerView = (props: ContainerBaseProps) => {
  return <InnerGrid {...props} emptyRows={15} autoHeight />;
};

function ExpandView(props: { containerProps: ConstructorToView<typeof SimpleContainerComp> }) {
  const { containerProps } = props;
  const background = useContext(BackgroundColorContext);
  return (
    <ContainerView
      {...containerProps}
      isDroppable={false}
      isDraggable={false}
      isResizable={false}
      isSelectable={false}
      bgColor={background}
      items={gridItemCompToGridItems(containerProps.items)}
      hintPlaceholder=""
      containerPadding={[4, 4]}
    />
  );
}

let ExpansionControlTmp = (function () {
  const label = trans("table.expandable");
  return new ControlItemCompBuilder(
    {
      expandable: BoolControl,
      slot: ContextSlotControl,
    },
    () => ({ expandableConfig: {}, expandModalView: null })
  )
    .setControlItemData({ filterText: label })
    .setPropertyViewFn((children, dispatch) => {
      return (
        <>
          {children.expandable.propertyView({ label })}
          {children.expandable.getView() &&
            children.slot
              .getSelectedComp()
              .getComp()
              .propertyView({ buttonText: trans("table.configExpandedView") })}
        </>
      );
    })
    .build();
})();

export class ExpansionControl extends ExpansionControlTmp {
  getView() {
    if (!this.children.expandable.getView()) {
      return { expandableConfig: {}, expandModalView: null };
    }
    const selectedContainer = this.children.slot.getSelectedComp();
    return {
      expandableConfig: {
        expandedRowRender: (record: RecordType, index: number) => {
          const slotControl = this.children.slot.getView()(
            {
              currentRow: _.omit(record, OB_ROW_ORI_INDEX),
              currentIndex: index,
              currentOriginalIndex: tryToNumber(record[OB_ROW_ORI_INDEX]),
            },
            String(record[OB_ROW_ORI_INDEX])
          );
          const containerProps = slotControl.children.container.getView();
          return <ExpandView key={record[OB_ROW_ORI_INDEX]} containerProps={containerProps} />;
        },
      },
      expandModalView: selectedContainer.getView(),
    };
  }

  setSelectionAction(selection: string, params?: Record<string, unknown>) {
    return wrapChildAction("slot", ContextSlotControl.setSelectionAction(selection, params));
  }

  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    return {
      ...this.toJsonValue(),
      slot: this.children.slot.getSelectedComp().getComp().getPasteValue(nameGenerator),
    };
  }

  reduce(action: any) {
    const comp = super.reduce(action);
    // console.info("ExpansionControl reduce. action: ", action, "\nthis: ", this, "\ncomp: ", comp);
    return comp;
  }
}
