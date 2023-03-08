import { NumberControl } from "comps/controls/codeControl";
import { trans } from "i18n";
import { ColumnTypeCompBuilder, ColumnTypeViewFn } from "../columnTypeCompBuilder";
import { ColumnValueTooltip } from "../simpleColumnTypeComps";
import styled from "styled-components";
import { Rate } from "antd";

const RateStyled = styled(Rate)<{ isEdit?: boolean }>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  overflow-x: overlay;
  color: #ffd400;
  display: block;
  .ant-rate-star > div {
    height: 18px;
    width: 18px;
  }
  .ant-rate-star-half .ant-rate-star-first,
  .ant-rate-star-full .ant-rate-star-second {
    color: #ffd400;
    position: absolute;
  }
  .ant-rate-star-first {
    width: 100%;
  }
  .ant-rate-star-first,
  .ant-rate-star-second {
    display: inline-flex;
    align-items: center;
    color: #d7d9e0;
    max-height: 20px;
    bottom: 0;
  }
  svg {
    height: 18px;
    width: 18px;
  }
`;

const Wrapper = styled.div`
  background: transparent !important;
  padding: 0 8px;
`

const childrenMap = {
  text: NumberControl,
};

const getBaseValue: ColumnTypeViewFn<typeof childrenMap, number, number> = (props) => props.text;

export const RatingComp = (function () {
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props, dispatch) => {
      const value = props.changeValue ?? getBaseValue(props, dispatch);
      return <RateStyled disabled value={value} />;
    },
    (nodeValue) => nodeValue.text.value,
    getBaseValue
  )
    .setEditViewFn((props) => {
      return (
        <Wrapper
          onBlur={(e) => {
            if (!e.currentTarget?.contains(e.relatedTarget)) {
              props.onChangeEnd();
            }
          }}
        >
          <RateStyled
            autoFocus
            isEdit={true}
            defaultValue={props.value}
            onChange={(value) => props.onChange(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.onChangeEnd();
              }
            }}
          />
        </Wrapper>
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
