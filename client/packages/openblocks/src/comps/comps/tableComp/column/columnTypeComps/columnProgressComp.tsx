import { NumberControl } from "comps/controls/codeControl";
import { trans } from "i18n";
import { InputNumber } from "antd";
import { ColumnTypeCompBuilder, ColumnTypeViewFn } from "../columnTypeCompBuilder";
import { ColumnValueTooltip } from "../simpleColumnTypeComps";
import { ProgressStyle } from "comps/controls/styleControlConstants";
import { useStyle } from "comps/controls/styleControl";
import { BoolControl } from "comps/controls/boolControl";
import { ProgressStyled as Progress } from "comps/comps/progressComp";
import { TableMinusIcon, TablePlusIcon } from "openblocks-design";
import styled from "styled-components";

const ProgressStyled = styled(Progress)`
  display: flex;
  align-items: center;
  .ant-progress-outer {
    height: 22px;
    display: flex;
    align-items: center;
  }
  .ant-progress-text {
    margin-left: 6px;
  }
`;

const InputNumberStyled = styled(InputNumber)`
  background: transparent !important;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  .ant-input-number-input-wrap {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .ant-input-number-handler-wrap {
    top: 1.5px;
    right: 1.5px;
    height: calc(100% - 3px);
    border-radius: 0;
  }
  .ant-input-number-handler-up {
    border-bottom: 1px solid #d7d9e0;
  }
  .ant-input-number-handler-up,
  .ant-input-number-handler-down {
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      width: 16px;
      height: 16px;
      margin-top: 0;
      position: unset;
      transform: none;
    }
    :hover {
      &:not(.ant-input-number-handler-up-disabled):not(.ant-input-number-handler-down-disabled)
        path {
        fill: #315efb;
      }
    }
  }
`;

const childrenMap = {
  text: NumberControl,
  showValue: BoolControl,
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, number, number> = (props) => props.text;

export const ProgressComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      const Progress = () => {
        const style = useStyle(ProgressStyle);
        return (
          <ProgressStyled percent={Math.round(value)} showInfo={props.showValue} $style={style} />
        );
      };
      return <Progress />;
    },
    (nodeValue) => nodeValue.text.value,
    getBaseValue
  )
    .setEditViewFn((props) => {
      return (
        <InputNumberStyled
          min={0}
          max={100}
          defaultValue={props.value}
          autoFocus
          bordered={false}
          controls={{ upIcon: <TablePlusIcon />, downIcon: <TableMinusIcon /> }}
          onChange={(value) => {
            props.onChange(Number(value));
          }}
          onBlur={props.onChangeEnd}
          onPressEnter={props.onChangeEnd}
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
          {children.showValue.propertyView({
            label: trans("table.showValue"),
          })}
        </>
      );
    })
    .build();
})();
