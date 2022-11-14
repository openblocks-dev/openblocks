import {
  Decoration,
  DecorationSet,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { getIconViewByValue } from "openblocks-design";
import ReactDOM from "react-dom";
import styled from "styled-components";

const IconContainer = styled.div`
  display: inline-flex;
  vertical-align: middle;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: auto;
  padding: 2px;
  margin: -1px 1px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #ebebeb;
  background: transparent;
  ::selection: {
    background: red;
  }
`;

export const iconWidgetClass = "cm-icon-widget-cls";

class IconWidget extends WidgetType {
  constructor(readonly value: string) {
    super();
  }

  eq(other: IconWidget) {
    return other.value === this.value;
  }

  toDOM() {
    let wrap = document.createElement("span");
    ReactDOM.render(
      <IconContainer className={iconWidgetClass}>{getIconViewByValue(this.value)}</IconContainer>,
      wrap
    );
    return wrap;
  }

  ignoreEvent() {
    return false;
  }
}

export const iconRegexp = /"\/icon:[/0-9a-zA-Z_-]+"/g;

const iconMatcher = new MatchDecorator({
  regexp: iconRegexp,
  decoration: (match) => Decoration.replace({ widget: new IconWidget(match[0]) }),
});

const iconExtension = ViewPlugin.fromClass(
  class {
    icons: DecorationSet;
    constructor(view: EditorView) {
      this.icons = iconMatcher.createDeco(view);
    }
    update(update: ViewUpdate) {
      this.icons = iconMatcher.updateDeco(update, this.icons);
    }
  },
  {
    decorations: (v) => v.icons,
    provide: (p) => EditorView.atomicRanges.of((view) => view.plugin(p)?.icons || Decoration.none),
  }
);

export function getIconExtension(enableIcon?: boolean) {
  return enableIcon ? iconExtension : [];
}
