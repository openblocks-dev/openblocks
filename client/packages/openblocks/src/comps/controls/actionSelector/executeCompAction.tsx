import { customAction, routeByNameAction } from "openblocks-core";
import { CompParams, ConstructorToDataType } from "openblocks-core";
import { GridItemComp } from "comps/comps/gridItemComp";
import { SimpleNameComp } from "comps/comps/simpleNameComp";
import { TemporaryStateItemComp } from "comps/comps/temporaryStateComp";
import { CompNameContext, EditorContext, EditorState } from "comps/editorState";
import { valueComp, withTypeAndChildren } from "comps/generators";
import { list } from "comps/generators/list";
import { MultiCompBuilder } from "comps/generators/multi";
import { HookComp } from "comps/hooks/hookComp";
import { BranchDiv, Dropdown } from "openblocks-design";
import { mapValues } from "lodash";
import { Fragment, ReactNode } from "react";
import { getPromiseAfterDispatch } from "util/promiseUtils";
import {
  ArrayStringControl,
  ArrayStringOrNumberControl,
  BoolCodeControl,
  CodeControlType,
  JSONObjectControl,
  JSONValueControl,
  NumberControl,
  StringControl,
} from "../codeControl";
import { ExecuteAction, ParamsConfig, ParamType } from "./executeCompTypes";
import { trans } from "i18n";

const ParamsCompMap: Record<ParamType, CodeControlType> = {
  number: NumberControl,
  string: StringControl,
  boolean: BoolCodeControl,
  arrayString: ArrayStringControl,
  arrayNumberString: ArrayStringOrNumberControl,
  JSON: JSONObjectControl,
  JSONValue: JSONValueControl,
};

export const ParamsValueComp = withTypeAndChildren(ParamsCompMap, "string", {
  name: SimpleNameComp,
});
const ParamsValueTmpControl = list(ParamsValueComp);

class ParamsValueControl extends ParamsValueTmpControl {
  constructor(params: CompParams<ConstructorToDataType<typeof ParamsValueTmpControl>>) {
    // Compatible with old dsl, params is an array of strings, no parameter names
    if (params.value && params.value.length > 0 && !params.value[0].hasOwnProperty("compType")) {
      params.value = params.value.map((param) => ({
        comp: param,
        compType: "string",
      }));
    }
    super(params);
  }

  propertyView(params: ParamsConfig): ReactNode {
    return this.getView().map((view, i) => (
      <Fragment key={params[i].name ?? i}>
        {view.children.comp.propertyView({
          tooltip: params[i]?.description,
          label: params[i]?.name,
          layout: "vertical",
        })}
      </Fragment>
    ));
  }
}

const ExecuteCompTmpAction = (function () {
  const childrenMap = {
    name: SimpleNameComp,
    methodName: valueComp<string>(""),
    params: ParamsValueControl,
  };
  return new MultiCompBuilder(childrenMap, () => {
    return () => Promise.resolve(undefined as unknown);
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

interface ExecuteCompActionOptions {
  compListGetter: (
    es: EditorState
  ) => (GridItemComp | HookComp | InstanceType<typeof TemporaryStateItemComp>)[];
  selectLabel?: string;
}

export function executeCompAction(params: ExecuteCompActionOptions) {
  const { compListGetter, selectLabel = trans("eventHandler.component") } = params;

  class InternalExecuteCompAction extends ExecuteCompTmpAction {
    displayName() {
      const name = this.children.name.getView();
      const method = this.children.methodName.getView();
      if (name && method) {
        return `${name}.${method}()`;
      }
    }
    override getView() {
      const name = this.children.name.getView();
      if (!name) {
        return () => Promise.resolve();
      }
      return () =>
        getPromiseAfterDispatch(
          this.dispatch,
          routeByNameAction(
            name,
            customAction<ExecuteAction>(
              {
                type: "execute",
                methodName: this.children.methodName.getView(),
                params: this.children.params.getView().map((x) => x.getView()),
              },
              false
            )
          ),
          {
            notHandledError: trans("eventHandler.notHandledError"),
          }
        );
    }

    propertyView() {
      return (
        <EditorContext.Consumer>
          {(editorState) => {
            const compMethods: Record<string, Record<string, ParamsConfig>> = {};
            const compList = compListGetter(editorState);

            compList.forEach((item) => {
              compMethods[item.children.name.getView()] = mapValues(
                item.exposingInfo().methods,
                (v) => v.params
              );
            });

            function changeMethodAction(compName: string, methodName: string) {
              const currentMethods = compMethods[compName] ?? {};
              const params = currentMethods[methodName];
              return {
                name: compName,
                methodName: methodName,
                params: params?.map((p) => ({
                  compType: p.type,
                  name: p.name,
                })),
              };
            }

            const name = this.children.name.getView();
            const methods = compMethods[name] ?? {};
            const params = methods[this.children.methodName.getView()];
            return (
              <>
                <BranchDiv $type={"inline"}>
                  <CompNameContext.Consumer>
                    {(compName) => (
                      <Dropdown
                        showSearch={true}
                        value={name}
                        options={compList
                          .filter(
                            (item) =>
                              Object.keys(compMethods[item.children.name.getView()]).length > 0
                          )
                          .filter((item) => item.children.name.getView() !== compName)
                          .map((item) => ({
                            label: item.children.name.getView(),
                            value: item.children.name.getView(),
                          }))}
                        label={selectLabel}
                        onChange={(value) =>
                          this.dispatchChangeValueAction(
                            changeMethodAction(value, Object.keys(compMethods[value])[0])
                          )
                        }
                      />
                    )}
                  </CompNameContext.Consumer>
                </BranchDiv>
                {Object.keys(methods).length > 0 && (
                  <BranchDiv $type={"inline"}>
                    <Dropdown
                      value={this.children.methodName.getView()}
                      options={Object.keys(methods).map((name) => ({
                        label: name,
                        value: name,
                      }))}
                      label={trans("eventHandler.method")}
                      onChange={(value) =>
                        this.dispatchChangeValueAction(changeMethodAction(name, value))
                      }
                    />
                  </BranchDiv>
                )}
                {!!params?.length && (
                  <BranchDiv>{this.children.params.propertyView(params)}</BranchDiv>
                )}
              </>
            );
          }}
        </EditorContext.Consumer>
      );
    }
  }

  return InternalExecuteCompAction;
}

export const ExecuteCompAction = executeCompAction({
  compListGetter: (editorState: EditorState) => Object.values(editorState.getAllUICompMap()),
});
