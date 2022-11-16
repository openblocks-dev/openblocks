import { Skeleton } from "antd";
import Header from "components/layout/Header";
import { SHARE_TITLE } from "constants/apiConstants";
import { ALL_APPLICATIONS_URL, APPLICATION_VIEW_URL, AUTH_LOGIN_URL } from "constants/routesURL";
import { User } from "constants/userConstants";
import { TacoButton } from "openblocks-design";
import { TextEditIcon } from "openblocks-design";
import AppPermissionDialog from "pages/ApplicationV2/components/AppPermissionDialog";
import { useSelector } from "react-redux";
import { currentApplication, getTemplateId } from "redux/selectors/applicationSelector";
import { getCurrentUser, isFetchingUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import history from "util/history";
import { useApplicationId, useTemplateViewMode } from "util/hooks";
import { canEditApp, canManageApp } from "util/permissionUtils";
import ProfileDropdown from "./profileDropdown";
import { EllipsisTextCss } from "openblocks-design";
import { trans } from "i18n";
import { Logo } from "@openblocks-ee/assets/images";

const HeaderFont = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
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

function HeaderProfile(props: { user: User }) {
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
  const user = useSelector(getCurrentUser);
  const application = useSelector(currentApplication);
  const applicationId = useApplicationId();
  const templateId = useSelector(getTemplateId);
  if (useTemplateViewMode()) {
    return <></>;
  }

  const headerStart = (
    <>
      <StyledLink onClick={() => history.push(ALL_APPLICATIONS_URL)}>
        <LogoIcon />
      </StyledLink>
      <HeaderFont>{application && application.name}</HeaderFont>
    </>
  );

  const headerEnd = (
    <Wrapper>
      {canManageApp(user, application) && (
        <AppPermissionDialog
          applicationId={applicationId}
          trigger={
            <PreviewBtn>
              {SHARE_TITLE}
              {""}
            </PreviewBtn>
          }
        />
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
  return <Header headerStart={headerStart} headerEnd={headerEnd} />;
};
