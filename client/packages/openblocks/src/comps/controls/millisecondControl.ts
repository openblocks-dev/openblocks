import { trans } from "i18n";
import { isEmpty } from "lodash";
import { codeControl } from "./codeControl";

const defaultToMilliseconds = (value: number, left: number, right: number, unit: "ms" | "s") => {
  if (value <= left) {
    return unit === "s" ? left * 1000 : left;
  } else if (value > right) {
    return unit === "s" ? right * 1000 : right;
  } else {
    return unit === "s" ? value * 1000 : value;
  }
};

export interface MillisecondsControlProps {
  left?: number; // minimum value, unit related to unit prop
  right?: number; // maximum value, unit related to unit prop
  defaultValue?: number; // default value, unit related to unit prop
  unit?: "ms" | "s"; // Specifies the default unit for the input box
  toMilliseconds?: (value: number, left: number, right: number, unit: "ms" | "s") => number;
}

// A millisecond input box with left open and right closed
export const millisecondsControl = (props: MillisecondsControlProps) => {
  const {
    left = 0,
    right = Number.MAX_VALUE,
    defaultValue,
    unit = "ms",
    toMilliseconds = defaultToMilliseconds,
  } = props;

  return codeControl(
    (value) => {
      if (typeof value === "number") {
        return toMilliseconds(value, left, right, unit);
      }

      if (typeof value === "string") {
        const str = value.trim().toLowerCase();

        if (str === "") {
          return defaultValue !== undefined ? toMilliseconds(defaultValue, left, right, unit) : 0; // No input, no error
        }

        const strInNum = Number(str);
        if (!isNaN(strInNum)) {
          return toMilliseconds(strInNum, left, right, unit);
        }

        if (/^(\d+\.?\d*)(s|ms)$/gim.test(str)) {
          const leftInMillis = unit === "s" ? left * 1000 : left;
          const rightInMillis = unit === "s" ? right * 1000 : right;
          const num: number = Number(str.match("^(\\d+\\.?\\d*)")?.[0]);
          if (str.includes("ms")) {
            return toMilliseconds(num, leftInMillis, rightInMillis, "ms");
          } else if (str.includes("s")) {
            return toMilliseconds(num * 1000, leftInMillis, rightInMillis, "ms");
            // } else if (str.includes("m")) {
            //   return num * 60 * 1000;
            // } else if (str.includes("h")) {
            //   return num * 60 * 60 * 1000;
          }
        }
      }

      if (defaultValue === undefined) {
        throw new TypeError(trans("millisecondsControl.timeoutTypeError", { value: value as any }));
      }
      return toMilliseconds(defaultValue, left, right, unit);
    },
    {
      defaultValue: defaultValue,
      displayValueFn: (value: number) => {
        if (value === null || value === undefined) {
          return "";
        }
        // const h = Math.floor(value / (60 * 60 * 1000));
        // const m = Math.floor((value % (60 * 60 * 1000)) / (60 * 1000));
        // const s = Math.floor(((value % (60 * 60 * 1000)) % (60 * 1000)) / 1000);
        // const ms = Math.floor(((value % (60 * 60 * 1000)) % (60 * 1000)) % 1000);
        const s = Math.floor(value / 1000);
        const ms = Math.floor(value % 1000);
        let result = "";
        // h > 0 && (result += ` ${h}h`);
        // m > 0 && (result += ` ${m}m`);
        s > 0 && (result += ` ${s}s`);
        ms > 0 && (result += ` ${ms}ms`);
        isEmpty(result) && (result += ` ${value}ms`);
        result = result.trim();
        return result;
      },
    }
  );
};
