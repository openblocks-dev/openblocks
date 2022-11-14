import { valueComp, withDefault } from "comps/generators";
import {
  Dropdown,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
  ValueFromOption,
} from "openblocks-design";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HttpConfig } from "../../api/datasourceApi";
import { getDataSource } from "../../redux/selectors/datasourceSelectors";
import { changeValueAction, CompAction, DispatchType, MultiBaseComp } from "openblocks-core";
import { keyValueListControl } from "../controls/keyValueControl";
import { ParamsJsonControl, ParamsStringControl } from "../controls/paramsControl";
import { withTypeAndChildrenAbstract } from "../generators/withType";
import { FunctionProperty, toQueryView } from "./queryCompUtils";
import { includes } from "lodash";
import { JSONObject } from "../../util/jsonTypes";
import { trans } from "i18n";

const BodyTypeOptions = [
  { label: "JSON", value: "application/json" },
  { label: "Raw", value: "text/plain" },
  {
    label: "x-www-form-urlencoded",
    value: "application/x-www-form-urlencoded",
  },
  { label: "Form Data", value: "multipart/form-data" },
  { label: "None", value: "none" },
] as const;
type BodyTypeValue = ValueFromOption<typeof BodyTypeOptions>;

const HttpMethodOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
] as const;
type HttpMethodValue = ValueFromOption<typeof HttpMethodOptions>;

/**
 * This is to be compatible with the old code, and to switch between different code editors under the raw and json types at the same time
 * key is strange because it has to be consistent with {@see BodyTypeValue}
 */
const CommandMap = {
  "application/json": ParamsJsonControl,
  "text/plain": ParamsStringControl,
  /**
   * The following keys are not actually needed, because these keys use {@see childrenMap.bodyFormData}.
   * The purpose of adding is to avoid {@see withTypeAndChildrenAbstract} error when switching bodyType.
   */
  "application/x-www-form-urlencoded": ParamsStringControl,
  "multipart/form-data": ParamsStringControl,
  none: ParamsStringControl,
};

const childrenMap = {
  httpMethod: valueComp<HttpMethodValue>("GET"),
  path: ParamsStringControl,
  // cookies: withDefault(keyValueListControl(), [{ key: "", value: "" }]),
  headers: withDefault(keyValueListControl(), [{ key: "", value: "" }]),
  params: withDefault(keyValueListControl(), [{ key: "", value: "" }]),
  bodyFormData: withDefault(
    keyValueListControl(true, [
      { label: trans("httpQuery.text"), value: "text" },
      { label: trans("httpQuery.file"), value: "file" },
    ] as const),
    [{ key: "", value: "", type: "text" }]
  ),
};

const HttpTmpQuery = withTypeAndChildrenAbstract(
  CommandMap,
  "none",
  childrenMap,
  "bodyType",
  "body"
);

export class HttpQuery extends HttpTmpQuery {
  isWrite(action: CompAction) {
    return (
      action.path.includes("httpMethod") && "value" in action && !includes(["GET"], action.value)
    );
  }

  override getView() {
    const children = this.children;
    let params = [
      // ...props.cookies,
      ...children.headers.getView(),
      ...children.params.getView(),
      ...children.bodyFormData.getView(),
    ].reduce(
      (result: FunctionProperty[], kv) => [
        ...result,
        ...Object.entries(kv.children.key.getView()).map((pair) => ({
          key: pair[0],
          value: pair[1],
        })),
        ...Object.entries(kv.children.value.getView()).map((pair) => ({
          key: pair[0],
          value: pair[1],
        })),
      ],
      []
    );
    params = [
      ...params,
      ...Object.entries(children.path.getView()).map((kv) => ({
        key: kv[0],
        value: kv[1],
      })),
      ...Object.entries(children.body.getView()).map((kv) => ({
        key: kv[0],
        value: kv[1],
      })),
    ];
    return toQueryView(params);
  }

  propertyView(props: {
    datasourceId: string;
    urlPlaceholder?: string;
    supportHttpMethods?: HttpMethodValue[];
    supportBodyTypes?: BodyTypeValue[];
  }) {
    return (
      <HttpQueryPropertyView
        {...props}
        children={this.children}
        dispatch={this.dispatch}
        originData={this.toJsonValue()}
      />
    );
  }
}

type ChildrenType = InstanceType<typeof HttpQuery> extends MultiBaseComp<infer X> ? X : never;

const ContentTypeKey = "Content-Type";

const UrlInput = styled.div<{ hasAddonBefore: boolean }>`
  display: flex;
  width: 100%;

  .cm-editor {
    margin-top: 0;
    ${(props) => props.hasAddonBefore && "border-top-left-radius: 0;"}
    ${(props) => props.hasAddonBefore && "border-bottom-left-radius: 0;"};
  }
`;

const UrlInputAddonBefore = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f6;
  border: 1px solid #d7d9e0;
  border-right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 0 8px;
  height: 32px;
  max-width: 60%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const showBodyConfig = (children: ChildrenType) => {
  switch (children.bodyType.getView() as BodyTypeValue) {
    case "application/x-www-form-urlencoded":
      return children.bodyFormData.propertyView({});
    case "multipart/form-data":
      return children.bodyFormData.propertyView({
        showType: true,
        typeTooltip: trans("httpQuery.bodyFormDataTooltip", {
          type: `"${trans("httpQuery.file")}"`,
          object: "{ data: base64 string, name: string }",
          example: "{{ {data: file1.value[0], name: file1.files[0].name} }}",
        }),
      });
    case "application/json":
    case "text/plain":
      return children.body.propertyView({ styleName: "medium", width: "100%" });
    default:
      return <></>;
  }
};

const HttpQueryPropertyView = (props: {
  children: ChildrenType;
  dispatch: DispatchType;
  datasourceId: string;
  originData: JSONObject;
  urlPlaceholder?: string;
  supportHttpMethods?: HttpMethodValue[];
  supportBodyTypes?: BodyTypeValue[];
}) => {
  const { children, dispatch, urlPlaceholder, supportHttpMethods, supportBodyTypes } = props;

  const datasource = useSelector(getDataSource).find(
    (info) => info.datasource.id === props.datasourceId
  );
  const httpConfig = datasource?.datasource.datasourceConfig as HttpConfig;
  return (
    <>
      <Dropdown
        placement={"bottom"}
        value={children.httpMethod.value}
        options={HttpMethodOptions.filter(
          (o) => !supportHttpMethods || supportHttpMethods.includes(o.value)
        )}
        label={"HTTP Method"}
        onChange={(value) => {
          children.httpMethod.dispatchChangeValueAction(value);
        }}
      />

      <QueryConfigWrapper>
        <QueryConfigLabel>URL</QueryConfigLabel>
        <QueryConfigItemWrapper>
          <UrlInput hasAddonBefore={!!httpConfig?.url}>
            {httpConfig?.url && <UrlInputAddonBefore>{httpConfig?.url}</UrlInputAddonBefore>}

            {children.path.propertyView({
              placement: "bottom",
              placeholder:
                urlPlaceholder || (httpConfig?.url ? "/v1/test" : "https://xxx.com/v1/test"),
            })}
          </UrlInput>
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      {/*<QueryConfigSection>*/}
      {/*  <QueryConfigSectionLabel>Cookies</QueryConfigSectionLabel>*/}
      {/*  <QueryConfigSectionItem>*/}
      {/*    {props.children.cookies.propertyView({})}*/}
      {/*  </QueryConfigSectionItem>*/}
      {/*</QueryConfigSection>*/}

      <QueryConfigWrapper>
        <QueryConfigLabel>Headers</QueryConfigLabel>
        <QueryConfigItemWrapper>
          {children.headers.propertyView({ keyFlexBasics: 184, valueFlexBasics: 232 })}
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      <QueryConfigWrapper>
        <QueryConfigLabel>Parameters</QueryConfigLabel>
        <QueryConfigItemWrapper>
          {children.params.propertyView({
            keyFlexBasics: 184,
            valueFlexBasics: 232,
          })}
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      <Dropdown
        label={"Body"}
        placement={"bottom"}
        options={BodyTypeOptions.filter(
          (o) => !supportBodyTypes || supportBodyTypes?.includes(o.value)
        )}
        value={children.bodyType.getView()}
        onChange={(value) => {
          let headers = children.headers
            .toJsonValue()
            .filter((header) => header.key !== ContentTypeKey);
          if (value !== "none") {
            headers = [
              {
                key: ContentTypeKey,
                value: value,
              },
              ...headers,
            ];
          }

          dispatch(changeValueAction({ ...props.originData, bodyType: value, headers: headers }));
        }}
      />

      <QueryConfigWrapper>
        <QueryConfigLabel />
        <QueryConfigItemWrapper>{showBodyConfig(children)}</QueryConfigItemWrapper>
      </QueryConfigWrapper>
    </>
  );
};
