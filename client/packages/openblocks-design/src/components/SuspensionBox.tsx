import styled from "styled-components";
import { ReactComponent as close } from "icons/icon-flokclose.svg";
import { ScrollBar } from "../components/ScrollBar";

const Container = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  padding-bottom: 16px;
`;

const ChildDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 8px;
`;

const CloseIcon = styled(close)`
  height: 16px;
  width: 16px;
  padding: 1px;
  color: #8b8fa3;

  :hover {
    cursor: pointer;
  }

  &:hover g {
    stroke: #222222;
  }
`;

const TitleDiv = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
`;

const TitleText = styled.span`
  display: inline-block;
  font-weight: 500;
  font-size: 16px;
  color: #222222;
  line-height: 16px;
  user-select: none;
`;

const FooterDiv = styled.div`
  padding: 0 16px;
`;

interface Iprops {
  title: string;
  onClose?: () => void;
  content: any;
  width?: number;
  contentMaxHeight?: string | number;
  footer?: React.ReactNode;
  scrollable?: boolean;
}

export const SuspensionBox = (props: Iprops) => {
  const {
    title,
    onClose,
    content,
    footer,
    width = 312,
    contentMaxHeight = "calc(100vh - 100px)",
    scrollable,
  } = props;
  return (
    <Container width={width}>
      <TitleDiv>
        <TitleText>{title}</TitleText>
        {onClose && <CloseIcon onClick={onClose} />}
      </TitleDiv>
      {scrollable ? (
        <ScrollBar style={{ maxHeight: contentMaxHeight }}>
          <ChildDiv>{content}</ChildDiv>
        </ScrollBar>
      ) : (
        <ChildDiv>{content}</ChildDiv>
      )}
      <FooterDiv>{footer}</FooterDiv>
    </Container>
  );
};
