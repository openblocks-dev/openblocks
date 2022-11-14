import styled, { css } from "styled-components";
import { FormInput, OtpFormInput, PasswordInput } from "openblocks-design";
import { TacoButton } from "openblocks-design";

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
