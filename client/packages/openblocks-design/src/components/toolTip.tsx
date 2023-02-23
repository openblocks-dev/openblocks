import { Button, Tooltip as AntdTooltip } from "antd";
import { TooltipProps } from "antd/lib/tooltip";
import { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";
import { labelCss } from "components/Label";
import { ReactComponent as CloseIcon } from "icons/icon-close.svg";
import { TooltipRenderProps } from "react-joyride";
import { trans } from "i18n/design";

const overlayInnerCss: CSSProperties = {
  borderRadius: "4px",
};

const ToolTipDiv = styled.div`
  background-color: #4965f2;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 24px;
  line-height: 32px;
`;

const TooltipText = styled.div`
  font-size: 14px;
  color: #ffffff;
  line-height: 24px;
  margin: 15px 0 0 0;
`;

const StepText = styled.div`
  opacity: 0.5;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  line-height: 14px;
  margin-right: auto;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  line-height: 18px;
  margin: 0;
`;

const CloseDiv = styled.div`
  cursor: pointer;
  margin-left: auto;
  height: 16px;
  width: 16px;
  display: flex;
  margin-right: -8px;
  margin-top: -8px;

  svg line {
    stroke: #ffffff;
  }
`;

const buttonCss = css`
  height: 28px;
  font-size: 14px;
  text-align: center;
  line-height: 14px;
  border-radius: 4px;
  padding: 4px;
  font-weight: 600;
`;

const PreButton = styled(Button)`
  ${buttonCss};

  &,
  :focus {
    background-color: #6179f2;
    border-color: #6179f2;
    color: #ffffff;
  }

  :hover {
    background-color: #798df2;
    border-color: #798df2;
    color: #ffffff;
  }
`;

const NextButton = styled(Button)`
  ${buttonCss};

  &,
  :focus {
    color: #4965f2;
    border-color: #ffffff;
    background-color: #ffffff;
  }

  :hover {
    color: #4965f2;
    border-color: #e6eaff;
    background-color: #e6eaff;
  }
`;

const TooltipHeader = styled.div`
  display: flex;
`;

const TooltipFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
  margin-top: 19px;
`;

export const TooltipCodeBlock = (props: { text: string }) => {
  return (
    <span
      style={{
        backgroundColor: "#3048BF",
        padding: "0 4px",
        borderRadius: "4px",
      }}
    >
      {props.text}
    </span>
  );
};

export const TooltipLink = styled.a`
  &,
  :hover,
  :focus {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const TooltipTitleWrapper = styled.span`
  color: #ffffff;
  display: inline-block;
  white-space: pre-wrap;

  a {
    color: #73adff;
  }
`;

export const UnderlineCss = css`
  background-image: linear-gradient(to right, #8b8fa3 50%, #fff 0%);
  background-size: 4px 1px;
  background-position: 5px bottom;
  background-repeat: repeat-x;
  padding-bottom: 2.5px !important;
`;

function Tooltip(props: TooltipProps) {
  return <AntdTooltip color="#2c2c2c2" overlayInnerStyle={overlayInnerCss} {...props} />;
}

const Label = styled.div<{ border?: boolean }>`
  span {
    ${(props) => props.border && UnderlineCss}
    line-height: ${(props) => props.border && "18px"};
  }
  ${labelCss};
  margin: 0;
  width: fit-content;
  line-height: 1;
`;

function ToolTipLabel(
  props: TooltipProps & {
    label?: ReactNode; // text allowed, self defined children also available
    tooltipStyle?: CSSProperties;
    labelStyle?: CSSProperties;
  }
) {
  const { title, tooltipStyle, labelStyle, label, children, ...restProps } = props;
  return (
    <AntdTooltip
      color="#2c2c2c"
      title={title && <TooltipTitleWrapper>{title}</TooltipTitleWrapper>}
      overlayInnerStyle={{ maxWidth: "232px", whiteSpace: "break-spaces" }}
      arrowPointAtCenter={true}
      placement="top"
      defaultVisible={false}
      trigger="hover"
      popupVisible={!!title}
      style={tooltipStyle}
      {...restProps}
    >
      {label ? (
        <Label style={labelStyle} border={!!title} className="tooltipLabel">
          <span>{label}</span>
        </Label>
      ) : (
        children
      )}
    </AntdTooltip>
  );
}

export const TutorialsTooltip = ({
  continuous,
  index,
  step,
  backProps,
  skipProps,
  primaryProps,
  tooltipProps,
  isLastStep,
  size,
}: TooltipRenderProps) => {
  return (
    <ToolTipDiv {...tooltipProps} style={{ width: step.styles?.options?.width }}>
      <TooltipHeader>
        {step.title && <Title>{step.title}</Title>}
        <CloseDiv {...skipProps}>
          <CloseIcon />
        </CloseDiv>
      </TooltipHeader>
      <TooltipText>{step.content}</TooltipText>
      {!step.hideFooter && (
        <TooltipFooter>
          <StepText>{index + 1 + "/" + size}</StepText>
          {index > 0 && <PreButton {...backProps}>{trans("previousStep")}</PreButton>}
          {continuous && (
            <NextButton {...primaryProps}>
              {isLastStep ? trans("finish") : trans("nextStep")}
            </NextButton>
          )}
        </TooltipFooter>
      )}
    </ToolTipDiv>
  );
};

export function CommonTipsOverlay(props: {
  onClose: () => void;
  onOk: () => void;
  title: string;
  content: JSX.Element | string;
  okBtnText?: string;
}) {
  return (
    <ToolTipDiv>
      <TooltipHeader>
        <Title>{props.title}</Title>
        <CloseDiv>
          <CloseIcon onClick={() => props.onClose()} />
        </CloseDiv>
      </TooltipHeader>
      <TooltipText>{props.content}</TooltipText>
      <TooltipFooter>
        <NextButton onClick={() => props.onOk()}>{props.okBtnText || trans("ok")}</NextButton>
      </TooltipFooter>
    </ToolTipDiv>
  );
}

export { Tooltip, ToolTipLabel };
