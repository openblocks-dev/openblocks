import {
  BoolControl,
  hiddenPropertyView,
  NameConfig,
  Section,
  sectionNames,
  StringStateControl,
  UICompBuilder,
  withDefault,
  withExposingConfigs,
  eventHandlerControl,
  NameConfigHidden,
  stringExposingStateControl,
} from "openblocks-sdk";
import { useRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import _ from "lodash";
import { RecordConstructorToView } from "openblocks-core";
import { Container, customTheme, EmbeddedButton, saveEvent } from "./imageEditorConstants";
import { ImageEditor } from "./imageEditorClass";
import { i18nObjs, trans } from "i18n/comps";

const childrenMap = {
  src: withDefault(StringStateControl, trans("imageEditor.defaultSrc")),
  name: withDefault(StringStateControl, "Example"),
  crop: withDefault(BoolControl, true),
  flip: withDefault(BoolControl, true),
  rotate: withDefault(BoolControl, true),
  draw: withDefault(BoolControl, true),
  shape: withDefault(BoolControl, true),
  icon: withDefault(BoolControl, true),
  text: withDefault(BoolControl, true),
  mask: withDefault(BoolControl, true),
  filter: withDefault(BoolControl, true),
  dataURI: stringExposingStateControl("dataURI"),
  data: stringExposingStateControl("data"),
  onEvent: eventHandlerControl([saveEvent] as const),
  buttonText: withDefault(StringStateControl, trans("imageEditor.save")),
};

const ContainerImageEditor = (props: RecordConstructorToView<typeof childrenMap>) => {
  const editorRef = useRef<any>(null);
  const conRef = useRef<HTMLDivElement>(null);

  const menu = ["crop", "flip", "rotate", "draw", "shape", "icon", "text", "mask", "filter"];
  const menuMap = new Map<string, boolean>();
  menuMap.set("crop", props.crop);
  menuMap.set("flip", props.flip);
  menuMap.set("rotate", props.rotate);
  menuMap.set("draw", props.draw);
  menuMap.set("shape", props.shape);
  menuMap.set("icon", props.icon);
  menuMap.set("text", props.text);
  menuMap.set("mask", props.mask);
  menuMap.set("filter", props.filter);
  let filteredMenu = menu.filter((ele) => {
    return menuMap.get(ele);
  });
  const onResize = () => {
    const editor = editorRef.current;
    const container = conRef.current;
    editor.imageEditorInst.ui.resizeEditor({
      uiSize: { width: container?.clientWidth, height: container?.clientHeight },
    });
  };

  const saveImage = () => {
    let imageEditorInst = editorRef.current.imageEditorInst;
    let dataURL = imageEditorInst.toDataURL();
    props.dataURI.onChange(dataURL);
    props.data.onChange(dataURL.split(",")[1]);
  };
  return (
    <Container ref={conRef}>
      <EmbeddedButton
        type="primary"
        onClick={() => {
          saveImage();
          props.onEvent("save");
        }}
      >
        {props.buttonText.value}
      </EmbeddedButton>
      <ReactResizeDetector onResize={onResize}>
        <div style={{ width: "100%", height: "100%" }}>
          <ImageEditor
            ref={editorRef}
            includeUI={{
              loadImage: {
                path: props.src.value,
                name: props.name.value,
              },
              menu: filteredMenu,
              theme: customTheme,
              uiSize: {
                width: "100%",
                height: "100%",
              },
              menuBarPosition: "bottom",
              locale: i18nObjs.imageEditorLocale ?? {},
            }}
            cssMaxWidth={document.documentElement.clientWidth}
            cssMaxHeight={document.documentElement.clientHeight}
            selectionStyle={{
              cornerSize: 50,
              rotatingPointOffset: 100,
            }}
            usageStatistics={false}
          />
        </div>
      </ReactResizeDetector>
    </Container>
  );
};
let ImageEditorBasicComp = (function () {
  return new UICompBuilder(childrenMap, (props) => {
    return <ContainerImageEditor {...props} />;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.src.propertyView({
              label: trans("imageEditor.src"),
              placeholder: "http://xxx.jpg",
            })}
            {children.name.propertyView({
              label: trans("imageEditor.name"),
            })}
            {children.buttonText.propertyView({
              label: trans("imageEditor.buttonText"),
            })}
          </Section>
          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
          <Section name={sectionNames.advanced}>
            {children.crop.propertyView({
              label: "Crop",
            })}
            {children.flip.propertyView({
              label: "Flip",
            })}
            {children.rotate.propertyView({
              label: "Rotate",
            })}
            {children.draw.propertyView({
              label: "Draw",
            })}
            {children.shape.propertyView({
              label: "Shape",
            })}
            {children.icon.propertyView({
              label: "Icon",
            })}
            {children.text.propertyView({
              label: "Text",
            })}
            {children.mask.propertyView({
              label: "Mask",
            })}
            {children.filter.propertyView({
              label: "Filter",
            })}
          </Section>
          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
        </>
      );
    })
    .build();
})();

ImageEditorBasicComp = class extends ImageEditorBasicComp {
  override autoHeight(): boolean {
    return false;
  }
};

export const ImageEditorComp = withExposingConfigs(ImageEditorBasicComp, [
  new NameConfig("src", trans("imageEditor.srcDesc")),
  new NameConfig("name", trans("imageEditor.nameDesc")),
  new NameConfig("dataURI", trans("imageEditor.dataURIDesc")),
  new NameConfig("data", trans("imageEditor.dataDesc")),
  new NameConfig("buttonText", trans("imageEditor.buttonTextDesc")),
  NameConfigHidden,
]);
