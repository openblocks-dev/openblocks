import { CSSProperties } from "react";
import { calcGridColWidth, PositionParams } from "./calculateUtils";
import { Position, setTransform } from "./utils";

interface GridLineProps {
  position: Position;
  positionParams: PositionParams;
  lineColor: string;
}

function setBackgroundProps(positionParams: PositionParams, lineColor: string): CSSProperties {
  const { rowHeight } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  return {
    backgroundImage: `repeating-linear-gradient(to right, ${lineColor} 0px 1px, transparent 1px ${colWidth}px)
      , repeating-linear-gradient(to bottom, ${lineColor} 0px 1px, transparent 1px ${rowHeight}px)
    `,
    // border: "1px solid black",
  };
}

export function GridLines(props: GridLineProps) {
  const style = {
    ...setTransform(props.position),
    ...setBackgroundProps(props.positionParams, props.lineColor),
  };
  return <div style={style} />;
}
