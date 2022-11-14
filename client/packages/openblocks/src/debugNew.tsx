import { ModuleComp } from "comps/comps/moduleComp/moduleComp";
import { useCompInstance } from "comps/utils/useCompInstance";

// const Comp = RootComp;
// const Comp = ViewComp;
// const dsl = Data;
const Comp = ModuleComp;
const appId = "62cbdabe16718a687626b631";
export default function View() {
  const [comp] = useCompInstance({
    Comp: Comp,
    initialValue: { appId },
  });
  if (!comp) {
    return <>Undefined</>;
  }
  return (
    <>
      <div>{comp.getView()}</div>
      {/* <div>{comp.getView()}</div>
      <div>{comp.getPropertyView()}</div> */}
      {/* <EditorContext.Provider value={editorState}>
        <div>{comp.children.ui.getView()}</div>
      </EditorContext.Provider> */}
    </>
  );
}
