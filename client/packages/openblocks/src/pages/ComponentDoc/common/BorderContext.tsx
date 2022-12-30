import { createContext } from "react";

export const BorderContext = createContext<{
  isBorderShow: boolean;
  showBorder: (A: (B: boolean) => boolean) => void;
}>({
  isBorderShow: false,
  showBorder: () => {},
});
