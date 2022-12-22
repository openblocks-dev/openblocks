import { ContainerStyleType } from "comps/controls/styleControlConstants";
import { EditorContext } from "comps/editorState";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { HintPlaceHolder } from "openblocks-design";
import { ReactNode, useContext } from "react";
import styled, { css } from "styled-components";
import { checkIsMobile } from "util/commonUtils";
import { gridItemCompToGridItems, InnerGrid } from "../containerComp/containerView";
import { TriContainerViewProps } from "../triContainerComp/triContainerCompBuilder";

const getStyle = (style: ContainerStyleType) => {
  return css`
    border-color: ${style.border};
    border-radius: ${style.radius};
    overflow: hidden;
  `;
};

const Wrapper = styled.div<{ $style: ContainerStyleType }>`
  display: flex;
  flex-flow: column;
  height: 100%;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const HeaderInnerGrid = styled(InnerGrid)<{ backgroundColor: string }>`
  overflow: visible;
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
  border-radius: 0;
`;

const BodyInnerGrid = styled(InnerGrid)<{
  showBorder: boolean;
  backgroundColor: string;
  borderColor: string;
}>`
  border-top: ${(props) => `${props.showBorder ? 1 : 0}px solid ${props.borderColor}`};
  flex: 1;
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
  border-radius: 0;
`;

const FooterInnerGrid = styled(InnerGrid)<{
  showBorder: boolean;
  backgroundColor: string;
  borderColor: string;
}>`
  border-top: ${(props) => `${props.showBorder ? 1 : 0}px solid ${props.borderColor}`};
  overflow: visible;
  ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
  border-radius: 0;
`;

export type TriContainerProps = TriContainerViewProps & {
  hintPlaceholder?: ReactNode;
};

export function TriContainer(props: TriContainerProps) {
  const { container } = props;
  const { showHeader, showFooter } = container;
  // When the header and footer are not displayed, the body must be displayed
  const showBody = container.showBody || (!showHeader && !showFooter);

  const { items: headerItems, ...otherHeaderProps } = container.header;
  const { items: bodyItems, ...otherBodyProps } = container.body["0"].children.view.getView();
  const { items: footerItems, ...otherFooterProps } = container.footer;
  const { style } = container;

  const editorState = useContext(EditorContext);
  const maxWidth = editorState.getAppSettings().maxWidth;
  const isMobile = checkIsMobile(maxWidth);
  const paddingWidth = isMobile ? 7 : 19;

  return (
    <Wrapper $style={style}>
      {showHeader && (
        <BackgroundColorContext.Provider value={container.style.headerBackground}>
          <HeaderInnerGrid
            {...otherHeaderProps}
            items={gridItemCompToGridItems(headerItems)}
            autoHeight={true}
            emptyRows={5}
            minHeight="46px"
            containerPadding={[paddingWidth, 3]}
            showName={{ bottom: showBody || showFooter ? 20 : 0 }}
            backgroundColor={style?.headerBackground}
          />
        </BackgroundColorContext.Provider>
      )}
      {showBody && (
        <BackgroundColorContext.Provider value={container.style.background}>
          <BodyInnerGrid
            showBorder={showHeader}
            {...otherBodyProps}
            items={gridItemCompToGridItems(bodyItems)}
            autoHeight={container.autoHeight}
            emptyRows={14}
            minHeight={showHeader ? "143px" : "142px"}
            containerPadding={
              (showHeader && showFooter) || showHeader ? [paddingWidth, 11.5] : [paddingWidth, 11]
            }
            hintPlaceholder={props.hintPlaceholder ?? HintPlaceHolder}
            backgroundColor={style?.background}
            borderColor={style?.border}
          />
        </BackgroundColorContext.Provider>
      )}
      {showFooter && (
        <BackgroundColorContext.Provider value={container.style.footerBackground}>
          <FooterInnerGrid
            showBorder={showHeader || showBody}
            {...otherFooterProps}
            items={gridItemCompToGridItems(footerItems)}
            autoHeight={true}
            emptyRows={5}
            minHeight={showBody ? "47px" : "46px"}
            containerPadding={showBody || showHeader ? [paddingWidth, 3.5] : [paddingWidth, 3]}
            showName={{ top: showHeader || showBody ? 20 : 0 }}
            backgroundColor={style?.footerBackground}
            borderColor={style?.border}
          />
        </BackgroundColorContext.Provider>
      )}
    </Wrapper>
  );
}
