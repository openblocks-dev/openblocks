import { AppTypeEnum } from "constants/applicationConstants";
import { createContext, CSSProperties } from "react";
import { EditorHistory } from "util/editoryHistory";

export interface ExternalEditorContextState {
  history?: EditorHistory;

  appType: AppTypeEnum;

  applicationId: string;

  /**
   * uneditable, hide the left/bottom/right panel
   */
  readOnly?: boolean;

  hideHeader?: boolean;

  /**
   * default: [20, 20]
   */
  rootContainerPadding?: [number, number];

  rootContainerExtraHeight?: string;

  /**
   * default: overlay
   */
  rootContainerOverflow?: CSSProperties["overflow"];

  /**
   * whether to open the AppSettings modal
   */
  showAppSettingModal?: boolean;

  /**
   * whether to open the ScriptsAndStyle modal
   */
  showScriptsAndStyleModal?: boolean;

  changeExternalState?: (state: Partial<ExternalEditorContextState>) => void;
}

export const ExternalEditorContext = createContext<ExternalEditorContextState>({
  applicationId: "",
  appType: AppTypeEnum.Application,
  showAppSettingModal: false,
  showScriptsAndStyleModal: false,
  changeExternalState: () => {},
});
