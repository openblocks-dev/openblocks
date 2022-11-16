import { MultiCompBuilder } from "comps/generators/multi";
import { trans } from "i18n";
import { BranchDiv } from "openblocks-design";
import { FunctionControl } from "../codeControl";

const RunScriptTmpAction = (function () {
  const childrenMap = {
    script: FunctionControl,
  };
  return new MultiCompBuilder(childrenMap, () => {
    return () => Promise.resolve(undefined as unknown);
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

export class RunScriptAction extends RunScriptTmpAction {
  override getView() {
    const f = this.children.script.getView();
    return () => Promise.resolve(f());
  }

  propertyView() {
    return (
      <BranchDiv>
        {this.children.script.propertyView({
          placeholder: "// " + trans("eventHandler.runScriptPlaceHolder"),
          layout: "vertical",
          styleName: "medium",
          showLineNum: false,
        })}
      </BranchDiv>
    );
  }
}
