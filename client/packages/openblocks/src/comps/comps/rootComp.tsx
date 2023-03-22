import { CompAction, CompActionTypes } from "openblocks-core";
import { EditorContext, EditorState } from "comps/editorState";
import { simpleMultiComp } from "comps/generators";
import { HookListComp } from "comps/hooks/hookListComp";
import { QueryListComp } from "comps/queries/queryComp";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import EditorView from "pages/editor/editorView";
import { handlePromiseAndDispatch } from "util/promiseUtils";
import { HTMLAttributes, useContext, useEffect, useMemo, useState } from "react";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { AppSettingsComp } from "./appSettingsComp";
import { PreloadComp } from "./preLoadComp";
import { TemporaryStateListComp } from "./temporaryStateComp";
import { TransformerListComp } from "./transformerListComp";
import UIComp from "./uiComp";
import EditorSkeletonView from "pages/editor/editorSkeletonView";
import { ThemeContext } from "comps/utils/themeContext";
import { ModuleLayoutCompName } from "constants/compConstants";
import { defaultTheme as localDefaultTheme } from "comps/controls/styleControlConstants";
import { ModuleLoading } from "components/ModuleLoading";
import { getGlobalSettings } from "comps/utils/globalSettings";
import { getCurrentTheme } from "comps/utils/themeUtil";
import { DataChangeResponderListComp } from "./dataChangeResponderComp";
import { FolderListComp } from "./folderListComp";
import {
  PropertySectionContext,
  PropertySectionContextType,
  PropertySectionState,
} from "openblocks-design";
import RefTreeComp from "./refTreeComp";

interface RootViewProps extends HTMLAttributes<HTMLDivElement> {
  comp: InstanceType<typeof RootComp>;
  isModuleRoot: boolean;
}

const childrenMap = {
  ui: UIComp,
  queries: QueryListComp,
  tempStates: TemporaryStateListComp,
  transformers: TransformerListComp,
  dataResponders: DataChangeResponderListComp,
  folders: FolderListComp,
  refTree: RefTreeComp,
  hooks: HookListComp,
  settings: AppSettingsComp,
  preload: PreloadComp,
};

function RootView(props: RootViewProps) {
  const previewTheme = useContext(ThemeContext);
  const { comp, isModuleRoot, ...divProps } = props;
  const [editorState, setEditorState] = useState<EditorState>();
  const [propertySectionState, setPropertySectionState] = useState<PropertySectionState>({});
  const appThemeId = comp.children.settings.getView().themeId;
  const { orgCommonSettings } = getGlobalSettings();
  const themeList = orgCommonSettings?.themeList || [];

  const theme =
    previewTheme?.previewTheme ||
    getCurrentTheme(themeList, appThemeId)?.theme ||
    localDefaultTheme;

  useEffect(() => {
    const newEditorState = new EditorState(comp, (changeEditorStateFn) => {
      setEditorState((oldState) => (oldState ? changeEditorStateFn(oldState) : undefined));
    });
    setEditorState(newEditorState);
  }, []);

  useEffect(() => {
    if (editorState != null) {
      editorState.setComp(() => comp);
    }
  }, [comp]);

  /**
   * ensure memo, otherwise all component caches will be invalid
   */
  const themeContextValue = useMemo(
    () => ({
      theme,
    }),
    [theme]
  );

  const propertySectionContextValue = useMemo<PropertySectionContextType>(() => {
    const compName = Object.keys(editorState?.selectedComps() || {})[0];
    return {
      compName,
      state: propertySectionState,
      toggle: (compName: string, sectionName: string) => {
        setPropertySectionState((oldState) => {
          const nextSectionState: PropertySectionState = { ...oldState };
          const compState = nextSectionState[compName] || {};
          compState[sectionName] = compState[sectionName] === false;
          nextSectionState[compName] = compState;
          return nextSectionState;
        });
      },
    };
  }, [editorState, propertySectionState]);

  if (!editorState) {
    if (isModuleRoot) {
      return <ModuleLoading />;
    }
    return <EditorSkeletonView />;
  }

  return (
    <div {...divProps}>
      <PropertySectionContext.Provider value={propertySectionContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <EditorContext.Provider value={editorState}>
            {Object.keys(comp.children.queries.children).map((key) => (
              <div key={key}>{comp.children.queries.children[key].getView()}</div>
            ))}
            <EditorView uiComp={comp.children.ui} preloadComp={comp.children.preload} />
          </EditorContext.Provider>
        </ThemeContext.Provider>
      </PropertySectionContext.Provider>
    </div>
  );
}

/**
 * Root Comp
 */
const RootCompBase = simpleMultiComp(childrenMap);

export class RootComp extends RootCompBase {
  preloaded = false;
  preloadId = "";
  isModuleRoot = false;

  getView() {
    if (!this.preloaded) {
      return null;
    }
    return <RootView id={this.preloadId} comp={this} isModuleRoot={this.isModuleRoot} />;
  }

  clearPreload() {
    this.children.preload.clear();
  }

  setModuleRoot(moduleRoot: boolean) {
    this.isModuleRoot = moduleRoot;
  }

  async preload(id: string) {
    if (this.preloaded) {
      return this;
    }
    await this.children.preload.run(id);
    return setFieldsNoTypeCheck(this, { preloaded: true, preloadId: id });
  }

  private findInternalComp(name: string) {
    if (name === ModuleLayoutCompName) {
      return this.children.ui.getModuleLayoutComp();
    }
  }

  /**
   * find comp by name
   */
  private findCompByName(name: string) {
    // internal comp
    if (name.startsWith("@")) {
      return this.findInternalComp(name);
    }

    // ui comp
    const compMap = this.children.ui.getAllCompItems();
    const uiComp = Object.values(compMap).find((item) => item.children.name.getView() === name);
    if (uiComp) {
      return uiComp.children.comp;
    }

    // hooks comp
    const hooksCompMap = this.children.hooks.getAllCompItems();
    const hooksComp = Object.values(hooksCompMap).find(
      (item) => item.children.name.getView() === name
    );
    if (hooksComp) {
      return hooksComp.children.comp;
    }

    // query comp
    for (let path of Object.keys(this.children.queries.children)) {
      const queryComp = this.children.queries.children[path];
      if (queryComp.children.name.getView() === name) {
        return queryComp.children.comp;
      }
    }

    // temp state comp
    const allTempStateComp = this.children.tempStates.getView();
    for (let comp of Object.values(allTempStateComp)) {
      if (comp.children.name.getView() === name) {
        return comp;
      }
    }

    // transformer comp
    const allTransformerStateComp = this.children.transformers.getView();
    for (let comp of Object.values(allTransformerStateComp)) {
      if (comp.children.name.getView() === name) {
        return comp;
      }
    }

    // module input
    const moduleLayout = this.children.ui.getModuleLayoutComp();
    if (moduleLayout) {
      for (let input of moduleLayout.getInputs()) {
        const { name: inputName } = input.getView();
        if (name === inputName) {
          return input;
        }
      }
    }

    if (name.startsWith("/")) {
      const compName = name.substring(1) as keyof typeof childrenMap;
      return this.children[compName];
    }
  }

  override reduce(action: CompAction): this {
    if (action.type === CompActionTypes.ROUTE_BY_NAME) {
      const comp = this.findCompByName(action.name);
      if (comp) {
        handlePromiseAndDispatch(action, comp.dispatch, action.action);
      } else {
        // warn, comp not found
      }
      return this;
    }
    return super.reduce(action);
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    return {
      ...this.children.ui.nameAndExposingInfo(),
      ...this.children.queries.nameAndExposingInfo(),
      ...this.children.hooks.nameAndExposingInfo(),
      ...this.children.tempStates.nameAndExposingInfo(),
      ...this.children.transformers.nameAndExposingInfo(),
      ...this.children.dataResponders.nameAndExposingInfo(),
    };
  }
}
