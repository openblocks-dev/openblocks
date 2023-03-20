import { CompAction, CompActionTypes, isBroadcastAction, RenameAction } from "openblocks-core";
import { valueComp } from "../generators";

const ValueComp = valueComp<string>("");
/**
 * Represents a name, supports rename
 */
export class SimpleNameComp extends ValueComp {
  override reduce(action: CompAction): this {
    if (isBroadcastAction<RenameAction>(action, CompActionTypes.RENAME)) {
      if (this.getView() === action.action.oldName) {
        return super.reduce(this.changeValueAction(action.action.name));
      }
    }
    return super.reduce(action);
  }
}
