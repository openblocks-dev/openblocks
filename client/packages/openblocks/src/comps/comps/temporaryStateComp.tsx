import { message } from "antd";
import { JSONObject } from "util/jsonTypes";
import { DocLink } from "openblocks-design";
import { wrapActionExtraInfo } from "openblocks-core";
import { jsonValueStateControl } from "comps/controls/codeStateControl";
import { EditorState } from "comps/editorState";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { list } from "comps/generators/list";
import { NameConfig, withExposingConfigs } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import _ from "lodash";
import { BottomTabs } from "pages/editor/bottom/BottomTabs";
import { ReactNode } from "react";
import {
  BottomResComp,
  BottomResCompResult,
  BottomResListComp,
  BottomResTypeEnum,
} from "types/bottomRes";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { SimpleNameComp } from "./simpleNameComp";
import { trans } from "i18n";
import { undoKey } from "util/keyUtils";
import { QueryTutorials } from "util/tutorialUtils";

const TemporaryStateItemCompBase = new MultiCompBuilder(
  {
    name: SimpleNameComp,
    order: valueComp<number>(0),
    value: jsonValueStateControl(null),
  },
  () => null
)
  .setPropertyViewFn((children) => {
    return (
      <BottomTabs
        type={BottomResTypeEnum.TempState}
        tabsConfig={[
          {
            key: "general",
            title: trans("query.generalTab"),
            children: children.value.propertyView({
              label: trans("temporaryState.value"),
              tooltip: trans("temporaryState.valueTooltip"),
              placement: "bottom",
              extraChildren: QueryTutorials.tempState && (
                <DocLink style={{ marginTop: 8 }} href={QueryTutorials.tempState}>
                  {trans("temporaryState.docLink")}
                </DocLink>
              ),
            }),
          },
        ]}
        tabTitle={children.name.getView()}
        status=""
      />
    );
  })
  .build();

class TemporaryStateAsBottomRes extends TemporaryStateItemCompBase implements BottomResComp {
  result(): BottomResCompResult | null {
    return null;
  }
  type(): BottomResTypeEnum {
    return BottomResTypeEnum.TempState;
  }
  name(): string {
    return this.children.name.getView();
  }
  icon(): ReactNode {
    return getBottomResIcon(BottomResTypeEnum.TempState);
  }
  order(): number {
    return this.children.order.getView();
  }
}

const TemporaryStateItemCompWithMethodExpose = withMethodExposing(TemporaryStateAsBottomRes, [
  {
    method: {
      name: "setValue",
      params: [
        {
          name: "value",
          type: "JSONValue",
        },
      ],
      description: "",
    },
    execute: async (comp, params) => {
      comp.children.value.change(params?.[0]);
    },
  },
  {
    method: {
      name: "setIn",
      params: [
        {
          name: "path",
          type: "arrayNumberString",
        },
        {
          name: "value",
          type: "JSONValue",
        },
      ],
      description: "",
    },
    execute: async (comp, params) => {
      const { value: prev, onChange } = comp.children.value.getView();
      const [path, value] = params;
      if (
        !Array.isArray(path) ||
        !path.every((i) => typeof i === "string" || typeof i === "number")
      ) {
        throw new Error(trans("temporaryState.pathTypeError"));
      }
      if (!_.isPlainObject(prev) && !Array.isArray(prev)) {
        throw new Error(
          trans("temporaryState.unStructuredError", {
            path: JSON.stringify(path),
            prev: JSON.stringify(prev),
          })
        );
      }
      const nextValue = _.set(_.cloneDeep(prev as JSONObject), path as (string | number)[], value);
      onChange(nextValue);
    },
  },
]);

export const TemporaryStateItemComp = withExposingConfigs(TemporaryStateItemCompWithMethodExpose, [
  new NameConfig("value", trans("temporaryState.valueDesc")),
]);

const TemporaryStateListCompBase = list(TemporaryStateItemComp);

export class TemporaryStateListComp
  extends TemporaryStateListCompBase
  implements BottomResListComp
{
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
    const name = editorState.getNameGenerator().genItemName("state");
    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          value: "null",
          name,
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: "tempState",
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(name, BottomResTypeEnum.TempState);
  }

  copy(editorState: EditorState, name: string) {
    const stateComps = this.getView();
    const index = stateComps.findIndex((i) => i.children.name.getView() === name);
    const originState = stateComps[index];
    if (!originState) {
      return;
    }
    const newStateName = editorState.getNameGenerator().genItemName("state");
    this.dispatch(
      wrapActionExtraInfo(
        this.pushAction({
          ...originState.toJsonValue(),
          name: newStateName,
          order: Date.now(),
        }),
        [
          {
            type: "add",
            compName: name,
            compType: "tempState",
          },
        ]
      )
    );
    editorState.setSelectedBottomRes(name, BottomResTypeEnum.TempState);
  }

  delete(name: string) {
    const stateComps = this.getView();
    const index = stateComps.findIndex((i) => i.children.name.getView() === name);
    const toDelState = this.getView()[index];
    if (!toDelState) {
      return;
    }
    this.dispatch(
      wrapActionExtraInfo(this.deleteAction(index), [
        {
          type: "delete",
          compName: toDelState.children.name.getView(),
          compType: "tempState",
        },
      ])
    );
    message.success(trans("temporaryState.deleteMessage", { undoKey }));
  }
}
