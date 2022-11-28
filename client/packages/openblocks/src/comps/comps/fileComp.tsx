import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload as AntdUpload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { Buffer } from "buffer";
import _ from "lodash";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { JSONObject, JSONValue } from "../../util/jsonTypes";
import { darkenColor, Section, sectionNames } from "openblocks-design";
import {
  changeValueAction,
  CompAction,
  multiChangeAction,
  RecordConstructorToComp,
  RecordConstructorToView,
} from "openblocks-core";
import {
  ArrayStringControl,
  BoolCodeControl,
  codeControl,
  NumberControl,
  StringControl,
} from "../controls/codeControl";
import { BoolControl, BoolPureControl } from "../controls/boolControl";
import { dropdownControl } from "../controls/dropdownControl";
import { changeEvent, eventHandlerControl } from "../controls/eventHandlerControl";
import { stateComp, UICompBuilder, withDefault } from "../generators";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { styleControl } from "comps/controls/styleControl";
import { FileStyle, FileStyleType } from "comps/controls/styleControlConstants";
import { disabledPropertyView, hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { getComponentDocUrl } from "comps/utils/compDocUtil";
import mime from "mime";

const FileSizeControl = codeControl((value) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const str = value.trim();

    if (str === "") {
      return 0;
    }

    const strInNum = Number(str);
    if (!_.isNaN(strInNum)) {
      return strInNum;
    }

    const units = ["bytes", "kb", "mb", "gb", "tb"];
    const regExp = new RegExp("^\\d+\\s*[kmgt]b$", "i");
    if (regExp.test(str)) {
      const num: number = parseInt(str.match("^\\d+")?.[0] ?? "", 10);
      const exponent = units.findIndex((unit) => str.search(new RegExp(unit, "i")) !== -1);
      return num * Math.pow(1024, exponent);
    }
  }
  throw new TypeError(trans("file.typeErrorMsg", { value: typeof value }));
});

const ParseFileTooltip = (
  <>
    <div>{trans("file.parsedValueTooltip1")}</div>
    <div>{trans("file.parsedValueTooltip2")}</div>
  </>
);

const EventOptions = [
  changeEvent,
  {
    label: trans("event.parse"),
    value: "parse",
    description: trans("event.parseDesc"),
  },
] as const;

const validationChildren = {
  minSize: FileSizeControl,
  maxSize: FileSizeControl,
  maxFiles: NumberControl,
};

const commonChildren = {
  value: stateComp<Array<string | null>>([]),
  files: stateComp<JSONObject[]>([]),
  fileType: ArrayStringControl,
  showUploadList: BoolControl.DEFAULT_TRUE,
  disabled: BoolCodeControl,
  onEvent: eventHandlerControl(EventOptions),
  style: styleControl(FileStyle),
  parseFiles: BoolPureControl,
  parsedValue: stateComp<Array<JSONValue | null>>([]),
  ...validationChildren,
};

const commonValidationFields = (children: RecordConstructorToComp<typeof validationChildren>) => (
  <>
    {children.minSize.propertyView({
      label: trans("file.minSize"),
      placeholder: "1kb",
      tooltip: trans("file.minSizeTooltip"),
    })}
    {children.maxSize.propertyView({
      label: trans("file.maxSize"),
      placeholder: "10kb",
      tooltip: trans("file.maxSizeTooltip"),
    })}
  </>
);

const commonProps = (
  props: RecordConstructorToView<typeof commonChildren> & {
    uploadType: "single" | "multiple" | "directory";
  }
): UploadProps => ({
  accept: props.fileType.toString(),
  multiple: props.uploadType === "multiple",
  directory: props.uploadType === "directory",
  showUploadList: props.showUploadList,
  customRequest: (options: UploadRequestOption) => options.onSuccess && options.onSuccess({}), // Override the default upload logic and do not upload to the specified server
});

const getStyle = (style: FileStyleType) => {
  return css`
    .ant-btn {
      border-radius: ${style.radius};
    }

    .ant-btn:not(:disabled) {
      border-color: ${style.border};
      background-color: ${style.background};
      color: ${style.text};

      &:hover,
      &:focus {
        border-color: ${style.accent};
        color: ${style.accent};
      }

      &:active {
        border-color: ${darkenColor(style.accent, 0.1)};
        color: ${darkenColor(style.accent, 0.1)};
      }
    }
  `;
};

const StyledUpload = styled(AntdUpload)<{ $style: FileStyleType }>`
  .ant-upload,
  .ant-btn {
    width: 100%;
  }

  ${(props) => props.$style && getStyle(props.$style)}
`;

export function resolveValue(files: UploadFile[]) {
  return Promise.all(
    files.map(
      (f) =>
        f.originFileObj
          ?.arrayBuffer()
          .then((a) => Buffer.from(a).toString("base64"))
          .catch(() => null) ?? null
    )
  );
}

export function resolveParsedValue(files: UploadFile[]) {
  return Promise.all(
    files.map(async (f) => {
      const XLSX = await import("xlsx");
      return (
        f.originFileObj
          ?.arrayBuffer()
          .then((a) => {
            const ext = mime.getExtension(f.originFileObj?.type ?? "");
            if (ext === "xlsx" || ext === "csv") {
              const workbook = XLSX.read(a, { raw: true });
              return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            }
            const text = new TextDecoder("utf-8").decode(a);
            if (text) {
              return JSON.parse(text);
            }
            return null;
          })
          .catch(() => null) ?? null
      );
    })
  );
}

const Upload = (
  props: RecordConstructorToView<typeof commonChildren> & {
    uploadType: "single" | "multiple" | "directory";
    text: string;
    dispatch: (action: CompAction) => void;
  }
) => {
  const { dispatch, files, style } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(files as any);
  useEffect(() => {
    if (files.length === 0 && fileList.length !== 0) {
      setFileList([]);
    }
  }, [files]);
  return (
    <StyledUpload
      {...commonProps(props)}
      $style={style}
      fileList={fileList}
      beforeUpload={(file) => {
        if (!file.size || file.size <= 0) {
          message.error(`${file.name} ` + trans("file.fileEmptyErrorMsg"));
          return AntdUpload.LIST_IGNORE;
        }

        if (
          (!!props.minSize && file.size < props.minSize) ||
          (!!props.maxSize && file.size > props.maxSize)
        ) {
          message.error(`${file.name} ` + trans("file.fileSizeExceedErrorMsg"));
          return AntdUpload.LIST_IGNORE;
        }
        return true;
      }}
      onChange={(param: UploadChangeParam) => {
        const uploadingFiles = param.fileList.filter((f) => f.status === "uploading");
        // the onChange callback will be executed when the state of the antd upload file changes.
        // so make a trick logic: the file list with loading will not be processed
        if (uploadingFiles.length !== 0) {
          setFileList(param.fileList);
          return;
        }

        let maxFiles = props.maxFiles;
        if (props.uploadType === "single") {
          maxFiles = 1;
        } else if (props.maxFiles <= 0) {
          maxFiles = 100; // limit 100 currently
        }

        const uploadedFiles = param.fileList.filter((f) => f.status === "done");

        if (param.file.status === "removed") {
          const index = props.files.findIndex((f) => f.uid === param.file.uid);
          dispatch(
            multiChangeAction({
              value: changeValueAction([
                ...props.value.slice(0, index),
                ...props.value.slice(index + 1),
              ]),
              files: changeValueAction([
                ...props.files.slice(0, index),
                ...props.files.slice(index + 1),
              ]),
              parsedValue: changeValueAction([
                ...props.parsedValue.slice(0, index),
                ...props.parsedValue.slice(index + 1),
              ]),
            })
          );
          props.onEvent("change");
        } else {
          const unresolvedValueIdx = Math.min(props.value.length, uploadedFiles.length);
          const unresolvedParsedValueIdx = Math.min(props.parsedValue.length, uploadedFiles.length);

          // After all files are processed, perform base64 encoding on the latest file list uniformly
          Promise.all([
            resolveValue(uploadedFiles.slice(unresolvedValueIdx)),
            resolveParsedValue(uploadedFiles.slice(unresolvedParsedValueIdx)),
          ]).then(([value, parsedValue]) => {
            dispatch(
              multiChangeAction({
                value: changeValueAction([...props.value, ...value].slice(-maxFiles)),
                files: changeValueAction(
                  uploadedFiles
                    .map((file) => _.pick(file, ["uid", "name", "type", "size", "lastModified"]))
                    .slice(-maxFiles)
                ),
                ...(props.parseFiles
                  ? {
                      parsedValue: changeValueAction(
                        [...props.parsedValue, ...parsedValue].slice(-maxFiles)
                      ),
                    }
                  : {}),
              })
            );
            props.onEvent("change");
            props.onEvent("parse");
          });
        }

        setFileList(uploadedFiles.slice(-maxFiles));
      }}
    >
      <Button icon={<UploadOutlined />} disabled={props.disabled}>
        {props.text}
      </Button>
    </StyledUpload>
  );
};

const UploadTypeOptions = [
  { label: trans("file.single"), value: "single" },
  { label: trans("file.multiple"), value: "multiple" },
  { label: trans("file.directory"), value: "directory" },
] as const;

const childrenMap = {
  text: withDefault(StringControl, trans("file.upload")),
  uploadType: dropdownControl(UploadTypeOptions, "single"),
  ...commonChildren,
  ...formDataChildren,
};

let FileTmpComp = new UICompBuilder(childrenMap, (props, dispatch) => (
  <Upload {...props} dispatch={dispatch} />
))
  .setPropertyViewFn((children) => (
    <>
      <Section name={sectionNames.basic}>
        {children.text.propertyView({
          label: trans("text"),
        })}
        {children.fileType.propertyView({
          label: trans("file.fileType"),
          placeholder: '[".png"]',
          tooltip: (
            <>
              {trans("file.reference")}{" "}
              <a href={trans("file.fileTypeTooltipUrl")} target="_blank" rel="noreferrer">
                {trans("file.fileTypeTooltip")}
              </a>
            </>
          ),
        })}
        {children.uploadType.propertyView({ label: trans("file.uploadType") })}
        {children.showUploadList.propertyView({ label: trans("file.showUploadList") })}
        {children.parseFiles.propertyView({
          label: trans("file.parseFiles"),
          tooltip: ParseFileTooltip,
          placement: "right",
        })}
      </Section>

      <FormDataPropertyView {...children} />

      <Section name={sectionNames.interaction}>
        {children.onEvent.getPropertyView()}
        {disabledPropertyView(children)}
      </Section>

      <Section name={sectionNames.validation}>
        <>
          {children.uploadType.getView() !== "single" &&
            children.maxFiles.propertyView({ label: trans("file.maxFiles") })}
          {commonValidationFields(children)}
        </>
      </Section>

      <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

      <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
    </>
  ))
  .build();

FileTmpComp = withMethodExposing(FileTmpComp, [
  {
    method: {
      name: "clearValue",
      description: trans("file.clearValueDesc"),
      params: [],
    },
    execute: (comp) =>
      comp.dispatch(
        multiChangeAction({
          value: changeValueAction([]),
          files: changeValueAction([]),
        })
      ),
  },
]);

export const FileComp = withExposingConfigs(FileTmpComp, [
  new NameConfig("value", trans("file.filesValueDesc")),
  new NameConfig(
    "files",
    (
      <>
        {trans("file.filesDesc")}
        {(() => {
          const url = getComponentDocUrl("file");
          if (url) {
            return (
              <>
                &nbsp;
                <a href={url} target="_blank" rel="noreferrer">
                  {trans("uiComp.fileUploadCompName")}
                </a>
              </>
            );
          }
        })()}
      </>
    )
  ),
  new NameConfig("parsedValue", ParseFileTooltip),
  ...CommonNameConfig,
]);
