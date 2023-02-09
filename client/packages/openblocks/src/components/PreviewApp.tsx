import { ThemeDetail } from "api/commonSettingApi";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { RootComp } from "comps/comps/rootComp";
import { Comp } from "openblocks-core";
import { evalAndReduceWithExposing } from "comps/utils";
import { ThemeContext } from "comps/utils/themeContext";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import styled from "styled-components";
import { JSONObject } from "../util/jsonTypes";

const Preview = styled.div`
  border-radius: 6px;
  height: 411px;
  min-width: 670px;
  overflow: hidden;
  position: relative;
  .link1 .ant-btn-link {
    padding-left: 10px;
  }
  > div {
    margin-top: -12px;
  }
`;

export default function PreviewApp(props: {
  style?: CSSProperties;
  theme: ThemeDetail;
  dsl: JSONObject;
}) {
  const { theme } = props;
  const [view, setView] = useState<React.ReactNode>(null);
  let ins: Comp | null = null;

  const update = (comp: RootComp) => {
    comp.preloaded = true;
    ins = evalAndReduceWithExposing(comp);
    ins && setView(ins.getView());
  };

  const dispatch = (v: any) => {
    if (!ins) {
      return;
    }
    update((ins as any).reduce(v));
  };
  const comp = new RootComp({
    value: props.dsl,
    dispatch,
  });
  useEffect(() => {
    update(comp);
  }, [theme]);
  const externalState = useContext(ExternalEditorContext);
  externalState.readOnly = true;
  externalState.hideHeader = true;

  return (
    <Preview style={props.style}>
      <ThemeContext.Provider value={{ previewTheme: theme }}>{view}</ThemeContext.Provider>
    </Preview>
  );
}
