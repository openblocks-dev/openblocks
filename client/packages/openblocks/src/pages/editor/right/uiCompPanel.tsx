import {
  uiCompCategoryNames,
  UICompCategory,
  UICompManifest,
  uiCompRegistry,
} from "comps/uiCompRegistry";
import { draggingUtils } from "layout";
import { isEmpty } from "lodash";
import { language } from "i18n";
import {
  ComListTitle,
  CompIconDiv,
  EmptyCompContent,
  RightPanelContentWrapper,
} from "pages/editor/right/styledComponent";
import { tableDragClassName } from "pages/tutorials/tutorialsConstant";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { labelCss } from "openblocks-design";
import { TransparentImg } from "../../../util/commonUtils";
import { RightContext } from "./rightContext";

const GrayLabel = (props: { label: string }) => {
  const { label } = props;
  return <ComListTitle>{label}</ComListTitle>;
};

const CompDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  margin-top: 4px;
`;

const CompNameLabel = styled.div`
  ${labelCss};
  line-height: 15px;
  display: table;
  margin: 3px auto 0;
  color: #333333;
  text-align: center;
  word-break: keep-all;
`;

const CompEnNameLabel = styled.span`
  ${labelCss};
  line-height: 14px;
  font-size: 12px;
  display: table;
  margin: 4px auto auto;
  color: #8b8fa3;
  text-align: center;
  word-spacing: 99px;
`;

const HovDiv = styled.div`
  display: inline-block;
  border-radius: 4px;

  &:hover + ${CompNameLabel} {
    color: #315efb;
  }
`;

const IconContain = (props: { Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> }) => {
  const { Icon } = props;
  return (
    <CompIconDiv w={64} h={64}>
      <Icon />
    </CompIconDiv>
  );
};
const InsertContain = styled.div`
  width: 296px;
  display: flex;
  flex-wrap: wrap;
  padding: 4px 0 0 0;
  box-sizing: border-box;
  gap: 8px;
`;

const CategoryLabel = styled(GrayLabel)`
  margin: 0;
`;

const SectionWrapper = styled.div`
  margin-bottom: 16px;
`;

export const UICompPanel = () => {
  const { onDrag, searchValue } = useContext(RightContext);

  const categories = useMemo(() => {
    const cats: Record<string, [string, UICompManifest][]> = Object.fromEntries(
      Object.keys(uiCompCategoryNames).map((cat) => [cat, []])
    );
    Object.entries(uiCompRegistry).forEach(([name, manifest]) => {
      manifest.categories.forEach((cat) => {
        cats[cat].push([name, manifest]);
      });
    });
    return cats;
  }, []);

  const compList = useMemo(
    () =>
      Object.entries(categories)
        .filter(([key]) => !(!isEmpty(searchValue) && (key as UICompCategory) === "common"))
        .map(([key, value], index) => {
          let infos = value;
          if (!isEmpty(searchValue)) {
            const searchString = searchValue.trim().toLocaleLowerCase();
            infos = infos.filter((info) =>
              info[1].keywords.toLowerCase().includes(searchString.toLowerCase())
            );
          }

          if (isEmpty(infos)) {
            return null;
          }

          return (
            <SectionWrapper key={index}>
              <CategoryLabel label={uiCompCategoryNames[key as UICompCategory]} />
              <InsertContain>
                {infos.map((info) => (
                  <CompDiv key={info[0]} className={info[0] === "table" ? tableDragClassName : ""}>
                    <HovDiv
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("compType", info[0]);
                        e.dataTransfer.setDragImage(TransparentImg, 0, 0);
                        draggingUtils.setData("compType", info[0]);
                        onDrag(info[0]);
                      }}
                    >
                      <IconContain Icon={info[1].icon}></IconContain>
                    </HovDiv>
                    <CompNameLabel>{info[1].name}</CompNameLabel>
                    {language !== "en" && <CompEnNameLabel>{info[1].enName}</CompEnNameLabel>}
                  </CompDiv>
                ))}
              </InsertContain>
            </SectionWrapper>
          );
        })
        .filter((t) => t != null),
    [categories, searchValue, onDrag]
  );

  return (
    <RightPanelContentWrapper>
      {compList.length > 0 ? compList : <EmptyCompContent />}
    </RightPanelContentWrapper>
  );
};
