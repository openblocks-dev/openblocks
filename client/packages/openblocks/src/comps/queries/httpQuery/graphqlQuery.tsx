import { QueryConfigItemWrapper, QueryConfigLabel, QueryConfigWrapper } from "components/query";
import { FunctionProperty, toQueryView } from "../queryCompUtils";
import {
  HttpHeaderPropertyView,
  HttpParametersPropertyView,
  HttpPathPropertyView,
} from "./httpQueryConstants";
import { ReactNode } from "react";
import { simpleMultiComp } from "comps/generators/multi";
import { valueComp, withDefault } from "../../generators/simpleGenerators";
import { ParamsJsonControl, ParamsStringControl } from "../../controls/paramsControl";
import { Input } from "components/Input";
import { list } from "../../generators/list";
import { ControlPropertyViewWrapper } from "components/control";
import { KeyValueList } from "components/keyValueList";
import { keyValueListControl } from "../../controls/keyValueControl";
import { JSONValue } from "../../../util/jsonTypes";

interface VariablesControlParams {
  // variables: string[]; todo support parse variables
}

const VariableControl = class extends simpleMultiComp({
  key: valueComp<string>(""),
  value: ParamsJsonControl,
}) {
  propertyView(params: VariablesControlParams): ReactNode {
    return (
      <div style={{ display: "flex", gap: "8px", flexGrow: 1 }}>
        <div style={{ width: "184px", flexGrow: 1 }}>
          {/*<Dropdown*/}
          {/*  allowClear={true}*/}
          {/*  options={params.variables.map((v) => ({ label: v, value: v }))}*/}
          {/*  value={this.children.key.getView()}*/}
          {/*  onChange={(value) => this.children.key.dispatchChangeValueAction(value)}*/}
          {/*/>*/}
          <Input
            value={this.children.key.getView()}
            onChange={(e) => {
              this.children.key.dispatchChangeValueAction(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "232px", flexGrow: 1 }}> {this.children.value.propertyView({})}</div>
      </div>
    );
  }
};

const VariablesControl = class extends list(VariableControl) {
  propertyView(params: VariablesControlParams): ReactNode {
    return (
      <ControlPropertyViewWrapper {...params}>
        <KeyValueList
          list={this.getView().map((child) => child.propertyView(params))}
          onAdd={() => this.dispatch(this.pushAction({}))}
          onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
        />
      </ControlPropertyViewWrapper>
    );
  }
};

const childrenMap = {
  path: ParamsStringControl,
  headers: withDefault(keyValueListControl(), [{ key: "", value: "" }]),
  params: withDefault(keyValueListControl(), [{ key: "", value: "" }]),
  variables: withDefault(VariablesControl, [{ key: "", value: "" }]),
  body: ParamsJsonControl,
};

const GraphqlTmpQuery = simpleMultiComp(childrenMap);

export class GraphqlQuery extends GraphqlTmpQuery {
  override getView() {
    const children = this.children;
    let params = [...children.variables.getView()].reduce(
      (result: FunctionProperty[], kv) => [
        ...result,
        ...Object.entries(kv.children.value.getView()).map((pair) => ({
          key: pair[0],
          value: pair[1],
        })),
      ],
      []
    );
    params = [
      ...params,
      ...[...children.headers.getView(), ...children.params.getView()].reduce(
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
      ),
    ];
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

  propertyView(props: { datasourceId: string }) {
    return <PropertyView {...props} comp={this} />;
  }
}

function parseVariables(value: JSONValue): string[] {
  const tmp = JSON.stringify(value).match(/\$[_a-z]\w*/gs);
  return [...new Set(tmp)];
}

const PropertyView = (props: { comp: InstanceType<typeof GraphqlQuery>; datasourceId: string }) => {
  const { comp } = props;
  const { children } = comp;

  return (
    <>
      <HttpPathPropertyView {...props} comp={comp} />

      <QueryConfigWrapper>
        <QueryConfigLabel />
        <QueryConfigItemWrapper>
          {children.body.propertyView({
            styleName: "medium",
            width: "100%",
          })}
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      <QueryConfigWrapper>
        <QueryConfigLabel>Variables</QueryConfigLabel>
        <QueryConfigItemWrapper>
          {children.variables.propertyView({
            // variables: parseVariables(children.body.children.text.getView()) ?? [],
          })}
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>

      <HttpParametersPropertyView comp={comp} />

      <HttpHeaderPropertyView comp={comp} />
    </>
  );
};
