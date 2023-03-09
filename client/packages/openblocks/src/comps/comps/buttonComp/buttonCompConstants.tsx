import { Button } from "antd";
import { styleControl } from "comps/controls/styleControl";
import { ButtonStyleType, ButtonStyle } from "comps/controls/styleControlConstants";
import { migrateOldData } from "comps/generators/simpleGenerators";
import styled, { css } from "styled-components";
import { genActiveColor, genHoverColor } from "openblocks-design";
import { refMethods } from "comps/generators/withMethodExposing";
import { blurMethod, clickMethod, focusWithOptions } from "comps/utils/methodUtils";

export function getButtonStyle(buttonStyle: ButtonStyleType) {
  const hoverColor = genHoverColor(buttonStyle.background);
  const activeColor = genActiveColor(buttonStyle.background);
  return css`
    border-radius: ${buttonStyle.radius};
    &:not(:disabled) {
      // click animation color
      --antd-wave-shadow-color: ${buttonStyle.border};
      border-color: ${buttonStyle.border};
      color: ${buttonStyle.text};
      background-color: ${buttonStyle.background};
      border-radius: ${buttonStyle.radius};

      :hover,
      :focus {
        color: ${buttonStyle.text};
        background-color: ${hoverColor};
        border-color: ${buttonStyle.border === buttonStyle.background
          ? hoverColor
          : buttonStyle.border};
      }

      :active {
        color: ${buttonStyle.text};
        background-color: ${activeColor};
        border-color: ${buttonStyle.border === buttonStyle.background
          ? activeColor
          : buttonStyle.border};
      }
    }
  `;
}

export const Button100 = styled(Button)<{ $buttonStyle?: ButtonStyleType }>`
  ${(props) => props.$buttonStyle && getButtonStyle(props.$buttonStyle)}
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  gap: 6px;
`;

export const ButtonCompWrapper = styled.div<{ disabled: boolean }>`
  // The button component is disabled but can respond to drag & select events
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    button:disabled {
      pointer-events: none;
    }
  `};
`;

/**
 * Compatible with old data 2022-08-05
 */
function fixOldData(oldData: any) {
  if (
    oldData &&
    (oldData.hasOwnProperty("backgroundColor") ||
      oldData.hasOwnProperty("borderColor") ||
      oldData.hasOwnProperty("color"))
  ) {
    return {
      background: oldData.backgroundColor,
      border: oldData.borderColor,
      text: oldData.color,
    };
  }
  return oldData;
}
const ButtonTmpStyleControl = styleControl(ButtonStyle);
export const ButtonStyleControl = migrateOldData(ButtonTmpStyleControl, fixOldData);

export const buttonRefMethods = refMethods<HTMLElement>([
  focusWithOptions,
  blurMethod,
  clickMethod,
]);
