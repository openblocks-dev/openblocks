import { DEFAULT_IMG_URL } from "util/stringUtils";
import { CSSProperties, RefObject } from "react";
import styled, { css } from "styled-components";

interface ImageStyleType {
  border: string;
  radius: string;
}

const getStyle = (style: ImageStyleType) => {
  return css`
    border: 1px solid ${style.border};
    border-radius: ${style.radius};
  `;
};

const StyledImg = styled.img<{ $style: ImageStyleType | undefined }>`
  ${(props) => props.$style && getStyle(props.$style)}
`;

export function TacoImage(props: {
  src: string;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  imgRef?: RefObject<HTMLImageElement>;
  $style?: ImageStyleType;
}) {
  const { width, height, src, onClick, className, style, $style } = props;
  return (
    <StyledImg
      ref={props.imgRef}
      referrerPolicy="same-origin"
      className={className}
      style={style}
      width={width}
      height={height}
      draggable={false}
      src={src}
      $style={$style}
      onClick={() => onClick && onClick()}
      onError={(e) => {
        e.currentTarget.src = DEFAULT_IMG_URL;
      }}
    />
  );
}
