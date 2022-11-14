import React, { useState } from "react";
import { Menu } from "antd";
import styled from "styled-components";
import pkg from "__user-pkg-json__";
import compFactories from "__user-dev-comps__";
import CompRunner from "./CompPlayground";

const comps = pkg?.openblocks?.comps || {};

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

const SideBarTitle = styled.div`
  line-height: 28px;
  font-weight: bold;
  padding-left: 8px;
  padding-top: 8px;
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
  /* padding: 16px; */
  height: calc(100vh - 48px);
`;

const items = Object.keys(comps).map((i) => ({
  key: i,
  label: i,
}));

export default function App() {
  const [currentCompName, setCurrentCompName] = useState(Object.keys(comps)[0]);
  const layoutInfo = comps[currentCompName]?.layoutInfo || { w: 5, h: 5 };

  return (
    <Container>
      <Header>
        <div className="pkg-name">
          <span className="name">{pkg.name}</span>
          <span className="version"> - Version: {pkg.version}</span>
        </div>
      </Header>
      <Main>
        <SideBar>
          <Menu
            onSelect={(k) => setCurrentCompName(k)}
            selectedKeys={[currentCompName]}
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </SideBar>
        <Content>
          <CompRunner compFactory={compFactories?.[currentCompName]} layoutInfo={layoutInfo} />
        </Content>
      </Main>
    </Container>
  );
}
