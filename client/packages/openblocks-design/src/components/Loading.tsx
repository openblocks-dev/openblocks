import styled, { css } from "styled-components";
import { CSSProperties } from "react";

type LoadingContainerProps = {
  backgroundColor: string;
  color: string;
  size: number;
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Loading
const ContainerX = styled.div<LoadingContainerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  animation: circle infinite 1.75s linear;
  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Container = styled.div<LoadingContainerProps>`
  height: ${(props) => props.size / 2}px;
  width: ${(props) => props.size}px;
  background-color: ${(props) => props.backgroundColor};
  overflow: hidden;
`;
const loadcss = css<LoadingContainerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: solid 2.5px transparent;
  border-radius: 999px;
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Load1 = styled.div<LoadingContainerProps>`
  ${loadcss};
  background-image: linear-gradient(
      ${(props) => props.backgroundColor},
      ${(props) => props.backgroundColor}
    ),
    linear-gradient(to left, ${(props) => props.color}, ${(props) => props.color}91);
`;
const Load2 = styled.div<LoadingContainerProps>`
  ${loadcss};
  transform: translateY(-${(props) => props.size / 2}px);
  background-image: linear-gradient(
      ${(props) => props.backgroundColor},
      ${(props) => props.backgroundColor}
    ),
    linear-gradient(to right, ${(props) => props.color}a3, ${(props) => props.color}1a);
`;

type LoadingProps = {
  backgroundColor?: string;
  color?: string;
  size?: number; // circle's size
  className?: string;
  style?: CSSProperties;
};

export const Loading = (props: LoadingProps) => {
  const loadingProps = {
    backgroundColor: props.backgroundColor ?? "#315efb",
    color: props.color ?? "#ffffff",
    size: props.size ?? 14,
  };
  return (
    <LoadingWrapper className={props.className} style={props.style}>
      <ContainerX {...loadingProps}>
        <Container {...loadingProps}>
          <Load1 {...loadingProps} />
        </Container>
        <Container {...loadingProps}>
          <Load2 {...loadingProps} />
        </Container>
      </ContainerX>
    </LoadingWrapper>
  );
};

export const LightLoading = (props: LoadingProps) => {
  return <Loading backgroundColor="#fafbff" color="#3377FF" size={props.size} {...props} />;
};

// loading when bg-color is white
export const WhiteLoading = (props: LoadingProps) => {
  return <Loading backgroundColor="#ffffff" color="#3377FF" size={props.size} {...props} />;
};
