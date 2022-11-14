import { TacoButton } from "openblocks-design";
import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

const Icon = styled.div`
  height: 8px;
  width: 8px;
  margin-right: 4px;
  line-height: 0;
`;

const Btn = styled(TacoButton)`
  height: 13px;
  padding: 0;
  color: #4965f2;
  border: none;
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 13px;
  box-shadow: none;

  :hover {
    color: #315efb;
    border: none;
    background-color: #ffffff;
  }

  :focus {
    color: #315efb;
    border: none;
    background-color: #ffffff;
  }

  &:hover ${Icon} g {
    stroke: #315efb;
  }
`;

interface IProps {
  icon?: ReactNode;
  onClick?: () => void;
}

export default function LinkPlusButton(props: PropsWithChildren<IProps>) {
  const { icon, children, onClick } = props;
  return (
    <Btn onClick={onClick}>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </Btn>
  );
}
