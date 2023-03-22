import React from "react";

export interface DraggableTreeContextValue {
  disable?: boolean;
  itemHeight?: number;
  positionLineHeight?: number;
  showPositionLineDot?: boolean;
  positionLineDotDiameter?: number;
  showSubInDragOverlay?: boolean;
  positionLineIndent?(path: number[], dropInAsSub: boolean): number;
}
export const DraggableTreeContext = React.createContext<DraggableTreeContextValue>({});
