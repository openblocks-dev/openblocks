import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { codeControl, TransformerCodeControl } from "comps/controls/codeControl";
import { EditorContext } from "comps/editorState";
import { MultiCompBuilder } from "comps/generators";
import { bottomResListComp } from "comps/generators/bottomResList";
import { withExposingRaw } from "comps/generators/withExposing";
import { trans } from "i18n";
import { fromRecord } from "openblocks-core";
import { DocLink } from "openblocks-design";
import { BottomTabs } from "pages/editor/bottom/BottomTabs";
import { ReactNode } from "react";
import { BottomResComp, BottomResCompResult, BottomResTypeEnum } from "types/bottomRes";
import { QueryTutorials } from "util/tutorialUtils";
import { SimpleNameComp } from "./simpleNameComp";

const TransformerItemCompBase = new MultiCompBuilder(
  {
    name: SimpleNameComp,
    script: TransformerCodeControl,
  },
  (props) => props
)
  .setPropertyViewFn((children) => {
    return (
      <EditorContext.Consumer>
        {(editorState) => {
          return (
            <BottomTabs
              runButtonText={trans("transformer.preview")}
              type={BottomResTypeEnum.Transformer}
              tabsConfig={[
                {
                  key: "general",
                  title: trans("query.generalTab"),
                  children: (
                    <div>
                      {children.script.propertyView({
                        placement: "bottom",
                        styleName: "medium",
                        width: "100%",
                      })}
                      {QueryTutorials.transformer && (
                        <DocLink style={{ marginTop: 8 }} href={QueryTutorials.transformer}>
                          {trans("transformer.docLink")}
                        </DocLink>
                      )}
                    </div>
                  ),
                },
              ]}
              tabTitle={children.name.getView()}
              onRunBtnClick={() => {
                editorState.setShowResultCompName(children.name.getView());
              }}
            />
          );
        }}
      </EditorContext.Consumer>
    );
  })
  .build();

class TransformerAsBottomRes extends TransformerItemCompBase implements BottomResComp {
  result(): BottomResCompResult | null {
    const scriptCtrl = this.children.script as InstanceType<ReturnType<typeof codeControl>>;
    const valueAndMsg = scriptCtrl.getValueAndMsg();
    const name = this.name();
    const success = !valueAndMsg.hasError();
    return {
      success: success,
      title: `${name} ${
        success ? trans("transformer.previewSuccess") : trans("transformer.previewFail")
      }`,
      dataType: typeof valueAndMsg.value === "function" ? "function" : "json",
      errorMessage: valueAndMsg.msg,
      data: valueAndMsg.value,
    };
  }

  type(): BottomResTypeEnum {
    return BottomResTypeEnum.Transformer;
  }

  id(): string {
    return this.name();
  }

  name(): string {
    return this.children.name.getView();
  }

  icon(): ReactNode {
    return getBottomResIcon(BottomResTypeEnum.Transformer);
  }
}

const TransformerItemComp = withExposingRaw(
  TransformerAsBottomRes,
  {
    value: trans("value"),
    code: trans("code"),
  },
  (comp) => {
    return fromRecord({
      value: comp.children.script.exposingNode(),
    });
  }
);

export const TransformerListComp = bottomResListComp(
  TransformerItemComp,
  BottomResTypeEnum.Transformer,
  {
    script: "return currentUser.name",
  }
);
