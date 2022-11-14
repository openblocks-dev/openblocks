import styled from "styled-components";
import "comps";
import { UICompManifest, uiCompRegistry, UICompCategory } from "comps/uiCompRegistry";

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
  .main {
    display: flex;
  }
  .sidebar {
    width: 260px;
    height: 100vh;
    border-right: 1px solid #f5f5f5;
    padding: 16px 8px;
    background: #f9f9fa;
    overflow-y: auto;
    .search {
      padding: 0 8px;
    }
    .nav-group-title {
      margin-top: 24px;
      margin-bottom: 14px;
      padding-left: 12px;
      font-size: 14px;
      color: #8b8fa3;
      line-height: 1;
    }
    .nav {
      display: block;
      line-height: 1;
      padding: 10px 0 10px 12px;
      font-size: 13px;
      border-radius: 4px;
      margin-bottom: 4px;
      &:link,
      &:visited {
        color: #222;
      }
      &.active,
      &:hover {
        color: #4965f2;
        background: #eef0f3;
      }
      &.active {
        font-weight: 700;
      }
    }
  }
  .content {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    padding: 32px 60px 89px 60px;
  }
`;

export default function ComponentDoc() {
  return <></>;
}
