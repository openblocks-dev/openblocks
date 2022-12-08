import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { generate } from "@ant-design/colors";

extend([namesPlugin]);

// Color Palette
export const constantColors = [
  { id: 1, color: "#6D83F2" },
  { id: 2, color: "#5589F2" },
  { id: 3, color: "#36B389" },
  { id: 4, color: "#E68E50" },
  { id: 5, color: "#E67373" },
  { id: 6, color: "#F5FFF7" },
  { id: 7, color: "#F3FAFF" },
  { id: 8, color: "#FFF6E6" },
  { id: 9, color: "#F5F5F6" },
  { id: 10, color: "#FFFFFF" },
];

export const chartColorPalette = [
  "#4C64D9",
  "#30A1F2",
  "#fac858",
  "#ee6666",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
  "#91cc75",
];

const toRGBA = (color: string) => {
  return colord(color).toRgbString();
};
const toHex = (color: string) => {
  return colord(color).toHex().toUpperCase();
};
const alphaOfRgba = (rgba: string) => {
  return colord(rgba).alpha().toString();
};

const isValidColor = (str: string) => {
  return colord(str).isValid();
};

export const isDarkColor = (colorStr: string) => {
  return brightnessCompare(colorStr, 0.75);
};

// judge color is bright
const brightnessCompare = (colorStr: string, intensity: number) => {
  const color = colord(colorStr);
  return color.brightness() < intensity;
};

/**
 * generate active color.
 * @remarks
 * get the 7th color according to the antd design
 * @see {@link https://ant-design.antgroup.com/docs/spec/colors}
 */
export const genActiveColor = (color: string) => {
  return (generate(color)[6] || darkenColor(color, 0.1)).toUpperCase();
};

/**
 * generate hover color
 * @remark
 * get the 5th color according to the antd desgin
 * @see {@link https://ant-design.antgroup.com/docs/spec/colors}
 */
export const genHoverColor = (color: string) => {
  return (generate(color)[4] || lightenColor(color, 0.1)).toUpperCase();
};

// make color lighter
export const lightenColor = (colorStr: string, intensity: number) => {
  const color = colord(colorStr);
  return color.lighten(intensity).toHex().toUpperCase();
};

export const fadeColor = (colorStr: string, alpha: number) => {
  const color = colord(colorStr);
  return color.alpha(alpha).toHex().toUpperCase();
};

// make color darker
export const darkenColor = (colorStr: string, intensity: number) => {
  const color = colord(colorStr);
  return color.darken(intensity).toHex().toUpperCase();
};

export { toRGBA, toHex, alphaOfRgba, isValidColor };
