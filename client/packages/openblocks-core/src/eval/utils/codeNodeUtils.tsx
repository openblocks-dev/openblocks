import { ValueAndMsg } from "../types/valueAndMsg";
import { getErrorMessage } from "./nodeUtils";

export function transformWrapper<T>(transformFn: (value: unknown) => T, defaultValue?: T) {
  function transformWithMsg(valueAndMsg: ValueAndMsg<unknown>): ValueAndMsg<T> {
    let result;
    try {
      const value = transformFn(valueAndMsg.value);
      result = new ValueAndMsg<T>(value, valueAndMsg.msg, valueAndMsg.extra, valueAndMsg.value);
    } catch (err) {
      let value;
      try {
        value = defaultValue ?? transformFn("");
      } catch (err2) {
        value = undefined as any;
      }
      const errorMsg = valueAndMsg.msg ?? getErrorMessage(err);
      result = new ValueAndMsg<T>(value, errorMsg, valueAndMsg.extra, valueAndMsg.value);
    }
    // log.trace(
    //   "transformWithMsg. func: ",
    //   transformFn.name,
    //   "\nsource: ",
    //   valueAndMsg,
    //   "\nresult: ",
    //   result
    // );
    return result;
  }
  return transformWithMsg;
}
