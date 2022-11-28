import styled from "styled-components";

export const TwoColumnSettingPageContent = styled.div`
  display: flex;
  height: 100%;
`;

export const Level1SettingPageContent = styled.div`
  padding: 32px 36px 32px 24px;
  max-width: 2200px;
  min-width: 600px;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

export const Level1SettingPageContentWithList = styled(Level1SettingPageContent)`
  padding: 32px 24px 32px 12px;
`

export const Level1SettingPageTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #222;
  line-height: 1;
  display: flex;
  justify-items: center;
  margin-bottom: 40px;
`;

export const Level1SettingPageTitleWithBtn = styled(Level1SettingPageTitle)`
  justify-content: space-between;
  margin: 0 12px 6px 12px;
`
