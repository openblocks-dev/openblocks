import ReactPlayer from "react-player";
import styled from "styled-components";
import { videoPlayTriangle } from "icons";

export const Video = styled(ReactPlayer)`
  height: 100% !important;
  width: 100% !important;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div > video {
    object-fit: contain;
    pointer-events: auto;
    height: 100%;
    width: 100%;
    :focus-visible {
      /* cover <video/> default css */
      outline: 0px;
    }
  }
`;
const PlayTriangle = styled(videoPlayTriangle)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: 0.3s;
  transform-origin: center;
`;

const PlayButton = styled.div`
  height: 80px;
  width: 80px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #4965f2;
  border: 4px solid #ffffff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  transition: 0.3s;
  transform-origin: center;
`;
export const playIcon = () => {
  return (
    <PlayButton>
      <PlayTriangle />
    </PlayButton>
  );
};
