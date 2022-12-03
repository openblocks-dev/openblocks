import { ADMIN_ROLE, Org } from "constants/orgConstants";
import { AddIcon, CustomModal, EditPopover } from "openblocks-design";
import { connect, useDispatch, useSelector } from "react-redux";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "redux/reducers";
import { createOrgAction, deleteOrgAction } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { trans } from "i18n";
import { buildOrgId } from "constants/routesURL";
import {
  OperationWrapper,
  EditBtn,
  PopoverIcon,
  CreateButton,
} from "../permission/styledComponents";
import { Table } from "components/Table";
import history from "util/history";
import { StyledOrgLogo } from "./styledComponents";
import { Level1SettingPageContentWithList, Level1SettingPageTitleWithBtn } from "../styled";
import { timestampToHumanReadable } from "util/dateTimeUtils";
import { isSaasMode } from "util/envUtils";
import { selectSystemConfig } from "redux/selectors/configSelectors";

const OrgName = styled.div`
  display: flex;
  align-items: center;

  > div {
    width: 34px;
    height: 34px;
    margin-right: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    span {
      font-size: 12px;
    }
  }

  > span {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
`;

const TableStyled = styled(Table)`
  .ant-table-tbody > tr > td {
    padding: 11px 12px;
  }
`;

type OrgSettingProp = {
  orgs: Org[];
  adminOrgs: Org[];
} & RouteComponentProps<any, StaticContext, { routeAction: string }>;

type DataItemInfo = {
  id: string;
  del: boolean;
  createTime: string;
  orgName: string;
  logoUrl: string;
};

function OrganizationSetting(props: OrgSettingProp) {
  const { orgs, adminOrgs } = props;
  const dispatch = useDispatch();
  const sysConfig = useSelector(selectSystemConfig);

  const dataSource = adminOrgs.map((org) => ({
    id: org.id,
    del: adminOrgs.length > 1,
    createTime: org.createTime,
    orgName: org.name,
    logoUrl: org.logoUrl,
  }));

  return (
    <Level1SettingPageContentWithList>
      <Level1SettingPageTitleWithBtn>
        {trans("settings.organization")}
        {isSaasMode(sysConfig) && (
          <CreateButton
            buttonType={"primary"}
            icon={<AddIcon />}
            onClick={() => dispatch(createOrgAction(orgs))}
          >
            {trans("orgSettings.createOrg")}
          </CreateButton>
        )}
      </Level1SettingPageTitleWithBtn>
      <div>
        <TableStyled
          tableLayout={"auto"}
          scroll={{ x: "100%" }}
          pagination={false}
          onRow={(record) => ({
            onClick: () => history.push(buildOrgId((record as DataItemInfo).id)),
          })}
          columns={[
            {
              title: trans("orgSettings.orgName"),
              dataIndex: "orgName",
              ellipsis: true,
              render: (_, record: any) => {
                return (
                  <OrgName>
                    <StyledOrgLogo source={record.logoUrl} orgName={record.orgName} />
                    <span>{record.orgName}</span>
                  </OrgName>
                );
              },
            },
            {
              title: trans("memberSettings.createTime"),
              dataIndex: "createTime",
              ellipsis: true,
              render: (value) => (
                <span style={{ color: "#8B8FA3" }}>{timestampToHumanReadable(value)}</span>
              ),
            },
            { title: " ", dataIndex: "operation", width: "208px" },
          ]}
          dataSource={dataSource.map((item, i) => ({
            ...item,
            operation: (
              <OperationWrapper>
                <EditBtn
                  className={"home-datasource-edit-button"}
                  buttonType={"primary"}
                  onClick={() => history.push(buildOrgId(item.id))}
                >
                  {trans("edit")}
                </EditBtn>
                {item.del && (
                  <EditPopover
                    del={() => {
                      CustomModal.confirm({
                        title: trans("orgSettings.deleteModalTitle"),
                        content: trans("orgSettings.deleteModalContent"),
                        onConfirm: () => dispatch(deleteOrgAction(item.id)),
                        confirmBtnType: "delete",
                        okText: trans("delete"),
                      });
                    }}
                  >
                    <PopoverIcon tabIndex={-1} />
                  </EditPopover>
                )}
              </OperationWrapper>
            ),
          }))}
        />
      </div>
    </Level1SettingPageContentWithList>
  );
}

const mapStateToProps = (state: AppState, props: OrgSettingProp) => {
  const orgs = state.ui.users.currentUser.orgs;
  const orgRoleMap = state.ui.users.currentUser.orgRoleMap;
  return {
    orgs: orgs,
    adminOrgs: orgs.filter((org) => orgRoleMap.get(org.id) === ADMIN_ROLE),
  };
};

export const OrgList = connect(mapStateToProps)(OrganizationSetting);
