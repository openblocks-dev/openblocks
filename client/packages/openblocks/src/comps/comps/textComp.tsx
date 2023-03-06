import { dropdownControl } from "comps/controls/dropdownControl";
import { stringExposingStateControl } from "comps/controls/codeStateControl";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { Section, sectionNames } from "openblocks-design";
import styled, { css } from "styled-components";
import { AlignCenter } from "openblocks-design";
import { AlignLeft } from "openblocks-design";
import { AlignRight } from "openblocks-design";
import { HorizontalAlignmentControl } from "../controls/dropdownControl";
import { MarginControl } from "../controls/marginControl";
import { UICompBuilder, withDefault } from "../generators";
import {
  NameConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "../generators/withExposing";
import { markdownCompCss, TacoMarkDown } from "openblocks-design";
import { styleControl } from "comps/controls/styleControl";
import {
  MarginStyle,
  TextStyle,
  TextStyleType,
} from "comps/controls/styleControlConstants";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { StringControl } from "../controls/codeControl";
import { PaddingControl } from "../controls/paddingControl";

const getStyle = (style: TextStyleType) => {
  return css`
    border-radius: 4px;
    color: ${style.text};
    background-color: ${style.background};

    .markdown-body a {
      color: ${style.links};
    }
    .markdown-body {
      h1 {
        line-height: 1.5;
      }
      h5 {
        line-height: 2.2;
      }
    }

    .markdown-body {
      &,
      p,
      div,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: ${style.text};
      }
      img,
      pre {
        background-color: ${style.background};
        code {
          color: #000000;
        }
      }
    }
  `;
};

const TextContainer = styled.div<{ type: string; styleConfig: TextStyleType }>`
  height: 100%;
  overflow: auto;
  margin: 0;
  ${(props) =>
    props.type === "text" &&
    "white-space:break-spaces;line-height: 1.9;padding: 3px 0;"};
  ${(props) => props.styleConfig && getStyle(props.styleConfig)}
  display: flex;
  font-size: 13px;
  ${markdownCompCss};
  overflow-wrap: anywhere;
  .markdown-body {
    overflow-wrap: anywhere;
  }
`;

const MarginContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

const PaddingContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

const AlignTop = styled(AlignLeft)`
  transform: rotate(90deg);
`;
const AlignBottom = styled(AlignRight)`
  transform: rotate(90deg);
`;
const AlignVerticalCenter = styled(AlignCenter)`
  transform: rotate(90deg);
`;

const typeOptions = [
  {
    label: "Markdown",
    value: "markdown",
  },
  {
    label: trans("text"),
    value: "text",
  },
] as const;
const VerticalAlignmentOptions = [
  { label: <AlignTop />, value: "flex-start" },
  { label: <AlignVerticalCenter />, value: "center" },
  { label: <AlignBottom />, value: "flex-end" },
] as const;

let TextTmpComp = (function () {
  const childrenMap = {
    text: stringExposingStateControl(
      "text",
      trans("textShow.text", { name: "{{currentUser.name}}" })
    ),
    autoHeight: AutoHeightControl,
    type: dropdownControl(typeOptions, "markdown"),
    horizontalAlignment: HorizontalAlignmentControl,
    verticalAlignment: dropdownControl(VerticalAlignmentOptions, "center"),
    style: styleControl(TextStyle),
    margin: MarginControl,
    padding: PaddingControl,
  };
  return new UICompBuilder(childrenMap, (props) => {
    const value = props.text.value;
    return (
      <TextContainer
        type={props.type}
        styleConfig={props.style}
        style={{
          marginTop: props.margin.top ? props.margin.top : 0,
          marginRight: props.margin.right ? props.margin.right : 0,
          marginBottom: props.margin.bottom ? props.margin.bottom : 0,
          marginLeft: props.margin.left ? props.margin.left : 0,
          paddingTop: props.padding.top ? props.padding.top : 0,
          paddingRight: props.padding.right ? props.padding.right : 0,
          paddingBottom: props.padding.bottom ? props.padding.bottom : 0,
          paddingLeft: props.padding.left ? props.padding.left : 0,
        }}
      >
        {props.type === "markdown" ? (
          <TacoMarkDown>{value}</TacoMarkDown>
        ) : (
          value
        )}
      </TextContainer>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.type.propertyView({
              label: trans("value"),
              tooltip: trans("textShow.valueTooltip"),
              radioButton: true,
            })}
            {children.text.propertyView({})}
          </Section>

          <Section name={sectionNames.layout}>
            {children.autoHeight.getPropertyView()}
            {!children.autoHeight.getView() &&
              children.verticalAlignment.propertyView({
                label: trans("textShow.verticalAlignment"),
                radioButton: true,
              })}
            {children.horizontalAlignment.propertyView({
              label: trans("textShow.horizontalAlignment"),
              radioButton: true,
            })}
            {hiddenPropertyView(children)}
          </Section>

          <Section name={sectionNames.style}>
            {children.style.getPropertyView()}
          </Section>
          <Section name={trans("style.margin")}>
            {children.margin.getPropertyView()}
          </Section>
          <Section name={trans("style.padding")}>
            {children.padding.getPropertyView()}
          </Section>
        </>
      );
    })
    .build();
})();

TextTmpComp = class extends TextTmpComp {
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
};

export const TextComp = withExposingConfigs(TextTmpComp, [
  new NameConfig("text", trans("textShow.textDesc")),
  NameConfigHidden,
]);
