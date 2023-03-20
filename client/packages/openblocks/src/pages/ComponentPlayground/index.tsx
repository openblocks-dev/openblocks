import { useParams } from "react-router-dom";
import styled from "styled-components";
import "comps";
import { UICompType, UICompManifest, uiCompRegistry, UICompCategory } from "comps/uiCompRegistry";
import { CompPlayground } from "ide/CompPlayground";
import { Comp } from "openblocks-core";
import { EditorContext, EditorState } from "comps/editorState";
import { RootComp } from "comps/comps/rootComp";

type CompInfo = UICompManifest & { key: string };
const groups: Partial<Record<UICompCategory, CompInfo[]>> = {};

Object.entries(uiCompRegistry).forEach(([key, comp]) => {
  const cat = comp.categories.find((c) => c !== "common");
  if (cat === undefined) {
    return;
  }
  if (!groups[cat]) {
    groups[cat] = [];
  }
  groups[cat]?.push({ ...comp, key });
});

const Wrapper = styled.div`
  display: flex;
  background-color: #f5f5f6;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  .header {
    height: 48px;
    padding-left: 16px;
    background-color: #2c2c2c;
    .brand {
      color: white;
      height: 100%;
      line-height: 48px;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .content {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
`;

const editorState = new EditorState(new RootComp({ value: {} }), () => {});

export default function ComponentPlayground() {
  window.__OPENBLOCKS_DEV__ = {};

  const params = useParams<{ name: UICompType; dsl: string }>();
  const dsl = JSON.parse(decodeURIComponent(params.dsl || ""));
  const compManifest = uiCompRegistry[params.name];

  return (
    <Wrapper>
      <div className="content">
        <EditorContext.Provider value={editorState}>
          <CompPlayground
            initialValue={dsl}
            compFactory={compManifest.comp as unknown as Comp<any>}
            layoutInfo={compManifest.layoutInfo || { h: 5, w: 5 }}
          />
        </EditorContext.Provider>
      </div>
    </Wrapper>
  );
}
