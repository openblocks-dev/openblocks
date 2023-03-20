import { withTypeAndChildrenAbstract } from "comps/generators/withType";
import { trans } from "i18n";
import _, { includes } from "lodash";
import { CompAction } from "openblocks-core";
import {
  Dropdown,
  QueryConfigWrapper,
  QueryTutorialButton,
  ValueFromOption,
} from "openblocks-design";
import { QueryTutorials } from "util/tutorialUtils";
import { ParamsStringControl } from "../controls/paramsControl";
import { withPropertyViewFn } from "../generators";
import { InputChangeSet } from "./inputChangeSet";
import { QueryConfigLabelMethod } from "./query";
import { buildQueryCommand, toQueryView } from "./queryCompUtils";

const CommandOptions = [
  { label: trans("googleSheets.readData"), value: "readData" },
  { label: trans("googleSheets.appendData"), value: "appendData" },
  { label: trans("googleSheets.updateData"), value: "updateData" },
  { label: trans("googleSheets.deleteData"), value: "deleteData" },
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

const RowIndexChildren = {
  ...IdChildren,
  rowIndexString: RowIndex,
};

const CommandMap = {
  readData: buildQueryCommand(IdChildren),
  appendData: buildQueryCommand({
    ...IdChildren,
    changeSet: withPropertyViewFn(InputChangeSet, (comp) => (
      <>{comp.propertyView({ label: trans("googleSheets.appendData") })}</>
    )),
  }),
  updateData: buildQueryCommand({
    ...IdChildren,
    rowIndexString: RowIndex,
    changeSet: withPropertyViewFn(InputChangeSet, (comp) => (
      <>{comp.propertyView({ label: trans("googleSheets.updateData") })}</>
    )),
  }),
  deleteData: buildQueryCommand(RowIndexChildren),
  clearData: buildQueryCommand(RowIndexChildren),
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
      includes(["appendData", "updateData", "deleteData", "clearData"], action.value["commandType"])
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
                  this.changeValueAction({
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
