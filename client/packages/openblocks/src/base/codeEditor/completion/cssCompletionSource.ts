import { CompletionContext } from "@codemirror/autocomplete";
import { cssCompletionSource } from "@codemirror/lang-css";
import { CompletionSource } from "./completion";

export class CssCompletionSource extends CompletionSource {
  override completionSource(context: CompletionContext) {
    return cssCompletionSource(context);
  }
}
