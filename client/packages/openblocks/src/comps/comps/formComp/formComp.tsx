import {
  CommonNameConfig,
  depsConfig,
  NameConfig,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import { genQueryId } from "comps/utils/idGenerator";
import { CompNameContext, EditorContext, EditorState } from "comps/editorState";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { ContainerPlaceholder } from "openblocks-design";
import {
  CompAction,
  CompActionTypes,
  ConstructorToDataType,
  customAction,
  deferAction,
  DispatchType,
  isMyCustomAction,
  RecordConstructorToView,
  ValueAndMsg,
  wrapChildAction,
} from "openblocks-core";
import { NameGenerator } from "comps/utils";
import _ from "lodash";
import { CreateData, CreateForm } from "./createForm";
import { defaultLayout, GridItemComp } from "../gridItemComp";
import { ReactNode, useContext } from "react";
import { pushAction } from "comps/generators/list";
import { FullColumnInfo } from "./generate/dataSourceCommon";
import { eventHandlerControl, submitEvent } from "comps/controls/eventHandlerControl";
import {
  simpleContainerAddAction,
  toSimpleContainerData,
} from "../containerBase/simpleContainerComp";
import {
  ContainerCompBuilder,
  TriContainerViewProps,
} from "../triContainerComp/triContainerCompBuilder";
import { TriContainer } from "../triContainerComp/triContainer";
import { traverseCompTree } from "../containerBase/utils";
import { IForm } from "./formDataConstants";
import { message, Spin } from "antd";
import { BoolControl } from "comps/controls/boolControl";
import { BottomResTypeEnum } from "types/bottomRes";
import { BoolCodeControl, JSONObjectControl } from "comps/controls/codeControl";
import { JSONObject } from "util/jsonTypes";
import { EvalParamType } from "comps/controls/actionSelector/executeCompTypes";
import { LayoutItem } from "layout/utils";
import {
  disabledPropertyView,
  hiddenPropertyView,
  loadingPropertyView,
} from "comps/utils/propertyUtils";
import { trans } from "i18n";
import log from "loglevel";
import { DisabledContext } from "comps/generators/uiCompBuilder";
import { LoadingOutlined } from "@ant-design/icons";

const eventOptions = [submitEvent] as const;

const childrenMap = {
  initialData: JSONObjectControl,
  resetAfterSubmit: BoolControl,
  disabled: BoolCodeControl,
  disableSubmit: BoolCodeControl,
  loading: BoolCodeControl,
  onEvent: eventHandlerControl(eventOptions),
};

type FormProps = TriContainerViewProps &
  RecordConstructorToView<typeof childrenMap> & { dispatch: DispatchType };

function dispatchAsyncAddCompsAction(props: FormProps, columnInfos: FullColumnInfo[]) {
  const { dispatch, layout, positionParams } = props.container.body[0].children.view.getView();
  let y = 0;
  const infos = columnInfos.map(({ column, compName }) => {
    const layoutItem: LayoutItem = {
      i: "",
      h: defaultLayout(column.comp.type).h,
      w: positionParams.cols,
      x: 0,
      y: y,
    } as const;
    y = y + layoutItem.h;
    return {
      item: {
        compType: column.comp.type,
        name: compName,
        comp: {
          ...column.comp.compInitData,
          formDataKey: column.name,
          label: { text: column.label },
          required: column.required,
        },
      },
      layoutItem: layoutItem,
    };
  });
  dispatch(deferAction(simpleContainerAddAction(layout, infos)));
}

function onEventData(queryName: string) {
  return {
    name: "submit",
    handler: {
      compType: "executeQuery",
      comp: { queryName: queryName },
    },
  };
}

function onCreate(
  data: CreateData,
  props: FormProps,
  editorState: EditorState,
  formName: string
): string {
  const { dispatch } = props;
  const nameGenerator = editorState.getNameGenerator();
  const infos = data.columns.map((column) => {
    const compName = nameGenerator.genItemName("form" + _.upperFirst(column.comp.type));
    return { column, compName };
  });
  dispatchAsyncAddCompsAction(props, infos);

  const tableName = data.tableName;
  const lastName = tableName.substring(tableName.lastIndexOf(".") + 1);
  const queryNamePrefix = formName + "SubmitTo" + lastName.split("_").map(_.upperFirst).join("");
  const queryName = nameGenerator.genItemName(queryNamePrefix);
  dispatch(deferAction(wrapChildAction("onEvent", pushAction(onEventData(queryName)))));

  const queryData = data.dataSourceTypeConfig.getQueryInitData(formName, tableName, infos);
  const queriesComp = editorState.getQueriesComp();
  queriesComp.dispatch(
    deferAction(
      queriesComp.pushAction({
        ...queryData,
        id: genQueryId(),
        name: queryName,
        datasourceId: data.dataSourceId,
        triggerType: "manual",
        notification: { showSuccess: true, showFail: true },
      })
    )
  );

  editorState.setSelectedBottomRes(queryName, BottomResTypeEnum.Query);
  return "";
}

const BodyPlaceholder = (props: FormProps) => {
  const editorState = useContext(EditorContext);
  const formName = useContext(CompNameContext);
  return (
    <ContainerPlaceholder>
      {trans("formComp.containerPlaceholder")}
      <br />
      <CreateForm
        onCreate={(data: CreateData) =>
          Promise.resolve(onCreate(data, props, editorState, formName))
        }
      />
    </ContainerPlaceholder>
  );
};

const loadingIcon = <LoadingOutlined spin />;

const FormBaseComp = (function () {
  return new ContainerCompBuilder(childrenMap, (props, dispatch) => {
    return (
      <DisabledContext.Provider value={props.disabled}>
        <Spin indicator={loadingIcon} spinning={props.loading}>
          <TriContainer
            {...props}
            hintPlaceholder={<BodyPlaceholder {...props} dispatch={dispatch} />}
          />
        </Spin>
      </DisabledContext.Provider>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {false && children.initialData.propertyView({ label: trans("formComp.initialData") })}
            {children.resetAfterSubmit.propertyView({ label: trans("formComp.resetAfterSubmit") })}
          </Section>
          <Section name={sectionNames.interaction}>
            {children.onEvent.getPropertyView()}
            {disabledPropertyView(children)}
            {children.disableSubmit.propertyView({ label: trans("formComp.disableSubmit") })}
            {loadingPropertyView(children)}
          </Section>
          <Section name={sectionNames.layout}>
            {children.container.getPropertyView()}
            {hiddenPropertyView(children)}
          </Section>
          <Section name={sectionNames.style}>{children.container.stylePropertyView()}</Section>
        </>
      );
    })
    .build();
})();

type FormDataType = ConstructorToDataType<typeof FormBaseComp>;

type SetDataAction = {
  type: "setData";
  initialData: JSONObject;
};

let FormTmpComp = class extends FormBaseComp implements IForm {
  onEventPropertyView(title: ReactNode) {
    return this.children.onEvent.propertyView({ title });
  }
  traverseFormItems(consumer: (item: GridItemComp) => boolean) {
    return traverseCompTree(this.getCompTree(), (item) => {
      return item.children.comp.children.formDataKey ? consumer(item as GridItemComp) : true;
    });
  }
  validateFormItems() {
    return this.traverseFormItems((item) => {
      const comp = item.children.comp;
      // When a child component implements required, it must also implement invalid
      return !comp.exposingValues?.invalid;
    });
  }
  runMethodOfItems(
    ...searchMethods: {
      name: string;
      getParams?: (item: GridItemComp) => EvalParamType[] | undefined;
    }[]
  ): Promise<void> {
    const promises: Promise<unknown>[] = [];
    this.traverseFormItems((item) => {
      const methods = item.children.comp.exposingMethods();
      for (const method of searchMethods) {
        const func = methods[method.name]?.func;
        if (func) {
          const params = method.getParams ? method.getParams(item) : [];
          if (params !== undefined) {
            promises.push(Promise.resolve(func(...params)));
            return true;
          }
        }
      }
      const compType = item.children.compType.getView();
      log.warn(
        trans("form") +
          compType +
          trans("formComp.notSupportMethod") +
          searchMethods.map((m) => m.name)
      );
      return true;
    });
    return Promise.all(promises).then(() => {});
  }
  setData(data: JSONObject, initialData?: JSONObject) {
    // For the properties, first find in data, then initialData, subcomponent default value (resetValue), empty value (clearValue)
    const newData = { ...(initialData ?? this.children.initialData.getView()), ...data };
    return this.runMethodOfItems(
      {
        name: "setValue",
        getParams: (t) => {
          // use component name when formDataKey is empty
          const key = t.children.comp.children.formDataKey?.getView() || t.children.name.getView();
          const value = newData[key];
          return value !== undefined ? [value as EvalParamType] : undefined;
        },
      },
      { name: "resetValue" },
      { name: "clearValue" }
    );
  }
  reset() {
    return this.setData({});
  }
  submit() {
    if (this.disableSubmit()) {
      return Promise.reject("disableSubmit");
    }
    if (this.validateFormItems()) {
      const promise = this.children.onEvent.getView()("submit");
      return promise.then(() => {
        if (this.children.resetAfterSubmit.getView()) {
          return this.reset();
        }
        return Promise.resolve();
      });
    } else {
      message.error(trans("formComp.notValidForm"));
      return Promise.reject("formComp.notValidForm");
    }
  }
  disableSubmit() {
    return this.children.disabled.getView() || this.children.disableSubmit.getView();
  }
  override reduce(action: CompAction): this {
    switch (action.type) {
      case CompActionTypes.UPDATE_NODES_V2: {
        const ret = super.reduce(action);
        // When the initial value changes, update the form
        if (ret.children.initialData !== this.children.initialData) {
          // FIXME: kill setTimeout ?
          setTimeout(() => {
            this.dispatch(
              customAction<SetDataAction>(
                {
                  type: "setData",
                  initialData: (action.value["initialData"] as ValueAndMsg<JSONObject>).value || {},
                },
                false
              )
            );
          });
        }
        return ret;
      }
      case CompActionTypes.CUSTOM:
        if (isMyCustomAction<SetDataAction>(action, "setData")) {
          this.setData({}, action.value.initialData);
          return this;
        }
    }
    return super.reduce(action);
  }
};

FormTmpComp = withMethodExposing(FormTmpComp, [
  {
    method: {
      name: "submit",
      description: trans("export.submitDesc"),
      params: [],
    },
    execute: (comp, values) => comp.submit(),
  },
  {
    method: {
      name: "reset",
      description: trans("formComp.resetDesc"),
      params: [],
    },
    execute: (comp, values) => comp.reset(),
  },
  {
    method: {
      name: "clear",
      description: trans("formComp.clearDesc"),
      params: [],
    },
    execute: (comp, values) => comp.runMethodOfItems({ name: "clearValue" }),
  },
  {
    method: {
      name: "setData",
      description: trans("formComp.setDataDesc"),
      params: [{ name: "data", type: "JSON" }],
    },
    execute: (comp, values) => {
      if (values.length !== 1) {
        return Promise.reject(trans("formComp.valuesLengthError"));
      }
      const data = values[0];
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return Promise.reject(trans("formComp.valueTypeError"));
      }
      return comp.setData(data);
    },
  },
]);

export const FormComp = withExposingConfigs(FormTmpComp, [
  ...CommonNameConfig,
  new NameConfig("loading", trans("formComp.loadingDesc")),
  depsConfig({
    name: "data",
    desc: trans("formComp.dataDesc"),
    depKeys: ["container"],
    func: (input) => {
      const data: Record<string, unknown> = {};
      Object.entries(input.container).forEach(([name, value]) => {
        const exposingValues = value as any;
        if (exposingValues?.hasOwnProperty("formDataKey")) {
          // use component name when formDataKey is empty
          data[exposingValues["formDataKey"] || name] = exposingValues["value"];
        }
      });
      return data;
    },
  }),
  depsConfig({
    name: "invalid",
    desc: trans("export.invalidDesc"),
    depKeys: ["container"],
    func: (input) => {
      for (const [, value] of Object.entries(input.container)) {
        const exposingValues = value as any;
        if (exposingValues?.hasOwnProperty("formDataKey") && exposingValues["invalid"]) {
          return true;
        }
      }
      return false;
    },
  }),
]);

export function defaultFormData(compName: string, nameGenerator: NameGenerator): FormDataType {
  return {
    container: {
      header: toSimpleContainerData([
        {
          item: {
            compType: "text",
            name: nameGenerator.genItemName("formTitle"),
            comp: {
              text: "### " + trans("formComp.formTitle"),
            },
          },
          layoutItem: {
            i: "",
            h: 5,
            w: 24,
            x: 0,
            y: 0,
          },
        },
      ]),
      footer: toSimpleContainerData([
        {
          item: {
            compType: "button",
            name: nameGenerator.genItemName("formButton"),
            comp: {
              text: trans("button.submit"),
              type: "submit",
              form: compName,
            },
          },
          layoutItem: {
            i: "",
            h: 5,
            w: 10,
            x: 14,
            y: 0,
          },
        },
      ]),
      showHeader: true,
      showFooter: true,
    },
  };
}
