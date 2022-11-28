import { useState } from "react";
import { Menu } from "antd";
import { CompPlayground } from "./CompPlayground";
import styled from "styled-components";
import { UICompLayoutInfo } from "comps/uiCompRegistry";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 48px;
  border-bottom: 1px solid #e1e3eb;
  padding-left: 24px;
  .pkg-name {
    line-height: 48px;
  }
  .name {
    font-size: 14px;
    font-weight: bold;
  }
  .version {
    margin-left: 4px;
    font-size: 12px;
    color: #333;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  width: 200px;
  background-color: #fff;
  border-right: 1px solid #e1e3eb;
  overflow: auto;
  height: calc(100vh - 48px);
  .ant-menu {
    border-right: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  height: calc(100vh - 48px);
`;

export interface CompMeta {
  name: string;
  layoutInfo?: UICompLayoutInfo;
}

export interface CompIDEProps {
  compMap: Record<string, any>;
  compMeta: Record<string, CompMeta>;
  packageName: string;
  packageVersion: string;
}

export function CompIDE(props: CompIDEProps) {
  const { compMap, compMeta, packageName, packageVersion } = props;
  const [currentCompName, setCurrentCompName] = useState<string>(Object.keys(compMeta)[0]);
  const layoutInfo = compMeta[currentCompName]?.layoutInfo || { w: 5, h: 5 };

  const items = Object.keys(compMeta).map((i) => ({
    key: i,
    label: i,
  }));

  return (
    <Container>
      <Header>
        <div className="pkg-name">
          <span className="name">{packageName}</span>
          <span className="version"> - Version: {packageVersion}</span>
        </div>
      </Header>
      <Main>
        <SideBar>
          <Menu
            onSelect={(k) => setCurrentCompName(k.selectedKeys[0])}
            selectedKeys={[currentCompName]}
            items={items}
            mode="inline"
          />
        </SideBar>
        <Content>
          <CompPlayground compFactory={compMap[currentCompName]} layoutInfo={layoutInfo} />
        </Content>
      </Main>
    </Container>
  );
}
