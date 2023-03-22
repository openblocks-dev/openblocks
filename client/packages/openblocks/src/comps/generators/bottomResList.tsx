import { message } from "antd";
import { EditorState } from "comps/editorState";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { trans } from "i18n";
import { CompParams, MultiBaseComp, wrapActionExtraInfo } from "openblocks-core";
import { BottomResComp, BottomResListComp, BottomResTypeEnum } from "types/bottomRes";
import { undoKey } from "util/keyUtils";
import { list } from "./list";
import { IExposingComp } from "./withExposing";

type BottomResListItemCompConstr = new (param: CompParams<any>) => MultiBaseComp<any, any, any> &
  BottomResComp &
  Partial<IExposingComp>;

export function bottomResListComp<T extends BottomResListItemCompConstr>(
  comp: T,
  compType: BottomResTypeEnum,
  initialValue: any,
  namePrefix?: string
) {
  return class extends list(comp) implements BottomResListComp {
    nameAndExposingInfo(): NameAndExposingInfo {
      const result: NameAndExposingInfo = {};
      Object.values(this.children).forEach((comp) => {
        if (!comp.exposingInfo) {
          return;
        }
        result[comp.children.name.getView()] = comp.exposingInfo();
      });
      return result;
    }

    items() {
      return this.getView() as unknown as BottomResComp[];
    }

    genNewName(editorState: EditorState) {
      const name = editorState.getNameGenerator().genItemName(namePrefix || compType);
      return name;
    }

    autoSelectAfterCreate(): boolean {
      return true;
    }

    select(editorState: EditorState, id: string) {
      editorState.setSelectedBottomRes(id, compType);
    }

    add(editorState: EditorState, extraInfo?: any) {
      const name = this.genNewName(editorState);
      const values = typeof initialValue === "function" ? initialValue() : initialValue;
      const id = values?.id ?? name;
      this.dispatch(
        wrapActionExtraInfo(
          this.pushAction({
            name,
            ...values,
          }),
          {
            compInfos: [
              {
                type: "add",
                compName: name,
                compType: compType,
              },
            ],
          }
        )
      );
      if (this.autoSelectAfterCreate()) {
        this.select(editorState, id);
      }
      return id;
    }

    copy(editorState: EditorState, id: string) {
      const comps = this.getView();
      const index = comps.findIndex((i) => i.id() === id);
      const originState = comps[index];
      if (!originState) {
        return;
      }
      const name = this.genNewName(editorState);
      this.dispatch(
        wrapActionExtraInfo(
          this.pushAction({
            ...(originState.toJsonValue() as object),
            name,
            order: Date.now(),
          } as any),
          {
            compInfos: [
              {
                type: "add",
                compName: name,
                compType: compType,
              },
            ],
          }
        )
      );
      editorState.setSelectedBottomRes(name, BottomResTypeEnum.DateResponder);
    }

    delete(id: string) {
      const stateComps = this.getView();
      const index = stateComps.findIndex((i) => i.id() === id);
      const toDelete = this.getView()[index];
      if (!toDelete) {
        return;
      }
      this.dispatch(
        wrapActionExtraInfo(this.deleteAction(index), {
          compInfos: [
            {
              type: "delete",
              compName: toDelete.name(),
              compType: compType,
            },
          ],
        })
      );
      message.success(trans("query.deleteSuccessMessage", { undoKey }));
    }
  };
}
