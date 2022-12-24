import styled, { css } from "styled-components";
import { Section, sectionNames } from "openblocks-design";
import { clickEvent, eventHandlerControl } from "../controls/eventHandlerControl";
import { StringStateControl } from "../controls/codeStateControl";
import { UICompBuilder, withDefault } from "../generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../generators/withExposing";
import { RecordConstructorToView } from "openblocks-core";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ReactResizeDetector from "react-resize-detector";
import { styleControl } from "comps/controls/styleControl";
import { ImageStyle, ImageStyleType } from "comps/controls/styleControlConstants";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import { Image as AntImage } from "antd";
import { DEFAULT_IMG_URL } from "util/stringUtils";

const Container = styled.div<{ $style: ImageStyleType | undefined }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-image,
  img {
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: contain;
    pointer-events: auto;
  }

  ${(props) => props.$style && getStyle(props.$style)}
`;

const getStyle = (style: ImageStyleType) => {
  return css`
    img {
      border: 1px solid ${style.border};
      border-radius: ${style.radius};
    }

    .ant-image-mask {
      border-radius: ${style.radius};
    }
  `;
};

const EventOptions = [clickEvent] as const;

const ContainerImg = (props: RecordConstructorToView<typeof childrenMap>) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const conRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const imgOnload = (img: HTMLImageElement) => {
    img.onload = function () {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
  }

  useEffect(() => {
    const newImage = new Image(0, 0);
    newImage.src = props.src.value;
    imgOnload(newImage);
    newImage.onerror = function (e) {
      newImage.src = DEFAULT_IMG_URL;
      imgOnload(newImage);
    };
  }, [props.src.value]);

  useEffect(() =>{
    if (height && width) {
      onResize();
    }
  }, [height, width])

  // on safari
  const setStyle = (height: string, width: string) => {
    const img = imgRef.current;
    const imgDiv = img?.getElementsByTagName("div")[0];
    const imgCurrent = img?.getElementsByTagName("img")[0];
    img!.style.height = height;
    img!.style.width = width;
    imgDiv!.style.height = height;
    imgDiv!.style.width = width;
    imgCurrent!.style.height = height;
    imgCurrent!.style.width = width;
  };

  const onResize = () => {
    const img = imgRef.current;
    const container = conRef.current;
    if (!img?.clientWidth || !img?.clientHeight || props.autoHeight || !width) {
      return;
    }
    // fixme border style bug on safari
    if (
      (_.divide(container?.clientWidth!, container?.clientHeight!) || 0) >
      (_.divide(Number(width), Number(height)) || 0)
    ) {
      setStyle("100%", "auto");
    } else {
      setStyle("auto", "100%");
    }
  };
  return (
    <ReactResizeDetector onResize={onResize}>
      <Container ref={conRef} $style={props.style}>
        <div ref={imgRef} style={props.autoHeight ? { width: "100%", height: "100%" } : undefined}>
          <AntImage
            src={props.src.value}
            referrerPolicy="same-origin"
            draggable={false}
            preview={props.supportPreview}
            fallback={DEFAULT_IMG_URL}
            onClick={() => props.onEvent("click")}
          />
        </div>
      </Container>
    </ReactResizeDetector>
  );
};

const childrenMap = {
  src: withDefault(StringStateControl, "https://temp.im/350x400"),
  onEvent: eventHandlerControl(EventOptions),
  style: styleControl(ImageStyle),
  autoHeight: withDefault(AutoHeightControl, "fixed"),
  supportPreview: BoolControl,
};

let ImageBasicComp = new UICompBuilder(childrenMap, (props) => {
  return <ContainerImg {...props} />;
})
  .setPropertyViewFn((children) => {
    return (
      <>
        <Section name={sectionNames.basic}>
          {children.src.propertyView({
            label: trans("image.src"),
          })}
          {children.supportPreview.propertyView({
            label: trans("image.supportPreview"),
            tooltip: trans("image.supportPreviewTip"),
          })}
        </Section>

        <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>

        <Section name={sectionNames.layout}>
          {children.autoHeight.getPropertyView()}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  })
  .build();

ImageBasicComp = class extends ImageBasicComp {
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
};

export const ImageComp = withExposingConfigs(ImageBasicComp, [
  new NameConfig("src", trans("image.srcDesc")),
  NameConfigHidden,
]);
