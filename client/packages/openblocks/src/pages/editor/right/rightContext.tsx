import { createContext } from "react";

/**
 * Context for right panel
 */
export const RightContext = createContext<{
  searchValue: string;
  onDrag: (dragCompKey: string) => void;
}>({
  searchValue: "",
  onDrag: () => {},
});
