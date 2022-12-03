import { Comp } from "openblocks-core";
import { EditorState } from "comps/editorState";
import { ReactNode } from "react";

export enum BottomResTypeEnum {
  Query = "query",
  TempState = "tempState",
  Transformer = "transformer",
}

export interface BottomResListComp {
  add: (editorState: EditorState, extraInfo?: any) => void;
  copy: (editorState: EditorState, name: string) => void;
  delete: (name: string) => void;
  items: () => BottomResComp[];
}

export type BottomResCompResultDataType = "json" | "function" | "default";

export interface BottomResCompResult {
  success: boolean;
  title?: ReactNode;
  errorMessage?: string;
  data: any;
  dataType: BottomResCompResultDataType;
  runTime?: number;
}

export interface BottomResComp extends Comp<any> {
  name(): string;

  type(): BottomResTypeEnum;

  icon(): ReactNode;

  order(): number;

  result(): BottomResCompResult | null;
}
