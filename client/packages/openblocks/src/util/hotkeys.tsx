import React, { CSSProperties } from "react";
import * as PropTypes from "prop-types";
import Hotkeys, { HotkeysEvent } from "hotkeys-js";

/**
 * copy from https://github.com/jaywcjlove/react-hotkeys/blob/master/src/index.tsx
 * - trigger target's hotkey when focusing on target; otherwise set global params
 * - default disable key-press events on `input` `select` `textarea`
 * - cmd + enter is allowed for query editor
 */

export type OnKeyFun = (shortcut: string, evn: KeyboardEvent, handle: HotkeysEvent) => void;

export interface IReactHotkeysProps {
  keyName?: string;
  filter?: (event: KeyboardEvent) => boolean;
  onKeyUp?: OnKeyFun;
  onKeyDown?: OnKeyFun;
  allowRepeat?: boolean;
  disabled?: boolean;
  splitKey?: string;
  global?: boolean;
  wrapperStyle?: CSSProperties;
}

export default class ReactHotkeys extends React.Component<
  IReactHotkeysProps,
  { enableHotKey: boolean }
> {
  public static defaultProps: IReactHotkeysProps = {
    filter(event: KeyboardEvent) {
      const target = (event.target as HTMLElement) || event.srcElement;
      const tagName = target.tagName;
      // log.log(event);
      if (event.metaKey && event.code === "Enter") {
        return true; // keyboard shortcuts for query
      } else {
        return !(
          target.isContentEditable ||
          tagName === "INPUT" ||
          tagName === "SELECT" ||
          tagName === "TEXTAREA"
        );
      }
    },
  };
  static propTypes = {
    keyName: PropTypes.string,
    filter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    splitKey: PropTypes.string,
  };
  public isKeyDown: boolean = false;
  public preKey: string = ""; // last pressed shortcut
  public handle: HotkeysEvent;
  state: {
    enableHotKey: boolean;
  };

  constructor(props: IReactHotkeysProps) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    this.handle = {} as HotkeysEvent;
    this.state = {
      enableHotKey: props.global || false,
    };
  }

  componentDidMount() {
    const { splitKey, filter } = this.props;
    if (filter) {
      Hotkeys.filter = filter;
    }

    Hotkeys.unbind(this.props.keyName as string);
    Hotkeys(this.props.keyName as string, { splitKey }, this.onKeyDown);
    document && document.body.addEventListener("keyup", this.handleKeyUpEvent);
  }

  componentWillUnmount() {
    Hotkeys.unbind(this.props.keyName as string);
    this.isKeyDown = true;
    this.handle = {} as HotkeysEvent;
    document && document.body.removeEventListener("keyup", this.handleKeyUpEvent);
  }

  onKeyUp(e: KeyboardEvent, handle: HotkeysEvent) {
    if (!this.state.enableHotKey) {
      return;
    }
    const { onKeyUp, disabled } = this.props;
    !disabled && onKeyUp && onKeyUp(handle.shortcut, e, handle);
  }

  onKeyDown(e: KeyboardEvent, handle: HotkeysEvent) {
    if (!this.state.enableHotKey) {
      return;
    }
    const { onKeyDown, allowRepeat, disabled } = this.props;
    const keyShortCut = handle.shortcut;
    // disallow repeating the same key
    if (this.isKeyDown && !allowRepeat && this.preKey === keyShortCut) return;
    this.preKey = keyShortCut;
    this.isKeyDown = true;
    this.handle = handle;
    !disabled && onKeyDown && onKeyDown(keyShortCut, e, handle);
  }

  handleKeyUpEvent(e: KeyboardEvent) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    if (this.props.keyName && this.props.keyName.indexOf(this.handle.shortcut) < 0) return;
    this.onKeyUp(e, this.handle);
    this.handle = {} as HotkeysEvent;
  }

  render() {
    const { global, wrapperStyle } = this.props;
    return (
      <div
        style={wrapperStyle}
        tabIndex={-1}
        onFocus={() => !global && this.setState({ enableHotKey: true })}
        onBlur={() => {
          !global && this.setState({ enableHotKey: false });
        }}
      >
        {this.props.children || null}
      </div>
    );
  }
}
