import {
  UICompBuilder,
  Section,
  withExposingConfigs,
  stringExposingStateControl,
  NameConfig,
  eventHandlerControl,
  withMethodExposing,
} from "openblocks-sdk";

import Mermaid from "./mermaid";

const childrenMap = {
  code: stringExposingStateControl(
    "code",
    `graph LR
   Start --> Stop`
  ),
  onEvent: eventHandlerControl([
    {
      label: "onChange",
      value: "change",
      description: "",
    },
  ]),
};

const CompBase = new UICompBuilder(childrenMap, (props: any) => {
  const code = props.code.value;
  return <Mermaid code={code} />;
})
  .setPropertyViewFn((children: any) => {
    return (
      <>
        <Section name="Basic">{children.code.propertyView({ label: "code" })}</Section>
        <Section name="Interaction">{children.onEvent.propertyView()}</Section>
      </>
    );
  })
  .build();

const AppViewCompTemp = withMethodExposing(CompBase, []);

export const MermaidComp = withExposingConfigs(AppViewCompTemp, [new NameConfig("code", "")]);
