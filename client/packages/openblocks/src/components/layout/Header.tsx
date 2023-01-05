import styled from "styled-components";
import { CSSProperties, ReactNode } from "react";
import { CNSiteHeader } from "constants/styleSelectors";
import { TopHeaderHeight } from "constants/style";

const HeaderWrapper = styled.header<IHeaderProps>`
  display: flex;
  width: 100%;
  height: ${TopHeaderHeight};
  background-color: #2c2c2c;
  /* filter: drop-shadow(0px 1px 0px #ebebeb); */
  padding: ${(props) => (props.isEditViewPreview ? "8px 24px 8px 8px" : "8px 24px")};
  justify-content: space-between;

  > div:nth-of-type(1) svg {
    max-width: ${(props) => props.isEditViewPreview && "24px"};
  }
`;

const HeaderStart = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderMiddle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const HeaderEnd = styled.div`
  display: flex;
  align-items: center;
`;

export interface IHeaderProps {
  style?: CSSProperties;
  headerStart?: ReactNode;
  headerMiddle?: ReactNode;
  headerEnd?: ReactNode;
  isEditViewPreview?: boolean;
}

export default function Header(props: IHeaderProps) {
  const { headerStart, headerMiddle, headerEnd } = props;
  const regex = /\/edit|\/view|\/preview/;
  const isEditViewPreview = !!window.location.pathname.match(regex);
  return (
    <HeaderWrapper
      className={CNSiteHeader}
      isEditViewPreview={isEditViewPreview}
      style={props.style}
    >
      <HeaderStart>{headerStart}</HeaderStart>
      <HeaderMiddle>{headerMiddle}</HeaderMiddle>
      <HeaderEnd>{headerEnd}</HeaderEnd>
    </HeaderWrapper>
  );
}
