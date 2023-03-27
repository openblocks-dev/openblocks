import { ADMIN_ROLE } from "constants/orgConstants";
import { AddIcon, CustomModal, DangerIcon, EditPopover } from "openblocks-design";
import { useDispatch, useSelector } from "react-redux";
import { createOrgAction, deleteOrgAction } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { trans, transToNode } from "i18n";
import { buildOrgId } from "constants/routesURL";
import {
  CreateButton,
  EditBtn,
  OperationWrapper,
  PopoverIcon,
} from "../permission/styledComponents";
import { Table } from "components/Table";
import history from "util/history";
import { StyledOrgLogo } from "./styledComponents";
import { Level1SettingPageContentWithList, Level1SettingPageTitleWithBtn } from "../styled";
import { timestampToHumanReadable } from "util/dateTimeUtils";
import { isSaasMode } from "util/envUtils";
import { selectSystemConfig } from "redux/selectors/configSelectors";
import { Form, Input } from "antd";
import { getUser } from "redux/selectors/usersSelectors";
import { getOrgCreateStatus } from "redux/selectors/orgSelectors";

const OrgName = styled.div`
  display: flex;
  align-items: center;

  > div {
    width: 34px;
    min-width: 34px;
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

const Content = styled.div`
  &,
  .ant-form-item-label,
  .ant-form-item-label label {
    font-size: 13px;
    line-height: 19px;
  }

  .ant-input {
    font-size: 13px;
    line-height: 20px;
    padding: 5px 11px;

    &::-webkit-input-placeholder {
      color: #b8b9bf;
    }
  }

  .ant-form-item-label {
    margin-top: 13px;
    padding-bottom: 5px;

    label {
      display: inline;

      ::before {
        vertical-align: bottom;
      }
    }
  }

  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-form-item-explain-error {
    font-size: 13px;
    line-height: 12px;
    margin-top: 4px;
    position: absolute;
  }
`;

const Tip = styled.div`
  background: #fff3f1;
  border-radius: 4px;
  color: #333333;
  padding: 8px 13px 8px 16px;
  display: flex;
  line-height: 20px;
  margin-top: 8px;

  span {
    margin-left: 8px;
  }

  svg {
    min-width: 16px;
    width: 16px;
    height: 16px;
    margin-top: 2px;
  }
`;

type DataItemInfo = {
  id: string;
  del: boolean;
  createTime: string;
  orgName: string;
  logoUrl: string;
};

function OrganizationSetting() {
  const user = useSelector(getUser);
  const orgs = user.orgs;
  const adminOrgs = orgs.filter((org) => user.orgRoleMap.get(org.id) === ADMIN_ROLE);
  const orgCreateStatus = useSelector(getOrgCreateStatus);
  const dispatch = useDispatch();
  const sysConfig = useSelector(selectSystemConfig);
  const [form] = Form.useForm();

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
            loading={orgCreateStatus === "requesting"}
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
            key: i,
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
                        width: "384px",
                        title: trans("orgSettings.deleteModalTitle"),
                        bodyStyle: { marginTop: 0 },
                        content: (
                          <Content>
                            <Tip>
                              <DangerIcon />
                              <span>
                                {transToNode("orgSettings.deleteModalContent", {
                                  permanentlyDelete: (
                                    <b>{trans("orgSettings.permanentlyDelete")}</b>
                                  ),
                                  notRestored: <b>{trans("orgSettings.notRestored")}</b>,
                                })}
                              </span>
                            </Tip>
                            <Form layout="vertical" form={form}>
                              <Form.Item
                                name="name"
                                label={transToNode("orgSettings.deleteModalLabel", {
                                  name: (
                                    <span style={{ color: "#4965F2", margin: "0 5px" }}>
                                      {item.orgName}
                                    </span>
                                  ),
                                })}
                                rules={[
                                  {
                                    required: true,
                                    message: trans("orgSettings.deleteModalTip"),
                                  },
                                ]}
                              >
                                <Input placeholder={trans("orgSettings.orgName")} />
                              </Form.Item>
                            </Form>
                          </Content>
                        ),
                        onConfirm: () => {
                          form.submit();
                          return form.validateFields().then(() => {
                            const name = form.getFieldValue("name");
                            if (name === item.orgName) {
                              dispatch(deleteOrgAction(item.id));
                              form.resetFields();
                            } else {
                              form.setFields([
                                {
                                  name: "name",
                                  errors: [trans("orgSettings.deleteModalErr")],
                                },
                              ]);
                              throw new Error();
                            }
                          });
                        },
                        onCancel: () => {
                          form.resetFields();
                        },
                        confirmBtnType: "delete",
                        okText: trans("orgSettings.deleteModalBtn"),
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

export const OrgList = OrganizationSetting;
