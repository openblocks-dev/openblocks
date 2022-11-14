import { ActiveTextColor, GreyTextColor } from "constants/style";
import { DocIcon } from "icons";
import styled from "styled-components";

export const ExternalLink = styled.a`
  font-size: 13px;
  line-height: 13px;
  color: ${GreyTextColor};
  display: inline-flex;
  align-items: center;

  :hover {
    color: ${ActiveTextColor};
  }
`;

const StyledDocIcon = styled(DocIcon)`
  height: 12px;
  width: 12px;
  margin-right: 4px;
`;

export function DocLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!props.href) {
    return <></>;
  }
  return (
    <ExternalLink target="_blank" {...props}>
      <StyledDocIcon />
      {props.children}
    </ExternalLink>
  );
}
