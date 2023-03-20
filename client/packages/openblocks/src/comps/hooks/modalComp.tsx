import { ContainerCompBuilder } from "comps/comps/containerBase/containerCompBuilder";
import { gridItemCompToGridItems, InnerGrid } from "comps/comps/containerComp/containerView";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { StringControl } from "comps/controls/codeControl";
import { booleanExposingStateControl } from "comps/controls/codeStateControl";
import { eventHandlerControl } from "comps/controls/eventHandlerControl";
import { styleControl } from "comps/controls/styleControl";
import { ModalStyle, ModalStyleType } from "comps/controls/styleControlConstants";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { CanvasContainerID } from "constants/domLocators";
import { Layers } from "constants/Layers";
import { HintPlaceHolder, Modal, Section, sectionNames } from "openblocks-design";
import { trans } from "i18n";
import { changeChildAction } from "openblocks-core";
import { CSSProperties, useCallback } from "react";
import { ResizeHandle } from "react-resizable";
import styled, { css } from "styled-components";
import { useUserViewMode } from "util/hooks";
import { isNumeric } from "util/stringUtils";
import { NameConfig, withExposingConfigs } from "../generators/withExposing";
import { BoolControl } from "comps/controls/boolControl";
import { withDefault } from "comps/generators";

const EventOptions = [
  { label: trans("modalComp.close"), value: "close", description: trans("modalComp.closeDesc") },
] as const;

const DEFAULT_WIDTH = "60%";
const DEFAULT_HEIGHT = 222;
const DEFAULT_PADDING = 16;

const getStyle = (style: ModalStyleType) => {
  return css`
    .ant-modal-content {
      border-radius: ${style.radius};
      border: 1px solid ${style.border};
      overflow: hidden;
      background-color: ${style.background};

      .ant-modal-body > .react-resizable > .react-grid-layout {
        background-color: ${style.background};
      }
    }
  `;
};

const ModalStyled = styled.div<{ $style: ModalStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

const ModalWrapper = styled.div`
  // Shield the mouse events of the lower layer, the mask can be closed in the edit mode to prevent the lower layer from sliding
  pointer-events: auto;
`;

// If it is a number, use the px unit by default
function transToPxSize(size: string | number) {
  return isNumeric(size) ? size + "px" : (size as string);
}

let TmpModalComp = (function () {
  return new ContainerCompBuilder(
    {
      visible: booleanExposingStateControl("visible"),
      onEvent: eventHandlerControl(EventOptions),
      width: StringControl,
      height: StringControl,
      autoHeight: AutoHeightControl,
      style: styleControl(ModalStyle),
      maskClosable: withDefault(BoolControl, true),
      showMask: withDefault(BoolControl, true),
    },
    (props, dispatch) => {
      const userViewMode = useUserViewMode();
      const bodyStyle: CSSProperties = { padding: 0 };
      const width = transToPxSize(props.width || DEFAULT_WIDTH);
      let height = undefined;
      let resizeHandles: ResizeHandle[] = ["w", "e"];
      if (!props.autoHeight) {
        height = transToPxSize(props.height || DEFAULT_HEIGHT);
        resizeHandles.push("s");
        bodyStyle.overflow = "hidden auto";
      }
      if (userViewMode) {
        resizeHandles = [];
      }
      const { items, ...otherContainerProps } = props.container;
      const onResizeStop = useCallback(
        (
          e: React.SyntheticEvent,
          node: HTMLElement,
          size: { width: number; height: number },
          handle: ResizeHandle
        ) => {
          if (["w", "e"].includes(handle)) {
            dispatch(changeChildAction("width", size.width, true));
          } else if (["n", "s"].includes(handle)) {
            dispatch(changeChildAction("height", size.height, true));
          }
        },
        [dispatch]
      );
      return (
        <BackgroundColorContext.Provider value={props.style.background}>
          <ModalWrapper>
            <Modal
              height={height}
              resizeHandles={resizeHandles}
              onResizeStop={onResizeStop}
              visible={props.visible.value}
              maskClosable={props.maskClosable}
              focusTriggerAfterClose={false}
              getContainer={() => document.querySelector(`#${CanvasContainerID}`) || document.body}
              footer={null}
              bodyStyle={bodyStyle}
              width={width}
              onCancel={(e) => {
                props.visible.onChange(false);
              }}
              afterClose={() => {
                props.onEvent("close");
              }}
              zIndex={Layers.modal}
              modalRender={(node) => <ModalStyled $style={props.style}>{node}</ModalStyled>}
              mask={props.showMask}
            >
              <InnerGrid
                {...otherContainerProps}
                items={gridItemCompToGridItems(items)}
                autoHeight={props.autoHeight}
                minHeight={DEFAULT_HEIGHT - DEFAULT_PADDING * 2 + "px"}
                containerPadding={[DEFAULT_PADDING, DEFAULT_PADDING]}
                hintPlaceholder={HintPlaceHolder}
              />
            </Modal>
          </ModalWrapper>
        </BackgroundColorContext.Provider>
      );
    }
  )
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.autoHeight.getPropertyView()}
          {!children.autoHeight.getView() &&
            children.height.propertyView({
              label: trans("modalComp.modalHeight"),
              tooltip: trans("modalComp.modalHeightTooltip"),
              placeholder: DEFAULT_HEIGHT + "",
            })}
          {children.width.propertyView({
            label: trans("modalComp.modalWidth"),
            tooltip: trans("modalComp.modalWidthTooltip"),
            placeholder: DEFAULT_WIDTH,
          })}
          {children.maskClosable.propertyView({
            label: trans("prop.maskClosable"),
          })}
          {children.showMask.propertyView({
            label: trans("prop.showMask"),
          })}
        </Section>
        <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

TmpModalComp = class extends TmpModalComp {
  override autoHeight(): boolean {
    return false;
  }
};

TmpModalComp = withMethodExposing(TmpModalComp, [
  {
    method: {
      name: "openModal",
      description: trans("modalComp.openModalDesc"),
      params: [],
    },
    execute: (comp, values) => {
      comp.children.visible.getView().onChange(true);
    },
  },
  {
    method: {
      name: "closeModal",
      description: trans("modalComp.closeModalDesc"),
      params: [],
    },
    execute: (comp, values) => {
      comp.children.visible.getView().onChange(false);
    },
  },
]);

export const ModalComp = withExposingConfigs(TmpModalComp, [
  new NameConfig("visible", trans("modalComp.visibleDesc")),
]);
