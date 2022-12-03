import { message } from "antd";
import InviteApi from "api/inviteApi";
import { API_STATUS_CODES, SERVER_ERROR_CODES } from "constants/apiConstants";
import { AUTH_LOGIN_URL, BASE_URL } from "constants/routesURL";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "redux/reducers";
import history from "util/history";
import { isFetchUserFinished } from "redux/selectors/usersSelectors";
import { trans } from "i18n";

type InviteLandingProp = RouteComponentProps<{ invitationId: string }, StaticContext, any> & {
  invitationId: string;
};

function InviteLanding(props: InviteLandingProp) {
  const { invitationId } = props;
  const fetchUserFinished = useSelector(isFetchUserFinished);
  useEffect(() => {
    if (!fetchUserFinished) {
      // no user info replied from the backend
      return;
    }
    if (!invitationId) {
      history.push(BASE_URL);
      return;
    }
    // accept the invitation
    InviteApi.acceptInvite({ invitationId })
      .then((resp) => {
        if (resp.data?.success) {
          message.success(trans("orgSettings.inviteSuccessMessage"));
          setTimeout(() => (window.location.href = BASE_URL), 500);
          return;
        } else if (
          resp.data.code === SERVER_ERROR_CODES.INVITE_USER_NOT_LOGIN ||
          resp?.status === API_STATUS_CODES.REQUEST_NOT_AUTHORISED
        ) {
          const inviteInfo = resp.data.data;
          const inviteState = inviteInfo ? { ...inviteInfo, invitationId } : { invitationId };
          history.push({
            pathname: AUTH_LOGIN_URL,
            state: {
              inviteInfo: inviteState,
            },
          });
          return;
        }
        throw Error(resp.data?.message || trans("orgSettings.inviteFailMessage"));
      })
      .catch((errorResp) => {
        message.error(errorResp.message);
        history.push(BASE_URL);
      });
  }, [fetchUserFinished, invitationId]);
  return null;
}

const mapStateToProps = (state: AppState, props: InviteLandingProp) => {
  return {
    invitationId: props.match.params.invitationId,
  };
};

export default connect(mapStateToProps)(InviteLanding);
