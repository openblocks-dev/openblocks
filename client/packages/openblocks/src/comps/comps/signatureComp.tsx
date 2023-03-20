import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { BoolControl } from "comps/controls/boolControl";
import { StringControl } from "comps/controls/codeControl";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import { LabelControl } from "comps/controls/labelControl";
import { styleControl } from "comps/controls/styleControl";
import {
  contrastColor,
  SignatureStyle,
  SignatureStyleType,
} from "comps/controls/styleControlConstants";
import { stateComp, withDefault } from "comps/generators/simpleGenerators";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { changeValueAction, multiChangeAction } from "openblocks-core";
import { Section, sectionNames, UndoIcon } from "openblocks-design";
import React, { Suspense, useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import type SignatureCanvasType from "react-signature-canvas";
import styled from "styled-components";
import { UICompBuilder } from "../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../generators/withExposing";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";

const Wrapper = styled.div<{ $style: SignatureStyleType; isEmpty: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid ${(props) => props.$style.border};
  border-radius: ${(props) => props.$style.radius};
  overflow: hidden;
  width: 100%;
  height: 100%;

  .signature {
    background-color: ${(props) => props.$style.background};
    opacity: ${(props) => (props.isEmpty ? 0 : 1)};
    width: 100%;
    height: 100%;
  }

  .sigCanvas {
    flex-grow: 1;
  }
  .footer {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: 8px;
    > span {
      margin: 0 8px 16px 8px;
      cursor: pointer;
      svg {
        color: ${(props) => props.$style.footerIcon};
        width: 14px;
        height: 14px;
        path {
          fill: ${(props) => props.$style.footerIcon};
        }
      }
      &:hover svg {
        color: ${(props) => contrastColor(props.$style.footerIcon)};
        path {
          fill: ${(props) => contrastColor(props.$style.footerIcon)};
        }
      }
    }
  }
  .empty {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.$style.background};
    z-index: -1;
    color: ${(props) => props.$style.tips};
  }
`;

const childrenMap = {
  tips: withDefault(StringControl, trans("signature.signHere")),
  onEvent: ChangeEventHandlerControl,
  label: withDefault(LabelControl, { position: "column", text: "" }),
  style: styleControl(SignatureStyle),
  showUndo: withDefault(BoolControl, true),
  showClear: withDefault(BoolControl, true),
  value: stateComp(""),

  ...formDataChildren,
};

const SignatureCanvas = React.lazy(() => import("react-signature-canvas"));

let SignatureTmpComp = (function () {
  return new UICompBuilder(childrenMap, (props, dispatch) => {
    let canvas: SignatureCanvasType | null = null;
    const [isBegin, setIsBegin] = useState(false);
    const [canvasSize, setCanvasSize] = useState([0, 0]);

    const updateValue = (isClear: boolean = false) => {
      const clear = isClear || canvas?.toData().length === 0;
      if (canvas) {
        clear && canvas?.clear();
        dispatch(
          multiChangeAction({
            value: changeValueAction(clear ? "" : canvas.toDataURL(), false),
          })
        );
      }
    };
    return props.label({
      style: props.style,
      children: (
        <ReactResizeDetector
          onResize={(width, height) => {
            width && height && setCanvasSize([width, height]);
            updateValue(true);
          }}
        >
          <Wrapper
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            $style={props.style}
            isEmpty={!props.value && !isBegin}
          >
            <div className="signature">
              <Suspense fallback={<Skeleton />}>
                <SignatureCanvas
                  ref={(ref) => {
                    canvas = ref;
                  }}
                  penColor={props.style.pen}
                  clearOnResize={false}
                  canvasProps={{
                    className: "sigCanvas",
                    width: canvasSize[0],
                    height: canvasSize[1],
                  }}
                  onEnd={() => {
                    updateValue();
                    setIsBegin(false);
                    props.onEvent("change");
                  }}
                  onBegin={() => setIsBegin(true)}
                />
              </Suspense>
            </div>
            {(props.showClear || props.showUndo) && (
              <div className="footer">
                {props.showUndo && (
                  <span className="anticon">
                    <UndoIcon
                      onClick={() => {
                        const data = canvas?.toData();
                        if (data) {
                          data?.pop();
                          canvas?.fromData(data);
                          updateValue();
                          props.onEvent("change");
                        }
                      }}
                    />
                  </span>
                )}
                {props.showClear && (
                  <DeleteOutlined
                    onClick={() => {
                      updateValue(true);
                      props.onEvent("change");
                    }}
                  />
                )}
              </div>
            )}
            {!(isBegin || props.value) && <div className="empty">{props.tips}</div>}
          </Wrapper>
        </ReactResizeDetector>
      ),
    });
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.tips.propertyView({ label: trans("signature.tips") })}
          </Section>
          <FormDataPropertyView {...children} />
          {children.label.getPropertyView()}
          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
          <Section name={sectionNames.layout}>
            {children.showUndo.propertyView({ label: trans("signature.showUndo") })}
            {children.showClear.propertyView({ label: trans("signature.showClear") })}
            {hiddenPropertyView(children)}
          </Section>
          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

SignatureTmpComp = class extends SignatureTmpComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const SignatureComp = withExposingConfigs(SignatureTmpComp, [
  new NameConfig("value", trans("value")),
  NameConfigHidden,
]);
