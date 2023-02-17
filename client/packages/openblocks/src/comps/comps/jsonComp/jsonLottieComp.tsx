import { Player } from "@lottiefiles/react-lottie-player";
import {
  ArrayOrJSONObjectControl,
  NumberControl,
} from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { styleControl } from "comps/controls/styleControl";
import { LottieStyle } from "comps/controls/styleControlConstants";
import { trans } from "i18n";
import { Section, sectionNames } from "openblocks-design";
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

let JsonLottieTmpComp = (function () {
  const childrenMap = {
    value: withDefault(
      ArrayOrJSONObjectControl,
      JSON.stringify(defaultLottie, null, 2)
    ),
    speed: withDefault(NumberControl, 1),
    width: withDefault(NumberControl, 100),
    height: withDefault(NumberControl, 100),
    backgroundColor: styleControl(LottieStyle),
    animationStart: dropdownControl(animationStartOptions, "auto"),
  };

  return new UICompBuilder(childrenMap, (props) => (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
        backgroundColor: `${props.backgroundColor.background}`,
      }}
    >
      <Player
        autoplay={props.animationStart === "auto" && true}
        hover={props.animationStart === "on hover" && true}
        loop
        speed={props.speed}
        src={props.value}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  ))
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
