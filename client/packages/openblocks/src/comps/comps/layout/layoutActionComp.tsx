import { MultiCompBuilder, withDefault, withType } from "comps/generators";
import { Dropdown } from "components/Dropdown";
import { StringControl } from "comps/controls/codeControl";
import { BranchDiv, Treediv } from "components/Trees";
import { AppSelectComp } from "comps/comps/layout/appSelectComp";
import { keyValueListControl } from "comps/controls/keyValueControl";
import { trans } from "i18n";
import { KeyValue } from "types/common";
import { keyValueListToSearchStr } from "util/appUtils";
import { BoolControl, BoolPureControl } from "comps/controls/boolControl";
import history from "util/history";

type PropertyViewParam = {
  onAppChange?: (label: string) => void;
};

const QueryHashList = withDefault(keyValueListControl(false, [], "string"), [
  { key: "", value: "" },
]);

const OpenAppInitAction = (function () {
  return new MultiCompBuilder(
    {
      app: AppSelectComp,
      queryParam: QueryHashList,
      hashParam: QueryHashList,
      hideWhenNoPermission: withDefault(BoolPureControl, true),
    },
    (props) => null
  )
    .setPropertyViewFn((children) => {
      return <></>;
    })
    .build();
})();

class OpenAppAction extends OpenAppInitAction {
  override getView() {
    if (!this.children.app.children.appId.getView()) {
      return null;
    }
    return this.children.app.getView();
  }

  propertyView(param: PropertyViewParam) {
    return (
      <>
        <BranchDiv $type="inline">{this.children.app.propertyView(param)}</BranchDiv>
        <BranchDiv $type="switch">
          {this.children.hideWhenNoPermission.propertyView({
            label: trans("aggregation.hideWhenNoPermission"),
          })}
        </BranchDiv>
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
    );
  }
}

const OpenURLAction = (function () {
  return new MultiCompBuilder(
    {
      url: StringControl,
      newTab: BoolControl,
    },
    (props) => {
      if (!props.url) {
        return null;
      }
      return (
        <iframe
          title={props.url}
          src={props.url}
          width="100%"
          height="100%"
          style={{ border: "none", marginBottom: "-6px" }}
        />
      );
    }
  )
    .setPropertyViewFn((children) => {
      return (
        <>
          <BranchDiv $type="inline">{children.url.propertyView({ label: "URL" })}</BranchDiv>{" "}
          <BranchDiv $type="switch">
            {children.newTab.propertyView({
              label: trans("eventHandler.openInNewTab"),
            })}
          </BranchDiv>
        </>
      );
    })
    .build();
})();

const ActionMap = {
  openApp: OpenAppAction,
  openURL: OpenURLAction,
};
const ActionOptions: { label: string; value: keyof typeof ActionMap }[] = [
  {
    label: trans("eventHandler.goToApp"),
    value: "openApp",
  },
  {
    label: trans("eventHandler.goToURL"),
    value: "openURL",
  },
];

const TypedLayoutActionComp = withType(ActionMap, "openApp");

export class LayoutActionComp extends TypedLayoutActionComp {
  getView() {
    return this.children.comp.getView();
  }

  act(url: string) {
    const compType = this.children.compType.getView();
    if (compType === "openURL") {
      const childComp = this.children.comp as InstanceType<typeof OpenURLAction>;
      if (childComp.children.newTab.getView()) {
        window.open(childComp.children.url.getView(), "_blank");
        return;
      }
    }
    const urlWithParam = url + this.getUrlParam();
    history.push(urlWithParam);
  }

  private getUrlParam() {
    if (this.children.compType.getView() !== "openApp") {
      return "";
    }
    const childComp = this.children.comp as InstanceType<typeof OpenAppAction>;
    const queryParam = keyValueListToSearchStr(
      childComp.children.queryParam.getView().map((i) => i.getView() as KeyValue)
    );
    const hashParam = keyValueListToSearchStr(
      childComp.children.hashParam.getView().map((i) => i.getView() as KeyValue)
    );
    let param = "";
    if (queryParam) {
      param += `?${queryParam}`;
    }
    if (hashParam) {
      param += `#${hashParam}`;
    }
    return param;
  }

  propertyView(param: PropertyViewParam) {
    return (
      <>
        <Dropdown
          lineHeight={300}
          value={this.children.compType.getView()}
          options={ActionOptions}
          label={trans("eventHandler.action")}
          onChange={(value) => {
            this.dispatchChangeValueAction({
              compType: value,
            });
          }}
        />
        <Treediv>
          {"propertyView" in this.children.comp
            ? this.children.comp.propertyView(param)
            : this.children.comp.getPropertyView()}
        </Treediv>
      </>
    );
  }
}
