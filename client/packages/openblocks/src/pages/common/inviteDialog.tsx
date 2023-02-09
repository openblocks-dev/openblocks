import { message } from "antd";
import InviteApi, { InviteInfo } from "api/inviteApi";
import { CommonTextLabel, CustomModal, TacoButton, TacoInput } from "openblocks-design";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "redux/reducers";
import { getUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import { validateResponse } from "api/apiUtils";
import { WhiteLoading } from "openblocks-design";
import { genInviteLink } from "util/urlUtils";
import { HelpText } from "components/HelpText";
import copyToClipboard from "copy-to-clipboard";
import { trans } from "i18n";

const InviteButton = styled(TacoButton)`
  width: 76px;
  float: right;
  margin-top: 8px;
`;

const StyledLoading = styled(WhiteLoading)`
  height: 170px;
`;

function InviteContent(props: { inviteInfo: InviteInfo }) {
  const { inviteInfo } = props;
  const inviteLink = genInviteLink(inviteInfo?.inviteCode);
  const inviteText = trans("memberSettings.inviteText", {
    userName: inviteInfo.createUserName,
    organization: inviteInfo.invitedOrganizationName,
    inviteLink,
  });
  return (
    <>
      <HelpText style={{ marginBottom: 16 }}>{trans("memberSettings.inviteUserHelp")}</HelpText>
      <div>
        <CommonTextLabel>{trans("memberSettings.inviteUserLabel")}</CommonTextLabel>
        <TacoInput disabled value={inviteLink} style={{ marginTop: "8px" }} />
        <InviteButton
          buttonType="primary"
          onClick={() => {
            inviteText && copyToClipboard(inviteText)
              ? message.success(trans("copySuccess"))
              : message.error(trans("copyError"));
          }}
        >
          {trans("memberSettings.inviteCopyLink")}
        </InviteButton>
      </div>
    </>
  );
}

function InviteDialog(props: {
  orgId: string | undefined;
  trigger: ReactNode;
  style?: CSSProperties;
}) {
  const { orgId } = props;
  const [inviteInfo, setInviteInfo] = useState<InviteInfo>();
  const [inviteDialogVisible, setInviteDialogVisible] = useState(false);
  useEffect(() => {
    // load link when display dialog
    if (inviteDialogVisible && orgId) {
      InviteApi.getInvite({ orgId: orgId })
        .then((resp) => {
          if (validateResponse(resp)) {
            setInviteInfo(resp.data.data);
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    }
  }, [inviteDialogVisible]);
  if (!orgId && inviteDialogVisible) {
    message.error(trans("memberSettings.organizationNotExist"));
    setInviteDialogVisible(false);
    return null;
  }

  return (
    <>
      {props.trigger && (
        <div
          style={props.style}
          onClick={() => {
            setInviteDialogVisible(true);
          }}
        >
          {props.trigger}
        </div>
      )}
      <CustomModal
        visible={inviteDialogVisible}
        title={trans("memberSettings.inviteUser")}
        destroyOnClose
        onCancel={() => setInviteDialogVisible(false)}
        showOkButton={false}
        showCancelButton={false}
        width="440px"
      >
        {!inviteInfo ? <StyledLoading size={20} /> : <InviteContent inviteInfo={inviteInfo} />}
      </CustomModal>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    orgId: getUser(state).currentOrgId,
  };
};

export default connect(mapStateToProps)(InviteDialog);
