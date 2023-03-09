import React from "react";

export type OutputChangeHandler<O> = (output: O) => void;

export type EventTriggerHandler = (eventName: string) => void;

type Off = () => void;

interface EventHandlerMap<O = any> {
  moduleOutputChange: OutputChangeHandler<O>;
  moduleEventTriggered: EventTriggerHandler;
}

export interface AppViewInstanceOptions<I = any> {
  moduleInputs?: I;
  appDsl?: any;
  moduleDslMap?: any;
  baseUrl?: string;
}

export interface OpenblocksAppViewProps<I, O> extends AppViewInstanceOptions<I> {
  appId: string;
  className?: string;
  onModuleOutputChange?: OutputChangeHandler<O>;
  onModuleEventTriggered?: EventTriggerHandler;
}

export interface AppViewInstance<I, O> {
  on<K extends keyof EventHandlerMap<O>>(event: K, handler?: EventHandlerMap<O>[K]): Off;
  setModuleInputs(inputs: I): void;
  invokeMethod(methodName: string, params?: any[]): void;
}

export declare const OpenblocksAppView: React.ForwardRefExoticComponent<
  OpenblocksAppViewProps<unknown, unknown> &
    React.RefAttributes<AppViewInstance<unknown, unknown> | undefined>
>;

export declare function bootstrapAppAt<I = any, O = any>(
  appId: string,
  node: Element | null,
  options: AppViewInstanceOptions<I>
): Promise<AppViewInstance<I, O>>;
