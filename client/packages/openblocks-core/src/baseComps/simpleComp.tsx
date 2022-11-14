import { JSONValue } from "util/jsonTypes";
import { fromValue, Node } from "eval";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { CompAction, CompActionTypes } from "actions";
import { AbstractComp, CompParams } from "./comp";

/**
 * maintainer a JSONValue, nothing else
 */
export abstract class SimpleAbstractComp<ViewReturn extends JSONValue> extends AbstractComp<
  any,
  ViewReturn,
  Node<ViewReturn>
> {
  value: ViewReturn;
  constructor(params: CompParams<ViewReturn>) {
    super(params);
    this.value = this.oldValueToNew(params.value) ?? this.getDefaultValue();
  }

  protected abstract getDefaultValue(): ViewReturn;

  /**
   * may override this to implement compatibility
   */
  protected oldValueToNew(value?: ViewReturn): ViewReturn | undefined {
    return value;
  }

  override reduce(action: CompAction): this {
    if (action.type === CompActionTypes.CHANGE_VALUE) {
      if (this.value === action.value) {
        return this;
      }
      return setFieldsNoTypeCheck(this, { value: action.value });
    }
    return this;
  }

  override nodeWithoutCache() {
    return fromValue(this.value);
  }

  exposingNode() {
    return this.node();
  }

  // may be used in defaultValue
  override toJsonValue(): ViewReturn {
    return this.value;
  }
}

export abstract class SimpleComp<
  ViewReturn extends JSONValue
> extends SimpleAbstractComp<ViewReturn> {
  override getView(): ViewReturn {
    return this.value;
  }
}
