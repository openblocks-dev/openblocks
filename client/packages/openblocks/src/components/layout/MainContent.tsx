import { Layout } from "antd";
import { TopHeaderHeight } from "constants/style";
import styled from "styled-components";

const MainContent = styled(Layout.Content)`
  height: calc(100vh - ${TopHeaderHeight});
  /* display: flex; */
  overflow: auto;
  background: #ffffff;
  position: relative;
`;

export default MainContent;
