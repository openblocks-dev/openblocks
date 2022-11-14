import { useSelector } from "react-redux";
import { selectSystemConfig } from "../../../redux/selectors/configSelectors";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import { trans } from "i18n";

export function useHostCheck() {
  const systemConfig = useSelector(selectSystemConfig);
  const useHostUrl = trans("docUrls.useHost");
  const message = systemConfig?.cloudHosting ? (
    trans("query.cloudHosting")
  ) : (
    <>
      {trans("query.notCloudHosting")}
      {useHostUrl && (
        <a href={useHostUrl} target="_blank" rel="noreferrer">
          {trans("query.howToAccessHostDocLink")}
        </a>
      )}
    </>
  );

  return {
    message: message,
    warningOnly: true,
    validator: (_: RuleObject, value: StoreValue) => {
      if (value && (value.includes("localhost") || value.includes("127.0.0.1"))) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
  };
}
