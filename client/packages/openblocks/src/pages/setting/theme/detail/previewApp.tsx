import { ThemeDetail } from "api/commonSettingApi";
import React, { useContext, useEffect, useState } from "react";
import { RootComp } from "comps/comps/rootComp";
import { Comp } from "openblocks-core";
import { evalAndReduceWithExposing } from "comps/utils";
import { ThemeContext } from "comps/utils/themeContext";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import styled from "styled-components";
import dsl from "./previewDsl";

const Preview = styled.div`
  border-radius: 8px;
  height: 435px;
  min-width: 720px;
  overflow: hidden;
  position: relative;
`;

export default function PreviewApp(props: { theme: ThemeDetail }) {
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
    value: dsl as any,
    dispatch,
  });
  useEffect(() => {
    update(comp);
  }, [theme]);
  const externalState = useContext(ExternalEditorContext);
  externalState.readOnly = true;
  externalState.hideHeader = true;

  return (
    <Preview>
      <ThemeContext.Provider value={{ previewTheme: theme }}>{view}</ThemeContext.Provider>
    </Preview>
  );
}
