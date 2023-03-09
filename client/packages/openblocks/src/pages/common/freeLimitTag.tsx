import { trans } from "i18n";
import styled from "styled-components";

const TagStyled = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(242, 122, 36, 0.3);
  border-radius: 4px;
  font-size: 12px;
  color: #f27a24;
  line-height: 12px;
  padding: 3px 5px;
  margin-left: 8px;
  flex-shrink: 0;
`;

const NewTagStyle = styled(TagStyled)`
  border: 1px solid #d6e4ff;
  background: #ffffff;
  color: #4965f2;
`;

export default function FreeLimitTag(props: { text?: string }) {
  return <TagStyled>{props.text || trans("freeLimit")}</TagStyled>;
}

export function NewTag() {
  return <NewTagStyle>New</NewTagStyle>;
}

export function ReadonlyTag() {
  return (
    <NewTagStyle style={{ color: "#8B8FA3", borderColor: "#8B8FA3" }}>
      {trans("queryLibrary.readOnly")}
    </NewTagStyle>
  );
}
