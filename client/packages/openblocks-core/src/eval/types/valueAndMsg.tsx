import { toReadableString } from "util/stringUtils";

export type ValueExtra = {
  segments?: { value: string; success: boolean }[];
};

export class ValueAndMsg<T> {
  value: T;
  msg?: string;
  extra?: ValueExtra;
  midValue?: any; // a middle value after eval and before transform

  constructor(value: T, msg?: string, extra?: ValueExtra, midValue?: any) {
    this.value = value;
    this.msg = msg;
    this.extra = extra;
    this.midValue = midValue;
  }

  hasError(): boolean {
    return this.msg !== undefined;
  }

  getMsg(displayValueFn: (value: T) => string = toReadableString): string {
    return (this.hasError() ? this.msg : displayValueFn(this.value)) ?? "";
  }
}
