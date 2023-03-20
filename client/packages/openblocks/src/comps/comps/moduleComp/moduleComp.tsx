import ApplicationApi from "api/applicationApi";
import { JSONValue } from "util/jsonTypes";
import {
  CompAction,
  CompActionTypes,
  customAction,
  isMyCustomAction,
  fromRecord,
  Node,
  WrapNode,
  CompParams,
  DispatchType,
} from "openblocks-core";
import { RootComp } from "comps/comps/rootComp";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { valueComp, withViewFn } from "comps/generators";
import { ToDataType, ToInstanceType } from "comps/generators/multi";
import { HidableView, UICompBuilder } from "comps/generators/uiCompBuilder";
import { withExposingRaw } from "comps/generators/withExposing";
import { exposingInfoToNodes, exposingMethods } from "comps/utils/exposingTypes";
import { getReduceContext, PartialReduceContext, reduceInContext } from "comps/utils/reduceContext";
import { API_STATUS_CODES } from "constants/apiConstants";
import { AppTypeEnum } from "constants/applicationConstants";
import { GreyTextColor } from "constants/style";
import { Section, sectionNames } from "openblocks-design";
import { ReactNode, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  ExternalEditorContext,
  ExternalEditorContextState,
} from "util/context/ExternalEditorContext";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { wrapWithPromiseHandling } from "util/promiseUtils";
import ModuleInputComp from "./moduleInputComp";
import { MethodConfigInfo, withMethodExposing } from "comps/generators/withMethodExposing";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { ModuleLoading } from "components/ModuleLoading";
import { trans } from "i18n";
import { ParamsConfig, ParamType } from "comps/controls/actionSelector/executeCompTypes";

const Wrapper = styled.div`
  height: 100%;

  & > div {
    height: 100%;
  }
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${GreyTextColor};
`;

type InitAction = {
  type: "init";
};

type DSLType = any;
type UpdateDslAction = {
  type: "updateDsl";
  dsl: DSLType;
  moduleDsl: Record<string, DSLType>;
};

type ModuleReadyAction = {
  type: "moduleReady";
  comp: RootComp;
};

type DelegatedAction = {
  type: "delegated";
  action: any;
};

const childrenMap = {
  appId: valueComp<string>(""),
  error: valueComp<string>(""),
  inputs: ModuleInputComp,
  events: eventHandlerControl(),
  autoHeight: AutoHeightControl,
};

type DataType = ToDataType<ToInstanceType<typeof childrenMap>>;

const ModuleCompBase = new UICompBuilder(childrenMap, () => null)
  .setPropertyViewFn(() => null)
  .build();

class ModuleTmpComp extends ModuleCompBase {
  moduleRootComp: RootComp | null = null;

  readonly moduleDsl: DSLType | undefined;
  readonly isReady: boolean = false;
  readonly loadedAppId: string = "";
  readonly error: string = "";

  private value: DataType | undefined;

  constructor(params: CompParams<DataType>) {
    super(params);
    this.value = params.value;
  }

  getPropertyView() {
    if (this.error) {
      return null;
    }
    const inputPropertyView = this.children.inputs.getPropertyView();
    const eventConfigs = this.getEventItems();
    const eventsPropertyView = this.children.events.propertyView({ eventConfigs });
    return (
      <>
        {inputPropertyView && <Section name={sectionNames.basic}>{inputPropertyView}</Section>}
        {eventConfigs.length > 0 && (
          <Section name={sectionNames.interaction}>{eventsPropertyView}</Section>
        )}
        <Section name={sectionNames.layout}>
          {!this.autoScaleCompHeight() && this.children.autoHeight.getPropertyView()}
          {hiddenPropertyView(this.children)}
        </Section>
      </>
    );
  }

  toJsonValue(): DataType {
    const data = super.toJsonValue();
    if (this.isReady) {
      return data;
    }
    return {
      ...data,
      inputs: this.value?.inputs,
      events: this.value?.events,
    };
  }

  autoScaleCompHeight() {
    if (!this.moduleRootComp) {
      return false;
    }
    const moduleLayoutComp = this.moduleRootComp.children.ui.getModuleLayoutComp();
    return moduleLayoutComp?.children.autoScaleCompHeight.getView();
  }

  autoHeight() {
    if (!this.moduleRootComp) {
      return false;
    }
    if (this.autoScaleCompHeight()) {
      return false;
    }
    return this.children.autoHeight.getView();
  }

  isModuleLayoutComp() {
    return this.moduleRootComp !== null && !!this.moduleRootComp.children.ui.getModuleLayoutComp();
  }

  reduceModuleAction(action: CompAction<JSONValue>): this {
    if (!this.moduleRootComp) {
      return this;
    }

    // trigger event actions
    const triggerModuleEventAction = this.getTriggerModuleEventAction(action);
    if (triggerModuleEventAction) {
      const triggerEvent = this.children.events.getView() as unknown as (name: string) => void;
      triggerEvent(triggerModuleEventAction.name);
      return this;
    }

    // query execute actions
    const queryAction = this.children.inputs.getInputQueryExecAction(action);
    if (queryAction) {
      this.dispatch(queryAction);
      return this;
    }

    // other actions
    const ctx = this.moduleReduceContext();

    let nextComp = null;
    wrapWithPromiseHandling((act) => {
      nextComp = reduceInContext(ctx, () => this.moduleRootComp?.reduce(act));
    })(action);

    if (nextComp === this.moduleRootComp) {
      return this;
    }
    return setFieldsNoTypeCheck(this, {
      moduleRootComp: nextComp,
    });
  }

  moduleReduceContext() {
    const isModule = this.isModuleLayoutComp();
    const { parentApplicationPath, applicationId, moduleDSL } = getReduceContext();
    let ctx: PartialReduceContext = {
      applicationId: this.loadedAppId,
      readOnly: true,
      moduleDSL: this.moduleDsl || moduleDSL,
      parentApplicationPath: isModule ? [...parentApplicationPath, applicationId] : [],
    };
    return ctx;
  }

  override changeDispatch(dispatch: DispatchType) {
    const next = super.changeDispatch(dispatch);
    const nextModuleRootComp = this.moduleRootComp?.changeDispatch(next.getModuleDispatchFn());
    if (!nextModuleRootComp) {
      return next;
    }
    return setFieldsNoTypeCheck(
      next,
      {
        moduleRootComp: nextModuleRootComp,
      },
      { keepCacheKeys: ["node"] }
    );
  }

  getModuleDispatchFn() {
    return (action: CompAction<any>) => {
      // log.info("dispatch from module:", action);
      this.dispatch(
        customAction(
          {
            type: "delegated",
            action,
          },
          false
        )
      );
    };
  }

  hasCycleDep(appId: string, moduleDsl: Record<string, any>) {
    return !!moduleDsl[appId];
  }

  updateDSL(dsl: DSLType, moduleDsl?: DSLType) {
    this.dispatch(
      customAction<UpdateDslAction>(
        {
          type: "updateDsl",
          dsl,
          moduleDsl,
        },
        false
      )
    );
  }

  override reduce(action: CompAction<JSONValue>): this {
    const appId = this.children.appId.getView();

    // init
    if (isMyCustomAction<InitAction>(action, "init")) {
      if (getReduceContext().disableUpdateState) return this;
      if (this.loadedAppId === appId) {
        return this;
      }
      const reduceContext = getReduceContext();
      const dsl = reduceContext.moduleDSL[appId];
      if (dsl) {
        this.updateDSL(dsl);
      } else {
        ApplicationApi.getApplicationDetail({
          applicationId: appId,
          type: "published",
        }).then((resp) => {
          if (resp.status !== API_STATUS_CODES.SUCCESS) {
            this.children.error.dispatchChangeValueAction(resp.data.message);
            return;
          }

          const { applicationDSL, moduleDSL } = resp.data.data;
          if (this.hasCycleDep(reduceContext.applicationId || "", moduleDSL)) {
            this.children.error.dispatchChangeValueAction(trans("module.circularReference"));
            return;
          }

          this.updateDSL(applicationDSL, moduleDSL);
        });
      }
      return setFieldsNoTypeCheck(this, { loadedAppId: appId });
    }

    // update dsl to init module root
    if (isMyCustomAction<UpdateDslAction>(action, "updateDsl")) {
      if (getReduceContext().disableUpdateState) return this;
      const { dsl, moduleDsl } = action.value;
      const moduleRootComp = new RootComp({
        dispatch: this.getModuleDispatchFn(),
        value: dsl,
      });
      moduleRootComp.setModuleRoot(true);
      moduleRootComp.preload(`module-${this.loadedAppId}`).then((comp) => {
        this.dispatch(customAction<ModuleReadyAction>({ type: "moduleReady", comp }, false));
      });

      return setFieldsNoTypeCheck(this, { moduleDsl });
    }

    // module ready
    if (isMyCustomAction<ModuleReadyAction>(action, "moduleReady")) {
      if (getReduceContext().disableUpdateState) return this;
      const moduleRootComp = action.value.comp;
      if (!moduleRootComp) {
        return this;
      }

      let updateFields: Record<string, any> = {
        isReady: true,
        moduleRootComp,
      };

      const moduleLayoutComp = moduleRootComp.children.ui.getModuleLayoutComp();
      if (moduleLayoutComp) {
        const inputs = moduleLayoutComp.getInputs().map((i) => i.getView());
        const inputChild = this.children.inputs.setInputs(inputs);
        updateFields = {
          ...updateFields,
          children: {
            ...this.children,
            inputs: inputChild,
          },
        };
      }
      return setFieldsNoTypeCheck(this, updateFields);
    }

    // delegated module action
    if (isMyCustomAction<DelegatedAction>(action, "delegated")) {
      return this.reduceModuleAction(action.value.action);
    }

    if (!this.moduleRootComp) {
      return super.reduce(action);
    }

    if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      let comp = super.reduce(action);

      const ctx = this.moduleReduceContext();
      const nextModuleRootComp = reduceInContext(ctx, () => {
        return comp.moduleRootComp?.reduce({
          ...action,
          value: action.value.delegated,
        });
      });

      if (comp.moduleRootComp !== nextModuleRootComp) {
        comp = setFieldsNoTypeCheck(comp, {
          moduleRootComp: nextModuleRootComp,
        });
      }
      return comp;
    }

    return super.reduce(action);
  }

  getEventItems() {
    const moduleLayoutComp = this.moduleRootComp?.children.ui.getModuleLayoutComp();
    if (moduleLayoutComp) {
      return moduleLayoutComp.getEvents().map((i) => ({
        label: i.children.name.getView(),
        value: i.children.name.getView(),
        description: i.children.description.getView(),
      }));
    }
    return [];
  }

  getTriggerModuleEventAction(action: CompAction<any>) {
    if (
      action.type === CompActionTypes.ROUTE_BY_NAME &&
      action.action.type === CompActionTypes.TRIGGER_MODULE_EVENT
    ) {
      return action.action;
    }
    return null;
  }

  getModuleMethodConfigInfo(): MethodConfigInfo<typeof ModuleTmpComp>[] {
    const moduleLayoutComp = this.moduleRootComp?.children.ui.getModuleLayoutComp();
    if (!moduleLayoutComp) {
      return [];
    }

    return moduleLayoutComp.children.methods.getView().map((i) => {
      const name = i.children.name.getView();
      const params: ParamsConfig = [];
      i.children.params.getView().forEach((param) => {
        params.push({
          name: param.children.name.getView(),
          type: param.children.type.getView() as ParamType,
          description: param.children.description.getView(),
        });
      });
      return {
        method: {
          name,
          params,
          description: "",
        },
        execute: (comp, params) => {
          const mlc = comp.moduleRootComp?.children.ui.getModuleLayoutComp();
          if (!mlc) {
            return;
          }
          return mlc.children.methods.executeMethodByName(name, params);
        },
      };
    });
  }

  getOutputDesc() {
    const moduleRootComp = this.moduleRootComp;
    if (!moduleRootComp) {
      return {};
    }

    const moduleLayoutComp = moduleRootComp.children.ui.getModuleLayoutComp();
    if (!moduleLayoutComp) {
      return {};
    }

    const outputs = moduleLayoutComp.getOutputs();
    const outputsDesc: Record<string, string> = {};
    outputs.forEach((i: any) => {
      outputsDesc[i.children.name.getView()] = i.children.description.getView();
    });

    return outputsDesc;
  }

  getOutputNodes() {
    const moduleRootComp = this.moduleRootComp;
    if (!moduleRootComp) {
      return {};
    }

    const moduleContainer = moduleRootComp.children.ui.getModuleLayoutComp();
    if (!moduleContainer) {
      return {};
    }

    const outputs = moduleContainer.getOutputs();
    const outputsRecord: Record<string, Node<unknown>> = {};

    const moduleExposingInfo = moduleRootComp.nameAndExposingInfo();
    outputs.forEach((i) => {
      outputsRecord[i.children.name.getView()] = new WrapNode(
        i.children.value.exposingNode(),
        exposingInfoToNodes(moduleExposingInfo),
        exposingMethods(moduleExposingInfo),
        this.children.inputs.getInputNodes()
      );
    });

    return outputsRecord;
  }

  override nodeWithoutCache(): any {
    const node = this.moduleRootComp?.node();
    if (!node) {
      return undefined;
    }

    const moduleExposingInfo = this.moduleRootComp!.nameAndExposingInfo();
    const n = new WrapNode(
      node,
      exposingInfoToNodes(moduleExposingInfo),
      exposingMethods(moduleExposingInfo),
      this.children.inputs.getInputNodes()
    );

    return fromRecord({
      ...this.childrenNode(),
      delegated: n,
      output: fromRecord(this.getOutputNodes()),

      // The following must be added, otherwise the component will be loaded all the time, there are many logics coupled like this
      // Need to organize a more robust development interface as soon as possible to shield the underlying complex architecture design
      ...this.extraNode()?.node,
    });
  }
}

/**
 * load app/module according to appId
 */
const ModuleCompWithView = withViewFn(ModuleTmpComp, (comp) => {
  const appId = comp.children.appId.getView();
  const error = comp.children.error.getView();

  const moduleExternalState: ExternalEditorContextState = useMemo(
    () => ({
      readOnly: true,
      hideHeader: true,
      applicationId: appId,
      appType: AppTypeEnum.Module,
    }),
    [appId]
  );

  useEffect(() => {
    if (appId !== comp.loadedAppId) {
      comp.dispatch(customAction<InitAction>({ type: "init" }, false));
    }
  }, [comp, appId]);

  if (error) {
    return <Placeholder>{error}</Placeholder>;
  }

  let content: ReactNode = appId ? <ModuleLoading /> : <Placeholder />;
  if (comp.moduleRootComp && comp.isReady) {
    content = (
      <Wrapper className="module-wrapper">
        <ExternalEditorContext.Provider value={moduleExternalState}>
          {comp.moduleRootComp.getView()}
        </ExternalEditorContext.Provider>
      </Wrapper>
    );
  }
  return <HidableView hidden={comp.children.hidden.getView()}>{content}</HidableView>;
});

const ModuleCompWithExposingMethods = withMethodExposing(ModuleCompWithView, (comp) => {
  return comp.getModuleMethodConfigInfo();
});

const emptyExposing = fromRecord({});

export const ModuleComp = withExposingRaw(
  ModuleCompWithExposingMethods,
  (comp) => comp.getOutputDesc(),
  (comp) => {
    if (!comp.isModuleLayoutComp()) {
      return emptyExposing;
    }
    // FIXME: keeps the reference unchanged
    return fromRecord(comp.getOutputNodes());
  }
);
