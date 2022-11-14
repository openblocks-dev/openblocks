import { triggerModuleEventAction, routeByNameAction } from "openblocks-core";
import { SimpleNameComp } from "comps/comps/simpleNameComp";
import { CompNameContext, EditorContext } from "comps/editorState";
import { MultiCompBuilder } from "comps/generators/multi";
import { BranchDiv, Dropdown } from "openblocks-design";
import { ModuleLayoutCompName } from "constants/compConstants";
import { trans } from "i18n";

const childrenMap = {
  name: SimpleNameComp,
};

const TriggerModuleEventActionCompBase = new MultiCompBuilder(childrenMap, () => () => {}).build();

export class TriggerModuleEventActionComp extends TriggerModuleEventActionCompBase {
  displayName() {
    const name = this.children.name.getView();
    if (name) {
      return `${name}.trigger()`;
    }
  }

  override getView() {
    const name = this.children.name.getView();
    if (!name) {
      return () => {};
    }
    return () => {
      this.dispatch(routeByNameAction(ModuleLayoutCompName, triggerModuleEventAction(name)));
    };
  }

  propertyView() {
    return (
      <EditorContext.Consumer>
        {(editorState) => {
          const moduleLayoutComp = editorState.getModuleLayoutComp();
          if (!moduleLayoutComp) {
            return null;
          }
          const events = moduleLayoutComp.getEvents();
          const name = this.children.name.getView();
          return (
            <>
              <BranchDiv $type={"inline"}>
                <CompNameContext.Consumer>
                  {(compName) => (
                    <Dropdown
                      value={name}
                      options={events.map((item) => {
                        const eventName = item.children.name.getView();
                        return {
                          label: eventName,
                          value: eventName,
                        };
                      })}
                      label={trans("eventHandler.moduleEvent")}
                      onChange={(value) => this.children.name.dispatchChangeValueAction(value)}
                    />
                  )}
                </CompNameContext.Consumer>
              </BranchDiv>
            </>
          );
        }}
      </EditorContext.Consumer>
    );
  }
}
