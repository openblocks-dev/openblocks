import { EmptyContent } from "components/EmptyContent";
import UIComp from "comps/comps/uiComp";
import { EditorContext } from "comps/editorState";
import { GridCompOperator } from "comps/utils/gridCompOperator";
import { SelectedComps } from "openblocks-design";
import { ScrollBar } from "openblocks-design";
import { ReactNode, useContext } from "react";
import { trans } from "i18n";

const ScrollWrapper = (props: { children: ReactNode }) => (
  <ScrollBar>
    <div style={{ paddingBottom: "10px" }}>{props.children}</div>
  </ScrollBar>
);

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
    return <>{selectedComp.getPropertyView()}</>;
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

  return <ScrollWrapper>{propertyView}</ScrollWrapper>;
}
