import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { ActionSelectorControlInContext } from "comps/controls/actionSelector/actionSelectorControl";
import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { disabledPropertyView, loadingPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { useStyle } from "comps/controls/styleControl";
import { ButtonStyle } from "comps/controls/styleControlConstants";
import { Button100 } from "comps/comps/buttonComp/buttonCompConstants";

export const ColumnValueTooltip = trans("table.columnValueTooltip");

const ButtonTypeOptions = [
  {
    label: trans("table.primaryButton"),
    value: "primary",
  },
  {
    label: trans("table.defaultButton"),
    value: "default",
  },
] as const;

export const ButtonComp = (function () {
  const childrenMap = {
    text: StringControl,
    buttonType: dropdownControl(ButtonTypeOptions, "primary"),
    onClick: ActionSelectorControlInContext,
    loading: BoolCodeControl,
    disabled: BoolCodeControl,
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      const ButtonStyled = () => {
        const style = useStyle(ButtonStyle);
        return (
          <Button100
            type={props.buttonType}
            onClick={props.onClick}
            loading={props.loading}
            disabled={props.disabled}
            $buttonStyle={props.buttonType === "primary" ? style : undefined}
          >
            {/* prevent the button from disappearing */}
            {!props.text ? " " : props.text}
          </Button100>
        );
      };
      return <ButtonStyled />;
    },
    (nodeValue) => nodeValue.text.value
  )
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
        {children.buttonType.propertyView({
          label: trans("table.type"),
          radioButton: true,
        })}
        {loadingPropertyView(children)}
        {disabledPropertyView(children)}
        {children.onClick.propertyView({
          label: trans("table.action"),
          placement: "table",
        })}
      </>
    ))
    .build();
})();
