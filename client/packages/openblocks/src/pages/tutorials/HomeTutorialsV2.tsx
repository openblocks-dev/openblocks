import Joyride, { CallBackProps, STATUS } from "react-joyride";
import React, { useEffect, useState } from "react";
import {
  defaultJoyrideFloaterProps,
  defaultJoyrideStyles,
} from "pages/tutorials/tutorialsConstant";
import { markUserStatus } from "redux/reduxActions/userActions";
import { useDispatch } from "react-redux";
import { trans } from "i18n";
import { TutorialsTooltip } from "openblocks-design";

export const createAppItemClass = "joyride-create-app-item";

export function HomepageTourV2() {
  const dispatch = useDispatch();
  const [run, setRun] = useState(false);

  useEffect(() => {
    setTimeout(() => setRun(true), 400);
  }, []);

  return (
    <Joyride
      continuous
      tooltipComponent={TutorialsTooltip}
      run={run}
      steps={[
        {
          isFixed: true,
          content: trans("homeTutorials.createAppContent", { productName: trans("productName") }),
          placement: "left",
          spotlightClicks: true,
          disableBeacon: true,
          hideFooter: true,
          styles: {
            options: {
              width: 480,
            },
          },
          target: `.${createAppItemClass}`,
          title: trans("homeTutorials.createAppTitle"),
        },
      ]}
      floaterProps={defaultJoyrideFloaterProps}
      styles={defaultJoyrideStyles}
      scrollToFirstStep
      disableScrolling
      callback={(data: CallBackProps) => {
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(data.status)) {
          dispatch(markUserStatus("newUserGuidance", true));
        }
      }}
      disableOverlayClose
      disableCloseOnEsc
    />
  );
}
