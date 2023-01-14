import {
  ActionArrayParamConfig,
  ActionParamConfig,
  KeyedParamConfig,
  QueryConfig,
} from "openblocks-sdk/dataSource";
import {
  ParamsBooleanCodeControl,
  ParamsNumberControl,
  ParamsStringControl,
  ParamsControlType,
  ParamsBooleanControl,
} from "comps/controls/paramsControl";
import { MultiCompBuilder, valueComp, withDefault } from "comps/generators";
import { withTypeAndChildrenAbstract } from "comps/generators/withType";
import {
  Dropdown,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
} from "openblocks-design";
import { ReactNode } from "react";
import { FunctionProperty, toQueryView } from "../queryCompUtils";
import { CompConstructor } from "openblocks-core";
import { dropdownControl } from "comps/controls/dropdownControl";
import { ControlType } from "comps/controls/controlParams";

function wrapConfig(paramsControl: ControlType, config: KeyedParamConfig) {
  return class extends paramsControl {
    getPropertyView(): ReactNode {
      return (
        <QueryConfigWrapper key={config.key}>
          <QueryConfigLabel tooltip={config.tooltip}>{config.label}</QueryConfigLabel>
          <QueryConfigItemWrapper>
            {this.propertyView({ placeholder: config.placeholder })}
          </QueryConfigItemWrapper>
        </QueryConfigWrapper>
      );
    }
  };
}

function isReadOnlyArray(obj: any): obj is readonly any[] {
  return Array.isArray(obj);
}

function isParamsControl(comp: any): comp is ParamsControlType {
  return !!comp["isParamsControl"];
}

function unionConfigToComp(config: QueryConfig): CompConstructor {
  const childrenMap: Record<string, CompConstructor> = {};
  config.actions.forEach((child) => {
    childrenMap[child.actionName] = configToComp(child.params);
  });

  const TmpComp = withTypeAndChildrenAbstract(
    childrenMap,
    config.actions[0].actionName,
    {},
    "actionName",
    "action"
  );

  return class extends TmpComp {
    getView() {
      return this.children.action.getView();
    }
    override getPropertyView() {
      const currentActionName = this.children.actionName.getView();

      const options = config.actions.map((child) => ({
        label: child.label,
        value: child.actionName,
      }));

      return (
        <>
          <Dropdown
            placement="bottom"
            label={config.label}
            toolTip={config.tooltip}
            options={options}
            value={currentActionName}
            onChange={(value) => this.dispatchChangeAndPreserveAction({ actionName: value })}
          />
          {this.children.action.getPropertyView()}
        </>
      );
    }
  };
}

function arrayConfigToComp(config: ActionArrayParamConfig): CompConstructor {
  const childrenMap: Record<string, CompConstructor> = {};

  config.forEach((item) => {
    childrenMap[item.key] = configToComp(item);
  });

  const TmpComp = new MultiCompBuilder(childrenMap, () => {})
    .setPropertyViewFn((children) => {
      return <>{config.map((item) => children[item.key].getPropertyView())}</>;
    })
    .build();

  return class extends TmpComp {
    getView() {
      const result = {};
      Object.values(this.children).forEach((i) => {
        if (isParamsControl(i)) {
          Object.assign(result, i.getView());
        }
      });
      return result;
    }
  };
}

/**
 * export for test only
 */
export function configToComp(
  config: ActionParamConfig | ActionArrayParamConfig | QueryConfig
): CompConstructor {
  if (isReadOnlyArray(config)) {
    return arrayConfigToComp(config);
  }

  if (config.type === "query") {
    return unionConfigToComp(config);
  }

  if (config.type === "select") {
    return wrapConfig(
      dropdownControl(config.options, config.defaultValue ?? config.options?.[0].value),
      config
    );
  }

  let Comp: ControlType | null = null;
  if (config.type === "textInput") {
    Comp = wrapConfig(ParamsStringControl, config);
  }

  if (config.type === "numberInput") {
    Comp = wrapConfig(ParamsNumberControl, config);
  }

  if (config.type === "booleanInput") {
    Comp = wrapConfig(ParamsBooleanCodeControl, config);
  }

  if (config.type === "switch") {
    Comp = wrapConfig(ParamsBooleanControl, config);
  }

  if (!Comp) {
    console.warn("unknown config:", config);
    Comp = valueComp("");
  }

  if (config.defaultValue) {
    Comp = withDefault(Comp, config.defaultValue);
  }
  return Comp;
}

export function toPluginQuery(queryConfig: QueryConfig) {
  const TmpQuery = configToComp(queryConfig);
  return class V2Query extends TmpQuery {
    override getView() {
      const params = Object.entries(super.getView()).map(([key, value]) => ({ key, value }));
      return toQueryView(params as FunctionProperty[]);
    }
  };
}
