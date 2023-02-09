import {
  ParamsArrayStringControl,
  ParamsJsonControl,
  ParamsStringControl,
  ValueFunction,
} from "../controls/paramsControl";
import { withTypeAndChildrenAbstract } from "../generators/withType";
import { withPropertyViewFn } from "../generators";
import { DispatchType, MultiBaseComp } from "openblocks-core";
import { isObject } from "lodash";
import { FunctionProperty, toQueryView } from "./queryCompUtils";
import { Property } from "../../types/entities/common";
import { trans } from "i18n";

// const PropertyView = (props: { value: string[]; dispatch: DispatchType }) => {
//   const editorState = useContext(EditorContext);
//   const allFileOptions = editorState
//     .uiCompInfoList()
//     .filter((info) => info.type === "file")
//     .map((info) => {
//       return {
//         label: info.name,
//         value: info.name,
//       };
//     });
//
//   return (
//     <Dropdown
//       label={" "}
//       placeholder={"file1"}
//       placement={"bottom"}
//       options={allFileOptions}
//       value={isEmpty(props.value) ? undefined : props.value}
//       mode={"multiple"}
//       allowClear={true}
//       onChange={(value) => {
//         props.dispatch(changeValueAction(value));
//       }}
//     />
//   );
// };

// const wrapValueComp = () => valueComp<string[]>([]);
// type ArrayStringValueComp = InstanceType<ReturnType<typeof wrapValueComp>>;
// const wrapStateComp = () => valueComp<JSONObject[]>([]);
// type ArrayObjectStateComp = InstanceType<ReturnType<typeof wrapStateComp>>;
// const FileCompSelector = class extends MultiBaseComp<{
//   value: ArrayStringValueComp;
//   data: ArrayObjectStateComp;
// }> {
//   parseChildrenFromValue(params: CompParams<string>) {
//     let value: string[] = [];
//     if (isArray(params.value)) {
//       value = params.value;
//     } else if (params.value && isDynamicSegment(params.value)) {
//       value = JSON.parse(params.value?.slice(2, -2) ?? "[]");
//     }
//     return {
//       value: new (valueComp<string[]>([]))({ value: value }),
//       data: new (stateComp<JSONObject[]>([]))({ value: [] }),
//     };
//   }
//
//   override toJsonValue() {
//     return "{{" + JSON.stringify(this.children.value.getView()) + "}}";
//   }
//
//   override getView() {
//     return null;
//   }
//
//   override getPropertyView() {
//     return <PropertyView value={this.children.value.getView()} dispatch={this.dispatch} />;
//   }
// };

const SMTPQueryBasic = withTypeAndChildrenAbstract(
  {
    OBJECT: withPropertyViewFn(ParamsJsonControl, (comp) =>
      comp.propertyView({
        placement: "bottom",
        label: trans("smtpQuery.attachment"),
        tooltip: (
          <>
            {trans("smtpQuery.attachmentTooltip")}
            <span>
              {'[{"name": <file name>,"contentType": <'}
              <a href={trans("smtpQuery.MIMETypeUrl")} target="_blank" rel="noreferrer">
                MIME types
              </a>
              {'>,"content": <base64>}]'}
            </span>
          </>
        ),
        styleName: "medium",
        placeholder: `{{file1.files.map((f, i) =>
  ({ name: f.name, contentType: f.type, content: file1.value[i] }))
}}`,
      })
    ),
    // SELECT: withViewFn(FileCompSelector, (comp) => (
    //   <View value={comp.children.value.value} dispatch={comp.children.data.dispatch} />
    // )),
  } as const,
  // "SELECT",
  "OBJECT",
  {
    from: ParamsStringControl,
    to: ParamsArrayStringControl,
    cc: ParamsArrayStringControl,
    bcc: ParamsArrayStringControl,
    subject: ParamsStringControl,
    content: ParamsStringControl,
  },
  "attachmentsType",
  "attachments"
);

type ChildrenType = InstanceType<typeof SMTPQueryBasic> extends MultiBaseComp<infer X> ? X : never;

const SMTPPropertyView = (props: { children: ChildrenType; dispatch: DispatchType }) => (
  <>
    {props.children.from.propertyView({
      label: trans("smtpQuery.sender"),
      placement: "bottom",
      placeholder: "name@example.com",
    })}
    {props.children.to.propertyView({
      label: trans("smtpQuery.recipient"),
      placement: "bottom",
      placeholder: "[name1@example.com, name2@example.com]",
    })}
    {props.children.cc.propertyView({
      label: trans("smtpQuery.carbonCopy"),
      placement: "bottom",
      placeholder: "[name1@example.com, name2@example.com]",
    })}
    {props.children.bcc.propertyView({
      label: trans("smtpQuery.blindCarbonCopy"),
      placement: "bottom",
      placeholder: "[name1@example.com, name2@example.com]",
    })}
    {props.children.subject.propertyView({
      label: trans("smtpQuery.subject"),
      placement: "bottom",
      placeholder: "",
    })}
    {props.children.content.propertyView({
      label: trans("smtpQuery.content"),
      placement: "bottom",
      styleName: "medium",
      tooltip: trans("smtpQuery.contentTooltip"),
    })}
    {props.children.attachments.getPropertyView()}
  </>
);

export const SMTPQuery = class extends SMTPQueryBasic {
  isWrite() {
    return false;
  }

  override getView() {
    return toQueryView(
      Object.values(this.children)
        .map((c) => c.getView())
        .filter((v) => isObject(v))
        .reduce(
          (result: FunctionProperty[], v) => [
            ...result,
            ...Object.entries(v).map((kv) => ({
              key: kv[0],
              value: kv[1] as ValueFunction,
            })),
          ],
          []
        )
    );
  }

  override getPropertyView() {
    return <SMTPPropertyView children={this.children} dispatch={this.dispatch} />;
  }
};
