import { MultiBaseComp } from "openblocks-core";
import { ModuleComp } from "comps/comps/moduleComp/moduleComp";
import { BoolPureControl } from "comps/controls/boolControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { keyValueListControl } from "comps/controls/keyValueControl";
import { withDefault } from "comps/generators";
import { list } from "comps/generators/list";
import {
  parseChildrenFromValueAndChildrenMap,
  ToInstanceType,
  ToViewReturn,
} from "comps/generators/multi";
import { genRandomKey } from "comps/utils/idGenerator";
import { AppTypeEnum } from "constants/applicationConstants";
import { BranchDiv, Dropdown } from "openblocks-design";
import _ from "lodash";
import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { normalAppListSelector } from "redux/selectors/applicationSelector";
import { IconControl } from "comps/controls/iconControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { fetchAllApplications } from "redux/reduxActions/applicationActions";

function AppSelectorPropertyView(props: {
  onChange: (label: string, value: string) => void;
  appId: string;
}) {
  const { appId, onChange } = props;
  const apps = useSelector(normalAppListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (apps.length <= 0) dispatch(fetchAllApplications({}));
  }, [apps]);
  const options = useMemo(
    () =>
      apps
        .filter((app) => app.applicationType === AppTypeEnum.Application)
        .map((app) => ({
          label: app.name,
          value: app.applicationId,
        })),
    [apps]
  );
  const valueLabelMap = useMemo(() => {
    return new Map(options.map((o) => [o.value, o.label]));
  }, [options]);

  return (
    <Dropdown
      value={appId}
      options={options}
      label={trans("aggregation.chooseApp")}
      onChange={(value) => {
        onChange(valueLabelMap.get(value) || "", value);
      }}
    />
  );
}

// @ts-ignore
class AppSelectorControl extends ModuleComp {
  getAppId() {
    return this.children.appId.getView();
  }

  propertyView(param: { onChange: (label: string) => void }) {
    return (
      <AppSelectorPropertyView
        appId={this.children.appId.getView()}
        onChange={(label, value) => {
          this.dispatchChangeValueAction({
            appId: value,
          });
          param.onChange(label);
        }}
      />
    );
  }
}

const QueryHashList = withDefault(keyValueListControl(false, [], "string"), [
  { key: "", value: "" },
]);

const childrenMap = {
  label: StringControl,
  hidden: BoolCodeControl,
  app: AppSelectorControl,
  icon: IconControl,
  hideWhenNoPermission: withDefault(BoolPureControl, true),
  queryParam: QueryHashList,
  hashParam: QueryHashList,
};

type ChildrenType = ToInstanceType<typeof childrenMap> & {
  items: InstanceType<typeof LayoutMenuItemListComp>;
};

/**
 * copy from navItemComp,
 * FIXME: refactor it more general
 */
export class LayoutMenuItemComp extends MultiBaseComp<ChildrenType> {
  private itemKey?: string;

  override getView() {
    return _.mapValues(this.children, (c) => c.getView()) as ToViewReturn<ChildrenType>;
  }

  override getPropertyView(): ReactNode {
    const isLeaf = this.children.items.getView().length === 0;
    return (
      <>
        {isLeaf &&
          this.children.app.propertyView({
            onChange: (label) => {
              label && this.children.label.dispatchChangeValueAction(label);
            },
          })}
        {this.children.label.propertyView({ label: trans("label") })}
        {this.children.icon.propertyView({
          label: trans("icon"),
          tooltip: trans("aggregation.iconTooltip"),
        })}
        {hiddenPropertyView(this.children)}
        {isLeaf &&
          this.children.hideWhenNoPermission.propertyView({
            label: trans("aggregation.hideWhenNoPermission"),
          })}
        {isLeaf && (
          <>
            <BranchDiv>
              {this.children.queryParam.propertyView({
                label: trans("aggregation.queryParam"),
                layout: "vertical",
              })}
            </BranchDiv>
            <BranchDiv>
              {this.children.hashParam.propertyView({
                label: trans("aggregation.hashParam"),
                layout: "vertical",
              })}
            </BranchDiv>
          </>
        )}
      </>
    );
  }

  override parseChildrenFromValue(params: any) {
    return parseChildrenFromValueAndChildrenMap(params, {
      ...childrenMap,
      items: LayoutMenuItemListComp,
    }) as unknown as ChildrenType;
  }

  addSubItem(value: any) {
    this.children.items.addItem(value);
  }

  getItemKey() {
    if (!this.itemKey) {
      this.itemKey = genRandomKey();
    }
    return this.itemKey;
  }
}

export class LayoutMenuItemListComp extends list(LayoutMenuItemComp) {
  addItem(value?: any) {
    const data = this.getView();
    this.dispatch(
      this.pushAction(
        value || {
          label: trans("menuItem") + " " + (data.length + 1),
        }
      )
    );
  }

  deleteItem(index: number) {
    this.dispatch(this.deleteAction(index));
  }

  moveItem(from: number, to: number) {
    this.dispatch(this.arrayMoveAction(from, to));
  }
}
