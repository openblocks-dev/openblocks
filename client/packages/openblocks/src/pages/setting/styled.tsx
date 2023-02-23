import { GreyTextColor } from "constants/style";
import { TacoButton } from "openblocks-design";
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
`;

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
  margin: 0 12px 15px 12px;
  height: 32px;
`;
export const SettingContent = styled.div`
  max-width: 840px;
  .section-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .section-content {
    margin-bottom: 32px;
  }
  .section-option {
    color: ${GreyTextColor};
    margin-bottom: 14px;
    font-size: 13px;
  }
  .code-editor {
    margin-bottom: 12px;
  }
`;

export const SaveButton = styled(TacoButton)`
  min-width: 76px;
`;
