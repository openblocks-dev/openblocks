import { BoolCodeControl } from "comps/controls/codeControl";
import { trans } from "i18n";
import { Checkbox } from "antd";
import { ColumnTypeCompBuilder, ColumnTypeViewFn } from "../columnTypeCompBuilder";
import { ColumnValueTooltip } from "../simpleColumnTypeComps";
import { getStyle } from "comps/comps/selectInputComp/checkboxComp";
import styled from "styled-components";
import { CheckboxStyle, CheckboxStyleType } from "comps/controls/styleControlConstants";
import { useStyle } from "comps/controls/styleControl";

const CheckboxStyled = styled(Checkbox)<{ $style: CheckboxStyleType }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

const Wrapper = styled.div`
  background: transparent !important;
  padding: 0 8px;
`;

const childrenMap = {
  text: BoolCodeControl,
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, boolean, boolean> = (props) => props.text;

type CheckBoxEditPropsType = {
  value: boolean;
  onChange: (value: boolean) => void;
  onChangeEnd: () => void;
};

const CheckBoxEdit = (props: CheckBoxEditPropsType) => {
  const style = useStyle(CheckboxStyle);
  return (
    <Wrapper
      onBlur={() => props.onChangeEnd()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.onChangeEnd();
        }
      }}
    >
      <CheckboxStyled
        autoFocus
        $style={style}
        defaultChecked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      />
    </Wrapper>
  );
};

export const BooleanComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      const CheckBoxComp = () => {
        const style = useStyle(CheckboxStyle);
        return <CheckboxStyled checked={!!value} $style={style} />;
      };
      return <CheckBoxComp />;
    },
    (nodeValue) => nodeValue.text.value,
    getBaseValue
  )
    .setEditViewFn((props) => {
      return (
        <CheckBoxEdit
          value={props.value}
          onChange={props.onChange}
          onChangeEnd={props.onChangeEnd}
        />
      );
    })
    .setPropertyViewFn((children) => {
      return (
        <>
          {children.text.propertyView({
            label: trans("table.columnValue"),
            tooltip: ColumnValueTooltip,
          })}
        </>
      );
    })
    .build();
})();
