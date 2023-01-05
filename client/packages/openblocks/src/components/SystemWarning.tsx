import { useSelector } from "react-redux";
import { selectSystemConfig } from "../redux/selectors/configSelectors";
import styled from "styled-components";

const Warning = styled.div`
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
  padding: 8px 16px;
  background-color: #ffe58f;
  border-top: 1px solid #2c2c2c;
`;

export const SystemWarning = () => {
  const systemConfig = useSelector(selectSystemConfig);
  return systemConfig?.warning ? <Warning>{systemConfig.warning}</Warning> : null;
};
