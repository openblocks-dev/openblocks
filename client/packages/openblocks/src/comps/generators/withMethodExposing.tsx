import { CompAction, CustomAction, isMyCustomAction } from "openblocks-core";
import { AbstractComp, Comp, ConstructorToComp, MultiBaseComp } from "openblocks-core";
import {
  EvalParamType,
  ExecuteAction,
  MethodConfig,
} from "comps/controls/actionSelector/executeCompTypes";
import { handlePromiseAfterResult } from "util/promiseUtils";
import { RefControl } from "../controls/refControl";
import { trans } from "i18n";

export type ExposeMethodCompConstructor<T> = new (...args: any[]) => T;

export type MethodConfigInfo<T> = {
  method: MethodConfig;
  execute: (comp: ConstructorToComp<T>, params: EvalParamType[]) => any;
};

export function withMethodExposingBase<T extends ExposeMethodCompConstructor<AbstractComp>>(
  VariantComp: T,
  methodConfigs: MethodConfigInfo<T>[] | ((comp: ConstructorToComp<T>) => MethodConfigInfo<T>[])
) {
  // @ts-ignore
  return class extends VariantComp {
    IS_ExposingMethodComp = true;

    getMethodConfigInfo(): MethodConfigInfo<T>[] {
      if (typeof methodConfigs === "function") {
        return methodConfigs(this as ConstructorToComp<T>);
      }
      return methodConfigs;
    }

    getMethodConfig(): MethodConfig[] {
      return this.getMethodConfigInfo().map((m) => m.method);
    }

    executeMethod(action: CustomAction<ExecuteAction>) {
      const methodName = action.value.methodName;
      const method = this.getMethodConfigInfo().find((m) => m.method.name === methodName);
      if (!method) {
        return false;
      }
      handlePromiseAfterResult(
        action,
        method.execute(this as ConstructorToComp<T>, action.value.params)
      );
      return true;
    }
  };
}

export type MethodConfigsType<T> =
  | MethodConfigInfo<T>[]
  | ((comp: ConstructorToComp<T>) => MethodConfigInfo<T>[]);

export function withMethodExposing<T extends ExposeMethodCompConstructor<MultiBaseComp>>(
  VariantComp: T,
  methodConfigs: MethodConfigsType<T>
) {
  const Temp = withMethodExposingBase(VariantComp, methodConfigs);
  // @ts-ignore
  return class extends Temp {
    override reduce(action: CompAction): this {
      // execute comp method
      if (isMyCustomAction<ExecuteAction>(action, "execute")) {
        if (!this.executeMethod(action)) {
          // method exposed by children
          Object.values(this.children).forEach(
            (child) => isExposingMethodComp(child) && child.executeMethod(action)
          );
        }
        return this;
      }
      return super.reduce(action);
    }
  } as typeof Temp;
}

export type ExposingMethodType = ReturnType<typeof withMethodExposingBase>;
export type ExposingMethodComp = InstanceType<ExposingMethodType>;

export function isExposingMethodComp(comp: Comp | ExposingMethodComp): comp is ExposingMethodComp {
  return comp && (comp as any)["IS_ExposingMethodComp"];
}

export const MethodConfigFocus = [
  {
    method: {
      name: "focus",
      description: trans("focus"),
      params: [],
    },
    execute: (comp: { children: { viewRef: RefControl } }) => {
      comp.children.viewRef.viewRef?.focus();
    },
  },
];
