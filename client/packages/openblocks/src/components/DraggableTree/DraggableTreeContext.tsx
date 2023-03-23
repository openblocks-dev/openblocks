import React from "react";

export interface DraggableTreeContextValue {
  disable?: boolean;
  unfoldAll?: boolean;
  itemHeight?: number;
  positionLineHeight?: number;
  showPositionLineDot?: boolean;
  positionLineDotDiameter?: number;
  showSubInDragOverlay?: boolean;
  showDropInPositionLine?: boolean;
  positionLineIndent?(path: number[], dropInAsSub: boolean): number;

  toggleFold(id: string): void;
  foldedStatus: Record<string, boolean>;
}
export const DraggableTreeContext = React.createContext<DraggableTreeContextValue>({
  toggleFold: () => {},
  foldedStatus: {},
});
