import { UICompManifest } from "comps/uiCompRegistry";
import styled from "styled-components";

interface IProps {
  compInfo: UICompManifest;
}

const Wrapper = styled.div`
  margin-bottom: 24px;
  .title {
    display: flex;
    align-items: center;
    font-size: 32px;
    margin-bottom: 36px;
    font-weight: 700;
    .en-name {
      font-weight: normal;
    }
  }

  .description {
    line-height: 1.5;
    font-size: 16px;
  }
`;

const IconWrapper = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(215, 217, 224);
  border-radius: 4px;
  height: 60px;
  width: 60px;
  margin-right: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export default function PageInfo(props: IProps) {
  const { compInfo } = props;
  const Icon = compInfo.icon;
  return (
    <Wrapper>
      <div className="title">
        <IconWrapper>
          <Icon />
        </IconWrapper>
        {compInfo.name}
      </div>
      {compInfo.description && <div className="description">{compInfo.description}</div>}
    </Wrapper>
  );
}
