import { ColorSelect, TacoInput } from "openblocks-design";
import { isValidColor, toHex } from "openblocks-design";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ConfigItem, Radius } from "../styledComponents";

export type configChangeParams = {
  colorKey: string;
  color?: string;
  radius?: string;
};

type ColorConfigProps = {
  colorKey: string;
  name?: string;
  desc?: string;
  color?: string;
  radius?: string;
  configChange: (params: configChangeParams) => void;
};

export default function ColorConfig(props: ColorConfigProps) {
  const { colorKey, name, desc, color: defaultColor, radius: defaultRadius, configChange } = props;
  const configChangeWithDebounce = _.debounce(configChange, 0);
  const [color, setColor] = useState(defaultColor);
  const [radius, setRadius] = useState(defaultRadius);
  let varName = "";
  if (colorKey === "textDark") {
    varName += "(textDark textLight)";
  } else if (colorKey === "textLight") {
    varName = "";
  } else {
    varName += `(${colorKey})`;
  }

  const colorInputBlur = () => {
    if (!color || !isValidColor(color)) {
      setColor(defaultColor);
    } else {
      setColor(toHex(color));
      configChange({ colorKey, color: toHex(color) });
    }
  };

  const radiusInputBlur = (radius: string) => {
    let result = "";
    if (!radius || Number(radius) === 0) {
      result = "0";
    } else if (/^[0-9]+$/.test(radius)) {
      result = Number(radius) + "px";
    } else if (/^[0-9]+(px|%)$/.test(radius)) {
      result = radius;
    } else {
      result = "0";
    }
    setRadius(result);
    configChange({ colorKey, radius: result });
  };

  useEffect(() => {
    if (color && isValidColor(color)) {
      configChangeWithDebounce({ colorKey, color });
    }
  }, [color]);

  // reset
  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  useEffect(() => {
    setRadius(defaultRadius);
  }, [defaultRadius]);

  return (
    <ConfigItem className={colorKey === "textLight" ? "text-light" : ""}>
      <div className="text-desc">
        <div className="name">
          {name} <span>{varName}</span>
        </div>
        <div className="desc">{desc}</div>
      </div>
      {colorKey !== "borderRadius" ? (
        <div className="config-input">
          <ColorSelect changeColor={setColor} color={color!} trigger="hover" />
          <TacoInput
            value={color}
            onChange={(e) => setColor(e.target.value)}
            onBlur={colorInputBlur}
            onKeyUp={(e) => e.nativeEvent.key === "Enter" && colorInputBlur()}
          />
        </div>
      ) : (
        <div className="config-input">
          <Radius radius={defaultRadius || "0"}>
            <div>
              <div />
            </div>
          </Radius>
          <TacoInput
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            onBlur={(e) => radiusInputBlur(e.target.value)}
            onKeyUp={(e) => e.nativeEvent.key === "Enter" && radiusInputBlur(e.currentTarget.value)}
          />
        </div>
      )}
    </ConfigItem>
  );
}
