import { ApplicationResp } from "api/applicationApi";
import axios from "axios";
import { RootComp } from "comps/comps/rootComp";
import { setGlobalSettings } from "comps/utils/globalSettings";
import { sdkConfig } from "constants/sdkConfig";
import _ from "lodash";
import ReactDOM from "react-dom";
import { StyleSheetManager } from "styled-components";
import { ModuleDSL, ModuleDSLIoInput } from "types/dsl";
import { AppView } from "./AppView";
import { API_STATUS_CODES } from "constants/apiConstants";
import { AUTH_LOGIN_URL } from "constants/routesURL";
import { AuthSearchParams } from "constants/authConstants";

export type OutputChangeHandler<O> = (output: O) => void;
export type EventTriggerHandler = (eventName: string) => void;
type Off = () => void;

interface EventHandlerMap<O = any> {
  moduleOutputChange: OutputChangeHandler<O>;
  moduleEventTriggered: EventTriggerHandler;
}

export interface AppViewInstanceOptions<I = any> {
  appDsl?: any;
  moduleDslMap?: any;
  baseUrl?: string;
  webUrl?: string;
  moduleInputs?: I;
}

export class AppViewInstance<I = any, O = any> {
  private comp: RootComp | null = null;
  private prevOutputs: any = null;
  private events = new Map<keyof EventHandlerMap, EventHandlerMap<O>[keyof EventHandlerMap]>();
  private dataPromise: Promise<{ appDsl: any; moduleDslMap: any }>;
  private options: AppViewInstanceOptions = {
    baseUrl: "https://api.openblocks.dev",
    webUrl: "https://cloud.openblocks.dev",
  };

  constructor(private appId: string, private node: Element, options: AppViewInstanceOptions = {}) {
    Object.assign(this.options, options);
    if (this.options.baseUrl) {
      sdkConfig.baseURL = this.options.baseUrl;
    }

    this.dataPromise = this.loadData();
    this.render();
  }

  private isModuleDSL(dsl: any): dsl is ModuleDSL {
    return dsl?.ui?.compType === "module";
  }

  private async loadData() {
    const { baseUrl, appDsl, moduleDslMap, webUrl } = this.options;

    let finalAppDsl = appDsl;
    let finalModuleDslMap = moduleDslMap;

    setGlobalSettings({
      isViewMode: true,
      applicationId: this.appId,
    });

    if (!appDsl) {
      const http = axios.create({ baseURL: baseUrl, withCredentials: true });
      const data: ApplicationResp = await http
        .get(`/api/v1/applications/${this.appId}/view`)
        .then((i) => i.data)
        .catch((e) => {
          if (e.response?.status === API_STATUS_CODES.REQUEST_NOT_AUTHORISED) {
            window.location.href = `${webUrl}${AUTH_LOGIN_URL}?${
              AuthSearchParams.redirectUrl
            }=${encodeURIComponent(window.location.href)}`;
          }
        });

      setGlobalSettings({
        orgCommonSettings: data.data.orgCommonSettings,
      });

      finalAppDsl = data.data.applicationDSL;
      finalModuleDslMap = data.data.moduleDSL;
    }

    if (this.options.moduleInputs && this.isModuleDSL(finalAppDsl)) {
      const inputsPath = "ui.comp.io.inputs";
      const nextInputs = _.get(finalAppDsl, inputsPath, []).map((i: ModuleDSLIoInput) => {
        const inputValue = this.options.moduleInputs[i.name];
        if (inputValue) {
          return {
            ...i,
            defaultValue: {
              ...i.defaultValue,
              comp: inputValue,
            },
          };
        }
        return i;
      });
      _.set(finalAppDsl, inputsPath, nextInputs);
    }

    return {
      appDsl: finalAppDsl,
      moduleDslMap: finalModuleDslMap,
    };
  }

  private handleCompChange(comp: RootComp | null) {
    this.comp = comp;

    if (!comp) {
      return;
    }

    const moduleLayout = comp.children.ui.getModuleLayoutComp();
    if (moduleLayout) {
      const outputs = moduleLayout.children.io.children.outputs.getView();
      const outputValue = Object.fromEntries(
        outputs.map((i) => {
          const { name, value } = i.getView();
          return [name, value];
        })
      );
      if (!_.isEqual(this.prevOutputs, outputValue)) {
        this.prevOutputs = outputValue;
        this.emit("moduleOutputChange", [outputValue]);
      }
    }
  }

  private async render() {
    const data = await this.dataPromise;
    ReactDOM.render(
      <StyleSheetManager target={this.node as HTMLElement}>
        <AppView
          appId={this.appId}
          dsl={data.appDsl}
          moduleDsl={data.moduleDslMap}
          moduleInputs={this.options.moduleInputs}
          onCompChange={(comp) => this.handleCompChange(comp)}
          onModuleEventTriggered={(eventName) => this.emit("moduleEventTriggered", [eventName])}
        />
      </StyleSheetManager>,
      this.node
    );
  }

  private emit<K extends keyof EventHandlerMap>(event: K, args: any[]) {
    const handler = this.events.get(event);
    if (handler) {
      (handler as Function).apply(this, args);
    }
  }

  on<K extends keyof EventHandlerMap<O>>(event: K, handler?: EventHandlerMap<O>[K]): Off {
    if (!handler) {
      return () => {};
    }
    this.events.set(event, handler);
    return () => this.events.delete(event);
  }

  setModuleInputs(inputs: I) {
    this.options.moduleInputs = inputs;
    this.render();
  }

  invokeMethod(methodName: string, params: any[] = []) {
    if (!this.comp) {
      return;
    }
    const moduleLayout = this.comp.children.ui.getModuleLayoutComp();
    if (moduleLayout) {
      moduleLayout.children.methods.executeMethodByName(methodName, params);
    }
  }
}
