import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { bottomResListComp } from "comps/generators/bottomResList";
import { NameGenerator } from "comps/utils";
import { genRandomKey } from "comps/utils/idGenerator";
import { trans } from "i18n";
import { ReactNode } from "react";
import { BottomResComp, BottomResCompResult, BottomResTypeEnum } from "types/bottomRes";
import { SimpleNameComp } from "./simpleNameComp";

const FolderItemCompBase = new MultiCompBuilder(
  {
    id: valueComp<string>(""),
    name: SimpleNameComp,
  },
  () => null
)
  .setPropertyViewFn(() => null)
  .build();

export class FolderListItemComp extends FolderItemCompBase implements BottomResComp {
  extraNode() {
    return super.extraNode();
  }
  result(): BottomResCompResult | null {
    return null;
  }
  type(): BottomResTypeEnum {
    return BottomResTypeEnum.Folder;
  }
  id() {
    return this.children.id.getView();
  }
  name(): string {
    return this.children.name.getView();
  }
  icon(): ReactNode {
    return getBottomResIcon(BottomResTypeEnum.Folder);
  }
  rename(value: string): string {
    if (!value) {
      return "";
    }
    this.children.name.dispatchChangeValueAction(value);
    return this.id();
  }
  checkName(value: string): string {
    if (!value) {
      return trans("comp.nameNotEmpty");
    }
    return "";
  }
}

export const FolderListComp = class extends bottomResListComp(
  FolderListItemComp,
  BottomResTypeEnum.Folder,
  () => {
    return {
      id: genRandomKey(),
    };
  }
) {
  override genNewName() {
    const nameGenerator = new NameGenerator();
    nameGenerator.init(this.items().map((i) => i.name()));
    return nameGenerator.genItemName(trans("query.newFolder"));
  }
  override autoSelectAfterCreate() {
    return true;
  }
};
