//window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
import { ReactComponent as CELogo } from "./logo.svg";
import { ReactComponent as CELogoWithName } from "./logo-with-name.svg";

export { default as favicon } from "./favicon.ico";

export const Logo = (props: { branding?: boolean }) => {
  return <CELogo />;
};
export const LogoWithName = (props: { branding?: boolean }) => {
  return <CELogoWithName />;
};
