import SubSideBar from "components/layout/SubSideBar";
import { ADMIN_ROLE, Org, RoleIdType } from "constants/orgConstants";
import { CustomModal, Menu } from "openblocks-design";
import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "redux/reducers";
import { createOrgAction, deleteOrgAction } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { TwoColumnSettingPageContent } from "../styled";
import OrgSettingContent from "./orgSettingContent";
import { MenuItemWithDelete } from "openblocks-design";
import { trans } from "i18n";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 2200px;
  min-width: 880px;
  padding: 36px 36px 0 24px;
  overflow: auto;
`;

type OrgSettingProp = {
  orgs: Org[];
  orgRoleMap: Map<string, RoleIdType>;
  newCreatedOrg?: Partial<Org>;
  adminOrgs: Org[];
  orgIdMap: Map<string, Org>;
} & RouteComponentProps<any, StaticContext, { routeAction: string }>;

function OrganizationSetting(props: OrgSettingProp) {
  const { orgs, newCreatedOrg, orgRoleMap, adminOrgs, orgIdMap } = props;
  const [selectKey, setSelectKey] = useState("");
  const dispatch = useDispatch();
  const didMountRef = useRef(false);

  useEffect(() => {
    // select newly created org
    if (didMountRef.current && newCreatedOrg?.id) {
      setSelectKey(newCreatedOrg.id);
    }
    didMountRef.current = true;
  }, [newCreatedOrg]);

  useEffect(() => {
    if (!selectKey) {
      setSelectKey(adminOrgs[0]?.id);
    }
  }, [adminOrgs]);

  const menuItems = adminOrgs.map((org) => ({
    key: org.id,
    label: (
      <MenuItemWithDelete
        showDelete={adminOrgs.length > 1}
        onDelete={() => {
          CustomModal.confirm({
            title: trans("orgSettings.deleteModalTitle"),
            content: trans("orgSettings.deleteModalContent"),
            onConfirm: () => dispatch(deleteOrgAction(org.id)),
            confirmBtnType: "delete",
            okText: trans("delete"),
          });
        }}
      >
        {org.name}
      </MenuItemWithDelete>
    ),
  }));

  return (
    <TwoColumnSettingPageContent>
      <SubSideBar title={trans("orgSettings.title")}>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectKey]}
          onSelect={(e) => {
            setSelectKey(e.key);
          }}
          createBtnConfig={{
            text: trans("orgSettings.createOrg"),
            onClick: () => dispatch(createOrgAction(orgs)),
          }}
          items={menuItems}
        />
      </SubSideBar>
      <ContentWrapper key={selectKey}>
        <OrgSettingContent org={orgIdMap.get(selectKey)} />
      </ContentWrapper>
    </TwoColumnSettingPageContent>
  );
}

const mapStateToProps = (state: AppState, props: OrgSettingProp) => {
  const orgs = state.ui.users.currentUser.orgs;
  const orgRoleMap = state.ui.users.currentUser.orgRoleMap;
  return {
    orgs: orgs,
    orgRoleMap: orgRoleMap,
    newCreatedOrg: state.ui.org.newCreatedOrg,
    adminOrgs: orgs.filter((org) => orgRoleMap.get(org.id) === ADMIN_ROLE),
    orgIdMap: new Map(orgs.map((org) => [org.id, org])),
  };
};

export default connect(mapStateToProps)(OrganizationSetting);
