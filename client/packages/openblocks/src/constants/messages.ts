import { trans } from "i18n";

export function createMessage(format: (...strArgs: any[]) => string, ...args: any[]) {
  return format(...args);
}

export const WindowMessageTypes = {
  THIRD_PARTY_BIND: "THIRD_PARTY_BIND",
};

export const ERROR_500 = () => trans("networkMessage.500");
export const ERROR_0 = () => trans("networkMessage.0");
export const ERROR_401 = () => trans("networkMessage.401");
export const ERROR_403 = () => trans("networkMessage.403");
export const SERVER_API_TIMEOUT_ERROR = () => trans("networkMessage.timeout");
