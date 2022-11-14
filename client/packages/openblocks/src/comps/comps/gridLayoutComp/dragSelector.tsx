import { Layers } from "constants/Layers";
import React, { ReactNode } from "react";

export type CheckSelectFn = (
  item?: HTMLDivElement | null,
  afterCheck?: (checkResult: boolean) => void
) => boolean;

export interface SectionProps {
  onMouseUp: () => void;
  onMouseDown: () => void;
  onMouseMove: (checkSelectFunc: CheckSelectFn) => void;
  children: ReactNode;
}

interface Point {
  x: number;
  y: number;
}

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface SectionState {
  mouseDown: boolean;
  selectionBox?: Rect;
  startPoint?: Point;
}

const InitialState = {
  mouseDown: false,
  appendMode: false,
  selectionBox: undefined,
  startPoint: undefined,
};

export class DragSelector extends React.Component<SectionProps, SectionState> {
  private readonly selectAreaRef: React.RefObject<HTMLDivElement>;

  constructor(props: SectionProps) {
    super(props);
    this.selectAreaRef = React.createRef<HTMLDivElement>();
    this.state = InitialState;
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  _onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.button === 2 || e.nativeEvent.which === 2) {
      return;
    }
    let nextState: SectionState = { mouseDown: false };
    nextState.mouseDown = true;
    nextState.startPoint = {
      x: e.pageX - (this.selectAreaRef.current?.getBoundingClientRect().left ?? 0),
      y: e.pageY - (this.selectAreaRef.current?.getBoundingClientRect().top ?? 0),
    };
    this.setState(nextState);
    window.document.addEventListener("mousemove", this._onMouseMove);
    window.document.addEventListener("mouseup", this._onMouseUp);
    this.props.onMouseDown();
  }

  _onMouseUp() {
    window.document.removeEventListener("mousemove", this._onMouseMove);
    window.document.removeEventListener("mouseup", this._onMouseUp);
    this.props.onMouseUp();
    this.setState(InitialState);
  }

  _onMouseMove(e: MouseEvent) {
    if (this.state.mouseDown) {
      let endPoint = {
        x: e.pageX - (this.selectAreaRef.current?.getBoundingClientRect().left ?? 0),
        y: e.pageY - (this.selectAreaRef.current?.getBoundingClientRect().top ?? 0),
      };
      this.setState({
        selectionBox: this._calculateSelectionBox(this.state.startPoint, endPoint),
      });
    }
    // Disable selection of text during mouse movement
    var selection = window.getSelection();
    selection!.removeAllRanges();
    selection = null;
    this.props.onMouseMove(this.childrenViewCheckFunc);
  }

  rectIntersect = (
    selectionBox: Rect | undefined,
    item: HTMLElement | null | undefined
  ): boolean => {
    if (!selectionBox || !item) {
      return false;
    }
    const itemBox = {
      top:
        item.getBoundingClientRect().top -
        (this.selectAreaRef.current?.getBoundingClientRect().top ?? 0),
      left:
        item.getBoundingClientRect().left -
        (this.selectAreaRef.current?.getBoundingClientRect().left ?? 0),
      width: item.getBoundingClientRect().width,
      height: item.getBoundingClientRect().height,
    };
    return (
      selectionBox.left <= itemBox.left + itemBox.width &&
      selectionBox.left + selectionBox.width >= itemBox.left &&
      selectionBox.top <= itemBox.top + itemBox.height &&
      selectionBox.top + selectionBox.height >= itemBox.top
    );
  };

  childrenViewCheckFunc = (
    item?: HTMLDivElement | null,
    afterCheck?: (checkResult: boolean) => void
  ) => {
    const result = this.rectIntersect(this.state.selectionBox, item);
    if (!!afterCheck) {
      afterCheck(result);
    }
    return result;
  };

  render() {
    return (
      <div
        ref={this.selectAreaRef}
        onMouseDown={this._onMouseDown.bind(this)}
        style={{ position: "relative" }}
      >
        {this.props.children}
        {this.renderSelectionBox()}
      </div>
    );
  }

  renderSelectionBox() {
    if (
      !this.state.mouseDown ||
      !this.state.startPoint ||
      !this.state.selectionBox ||
      !this.selectAreaRef.current
    ) {
      return null;
    }
    return (
      <div
        style={{
          background: "rgba(51, 119, 255, 0.1)",
          position: "absolute",
          zIndex: Layers.dragSelectBox,
          left: this.state.selectionBox.left,
          top: this.state.selectionBox.top,
          height: this.state.selectionBox.height,
          width: this.state.selectionBox.width,
        }}
      />
    );
  }

  _calculateSelectionBox(startPoint: Point | undefined, endPoint: Point) {
    if (!this.state.mouseDown || !startPoint || !endPoint) {
      return undefined;
    }
    let left = Math.min(startPoint.x, endPoint.x);
    let top = Math.min(startPoint.y, endPoint.y);
    let width = Math.abs(startPoint.x - endPoint.x);
    let height = Math.abs(startPoint.y - endPoint.y);
    return {
      left: left,
      top: top,
      width: width,
      height: height,
    };
  }
}
