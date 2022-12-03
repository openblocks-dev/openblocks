import { Segmented as AntdSegmented } from "antd";
import styled from "styled-components";

type PropsType<T extends React.ForwardRefExoticComponent<any>> =
  T extends React.ForwardRefExoticComponent<infer R> ? R : never;
type SegmentedProps = PropsType<typeof AntdSegmented>;

const StyledSegmented = styled(AntdSegmented)<PropsType<typeof AntdSegmented>>`
  width: 100%;
  height: 28px;
  border-radius: 6px;
  background-color: #efeff1;

  color: #8b8fa3;
  font-size: 12px;

  .ant-segmented-item-selected {
    border-radius: 4px;
    font-weight: 500;
    color: #222222;

    g {
      stroke: #222222;
    }
  }

  .ant-segmented-item-label {
    padding: 0 8px;
    height: 24px;
    min-height: 24px;
    line-height: 24px;
  }

  svg {
    height: 100%;
  }
`;

export default function Segmented(props: SegmentedProps) {
  return <StyledSegmented {...(props as any)} />;
}
