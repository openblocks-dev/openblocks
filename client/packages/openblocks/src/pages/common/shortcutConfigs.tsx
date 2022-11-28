import { trans } from "../../i18n";
import _ from "lodash";
import { KeyConfig, configKeyString, eventKeyString, isFilterInputTarget } from "util/keyUtils";

export type ShortcutTarget = "global" | "editor";

export type ShortcutAction =
  | "toggleShortcutList"
  | "toggleLeftPanel"
  | "toggleBottomPanel"
  | "toggleRightPanel"
  | "toggleAllPanels"
  | "preview"
  | "undo"
  | "redo"
  | "selectAllComps"
  | "copyComps"
  | "cutComps"
  | "pasteComps"
  | "deleteComps"
  | "deselectComps"
  | "executeQuery";

export type ShortcutConfig = {
  name: string;
  keys: KeyConfig[];
  target?: ShortcutTarget;
  action?: ShortcutAction;
};

export type ShortcutGroupConfig = {
  name: string;
  shortcuts: ShortcutConfig[];
};

export const allShortcutGroups: ShortcutGroupConfig[] = [
  {
    name: trans("shortcut.global"),
    shortcuts: [
      {
        name: trans("shortcut.toggleShortcutList"),
        keys: [{ key: "?" }],
        target: "global",
        action: "toggleShortcutList",
      },
    ],
  },
  {
    name: trans("shortcut.editor"),
    shortcuts: [
      {
        name: trans("shortcut.toggleLeftPanel"),
        keys: [{ mod: true, key: "B" }],
        target: "global",
        action: "toggleLeftPanel",
      },
      {
        name: trans("shortcut.toggleBottomPanel"),
        keys: [{ mod: true, key: "J" }],
        target: "global",
        action: "toggleBottomPanel",
      },
      {
        name: trans("shortcut.toggleRightPanel"),
        keys: [{ mod: true, key: "U" }],
        target: "global",
        action: "toggleRightPanel",
      },
      {
        name: trans("shortcut.toggleAllPanels"),
        keys: [{ mod: true, key: "." }],
        target: "global",
        action: "toggleAllPanels",
      },
      {
        name: trans("shortcut.preview"),
        keys: [{ mod: true, shift: true, key: "P" }],
        target: "global",
        action: "preview",
      },
      {
        name: trans("shortcut.undo"),
        keys: [{ mod: true, key: "Z" }],
        target: "global",
        action: "undo",
      },
      {
        name: trans("shortcut.redo"),
        keys: [{ mod: true, shift: true, key: "Z" }],
        target: "global",
        action: "redo",
      },
      { name: trans("shortcut.showGrid"), keys: [{ mod: true }] },
    ],
  },
  {
    name: trans("shortcut.component"),
    shortcuts: [
      { name: trans("shortcut.multiSelect"), keys: [{ mod: true, click: true }] },
      {
        name: trans("shortcut.selectAll"),
        keys: [{ mod: true, key: "A" }],
        target: "editor",
        action: "selectAllComps",
      },
      {
        name: trans("shortcut.copy"),
        keys: [{ mod: true, key: "C" }],
        target: "editor",
        action: "copyComps",
      },
      {
        name: trans("shortcut.cut"),
        keys: [{ mod: true, key: "X" }],
        target: "editor",
        action: "cutComps",
      },
      {
        name: trans("shortcut.paste"),
        keys: [{ mod: true, key: "V" }],
        target: "editor",
        action: "pasteComps",
      },
      { name: trans("shortcut.move"), keys: [{ directionKey: true }] },
      { name: trans("shortcut.zoom"), keys: [{ mod: true, directionKey: true }] },
      {
        name: trans("shortcut.delete"),
        keys: [{ key: "Delete" }, { key: "Backspace" }],
        target: "global",
        action: "deleteComps",
      },
      {
        name: trans("shortcut.deSelect"),
        keys: [{ key: "Escape" }],
        target: "editor",
        action: "deselectComps",
      },
    ],
  },
  {
    name: trans("shortcut.queryEditor"),
    shortcuts: [
      {
        name: trans("shortcut.excuteQuery"),
        keys: [{ mod: true, key: "Enter", notFilterInput: true }],
        target: "global",
        action: "executeQuery",
      },
    ],
  },
  {
    name: trans("shortcut.editBox"),
    shortcuts: [
      { name: trans("shortcut.formatting"), keys: [{ mod: true, key: "L" }] },
      { name: trans("shortcut.openInLeftPanel"), keys: [{ mod: true, click: true }] },
    ],
  },
];
const shortcutTargetKeyMap = _.mapValues(
  _.groupBy(
    allShortcutGroups.flatMap((group) => group.shortcuts).filter((s) => s.target && s.action),
    (s) => s.target
  ),
  (list) =>
    Object.fromEntries(list.flatMap((s) => s.keys.map((k) => [configKeyString(k), [s.action, k]])))
) as Record<ShortcutTarget, Record<string, [ShortcutAction, KeyConfig]>>;

export function getShortcutAction(
  e: React.KeyboardEvent | KeyboardEvent,
  shortcutTarget: ShortcutTarget
) {
  const map = shortcutTargetKeyMap[shortcutTarget];
  const keyString = eventKeyString(e);
  if (map.hasOwnProperty(keyString)) {
    const [action, keyConfig] = map[keyString];
    if (keyConfig.notFilterInput || !isFilterInputTarget(e)) {
      return action as ShortcutAction;
    }
  }
  return "";
}
