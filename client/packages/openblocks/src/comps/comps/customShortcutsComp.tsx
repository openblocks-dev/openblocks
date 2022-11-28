import { ActionSelectorControl } from "comps/controls/actionSelector/actionSelectorControl";
import { MultiCompBuilder, valueComp } from "comps/generators";
import KeyValueItemList, { KeyValueItem } from "components/KeyValueItemList";
import LinkPlusButton from "components/LinkPlusButton";
import { list } from "comps/generators/list";
import { BluePlusIcon, StyledInput } from "openblocks-design";
import { trans } from "i18n";
import {
  eventKeyString,
  eventToShortcut,
  isFilterInputTarget,
  readableShortcut,
  shortcutToKeyString,
} from "util/keyUtils";
import { ReactNode } from "react";

class ShortcutControl extends valueComp<string>("") {
  override getPropertyView() {
    return (
      <StyledInput
        value={readableShortcut(this.getView())}
        placeholder={trans("customShortcut.placeholder")}
        onKeyDownCapture={(e) => {
          this.dispatchChangeValueAction(eventToShortcut(e));
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    );
  }
}

const childrenMap = {
  shortcut: ShortcutControl,
  action: ActionSelectorControl,
};

const ShortcutItemBase = new MultiCompBuilder(childrenMap, (props) => (keyString: string) => {
  if (keyString !== shortcutToKeyString(props.shortcut)) {
    return;
  }
  const actionHandler = props.action;
  if (!actionHandler) {
    return;
  }
  return actionHandler();
}).build();

class ShortcutItemComp extends ShortcutItemBase {
  propertyView(key: string | number, del?: () => void): ReactNode {
    return (
      <KeyValueItem
        key={key}
        del={del}
        name={readableShortcut(this.children.shortcut.getView())}
        value={this.children.action.displayName()}
        clickPopoverContent={
          <>
            {this.children.shortcut.propertyView({
              label: trans("customShortcut.shortcut"),
              tooltip: (
                <>
                  {"⌃: Ctrl"}
                  <br />
                  {"⌥: Alt"}
                  <br />
                  {`Mod: ⌘ (Mac), Ctrl (${trans("customShortcut.otherPlatform")})`}
                  <br />
                  {"⇧: Shift"}
                </>
              ),
            })}
            {this.children.action.propertyView({ label: trans("customShortcut.action") })}
          </>
        }
      />
    );
  }
}

export class CustomShortcutsComp extends list(ShortcutItemComp) {
  handleKeyEvent(e: KeyboardEvent) {
    const items = super.getView();
    if (items.length === 0) {
      return;
    }
    // skip text editor to avoid conflicts
    if (isFilterInputTarget(e)) {
      return;
    }
    const keyString = eventKeyString(e);
    const result: Promise<unknown>[] = [];
    items.forEach((item) => {
      const p = item.getView()(keyString);
      if (p) {
        result.push(p);
      }
    });
    if (result.length > 0) {
      // avoid conflicts with the browser's shortcut
      e.stopPropagation();
      e.preventDefault();
    }
  }
  private handleAdd() {
    this.dispatch(this.pushAction({}));
  }
  override getPropertyView() {
    return (
      <KeyValueItemList
        title={trans("customShortcut.title")}
        keyTitle={trans("customShortcut.shortcut")}
        valueTitle={trans("customShortcut.action")}
        extra={
          <LinkPlusButton icon={<BluePlusIcon />} onClick={() => this.handleAdd()}>
            {trans("addItem")}
          </LinkPlusButton>
        }
        emptyText={trans("customShortcut.empty")}
        onEmptyClick={() => this.handleAdd()}
      >
        {super
          .getView()
          .map((item, i) => item.propertyView(i, () => this.dispatch(this.deleteAction(i))))}
      </KeyValueItemList>
    );
  }
}
