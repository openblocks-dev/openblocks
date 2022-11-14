import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const StyledSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
`;

export default function QueryLibrarySkeletonView() {
  return <StyledSpin />;
}
