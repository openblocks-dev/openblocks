import Exposing from "./Exposing";
import PageInfo from "./PageInfo";
import examples from "../examples";
import { Section, Title1 } from "./Styled";
import styled from "styled-components";
import Extra from "./Extra";
import { UICompType, UICompManifest } from "comps/uiCompRegistry";
import { trans } from "i18n";

interface IProps {
  name: UICompType;
  showExamples?: boolean;
  showBasicInfo?: boolean;
  compInfo: UICompManifest;
}

const Wrapper = styled.div`
  max-width: 984px;
`;

export default function PageContent(props: IProps) {
  const { name, compInfo, showBasicInfo = true, showExamples = true } = props;
  const Example = examples[name];
  return (
    <Wrapper>
      {/* comps basic info */}
      {showBasicInfo && <PageInfo compInfo={compInfo} />}

      {/* comps examples */}
      {Example && showExamples && (
        <Section>
          <Title1>{trans("componentDoc.example")}</Title1>
          <Example />
        </Section>
      )}

      {/* comps exposing info */}
      <Exposing compName={name} compFactory={compInfo.comp} />

      {/* extra info via Markdown */}
      <Extra compName={name} />
    </Wrapper>
  );
}
