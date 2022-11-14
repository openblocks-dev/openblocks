import { CodeEditorProps } from "./codeEditorTypes";
import { useCompletionSources } from "./extensions";
import { createRenderer } from "react-test-renderer/shallow";
import { CompletionSource } from "@codemirror/autocomplete";

describe("useCompletionSources", () => {
  let ret: CompletionSource[] = [];
  const TestComp = (props: CodeEditorProps) => {
    ret = useCompletionSources(props);
    return <></>;
  };
  const view = createRenderer();
  function getCompletionSources(props: CodeEditorProps) {
    view.render(<TestComp {...props} />);
    return ret;
  }
  test("javascript", () => {
    const ret1 = getCompletionSources({});
    const ret2 = getCompletionSources({});
    expect(ret1.length).toEqual(ret2.length);
    for (let i = 0; i < ret1.length; i++) {
      expect(ret1[i]).toBe(ret2[i]);
    }
  });
  test("sql", () => {
    const ret1 = getCompletionSources({ language: "sql" });
    const ret2 = getCompletionSources({ language: "sql" });
    expect(ret1.length).toEqual(ret2.length);
    for (let i = 0; i < ret1.length; i++) {
      expect(ret1[i]).toBe(ret2[i]);
    }
  });
});
