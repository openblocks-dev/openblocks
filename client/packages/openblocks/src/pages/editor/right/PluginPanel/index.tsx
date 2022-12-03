import { EmptyContent } from "components/EmptyContent";
import { trans } from "i18n";
import { useMemo, useState } from "react";
import { RightPanelContentWrapper } from "../styledComponent";
import { PluginItem } from "./PluginItem";
import { useDispatch, useSelector } from "react-redux";
import { setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import { CustomModal, TacoButton, TacoInput } from "openblocks-design";
import { getCommonSettings } from "redux/selectors/commonSettingSelectors";
import { message } from "antd";
import styled from "styled-components";

const packageUrlPrefix = "https://www.npmjs.com/package/";

function normalizeNpmPackage(nameOrUrl: string) {
  if (nameOrUrl.startsWith(packageUrlPrefix)) {
    return nameOrUrl.substring(packageUrlPrefix.length);
  }
  return nameOrUrl;
}

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export default function PluginPanel() {
  const dispatch = useDispatch();
  const [isAddModalShow, showAddModal] = useState(false);
  const [newPluginName, setNewPluginName] = useState("");
  const user = useSelector(getCurrentUser);
  const commonSettings = useSelector(getCommonSettings);

  const plugins = useMemo(
    () =>
      (commonSettings?.npmPlugins || []).map((i) => {
        return {
          name: normalizeNpmPackage(i),
          raw: i,
        };
      }),
    [commonSettings?.npmPlugins]
  );

  const handleSetNpmPlugins = (nextNpmPlugins: string[]) => {
    dispatch(
      setCommonSettings({
        orgId: user.currentOrgId,
        data: {
          key: "npmPlugins",
          value: nextNpmPlugins,
        },
      })
    );
  };

  const handleAddNewPlugin = () => {
    if (!newPluginName) {
      return;
    }
    if (
      commonSettings.npmPlugins?.find(
        (i) => normalizeNpmPackage(i) === normalizeNpmPackage(newPluginName)
      )
    ) {
      message.error(trans("npm.pluginExisted"));
      return;
    }
    const nextNpmPlugins = (commonSettings?.npmPlugins || []).concat(newPluginName);
    handleSetNpmPlugins(nextNpmPlugins);
    setNewPluginName("");
    showAddModal(false);
  };

  const handleRemove = (name: string) => {
    const nextNpmPlugins = commonSettings?.npmPlugins?.filter((i) => i !== name) || [];
    handleSetNpmPlugins(nextNpmPlugins);
  };

  const items = plugins.map((i) => (
    <PluginItem key={i.name} name={i.name} onRemove={() => handleRemove(i.raw)} />
  ));

  const empty = (
    <EmptyContent style={{ marginBottom: 8 }} text={trans("rightPanel.emptyPlugins")} />
  );

  return (
    <RightPanelContentWrapper>
      {items.length > 0 ? items : empty}
      <Footer>
        <TacoButton buttonType="blue" onClick={() => showAddModal(true)}>
          {trans("npm.addPluginBtnText")}
        </TacoButton>
      </Footer>
      <CustomModal
        centered
        title={trans("npm.addPluginModalTitle")}
        visible={isAddModalShow}
        onOk={handleAddNewPlugin}
        onCancel={() => showAddModal(false)}
      >
        <span style={{ display: "block", marginBottom: "4px" }}>
          {trans("npm.pluginNameLabel")}
        </span>
        <TacoInput
          autoFocus
          onPressEnter={() => {
            handleAddNewPlugin();
          }}
          onChange={(e) => {
            setNewPluginName(e.target.value);
          }}
          value={newPluginName}
        />
      </CustomModal>
    </RightPanelContentWrapper>
  );
}
