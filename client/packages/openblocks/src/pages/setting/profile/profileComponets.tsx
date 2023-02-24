import styled, { css } from "styled-components";
import {
  BlurFinishInput,
  CommonGrayLabel,
  CommonTextLabel,
  FormInput,
  OtpFormInput,
  PasswordInput,
} from "openblocks-design";
import { TacoButton } from "openblocks-design";
import { PackUpIcon } from "openblocks-design";
import ProfileImage from "pages/common/profileImage";
import { User } from "constants/userConstants";
import { replaceMiddleWithStar } from "util/stringUtils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/selectors/usersSelectors";
import { UploadChangeParam } from "antd/lib/upload";
import { beforeImgUpload, getBase64 } from "util/fileUtils";
import { updateUserAction, updateUserSuccess } from "redux/reduxActions/userActions";
import { message, Upload } from "antd";
import { USER_HEAD_UPLOAD_URL } from "constants/apiConstants";
import { trans } from "i18n";

const FormInputStyle = css`
  input {
    border-radius: 4px;
    font-size: 13px;
    line-height: 13px;
    height: 32px;
  }

  input::placeholder {
    font-size: 13px;
    line-height: 13px;
  }
`;

export const StyledFormInput = styled(FormInput)`
  margin-bottom: 16px;
  ${FormInputStyle};
`;

export const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: 16px;
  ${FormInputStyle};
`;

export const StyledOtpInput = styled(OtpFormInput)`
  ${FormInputStyle};
  margin-bottom: 24px;

  span {
    font-size: 16px;
    line-height: 16px;
  }

  div {
    border-radius: 4px;
  }

  button {
    width: 110px;
    padding: 0 12px;
    margin: 0;
    font-size: 13px;
    line-height: 13px;
  }
`;

export const CardConfirmButton = styled(TacoButton)`
  border-radius: 4px;
  height: 28px;
  font-size: 13px;
  line-height: 13px;
  width: 76px;
  margin-left: auto;
  margin-top: 8px;
`;

export const BindCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`;

const IconNameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 81px;
  height: 13px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
`;
const GoBindICon = styled(PackUpIcon)`
  transform: scaleX(-1) scaleY(-1) rotate(-90deg);
`;

const ProfileInfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 19px;

  &:last-child {
    margin-bottom: 4px;
  }

  button {
    margin-left: auto;
    cursor: pointer;
    padding: 0;
    border: none;
    display: flex;
    align-items: center;
    height: 13px;

    font-size: 13px;
    color: #4965f2;
    text-align: right;
    line-height: 13px;
    background: #ffffff;
  }

  button:hover svg g path {
    fill: #4965f2;
  }

  button:disabled,
  button:disabled button:hover {
    color: #b8b9bf;
    cursor: not-allowed;

    svg g path {
      fill: #b8b9bf;
    }
  }
`;

const StyledProfileImage = styled(ProfileImage)`
  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImageMask = styled.div`
  font-size: 13px;
  position: absolute;
  width: 72px;
  height: 72px;
  line-height: 72px;
  left: 0;
  top: 0;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  cursor: pointer;

  :hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const HeadNameWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 27px 0;

  > * {
    margin-left: 16px;
  }

  > *:first-child {
    margin-left: 0;
  }
`;

export function ProfileInfoItem(props: {
  icon?: JSX.Element;
  titleLabel: string;
  infoLabel?: string; // tooltip
  value?: string;
  actionButtonConfig: {
    onClick: () => void;
    label: string;
    hidden?: boolean;
    disabled?: boolean;
  };
}) {
  return (
    <ProfileInfoItemWrapper>
      <IconNameWrapper>
        {props.icon}
        <CommonTextLabel>{props.titleLabel}</CommonTextLabel>
      </IconNameWrapper>
      {props.value ? (
        <CommonTextLabel style={{ marginLeft: "7px", whiteSpace: "break-spaces" }}>
          {props.value}
        </CommonTextLabel>
      ) : (
        <CommonGrayLabel style={{ marginLeft: "7px", maxWidth: "165px" }}>
          {props.infoLabel}
        </CommonGrayLabel>
      )}
      {!props.actionButtonConfig.hidden && (
        <button
          onClick={() => props.actionButtonConfig.onClick()}
          disabled={props.actionButtonConfig.disabled}
        >
          <span>{props.actionButtonConfig.label}</span>
          <GoBindICon />
        </button>
      )}
    </ProfileInfoItemWrapper>
  );
}

export type ProfileModalCardProps = {
  setModalContent: (element: JSX.Element) => void;
  setTitle: (title: string) => void;
  setShowBackLink: (show: boolean) => void;
};

export function getConnectedName(user: User, source: string) {
  const connectionIfo = user.connections?.find((u) => u.source === source);
  return connectionIfo?.name ? replaceMiddleWithStar(connectionIfo.name) : "";
}

export function HeadNameFiled() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const handleUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        dispatch(updateUserSuccess({ avatarUrl: imageUrl }));
      });
    }
    if (info.file.status === "error") {
      message.error(trans("profile.uploadError"));
    }
  };
  if (!user) {
    return null;
  }
  return (
    <HeadNameWrapper>
      <div style={{ height: "72px" }}>
        <Upload
          accept="image/*"
          showUploadList={false}
          action={USER_HEAD_UPLOAD_URL}
          onChange={handleUploadChange}
          beforeUpload={beforeImgUpload}
          withCredentials
        >
          <ProfileImageWrapper>
            <StyledProfileImage side={72} source={user.avatarUrl} userName={user.username} />
            <ProfileImageMask>{trans("profile.editProfilePicture")}</ProfileImageMask>
          </ProfileImageWrapper>
        </Upload>
      </div>
      <BlurFinishInput
        valueCheck={{
          rule: (val) => val.trim() !== "",
          message: trans("profile.nameCheck"),
        }}
        inputStyle={{
          width: "248px",
          height: " 32px",
        }}
        label={trans("profile.name")}
        mustFill
        placeholder={trans("profile.namePlaceholder")}
        defaultValue={user.username}
        onFinish={(value: string) => {
          dispatch(updateUserAction({ name: value }));
        }}
      />
    </HeadNameWrapper>
  );
}
