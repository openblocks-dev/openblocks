import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { jsonValueStateControl } from "comps/controls/codeStateControl";
import { MultiCompBuilder } from "comps/generators";
import { bottomResListComp } from "comps/generators/bottomResList";
import { NameConfig, withExposingConfigs } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { trans } from "i18n";
import _ from "lodash";
import { DocLink } from "openblocks-design";
import { BottomTabs } from "pages/editor/bottom/BottomTabs";
import { ReactNode } from "react";
import { BottomResComp, BottomResCompResult, BottomResTypeEnum } from "types/bottomRes";
import { JSONObject } from "util/jsonTypes";
import { QueryTutorials } from "util/tutorialUtils";
import { SimpleNameComp } from "./simpleNameComp";

const TemporaryStateItemCompBase = new MultiCompBuilder(
  {
    name: SimpleNameComp,
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
  id(): string {
    return this.name();
  }
  name(): string {
    return this.children.name.getView();
  }
  icon(): ReactNode {
    return getBottomResIcon(BottomResTypeEnum.TempState);
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

export const TemporaryStateListComp = bottomResListComp(
  TemporaryStateItemComp,
  BottomResTypeEnum.TempState,
  { value: "null" },
  "state"
);
