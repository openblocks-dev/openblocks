import { BoolControl } from "comps/controls/boolControl";
import { stateComp, UICompBuilder, valueComp } from "comps/generators";
import { NameGenerator } from "comps/utils";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { trans } from "i18n";
import { DEFAULT_POSITION_PARAMS, PositionParams } from "layout";
import { ResizeHandleAxis } from "layout/gridLayoutPropTypes";
import { Layout } from "layout/utils";
import _ from "lodash";
import { CompAction, CompActionTypes } from "openblocks-core";
import { ReactElement, useContext } from "react";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { JSONValue } from "util/jsonTypes";
import { Section, sectionNames } from "openblocks-design";
import { getAllCompItems, IContainer } from "../containerBase";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import { GridItemsType } from "../containerComp/containerView";
import { CanvasView } from "../gridLayoutComp/canvasView";
import IOComp from "./ioComp/ioComp";
import { ModuleContainerComp } from "./moduleContainerComp";
import { ModuleEventComp } from "./moduleEventListComp";
import ModuleMethodListComp from "./moduleMethodListComp";
import { ConfigViewWrapper } from "./styled";
import { CNRootContainer } from "constants/styleSelectors";
import styled from "styled-components";

export const MODULE_LAYOUT_COMP = "@moduleLayoutComp";

const ModulePreviewWrapper = styled.div`
  height: 100%;
`;

const defaultHeight = 57;
const defaultWidth = 24;

const childrenMap = {
  io: IOComp,
  methods: ModuleMethodListComp,
  events: ModuleEventComp,
  autoScaleCompHeight: BoolControl,
  container: ModuleContainerComp,
  containerSize: valueComp({
    height: defaultHeight,
    width: defaultWidth,
  }),
  containerRowCount: valueComp<number>(Infinity),
  positionParams: stateComp<PositionParams>(DEFAULT_POSITION_PARAMS),
};

interface IProps {
  containerView: ReactElement;
  containerSize: { height: number; width: number };
  positionParams: PositionParams;
  onLayoutChange: (layout: Layout) => void;
  onPositionParamsChange: (params: PositionParams) => void;
}

const moduleContainerId = "moduleContainer";

function ModuleLayoutView(props: IProps) {
  const { containerSize, containerView, positionParams, onPositionParamsChange, onLayoutChange } =
    props;
  const { readOnly } = useContext(ExternalEditorContext);

  if (readOnly) {
    return (
      <ModulePreviewWrapper className={CNRootContainer}>{props.containerView}</ModulePreviewWrapper>
    );
  }

  const layout = {
    [moduleContainerId]: {
      i: moduleContainerId,
      h: containerSize.height,
      w: containerSize.width,
      x: 0,
      y: 0,
      resizeHandles: ["se"] as ResizeHandleAxis[],
      delayCollision: true,
    },
  };

  const items: GridItemsType = {
    [moduleContainerId]: {
      name: moduleContainerId,
      compType: "moduleContainer",
      view: containerView,
      autoHeight: false,
      hidden: false,
    },
  };

  return (
    <CanvasView
      layout={layout}
      items={items}
      positionParams={positionParams}
      onPositionParamsChange={onPositionParamsChange}
      dispatch={_.noop}
      onLayoutChange={onLayoutChange}
      extraHeight="0px"
    />
  );
}

export const ModuleLayoutCompBase = new UICompBuilder(childrenMap, () => null).build();

export class ModuleLayoutComp extends ModuleLayoutCompBase implements IContainer {
  getView(): JSX.Element {
    const isRowCountLocked = this.children.autoScaleCompHeight.getView();
    const rowCount = this.children.containerRowCount.getView();
    return (
      <ModuleLayoutView
        positionParams={this.children.positionParams.getView()}
        containerSize={this.children.containerSize.getView()}
        containerView={this.children.container.containerView({
          rowCount,
          isRowCountLocked,
          onRowCountChange: (rowCount) => {
            this.children.containerRowCount.dispatchChangeValueAction(rowCount);
          },
        })}
        onPositionParamsChange={(params) => {
          setTimeout(() => this.children.positionParams.dispatchChangeValueAction(params));
        }}
        onLayoutChange={(layout) => {
          this.children.containerSize.dispatchChangeValueAction({
            height: layout[moduleContainerId].h,
            width: layout[moduleContainerId].w,
          });
        }}
      />
    );
  }
  getPropertyView() {
    return (
      <>
        <Section name={sectionNames.basic}>
          {this.children.autoScaleCompHeight.propertyView({
            label: trans("module.autoScaleCompHeight"),
          })}
        </Section>
        {this.children.io.getInputTestView()}
        {this.children.methods.getTestView()}
        {this.children.events.getTestView()}
      </>
    );
  }
  getConfigView() {
    return (
      <ConfigViewWrapper>
        {this.children.io.getPropertyView()}
        {this.children.methods.getPropertyView()}
        {this.children.events.getPropertyView()}
      </ConfigViewWrapper>
    );
  }

  triggerEvent(name: string) {
    this.children.events.trigger(name);
  }

  reduce(action: CompAction<any>) {
    if (action.type === CompActionTypes.TRIGGER_MODULE_EVENT) {
      this.triggerEvent(action.name);
      return this;
    }
    return super.reduce(action);
  }

  nameAndExposingInfo() {
    const compMap = this.getAllCompItems();
    const result: NameAndExposingInfo = {};
    Object.values(compMap).forEach((item) => {
      result[item.children.name.getView()] = item.exposingInfo();
    });
    return {
      ...result,
      ...this.children.io.nameAndExposingInfo(),
      ...this.children.events.nameAndExposingInfo(),
    };
  }

  getPositionParams() {
    return this.children.positionParams.getView();
  }

  getEvents() {
    return this.children.events.children.list.getView();
  }

  getInputs() {
    return this.children.io.children.inputs.getView();
  }

  getOutputs() {
    return this.children.io.children.outputs.getView();
  }

  realSimpleContainer(key?: string | undefined): SimpleContainerComp | undefined {
    return this.children.container.realSimpleContainer(key);
  }

  findContainer(key: string): IContainer | undefined {
    return this.children.container.findContainer(key);
  }

  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    return this.children.container.getPasteValue(nameGenerator);
  }

  getCompTree() {
    return this.children.container.getCompTree();
  }

  getAllCompItems() {
    return getAllCompItems(this.getCompTree());
  }
}
