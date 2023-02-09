import { UICompBuilder, withDefault } from "../generators";
import { Section, sectionNames } from "openblocks-design";
import { StringControl } from "../controls/codeControl";
import { BoolControl } from "../controls/boolControl";
import styled from "styled-components";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "../generators/withExposing";
import { styleControl } from "comps/controls/styleControl";
import { IframeStyle, IframeStyleType } from "comps/controls/styleControlConstants";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";
import log from "loglevel";

const Wrapper = styled.div<{ $style: IframeStyleType }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${(props) => props.$style.border};
  border-radius: calc(min(${(props) => props.$style.radius}, 20px));

  iframe {
    border: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: ${(props) => props.$style.background};
  }
`;

const regex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;

let IFrameCompBase = new UICompBuilder(
  {
    url: StringControl,
    allowDownload: BoolControl,
    allowSubmitForm: BoolControl,
    allowMicrophone: BoolControl,
    allowCamera: BoolControl,
    allowPopup: BoolControl,
    style: styleControl(IframeStyle),
  },
  (props) => {
    const sandbox = ["allow-scripts", "allow-same-origin"];
    props.allowSubmitForm && sandbox.push("allow-forms");
    props.allowDownload && sandbox.push("allow-downloads");
    props.allowPopup && sandbox.push("allow-popups");

    const allow = [];
    props.allowCamera && allow.push("camera");
    props.allowMicrophone && allow.push("microphone");

    const src = regex.test(props.url) ? props.url : "about:blank";
    log.log(props.url, regex.test(props.url) ? props.url : "about:blank", src);
    return (
      <Wrapper $style={props.style}>
        <iframe src={src} sandbox={sandbox.join(" ")} allow={allow.join(";")} />
      </Wrapper>
    );
  }
)
  .setPropertyViewFn((children) => (
    <>
      <Section name={sectionNames.basic}>
        {children.url.propertyView({ label: "URL", placeholder: "https://example.com" })}
      </Section>

      <Section name={sectionNames.advanced}>
        {children.allowDownload.propertyView({ label: trans("iframe.allowDownload") })}
        {children.allowSubmitForm.propertyView({ label: trans("iframe.allowSubmitForm") })}
        {children.allowMicrophone.propertyView({ label: trans("iframe.allowMicrophone") })}
        {children.allowCamera.propertyView({ label: trans("iframe.allowCamera") })}
        {children.allowPopup.propertyView({ label: trans("iframe.allowPopup") })}
      </Section>

      <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
      <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
    </>
  ))
  .build();

IFrameCompBase = class extends IFrameCompBase {
  override autoHeight(): boolean {
    return false;
  }
};

export const IFrameComp = withExposingConfigs(IFrameCompBase, [
  new NameConfig("url", trans("iframe.URLDesc")),
  NameConfigHidden,
]);
