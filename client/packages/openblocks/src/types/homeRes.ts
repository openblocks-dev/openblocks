export enum HomeResTypeEnum {
  All = 0,
  Application = 1,
  Module = 2,
  NavLayout = 3,
  Folder = 4,
  MobileTabLayout = 6,
  Navigation = 7,
}

export type HomeResKey = keyof typeof HomeResTypeEnum;

export const NavigationTypes = [
  HomeResTypeEnum.NavLayout,
  HomeResTypeEnum.MobileTabLayout,
] as const;
export type NavigationType = typeof NavigationTypes[number];
