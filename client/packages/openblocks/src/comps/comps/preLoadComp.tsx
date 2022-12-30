import { EmptyContent } from "components/EmptyContent";
import { HelpText } from "components/HelpText";
import { Tabs } from "components/Tabs";
import { ConstructorToComp, RecordConstructorToComp } from "openblocks-core";
import { CodeTextControl } from "comps/controls/codeTextControl";
import SimpleStringControl from "comps/controls/simpleStringControl";
import { MultiCompBuilder } from "comps/generators";
import { list } from "comps/generators/list";
import { CustomModal, DocLink, TacoButton } from "openblocks-design";
import { clearMockWindow, evalFunc } from "openblocks-core";
import { clearStyleEval, evalStyle } from "openblocks-core";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { loadScript, runScriptInHost } from "util/commonUtils";
import { getGlobalSettings } from "comps/utils/globalSettings";
import { trans } from "i18n";
import log from "loglevel";

export interface ExternalPreload {
  css?: string;
  libs?: string[];
  script?: string;
  runJavaScriptInHost?: boolean;
}

const LibListWrapper = styled.div`
  .lib-list {
    margin-bottom: 12px;
  }
  .lib-item {
    margin-bottom: 8px;
    display: flex;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .lib-item-input {
    flex: 1;
    margin-right: 8px;
  }
  .lib-list-add-btn-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    .lib-list-add-btn {
      margin-right: 8px;
    }
  }
`;

function runScript(code: string, inHost?: boolean) {
  if (inHost) {
    runScriptInHost(code);
    return;
  }
  try {
    evalFunc(code, {}, {});
  } catch (e) {
    log.error(e);
  }
}

interface RunAndClearable<T> {
  run(id: string, externalPreload?: T): Promise<any>;
  clear(): Promise<any>;
}

class LibsComp extends list(SimpleStringControl) implements RunAndClearable<string[]> {
  success: Record<string, boolean> = {};
  externalLibs: string[] = [];
  runInHost: boolean = false;
  async loadScript(url: string) {
    if (this.success[url]) {
      return async () => {};
    }
    if (this.runInHost) {
      return async () => {
        await loadScript(url);
        this.success[url] = true;
      };
    } else {
      const res = await fetch(url);
      const code = await res.text();
      return async () => {
        runScript(code);
        this.success[url] = true;
      };
    }
  }

  async loadAllLibs() {
    const scriptRunners: Promise<() => Promise<void>>[] = [];
    const appLibs = this.getView().map((i) => i.getView());
    this.externalLibs.concat(appLibs).forEach((url) => {
      const trimUrl = url.trim();
      if (!/^https?.+\.js$/.test(trimUrl)) {
        return;
      }
      scriptRunners.push(this.loadScript(trimUrl));
    });

    try {
      const runners = await Promise.all(scriptRunners);
      for await (const runner of runners) {
        await runner();
      }
    } catch (e) {
      log.warn("load preload libs error:", e);
    }
  }

  async run(id: string, externalLibs: string[] = [], runInHost: boolean = false) {
    this.externalLibs = externalLibs;
    this.runInHost = runInHost;
    return this.loadAllLibs();
  }

  async clear(): Promise<any> {
    clearMockWindow();
  }
}

class ScriptComp extends CodeTextControl implements RunAndClearable<string> {
  runInHost: boolean = false;
  runPreloadScript() {
    const code = this.getView();
    if (!code) {
      return;
    }
    runScript(code, this.runInHost);
  }
  async run(id: string, externalScript: string = "", runInHost: boolean = false) {
    this.runInHost = runInHost;
    if (externalScript) {
      runScript(externalScript, runInHost);
    }
    this.runPreloadScript();
  }
  async clear(): Promise<any> {
    clearMockWindow();
  }
}

class CSSComp extends CodeTextControl implements RunAndClearable<string> {
  id = "";
  externalCSS: string = "";

  async applyAllCSS() {
    const css = this.getView();
    evalStyle(this.id, [this.externalCSS, css]);
  }

  async run(id: string, externalCSS: string = "") {
    this.id = id;
    this.externalCSS = externalCSS;
    return this.applyAllCSS();
  }

  async clear() {
    clearStyleEval(this.id);
  }
}

const childrenMap = {
  libs: LibsComp,
  script: ScriptComp,
  css: CSSComp,
};

type ChildrenInstance = RecordConstructorToComp<typeof childrenMap>;

function LibsTabPane(props: { libsComp: ChildrenInstance["libs"] }) {
  const libComps = props.libsComp.getView();

  useEffect(() => {
    try {
      props.libsComp.loadAllLibs();
    } catch (e) {}
  }, [props.libsComp]);

  return (
    <LibListWrapper>
      <HelpText style={{ marginBottom: 20 }}>{trans("preLoad.jsLibraryHelpText")}</HelpText>
      <div className="lib-list">
        {libComps.length === 0 && <EmptyContent text={trans("preLoad.jsLibraryEmptyContent")} />}
        {libComps.map((i, idx) => {
          return (
            <div className="lib-item" key={idx}>
              <div className="lib-item-input">
                {i.propertyView({
                  placeholder: "https://cdn.xxx.com/example.min.js",
                })}
              </div>
              <TacoButton
                onClick={() => {
                  props.libsComp.dispatch(props.libsComp.deleteAction(idx));
                }}
              >
                {trans("remove")}
              </TacoButton>
            </div>
          );
        })}
      </div>
      <div className="lib-list-add-btn-wrapper">
        <TacoButton
          ghost
          className="lib-list-add-btn"
          buttonType="primary"
          onClick={() => {
            props.libsComp.dispatch(props.libsComp.pushAction(""));
          }}
        >
          {trans("preLoad.add")}
        </TacoButton>
        {trans("docUrls.thirdLib") && (
          <DocLink href={trans("docUrls.thirdLib")}>{trans("docUrls.thirdLibUrlText")}</DocLink>
        )}
      </div>
    </LibListWrapper>
  );
}

function JavaScriptTabPane(props: { comp: ConstructorToComp<typeof ScriptComp> }) {
  useEffect(() => {
    props.comp.runPreloadScript();
  }, [props.comp]);

  const codePlaceholder = `window.name = 'Tom';\nwindow.greet = () => "hello world";`;

  return (
    <>
      <HelpText style={{ marginBottom: 20 }}>{trans("preLoad.jsHelpText")}</HelpText>
      {props.comp.propertyView({
        expandable: false,
        styleName: "window",
        codeType: "Function",
        language: "javascript",
        placeholder: codePlaceholder,
      })}
    </>
  );
}

function CSSTabPane(props: { comp: CSSComp }) {
  useEffect(() => {
    props.comp.applyAllCSS();
  }, [props.comp]);

  const codePlaceholder = `.top-header {\n  background-color: red; \n}`;

  return (
    <>
      <HelpText style={{ marginBottom: 20 }}>{trans("preLoad.cssHelpText")}</HelpText>
      {props.comp.propertyView({
        expandable: false,
        placeholder: codePlaceholder,
        styleName: "window",
        language: "css",
      })}
    </>
  );
}

enum TabKey {
  Lib = "lib",
  JavaScript = "js",
  CSS = "css",
}

function PreloadConfigModal(props: ChildrenInstance) {
  const [activeKey, setActiveKey] = useState(TabKey.Lib);
  const { showScriptsAndStyleModal, changeExternalState } = useContext(ExternalEditorContext);
  return (
    <CustomModal
      draggable
      mask={activeKey !== TabKey.CSS}
      visible={showScriptsAndStyleModal}
      title={trans("preLoad.scriptsAndStyles")}
      destroyOnClose
      onCancel={() => changeExternalState?.({ showScriptsAndStyleModal: false })}
      showOkButton={false}
      showCancelButton={false}
      width="600px"
    >
      <Tabs
        onChange={(k) => setActiveKey(k as TabKey)}
        style={{ marginBottom: 8, marginTop: 4 }}
        activeKey={activeKey}
      >
        <Tabs.TabPane key={TabKey.Lib} tab={trans("preLoad.jsLibrary")}>
          <LibsTabPane libsComp={props.libs} />
        </Tabs.TabPane>
        <Tabs.TabPane key={TabKey.JavaScript} tab="JavaScript">
          <JavaScriptTabPane comp={props.script} />
        </Tabs.TabPane>
        <Tabs.TabPane key={TabKey.CSS} tab="CSS">
          <CSSTabPane comp={props.css} />
        </Tabs.TabPane>
      </Tabs>
    </CustomModal>
  );
}

const PreloadCompBase = new MultiCompBuilder(childrenMap, () => {})
  .setPropertyViewFn((children) => <PreloadConfigModal {...children} />)
  .build();

export class PreloadComp extends PreloadCompBase {
  async clear() {
    return Promise.allSettled(Object.values(this.children).map((i) => i.clear()));
  }

  async run(id: string) {
    const { orgCommonSettings = {} } = getGlobalSettings();
    const { preloadCSS, preloadJavaScript, preloadLibs, runJavaScriptInHost } = orgCommonSettings;
    await this.children.css.run(id, preloadCSS || "");
    await this.children.libs.run(id, preloadLibs || [], !!runJavaScriptInHost);
    await this.children.script.run(id, preloadJavaScript || "", !!runJavaScriptInHost);
  }
}
