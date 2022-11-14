import styled from "styled-components";
import { Button } from "antd";
import { EventConfigType } from "openblocks-sdk";
import { trans } from "i18n/comps";

export const saveEvent: EventConfigType = {
  label: trans("imageEditor.save"),
  value: "save",
  description: trans("imageEditor.saveDesc"),
};

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .tui-image-editor-container.top .tui-image-editor-controls-logo {
    display: none;
  }
  .tui-image-editor-container .tui-image-editor-header-logo,
  .tui-image-editor-container .tui-image-editor-controls-logo {
    display: none;
  }
  .tui-image-editor-container .tui-image-editor-header-buttons button,
  .tui-image-editor-container .tui-image-editor-header-buttons div,
  .tui-image-editor-container .tui-image-editor-controls-buttons button,
  .tui-image-editor-container .tui-image-editor-controls-buttons div {
    display: none;
  }
  .tie-btn-hand {
    display: none !important;
  }
  .tui-image-editor-container .tui-image-editor-menu,
  .tui-image-editor-container .tui-image-editor-help-menu {
    background-color: #f3f4f6 !important;
  }
`;

export const EmbeddedButton = styled(Button)`
  position: absolute;
  right: 8px;
  bottom: 4px;
  z-index: 100;
`;

export const customTheme = {
  // image
  "common.bi.image": "",
  "common.bisize.width": "0px",
  "common.bisize.height": "0px",
  "common.backgroundImage": "none",
  "common.backgroundColor": "#f3f4f6",
  "common.border": "1px solid #444",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "#f3f4f6",
  "header.border": "0px",
  "header.display": "none",

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#151515",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
};
