import { UICompType } from "comps/uiCompRegistry";
import { trans } from "i18n";

const extra: { [key in UICompType]?: string } = {
  table: trans("componentDocExtra.table"),
};

export default extra;
