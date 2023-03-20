import { trans } from "i18n";
import React from "react";
import { HTMLAttributes } from "react";
import { isMac } from "./commonUtils";

export function modKeyPressed(
  e: React.KeyboardEvent | React.MouseEvent | React.TouchEvent | KeyboardEvent | MouseEvent
) {
  return isMac ? e.metaKey : e.ctrlKey;
}

// eslint-disable-next-line only-ascii/only-ascii
const modKey = isMac ? "⌘" : "Ctrl";
export const undoKey = `${modKey} Z`;
export const pasteKey = `${modKey} V`;

export function selectCompModifierKeyPressed(
  e: React.KeyboardEvent | React.MouseEvent | React.TouchEvent | KeyboardEvent | MouseEvent
) {
  return modKeyPressed(e) || e.shiftKey;
}

export type KeyConfig = {
  mod?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  key?: string;
  click?: boolean;
  directionKey?: boolean;
  // by default, the focusing editor's event will be ignored. set as true otherwise.
  notFilterInput?: boolean;
};

const eventCodeMap: Record<string, string> = {
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
  NumpadAdd: "+",
  NumpadSubtract: "-",
  NumpadMultiply: "*",
  NumpadDivide: "/",
  NumpadEqual: "=",
  NumpadDecimal: ".",
  NumpadComma: ",",
  NumpadEnter: "Enter",
  // ignore modifiers
  MetaLeft: "",
  MetaRight: "",
  OSLeft: "",
  OSRight: "",
  ControlLeft: "",
  ControlRight: "",
  AltLeft: "",
  AltRight: "",
  ShiftLeft: "",
  ShiftRight: "",
};

const codePrefixes = ["Key", "Digit", "Numpad"];

function normalizeKey(e: React.KeyboardEvent | KeyboardEvent) {
  // only shift+(single character)
  if (e.shiftKey && !(e.metaKey || e.ctrlKey || e.altKey) && e.key.length === 1) {
    const charCode = e.key.charCodeAt(0);
    // ASCII character (exclude space), use upper case
    if (charCode > 32 && charCode < 127) {
      return e.key.toUpperCase();
    }
    // converts CJK fullwidth characters to halfwidth characters (fix key when using CJK input method).
    if (charCode > 65280 && charCode < 65375) {
      return String.fromCharCode(charCode - 65248).toUpperCase();
    }
  }
  const code = e.code;
  const v = eventCodeMap[code];
  if (v !== undefined) {
    return v;
  }
  for (const p of codePrefixes) {
    if (code.length === p.length + 1 && code.startsWith(p)) {
      return code.slice(p.length);
    }
  }
  return code;
}

// store shortcut in DSL, not change it
function normalizeShortcut(
  mod: boolean,
  metaKey?: boolean,
  ctrlKey?: boolean,
  altKey?: boolean,
  shiftKey?: boolean,
  key = ""
): string {
  return [
    ...(mod ? ["Mod"] : [metaKey ? "Meta" : "", ctrlKey ? "Ctrl" : ""]),
    altKey ? "Alt" : "",
    // If press only shift+(single character), shift is ignored.
    shiftKey && (mod || metaKey || ctrlKey || altKey || key.length !== 1) ? "Shift" : "",
    key,
  ]
    .filter((t) => t)
    .join(" ");
}

export function eventKeyString(e: React.KeyboardEvent | KeyboardEvent) {
  return normalizeShortcut(false, e.metaKey, e.ctrlKey, e.altKey, e.shiftKey, normalizeKey(e));
}

export function configKeyString(c: KeyConfig) {
  return normalizeShortcut(
    false,
    c.mod && isMac,
    c.ctrl || (c.mod && !isMac),
    c.alt,
    c.shift,
    c.key
  );
}

export function eventToShortcut(e: React.KeyboardEvent | KeyboardEvent) {
  // In Mac, press command means Mod (Command - Mac, Ctrl - other)
  return normalizeShortcut(
    isMac && e.metaKey,
    e.metaKey,
    e.ctrlKey,
    e.altKey,
    e.shiftKey,
    normalizeKey(e)
  );
}

export function shortcutToKeyString(shortcut: string) {
  return shortcut
    .split(" ")
    .map((s) => (s === "Mod" ? (isMac ? "Meta" : "Ctrl") : s))
    .join(" ");
}

/* eslint-disable only-ascii/only-ascii */
const displayKey: Record<string, string> = {
  Mod: "Mod ",
  Meta: isMac ? "⌘" : "Meta ",
  Ctrl: "⌃",
  Alt: "⌥",
  Shift: "⇧",
  Space: trans("customShortcut.space"),
  Enter: "⏎",
  Escape: "ESC",
  Delete: "DEL",
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓",
};
/* eslint-enable only-ascii/only-ascii */

export function readableShortcut(shortcut: string) {
  return shortcut
    .split(" ")
    .map((s) => displayKey[s] ?? s)
    .join("")
    .trim();
}

export function isFilterInputTarget(e: React.KeyboardEvent | KeyboardEvent) {
  const target = e.target as HTMLElement;
  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "SELECT" ||
    tagName === "TEXTAREA"
  );
}

export function isDirectionKey(e: React.KeyboardEvent) {
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      return true;
  }
  return false;
}

export function ShortcutsWrapper(props: HTMLAttributes<HTMLDivElement> & { disabled?: boolean }) {
  const { disabled, ...rest } = props;
  const divProps = disabled ? { children: props.children } : rest;
  return <div {...divProps} tabIndex={-1} />;
}

type GlobalWrapperProps = {
  disabled?: boolean;
  onKeyDownCapture?: (e: KeyboardEvent) => void;
  onKeyUpCapture?: (e: KeyboardEvent) => void;
  onMouseMoveCapture?: (e: MouseEvent) => void;
  onMouseDownCapture?: (e: MouseEvent) => void;
};

export class GlobalShortcutsWrapper extends React.Component<GlobalWrapperProps> {
  constructor(props: GlobalWrapperProps) {
    super(props);
    this.onKeyDownCapture = this.onKeyDownCapture.bind(this);
    this.onKeyUpCapture = this.onKeyUpCapture.bind(this);
    this.onMouseMoveCapture = this.onMouseMoveCapture.bind(this);
    this.onMouseDownCapture = this.onMouseDownCapture.bind(this);
  }
  onKeyDownCapture(e: KeyboardEvent) {
    if (this.props.disabled) {
      return;
    }
    this.props.onKeyDownCapture?.(e);
  }
  onKeyUpCapture(e: KeyboardEvent) {
    if (this.props.disabled) {
      return;
    }
    this.props.onKeyUpCapture?.(e);
  }
  onMouseMoveCapture(e: MouseEvent) {
    if (this.props.disabled) {
      return;
    }
    this.props.onMouseMoveCapture?.(e);
  }
  onMouseDownCapture(e: MouseEvent) {
    if (this.props.disabled) {
      return;
    }
    this.props.onMouseDownCapture?.(e);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDownCapture, true);
    document.addEventListener("keyup", this.onKeyUpCapture, true);
    document.addEventListener("mousemove", this.onMouseMoveCapture, true);
    document.addEventListener("mousedown", this.onMouseDownCapture, true);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDownCapture, true);
    document.removeEventListener("keyup", this.onKeyUpCapture, true);
    document.removeEventListener("mousemove", this.onMouseMoveCapture, true);
    document.removeEventListener("mousedown", this.onMouseDownCapture, true);
  }
  render() {
    return (
      <div tabIndex={-1} style={{ height: "100%" }}>
        {this.props.children}
      </div>
    );
  }
}
