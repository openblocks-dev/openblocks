import styled from "styled-components";
import { Section, sectionNames } from "openblocks-design";
import { eventHandlerControl } from "../../controls/eventHandlerControl";
import { StringStateControl } from "../../controls/codeStateControl";
import { UICompBuilder } from "../../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../../generators/withExposing";
import { RecordConstructorToView } from "openblocks-core";
import { styleControl } from "comps/controls/styleControl";
import { ImageStyle } from "comps/controls/styleControlConstants";
import { TacoAudio } from "openblocks-design";
import { BoolControl } from "comps/controls/boolControl";
import { withDefault } from "../../generators/simpleGenerators";
import { trans } from "i18n";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { mediaCommonChildren, mediaMethods } from "./mediaUtils";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div > audio {
    object-fit: contain;
    pointer-events: auto;
    height: 100%;
    width: 100%;
    :focus-visible {
      outline: 0px;
    }
  }
`;

const EventOptions = [
  { label: trans("audio.play"), value: "play", description: trans("audio.playDesc") },
  { label: trans("audio.pause"), value: "pause", description: trans("audio.pauseDesc") },
  { label: trans("audio.ended"), value: "ended", description: trans("audio.endedDesc") },
] as const;

const ContainerAudio = (props: RecordConstructorToView<typeof childrenMap>) => {
  return (
    <Container ref={props.containerRef}>
      <TacoAudio
        audioRef={props.viewRef}
        url={props.src.value}
        onPlay={() => props.onEvent("play")}
        onPause={() => props.onEvent("pause")}
        onEnded={() => props.onEvent("ended")}
        autoPlay={props.autoPlay}
        loop={props.loop}
      />
    </Container>
  );
};

const childrenMap = {
  src: withDefault(StringStateControl, trans("audio.defaultSrcUrl")),
  onEvent: eventHandlerControl(EventOptions),
  style: styleControl(ImageStyle),
  autoPlay: BoolControl,
  loop: BoolControl,
  ...mediaCommonChildren,
};

let AudioBasicComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    return <ContainerAudio {...props} />;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.src.propertyView({
              label: trans("audio.src"),
            })}
            {children.autoPlay.propertyView({
              label: trans("audio.autoPlay"),
            })}
            {children.loop.propertyView({
              label: trans("audio.loop"),
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

export const AudioComp = withExposingConfigs(AudioBasicComp, [
  new NameConfig("src", trans("audio.srcDesc")),
  NameConfigHidden,
]);
