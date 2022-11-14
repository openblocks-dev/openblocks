import { LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";
import { Org } from "constants/orgConstants";
import { BlurFinishInput, CommonTextLabel, PhoneNumberInput } from "openblocks-design";
import OrgLogo from "pages/common/orgLogo";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrgAction, updateOrgSuccess } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import { beforeImgUpload, getBase64 } from "util/fileUtils";
import { ORG_ICON_UPLOAD_URL } from "constants/apiConstants";
import { trans } from "i18n";

const FieldWrapper = styled.div`
  margin-bottom: 32px;
  width: 408px;
`;

const OrgSettingTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #222222;
  line-height: 16px;
  margin-bottom: 40px;
`;

const StyledOrgLogo = styled(OrgLogo)`
  width: 80px;
  height: 80px;
  border-radius: 8px;

  img {
    border-radius: 8px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const OrgLogWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const LogoModifyButton = styled(Button)`
  background: #f5f5f6;
  border-radius: 4px;

  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: 13px;
  height: 28px;
  min-width: 76px;
  padding: 7px 12px;
  margin-left: 12px;
  border: none;
  box-shadow: none;

  :hover {
    color: #315efb;
    background: #edeff2;
  }
`;

const StyledPhoneNumberInput = styled(PhoneNumberInput)`
  margin-top: 8px;
`;

function OrgImageField(props: { org: Org }) {
  const { org } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false);
        dispatch(updateOrgSuccess({ id: org.id, logoUrl: imageUrl }));
      });
    }
    if (info.file.status === "error") {
      message.error(trans("orgSettings.uploadErrorMessage"));
    }
  };
  return (
    <div>
      <CommonTextLabel>{trans("orgSettings.orgLogo")}</CommonTextLabel>
      <OrgLogWrapper>
        <StyledOrgLogo source={org.logoUrl} orgName={org.name} />
        <Upload
          accept="image/*"
          showUploadList={false}
          action={ORG_ICON_UPLOAD_URL(org.id)}
          beforeUpload={beforeImgUpload}
          onChange={handleUploadChange}
          withCredentials
        >
          {loading ? (
            <LogoModifyButton icon={<LoadingOutlined />} disabled />
          ) : (
            <LogoModifyButton>{trans("orgSettings.logoModify")}</LogoModifyButton>
          )}
        </Upload>
      </OrgLogWrapper>
    </div>
  );
}

export function OrgSettingContent(props: { org: Org | undefined }) {
  const { org } = props;
  const dispatch = useDispatch();
  if (!org) {
    return null;
  }
  return (
    <>
      <OrgSettingTitle>{trans("orgSettings.editOrgTitle")}</OrgSettingTitle>
      <FieldWrapper>
        <OrgImageField org={org} />
      </FieldWrapper>
      <FieldWrapper>
        <BlurFinishInput
          inputStyle={{ height: "40px" }}
          label={trans("orgSettings.orgNameLabel")}
          mustFill
          valueCheck={{
            rule: (val) => val.trim() !== "",
            message: trans("orgSettings.orgNameCheckMsg"),
          }}
          defaultValue={org.name}
          onFinish={(value) => {
            dispatch(updateOrgAction({ id: org.id, orgName: value }));
          }}
        />
      </FieldWrapper>
    </>
  );
}

export default OrgSettingContent;
