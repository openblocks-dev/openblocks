import {
  ActionArrayParamConfig,
  ActionConfig,
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
  ParamsJsonControl,
  ParamsStringJsonControl,
} from "comps/controls/paramsControl";
import { MultiCompBuilder, valueComp, withDefault } from "comps/generators";
import { withTypeAndChildrenAbstract } from "comps/generators/withType";
import {
  Dropdown,
  DropdownOptionLabelWithDesc,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
} from "openblocks-design";
import React, { ReactNode, useEffect, useState } from "react";
import { FunctionProperty, toQueryView } from "../queryCompUtils";
import { CompConstructor } from "openblocks-core";
import { dropdownControl } from "comps/controls/dropdownControl";
import { ControlParams, ControlType } from "comps/controls/controlParams";
import MarkdownTooltip from "openblocks-design/src/components/MarkdownTooltip";
import { KeyValueControlParams, keyValueListControl } from "comps/controls/keyValueControl";
import { VariablesControl } from "../httpQuery/graphqlQuery";

function wrapConfig<CP extends {} = ControlParams>(
  paramsControl: ControlType,
  config: KeyedParamConfig,
  controlParams?: CP
) {
  return class extends paramsControl {
    getPropertyView(): ReactNode {
      return (
        <QueryConfigWrapper key={config.key}>
          <QueryConfigLabel
            tooltip={config.tooltip && <MarkdownTooltip>{config.tooltip}</MarkdownTooltip>}
          >
            {config.label}
          </QueryConfigLabel>
          <QueryConfigItemWrapper>
            {this.propertyView({ placeholder: config.placeholder, ...(controlParams || {}) })}
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

interface ActionSelectViewProps {
  config: QueryConfig;
  currentActionName: string;
  onActionChange: (actionName: string) => void;
}

function ActionSelectView(props: ActionSelectViewProps) {
  const { config, currentActionName, onActionChange } = props;
  const [currentCategory, setCategory] = useState<string>("");

  const filter = (category: string) => (i: ActionConfig) => {
    if (!i.category) {
      return !category;
    }
    return i.category.includes(category);
  };

  const categoryOptions =
    config.categories?.items?.map((child) => {
      return {
        label: child.label,
        value: child.value as string,
      };
    }) || [];

  const isActionOptionHasDesc = config.actions.some((i) => !!i.description);
  const actionOptions = config.actions.filter(filter(currentCategory)).map((child) => ({
    rawLabel: child.label,
    label: isActionOptionHasDesc ? (
      <DropdownOptionLabelWithDesc label={child.label} description={child.description || ""} />
    ) : (
      child.label
    ),
    value: child.actionName,
  }));

  const handleCategoryChange = (category: string) => {
    const firstAction = config.actions.find(filter(category));
    if (!firstAction) {
      return;
    }
    onActionChange(firstAction.actionName);
  };

  useEffect(() => {
    const action = config.actions.find((i) => i.actionName === currentActionName);
    if (action) {
      if (Array.isArray(action.category)) {
        setCategory(action.category[0]);
      }
    }
  }, [config.actions, currentActionName]);

  return (
    <>
      {(config.categories?.items || []).length > 0 && config.categories && (
        <Dropdown
          placement="bottom"
          label={config.categories.label}
          options={categoryOptions}
          value={currentCategory}
          onChange={handleCategoryChange}
          showSearch
          optionFilterProp="rawLabel"
        />
      )}
      <Dropdown
        showSearch
        optionFilterProp="rawLabel"
        optionLabelProp="rawLabel"
        placement="bottom"
        label={config.label}
        toolTip={config.tooltip}
        options={actionOptions}
        value={currentActionName}
        onChange={onActionChange}
      />
    </>
  );
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
      return (
        <>
          <ActionSelectView
            config={config}
            currentActionName={currentActionName}
            onActionChange={(value) => this.dispatchChangeAndPreserveAction({ actionName: value })}
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
      return (
        <>
          {config.map((item) => (
            <React.Fragment key={item.key}>{children[item.key].getPropertyView()}</React.Fragment>
          ))}
        </>
      );
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
    const options = config.options.map((i) => {
      const { value, label, description } = i;
      let labelNode: ReactNode = label;
      if (description) {
        labelNode = (
          <>
            <div>{label}</div>
            <div>{description}</div>
          </>
        );
      }
      return {
        label: labelNode,
        value,
      };
    });
    return wrapConfig(
      dropdownControl(options, config.defaultValue ?? config.options?.[0].value),
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

  if (config.type === "file") {
    Comp = wrapConfig(ParamsStringJsonControl, config);
  }

  if (config.type === "jsonInput") {
    Comp = wrapConfig(ParamsJsonControl, config, { styleName: "medium" });
  }

  if (config.type === "sqlInput") {
    Comp = wrapConfig(ParamsJsonControl, config, { styleName: "medium", language: "sql" });
  }

  if (config.type === "graphqlInput") {
    Comp = wrapConfig(ParamsStringControl, config, { styleName: "medium" });
  }

  if (config.type === "keyValueInput") {
    if (config.valueType === "json") {
      Comp = wrapConfig(withDefault(VariablesControl, [{ key: "", value: "" }]), config);
    } else {
      Comp = wrapConfig<KeyValueControlParams>(
        withDefault(keyValueListControl(), [{ key: "", value: "" }]),
        config,
        {
          keyFlexBasics: 184,
          valueFlexBasics: 232,
        }
      );
    }
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
