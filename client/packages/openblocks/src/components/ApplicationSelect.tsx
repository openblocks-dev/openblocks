import { AppTypeEnum } from "constants/applicationConstants";
import { Dropdown } from "openblocks-design";
import { trans } from "i18n";
import { ReactNode, useEffect } from "react";
import { useApplicationId } from "util/hooks";
import { useDispatch, useSelector } from "react-redux";
import { normalAppListSelector } from "../redux/selectors/applicationSelector";
import { fetchAllApplications } from "../redux/reduxActions/applicationActions";

interface IAppSelectProps {
  value?: string;
  onChange?: (id: string) => void;
  highlightCurrent?: boolean;
}

export default function ApplicationSelect(props: IAppSelectProps) {
  const { value, onChange, highlightCurrent } = props;
  const appId = useApplicationId();
  const dispatch = useDispatch();
  const applications = useSelector(normalAppListSelector).filter(
    (app) =>
      app.applicationType === AppTypeEnum.Application ||
      app.applicationType === AppTypeEnum.NavLayout
  );

  useEffect(() => {
    applications.length === 0 && dispatch(fetchAllApplications({}));
  }, [dispatch, applications.length]);

  if (highlightCurrent) {
    applications.sort((a, b) => {
      if (a.applicationId === appId) {
        return -1;
      }
      if (b.applicationId === appId) {
        return 1;
      }
      return 0;
    });
  }
  return (
    <Dropdown
      showSearch={true}
      value={value}
      onChange={(id: string) => onChange?.(id)}
      options={applications.map((i) => {
        let label: ReactNode = i.name;
        if (i.applicationId === appId && highlightCurrent) {
          label = (
            <span>
              {label} <b>({trans("eventHandler.currentApp")})</b>
            </span>
          );
        }
        return { label, value: i.applicationId };
      })}
    />
  );
}
