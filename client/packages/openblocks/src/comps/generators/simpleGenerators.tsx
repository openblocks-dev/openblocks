import { ControlParams } from "comps/controls/controlParams";
import { getReduceContext } from "comps/utils/reduceContext";
import {
  changeValueAction,
  ChangeValueAction,
  Comp,
  CompAction,
  CompConstructor,
  CompParams,
  ConstructorToDataType,
  SimpleComp,
} from "openblocks-core";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { ReactNode } from "react";
import { JSONValue } from "util/jsonTypes";

export function propertyOnlyComp<ViewReturn extends JSONValue>(
  propertyViewFn: (value: JSONValue, dispatch: (action: CompAction) => void) => ReactNode,
  defaultValue: ViewReturn
) {
  class PropertyOnlyComp extends SimpleComp<ViewReturn> {
    override getDefaultValue() {
      return defaultValue;
    }
    override getPropertyView() {
      return propertyViewFn(this.value, this.dispatch);
    }
    propertyView(params: ControlParams) {
      return (
        <ControlPropertyViewWrapper {...params}>
          {this.getPropertyView()}
        </ControlPropertyViewWrapper>
      );
    }
  }
  return PropertyOnlyComp;
}

/**
 * A comp that doesn't even have propertyView, a pure data provider
 **/
export function valueComp<ViewReturn extends JSONValue>(defaultValue: ViewReturn) {
  return propertyOnlyComp(() => <></>, defaultValue);
}

/**
 * stateComp is the same as valueComp, the only difference is that the data is not persisted.
 * The name comes from the two states of react props and state, where state is the state of the component itself and is not persisted by the outside world.
 */
export function stateComp<ViewReturn extends JSONValue>(defaultValue: ViewReturn) {
  const VariantComp = valueComp<ViewReturn>(defaultValue);
  class StateComp extends VariantComp {
    /**
     * Do not persist the label, there will be a comp of this field in multiComp.toJsonValue
     */
    readonly NO_PERSISTENCE = true;
    override toJsonValue() {
      return defaultValue;
    }
    override reduce(action: CompAction): this {
      const reduceContext = getReduceContext();
      if (reduceContext.disableUpdateState) {
        return this;
      }
      return super.reduce(action);
    }
    override changeValueAction(value: ViewReturn): ChangeValueAction {
      return changeValueAction(value, false);
    }
  }
  return StateComp;
}

// return an instance of Comp, pure data
export function valueInstance<T extends JSONValue>(defaultValue: T) {
  const ValueComp = valueComp<T>(defaultValue);
  return new ValueComp({});
}

export function stateInstance<T extends JSONValue>(defaultValue: T) {
  const StateComp = stateComp<T>(defaultValue);
  return new StateComp({});
}

/**
 * Used to identify the comp type and default value, which can be initialized
 */
export function withDefault<T extends CompConstructor>(
  VariantComp: T,
  defaultValue: ConstructorToDataType<T>
): T {
  // https://stackoverflow.com/questions/64396668/why-do-typescript-mixins-require-a-constructor-with-a-single-rest-parameter-any
  // It's an anti-pattern for mixins to override constructors, but that's it for now
  // XXX(lijiaqi): As long as the parameter form is not changed, it is not an anti-pattern, right?
  class TEMP_CLASS extends (VariantComp as any) {
    constructor(params: CompParams) {
      const newParams = { value: defaultValue, ...params };
      super(newParams);
    }
    readonly IGNORABLE_DEFAULT_VALUE = undefined;
  }
  return TEMP_CLASS as unknown as T;
}

/**
 * Modify the view method, can use react hooks
 */
export function withViewFn<T extends new (...args: any) => Comp<ReactNode>>(
  VariantComp: T,
  viewFn: (comp: InstanceType<T>) => ReactNode
) {
  function View(props: { comp: InstanceType<T> }) {
    return <>{viewFn(props.comp)}</>;
  }
  const WithViewFnComp = class extends VariantComp {
    override getView() {
      return <View comp={this as InstanceType<T>} />;
    }
  };
  return WithViewFnComp;
}

export function withPropertyViewFn<T extends new (...args: any) => Comp>(
  VariantComp: T,
  propertyViewFn: (comp: InstanceType<T>) => ReactNode
) {
  function View(props: { comp: InstanceType<T> }) {
    return <>{propertyViewFn(props.comp)}</>;
  }

  return class extends VariantComp {
    override getPropertyView() {
      return <View comp={this as InstanceType<T>} />;
    }
  };
}

/**
 * Compatible with historical data
 */
export function migrateOldData<T extends new (...args: any) => Comp>(
  VariantComp: T,
  dataTransformer: (oldData: JSONValue) => ConstructorToDataType<T>
): T {
  return class extends VariantComp {
    constructor(...params: any) {
      const newParams = [...params];
      newParams[0] = {
        ...params[0],
        value: dataTransformer(params[0]["value"]),
      };
      super(...newParams);
    }
  };
}
