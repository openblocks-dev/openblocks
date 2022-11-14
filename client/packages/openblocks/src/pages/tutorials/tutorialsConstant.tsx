import { Styles } from "react-joyride";
import { Layers } from "constants/Layers";
import { Props as FloaterType } from "react-floater";

export const leftCompListClassName = "joyride-left-comp-list";
export const tableDragClassName = "joyride-table-drag-icon";
export const editorContentClassName = "joyride-editor-content";
export const tableDataDivClassName = "joyride-table-data-div";
export const editorBottomClassName = "joyride-editor-bottom";

export const defaultJoyrideStyles: Styles = {
  options: {
    arrowColor: "#4965F2",
    overlayColor: "rgba(0, 0, 0, 0.4)",
    zIndex: Layers.tutorials,
  },
};

export const defaultJoyrideFloaterProps: FloaterType = {
  styles: {
    arrow: {
      length: 8,
      spread: 12,
    },
    floater: {
      filter: "unset",
    },
  },
};

export type UserGuideLocationState = {
  showNewUserGuide?: boolean;
};
