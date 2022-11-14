import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import { getAllCompItems } from "../containerBase/utils";
import { gridItemCompToGridItems } from "../containerComp/containerView";
import { CanvasView } from "./canvasView";

export class AppLayoutComp extends SimpleContainerComp {
  getView() {
    const { items, ...otherContainerProps } = super.getView();
    return (<CanvasView {...otherContainerProps} items={gridItemCompToGridItems(items)} />) as any;
  }

  getPositionParams() {
    return this.children.positionParams.getView();
  }

  getAllCompItems() {
    return getAllCompItems(this.getCompTree());
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    const compMap = this.getAllCompItems();
    const result: NameAndExposingInfo = {};
    Object.values(compMap).forEach((item) => {
      result[item.children.name.getView()] = item.exposingInfo();
    });
    return result;
  }
}
