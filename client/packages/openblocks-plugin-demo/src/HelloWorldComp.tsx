import {
  UICompBuilder,
  stringExposingStateControl,
  Section,
  withExposingConfigs,
  NameConfig,
} from "openblocks-sdk";

import styles from "./style.module.css";

const childrenMap = {
  text: stringExposingStateControl("text", "world"),
};

const HelloWorldCompBase = new UICompBuilder(childrenMap, (props: any) => {
  const text = props.text.value;
  return <div className={styles.wrapper}>Hello {text}</div>;
})
  .setPropertyViewFn((children: any) => {
    return <Section name="Basic">{children.text.propertyView({ label: "Text" })}</Section>;
  })
  .build();

export default withExposingConfigs(HelloWorldCompBase, [new NameConfig("text", "")]);
