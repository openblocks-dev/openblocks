import React from "react";
import { HTMLAttributes } from "react";
import { isMac } from "./commonUtils";

export function modKeyPressed(
  e: React.KeyboardEvent | React.MouseEvent | React.TouchEvent | KeyboardEvent | MouseEvent
) {
  return isMac ? e.metaKey : e.ctrlKey;
}

const modKey = isMac ? "⌘" : "CTRL";
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

export function configKeyString(c: KeyConfig) {
  return keyString(c.mod && isMac, c.ctrl || (c.mod && !isMac), c.alt, c.shift, c.key);
}

export function eventKeyString(e: React.KeyboardEvent | KeyboardEvent) {
  return keyString(
    e.metaKey,
    e.ctrlKey,
    e.altKey,
    // keep shift + modifier the same as modifier
    e.shiftKey && (e.metaKey || e.ctrlKey || e.altKey),
    convertKey(e.key)
  );
}

function convertKey(s: string) {
  if (s.length === 1) {
    // transform Chinese chars to Latin chars, partly fix the key problem using Chinese input method software.
    const code = s.charCodeAt(0);
    if (code === 12288) {
      return String.fromCharCode(32);
    }
    if (code > 65280 && code < 65375) {
      return String.fromCharCode(code - 65248);
    }
  }
  return s;
}

function keyString(
  meta?: boolean,
  ctrl?: boolean,
  alt?: boolean,
  shift?: boolean,
  key?: string
): string {
  return [
    meta ? "meta" : "",
    ctrl ? "ctrl" : "",
    alt ? "alt" : "",
    shift ? "shift" : "",
    key ? key.toLowerCase() : "",
  ]
    .filter((t) => t)
    .join("+");
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
    return <div tabIndex={-1}>{this.props.children}</div>;
  }
}
