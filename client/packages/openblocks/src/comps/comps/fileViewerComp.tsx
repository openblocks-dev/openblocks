import { styleControl } from "comps/controls/styleControl";
import { FileViewerStyle, FileViewerStyleType } from "comps/controls/styleControlConstants";
import { isEmpty } from "lodash";
import { useState } from "react";
import { DocumentViewer } from "react-documents";
import styled, { css } from "styled-components";
import { Section, sectionNames } from "openblocks-design";
import { StringControl } from "../controls/codeControl";
import { UICompBuilder } from "../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../generators/withExposing";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

const getStyle = (style: FileViewerStyleType) => {
  return css`
    overflow: hidden;
    background-color: ${style.background};
    border: 1px solid ${style.border};
    border-radius: calc(min(${style.radius}, 20px));
  `;
};

const ErrorWrapper = styled.div<{ $style: FileViewerStyleType }>`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const StyledDiv = styled.div<{ $style: FileViewerStyleType }>`
  height: 100%;
  ${(props) => props.$style && getStyle(props.$style)}
`;

const DraggableFileViewer = (props: { src: string; style: FileViewerStyleType }) => {
  const [isActive, setActive] = useState(false);

  return (
    <StyledDiv
      $style={props.style}
      onClick={(e) => setActive(true)}
      onMouseLeave={(e) => setActive(false)}
    >
      <DocumentViewer
        style={{
          pointerEvents: isActive ? "auto" : "none",
          width: "100%",
          height: "100%",
        }}
        url={props.src}
        viewer={"url"}
      />
    </StyledDiv>
  );
};

let FileViewerBasicComp = (function () {
  const childrenMap = {
    src: StringControl,
    style: styleControl(FileViewerStyle),
  };
  return new UICompBuilder(childrenMap, (props) => {
    if (isEmpty(props.src)) {
      return <ErrorWrapper $style={props.style}>{trans("fileViewer.invalidURL")}</ErrorWrapper>;
    }
    return <DraggableFileViewer src={props.src} style={props.style} />;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.src.propertyView({
              label: trans("fileViewer.src"),
              tooltip: (
                <span style={{ wordBreak: "break-all" }}>{trans("fileViewer.srcTooltip")}</span>
              ),
            })}
          </Section>

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

FileViewerBasicComp = class extends FileViewerBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const FileViewerComp = withExposingConfigs(FileViewerBasicComp, [
  new NameConfig("src", trans("fileViewer.srcDesc")),
  NameConfigHidden,
]);
