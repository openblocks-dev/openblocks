import styled from "styled-components";
import { Input as AntdInput, InputProps as AntdInputProps, InputRef } from "antd";
import { BorderActiveColor, BorderColor, BorderRadius, GreyTextColor } from "constants/style";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import _ from "lodash";
import React from "react";
import { INPUT_DEFAULT_ONCHANGE_DEBOUNCE } from "constants/perf";

export const StyledInput = styled(AntdInput)`
  width: ${(props) => (props.width ? props.width : "100%")};
  background: #fdfdfd;
  border: 1px solid ${BorderColor};
  border-radius: ${BorderRadius};
  padding-left: 12px;
  &:hover {
    border-color: ${GreyTextColor};
  }
  &:focus,
  &:focus-within {
    border-color: ${BorderActiveColor};
  }
`;

export interface InputProps extends AntdInputProps {
  debounce?: number;
}

function TacoInput(props: InputProps, ref: React.Ref<InputRef>) {
  const { onChange, value, debounce = INPUT_DEFAULT_ONCHANGE_DEBOUNCE, ...inputProps } = props;
  const [internalValue, setIntervalValue] = useState(value);
  const isTypingRef = useRef(0);

  const originOnChangeRef = useRef(onChange);
  originOnChangeRef.current = onChange;

  const debouncedOnChangeRef = useRef(
    debounce > 0
      ? _.debounce((e: ChangeEvent<HTMLInputElement>) => {
          window.clearTimeout(isTypingRef.current);
          isTypingRef.current = window.setTimeout(() => (isTypingRef.current = 0), 100);
          originOnChangeRef.current?.(e);
        }, debounce)
      : (e: ChangeEvent<HTMLInputElement>) => originOnChangeRef.current?.(e)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(e.target.value);
    debouncedOnChangeRef.current?.(e);
  };

  useEffect(() => {
    if (!isTypingRef.current) {
      setIntervalValue(value);
    }
  }, [value]);

  return (
    <StyledInput
      ref={ref}
      value={internalValue}
      placeholder={props.placeholder}
      onChange={(e) => handleChange(e)}
      {...inputProps}
    />
  );
}

export const Input = React.forwardRef(TacoInput);
