import ModulePanel from "./ModulePanel";
import PluginPanel from "./PluginPanel";
import { RightPanelContentWrapper } from "./styledComponent";

export default function ExtensionPanel() {
  return (
    <RightPanelContentWrapper>
      <ModulePanel />
      <PluginPanel />
    </RightPanelContentWrapper>
  );
}
