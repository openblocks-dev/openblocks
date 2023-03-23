import styled from "styled-components";
import { ReactComponent as Edit } from "icons/icon-text-edit.svg";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { Input } from "../components/Input";
import { InputProps, InputRef } from "antd";

const Wrapper = styled.div`
  position: relative;
`;

const Prefix = styled.div`
  position: absolute;
  left: 8px;
  top: 6px;
`;

export const EditTextWrapper = styled.div<{ disabled?: boolean; hasPrefix?: boolean }>`
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 4px;
  padding-left: ${(props) => (props.hasPrefix ? "28px" : "4px")};
  border-radius: 4px;
  width: 220px;
  height: 28px;
  line-height: 28px;
  color: #ffffff;
  font-size: 14px;
  cursor: ${(props) => !props.disabled && "pointer"};

  :hover {
    background-color: ${(props) => !props.disabled && "#8b8fa34c"};
  }

  :hover svg {
    visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
    &:hover g {
      fill: #315efb;
    }
  }
`;
export const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: inherit;
  color: inherit;
  font-style: normal;
  font-weight: 500;
  line-height: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const EditIcon = styled(Edit)`
  visibility: hidden;
  margin-left: 8px;
  flex-shrink: 0;
`;
const TextInput = styled(Input)<InputProps & { $hasPrefix?: boolean }>`
  font-weight: 500;
  margin: 0;
  border-radius: 4px;
  width: 220px;
  height: 28px;
  min-height: 0;
  background-color: #8b8fa34c;
  border: none;
  padding: 0 8px 0 4px;
  padding-left: ${(props) => (props.$hasPrefix ? "28px" : "4px")};
  color: #ffffff;
  line-height: 28px;
  font-size: 14px;

  :focus {
    box-shadow: none;
  }
`;

export interface EditTextProps {
  prefixIcon?: ReactNode;
  text: string;
  disabled?: boolean;
  forceClickIcon?: boolean;
  onFinish: (value: any) => void;
  onChange?: (value: any) => void;
  onEditStateChange?: (editing: boolean) => void;
  style?: CSSProperties;
  editing?: boolean;
}

export const EditText = (props: EditTextProps) => {
  const [editing, setEditing] = useState(props.editing || false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus({
      cursor: "all",
    });
    props.onEditStateChange?.(editing);
  }, [editing]);

  return (
    <Wrapper>
      {editing ? (
        <TextInput
          className="taco-edit-text-input"
          $hasPrefix={!!props.prefixIcon}
          ref={inputRef}
          defaultValue={props.text}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => props.onChange?.((e.target as HTMLInputElement).value)}
          onBlur={(e) => {
            props.onFinish(e.target.value);
            setEditing(false);
          }}
          onPressEnter={(e) => {
            props.onFinish((e.target as HTMLInputElement).value);
            setEditing(false);
          }}
        />
      ) : (
        <EditTextWrapper
          style={props.style}
          disabled={props.disabled}
          hasPrefix={!!props.prefixIcon}
          className="taco-edit-text-wrapper"
          onClick={() => !props.disabled && !props.forceClickIcon && setEditing(true)}
        >
          <TextWrapper className={"taco-edit-text-body"} title={props.text}>
            {props.text}
          </TextWrapper>
          <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              !props.disabled && setEditing(true);
            }}
            className={"taco-edit-text-icon"}
          />
        </EditTextWrapper>
      )}
      {props.prefixIcon && <Prefix>{props.prefixIcon}</Prefix>}
    </Wrapper>
  );
};
