export enum HomeResTypeEnum {
  All = 0,
  Application = 1,
  Module = 2,
  NavLayout = 3,
  Folder = 4,
}

export type HomeResKey = keyof typeof HomeResTypeEnum;
