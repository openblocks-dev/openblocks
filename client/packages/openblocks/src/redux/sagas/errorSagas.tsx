import { call } from "redux-saga/effects";

/**
 * making with error message with action name
 *
 * @param action
 */
export const getDefaultActionError = (action: string) => `Incurred an error when ${action}`;

export function* callAPI(apiCall: any, requestPayload: any): any {
  try {
    return yield call(apiCall, requestPayload);
  } catch (error) {
    return yield error;
  }
}
