import { QueryLibraryCompType } from "../../comps/comps/queryLibrary/queryLibraryComp";
import { NameGenerator } from "../../comps/utils";
import { checkName } from "../../comps/utils/rename";
import React from "react";
import { setFields } from "../objectUtils";
import { renameAction } from "openblocks-core";
import { trans } from "i18n";

export class QueryLibraryState {
  readonly queryLibraryComp: QueryLibraryCompType;

  private readonly setQueryLibraryState: (
    fn: (editorState: QueryLibraryState) => QueryLibraryState
  ) => void;

  constructor(
    queryLibraryComp: QueryLibraryCompType,
    setQueryLibraryState: (fn: (queryLibraryState: QueryLibraryState) => QueryLibraryState) => void
  ) {
    this.queryLibraryComp = queryLibraryComp;
    this.setQueryLibraryState = setQueryLibraryState;
  }

  private changeStateFn(fn: (queryLibraryState: QueryLibraryState) => Partial<QueryLibraryState>) {
    this.setQueryLibraryState((oldState) => {
      const stateChanges = fn(oldState);
      return setFields(oldState, stateChanges);
    });
  }

  setComp(compFn: (comp: QueryLibraryCompType) => QueryLibraryCompType) {
    this.changeStateFn((queryLibraryState) => {
      return { queryLibraryComp: compFn(queryLibraryState.queryLibraryComp) };
    });
  }

  getNameGenerator() {
    const nameGenerator = new NameGenerator();
    const exposingInfo = this.nameAndExposingInfo();
    nameGenerator.init(Object.keys(exposingInfo));
    return nameGenerator;
  }

  nameAndExposingInfo() {
    return this.queryLibraryComp.nameAndExposingInfo();
  }

  checkRename(oldName: string, name: string): string {
    const error = checkName(name);
    if (error) {
      return error;
    }
    if (name !== oldName && this.nameAndExposingInfo().hasOwnProperty(name)) {
      return trans("query.nameExists", { name: name });
    }
    return "";
  }

  rename(oldName: string, name: string): boolean {
    const error = this.checkRename(oldName, name);
    if (error) {
      return false;
    }
    if (name !== oldName) {
      this.queryLibraryComp.dispatch(renameAction(oldName, name));
    }
    return true;
  }
}

export const QueryLibraryContext = React.createContext<QueryLibraryState>(undefined as any);
