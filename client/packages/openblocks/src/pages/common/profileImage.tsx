import { CSSProperties, useState } from "react";
import styled from "styled-components";
import { getInitialsAndColorCode } from "util/stringUtils";
import { fullAvatarUrl } from "util/urlUtils";

export const ImgWrapper = styled.div<{
  backgroundColor?: string;
  side?: number;
  fontSize?: number;
}>`
  width: ${(props) => props.side || 34}px;
  height: ${(props) => props.side || 34}px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: center;
  cursor: default;
  background-color: ${(props) => props.backgroundColor};

  & span {
    color: #ffffff;
    letter-spacing: normal;
    white-space: nowrap;
    font-size: ${(props) => props.fontSize ?? 13}px;
    display: inline-block;
    ${(props) =>
      props.fontSize && props.fontSize < 12
        ? "-webkit-transform:scale(" + props.fontSize / 12 + ");"
        : ""};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default function ProfileImage(props: {
  userName: string;
  className?: string;
  side?: number;
  source?: string;
  style?: CSSProperties;
  svg?: JSX.Element | false;
  fontSize?: number;
}) {
  const initialsAndColorCode = getInitialsAndColorCode(props.userName, true);

  const [hasErrorLoadingImage, setHasErrorLoadingImage] = useState(false);
  const sourceUrl = fullAvatarUrl(props.source);
  const shouldRenderImage = (sourceUrl || props.svg) && !hasErrorLoadingImage;
  const backgroundColor = shouldRenderImage ? "transparent" : initialsAndColorCode[1];

  return (
    <ImgWrapper
      fontSize={props.fontSize}
      style={props.style}
      backgroundColor={backgroundColor}
      className={props.className}
      side={props.side}
      title={props.userName}
    >
      {!shouldRenderImage ? (
        <span>{initialsAndColorCode[0]}</span>
      ) : props.source ? (
        <img
          onError={() => setHasErrorLoadingImage(true)}
          onLoad={() => setHasErrorLoadingImage(false)}
          src={sourceUrl}
        />
      ) : (
        props.svg
      )}
    </ImgWrapper>
  );
}
