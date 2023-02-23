import { CSSProperties } from "react";
import { Ref } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const Audio = styled(ReactPlayer)`
  height: 32px !important;
`;

export function TacoAudio(props: {
  url: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
  style?: CSSProperties;
  audioRef?: Ref<ReactPlayer>;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  const { url, onPlay, onPause, onEnded, className, style, autoPlay, loop } = props;
  return (
    <Audio
      config={{
        file: {
          attributes: {
            controlsList: "nofullscreen nodownload noremoteplayback noplaybackrate",
          },
          forceAudio: true,
        },
      }}
      ref={props.audioRef}
      draggable={false}
      loop={loop}
      controls
      className={className}
      style={style}
      url={url}
      playing={autoPlay}
      onPlay={() => onPlay && onPlay()}
      onPause={() => onPause && onPause()}
      onEnded={() => onEnded && onEnded()}
    />
  );
}
