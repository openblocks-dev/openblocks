import { ReactNode } from "react";
import { CompAction } from "openblocks-core";
import { AbstractComp, CompParams } from "openblocks-core";

// empty object
type EmptyDataType = {};

/**
 * A comp that does nothing. If there are other scenarios needed, put it in the basecomp package
 */
abstract class DoNothingComp<ViewReturn> extends AbstractComp<
  ViewReturn,
  EmptyDataType,
  undefined
> {
  constructor(params: CompParams<EmptyDataType>) {
    super(params);
  }

  override reduce(action: CompAction): this {
    return this;
  }

  getPropertyView(): ReactNode {
    throw new Error("Method not implemented.");
  }

  override nodeWithoutCache() {
    return undefined;
  }

  /**
   * Do not persist the label, there will be a comp of this field in multiComp.toJsonValue
   */
  readonly NO_PERSISTENCE = true;

  override toJsonValue() {
    return {};
  }
}

/**
 * Only one ref is stored, and the internal ref is mutable.
 */
export class RefControl<T> extends DoNothingComp<any> {
  viewRef: T | null = null;

  constructor(params: CompParams<EmptyDataType>) {
    super(params);
    this.setViewRef = this.setViewRef.bind(this);
  }

  private setViewRef(viewRef: T | null) {
    this.viewRef = viewRef;
  }

  getView() {
    return this.setViewRef;
  }
}
