import { BoolControl } from "comps/controls/boolControl";
import { BoolCodeControl, jsonControl } from "comps/controls/codeControl";
import { jsonExposingStateControl, jsonStateControl } from "comps/controls/codeStateControl";
import { NewChildren } from "comps/generators/uiCompBuilder";
import { CommonNameConfig, NameConfig } from "comps/generators/withExposing";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";
import { ControlNode, Section, sectionNames } from "openblocks-design";
import { trans } from "i18n";
import { RecordConstructorToComp, RecordConstructorToView } from "openblocks-core";
import { ReactNode, useEffect } from "react";
import { check } from "util/convertUtils";
import { formDataChildren, FormDataPropertyView } from "../formComp/formDataConstants";
import {
  SelectInputInvalidConfig,
  SelectInputValidationChildren,
  SelectInputValidationSection,
} from "../selectInputComp/selectInputConstants";
import { defaultTreeData, TreeDataNode, treeDataTooltip } from "./treeConstants";

function checkNodeValue(value: any, key: string): string | number {
  return check(value, ["string", "number"], key);
}

function checkDataNodes(value: any, key?: string): TreeDataNode[] | undefined {
  return check(value, ["array", "undefined"], key, (node, k) => {
    check(node, ["object"], k);
    check(node["label"], ["string"], "label");
    checkNodeValue(node["value"], "value");
    check(node["disabled"], ["boolean", "undefined"], "disabled");
    check(node["selectable"], ["boolean", "undefined"], "selectable");
    check(node["checkable"], ["boolean", "undefined"], "checkable");
    check(node["disableCheckbox"], ["boolean", "undefined"], "disableCheckbox");
    check(node["isLeaf"], ["boolean", "undefined"], "isLeaf");
    checkDataNodes(node["children"], "children");
    return node;
  });
}

function convertTreeData(data: any) {
  return data === "" ? [] : checkDataNodes(data) ?? [];
}

function checkNodeValues(value: any): (string | number)[] {
  return value === "" ? [] : check(value, ["array"], undefined, checkNodeValue);
}

function traverse(data: TreeDataNode[] | undefined, f: (n: TreeDataNode) => boolean | void) {
  if (data) {
    for (const d of data) {
      if (f(d) === false || !traverse(d.children, f)) {
        return false;
      }
    }
  }
  return true;
}

function expandAll(data: TreeDataNode[]) {
  const ret: (string | number)[] = [];
  traverse(data, (n) => {
    if (n.children && n.children.length > 0) {
      ret.push(n.value);
    }
  });
  return ret;
}

export const treeCommonChildren = {
  // TODO: support loading mode
  treeData: jsonControl(convertTreeData, defaultTreeData),
  value: jsonExposingStateControl("value", checkNodeValues, []),
  expanded: jsonStateControl(checkNodeValues, []),
  defaultExpandAll: BoolControl,
  showLine: BoolControl,
  showLeafIcon: BoolControl,
  disabled: BoolCodeControl,
  ...SelectInputValidationChildren,
  ...formDataChildren,
};

export function useTree(props: RecordConstructorToView<typeof treeCommonChildren>) {
  const { treeData, expanded, defaultExpandAll } = props;
  useEffect(() => {
    if (defaultExpandAll) {
      expanded.onChange(expandAll(treeData));
    } else {
      expanded.reset();
    }
  }, [defaultExpandAll]);
}

type TreeCommonComp = NewChildren<RecordConstructorToComp<typeof treeCommonChildren>>;

export const treeDataPropertyView = (children: TreeCommonComp) =>
  children.treeData.propertyView({ label: trans("tree.treeData"), tooltip: treeDataTooltip });

export const valuePropertyView = (children: TreeCommonComp) =>
  children.value.propertyView({ label: trans("tree.value") });

export const formSection = (children: TreeCommonComp) => <FormDataPropertyView {...children} />;

export const expandSection = (children: TreeCommonComp, other?: ControlNode) => (
  <Section name={trans("prop.expand")}>
    {children.expanded.propertyView({ label: trans("tree.expanded") })}
    {children.defaultExpandAll.propertyView({ label: trans("tree.defaultExpandAll") })}
    {other}
  </Section>
);

export const intersectSection = (children: TreeCommonComp, onEvent?: ControlNode) => (
  <Section name={sectionNames.interaction}>
    {onEvent}
    {disabledPropertyView(children)}
  </Section>
);

export const advancedSection = (children: TreeCommonComp, other?: ControlNode) => (
  <>
    <Section name={sectionNames.advanced}>
      {children.showLine.propertyView({ label: trans("tree.showLine") })}
      {children.showLine.getView() &&
        children.showLeafIcon.propertyView({ label: trans("tree.showLeafIcon") })}
      {other}
    </Section>
    <SelectInputValidationSection {...children} />
    <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
  </>
);

export const TreeNameConfigs = [
  // TODO: more data
  new NameConfig("value", trans("tree.valueDesc")),
  new NameConfig("treeData", trans("tree.treeDataDesc")),
  new NameConfig("expanded", trans("tree.expandedDesc")),
  SelectInputInvalidConfig,
  ...CommonNameConfig,
];
