import { Spin } from "antd";
import { GreyTextColor } from "constants/style";
import styled from "styled-components";

export const LoadingPlaceholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${GreyTextColor};
`;

export function ModuleLoading() {
  return (
    <LoadingPlaceholder>
      <Spin />
    </LoadingPlaceholder>
  );
}
