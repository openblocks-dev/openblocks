import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { CloseIcon } from "openblocks-design";
import styled from "styled-components";
import { Layers } from "constants/Layers";

const VideoModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: auto;
`;

const VideoModalHeader = styled.div`
  margin-left: auto;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    height: 18px;
    width: 18px;

    g line {
      stroke: white;
    }
  }
`;

function VideoDialog(props: {
  videoSrc: string;
  visible: boolean;
  setVisible: (v: boolean) => void;
}) {
  const { videoSrc, visible, setVisible } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (visible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [visible]);

  return (
    <Modal
      centered
      zIndex={Layers.videoDialog}
      visible={visible}
      maskClosable
      onCancel={() => {
        setVisible(false);
      }}
      width="fit-content"
      modalRender={() => {
        return (
          <VideoModalWrapper>
            <VideoModalHeader
              onClick={() => {
                setVisible(false);
              }}
            >
              <CloseIcon />
            </VideoModalHeader>
            <video
              ref={videoRef}
              id="video"
              style={{
                height: `731.25px`,
                width: `1300px`,
                objectFit: `fill`,
                border: `1px solid rgb(204, 204, 204)`,
              }}
              controls
              src={videoSrc}
            />
          </VideoModalWrapper>
        );
      }}
    />
  );
}

export default VideoDialog;
