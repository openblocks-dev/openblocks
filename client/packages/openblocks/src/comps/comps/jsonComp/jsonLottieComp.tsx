import { Player } from "@lottiefiles/react-lottie-player";
import { hiddenPropertyView } from "@openblocks-ee/index.sdk";
import {
  ArrayOrJSONObjectControl,
  NumberControl,
} from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { styleControl } from "comps/controls/styleControl";
import { LottieStyle } from "comps/controls/styleControlConstants";
import { trans } from "i18n";
import { Section, sectionNames } from "openblocks-design";
import { useEffect, useState } from "react";
import { UICompBuilder, withDefault } from "../../generators";
import {
  NameConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "../../generators/withExposing";
import { defaultLottie } from "./jsonConstants";
/**
 * JsonLottie Comp
 */
const animationStartOptions = [
  {
    label: "Auto",
    value: "auto",
  },
  {
    label: "On Hover",
    value: "on hover",
  },
] as const;

const speedOptions = [
  {
    label: "1x",
    value: "1",
  },
  {
    label: "1.5x",
    value: "1.5",
  },
  {
    label: "2x",
    value: "2",
  },
  {
    label: "2.5x",
    value: "2.5",
  },
  {
    label: "5x",
    value: "5",
  },
  {
    label: "10x",
    value: "10",
  },
] as const;

let JsonLottieTmpComp = (function () {
  const childrenMap = {
    value: withDefault(
      ArrayOrJSONObjectControl,
      JSON.stringify(defaultLottie, null, 2)
    ),
    speed: dropdownControl(speedOptions, "1"),
    width: withDefault(NumberControl, 100),
    height: withDefault(NumberControl, 100),
    backgroundColor: styleControl(LottieStyle),
    animationStart: dropdownControl(animationStartOptions, "auto"),
  };

  return new UICompBuilder(childrenMap, (props) => {
    return (
      <div
        style={{
          height: "100%",
          overflowY: "scroll",
          backgroundColor: `${props.backgroundColor.background}`,
        }}
      >
        <Player
          key={[props.speed, props.animationStart] as any}
          autoplay={props.animationStart === "auto" && true}
          hover={props.animationStart === "on hover" && true}
          loop
          speed={Number(props.speed)}
          src={props.value}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({
              label: trans("lottieJson"),
            })}
            {children.speed.propertyView({
              label: trans("jsonLottie.speed"),
            })}
            {children.animationStart.propertyView({
              label: trans("jsonLottie.animationStart"),
            })}
          </Section>
          <Section name={sectionNames.style}>
            {children.backgroundColor.getPropertyView()}
          </Section>
          <Section name={sectionNames.layout}>
            {hiddenPropertyView(children)}
          </Section>
        </>
      );
    })
    .build();
})();
JsonLottieTmpComp = class extends JsonLottieTmpComp {
  override autoHeight(): boolean {
    return false;
  }
};
export const JsonLottieComp = withExposingConfigs(JsonLottieTmpComp, [
  new NameConfig("value", trans("jsonLottie.valueDesc")),
  NameConfigHidden,
]);
