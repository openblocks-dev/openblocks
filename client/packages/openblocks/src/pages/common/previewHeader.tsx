import { Skeleton } from "antd";
import Header from "components/layout/Header";
import { SHARE_TITLE } from "constants/apiConstants";
import { ALL_APPLICATIONS_URL, APPLICATION_VIEW_URL, AUTH_LOGIN_URL } from "constants/routesURL";
import { User } from "constants/userConstants";
import { EllipsisTextCss, isDarkColor, TacoButton, TextEditIcon } from "openblocks-design";
import { useSelector } from "react-redux";
import { currentApplication, getTemplateId } from "redux/selectors/applicationSelector";
import { getUser, isFetchingUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import history from "util/history";
import { useApplicationId } from "util/hooks";
import { canEditApp, canManageApp } from "util/permissionUtils";
import ProfileDropdown from "./profileDropdown";
import { trans } from "i18n";
import { Logo } from "@openblocks-ee/assets/images";
import { AppPermissionDialog } from "../../components/PermissionDialog/AppPermissionDialog";
import { useState } from "react";
import { getBrandingConfig } from "../../redux/selectors/configSelectors";

const HeaderFont = styled.div<{ bgColor: string }>`
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (isDarkColor(props.bgColor) ? "#ffffff" : "#000000")};
  font-style: normal;
  line-height: 24px;
  margin-right: 8px;
  margin-left: 20px;
  max-width: 264px;
  ${EllipsisTextCss};
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(Logo)`
  height: 28px;
  width: 28px;
`;

const LoginBtn = styled(TacoButton)`
  min-width: 60px;
  padding: 0;
  height: 28px;
  margin-right: 4px;
`;

const CloneBtn = styled(TacoButton)`
  min-width: 60px;
  height: 28px;
`;

const PreviewBtn = styled(TacoButton)`
  color: #ffffff;
  background: #8b8fa34c;
  border: none;
  height: 28px;
  margin-right: 8px;
  min-width: 60px;
  padding: 0;
  cursor: pointer;

  &:hover {
    background: #666666;
    color: #ffffff;
    border: none;
  }

  &:focus {
    background: #666666;
    color: #ffffff;
    border: none;
  }
`;

const EditIcon = styled(TextEditIcon)`
  margin-right: 4px;

  g g {
    fill: #ffffff;
  }
`;

const EditBtn = styled(TacoButton)`
  min-width: 60px;
  height: 28px;
  margin-right: 24px;
  padding: 0;
`;

const Wrapper = styled.div`
  display: inherit;
  @media screen and (max-width: 500px) {
    > div:nth-of-type(1),
    > button {
      display: none;
    }
  }
`;

export function HeaderProfile(props: { user: User }) {
  const { user } = props;
  const fetchingUser = useSelector(isFetchingUser);
  const templateId = useSelector(getTemplateId);
  if (fetchingUser) {
    return <Skeleton.Avatar shape="circle" size={28} />;
  }
  return (
    <div>
      {user.isAnonymous ? (
        !templateId ? (
          <LoginBtn buttonType="primary" onClick={() => history.push(AUTH_LOGIN_URL)}>
            {trans("userAuth.login")}
          </LoginBtn>
        ) : null
      ) : (
        <ProfileDropdown user={user} profileSide={28} fontSize={12} />
      )}
    </div>
  );
}

export const PreviewHeader = () => {
  const user = useSelector(getUser);
  const application = useSelector(currentApplication);
  const applicationId = useApplicationId();
  const templateId = useSelector(getTemplateId);
  const brandingConfig = useSelector(getBrandingConfig);
  const [permissionDialogVisible, setPermissionDialogVisible] = useState(false);

  const headerStart = (
    <>
      <StyledLink onClick={() => history.push(ALL_APPLICATIONS_URL)}>
        <LogoIcon branding={true} />
      </StyledLink>
      <HeaderFont bgColor={brandingConfig?.headerColor ?? "#2c2c2c"}>
        {application && application.name}
      </HeaderFont>
    </>
  );

  const headerEnd = (
    <Wrapper>
      {canManageApp(user, application) && (
        <AppPermissionDialog
          applicationId={applicationId}
          visible={permissionDialogVisible}
          onVisibleChange={(visible) => !visible && setPermissionDialogVisible(false)}
        />
      )}
      {canManageApp(user, application) && (
        <PreviewBtn onClick={() => setPermissionDialogVisible(true)}>{SHARE_TITLE}</PreviewBtn>
      )}
      {canEditApp(user, application) && (
        <EditBtn
          buttonType={"primary"}
          onClick={() =>
            // redirection to app by JS will cause the problem that queries don't execute on initialization
            // so just open a new window.
            window.open(APPLICATION_VIEW_URL(applicationId, "edit"))
          }
        >
          <EditIcon />
          {trans("edit")}
        </EditBtn>
      )}
      {!!templateId && (
        <CloneBtn
          style={{ marginRight: !user.isAnonymous ? "24px" : "" }}
          buttonType="primary"
          onClick={() => {
            window.open(trans("template.cloneUrl") + templateId);
          }}
        >
          {trans("header.clone")}
        </CloneBtn>
      )}
      <HeaderProfile user={user} />
    </Wrapper>
  );
  return (
    <Header
      headerStart={headerStart}
      headerEnd={headerEnd}
      style={{ backgroundColor: brandingConfig?.headerColor }}
    />
  );
};
