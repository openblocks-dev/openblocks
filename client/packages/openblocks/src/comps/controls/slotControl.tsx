import { Modal } from "antd";
import { SimpleContainerComp } from "comps/comps/containerBase/simpleContainerComp";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "comps/comps/containerComp/containerView";
import { MultiCompBuilder, stateComp } from "comps/generators";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { CanvasContainerID } from "constants/domLocators";
import { Layers } from "constants/Layers";
import { trans } from "i18n";
import { changeChildAction, ConstructorToView } from "openblocks-core";
import { HintPlaceHolder, TacoButton } from "openblocks-design";
import { useContext } from "react";
import styled from "styled-components";

const ModalStyled = styled.div<{ $background?: string }>`
  .ant-modal-content {
    overflow: hidden;
    background-color: ${(props) => props.$background};

    .ant-modal-body > div {
      background-color: ${(props) => props.$background};
    }
  }
`;

const ModalWrapper = styled.div`
  pointer-events: auto;

  .ant-modal-body > div {
    overflow: overlay;
  }
`;

const ContainerView = (props: ContainerBaseProps) => {
  return <InnerGrid {...props} emptyRows={15} autoHeight />;
};

function ModalConfigView(props: {
  visible: boolean;
  containerProps: ConstructorToView<typeof SimpleContainerComp>;
  onCancel: () => void;
}) {
  const { visible, containerProps, onCancel } = props;
  const background = useContext(BackgroundColorContext);
  if (!visible) {
    return null;
  }
  return (
    <ModalWrapper>
      <Modal
        visible={visible}
        onCancel={onCancel}
        getContainer={() => document.querySelector(`#${CanvasContainerID}`) || document.body}
        footer={null}
        bodyStyle={{ padding: "0" }}
        zIndex={Layers.modal}
        modalRender={(node) => (
          <ModalStyled $background={background} onClick={() => {}}>
            {node}
          </ModalStyled>
        )}
        focusTriggerAfterClose={false}
      >
        <ContainerView
          {...containerProps}
          hintPlaceholder={HintPlaceHolder}
          containerPadding={[36, 36]}
          items={gridItemCompToGridItems(containerProps.items)}
        />
      </Modal>
    </ModalWrapper>
  );
}

const childrenMap = {
  container: SimpleContainerComp,
  showConfigModal: stateComp<boolean>(false),
};

export const SlotControl = new MultiCompBuilder(childrenMap, (props, dispatch) => {
  return (
    <ModalConfigView
      containerProps={props.container}
      visible={props.showConfigModal}
      onCancel={() => dispatch(changeChildAction("showConfigModal", false))}
    />
  );
})
  .setPropertyViewFn((children, dispatch) => {
    return (
      <TacoButton onClick={() => dispatch(changeChildAction("showConfigModal", true))}>
        {trans("slotControl.configSlotView")}
      </TacoButton>
    );
  })
  .build();
