import { CustomModal } from "openblocks-design";
import { CustomModalProps } from "openblocks-design";
import { ReactNode, useState } from "react";

interface StepRenderProps {
  go(key: string): void;
  back(): void;
  next(): void;
}

export interface StepItem {
  key: string;
  canBack?: boolean;
  titleRender: (props: StepRenderProps) => ReactNode;
  bodyRender: (props: StepRenderProps) => ReactNode;
  footerRender: (props: StepRenderProps) => ReactNode;
}

export interface StepModalProps extends CustomModalProps {
  steps: StepItem[];
  activeStepKey?: string;
  onStepChange?: (key: string) => void;
}

export default function StepModal(props: StepModalProps) {
  const { steps, activeStepKey, onStepChange, ...modalProps } = props;
  const [current, setCurrent] = useState(steps[0]?.key);
  const currentStepIndex = steps.findIndex((i) => i.key === activeStepKey ?? current);
  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

  const handleChangeStep = (key: string) => {
    setCurrent(key);
    onStepChange?.(key);
  };

  const go = (key: string) => handleChangeStep(key);

  const back = () => {
    if (currentStepIndex <= 0) {
      return;
    }
    const targetKey = steps[currentStepIndex - 1]?.key;
    handleChangeStep(targetKey);
  };

  const next = () => {
    if (currentStepIndex >= steps.length - 1) {
      return;
    }
    const targetKey = steps[currentStepIndex + 1]?.key;
    handleChangeStep(targetKey);
  };

  const renderProps = { go, back, next };

  return (
    <CustomModal
      {...modalProps}
      onBack={back}
      showBackLink={currentStepIndex > 0 && currentStep?.canBack !== false}
      title={currentStep?.titleRender(renderProps)}
      footer={currentStep?.footerRender(renderProps)}
    >
      {currentStep?.bodyRender(renderProps)}
    </CustomModal>
  );
}
