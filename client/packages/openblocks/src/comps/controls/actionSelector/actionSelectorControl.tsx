import { BoolCodeControl } from "comps/controls/codeControl";
import { EditorContext } from "comps/editorState";
import { withTypeAndChildren } from "comps/generators";
import { MultiCompBuilder } from "comps/generators/multi";
import { getReduceContext } from "comps/utils/reduceContext";
import { trans } from "i18n";
import { omit } from "lodash";
import {
  ActionContextType,
  CompAction,
  CompActionTypes,
  CompConstructor,
  CustomAction,
  customAction,
  isBroadcastAction,
  isCustomAction,
  isMyCustomAction,
  UpdateActionContextAction,
} from "openblocks-core";
import { Dropdown, HighContainer, Treediv } from "openblocks-design";
import { useContext } from "react";
import { limitExecutor, setFieldsNoTypeCheck } from "util/objectUtils";
import { getPromiseAfterExecuteDispatch, handlePromiseAfterResult } from "util/promiseUtils";
import { dropdownControl } from "../dropdownControl";
import { millisecondsControl } from "../millisecondControl";
import { CopyToClipboardAction } from "./copyToClipboardAction";
import { DownloadAction } from "./downloadAction";
import { ExecuteCompAction } from "./executeCompAction";
import { ExecuteQueryAction } from "./executeQueryAction";
import { GoToURLAction } from "./goToURLAction";
import { MessageAction } from "./messageAction";
import { OpenAppPageAction } from "./openAppAction";
import { RunScriptAction } from "./runScript";
import { SetTempStateAction } from "./setTempStateValueAction";
import { TriggerModuleEventActionComp } from "./triggerModuleEventAction";

const SlowdownOptions = [
  { label: trans("eventHandler.debounce"), value: "debounce" },
  { label: trans("eventHandler.throttle"), value: "throttle" },
] as const;

const AdvanceChildren = {
  condition: BoolCodeControl,
  slowdown: dropdownControl(SlowdownOptions, "debounce"),
  delay: millisecondsControl({}),
};

class EmptyAction extends new MultiCompBuilder({}, () => () => {})
  .setPropertyViewFn(() => <></>)
  .build() {
  displayName() {
    return trans("eventHandler.incomplete");
  }
}

const ActionMap = {
  empty: EmptyAction,
  executeQuery: ExecuteQueryAction,
  executeComp: ExecuteCompAction,
  runScript: RunScriptAction,
  setTempState: SetTempStateAction,
  triggerModuleEvent: TriggerModuleEventActionComp,
  openAppPage: OpenAppPageAction,
  message: MessageAction,
  goToURL: GoToURLAction,
  copyToClipboard: CopyToClipboardAction,
  download: DownloadAction,
};

// The type of getView is wrong
// Do not delete this line, for the view type of assert comp
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ASSERT_TYPE: Record<string, CompConstructor<() => any>> = ActionMap;

export const ActionOptions: { label: string; value: keyof typeof ActionMap }[] = [
  {
    label: trans("eventHandler.noSelect"),
    value: "empty",
  },
  {
    label: trans("eventHandler.runQuery"),
    value: "executeQuery",
  },
  {
    label: trans("eventHandler.controlComp"),
    value: "executeComp",
  },
  {
    label: trans("eventHandler.runScript"),
    value: "runScript",
  },
  {
    label: trans("eventHandler.setTempState"),
    value: "setTempState",
  },
  {
    label: trans("eventHandler.triggerModuleEvent"),
    value: "triggerModuleEvent",
  },
  {
    label: trans("eventHandler.goToApp"),
    value: "openAppPage",
  },
  {
    label: trans("eventHandler.showNotification"),
    value: "message",
  },
  {
    label: trans("eventHandler.goToURL"),
    value: "goToURL",
  },
  {
    label: trans("eventHandler.copyToClipboard"),
    value: "copyToClipboard",
  },
  {
    label: trans("eventHandler.export"),
    value: "download",
  },
];

type ActionValue = typeof ActionOptions[number]["value"];

const moduleOnlyActions: ActionValue[] = ["triggerModuleEvent"];
const devActions: ActionValue[] = ["message", "goToURL", "copyToClipboard"];

const TypedActionComp = withTypeAndChildren(ActionMap, "empty", AdvanceChildren);

const ACTION_TRIGGERED_TYPE_STRING = "actionTriggered";
type ActionTriggered = {
  type: "actionTriggered";
  context: ActionContextType | undefined;
  /**
   * function to be executed.
   * Because the comp that executes the action is not necessarily the comp that triggers the action,
   * the selectedRow in the actionSelector is not the latest. (Only guarantee that the query is the latest)
   */
  func: () => any;
};

export function isTriggerAction(action: CompAction): action is CustomAction<ActionTriggered> {
  return isCustomAction<ActionTriggered>(action, ACTION_TRIGGERED_TYPE_STRING);
}

interface PropertyViewProps {
  comp: InstanceType<typeof TypedActionComp>;
  label: string;
  placement?: "table" | "query";
}

function ActionSelectorControlPropertyView(props: PropertyViewProps) {
  const { comp, placement, label } = props;
  const editorState = useContext(EditorContext);
  const eventHandlerSlowdownUrl = trans("docUrls.eventHandlerSlowdown");
  return (
    <>
      <Dropdown
        lineHeight={300}
        value={comp.children.compType.getView()}
        options={ActionOptions.filter((i) => {
          if (window.__OPENBLOCKS_DEV__) {
            return devActions.includes(i.value);
          }
          if (editorState?.isModule()) {
            return true;
          }
          return !moduleOnlyActions.includes(i.value);
        })}
        label={label}
        onChange={(value) => {
          comp.dispatchChangeValueAction({
            ...omit(comp.toJsonValue(), ["comp"]),
            compType: value,
          });
        }}
      />
      <Treediv>
        {"propertyView" in comp.children.comp
          ? comp.children.comp.propertyView({ placement: placement })
          : comp.children.comp.getPropertyView()}
      </Treediv>
      <>
        {placement !== "table" && (
          <HighContainer>
            {comp.children.condition.propertyView({
              label: trans("eventHandler.condition"),
              tooltip: trans("eventHandler.conditionTooltip"),
              placeholder: "{{ !!example.value }}",
            })}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {comp.children.slowdown.propertyView({
                  border: true,
                  tooltip: (
                    <>
                      {trans("eventHandler.slowdownTooltip")}
                      {eventHandlerSlowdownUrl && (
                        <>
                          &nbsp;
                          <a href={eventHandlerSlowdownUrl} target="_blank" rel="noreferrer">
                            {trans("reference")}
                          </a>
                        </>
                      )}
                    </>
                  ),
                })}
              </div>
              <div style={{ flex: "0 0 184px" }}>
                {comp.children.delay.propertyView({ placeholder: "1s" })}
              </div>
            </div>
          </HighContainer>
        )}
      </>
    </>
  );
}

/**
 * If the dataTree is required to be up-to-date, the current implementation will lose information such as currentCell.
 * So make a compromise for the time being, dataTree is not up to date when needContext is true.
 * Currently this option is only used in the table, and a better solution will be found later
 */
function actionSelectorControl(needContext: boolean) {
  class ActionSelectorTmpControl extends TypedActionComp {
    private context: ActionContextType | undefined;

    displayName() {
      const comp = this.children.comp;
      if ("displayName" in comp) {
        return comp.displayName() ?? trans("eventHandler.incomplete");
      }
      const actionLabel = ActionOptions.find(
        (option) => option.value === this.children.compType.getView()
      )?.label;
      return actionLabel ?? trans("eventHandler.incomplete");
    }

    override reduce(action: CompAction): this {
      if (isMyCustomAction<ActionTriggered>(action, ACTION_TRIGGERED_TYPE_STRING)) {
        const isConditionSet = !!this.children.condition.unevaledValue;
        const condition = this.children.condition.getView();
        const ignored = getReduceContext().disableUpdateState || (isConditionSet && !condition);
        const ignorePromise = Promise.resolve();
        const realNeedContext = needContext || getReduceContext().inEventContext;
        const actionPromise = () => {
          return realNeedContext ? action.value.func() : this.children.comp.getView()();
        };
        handlePromiseAfterResult(action, ignored ? ignorePromise : actionPromise());
        return this;
      }
      if (
        isBroadcastAction<UpdateActionContextAction>(action, CompActionTypes.UPDATE_ACTION_CONTEXT)
      ) {
        return setFieldsNoTypeCheck(this, { context: action.action.context });
      }
      return super.reduce(action);
    }

    override getView() {
      let executor = (x: Function) => x();

      const limitEnabled = !!this.children.delay.unevaledValue;
      if (limitEnabled) {
        executor = limitExecutor(
          this,
          "execute_query",
          this.children.slowdown.getView(),
          this.children.delay.getView()
        );
      }

      return () =>
        getPromiseAfterExecuteDispatch(
          executor,
          this.dispatch,
          customAction<ActionTriggered>(
            {
              type: ACTION_TRIGGERED_TYPE_STRING,
              context: this.context,
              func: this.children.comp.getView(),
            },
            false
          ),
          {
            notHandledError: trans("eventHandler.notHandledError"),
          }
        );
    }

    propertyView({ label, placement }: { label: string; placement?: "query" | "table" }) {
      return <ActionSelectorControlPropertyView comp={this} label={label} placement={placement} />;
    }
  }

  return ActionSelectorTmpControl;
}

export const ActionSelectorControl = actionSelectorControl(false);
export const ActionSelectorControlInContext = actionSelectorControl(true);
