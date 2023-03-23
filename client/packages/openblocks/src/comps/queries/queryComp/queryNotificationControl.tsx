import { MultiCompBuilder, withContext, withDefault } from "../../generators";
import { QueryResult, TriggerType } from "../queryComp";
import { message } from "antd";
import { list } from "../../generators/list";
import {
  KeyValueList,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
  QueryPropertyViewWrapper,
  QuerySectionWrapper,
} from "openblocks-design";
import _, { pick } from "lodash";
import { ControlParams } from "../../controls/controlParams";
import styled from "styled-components";
import { BoolCodeControl, StringControl } from "../../controls/codeControl";
import { BoolPureControl } from "../../controls/boolControl";
import { millisecondsControl } from "../../controls/millisecondControl";
import { trans } from "i18n";
import { CompAction, customAction, isMyCustomAction } from "openblocks-core";

const SuccessMessageAction = new MultiCompBuilder(
  {
    text: StringControl,
  },
  (props) => (duration: number) => props.text && message.success(props.text, duration)
)
  .setPropertyViewFn((children) => (
    <>
      {children.text.propertyView({
        placement: "bottom",
        label: trans("query.successMessageLabel"),
        placeholder: trans("query.successMessage"),
      })}
    </>
  ))
  .build();

const ConditionWrapper = styled.div`
  width: 184px;
  margin-right: 8px;
  flex-grow: 1;
`;
const TextWrapper = styled.div`
  width: 232px;
  flex-grow: 1;
`;
const SingleFailMessageTmpAction = new MultiCompBuilder(
  {
    text: StringControl,
    condition: BoolCodeControl,
  },
  (props) => props
)
  .setPropertyViewFn((children) => (
    <>
      <ConditionWrapper>
        {children.condition.propertyView({
          placeholder: "{{ !data.code }}",
          indentWithTab: false,
        })}
      </ConditionWrapper>
      <TextWrapper>
        {children.text.propertyView({ placeholder: "{{ data.message }}", indentWithTab: false })}
      </TextWrapper>
    </>
  ))
  .build();

const SingleFailMessageAction = withContext(SingleFailMessageTmpAction, ["data"] as const);

const FailMessageAction = class extends list(SingleFailMessageAction) {
  updateContext(result: QueryResult) {
    return this.setChildren(
      _.mapValues(this.children, (comp) => {
        return comp.reduce(SingleFailMessageAction.changeContextDataAction({ data: result.data }));
      })
    );
  }

  propertyView(params: ControlParams) {
    return (
      <QueryConfigWrapper>
        <QueryConfigLabel tooltip={params.tooltip}>{params.label}</QueryConfigLabel>
        <QueryConfigItemWrapper>
          <KeyValueList
            list={this.getView().map((child) => child.getPropertyView())}
            onAdd={() => this.dispatch(this.pushAction({}))}
            onDelete={(item, index) => this.dispatch(this.deleteAction(index))}
          />
        </QueryConfigItemWrapper>
      </QueryConfigWrapper>
    );
  }
};

const QueryNotificationTmpControl = new MultiCompBuilder(
  {
    showSuccess: withDefault(BoolPureControl, true),
    success: SuccessMessageAction,
    showFail: withDefault(BoolPureControl, true),
    fail: withDefault(FailMessageAction, [{ condition: "", text: "" }]),
    duration: millisecondsControl({ left: 0, right: 10, defaultValue: 3, unit: "s" }),
  },
  (props) => (name: string, triggerType: TriggerType, result: QueryResult) => {
    let hasNoticed = false;
    const duration = props.duration / 1000;
    if (props.showFail) {
      props.fail.forEach((item) => {
        const props = (item.getView() as any)({ data: result.data });
        if (props.condition && props.text) {
          message.error(props.text, duration);
          hasNoticed = true;
        }
      });

      // Execute system notification if triggered manually without custom notification and query fails
      if (!result.success && !hasNoticed) {
        hasNoticed = !!message.error(
          trans("query.failMessageWithName", {
            name,
            result: JSON.stringify(pick(result, ["code", "message"])),
          }),
          duration
        );
      }
    }

    if (!hasNoticed && props.showSuccess && triggerType === "manual") {
      hasNoticed = hasNoticed || (result.success && !!props.success(duration));

      // Execute system notification when triggered manually and without custom notification and query is successful
      if (result.success && !hasNoticed) {
        message.success(trans("query.successMessageWithName", { name }), duration);
      }
    }
  }
)
  .setPropertyViewFn(() => <></>)
  .build();

type ActionDataType = {
  type: "resultUpdate";
  result: QueryResult;
};
export const QueryNotificationControl = class extends QueryNotificationTmpControl {
  // Get user-defined query execution result
  getQueryCustomResult(): boolean {
    if (this.children.showFail.getView()) {
      let result = false;
      this.children.fail
        .getView()
        .forEach((item) => (result = result || item.children.condition.getView()));
      return !result;
    }
    return true;
  }

  updateContext(result: QueryResult) {
    return this.setChild("fail", this.children.fail.updateContext(result));
  }

  dispatchContextChanged(result: QueryResult) {
    this.dispatch(
      customAction<ActionDataType>(
        {
          type: "resultUpdate",
          result: result,
        },
        false
      )
    );
  }

  override reduce(action: CompAction) {
    if (isMyCustomAction<ActionDataType>(action, "resultUpdate")) {
      return this.updateContext(action.value.result);
    }
    return super.reduce(action);
  }

  propertyView(triggerType: TriggerType) {
    return (
      <QueryPropertyViewWrapper>
        <QuerySectionWrapper>
          {this.children.showFail.propertyView({
            label: trans("query.showFailNotification"),
            type: "checkbox",
            placement: "bottom",
          })}

          {this.children.fail.propertyView({
            label: trans("query.failCondition"),
            tooltip: (
              <>
                <span>{trans("query.failConditionTooltip1")}</span>
                <br />
                <br />
                <span>{trans("query.failConditionTooltip2")}</span>
              </>
            ),
          })}
        </QuerySectionWrapper>

        {triggerType === "manual" && (
          <QuerySectionWrapper>
            {this.children.showSuccess.propertyView({
              label: trans("query.showSuccessNotification"),
              type: "checkbox",
              placement: "bottom",
            })}
            {this.children.success.getPropertyView()}
          </QuerySectionWrapper>
        )}

        <QuerySectionWrapper>
          {this.children.duration.propertyView({
            label: trans("query.notifyDuration"),
            placeholder: "3s",
            placement: "bottom",
            tooltip: trans("query.notifyDurationTooltip", { default: 3, max: 10 }),
          })}
        </QuerySectionWrapper>
      </QueryPropertyViewWrapper>
    );
  }
};
