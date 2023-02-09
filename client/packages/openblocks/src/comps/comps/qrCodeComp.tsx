import { RecordConstructorToView } from "openblocks-core";
import { BoolControl } from "comps/controls/boolControl";
import { stringExposingStateControl } from "comps/controls/codeStateControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { styleControl } from "comps/controls/styleControl";
import { QRCodeStyle } from "comps/controls/styleControlConstants";
import { UICompBuilder } from "comps/generators/uiCompBuilder";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import { QRCodeSVG } from "qrcode.react";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { StringControl } from "comps/controls/codeControl";

const levelOptions = [
  { label: trans("QRCode.L"), value: "L" },
  { label: trans("QRCode.M"), value: "M" },
  { label: trans("QRCode.Q"), value: "Q" },
  { label: trans("QRCode.H"), value: "H" },
] as const;

const childrenMap = {
  value: stringExposingStateControl("value"),
  level: dropdownControl(levelOptions, "L"),
  includeMargin: BoolControl.DEFAULT_TRUE,
  image: StringControl,
  style: styleControl(QRCodeStyle),
};

const QRCodeView = (props: RecordConstructorToView<typeof childrenMap>) => {
  const value = props.value.value;
  // https://github.com/zpao/qrcode.react/issues/69
  if (value.length > 2953) {
    return <>{trans("QRCode.maxLength")}</>;
  }
  return (
    <QRCodeSVG
      value={value}
      level={props.level}
      width="100%"
      height="100%"
      bgColor={props.style.background}
      fgColor={props.style.color}
      includeMargin={props.includeMargin}
      imageSettings={
        props.image ? { src: props.image, width: 0, height: 0, excavate: true } : undefined
      }
    />
  );
};

let QRCodeBasicComp = (function () {
  return new UICompBuilder(childrenMap, (props) => <QRCodeView {...props} />)
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.value.propertyView({
            label: trans("QRCode.value"),
            tooltip: trans("QRCode.valueTooltip"),
            placeholder: "https://example.com",
          })}
          {children.level.propertyView({
            label: trans("QRCode.level"),
            tooltip: trans("QRCode.levelTooltip"),
          })}
        </Section>
        <Section name={sectionNames.layout}>
          {children.includeMargin.propertyView({ label: trans("QRCode.includeMargin") })}
          {children.image.propertyView({
            label: trans("QRCode.image"),
            placeholder: "http://logo.jpg",
          })}
          {hiddenPropertyView(children)}
        </Section>
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .build();
})();

QRCodeBasicComp = class extends QRCodeBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const QRCodeComp = withExposingConfigs(QRCodeBasicComp, [
  new NameConfig("value", trans("QRCode.valueDesc")),
  NameConfigHidden,
]);
