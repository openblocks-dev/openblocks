import { message } from "antd";
import { DocLink } from "openblocks-design";
import { fromRecord, wrapActionExtraInfo } from "openblocks-core";
import { codeControl, TransformerCodeControl } from "comps/controls/codeControl";
import { EditorContext, EditorState } from "comps/editorState";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { list } from "comps/generators/list";
import { withExposingRaw } from "comps/generators/withExposing";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { BottomTabs } from "pages/editor/bottom/BottomTabs";
import { ReactNode } from "react";
import {
  BottomResComp,
  BottomResCompResult,
  BottomResListComp,
  BottomResTypeEnum,
} from "types/bottomRes";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { QueryTutorials } from "util/tutorialUtils";
import { SimpleNameComp } from "./simpleNameComp";
import { trans } from "i18n";
import { undoKey } from "util/keyUtils";

const TransformerItemCompBase = new MultiCompBuilder(
  {
    name: SimpleNameComp,
    order: valueComp<number>(0),
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

  order(): number {
    return this.children.order.getView();
  }

  type(): BottomResTypeEnum {
    return BottomResTypeEnum.Transformer;
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

const TransformerListCompBase = list(TransformerItemComp);

export class TransformerListComp extends TransformerListCompBase implements BottomResListComp {
  nameAndExposingInfo(): NameAndExposingInfo {
    const result: NameAndExposingInfo = {};
    Object.values(this.children).forEach((comp) => {
      result[comp.children.name.getView()] = comp.exposingInfo();
    });
    return result;
  }

  items() {
    return this.getView() as unknown as BottomResComp[];
  }

  add(editorState: EditorState) {
    const name = editorState.getNameGenerator().genItemName("transformer");
    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          name,
          script: "return currentUser.name",
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: "transformer",
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(name, BottomResTypeEnum.Transformer);
  }

  copy(editorState: EditorState, name: string) {
    const comps = this.getView();
    const index = comps.findIndex((i) => i.children.name.getView() === name);
    const origin = comps[index];
    if (!origin) {
      return;
    }
    const newCompName = editorState.getNameGenerator().genItemName("transformer");
    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          ...origin.toJsonValue(),
          name: newCompName,
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: "transformer",
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(name, BottomResTypeEnum.Transformer);
  }

  delete(name: string) {
    const comps = this.getView();
    const index = comps.findIndex((i) => i.children.name.getView() === name);
    const toDelComp = comps[index];
    if (!toDelComp) {
      return;
    }
    this.dispatch(
      wrapActionExtraInfo(this.deleteAction(index), [
        {
          type: "delete",
          compName: toDelComp.children.name.getView(),
          compType: "transformer",
        },
      ])
    );
    message.success(trans("transformer.deleteMessage", { undoKey }));
  }
}
