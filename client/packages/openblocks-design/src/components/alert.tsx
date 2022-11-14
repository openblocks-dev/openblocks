import { Alert as AntAlert, AlertProps } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  padding: 2px 0;

  .ant-alert-warning {
    border: none;
    background: #fef7f1;
    border-radius: 4px;
  }

  .ant-alert-error {
    border: none;
    background: #fff3f1;
    border-radius: 4px;
  }

  .ant-alert-info {
    border: none;
    border-radius: 4px;
  }

  .ant-alert-success {
    border: none;
    border-radius: 4px;
  }

  .ant-alert {
    padding: 0;
  }

  .ant-alert-icon {
    margin-right: 4px;
    margin-left: 8px;
  }

  .ant-alert-message {
    font-size: 13px;
    color: #333333;
    line-height: 24px;
    margin-left: 4px;
    padding: 4px 0px;
  }
`;
interface Iprops {
  label: string;
}
export const Alert = (props: Iprops & AlertProps) => {
  const { label, type, ...restProps } = props;
  return (
    <>
      <Container>
        <AntAlert message={label} type={type} showIcon={true} {...restProps} />
      </Container>
    </>
  );
};
