import { PositionParams } from "./calculateUtils";
import { LayoutOps } from "./layoutOpUtils";
import { ExtraLayout, Layout } from "./utils";

export type FlyStartInfo = {
  readonly flyStartLayout: Layout;
  readonly flyItemKeys: string[];
  readonly sourceLayoutFn: () => Layout;
  readonly flyExtraLayout: ExtraLayout;
  readonly flyLeftAdjItems: Record<string, string[]>;
  readonly flyPositionParams: PositionParams;
  readonly flyStartOffsetX: number;
  readonly flyStartOffsetY: number;
  readonly flyItemI: string;
  readonly flyStartRecoverFn: () => void;
};

export type FlyOverInfo = {
  readonly layoutRef: React.RefObject<HTMLDivElement>;
  readonly switchFn: (flyOverInfo?: FlyOverInfo) => void;
  readonly dropFn: () => void;
  readonly innerHeight: number;
  readonly startOps?: LayoutOps;
};
