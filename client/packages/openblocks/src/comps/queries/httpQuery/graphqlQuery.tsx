import { ControlPropertyViewWrapper } from "components/control";
import { Input } from "components/Input";
import { KeyValueList } from "components/keyValueList";
import { QueryConfigItemWrapper, QueryConfigLabel, QueryConfigWrapper } from "components/query";
import { simpleMultiComp } from "comps/generators/multi";
import { ReactNode } from "react";
import { JSONValue } from "../../../util/jsonTypes";
import { keyValueListControl } from "../../controls/keyValueControl";
import { ParamsJsonControl, ParamsStringControl } from "../../controls/paramsControl";
import { list } from "../../generators/list";
import { valueComp, withDefault } from "../../generators/simpleGenerators";
import { FunctionProperty, toQueryView } from "../queryCompUtils";
import {
  HttpHeaderPropertyView,
  HttpParametersPropertyView,
  HttpPathPropertyView,
} from "./httpQueryConstants";

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
            placeholder={"name"}
          />
        </div>
        <div style={{ width: "232px", flexGrow: 1 }}>
          {this.children.value.propertyView({ placeholder: "value" })}
        </div>
      </div>
    );
  }
};

export const VariablesControl = class extends list(VariableControl) {
  getQueryParams() {
    return this.getView().reduce(
      (result: FunctionProperty[], kv) => [...result, ...kv.children.value.getQueryParams()],
      []
    );
  }

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
    const params = [
      ...children.variables.getQueryParams(),
      ...children.headers.getQueryParams(),
      ...children.params.getQueryParams(),
      ...children.path.getQueryParams(),
      ...children.body.getQueryParams(),
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
        <QueryConfigLabel>Query</QueryConfigLabel>
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
