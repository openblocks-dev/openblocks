import {
  Comp,
  CompAction,
  CompActionTypes,
  CompParams,
  ConstructorToDataType,
  ConstructorToView,
  MultiBaseComp,
} from "openblocks-core";
import {
  ArrayControl,
  BoolCodeControl,
  StringControl,
} from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import {
  MultiCompBuilder,
  valueComp,
  withContext,
  withDefault,
} from "comps/generators";
import { list } from "comps/generators/list";
import { ToViewReturn } from "comps/generators/multi";
import { genRandomKey } from "comps/utils/idGenerator";
import { AutoArea, Option } from "openblocks-design";
import { getNextEntityName } from "util/stringUtils";
import { ButtonEventHandlerControl } from "./eventHandlerControl";
import _ from "lodash";
import { JSONValue } from "util/jsonTypes";
import {
  disabledPropertyView,
  hiddenPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import styled from "styled-components";
import { ViewDocIcon } from "assets/icons";
const OptionTypes = [
  {
    label: trans("prop.manual"),
    value: "manual",
  },
  {
    label: trans("prop.map"),
    value: "map",
  },
] as const;
// All options must contain label
type OptionChildType = { label: Comp<string> };
type OptionsControlType = new (params: CompParams<any>) => MultiBaseComp<
  OptionChildType,
  any,
  any
> &
  Comp<any, any, any>;
type OptionControlParam = {
  // list title
  title?: string;
  // The new option's label name
  newOptionLabel?: string;
};
const shapeOptions = [
  {
    label: trans("circle"),
    value: "circle",
  },
  {
    label: trans("square"),
    value: "square",
  },
] as const;
// Add dataIndex to each comp, required for drag and drop sorting
function withDataIndex<T extends OptionsControlType>(VariantComp: T) {
  // @ts-ignore
  class WithDataIndexComp extends VariantComp {
    dataIndex: string = "";
    getDataIndex() {
      if (!this.dataIndex) {
        this.dataIndex = genRandomKey();
      }
      return this.dataIndex;
    }
  }
  return WithDataIndexComp as new (
    params: CompParams<ConstructorToDataType<T>>
  ) => WithDataIndexComp;
}
// Deduplication, the same value takes the first one
function distinctValue<T extends ToViewReturn<OptionChildType>>(
  data: T[],
  uniqField: keyof T
) {
  if (!data || data.length <= 0) {
    return data;
  }
  const result: T[] = [];
  data.reduce((uniqValSet, item) => {
    const uniqVal = item[uniqField];
    if (!uniqValSet.has(uniqVal)) {
      result.push(item);
    }
    uniqValSet.add(uniqVal);
    return uniqValSet;
  }, new Set());
  return result;
}
type PickNumberFields<T> = {
  [key in keyof T]: T[key] extends number ? T[key] : never;
};
// Manually add options
export function manualOptionsControl<T extends OptionsControlType>(
  VariantComp: T,
  config: {
    // init value
    initOptions?: ConstructorToDataType<T>[];
    // Unique value field, used to deduplicate
    uniqField?: keyof ConstructorToView<T>;
    // auto-increment field
    autoIncField?: keyof PickNumberFields<ConstructorToView<T>>;
  }
) {
  type OptionDataType = ConstructorToDataType<T>;
  const ManualComp = list(withDataIndex(VariantComp));
  const TmpManualOptionControl = new MultiCompBuilder(
    {
      manual: ManualComp,
    },
    (props) => {
      const view = props.manual.map((m) => m.getView());
      return config.uniqField ? distinctValue(view, config.uniqField) : view;
    }
  )
    .setPropertyViewFn(() => {
      throw new Error("Method not implemented.");
    })
    .build();
  class ManualOptionControl extends TmpManualOptionControl {
    private getNewId(): number {
      const { autoIncField } = config;
      if (!autoIncField) return 0;
      const view = this.children.manual.getView().map((m) => m.getView());
      const ids = new Set(view.map((tab) => tab[autoIncField]));
      let id = 0;
      while (ids.has(id)) ++id;
      return id;
    }
    propertyView(param: OptionControlParam) {
      const manualComp = this.children.manual;
      const { autoIncField } = config;
      return (
        <Option
          itemTitle={(comp) => comp.children.label.getView()}
          popoverTitle={() => trans("edit")}
          content={(comp) => comp.getPropertyView()}
          items={manualComp.getView()}
          onAdd={() => {
            const label = getNextEntityName(
              param.newOptionLabel || trans("optionsControl.option") + " ",
              manualComp.getView().map((m) => m.children.label.getView())
            );
            const id = this.getNewId();
            manualComp.dispatch(
              manualComp.pushAction({
                label: label,
                ...(autoIncField ? { [autoIncField]: id } : {}),
              } as OptionDataType)
            );
          }}
          onDel={(i) => manualComp.dispatch(manualComp.deleteAction(i))}
          onCopy={(comp) => {
            const id = this.getNewId();
            manualComp.dispatch(
              manualComp.pushAction({
                ...comp.toJsonValue(),
                ...(autoIncField ? { [autoIncField]: id } : {}),
              })
            );
          }}
          onMove={(fromIndex, toIndex) => {
            const action = manualComp.arrayMoveAction(fromIndex, toIndex);
            manualComp.dispatch(action);
          }}
          dataIndex={(comp) => comp.getDataIndex()}
          uniqVal={
            config.uniqField &&
            ((comp) => (comp.children as any)[config.uniqField].getView())
          }
          title={param.title}
        />
      );
    }
  }
  return config.initOptions
    ? withDefault(ManualOptionControl, { manual: config.initOptions })
    : ManualOptionControl;
}
const TipLabel = styled.p`
  display: inline;
  margin: 2px 0 0 0;
  padding: 0;
  font-size: 13px;
  color: #9195a3;
  line-height: 18px;
  cursor: pointer;
  :hover g g {
    stroke: #315efb;
  }
`;
const DocIcon = styled(ViewDocIcon)`
  transform: translateY(1px);
  margin-right: 6px;
`;
const optionListDocUrl = trans("docUrls.optionList");
const OptionTip = optionListDocUrl ? (
  <TipLabel onClick={() => window.open(optionListDocUrl)}>
    <DocIcon title={trans("optionsControl.viewDocs")} />
    {trans("optionsControl.tip")}
  </TipLabel>
) : (
  <></>
);
// auto mapping
export function mapOptionsControl<T extends OptionsControlType>(
  VariantComp: T,
  uniqField?: keyof ConstructorToView<T>
) {
  const MapDataComp = withContext(VariantComp, ["item", "i"] as const);
  const TmpOptionControl = new MultiCompBuilder(
    {
      data: withDefault(ArrayControl, "[]"),
      mapData: MapDataComp,
    },
    (props) => {
      const view = props.data.map((d, i) => {
        return props.mapData({
          item: d,
          i: i,
        });
      });
      return uniqField ? distinctValue(view, uniqField) : view;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.data.propertyView({ label: trans("data") })}
        <AutoArea>
          {children.mapData.getPropertyView()}
          {OptionTip}
        </AutoArea>
      </>
    ))
    .build();
  return class extends TmpOptionControl {
    private lastDataExample: any = {};
    override reduce(action: CompAction) {
      const comp = super.reduce(action);
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        if (comp.children.data !== this.children.data) {
          const sourceArray = comp.children.data.getView();
          const dataExample = sourceArray ? sourceArray[0] : undefined;
          if (dataExample && !_.isEqual(comp.lastDataExample, dataExample)) {
            comp.lastDataExample = dataExample;
            return comp.updateContext(dataExample);
          }
        }
      }
      return comp;
    }
    updateContext(dataExample: JSONValue) {
      return this.setChild(
        "mapData",
        this.children.mapData.reduce(
          MapDataComp.changeContextDataAction({
            item: dataExample,
            i: 0,
          })
        )
      );
    }
  };
}
export function optionsControl<T extends OptionsControlType>(
  VariantComp: T,
  config: {
    // init value
    initOptions?: ConstructorToDataType<T>[];
    // Unique value field, used to deduplicate
    uniqField?: keyof ConstructorToView<T>;
    // manual mode list title
    title?: string;
  }
) {
  type OptionViewType = ConstructorToView<T>;
  const TmpOptionControl = new MultiCompBuilder(
    {
      optionType: dropdownControl(OptionTypes, "manual"),
      manual: manualOptionsControl(VariantComp, {
        initOptions: config.initOptions,
        uniqField: config.uniqField,
      }),
      mapData: mapOptionsControl(VariantComp, config.uniqField),
    },
    (props): OptionViewType[] => {
      if (props.optionType === "manual") {
        return props.manual;
      } else {
        return props.mapData;
      }
    }
  )
    .setPropertyViewFn(() => {
      throw new Error("Method not implemented.");
    })
    .build();
  return class extends TmpOptionControl {
    propertyView(param: OptionControlParam) {
      return (
        <>
          {this.children.optionType.propertyView({
            radioButton: true,
            type: "oneline",
          })}
          {this.children.optionType.getView() === "manual"
            ? this.children.manual.propertyView(param)
            : this.children.mapData.getPropertyView()}
        </>
      );
    }
  };
}
const SelectInputOption = new MultiCompBuilder(
  {
    value: StringControl,
    label: StringControl,
    image: StringControl,
    imageShape: dropdownControl(shapeOptions, "circle"),
    disabled: BoolCodeControl,
    hidden: BoolCodeControl,
  },
  (props) => props
)
  .setPropertyViewFn((children) => (
    <>
      {children.label.propertyView({
        label: trans("label"),
        placeholder: "{{item}}",
      })}
      {children.value.propertyView({ label: trans("value") })}
      {children.image.propertyView({ label: trans("imageUrl") })}
      {disabledPropertyView(children)}
      {hiddenPropertyView(children)}
    </>
  ))
  .build();
export const SelectInputOptionControl = optionsControl(SelectInputOption, {
  initOptions: [
    { label: trans("optionsControl.optionI", { i: 1 }), value: "1" },
    { label: trans("optionsControl.optionI", { i: 2 }), value: "2" },
  ],
  uniqField: "value",
});
const DropdownOption = new MultiCompBuilder(
  {
    label: StringControl,
    disabled: BoolCodeControl,
    hidden: BoolCodeControl,
    onEvent: ButtonEventHandlerControl,
  },
  (props) => props
)
  .setPropertyViewFn((children) => (
    <>
      {children.label.propertyView({
        label: trans("label"),
        placeholder: "{{item}}",
      })}
      {disabledPropertyView(children)}
      {hiddenPropertyView(children)}
      {children.onEvent.getPropertyView()}
    </>
  ))
  .build();
export const DropdownOptionControl = optionsControl(DropdownOption, {
  initOptions: [
    { label: trans("optionsControl.optionI", { i: 1 }) },
    { label: trans("optionsControl.optionI", { i: 2 }) },
  ],
});
const TabsOption = new MultiCompBuilder(
  {
    id: valueComp<number>(-1),
    label: StringControl,
    key: StringControl,
    hidden: BoolCodeControl,
  },
  (props) => props
)
  .setPropertyViewFn((children) => (
    <>
      {children.key.propertyView({ label: trans("value") })}
      {children.label.propertyView({ label: trans("label") })}
      {hiddenPropertyView(children)}
    </>
  ))
  .build();
export const TabsOptionControl = manualOptionsControl(TabsOption, {
  initOptions: [
    { id: 0, key: "Tab1", label: "Tab1" },
    { id: 1, key: "Tab2", label: "Tab2" },
  ],
  uniqField: "key",
  autoIncField: "id",
});
