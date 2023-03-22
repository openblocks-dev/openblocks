import { isContainer } from "comps/comps/containerBase";
import { RootComp as RootCompTmp } from "comps/comps/rootComp";
import { PositionParams } from "layout";
import _ from "lodash";
import React, { ReactNode } from "react";
import { BottomResComp, BottomResListComp, BottomResTypeEnum } from "types/bottomRes";
import { setFields } from "util/objectUtils";
import { OptionalComp, renameAction } from "openblocks-core";
import { GridItemComp } from "./comps/gridItemComp";
import { hookCompCategory, isHookComp } from "./hooks/hookCompTypes";
import { NameGenerator } from "./utils";
import { NameAndExposingInfo } from "./utils/exposingTypes";
import { checkName } from "./utils/rename";
import { trans } from "i18n";
import { UiLayoutType } from "./comps/uiComp";

type RootComp = InstanceType<typeof RootCompTmp>;

/**
 * Typescript can't get private variables, so add it manually here
 */
type ChangeableProps = Partial<EditorState>;

export type CompInfo = {
  name: string;
  type: string;
  data: Record<string, any>;
  dataDesc: Record<string, ReactNode>;
};

type SelectSourceType = "editor" | "leftPanel" | "addComp" | "rightPanel";

/**
 * All editor states are placed here and are still immutable.
 *
 * Notice:
 * 1. The state that needs to be persisted is maintained by comp, and the state here doesn't persistence.
 * 2. All setters are not changing the current editorState instance, but generating the new instance.
 */
export class EditorState {
  readonly rootComp: RootComp;
  readonly showPropertyPane: boolean = false;
  readonly selectedCompNames: Set<string> = new Set();
  readonly isDragging: boolean = false;
  readonly draggingCompType: string = "button";
  readonly forceShowGrid: boolean = false; // show grid lines
  readonly disableInteract: boolean = false; // disable comp's interaction (such as click button event)
  readonly selectedBottomResName: string = "";
  readonly selectedBottomResType?: BottomResTypeEnum;
  readonly showResultCompName: string = "";
  readonly selectSource?: SelectSourceType; // the source of select type

  private readonly setEditorState: (fn: (editorState: EditorState) => EditorState) => void;

  constructor(
    rootComp: RootComp,
    setEditorState: (fn: (editorState: EditorState) => EditorState) => void
  ) {
    this.rootComp = rootComp;
    this.setEditorState = setEditorState;
  }

  /**
   * use changeState most of the time, and you can use this method to get the latest editorState. (similar to react's setState method)
   */
  private changeStateFn(fn: (editorState: EditorState) => ChangeableProps) {
    this.setEditorState((oldState) => {
      const stateChanges = fn(oldState);
      return setFields(oldState, stateChanges);
    });
  }

  private changeState(params: ChangeableProps) {
    this.changeStateFn(() => params);
  }

  getAllCompMap() {
    return { ...this.getAllHooksCompMap(), ...this.getUIComp().getAllCompItems() };
  }

  getAllUICompMap() {
    const ret = { ...this.getUIComp().getAllCompItems() };
    // Include UI sub comps in HookComp
    Object.entries(this.getAllHooksCompMap()).forEach(([key, item]) => {
      const type = item.children.compType.getView();
      if (!isHookComp(type) || hookCompCategory(type) === "ui") {
        ret[key] = item;
      }
    });
    return ret;
  }

  private getAllHooksCompMap() {
    return this.getHooksComp().getAllCompItems();
  }

  /**
   * Get the comp variable by name.
   * FIXME: currently only the ui comp can be obtained, and in the future all comps should be obtained
   */
  getUICompByName(name: string) {
    const compMap = this.getAllUICompMap();
    return Object.values(compMap).find((item) => item.children.name.getView() === name);
  }

  getNameGenerator() {
    const nameGenerator = new NameGenerator();
    const exposingInfo = this.nameAndExposingInfo();
    nameGenerator.init(Object.keys(exposingInfo));
    return nameGenerator;
  }

  nameAndExposingInfo() {
    return this.rootComp.nameAndExposingInfo();
  }

  uiCompInfoList(): Array<CompInfo> {
    const compMap = this.getAllUICompMap();
    return Object.values(compMap).map((item) => {
      return {
        name: item.children.name.getView(),
        type: item.children.compType.getView(),
        data: item.children.comp.exposingValues,
        dataDesc: item.children.comp.exposingInfo().propertyDesc,
      };
    });
  }

  getCompInfo(nameAndExposingInfo: NameAndExposingInfo, name: string, type: string): CompInfo {
    return {
      name,
      type,
      data: nameAndExposingInfo[name].propertyValue as Record<string, any>,
      dataDesc: nameAndExposingInfo[name].propertyDesc,
    };
  }

  bottomResComInfoList(): Array<CompInfo> {
    const queryComInfoList = this.queryCompInfoList();
    const stateComInfoList = this.getTempStateCompInfoList();
    const transformerComInfoList = this.getTransformerCompInfoList();
    const dataResponderInfoList = this.getDataResponderInfoList();
    return [
      ...queryComInfoList,
      ...stateComInfoList,
      ...transformerComInfoList,
      ...dataResponderInfoList,
    ];
  }

  getDataResponderInfoList(): Array<CompInfo> {
    const listComp = this.getDataRespondersComp();
    const exposingInfo = listComp.nameAndExposingInfo();
    return listComp.getView().map((item) => {
      const name = item.children.name.getView();
      return this.getCompInfo(exposingInfo, name, BottomResTypeEnum.DateResponder);
    });
  }

  getTempStateCompInfoList(): Array<CompInfo> {
    const listComp = this.getTempStatesComp();
    const exposingInfo = listComp.nameAndExposingInfo();
    return listComp.getView().map((item) => {
      const name = item.children.name.getView();
      return this.getCompInfo(exposingInfo, name, BottomResTypeEnum.TempState);
    });
  }

  getTransformerCompInfoList(): Array<CompInfo> {
    const listComp = this.getTransformersComp();
    const exposingInfo = listComp.nameAndExposingInfo();
    return listComp.getView().map((item) => {
      const name = item.children.name.getView();
      return this.getCompInfo(exposingInfo, name, BottomResTypeEnum.Transformer);
    });
  }

  // All queries here uniformly use type === 'query'
  queryCompInfoList(): Array<CompInfo> {
    const exposingInfo = this.getQueriesComp().nameAndExposingInfo();
    return this.getQueriesComp()
      .getView()
      .map((item) => {
        const name = item.children.name.getView();
        return this.getCompInfo(exposingInfo, name, BottomResTypeEnum.Query);
      });
  }

  hooksCompInfoList(): Array<CompInfo> {
    // get all hookComps, including sub comps if hookComp is a container, and sub comps may not be hookComp
    return Object.values(this.getAllHooksCompMap()).map((item) => {
      return {
        name: item.children.name.getView(),
        type: item.children.compType.getView(),
        data: item.children.comp.exposingValues,
        dataDesc: item.children.comp.exposingInfo().propertyDesc,
      };
    });
  }

  getBottomResItemFromList(listComp: BottomResListComp) {
    return listComp.items().find((i) => {
      return i.id() === this.selectedBottomResName;
    });
  }

  selectedBottomResComp(): BottomResComp | undefined {
    const { selectedBottomResName } = this;
    return this.getBottomResComp(selectedBottomResName);
  }

  selectedOrFirstQueryComp() {
    const selectedQueryComp = this.selectedQueryComp();
    if (selectedQueryComp) {
      return selectedQueryComp;
    }
    return this.getQueriesComp().getView()[0];
  }

  selectedQueryComp() {
    if (this.selectedBottomResType !== BottomResTypeEnum.Query || !this.selectedBottomResName) {
      return undefined;
    }
    return this.getQueriesComp()
      .getView()
      .find((queryComp) => {
        return queryComp.children.name.getView() === this.selectedBottomResName;
      });
  }

  showResultComp(): BottomResComp | undefined {
    const bottomResComps = Object.values(BottomResTypeEnum).reduce<BottomResComp[]>((a, b) => {
      const items = this.getBottomResListComp(b).items();
      return a.concat(items);
    }, []);

    return bottomResComps.find((i) => i.name() === this.showResultCompName);
  }

  /**
   * @deprecated
   */
  selectedComp(): OptionalComp {
    // temporary glue code
    const compType = this.getUIComp().children.compType.getView();
    if (compType !== "normal" && compType !== "module") {
      return this.getUIComp().children.comp;
    }
    const compMap = this.getAllCompMap();
    if (this.selectedCompNames.size > 1) {
      return undefined;
    }
    return Object.values(compMap).find((item) =>
      this.selectedCompNames.has(item.children.name.getView())
    );
  }

  // positional parameters of the global canvas
  canvasPositionParams(): PositionParams | undefined {
    return this.getUIComp().getComp()?.getPositionParams();
  }

  selectedComps() {
    const compMap = this.getAllCompMap();
    const selectedComps = _.pickBy(compMap, (item) =>
      this.selectedCompNames.has(item.children.name.getView())
    );
    return selectedComps;
  }

  selectedContainer() {
    const selectedComps = this.selectedComps();
    // log.debug("selectedContainer. selectedComps: ", selectedComps);
    if (_.size(selectedComps) === 0) {
      return this.getUIComp().getComp();
    }
    const [key, comp] = _.toPairs(selectedComps)[0];
    if (_.size(selectedComps) === 1 && isContainer((comp as GridItemComp)?.children?.comp)) {
      return comp.children.comp;
    }

    return this.findContainer(key) ?? this.getUIComp().getComp();
  }

  findContainer(compKey: string) {
    return (
      this.getUIComp().getComp()?.findContainer?.(compKey) ||
      this.getHooksComp().findContainer(compKey)
    );
  }

  findUIParentContainer(compName: string, containerCompType?: string) {
    return (
      this.getUIComp().findParentContainer(compName, containerCompType) ||
      this.getHooksComp().findParentContainer(compName, containerCompType)
    );
  }

  /**
   * @param compName comp name
   * @returns the comp corresponding to the current component name regardless of whether it is a multi-select state
   */
  isCompSelected(compName: string): OptionalComp {
    const compMap = this.getAllCompMap();
    return Object.values(compMap).find(
      (item) => item.children.name.getView() === compName && this.selectedCompNames.has(compName)
    );
  }

  getAppSettings() {
    return this.getAppSettingsComp().getView();
  }

  setDragging(dragging: boolean) {
    if (this.isDragging === dragging) {
      return;
    }
    this.changeState({ isDragging: dragging });
  }

  setDraggingCompType(draggingComp: string) {
    this.changeState({ draggingCompType: draggingComp, isDragging: true });
  }

  setForceShowGrid(forceShowGrid: boolean) {
    if (this.forceShowGrid !== forceShowGrid) {
      this.changeState({ forceShowGrid });
    }
  }

  showGridLines() {
    return this.isDragging || this.forceShowGrid;
  }

  setDisableInteract(disableInteract: boolean) {
    if (this.disableInteract !== disableInteract) {
      this.changeState({ disableInteract });
    }
  }

  setShowPropertyPane(showPropertyPane: boolean) {
    this.changeState({ showPropertyPane: showPropertyPane });
  }

  setComp(compFn: (comp: RootComp) => RootComp) {
    this.changeStateFn((editorState) => {
      return { rootComp: compFn(editorState.rootComp) };
    });
  }

  setSelectedCompNames(selectedCompNames: Set<string>, selectSource?: SelectSourceType) {
    if (selectedCompNames.size === 0 && this.selectedCompNames.size === 0) {
      return;
    }
    this.changeState({
      selectedCompNames: selectedCompNames,
      showPropertyPane: selectedCompNames.size > 0,
      selectSource: selectSource,
    });
  }

  setSelectedBottomRes(name: string, type?: BottomResTypeEnum) {
    this.changeState({
      selectedBottomResName: name,
      selectedBottomResType: type,
    });
  }

  setShowResultCompName(showResultCompName: string | undefined) {
    this.changeState({ showResultCompName });
  }

  getUIComp() {
    return this.rootComp.children.ui;
  }

  getModuleLayoutComp() {
    return this.getUIComp().getModuleLayoutComp();
  }

  isModule() {
    return !!this.getModuleLayoutComp();
  }

  getBottomResListComp(type: BottomResTypeEnum): BottomResListComp {
    switch (type) {
      case BottomResTypeEnum.Query:
        return this.getQueriesComp();
      case BottomResTypeEnum.TempState:
        return this.getTempStatesComp();
      case BottomResTypeEnum.Transformer:
        return this.getTransformersComp();
      case BottomResTypeEnum.DateResponder:
        return this.getDataRespondersComp();
      case BottomResTypeEnum.Folder:
        return this.getFoldersComp();
    }
  }

  getBottomResComp(name: string): BottomResComp | undefined {
    const bottomResComps = Object.values(BottomResTypeEnum).reduce<BottomResComp[]>((a, b) => {
      const items = this.getBottomResListComp(b).items();
      return a.concat(items);
    }, []);

    return bottomResComps.find((i) => i.name() === name);
  }

  getQueriesComp() {
    return this.rootComp.children.queries;
  }

  getTempStatesComp() {
    return this.rootComp.children.tempStates;
  }

  getTransformersComp() {
    return this.rootComp.children.transformers;
  }

  getDataRespondersComp() {
    return this.rootComp.children.dataResponders;
  }

  getFoldersComp() {
    return this.rootComp.children.folders;
  }

  getHooksComp() {
    return this.rootComp.children.hooks;
  }

  getAppSettingsComp() {
    return this.rootComp.children.settings;
  }

  checkRename(oldName: string, name: string): string {
    const error = checkName(name);
    if (error) {
      return error;
    }
    if (name !== oldName && this.nameAndExposingInfo().hasOwnProperty(name)) {
      return trans("comp.nameExists", { name: name });
    }
    return "";
  }

  rename(oldName: string, name: string): boolean {
    const error = this.checkRename(oldName, name);
    if (error) {
      return false;
    }
    if (name !== oldName) {
      this.rootComp.dispatch(renameAction(oldName, name));
    }
    return true;
  }

  getAppType(): UiLayoutType {
    return this.getUIComp().children.compType.getView();
  }
}

export const EditorContext = React.createContext<EditorState>(undefined as any);

// current comp name
export const CompNameContext = React.createContext<string>(undefined as any);
