import { Section, sectionNames } from "openblocks-design";
import { eventHandlerControl } from "../../controls/eventHandlerControl";
import { StringStateControl, numberExposingStateControl } from "../../controls/codeStateControl";
import { UICompBuilder } from "../../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../../generators/withExposing";
import { RecordConstructorToView } from "openblocks-core";
import { useRef, useState } from "react";
import { styleControl } from "comps/controls/styleControl";
import { ImageStyle } from "comps/controls/styleControlConstants";
import { BoolControl } from "comps/controls/boolControl";
import { withDefault } from "../../generators/simpleGenerators";
import { Container, playIcon } from "openblocks-design";
import { RangeControl } from "../../controls/codeControl";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { Video } from "openblocks-design";
import ReactPlayer from "react-player";
import { mediaCommonChildren, mediaMethods } from "./mediaUtils";

const EventOptions = [
  { label: trans("video.play"), value: "play", description: trans("video.playDesc") },
  { label: trans("video.pause"), value: "pause", description: trans("video.pauseDesc") },
  { label: trans("video.load"), value: "load", description: trans("video.loadDesc") },
  { label: trans("video.ended"), value: "ended", description: trans("video.endedDesc") },
] as const;

const ContainerVideo = (props: RecordConstructorToView<typeof childrenMap>) => {
  const videoRef = useRef<ReactPlayer | null>(null);
  let [posterClicked, setPosterClicked] = useState(false);
  return (
    <Container ref={props.containerRef}>
      <Video
        config={{
          file: {
            forceVideo: true,
          },
        }}
        light={props.autoPlay ? "" : props.poster.value}
        ref={(t: ReactPlayer | null) => {
          props.viewRef(t);
          videoRef.current = t;
        }}
        url={props.src.value}
        onPlay={() => props.onEvent("play")}
        onReady={() => {
          if (videoRef.current != null) {
            props.duration.onChange(videoRef.current.getDuration());
          }
          props.onEvent("load");
        }}
        onPause={() => props.onEvent("pause")}
        onEnded={() => props.onEvent("ended")}
        loop={props.loop}
        controls={!props.controls}
        volume={props.volume}
        style={props.style}
        playbackRate={props.playbackRate}
        onClickPreview={() => {
          setPosterClicked(true);
        }}
        draggable={false}
        playIcon={playIcon()}
        playing={props.autoPlay || posterClicked}
        onProgress={() => {
          if (videoRef.current != null)
            props.currentTimeStamp.onChange(videoRef.current.getCurrentTime());
        }}
      />
    </Container>
  );
};

const childrenMap = {
  src: withDefault(StringStateControl, trans("video.defaultSrcUrl")),
  poster: withDefault(StringStateControl, trans("video.defaultPosterUrl")),
  onEvent: eventHandlerControl(EventOptions),
  style: styleControl(ImageStyle),
  autoPlay: BoolControl,
  loop: BoolControl,
  controls: BoolControl,
  volume: RangeControl.closed(0, 1, 1),
  playbackRate: RangeControl.closed(1, 2, 1),
  currentTimeStamp: numberExposingStateControl("currentTimeStamp", 0),
  duration: numberExposingStateControl("duration"),
  ...mediaCommonChildren,
};

let VideoBasicComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    return <ContainerVideo {...props} />;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.src.propertyView({
              label: trans("video.src"),
            })}
            {children.poster.propertyView({
              label: trans("video.poster"),
              tooltip: trans("video.posterTooltip"),
            })}
            {children.autoPlay.propertyView({
              label: trans("video.autoPlay"),
              tooltip: trans("video.autoPlayTooltip"),
            })}
            {children.loop.propertyView({
              label: trans("video.loop"),
            })}
            {children.controls.propertyView({
              label: trans("video.controls"),
              tooltip: trans("video.controlsTooltip"),
            })}
            {children.volume.propertyView({
              label: trans("video.volume"),
              tooltip: trans("video.volumeTooltip"),
            })}
            {children.playbackRate.propertyView({
              label: trans("video.playbackRate"),
              tooltip: trans("video.playbackRateTooltip"),
            })}
          </Section>

          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
        </>
      );
    })
    .setExposeMethodConfigs(mediaMethods())
    .build();
})();

VideoBasicComp = class extends VideoBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const VideoComp = withExposingConfigs(VideoBasicComp, [
  new NameConfig("src", trans("video.srcDesc")),
  new NameConfig("currentTimeStamp", trans("video.currentTimeStamp")),
  new NameConfig("duration", trans("video.duration")),
  NameConfigHidden,
]);
