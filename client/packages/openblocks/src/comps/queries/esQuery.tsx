import { Tag } from "antd";
import { trans } from "i18n";
import _, { includes, isEmpty, pick } from "lodash";
import {
  changeValueAction,
  CompAction,
  DispatchType,
  MultiBaseComp,
  multiChangeAction,
} from "openblocks-core";
import {
  Dropdown,
  EllipsisTextCss,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
  QueryTutorialButton,
  ValueFromOption,
} from "openblocks-design";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { QueryTutorials } from "util/tutorialUtils";
import { EsConfig } from "../../api/datasourceApi";
import { getDataSource } from "../../redux/selectors/datasourceSelectors";
import { dropdownControl } from "../controls/dropdownControl";
import { ParamsJsonControl, ParamsStringControl } from "../controls/paramsControl";
import { MultiCompBuilder, valueComp, withDefault } from "../generators";
import { QueryConfigLabelMethod } from "./query";
import { toQueryView } from "./queryCompUtils";

const HttpMethodOptions = [
  { label: "GET", value: "GET", color: "magenta" },
  { label: "POST", value: "POST", color: "red" },
  { label: "PUT", value: "PUT", color: "volcano" },
  { label: "DELETE", value: "DELETE", color: "orange" },
  { label: "HEAD", value: "HEAD", color: "gold" },
] as const;
const EsMethodOptions = [
  { label: trans("EsQuery.rawCommand"), value: "RAW", apis: [] },
  {
    label: "Search",
    value: "SEARCH",
    apis: [{ httpMethod: "GET", prefix: "<target>", path: "_search" }],
  },
  {
    label: "Create",
    value: "CREATE",
    apis: [
      { httpMethod: "PUT", prefix: "<target>", path: "_doc", suffix: "<_id>" },
      { httpMethod: "POST", prefix: "<target>", path: "_doc" },
      { httpMethod: "PUT", prefix: "<target>", path: "_create", suffix: "<_id>" },
      { httpMethod: "POST", prefix: "<target>", path: "_create", suffix: "<_id>" },
    ],
  },
  {
    label: "Update",
    value: "UPDATE",
    apis: [{ httpMethod: "POST", prefix: "<index>", path: "_update", suffix: "<_id>" }],
  },
  {
    label: "Delete",
    value: "DELETE",
    apis: [{ httpMethod: "DELETE", prefix: "<index>", path: "_doc", suffix: "<_id>" }],
  },
  {
    label: "Get",
    value: "GET",
    apis: [
      { httpMethod: "GET", prefix: "<index>", path: "_doc", suffix: "<_id>" },
      { httpMethod: "HEAD", prefix: "<index>", path: "_doc", suffix: "<_id>" },
      { httpMethod: "GET", prefix: "<index>", path: "_source", suffix: "<_id>" },
      { httpMethod: "HEAD", prefix: "<index>", path: "_source", suffix: "<_id>" },
    ],
  },
] as const;

export let EsQuery = (function () {
  const childrenMap = {
    esMethod: valueComp<ValueFromOption<typeof EsMethodOptions>>("SEARCH"),
    httpMethod: dropdownControl(HttpMethodOptions, "GET"),
    prefix: ParamsStringControl,
    path: withDefault(ParamsStringControl, "_search"),
    suffix: ParamsStringControl,
    dsl: withDefault(
      ParamsJsonControl,
      `{ 
  /* type your query here */
}`
    ),
  };
  return new MultiCompBuilder(childrenMap, (props) =>
    toQueryView(
      Object.entries({ ...props.prefix, ...props.path, ...props.suffix, ...props.dsl }).map(
        (kv) => ({
          key: kv[0],
          value: kv[1],
        })
      )
    )
  )
    .setPropertyViewFn(() => <></>)
    .build();
})();

type ChildrenType = InstanceType<typeof EsQuery> extends MultiBaseComp<infer X> ? X : never;

const esMethodInfoMap = _.fromPairs(EsMethodOptions.map((option) => [option.value, option]));
const httpMethodInfoMap = _.fromPairs(HttpMethodOptions.map((option) => [option.value, option]));

const ReadOnlyField = styled.div`
  background-color: #f5f5f6;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  padding: 0 8px;
  height: 32px;
  line-height: 32px;
  width: 100%;
  ${EllipsisTextCss};
`;
const InputField = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const OptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const SeparatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;
const separator = <SeparatorWrapper>/</SeparatorWrapper>;

const EsQueryPropertyView = (props: {
  children: ChildrenType;
  dispatch: DispatchType;
  datasourceId: string;
}) => {
  const { children, dispatch } = props;

  const datasource = useSelector(getDataSource).find(
    (info) => info.datasource.id === props.datasourceId
  );
  const esConfig = datasource?.datasource.datasourceConfig as EsConfig;

  const currentApis: readonly {
    httpMethod: ValueFromOption<typeof HttpMethodOptions>;
    prefix?: string;
    path: string;
    suffix?: string;
  }[] = esMethodInfoMap[children.esMethod.value].apis;

  const currentApi =
    currentApis?.find(
      (item) =>
        item.httpMethod === children.httpMethod.value && item.path === children.path.toJsonValue()
    ) ?? currentApis?.[0];

  return (
    <>
      <QueryConfigWrapper>
        <QueryConfigLabelMethod />
        <div style={{ width: "184px", flexGrow: 1 }}>
          <Dropdown
            options={EsMethodOptions}
            value={children.esMethod.value}
            onChange={(value) => {
              dispatch(
                multiChangeAction({
                  esMethod: changeValueAction(value, true),
                  httpMethod: changeValueAction(
                    esMethodInfoMap[value].apis?.[0]?.httpMethod ?? "GET",
                    true
                  ),
                  path: changeValueAction(esMethodInfoMap[value].apis?.[0]?.path ?? "", true),
                  prefix: changeValueAction("", true),
                  suffix: changeValueAction("", true),
                })
              );
            }}
          />
        </div>
        <QueryTutorialButton
          label={trans("EsQuery.queryTutorialButton")}
          url={QueryTutorials.es}
          styleName={"dropdownRight"}
        />
      </QueryConfigWrapper>

      {children.esMethod.getView() !== "RAW" && (
        <Dropdown
          label={trans("EsQuery.request")}
          placement={"bottom"}
          options={
            currentApis?.map((api) => ({
              label: (
                <OptionWrapper>
                  <Tag color={httpMethodInfoMap[api.httpMethod].color}>{api.httpMethod}</Tag>
                  <span>
                    {[api.prefix, api.path, api.suffix].filter((i) => !isEmpty(i)).join("/")}
                  </span>
                </OptionWrapper>
              ),
              value: JSON.stringify(pick(api, "httpMethod", "path")),
            })) ?? []
          }
          value={JSON.stringify(pick(currentApi, "httpMethod", "path"))}
          onChange={(value) => {
            const api = JSON.parse(value);
            dispatch(
              multiChangeAction({
                httpMethod: changeValueAction(api.httpMethod, true),
                path: changeValueAction(api.path, true),
                prefix: changeValueAction("", true),
                suffix: changeValueAction("", true),
              })
            );
          }}
        />
      )}

      {children.esMethod.getView() === "RAW" &&
        children.httpMethod.propertyView({
          label: "HTTP Method",
          placement: "bottom",
        })}

      <QueryConfigWrapper>
        <QueryConfigLabel>URL</QueryConfigLabel>
        <QueryConfigItemWrapper direction={"row"}>
          {esConfig?.connectionString && (
            <>
              <ReadOnlyField>{esConfig?.connectionString}</ReadOnlyField>
              {separator}
            </>
          )}

          {currentApi?.prefix && (
            <>
              <InputField>
                {children.prefix.propertyView({
                  placeholder: currentApi?.prefix,
                })}
              </InputField>
              {separator}
            </>
          )}

          <InputField>
            {children.esMethod.getView() === "RAW" ? (
              children.path.propertyView({})
            ) : (
              <ReadOnlyField>{children.path.toJsonValue()}</ReadOnlyField>
            )}
          </InputField>

          {currentApi?.suffix && (
            <>
              {separator}
              <InputField>
                {children.suffix.propertyView({
                  placeholder: currentApi?.suffix,
                })}
              </InputField>
            </>
          )}
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      {children.dsl.propertyView({
        label: "Body",
        placement: "bottom",
        styleName: "medium",
      })}
    </>
  );
};

EsQuery = class extends EsQuery {
  isWrite(action: CompAction) {
    return (
      "changes" in action &&
      action.changes["esMethod"] &&
      "value" in action.changes["esMethod"] &&
      includes(["CREATE", "UPDATE", "DELETE", "RAW"], action.changes["esMethod"].value)
    );
  }

  propertyView(props: { datasourceId: string }) {
    return (
      <EsQueryPropertyView
        children={this.children}
        dispatch={this.dispatch}
        datasourceId={props.datasourceId}
      />
    );
  }
};
