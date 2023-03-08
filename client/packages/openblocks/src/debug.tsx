import { Layout, Menu } from "antd";
import { Comp } from "openblocks-core";
import { InputComp } from "comps/comps/textInputComp/inputComp";
import { ButtonComp } from "comps/comps/buttonComp/buttonComp";
import { NavLayout } from "comps/comps/layout/navLayout";
import { MockTableComp } from "comps/comps/tableComp/mockTableComp";
import { ModuleComp } from "comps/comps/moduleComp/moduleComp";
import { StringControl } from "comps/controls/codeControl";
import { simpleMultiComp, withDefault, withPropertyViewFn, withViewFn } from "comps/generators";
import { hookToComp } from "comps/generators/hookToComp";
import { QueryComp } from "comps/queries/queryComp";
import { ExposingInfo } from "comps/utils/exposingTypes";
import { useCompInstance } from "comps/utils/useCompInstance";
import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router";
import { useInterval, useTitle, useWindowSize } from "react-use";
import { DatePickerComp, DateRangeComp } from "comps/comps/dateComp/dateComp";
import { TimePickerComp, TimeRangeComp } from "comps/comps/dateComp/timeComp";
import { trans } from "i18n";

const WindowSizeComp = hookToComp(useWindowSize);

function useCurrentTime() {
  const [time, setTime] = React.useState(0);
  useInterval(() => {
    setTime(new Date().getTime());
  }, 1000);
  return useMemo(
    () => ({
      time: time,
    }),
    [time]
  );
}

const CurrentTimeHookComp = hookToComp(useCurrentTime);

let TitleHookComp = withViewFn(
  simpleMultiComp({
    title: withDefault(StringControl, "Title Test"),
  }),
  (comp) => {
    useTitle(comp.children.title.getView());
    return null;
  }
);
TitleHookComp = withPropertyViewFn(TitleHookComp, (comp) => {
  return comp.children.title.propertyView({
    tooltip: trans("debug.title"),
  });
});

function compDataToString(comp: Comp) {
  if (comp && "exposingInfo" in comp) {
    const x: ExposingInfo = (comp as any)["exposingInfo"]();
    return JSON.stringify(x.propertyValue);
  }
  return null;
}

const childrenMap = {
  input: InputComp,
  table: MockTableComp,
  button: ButtonComp,
  nav: NavLayout,
  view: withDefault(ModuleComp, {
    appId: "62cd2a6216718a6876270586",
  }),
  query: QueryComp,
  time: TimePickerComp,
  timeRange: TimeRangeComp,
  date: DatePickerComp,
  dateRange: DateRangeComp,
  windowSizeHook: WindowSizeComp,
  titleHook: TitleHookComp,
  currentTime: CurrentTimeHookComp,
};
const menuKeys = Object.keys(childrenMap);

const DebugComp = withViewFn(simpleMultiComp(childrenMap), (debugComp) => {
  const history = useHistory();
  const params = useParams<{ name: string }>();
  const selectedKey = params.name;
  const comp = (debugComp.children as Record<string, Comp<unknown>>)[selectedKey];
  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <Layout.Sider theme="light">
        {trans("debug.switch")}
        <Menu
          onClick={(e) => {
            history.push(`/debug_comp/${e.key}`);
            // this.setState({selectedKey: e.key});
          }}
          selectedKeys={[selectedKey]}
        >
          {menuKeys.map((key) => (
            <Menu.Item key={key}>{key}</Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <div>CANVAS:</div>
        {comp && comp.getView()}
        {compDataToString(comp)}
      </Layout.Content>
      <Layout.Sider theme="light" width={300}>
        <div>PROPERTY PANE:</div>
        {comp && comp.getPropertyView()}
      </Layout.Sider>
    </Layout>
  );
});

// const DEBUG_STORAGE = "debug_comp";
// const storageStr = localStorage.getItem(DEBUG_STORAGE);
// const dsl = storageStr ? JSON.parse(storageStr) : {};
// const storageStr = localStorage.getItem(DEBUG_STORAGE);
// const dsl = storageStr ? JSON.parse(storageStr) : undefined;
const dsl = {};

export default function Main() {
  const params = useMemo(
    () => ({
      Comp: DebugComp,
      initialValue: dsl,
    }),
    []
  );

  const [comp] = useCompInstance(params);
  // useCompContainer(DebugComp, dsl, true);
  // save debug comp
  // const [prevComp, setPrevComp] = useState<Comp>();

  // useEffect(() => {
  //   if (!comp || comp === prevComp) {
  //     return;
  //   }
  //   localStorage.setItem(DEBUG_STORAGE, JSON.stringify(comp.toJsonValue()));
  //   setPrevComp(comp);
  // }, [comp, prevComp]);

  return <>{comp ? comp.getView() : "loading"}</>;
}
