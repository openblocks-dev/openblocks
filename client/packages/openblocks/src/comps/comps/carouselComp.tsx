import { Carousel } from "antd";
import { Section, sectionNames } from "openblocks-design";
import { BoolControl } from "../controls/boolControl";
import { UICompBuilder, withDefault } from "../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../generators/withExposing";
import styled from "styled-components";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { ChangeEventHandlerControl } from "comps/controls/eventHandlerControl";
import { formDataChildren, FormDataPropertyView } from "./formComp/formDataConstants";
import { PositionControl } from "comps/controls/dropdownControl";
import { useRef, useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import { ArrayStringControl } from "comps/controls/codeControl";

const CarouselItem = styled.div<{ src: string }>`
  background: ${(props) => props.src && `url(${props.src})`} no-repeat 50% 50%;
  background-size: contain;
`;

const Container = styled.div`
  &,
  .ant-carousel {
    height: 100%;
  }
`;

let CarouselBasicComp = (function () {
  const childrenMap = {
    autoPlay: withDefault(BoolControl, true),
    data: withDefault(
      ArrayStringControl,
      JSON.stringify(["https://temp.im/403x192", "https://temp.im/403x192"])
    ),
    onEvent: ChangeEventHandlerControl,
    showDots: withDefault(BoolControl, true),
    dotPosition: withDefault(PositionControl, "bottom"),

    ...formDataChildren,
  };
  return new UICompBuilder(childrenMap, (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const onResize = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight);
      }
    };
    return (
      <Container ref={containerRef}>
        <ReactResizeDetector onResize={onResize}>
          <Carousel
            dots={props.showDots}
            dotPosition={props.dotPosition}
            autoplay={props.autoPlay}
            afterChange={() => props.onEvent("change")}
          >
            {props.data.map((url, index) => (
              <div key={index}>
                <CarouselItem src={url} style={{ height }} />
              </div>
            ))}
          </Carousel>
        </ReactResizeDetector>
      </Container>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.data.propertyView({ label: trans("data") })}
            {children.autoPlay.propertyView({ label: trans("carousel.autoPlay") })}
          </Section>
          <FormDataPropertyView {...children} />
          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
          <Section name={sectionNames.layout}>
            {children.showDots.propertyView({ label: trans("carousel.showDots") })}
            {children.dotPosition.propertyView({
              label: trans("carousel.dotPosition"),
              radioButton: true,
            })}
            {hiddenPropertyView(children)}
          </Section>
        </>
      );
    })
    .build();
})();

CarouselBasicComp = class extends CarouselBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const CarouselComp = withExposingConfigs(CarouselBasicComp, [
  new NameConfig("data", trans("data")),
  NameConfigHidden,
]);
