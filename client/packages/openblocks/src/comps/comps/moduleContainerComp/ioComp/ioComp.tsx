import { MultiCompBuilder } from "comps/generators";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { ConfigViewSection } from "../styled";
import InputListComp from "./inputListComp";
import OutputListComp from "./outputListComp";

interface PropertyViewProps {
  inputs: InstanceType<typeof InputListComp>;
  outputs: InstanceType<typeof OutputListComp>;
}

function PropertyView(props: PropertyViewProps) {
  return (
    <>
      <ConfigViewSection>{props.inputs.getPropertyView()}</ConfigViewSection>
      <ConfigViewSection>{props.outputs.getPropertyView()}</ConfigViewSection>
    </>
  );
}

const childrenMap = {
  inputs: InputListComp,
  outputs: OutputListComp,
};

const IOCompBase = new MultiCompBuilder(childrenMap, (props) => {
  return props;
})
  .setPropertyViewFn((children) => {
    return <PropertyView inputs={children.inputs} outputs={children.outputs} />;
  })
  .build();

class IOComp extends IOCompBase {
  getInputTestView() {
    return this.children.inputs.getTestView();
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    const result: NameAndExposingInfo = {};
    this.children.inputs.getView().forEach((item) => {
      result[item.children.name.getView()] = item.exposingInfo();
    });
    return result;
  }
}

export default IOComp;
