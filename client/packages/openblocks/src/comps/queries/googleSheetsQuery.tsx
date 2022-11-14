import { withTypeAndChildrenAbstract } from "comps/generators/withType";
import _, { includes } from "lodash";
import React from "react";
import { trans } from "i18n";
import { withPropertyViewFn } from "../generators";
import { ParamsStringControl } from "../controls/paramsControl";
import { buildQueryCommand, toQueryView } from "./queryCompUtils";
import { ChangeSetTypeDropdown } from "./sqlQuery/changeSetComp";
import { QueryConfigLabelMethod } from "./query";
import { QueryTutorials } from "util/tutorialUtils";
import {
  Dropdown,
  QueryConfigWrapper,
  QueryTutorialButton,
  ValueFromOption,
} from "openblocks-design";
import { changeValueAction, CompAction } from "openblocks-core";
import { InputChangeSet } from "./inputChangeSet";

const CommandOptions = [
  { label: trans("googleSheets.readData"), value: "readData" },
  { label: trans("googleSheets.appendData"), value: "appendData" },
  { label: trans("googleSheets.updateData"), value: "updateData" },
  { label: trans("googleSheets.clearData"), value: "clearData" },
] as const;
const valueInfoMap = _.fromPairs(CommandOptions.map((option) => [option.value, option]));

const IdChildren = {
  spreadsheetId: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: trans("googleSheets.spreadsheetId"),
      placement: "bottom",
      placeholder: `my-spreadsheet-id`,
    })
  ),
  sheetName: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: trans("googleSheets.sheetName"),
      placement: "bottom",
      placeholder: `sheet1`,
    })
  ),
};

const RowIndex = withPropertyViewFn(ParamsStringControl, (comp) =>
  comp.propertyView({ label: trans("googleSheets.rowIndex"), placement: "bottom" })
);

const changeSetParams = {
  styleName: "medium" as const,
  placeholder: `{{ form.data }}`,
  label: " ",
  placement: "bottom" as const,
};

const CommandMap = {
  readData: buildQueryCommand(IdChildren),
  appendData: buildQueryCommand({
    ...IdChildren,
    changeSet: withPropertyViewFn(InputChangeSet, (comp) => (
      <>
        <ChangeSetTypeDropdown
          label={trans("googleSheets.appendData")}
          value={comp.children.compType.getView()}
          dispatch={comp.dispatch}
        />
        {comp.children.comp.propertyView(changeSetParams)}
      </>
    )),
  }),
  updateData: buildQueryCommand({
    ...IdChildren,
    rowIndexString: RowIndex,
    changeSet: withPropertyViewFn(InputChangeSet, (comp) => (
      <>
        <ChangeSetTypeDropdown
          label={trans("googleSheets.updateData")}
          value={comp.children.compType.getView()}
          dispatch={comp.dispatch}
        />
        {comp.children.comp.propertyView(changeSetParams)}
      </>
    )),
  }),
  clearData: buildQueryCommand({
    ...IdChildren,
    rowIndexString: RowIndex,
  }),
  // raw: HttpQuery,
};

const GoogleSheetsTmpQuery = withTypeAndChildrenAbstract(
  CommandMap,
  "readData",
  {},
  "commandType",
  "command"
);

export const GoogleSheetsQuery = class extends GoogleSheetsTmpQuery {
  isWrite(action: CompAction) {
    return (
      "value" in action &&
      includes(["appendData", "updateData", "deleteData"], action.value["commandType"])
    );
  }

  override getView() {
    const result = this.getTypeAndCompView();
    // if (result.compType === "raw") {
    //   return result.comp;
    // }
    return toQueryView(result.command);
  }

  override getPropertyView() {
    const showPanel = () => {
      // if (this.children.compType.getView() === "raw") {
      //   return (this.children.comp as HttpQuery).propertyView({
      //     datasourceId: "",
      //   });
      // } else {
      return this.children.command.getPropertyView();
      // }
    };
    const currentCommand = this.children.commandType.getView();
    return (
      <>
        <QueryConfigWrapper>
          <QueryConfigLabelMethod />
          <div style={{ width: "184px", flexGrow: 1 }}>
            <Dropdown
              options={CommandOptions}
              value={currentCommand}
              onChange={(value: ValueFromOption<typeof CommandOptions>) =>
                this.dispatch(
                  changeValueAction({
                    commandType: value,
                    command: this.children.command.toJsonValue(),
                  })
                )
              }
            />
          </div>
          <QueryTutorialButton
            label={trans("query.queryTutorialButton", {
              value: valueInfoMap[currentCommand].label,
            })}
            url={QueryTutorials.googleSheets[currentCommand]}
            styleName={"dropdownRight"}
          />
        </QueryConfigWrapper>

        {showPanel()}
      </>
    );
  }
};
