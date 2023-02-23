import { message } from "antd";
import { EditorState } from "comps/editorState";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { trans } from "i18n";
import { CompParams, MultiBaseComp, wrapActionExtraInfo } from "openblocks-core";
import { BottomResComp, BottomResTypeEnum } from "types/bottomRes";
import { undoKey } from "util/keyUtils";
import { list } from "./list";
import { IExposingComp } from "./withExposing";

type BottomResListItemCompConstr = new (param: CompParams<any>) => MultiBaseComp<any, any, any> &
  IExposingComp;

export function bottomResListComp<T extends BottomResListItemCompConstr>(
  comp: T,
  compType: string,
  initialValue: any,
  namePrefix?: string
) {
  return class BottomResListComp extends list(comp) implements BottomResListComp {
    nameAndExposingInfo(): NameAndExposingInfo {
      const result: NameAndExposingInfo = {};
      Object.values(this.children).forEach((comp) => {
        result[comp.children.name.getView()] = comp.exposingInfo();
      });
      return result;
    }

    items() {
      return this.getView() as unknown as BottomResComp[];
    }

    add(editorState: EditorState) {
      const name = editorState.getNameGenerator().genItemName(namePrefix || compType);
      this.dispatch(
        wrapActionExtraInfo(
          this.pushAction({
            name,
            order: Date.now(),
            ...initialValue,
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
      editorState.setSelectedBottomRes(name, BottomResTypeEnum.DateResponder);
    }

    copy(editorState: EditorState, name: string) {
      const comps = this.getView();
      const index = comps.findIndex((i) => i.children.name.getView() === name);
      const originState = comps[index];
      if (!originState) {
        return;
      }
      const newStateName = editorState.getNameGenerator().genItemName(namePrefix || compType);
      this.dispatch(
        wrapActionExtraInfo(
          this.pushAction({
            ...(originState.toJsonValue() as object),
            name: newStateName,
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
      editorState.setSelectedBottomRes(newStateName, BottomResTypeEnum.DateResponder);
    }

    delete(name: string) {
      const stateComps = this.getView();
      const index = stateComps.findIndex((i) => i.children.name.getView() === name);
      const toDelete = this.getView()[index];
      if (!toDelete) {
        return;
      }
      this.dispatch(
        wrapActionExtraInfo(this.deleteAction(index), {
          compInfos: [
            {
              type: "delete",
              compName: toDelete.children.name.getView(),
              compType: compType,
            },
          ],
        })
      );
      message.success(trans("query.deleteSuccessMessage", { undoKey }));
    }
  };
}
