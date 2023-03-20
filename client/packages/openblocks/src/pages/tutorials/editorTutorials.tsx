// Intro guide
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from "react-joyride";
import { useContext, useEffect, useState } from "react";
import { EditorContext, EditorState } from "comps/editorState";
import {
  changeChildAction,
  executeQueryAction,
  multiChangeAction,
  wrapActionExtraInfo,
} from "openblocks-core";
import { addMapChildAction } from "comps/generators/sameTypeMap";
import { genQueryId, genRandomKey } from "comps/utils/idGenerator";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import {
  defaultJoyrideFloaterProps,
  defaultJoyrideStyles,
  editorBottomClassName,
  editorContentClassName,
  leftCompListClassName,
  tableDataDivClassName,
  tableDragClassName,
  UserGuideLocationState,
} from "./tutorialsConstant";
import { TooltipCodeBlock, TooltipLink, TutorialsTooltip } from "openblocks-design";
import { markUserStatus } from "redux/reduxActions/userActions";
import { useHistory } from "react-router";
import { defaultLayout, GridItemDataType } from "comps/comps/gridItemComp";
import { uiCompRegistry, UICompType } from "comps/uiCompRegistry";
import { BottomResTypeEnum } from "types/bottomRes";
import { trans } from "i18n";
import { i18nObjs } from "../../i18n/index";
import { DatasourceInfo, HttpConfig } from "api/datasourceApi";
import { enObj } from "i18n/locales";
import { QUICK_REST_API_ID } from "constants/datasourceConstants";

const tourSteps: Step[] = [
  {
    content: trans("editorTutorials.componentContent"),
    spotlightPadding: 4,
    disableBeacon: true,
    placement: "left",
    styles: {
      options: {
        width: 408,
      },
    },
    target: `.${tableDragClassName}`,
    title: trans("editorTutorials.component"),
  },
  {
    content: trans("editorTutorials.canvasContent"),
    placement: "bottom",
    disableBeacon: true,
    spotlightClicks: true,
    styles: {
      options: {
        width: 480,
      },
    },
    target: `.${editorContentClassName}`,
    title: trans("editorTutorials.canvas"),
  },
  {
    content: trans("editorTutorials.queryDataContent"),
    placement: "top",
    disableBeacon: true,
    spotlightClicks: true,
    styles: {
      options: {
        width: 480,
      },
    },
    target: `.${editorBottomClassName}`,
    title: trans("editorTutorials.queryData"),
  },
  {
    content: i18nObjs.editorTutorials.compProperties((text: string) => (
      <TooltipCodeBlock text={text} />
    )),
    placement: "left",
    disableBeacon: true,
    spotlightClicks: true,
    spotlightPadding: 8,
    styles: {
      options: {
        width: 408,
      },
    },
    target: `.${tableDataDivClassName}`,
    title: trans("editorTutorials.compProperties"),
  },
  {
    content: i18nObjs.editorTutorials.data(
      (text: string) => <TooltipCodeBlock text={text} />,
      (text: string, url: string) => (
        <TooltipLink href={url} target="_blank">
          {text}
        </TooltipLink>
      )
    ),
    placement: "right",
    spotlightClicks: true,
    styles: {
      options: {
        width: 408,
      },
    },
    target: `.${leftCompListClassName}`,
    title: trans("data"),
  },
];

function addTable(editorState: EditorState) {
  const tableCompName = "table1";
  const compType = "table";
  if (editorState.getUICompByName(tableCompName)) {
    return;
  }
  const key = genRandomKey();
  const defaultDataFn = uiCompRegistry[compType as UICompType]?.defaultDataFn;
  const widgetValue: GridItemDataType = {
    compType,
    name: tableCompName,
    comp: defaultDataFn
      ? defaultDataFn(tableCompName, editorState.getNameGenerator(), editorState)
      : undefined,
  };
  editorState.getUIComp().children.comp.dispatch(
    wrapActionExtraInfo(
      multiChangeAction({
        layout: changeChildAction(
          "layout",
          {
            [key]: {
              i: key,
              x: 0,
              y: 0,
              ...defaultLayout(compType),
            },
          },
          true
        ),
        items: addMapChildAction(key, widgetValue),
      }),
      { compInfos: [{ compName: tableCompName, compType: compType, type: "add" }] }
    )
  );
}

function addQuery(editorState: EditorState, datasourceInfos: DatasourceInfo[]) {
  const queryName = "query1";
  if (
    editorState
      .getQueriesComp()
      .getView()
      .find((q) => q.children.name.getView() === queryName)
  ) {
    editorState.setSelectedBottomRes(queryName, BottomResTypeEnum.Query);
    return;
  }
  const queriesComp = editorState.getQueriesComp();
  const id = genQueryId();
  let dataSourceComp = datasourceInfos.find(
    (info) => info.datasource.name === i18nObjs.editorTutorials.sampleDatasourceName
  );
  if (dataSourceComp) {
    queriesComp.dispatch(
      queriesComp.pushAction({
        id: id,
        name: queryName,
        compType: "mysql",
        comp: { sql: "SELECT * FROM users;", commandType: "INSERT" },
        datasourceId: dataSourceComp?.datasource.id || "",
        triggerType: "manual",
      })
    );
  } else {
    // there's no sample data source, fall back to api source
    queriesComp.dispatch(
      queriesComp.pushAction({
        id: id,
        name: queryName,
        compType: "restApi",
        comp: {
          path: i18nObjs.editorTutorials.mockDataUrl || enObj.editorTutorials.mockDataUrl,
          bodyType: "application/json",
        },
        datasourceId: QUICK_REST_API_ID,
        triggerType: "manual",
      })
    );
  }
  editorState.setSelectedBottomRes(queryName, BottomResTypeEnum.Query);
}

export default function EditorTutorials() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const editorState = useContext(EditorContext);
  const dispatch = useDispatch();
  const history = useHistory<UserGuideLocationState>();
  const datasourceInfos = useSelector((state: AppState) => state.entities.datasource.data);

  useEffect(() => {
    setRun(true);
  }, []);
  const querySize = editorState.getQueriesComp().getView().length;
  const uiCompSize = editorState.uiCompInfoList().length;
  useEffect(() => {
    const query = editorState
      .getQueriesComp()
      .getView()
      .find(
        (q) =>
          q.children.name.getView() === editorState.selectedBottomResName &&
          editorState.selectedBottomResType === BottomResTypeEnum.Query
      );
    setTimeout(() => {
      query && query.children.triggerType.dispatchChangeValueAction("automatic");
    }, 0);
    // auto execute new query
    setTimeout(() => {
      query?.dispatch(executeQueryAction({}));
    }, 1000);
  }, [querySize]);

  const openTableData = () => {
    const ele = document.getElementsByClassName(leftCompListClassName)[0];
    const table = ele?.getElementsByClassName("ant-tree-title")[0];
    if (table) {
      (table as HTMLDivElement)?.click();
    }
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    if (finishedStatuses.includes(status)) {
      dispatch(markUserStatus("newUserGuidance", true));
      history.replace({
        ...history.location,
        state: { ...history.location?.state, showNewUserGuide: false },
      });
      // skip or finish
      setRun(false);
      setStepIndex(0);
      return;
    }
    if (!([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      // not the prev or next step
      return;
    }
    if (index === 0 && action === ACTIONS.NEXT) {
      setStepIndex(nextIndex);
      setTimeout(() => addTable(editorState), 0);
    } else if (index === 1 && action === ACTIONS.NEXT) {
      // re-try to add table in case of the deletion in the prev step
      addTable(editorState);
      addQuery(editorState, datasourceInfos);
      // select table in advance
      editorState.setSelectedCompNames(new Set(["table1"]));
      setStepIndex(nextIndex);
    } else if (index === 2 && action === ACTIONS.NEXT) {
      // change data
      openTableData();
      const tableComp = editorState.getUICompByName("table1");
      tableComp &&
        tableComp.children.comp.children.data.dispatchChangeValueAction("{{query1.data}}");
      setStepIndex(nextIndex);
    } else if (index === 1 && action === ACTIONS.PREV) {
      // cancel select
      editorState.setSelectedCompNames(new Set([]));
      setTimeout(() => setStepIndex(nextIndex), 0);
    } else {
      setStepIndex(nextIndex);
    }
  };

  return (
    <Joyride
      tooltipComponent={TutorialsTooltip}
      continuous
      run={run}
      steps={tourSteps}
      stepIndex={stepIndex}
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      disableScrolling
      styles={defaultJoyrideStyles}
      floaterProps={defaultJoyrideFloaterProps}
      disableOverlayClose
      disableCloseOnEsc
      hideCloseButton
      spotlightPadding={0}
    />
  );
}
