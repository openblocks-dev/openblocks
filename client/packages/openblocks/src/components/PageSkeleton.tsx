import { Layout, Skeleton } from "antd";
import MainContent from "components/layout/MainContent";
import SideBar from "components/layout/SideBar";
import Header from "./layout/Header";
import { Logo, LogoWithName } from "@openblocks-ee/assets/images";
import styled from "styled-components";

interface IProps {
  logoWithName?: boolean;
  hideHeader?: boolean;
  hideSideBar?: boolean;
  hideContent?: boolean;
}

const StyledLogo = styled(Logo)`
  height: 24px;
  width: 24px;
`;

const StyledLogoWithName = styled(LogoWithName)`
  height: 28px;
  /* width: 28px; */
`;

const StyledSkeleton = styled(Skeleton)`
  display: flex;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  .ant-skeleton-content {
    display: block;
    max-width: 960px;
  }
`;

const SkeletonWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  div {
    width: 100%;
  }
`;

export default function PageSkeleton(props: IProps) {
  const {
    logoWithName = false,
    hideHeader = false,
    hideSideBar = false,
    hideContent = false,
  } = props;
  const skeleton = (
    <SkeletonWrapper>
      <div>
        <StyledSkeleton active />
        <StyledSkeleton active />
      </div>
    </SkeletonWrapper>
  );
  return (
    <Layout>
      {!hideHeader && (
        <Header headerStart={logoWithName ? <StyledLogoWithName /> : <StyledLogo />} />
      )}
      <Layout>
        {!hideSideBar && <SideBar>{skeleton}</SideBar>}
        <MainContent>{!hideContent && skeleton}</MainContent>
      </Layout>
    </Layout>
  );
}
