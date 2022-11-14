import { withMethodExposing } from "../generators/withMethodExposing";
import { isEmpty } from "lodash";
import { simpleMultiComp, stateComp, withViewFn } from "../generators";
import { NameConfig, withExposingConfigs } from "../generators/withExposing";
import { JSONObject } from "../../util/jsonTypes";
import { useEffect } from "react";
import isEqual from "fast-deep-equal";
import { trans } from "i18n";
import log from "loglevel";

const APP_STORE_NAMESPACE = "TACO_APP_LOCAL_STORE";

const LocalStorageCompBase = withViewFn(
  simpleMultiComp({ values: stateComp<JSONObject>({}) }),
  (comp) => {
    const originStore = localStorage.getItem(APP_STORE_NAMESPACE) || "{}";
    let parseStore = {};
    try {
      parseStore = JSON.parse(originStore);
    } catch (e) {
      log.error("application local storage invalid");
    }

    useEffect(() => {
      const value = comp.children.values.value;
      if (!isEqual(value, parseStore)) {
        log.info(value, parseStore);
        comp.children.values.dispatchChangeValueAction(parseStore);
      }
    }, [parseStore]);

    return null;
  }
);

export let LocalStorageComp = withExposingConfigs(LocalStorageCompBase, [
  new NameConfig("values", trans("localStorageComp.valueDesc")),
]);

LocalStorageComp = withMethodExposing(LocalStorageComp, [
  {
    method: {
      name: "setItem",
      description: trans("localStorageComp.setItemDesc"),
      params: [
        { name: "key", type: "string" },
        { name: "value", type: "JSONValue" },
      ],
    },
    execute: (comp, params) => {
      const key = params?.[0];
      const value = params?.[1];

      if (typeof key === "string" && !isEmpty(key)) {
        try {
          const originStore = localStorage.getItem(APP_STORE_NAMESPACE) || "{}";
          if (originStore.length > 1024 * 1024) {
            return; // Limit up to 1m
          }

          const parseStore = JSON.parse(originStore);
          parseStore[key] = value;
          localStorage.setItem(APP_STORE_NAMESPACE, JSON.stringify(parseStore));
        } catch (e) {
          localStorage.setItem(APP_STORE_NAMESPACE, "{}");
        }
      }
    },
  },
  {
    method: {
      name: "removeItem",
      description: trans("localStorageComp.removeItemDesc"),
      params: [{ name: "key", type: "string" }],
    },
    execute: (comp, params) => {
      const key = params?.[0];
      if (typeof key === "string" && !isEmpty(key)) {
        try {
          const originStore = localStorage.getItem(APP_STORE_NAMESPACE) || "{}";
          const parseStore = JSON.parse(originStore);
          delete parseStore[key];
          localStorage.setItem(APP_STORE_NAMESPACE, JSON.stringify(parseStore));
        } catch (e) {
          localStorage.setItem(APP_STORE_NAMESPACE, "{}");
        }
      }
    },
  },
  {
    method: {
      name: "clear",
      description: trans("localStorageComp.clearItemDesc"),
      params: [],
    },
    execute: () => {
      localStorage.removeItem(APP_STORE_NAMESPACE);
    },
  },
]);
