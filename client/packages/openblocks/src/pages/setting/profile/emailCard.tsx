import { checkEmailValid } from "util/stringUtils";
import {
  BindCardWrapper,
  CardConfirmButton,
  StyledFormInput,
} from "pages/setting/profile/profileComponets";
import React, { useState } from "react";
import UserApi from "api/userApi";
import { message } from "antd";
import { validateResponse } from "api/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "redux/reduxActions/userActions";
import { trans } from "i18n";
import { selectSystemConfig } from "redux/selectors/configSelectors";

function EmailCard() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const config = useSelector(selectSystemConfig);
  const authId = config?.form.id;

  const bindEmail = (email: string) => {
    UserApi.bindEmail({ email: email, authId })
      .then((resp) => {
        if (validateResponse(resp)) {
          message.success(trans("profile.bindEmailSuccess"));
          dispatch(fetchUserAction());
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };
  return (
    <BindCardWrapper>
      <StyledFormInput
        mustFill
        label={trans("profile.email")}
        onChange={(value, valid) => setEmail(valid ? value : "")}
        placeholder={trans("profile.emailPlaceholder")}
        checkRule={{
          check: (value) => checkEmailValid(value),
          errorMsg: trans("profile.emailCheck"),
        }}
      />
      <CardConfirmButton buttonType="primary" disabled={!email} onClick={() => bindEmail(email)}>
        {trans("profile.submit")}
      </CardConfirmButton>
    </BindCardWrapper>
  );
}

export default EmailCard;
