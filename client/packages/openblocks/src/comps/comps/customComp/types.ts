export enum EventTypeEnum {
  Invoke = "invoke",
  Data = "data",
  Init = "init",
}

export enum MethodNameEnum {
  RunQuery = "runQuery",
  GetModel = "getModel",
  UpdateModel = "updateModel",
}

export interface InvokePayload {
  id: string;
  method: MethodNameEnum;
  data: any;
}

export interface InvokeEventData {
  type: EventTypeEnum.Invoke;
  hostId: string;
  payload: InvokePayload;
}

export type EventData = InvokeEventData;
