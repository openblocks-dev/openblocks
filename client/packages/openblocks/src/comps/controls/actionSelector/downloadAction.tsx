import { codeControl, StringControl } from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { MultiCompBuilder } from "comps/generators/multi";
import { BranchDiv } from "openblocks-design";
import { trans } from "i18n";
import { saveDataAsFile } from "util/fileUtils";

export const DownloadAction = (function () {
  const filetypeOptions = [
    { label: trans("eventHandler.exportNoFileType"), value: "empty" },
    { label: "TXT", value: "txt" },
    { label: "JSON", value: "json" },
    { label: "CSV", value: "csv" },
    { label: "Excel", value: "xlsx" },
    { label: "URL", value: "url" },
  ] as const;

  const childrenMap = {
    data: codeControl<any>((value) => value),
    filename: StringControl,
    filetype: dropdownControl(filetypeOptions, "txt"),
  };
  return new MultiCompBuilder(childrenMap, (props) => () => {
    saveDataAsFile({
      data: props.data,
      filename: props.filename,
      fileType: props.filetype,
      dataType: props.filetype === "url" ? "url" : undefined,
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <BranchDiv>
            {children.data.propertyView({
              label: trans("data"),
              layout: "vertical",
            })}
          </BranchDiv>
          <BranchDiv>
            {children.filename.propertyView({
              label: trans("eventHandler.fileName"),
              layout: "vertical",
              tooltip: trans("eventHandler.fileNameTooltip"),
            })}
          </BranchDiv>
          <BranchDiv $type={"inline"}>
            {children.filetype.propertyView({
              label: trans("eventHandler.fileType"),
            })}
          </BranchDiv>
        </>
      );
    })
    .build();
})();
