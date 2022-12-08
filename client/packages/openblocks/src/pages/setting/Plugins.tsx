import { message } from "antd";
import { EmptyContent } from "components/EmptyContent";
import { HelpText } from "components/HelpText";
import InputList from "components/InputList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonSettings, setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import { getCommonSettings } from "redux/selectors/commonSettingSelectors";
import { getUser } from "redux/selectors/usersSelectors";
import { useShallowEqualSelector } from "util/hooks";
import {
  Level1SettingPageContent,
  Level1SettingPageTitle,
  SaveButton,
  SettingContent,
} from "./styled";
import { trans } from "i18n";

export function PluginSetting() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const commonSettings = useShallowEqualSelector(getCommonSettings);
  const [settings, setSettings] = useState(commonSettings);

  useEffect(() => {
    setSettings(commonSettings);
  }, [commonSettings]);

  useEffect(() => {
    dispatch(fetchCommonSettings({ orgId: currentUser.currentOrgId }));
  }, [currentUser.currentOrgId, dispatch]);

  const handleSaveCommonSetting = (key: keyof typeof settings) => {
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

  return (
    <Level1SettingPageContent>
      <Level1SettingPageTitle>{trans("pluginSetting.title")}</Level1SettingPageTitle>
      <SettingContent>
        <div className="section-title">{trans("pluginSetting.npmPluginTitle")}</div>
        <HelpText style={{ marginBottom: 12 }}>{trans("pluginSetting.npmPluginDesc")}</HelpText>
        <div className="section-content">
          {(settings.npmPlugins || [])?.length === 0 && (
            <EmptyContent
              text={trans("pluginSetting.npmPluginEmpty")}
              style={{ marginBottom: 2 }}
            />
          )}
          <InputList
            addBtnText={trans("pluginSetting.npmPluginAddButton")}
            value={settings.npmPlugins || []}
            placeholder="https://www.npmjs.com/package/hello-openblocks-comps"
            onChange={(value) => setSettings((v) => ({ ...v, npmPlugins: value }))}
          />
          <SaveButton onClick={() => handleSaveCommonSetting("npmPlugins")()}>
            {trans("advanced.saveBtn")}
          </SaveButton>
        </div>
      </SettingContent>
    </Level1SettingPageContent>
  );
}
