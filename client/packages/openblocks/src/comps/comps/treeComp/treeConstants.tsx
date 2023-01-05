import { trans } from "i18n";

export type TreeDataNode = {
  label: string;
  value: string | number;
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  children?: TreeDataNode[];
};

export const treeDataTooltip = (
  <li>
    1. label - {trans("tree.helpLabel")}
    <br />
    2. value - {trans("tree.helpValue")}
    <br />
    3. children - {trans("tree.helpChildren")}
    <br />
    4. disabled - {trans("tree.helpDisabled")}
    <br />
    5. selectable - {trans("tree.helpSelectable")}
    <br />
    6. checkable - {trans("tree.helpCheckable")}
    <br />
    7. disableCheckbox - {trans("tree.helpDisableCheckbox")}
  </li>
);

export const defaultTreeData: TreeDataNode[] = [
  {
    label: trans("tree.treeDataAsia"),
    value: "asia",
    children: [
      {
        label: trans("tree.treeDataChina"),
        value: "china",
        children: [
          {
            label: trans("tree.treeDataBeijing"),
            value: "beijing",
          },
          {
            label: trans("tree.treeDataShanghai"),
            value: "shanghai",
          },
        ],
      },
      {
        label: trans("tree.treeDataJapan"),
        value: "japan",
      },
    ],
  },
  {
    label: trans("tree.treeDataEurope"),
    value: "europe",
    disabled: true,
    children: [
      {
        label: trans("tree.treeDataEngland"),
        value: "england",
      },
      {
        label: trans("tree.treeDataFrance"),
        value: "france",
        checkable: false,
      },
      {
        label: trans("tree.treeDataGermany"),
        value: "germany",
        disableCheckbox: true,
      },
    ],
  },
  {
    label: trans("tree.treeDataNorthAmerica"),
    value: "northAmerica",
  },
];
