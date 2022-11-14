import { Input as AntdInput, InputRef } from "antd";
import { ReactComponent as MustFillStar } from "icons/icon-must-fill-star.svg";
import { trans } from "i18n/design";
import { CSSProperties, Ref, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { checkOtpValid, checkPhoneValid } from "util/stringUtils";
import { CustomSelect } from "./customSelect";
import { CommonErrorLabel, CommonTextLabel } from "./Label";

const TacoInput = styled(AntdInput)`
  background: #ffffff;
  border: 1px solid #d7d9e0;
  border-radius: 4px;

  font-size: 13px;
  color: #333333;
  line-height: 13px;
  height: 32px;

  :hover {
    border: 1px solid #8b8fa3;
  }

  :focus {
    border: 1px solid #3377ff;
  }

  ::placeholder {
    font-size: 13px;
    color: #b8b9bf;
    line-height: 13px;
  }
`;

const BlurInputLabel = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 4px;
  }

  margin-bottom: 8px;
`;

const formInputCss = css`
  margin-bottom: 28px;

  input {
    border-radius: 8px;
    color: #333333;

    font-size: 16px;
    line-height: 16px;
    height: 48px;
  }

  input::placeholder {
    color: #b8b9bf;

    font-size: 16px;
    line-height: 16px;
  }
`;

const FormInputFiled = styled.div`
  ${formInputCss};
`;

const OtpFormInputFiled = styled.div`
  ${formInputCss};

  input {
    // border stands 2px
    height: 46px;
  }
`;

const InputInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  > * {
    margin-right: 5px;
  }
`;

const OptInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fdfdfd;
  border: 1px solid #d7d9e0;
  border-radius: 8px;

  :hover {
    border: 1px solid #8b8fa3;
  }

  :focus-within {
    border: 1px solid #3377ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  }
`;

const OtpInput = styled(TacoInput)`
  border: none;
  box-shadow: none;

  :focus,
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const OtpSplit = styled.span`
  color: #d7d9e0;
  line-height: 24px;

  font-size: 24px;
  transform: scaleX(0.8);
`;

const StyledOtpButton = styled.button<{ isTiming: boolean }>`
  flex-shrink: 0;
  width: 124px;

  font-size: 16px;
  color: ${(props) => (props.isTiming ? "#8B8FA3" : "#4965f2")};
  line-height: 16px;
  border: none;
  cursor: pointer;
  background: none;
  padding: 0 16px;

  :focus-within {
    outline: 0;
  }
`;

const InputLabel = (props: { mustFill?: boolean; label?: string; errorMsg?: string }) => {
  const { mustFill, label, errorMsg } = props;
  return (
    <InputInfoWrapper>
      {mustFill && <MustFillStar />}
      <CommonTextLabel>{label}</CommonTextLabel>
      {errorMsg && <CommonErrorLabel>{errorMsg}</CommonErrorLabel>}
    </InputInfoWrapper>
  );
};

function BlurFinishInput(props: {
  defaultValue?: string;
  // onFinish triggers when onBlur triggers and value is valid
  onFinish: (value: string) => void;
  className?: string;
  placeholder?: string;
  valueCheck?: { rule: (value: string) => boolean; message: string };
  label?: string;
  inputStyle?: CSSProperties;
  mustFill?: boolean;
}) {
  const inputRef = useRef<InputRef>(null);
  const [valueValid, setValueValid] = useState(true);
  const {
    onFinish,
    defaultValue,
    className,
    placeholder,
    valueCheck,
    label,
    inputStyle,
    mustFill,
  } = props;
  return (
    <div className={className}>
      <BlurInputLabel>
        {mustFill && <MustFillStar />}
        <CommonTextLabel>{label}</CommonTextLabel>
        <CommonErrorLabel>{!valueValid && valueCheck?.message}</CommonErrorLabel>
      </BlurInputLabel>
      <TacoInput
        style={inputStyle}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={inputRef}
        onPressEnter={() => inputRef.current?.blur()}
        onChange={(e) => {
          let isValid = valueCheck ? valueCheck.rule(e.target.value) : true;
          setValueValid(isValid);
        }}
        onBlur={() => {
          if (!valueValid) {
            return;
          }
          onFinish(inputRef.current?.input?.value ?? "");
        }}
      />
    </div>
  );
}

const PhoneNumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  height: 40px;

  :hover {
    border: 1px solid #8b8fa3;
  }

  :focus-within {
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border: 1px solid #3377ff;
  }

  .ant-select-selector {
    border: unset !important;
    border-radius: 4px !important;
    box-shadow: unset !important;
  }
`;
const StyledPhoneNumberInput = styled(AntdInput)`
  border: unset;
  border-radius: 4px !important;

  :focus {
    box-shadow: unset;
  }
`;

const PhoneNumberInputSplitter = styled.span`
  color: #d7d9e0;
  line-height: 22px;

  font-size: 22px;
  transform: scaleX(0.8);
`;

const StyledOptionContent = styled.div`
  font-size: 13px;
  line-height: 13px;

  > * {
    margin-right: 12px;
  }
`;

// TODO: i18n
const MOBILE_COUNTRY_OPTIONS = [
  {
    countryCode: "+86",
    icon: "🇨🇳",
    name: trans("country.china"),
  },
];

function PhoneNumberInput(props: {
  onValueChange?: (countryCode: string, phoneNumber: string) => void;
  onBlur?: (countryCode: string, phoneNumber: string) => void;
  className?: string;
  defaultValue?: string;
}) {
  // TODO: i18n
  const defaultCountryCode = "+86";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const { onValueChange, onBlur, className, defaultValue } = props;
  return (
    <PhoneNumberInputWrapper
      className={className}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
          // dismiss subItems
          return;
        }
        onBlur && onBlur(countryCode, phoneNumber);
      }}
    >
      <CustomSelect
        disabled
        style={{ width: "80px", height: "38px" }}
        dropdownStyle={{ width: "408px" }}
        defaultValue={defaultCountryCode}
        optionLabelProp="value"
        onChange={(value) => {
          setCountryCode(value);
          onValueChange && onValueChange(value, phoneNumber);
        }}
      >
        {MOBILE_COUNTRY_OPTIONS.map((mobileCountry) => (
          <CustomSelect.Option value={mobileCountry.countryCode} key={mobileCountry.countryCode}>
            <StyledOptionContent>
              <span>{mobileCountry.icon}</span>
              <span
                style={{
                  minWidth: "24px",
                  display: "inline-block",
                }}
              >
                {mobileCountry.countryCode}
              </span>
              <span>{mobileCountry.name}</span>
            </StyledOptionContent>
          </CustomSelect.Option>
        ))}
      </CustomSelect>
      <PhoneNumberInputSplitter>|</PhoneNumberInputSplitter>
      <StyledPhoneNumberInput
        defaultValue={defaultValue}
        maxLength={11}
        type="tel"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          onValueChange && onValueChange(countryCode, e.target.value);
        }}
      />
    </PhoneNumberInputWrapper>
  );
}

const FormInput = (props: {
  mustFill?: boolean;
  label: string;
  placeholder?: string;
  checkRule?: {
    errorMsg: string;
    check: (value: string) => boolean;
  };
  formName?: string;
  onChange?: (value: string, valid: boolean) => void;
  className?: string;
  inputRef?: Ref<InputRef>;
  msg?: string;
}) => {
  const { mustFill, checkRule, label, placeholder, onChange, formName, className, inputRef } =
    props;
  const [valueValid, setValueValid] = useState(true);
  return (
    <FormInputFiled className={className}>
      <InputLabel
        mustFill={mustFill}
        label={label}
        errorMsg={valueValid ? "" : checkRule?.errorMsg}
      />
      <TacoInput
        ref={inputRef}
        name={formName}
        placeholder={placeholder}
        onChange={(e) => {
          let valid = true;
          if (checkRule) {
            valid = checkRule.check(e.target.value);
            setValueValid(valid);
          }
          onChange && onChange(e.target.value, valid);
        }}
      />
    </FormInputFiled>
  );
};

const PasswordInput = (props: {
  onChange: (value: string, valid: boolean) => void;
  valueCheck?: (value: string) => readonly [boolean, string];
  doubleCheck?: boolean;
  className?: string;
  mustFill?: boolean;
  passInputConf?: {
    label?: string;
    placeholder?: string;
  };
  confirmPassConf?: {
    label?: string;
    placeholder?: string;
  };
}) => {
  const passRef = useRef<InputRef>(null);
  const confirmPassRef = useRef<InputRef>(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmErrorMsg, setConfirmErrorMsg] = useState("");
  const { className, mustFill, doubleCheck, onChange, valueCheck, passInputConf, confirmPassConf } =
    props;
  const checkPassword = valueCheck ? valueCheck : (value: string) => [true, ""] as const;
  return (
    <>
      <FormInputFiled className={className}>
        <InputLabel
          mustFill={mustFill}
          label={passInputConf?.label ? passInputConf?.label : trans("passwordInput.label")}
          errorMsg={passwordErrorMsg}
        />
        <TacoInput
          ref={passRef}
          type="password"
          placeholder={
            passInputConf?.placeholder
              ? passInputConf?.placeholder
              : trans("passwordInput.placeholder")
          }
          onChange={(e) => {
            const [valid, errorMsg] = checkPassword(e.target.value);
            let confirmPassValid = true;
            if (doubleCheck) {
              const confirmPassValue =
                confirmPassRef.current != null && confirmPassRef.current.input?.value;
              confirmPassValid = confirmPassValue === e.target.value;
              setConfirmErrorMsg(
                confirmPassValue && !confirmPassValid
                  ? trans("passwordInput.inconsistentPassword")
                  : ""
              );
            }
            setPasswordErrorMsg(valid ? "" : errorMsg);
            onChange && onChange(e.target.value, valid && confirmPassValid);
          }}
        />
      </FormInputFiled>
      {doubleCheck && (
        <FormInputFiled className={className}>
          <InputLabel
            mustFill={mustFill}
            label={
              confirmPassConf?.label
                ? confirmPassConf?.label
                : trans("passwordInput.confirmPasswordLabel")
            }
            errorMsg={confirmErrorMsg}
          />
          <TacoInput
            ref={confirmPassRef}
            type="password"
            placeholder={
              confirmPassConf?.placeholder
                ? confirmPassConf?.placeholder
                : trans("passwordInput.confirmPasswordPlaceholder")
            }
            onChange={(e) => {
              const valid =
                passRef.current != null && e.target.value === passRef.current.input?.value;
              const passValid =
                passRef.current != null && checkPassword(passRef.current.input?.value ?? "")[0];
              setConfirmErrorMsg(valid ? "" : trans("passwordInput.inconsistentPassword"));
              props.onChange(e.target.value, valid && passValid);
            }}
          />
        </FormInputFiled>
      )}
    </>
  );
};

const DEFAULT_COUNT_DOWN_SECONDS = 60;

// verification code input
const OtpFormInput = (props: {
  mustFill?: boolean;
  formName?: string;
  onChange?: (value: string, valid: boolean) => void;
  phoneNumber: string;
  className?: string;
  onOtpSend: () => void;
}) => {
  const { mustFill, onChange, formName, phoneNumber, className, onOtpSend } = props;
  const [otpValid, setOtpValid] = useState(true);
  const [timing, setTiming] = useState(false);
  const [count, setCount] = useState<number>(DEFAULT_COUNT_DOWN_SECONDS);
  useEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // reset
            return DEFAULT_COUNT_DOWN_SECONDS;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <OtpFormInputFiled className={className}>
      <InputLabel
        mustFill={mustFill}
        label={trans("verifyCodeInput.label")}
        errorMsg={otpValid ? "" : trans("verifyCodeInput.errorMsg", { digitNum: 6 })}
      />
      <OptInputWrapper>
        <OtpInput
          className="verify-input"
          name={formName}
          placeholder={trans("verifyCodeInput.placeholder", { digitNum: 6 })}
          onChange={(e) => {
            const valid = checkOtpValid(e.target.value);
            setOtpValid(valid);
            onChange && onChange(e.target.value, valid);
          }}
        />
        <OtpSplit>|</OtpSplit>
        <StyledOtpButton
          onClick={() => {
            if (!checkPhoneValid(phoneNumber) || timing) {
              return;
            }
            setTiming(true);
            onOtpSend();
          }}
          isTiming={timing}
        >
          {timing ? `${count}s` : trans("verifyCodeInput.sendCode")}
        </StyledOtpButton>
      </OptInputWrapper>
    </OtpFormInputFiled>
  );
};

export { TacoInput, BlurFinishInput, PhoneNumberInput, OtpFormInput, FormInput, PasswordInput };
