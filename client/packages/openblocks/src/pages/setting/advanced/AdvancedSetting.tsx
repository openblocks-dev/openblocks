import { message } from "antd";
import { CodeEditor } from "base/codeEditor";
import { EmptyContent } from "components/EmptyContent";
import { HelpText } from "components/HelpText";
import InputList from "components/InputList";
import { GreyTextColor } from "constants/style";
import { CustomModal, CustomSelect, TacoButton } from "openblocks-design";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonSettings, setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import { getCommonSettings } from "redux/selectors/commonSettingSelectors";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import { useShallowEqualSelector } from "util/hooks";
import { Level1SettingPageContent, Level1SettingPageTitle } from "../styled";
import { fetchAllApplications } from "redux/reduxActions/applicationActions";
import { normalAppListSelector } from "redux/selectors/applicationSelector";
import { trans } from "i18n";
import { Prompt } from "react-router";
import history from "util/history";
import { Location } from "history";

const AdvancedSettingContent = styled.div`
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

const SaveButton = styled(TacoButton)`
  min-width: 76px;
  height: 28px;
`;

const CustomSelectStyle = styled(CustomSelect)`
  .ant-select .ant-select-selector .ant-select-selection-item {
    max-width: 230px;
    display: block;
  }
`;

let locationInfo: Location | Location<unknown> | null = null;

export function AdvancedSetting() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const commonSettings = useShallowEqualSelector(getCommonSettings);
  const [settings, setSettings] = useState(commonSettings);
  const appList = useSelector(normalAppListSelector);
  const [canLeave, setCanleave] = useState(false);
  const appListOptions = appList.map((app) => ({
    value: app.applicationId,
    label: app.name,
  }));

  useEffect(() => {
    dispatch(fetchCommonSettings({ orgId: currentUser.currentOrgId }));
    dispatch(fetchAllApplications({}));
  }, [currentUser.currentOrgId, dispatch]);

  useEffect(() => {
    setSettings(commonSettings);
  }, [commonSettings]);

  useEffect(() => {
    if (canLeave) {
      history.push((locationInfo as Location)?.pathname);
    }
  }, [canLeave]);

  useEffect(() => {
    dispatch(fetchCommonSettings({ orgId: currentUser.currentOrgId }));
  }, [currentUser.currentOrgId, dispatch]);

  const handleSave = (key: keyof typeof settings) => {
    return (value?: any) => {
      dispatch(
        setCommonSettings({
          orgId: currentUser.currentOrgId,
          data: {
            key,
            value: value ?? settings[key],
          },
          onSuccess: () => {
            if (value !== undefined) {
              setSettings((i) => ({ ...i, [key]: value }));
            }
            message.success(trans("advanced.saveSuccess"));
          },
        })
      );
    };
  };

  const isNotChange = JSON.stringify(commonSettings) === JSON.stringify(settings);

  return (
    <Level1SettingPageContent>
      <Prompt
        message={(location) => {
          locationInfo = location;

          if (!canLeave && isNotChange) {
            setCanleave(true);
          }
          if (canLeave) {
            return true;
          }
          CustomModal.confirm({
            title: trans("theme.leaveTipTitle"),
            content: trans("theme.leaveTipContent"),
            okText: trans("theme.leaveTipOkText"),
            onConfirm: () => {
              setCanleave(true);
            },
          });
          return false;
        }}
        when={!isNotChange}
      />
      <Level1SettingPageTitle>{trans("advanced.title")}</Level1SettingPageTitle>
      <AdvancedSettingContent>
        <div className="section-title">{trans("advanced.defaultHomeTitle")}</div>
        <HelpText style={{ marginBottom: 12 }}>{trans("advanced.defaultHomeHelp")}</HelpText>
        <div className="section-content">
          <CustomSelectStyle
            placeholder={trans("advanced.defaultHomePlaceholder")}
            allowClear={true}
            showSearch={true}
            style={{ width: "264px", height: "32px", marginBottom: 12 }}
            dropdownStyle={{ width: "264px" }}
            value={settings.defaultHomePage}
            onChange={(value: string) => {
              setSettings((v) => ({ ...v, defaultHomePage: value }));
            }}
            options={appListOptions}
            filterOption={(input, option) => (option?.label as string).includes(input)}
          />
          <SaveButton
            buttonType="primary"
            disabled={commonSettings.defaultHomePage === settings.defaultHomePage}
            onClick={() => handleSave("defaultHomePage")()}
          >
            {trans("advanced.saveBtn")}
          </SaveButton>
        </div>
        <div className="section-title">{trans("advanced.preloadJSTitle")}</div>
        <HelpText style={{ marginBottom: 12 }}>{trans("advanced.preloadJSHelp")}</HelpText>
        <div className="section-content">
          <div className="code-editor">
            <CodeEditor
              value={settings.preloadJavaScript || ""}
              onChange={(value) =>
                setSettings((v) => ({ ...v, preloadJavaScript: value.doc.toString() }))
              }
              styleName="window"
              codeType="Function"
              showLineNum
              bordered
            />
          </div>
          <SaveButton
            buttonType="primary"
            disabled={settings.preloadJavaScript === commonSettings.preloadJavaScript}
            onClick={() => handleSave("preloadJavaScript")()}
          >
            {trans("advanced.saveBtn")}
          </SaveButton>
        </div>
        <div className="section-title">{trans("advanced.preloadCSSTitle")}</div>
        <HelpText style={{ marginBottom: 12 }}>{trans("advanced.preloadCSSHelp")}</HelpText>
        <div className="section-content">
          <div className="code-editor">
            <CodeEditor
              value={settings.preloadCSS || ""}
              language="css"
              onChange={(value) => setSettings((v) => ({ ...v, preloadCSS: value.doc.toString() }))}
              styleName="window"
              codeType="Function"
              showLineNum
              bordered
            />
          </div>
          <SaveButton
            buttonType="primary"
            disabled={settings.preloadCSS === commonSettings.preloadCSS}
            onClick={() => handleSave("preloadCSS")()}
          >
            {trans("advanced.saveBtn")}
          </SaveButton>
        </div>
        <div className="section-title">{trans("advanced.preloadLibsTitle")}</div>
        <HelpText style={{ marginBottom: 12 }}>{trans("advanced.preloadLibsHelp")}</HelpText>
        <div className="section-content">
          {(settings.preloadLibs || [])?.length === 0 && (
            <EmptyContent text={trans("advanced.preloadLibsEmpty")} style={{ marginBottom: 2 }} />
          )}
          <InputList
            addBtnText={trans("advanced.preloadLibsAddBtn")}
            value={settings.preloadLibs || []}
            placeholder="https://cdn.xxx.com/example.min.js"
            onChange={(value) => setSettings((v) => ({ ...v, preloadLibs: value }))}
          />
          <SaveButton
            buttonType="primary"
            disabled={settings.preloadLibs === commonSettings.preloadLibs}
            onClick={() => handleSave("preloadLibs")()}
          >
            {trans("advanced.saveBtn")}
          </SaveButton>
        </div>
      </AdvancedSettingContent>
    </Level1SettingPageContent>
  );
}
