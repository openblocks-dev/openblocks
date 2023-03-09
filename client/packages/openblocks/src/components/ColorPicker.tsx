import _ from "lodash";
import { useEffect, useState } from "react";
import { ConfigItem, Radius } from "../pages/setting/theme/styledComponents";
import { isValidColor, toHex } from "components/colorSelect/colorUtils";
import { ColorSelect } from "components/colorSelect";
import { TacoInput } from "components/tacoInput";

export type configChangeParams = {
  colorKey: string;
  color?: string;
  radius?: string;
  chart?: string;
};

type ColorConfigProps = {
  className?: string;
  colorKey: string;
  name?: string;
  desc?: string;
  color?: string;
  radius?: string;
  configChange: (params: configChangeParams) => void;
  showVarName?: boolean;
};

export default function ColorPicker(props: ColorConfigProps) {
  const {
    colorKey,
    name,
    desc,
    color: defaultColor,
    radius: defaultRadius,
    configChange,
    showVarName = true,
  } = props;
  const configChangeWithDebounce = _.debounce(configChange, 0);
  const [color, setColor] = useState(defaultColor);
  const [radius, setRadius] = useState(defaultRadius);
  const varName = `(${colorKey})`;

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
    <ConfigItem className={props.className}>
      <div className="text-desc">
        <div className="name">
          {name} {showVarName && <span>{varName}</span>}
        </div>
        <div className="desc">{desc}</div>
      </div>
      {colorKey !== "borderRadius" ? (
        <div className="config-input">
          <ColorSelect
            changeColor={_.debounce(setColor, 500, {
              leading: true,
              trailing: true,
            })}
            color={color!}
            trigger="hover"
          />
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
