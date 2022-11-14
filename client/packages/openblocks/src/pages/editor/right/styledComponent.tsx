import styled, { css } from "styled-components";
import { StyledLink } from "pages/common/styledComponent";
import { EmptyContent } from "components/EmptyContent";
import { trans } from "i18n";

const NoShake = css`
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

export const CompIconDiv = styled.div<{ h: number; w: number }>`
  ${NoShake};
  padding: 3px;
  background: #ffffff;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  height: ${(props) => props.h}px;
  width: ${(props) => props.w}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  transition: all 0.2s ease-in-out;

  :active {
    background: #f2f4f8;
  }

  :hover {
    ${NoShake};
    padding: 0;
    transform: scale(1.05);
    transition: all 0.2s ease;
    border: 1px solid #b3c4ff;
    box-shadow: 0 0 5px 0 rgba(51, 119, 255, 0.15);
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
`;

export const RightPanelContentWrapper = styled.div`
  padding: 0 16px;
  padding-top: 4px;
`;

export const EmptyCompContent = () => {
  const aboutUsUrl = trans("docUrls.aboutUs")
  return (
    <EmptyContent
      text={
        <>
          {trans("rightPanel.searchNotFound")}
          {aboutUsUrl && (
            <>
              <br />
              <StyledLink target="_blank" href={aboutUsUrl}>
                {trans("rightPanel.contactUs")}
              </StyledLink>
            </>
          )}
        </>
      }
    />
  );
};
