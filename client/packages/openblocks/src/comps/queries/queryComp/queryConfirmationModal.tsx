import { MultiCompBuilder } from "../../generators";
import { BoolPureControl } from "../../controls/boolControl";
import { StringControl } from "../../controls/codeControl";
import { CustomModal } from "openblocks-design";
import { isEmpty } from "lodash";
import { QueryResult } from "../queryComp";
import { trans } from "i18n";

export const QueryConfirmationModal = new MultiCompBuilder(
  {
    showConfirmationModal: BoolPureControl,
    confirmationMessage: StringControl,
  },
  (props) =>
    (onConfirm: () => Promise<QueryResult>, isManual: boolean): Promise<QueryResult> =>
      new Promise<QueryResult>((resolve) => {
        props.showConfirmationModal && isManual
          ? CustomModal.confirm({
              content: isEmpty(props.confirmationMessage)
                ? trans("query.confirmationMessage")
                : props.confirmationMessage,
              onConfirm: () => {
                resolve(onConfirm());
              },
              confirmBtnType: "primary",
              style: { top: "-100px" },
              bodyStyle: { marginTop: 0, height: "42px" },
            })
          : resolve(onConfirm());
      })
)
  .setPropertyViewFn((children) => (
    <>
      {children.showConfirmationModal.propertyView({
        label: trans("query.showConfirmationModal"),
        type: "checkbox",
        placement: "bottom",
      })}
      {children.showConfirmationModal.getView() &&
        children.confirmationMessage.propertyView({
          placement: "bottom",
          label: trans("query.confirmationMessageLabel"),
          placeholder: trans("query.confirmationMessage"),
        })}
    </>
  ))
  .build();
