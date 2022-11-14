import { StringControl } from "comps/controls/codeControl";
import styled from "styled-components";
import { markdownCompCss, TacoMarkDown } from "openblocks-design";
import { ColumnValueTooltip } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { ColumnTypeCompBuilder } from "comps/comps/tableComp/column/columnTypeCompBuilder";
import { trans } from "i18n";

const Wrapper = styled.div`
  ${markdownCompCss};
  max-height: 32px;

  > .markdown-body {
    margin: 0;
  }
`;

export const ColumnMarkdownComp = (function () {
  const childrenMap = {
    text: StringControl,
  };
  return new ColumnTypeCompBuilder(
    childrenMap,
    (props) => {
      return (
        <Wrapper>
          <TacoMarkDown>{props.text}</TacoMarkDown>
        </Wrapper>
      );
    },
    (nodeValue) => nodeValue.text.value
  )
    .setPropertyViewFn((children) => (
      <>
        {children.text.propertyView({
          label: trans("table.columnValue"),
          tooltip: ColumnValueTooltip,
        })}
      </>
    ))
    .build();
})();
