import { EmptyContent } from "components/EmptyContent";
import UIComp from "comps/comps/uiComp";
import { EditorContext } from "comps/editorState";
import { GridCompOperator } from "comps/utils/gridCompOperator";
import { SelectedComps } from "openblocks-design";
import { ScrollBar } from "openblocks-design";
import { useContext } from "react";
import styled from "styled-components";
import { trans } from "i18n";

const PropertyViewWrapper = styled(ScrollBar)`
  .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
    top: 48px; // preserve for comp name
    bottom: 10px;
  }
`;

interface PropertyViewProps {
  uiComp?: InstanceType<typeof UIComp>;
}

export default function PropertyView(props: PropertyViewProps) {
  const { uiComp } = props;
  const editorState = useContext(EditorContext);
  const selectedCompNames = editorState.selectedCompNames;
  const selectedComp = editorState.selectedComp();
  const moduleLayoutComp = uiComp?.getModuleLayoutComp();

  let propertyView;
  if (selectedComp) {
    propertyView = <div style={{ paddingBottom: "80px" }}> {selectedComp.getPropertyView()}</div>;
  } else if (selectedCompNames.size > 1) {
    propertyView = (
      <SelectedComps
        comps={Array.from(selectedCompNames)}
        onChange={(item: string) => {
          editorState.setSelectedCompNames(new Set([item]));
        }}
        delete={() => {
          GridCompOperator.deleteComp(editorState, editorState.selectedComps());
        }}
      />
    );
  } else if (moduleLayoutComp) {
    propertyView = moduleLayoutComp.getPropertyView();
  } else {
    propertyView = (
      <EmptyContent style={{ margin: 16 }} text={trans("rightPanel.noSelectedComps")} />
    );
  }

  return <PropertyViewWrapper>{propertyView}</PropertyViewWrapper>;
}
