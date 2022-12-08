import {
  BindCardWrapper,
  CardConfirmButton,
  StyledPasswordInput,
} from "pages/setting/profile/profileComponets";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserApi from "api/userApi";
import { validateResponse } from "api/apiUtils";
import { message } from "antd";
import { fetchUserAction } from "redux/reduxActions/userActions";
import { trans } from "i18n";
import { checkPassWithMsg } from "pages/userAuth/authUtils";

function PasswordCard(props: { hasPass: boolean }) {
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    const responsePromise = props.hasPass
      ? UserApi.updatePassword({ oldPassword: oldPass, newPassword: pass })
      : UserApi.setPassword({ password: pass });
    const successMsg = props.hasPass
      ? trans("profile.passwordModifiedSuccess")
      : trans("profile.passwordSetSuccess");
    responsePromise
      .then((resp) => {
        if (validateResponse(resp)) {
          message.success(successMsg);
          dispatch(fetchUserAction());
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  return (
    <BindCardWrapper>
      {props.hasPass ? (
        <>
          <StyledPasswordInput
            passInputConf={{
              label: trans("profile.oldPassword"),
              placeholder: trans("profile.inputCurrentPassword"),
            }}
            onChange={(value, valid) => {
              setOldPass(valid ? value : "");
            }}
          />
          <StyledPasswordInput
            doubleCheck
            valueCheck={checkPassWithMsg}
            onChange={(value, valid) => setPass(valid ? value : "")}
            passInputConf={{
              label: trans("profile.newPassword"),
              placeholder: trans("profile.inputNewPassword"),
            }}
            confirmPassConf={{
              label: trans("profile.confirmNewPassword"),
              placeholder: trans("profile.inputNewPasswordAgain"),
            }}
          />
        </>
      ) : (
        <StyledPasswordInput
          doubleCheck
          valueCheck={checkPassWithMsg}
          onChange={(value, valid) => setPass(valid ? value : "")}
        />
      )}
      <CardConfirmButton
        buttonType="primary"
        disabled={(props.hasPass && !oldPass) || !pass}
        onClick={onSubmit}
      >
        {trans("profile.submit")}
      </CardConfirmButton>
    </BindCardWrapper>
  );
}

export default PasswordCard;
