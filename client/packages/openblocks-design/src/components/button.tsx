import { Button, ButtonProps } from "antd";
import styled, { css } from "styled-components";
import { LightLoading, Loading } from "./Loading";
import * as React from "react";
import { CSSProperties, forwardRef } from "react";

const buttonStyleConfig = {
  normal: css`
    background: #ffffff;
    border: 1px solid #d7d9e0;

    color: #333333;
    /* padding: 4px; */

    :focus {
      background: #f5f5f6;
      border: 1px solid #d7d9e0;
      color: #333333;
    }

    :hover {
      background: #f5f5f6;
      border: 1px solid #d7d9e0;
      color: #333333;
    }
  `,
  primary: css`
    background: #4965f2;
    border: 1px solid #4965f2;
    color: #ffffff;

    &.ant-btn-background-ghost {
      background-color: #fafbff;
      color: #4965f2;
      border-color: #c9d1fc;

      :hover {
        color: #315efb;
        background-color: #f5faff;
        border-color: #c2d6ff;
      }

      :focus {
        color: #315efb;
        background-color: #f5faff;
        border-color: #c2d6ff;
      }
    }

    :focus {
      background: #4965f2;
      border: 1px solid #4965f2;
      color: #ffffff;
    }

    :hover {
      border: 1px solid #315efb;
      background: #315efb;
      color: #ffffff;
    }

    :disabled {
      :hover {
        border: 1px solid #dbe1fd;
        background: #dbe1fd;
        color: #ffffff;
        opacity: 1;
      }

      border: 1px solid #dbe1fd;
      background: #dbe1fd;
      color: #ffffff;
      opacity: 1;
    }
  `,
  blue: css`
    background-color: #fafbff;
    color: #4965f2;
    border-color: #c9d1fc;

    :hover {
      color: #315efb;
      background-color: #f5faff;
      border-color: #c2d6ff;
    }

    :focus {
      color: #315efb;
      background-color: #f5faff;
      border-color: #c2d6ff;
    }

    :disabled,
    :disabled:hover {
      background: #f9fbff;
      border: 1px solid #dee9ff;
      border-radius: 4px;
    }
  `,
  link: css`
    color: #4955f2;
    border-color: #c9d1fc;
    background-color: #fafbff;

    &:hover {
      color: #315efb;
      border-color: #c2d6ff;
      background-color: #f9fbff;
    }

    &:focus {
      color: #315efb;
      border-color: #c2d6ff;
      background-color: #f9fbff;
    }
  `,
  delete: css`
    color: #f73131;
    border-color: #fccdcd;
    background-color: #fef4f4;

    &:hover {
      color: #f73131;
      border-color: #fccdcd;
      background-color: #feecec;
    }

    &:focus {
      color: #f73131;
      border-color: #fccdcd;
      background-color: #feecec;
    }
  `,
};
export type TacoButtonType = keyof typeof buttonStyleConfig;

const StyledAntdButton = styled(Button)<{ $buttonType: TacoButtonType; $loading: boolean }>`
  ${(props) => buttonStyleConfig[props.$buttonType]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 13px;
  font-size: 13px;
  border-radius: 4px;

  &.ant-btn {
    box-shadow: none;
  }

  .ant-btn-loading-icon {
    display: none;
  }

  & > svg {
    ${(props) => props.$loading && "display: none;"}
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;

const loadingStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

/**
 * antd button style adjustment when loading
 */
const TacoButton = forwardRef(
  (
    props: Omit<ButtonProps, "type"> & {
      buttonType?: TacoButtonType;
    },
    ref: React.Ref<HTMLElement>
  ) => {
    const { buttonType, ...restProps } = props;
    let loadingBackground;
    let loadingColor;
    if (buttonType === "link") {
      loadingBackground = "#fafbff";
      loadingColor = "#3377FF";
    } else if (buttonType === "delete") {
      loadingBackground = "#fef4f4";
      loadingColor = "#f73131";
    }
    return (
      <StyledAntdButton
        {...restProps}
        $buttonType={props.buttonType ?? "normal"}
        $loading={!!props.loading}
        ref={ref}
      >
        {props.loading ? (
          <>
            <span style={{ visibility: "hidden" }}>
              {props.icon}
              {props.children}
            </span>
            <Loading
              style={loadingStyle}
              backgroundColor={loadingBackground}
              color={loadingColor}
            />
          </>
        ) : (
          props.children
        )}
      </StyledAntdButton>
    );
  }
);

export const BigButtonStyle = styled.button`
  height: 30px;
  width: 280px;
  margin-right: 2px;
  color: #4965f2;
  border: 1px solid #c9d1fc;
  background: #fafbff;
  border-radius: 4px;

  font-size: 13px;
  text-align: center;
  line-height: 13px;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    color: #3377ff;
    border: 1px solid #c2d6ff;
    background: #f9fbff;
    transition: all 0.4s ease;
  }
`;

interface IBigButton {
  label: string;
  onClick: () => void;
}

export const BlueButton = (props: IBigButton) => {
  const { label, onClick } = props;
  return <BigButtonStyle onClick={onClick}>{label}</BigButtonStyle>;
};
export const RedButton = styled(BigButtonStyle)`
  color: #f73131;
  border: 1px solid rgba(247, 49, 49, 0.2);
  background: rgba(247, 49, 49, 0.05);

  &:hover {
    color: #f73131c7;
    border: 1px solid rgba(247, 49, 49, 0.19);
    background: rgba(247, 49, 49, 0.04);
  }
`;

const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  color: #4965f2;
  font-size: 13px;
  line-height: 13px;
  gap: 4px;
  border: none;
  background: white;
  cursor: pointer;
  user-select: none;
  padding: 0;

  :hover {
    color: #315efb;
    background: white;

    svg g {
      stroke: #315efb;
    }
  }

  :focus {
    background: white;
    color: #315efb;
  }

  svg {
    height: 8px;
    width: 8px;
  }
`;

export const LinkButton = (props: {
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <StyledAddButton
      style={props.style}
      className={props.className}
      onClick={() => props.onClick?.()}
    >
      {props.icon}
      {props.text}
    </StyledAddButton>
  );
};

export { TacoButton };
