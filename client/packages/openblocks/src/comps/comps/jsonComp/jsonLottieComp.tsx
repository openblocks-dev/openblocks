import { Section, sectionNames } from "openblocks-design";
import { UICompBuilder, withDefault } from "../../generators";
import {
  NameConfigHidden,
  NameConfig,
  withExposingConfigs,
} from "../../generators/withExposing";
import styled from "styled-components";
import { dropdownControl } from "comps/controls/dropdownControl";
import {
  ArrayOrJSONObjectControl,
  NumberControl,
  StringControl,
} from "comps/controls/codeControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { Player } from "@lottiefiles/react-lottie-player";
import { defaultLottie } from "./jsonConstants";
/**
 * JsonLottie Comp
 */
const themeOptions = [
  { label: trans("jsonLottie.default"), value: "shapeshifter:inverted" },
  { label: trans("jsonLottie.defaultDark"), value: "shapeshifter" },
  { label: trans("jsonLottie.neutralLight"), value: "grayscale:inverted" },
  { label: trans("jsonLottie.neutralDark"), value: "grayscale" },
  { label: trans("jsonLottie.azure"), value: "apathy:inverted" },
  { label: trans("jsonLottie.darkBlue"), value: "flat" },
];
const bgColorMap = {
  "shapeshifter:inverted": "#ffffff",
  shapeshifter: "#000000",
  "grayscale:inverted": "#ffffff",
  grayscale: "#000000",
  "apathy:inverted": "#efffff",
  flat: "#2c3e50",
};
const JsonLottieContainer = styled.div<{ $theme: keyof typeof bgColorMap }>`
  height: 100%;
  overflow-y: scroll;
  background-color: ${(props) => bgColorMap[props.$theme] || "#ffffff"};
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  padding: 10px;
`;
let JsonLottieTmpComp = (function () {
  const childrenMap = {
    value: withDefault(
      ArrayOrJSONObjectControl,
      JSON.stringify(defaultLottie, null, 2)
    ),
    speed: withDefault(NumberControl, 1),
    width: withDefault(NumberControl, 100),
    height: withDefault(NumberControl, 100),
    backgroundColor: withDefault(StringControl, "transparent"),
    theme: dropdownControl(themeOptions, "shapeshifter:inverted"),
  };
  return new UICompBuilder(childrenMap, (props) => (
    <JsonLottieContainer $theme={props.theme as keyof typeof bgColorMap}>
      <Player
        autoplay
        loop
        background={props.backgroundColor}
        speed={props.speed}
        src={props.value}
        style={{ height: `${props.height}px`, width: `${props.width}px` }}
      />
    </JsonLottieContainer>
  ))
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.value.propertyView({
              label: trans("data"),
            })}
            {children.speed.propertyView({
              label: trans("jsonLottie.speed"),
            })}
            {children.width.propertyView({
              label: trans("jsonLottie.width"),
            })}
            {children.height.propertyView({
              label: trans("jsonLottie.height"),
            })}

            {children.backgroundColor.propertyView({
              label: trans("jsonLottie.backgroundColor"),
            })}
          </Section>
          <Section name={sectionNames.style}>
            {children.theme.propertyView({
              label: trans("jsonLottie.theme"),
            })}
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
