import {
  antd,
  UICompBuilder,
  numberExposingStateControl,
  Section,
  withDefault,
  withExposingConfigs,
  NumberControl,
  NameConfig,
  eventHandlerControl,
  withMethodExposing,
} from "openblocks-sdk";
import styles from "./style.module.css";

const { Button } = antd;

const childrenMap = {
  value: numberExposingStateControl("value", 10),
  step: withDefault(NumberControl, 1),
  onEvent: eventHandlerControl([
    {
      label: "onChange",
      value: "change",
      description: "",
    },
  ]),
};

const CounterCompBase = new UICompBuilder(childrenMap, (props: any) => {
  const currentValue = props.value.value;
  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => {
          props.value.onChange(currentValue - props.step);
          props.onEvent("change");
        }}
      >
        -
      </Button>
      <span style={{ padding: "0 8px" }}>{currentValue}</span>
      <Button
        onClick={() => {
          props.value.onChange(currentValue + props.step);
          props.onEvent("change");
        }}
      >
        +
      </Button>
    </div>
  );
})
  .setPropertyViewFn((children: any) => {
    return (
      <>
        <Section name="Basic">
          {children.value.propertyView({ label: "Initial Value" })}
          {children.step.propertyView({ label: "Step" })}
        </Section>
        <Section name="Interaction">{children.onEvent.propertyView()}</Section>
      </>
    );
  })
  .build();

const CounterCompTemp = withMethodExposing(CounterCompBase, [
  {
    method: {
      name: "random",
      params: [],
    },
    execute(comp: any) {
      comp.children.value.getView().onChange(Math.floor(Math.random() * 100));
    },
  },
]);

export default withExposingConfigs(CounterCompTemp, [
  new NameConfig("value", ""),
  new NameConfig("step", ""),
]);
