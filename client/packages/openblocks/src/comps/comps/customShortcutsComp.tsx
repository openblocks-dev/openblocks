import { ActionSelectorControl } from "comps/controls/actionSelector/actionSelectorControl";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { KeyValueItem, KeyValueItemListWithNewCreateState } from "components/KeyValueItemList";
import { list } from "comps/generators/list";
import { StyledInput } from "openblocks-design";
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
  propertyView(props: {
    key: string | number;
    del?: () => void;
    defaultShowPopover: boolean;
  }): ReactNode {
    return (
      <KeyValueItem
        key={props.key}
        del={props.del}
        defaultShowPopover={props.defaultShowPopover}
        name={readableShortcut(this.children.shortcut.getView())}
        value={this.children.action.displayName()}
        clickPopoverContent={
          <>
            {this.children.shortcut.propertyView({
              label: trans("customShortcut.shortcut"),
              tooltip: (
                <>
                  {/* eslint-disable-next-line only-ascii/only-ascii */}
                  {"⌃: Ctrl"}
                  <br />
                  {/* eslint-disable-next-line only-ascii/only-ascii */}
                  {"⌥: Alt"}
                  <br />
                  {/* eslint-disable-next-line only-ascii/only-ascii */}
                  {`Mod: ⌘ (Mac), Ctrl (${trans("customShortcut.otherPlatform")})`}
                  <br />
                  {/* eslint-disable-next-line only-ascii/only-ascii */}
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
      <KeyValueItemListWithNewCreateState
        title={trans("customShortcut.title")}
        keyTitle={trans("customShortcut.shortcut")}
        valueTitle={trans("customShortcut.action")}
        onAdd={() => this.handleAdd()}
        emptyText={trans("customShortcut.empty")}
      >
        {(newCreateIdx) =>
          super.getView().map((item, i) =>
            item.propertyView({
              key: i,
              del: () => this.dispatch(this.deleteAction(i)),
              defaultShowPopover: i === newCreateIdx,
            })
          )
        }
      </KeyValueItemListWithNewCreateState>
    );
  }
}
