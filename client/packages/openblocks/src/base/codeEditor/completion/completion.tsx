import { CompletionContext, CompletionResult } from "../codeMirror";

export abstract class CompletionSource {
  protected isFunction?: boolean;
  constructor() {
    this.completionSource = this.completionSource.bind(this);
  }
  setIsFunction(isFunction?: boolean) {
    this.isFunction = isFunction;
  }
  abstract completionSource(
    context: CompletionContext
  ): CompletionResult | Promise<CompletionResult | null> | null;
}
