import { trans } from "i18n";
import { executeCompAction } from "./executeCompAction";

export const SetTempStateAction = executeCompAction({
  compListGetter: (s) => {
    return Object.values(s.getTempStatesComp().getView());
  },
  selectLabel: trans("eventHandler.state"),
});
