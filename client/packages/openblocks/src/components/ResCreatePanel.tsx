import { AddIcon, CloseIcon, CustomModalProps, ScrollBar } from "openblocks-design";
import { BottomShadow, GreyTextColor, TabActiveColor } from "constants/style";
import { trans } from "i18n";
import _, { noop } from "lodash";
import { CreateDataSourceModal } from "pages/datasource/datasourceModal";
import { DataSourceButton } from "pages/datasource/pluginPanel";
import { useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import styled, { css } from "styled-components";
import { BottomResTypeEnum } from "types/bottomRes";
import { LargeBottomResIconWrapper } from "util/bottomResUtils";
import { PageType } from "../constants/pageConstants";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import {
  OPENBLOCKS_API_ID,
  OPENBLOCKS_API_INFO,
  QUICK_GRAPHQL_ID,
  QUICK_REST_API_ID,
} from "../constants/datasourceConstants";
import { ResourceType } from "@openblocks-ee/constants/queryConstants";

const Wrapper = styled.div<{ placement: PageType }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;

  ${(props) => {
    return props.placement === "editor"
      ? css`
          top: 0;
        `
      : css`
          padding: 36px 36px 0 0;
        `;
  }}
}

.section-title {
  font-size: 13px;
  line-height: 1;
  color: ${GreyTextColor};
  margin-bottom: 8px;
}

.section {
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0px;
  }
}
`;

const Title = styled.div<{ shadow: boolean; placement: PageType }>`
  height: 40px;
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: ${(props) => (props.placement === "editor" ? "center" : "flex-start")};

  ${(props) => (props.shadow ? `box-shadow: ${BottomShadow};` : "")}
  .title-text {
    font-size: ${(props) => (props.placement === "editor" ? 16 : 18)}px;
    font-weight: 500;
  }

  .title-close-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${GreyTextColor};

    &:hover {
      color: ${TabActiveColor};
    }
  }
`;

const Content = styled.div`
  height: calc(100% - 40px);
`;

const InnerContent = styled.div`
  padding: 8px 16px 24px;
`;

const DataSourceListWrapper = styled.div<{ placement?: PageType }>`
  display: flex;
  gap: ${(props) => (props.placement === "queryLibrary" ? 12 : 8)}px;
  flex-wrap: wrap;
`;

const ResButton = (props: {
  size: SizeType;
  onSelect: (type: BottomResTypeEnum, extraInfo?: any) => void;
  identifier:
    | Partial<ResourceType>
    | BottomResTypeEnum.TempState
    | BottomResTypeEnum.Transformer
    | Datasource;
}) => {
  let label = "";
  let handleClick = noop;
  let icon = getBottomResIcon(
    typeof props.identifier === "object" ? props.identifier.type : props.identifier,
    "large"
  );
  if (props.identifier === BottomResTypeEnum.TempState) {
    label = trans("query.tempState");
    handleClick = () => props.onSelect(BottomResTypeEnum.TempState);
  } else if (props.identifier === BottomResTypeEnum.Transformer) {
    label = trans("query.transformer");
    handleClick = () => props.onSelect(BottomResTypeEnum.Transformer);
  } else if (props.identifier === "js") {
    label = trans("query.executeJSCode");
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: "js",
      });
  } else if (props.identifier === "libraryQuery") {
    label = trans("query.importFromQueryLibrary");
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: "libraryQuery",
      });
  } else if (props.identifier === "restApi") {
    label = trans("query.quickRestAPI");
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: "restApi",
        dataSourceId: QUICK_REST_API_ID,
      });
  } else if (props.identifier === "graphql") {
    label = trans("query.quickGraphql");
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: "graphql",
        dataSourceId: QUICK_GRAPHQL_ID,
      });
  } else if (props.identifier === "openblocksApi") {
    label = OPENBLOCKS_API_INFO.name;
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: "openblocksApi",
        dataSourceId: OPENBLOCKS_API_ID,
      });
    icon = OPENBLOCKS_API_INFO.icon;
  } else if (typeof props.identifier === "object") {
    const identifier = props.identifier;
    label = identifier.name;
    handleClick = () =>
      props.onSelect(BottomResTypeEnum.Query, {
        compType: identifier.type,
        dataSourceId: identifier.id,
      });
  }

  return (
    <DataSourceButton onClick={handleClick} size={props.size}>
      {icon}
      {label}
    </DataSourceButton>
  );
};

interface ResCreateModalProps extends CustomModalProps {
  recentlyUsed: Array<
    "js" | "libraryQuery" | BottomResTypeEnum.TempState | BottomResTypeEnum.Transformer | Datasource
  >;
  datasource: Datasource[];
  onSelect: (type: BottomResTypeEnum, extraInfo?: any) => void;
  onClose: () => void;
  placement?: PageType;
}

export function ResCreatePanel(props: ResCreateModalProps) {
  const { onSelect, onClose, recentlyUsed, datasource, placement = "editor" } = props;
  const [isScrolling, setScrolling] = useState(false);
  const [visible, setVisible] = useState(false);

  const { width, ref } = useResizeDetector({ handleHeight: false });
  const count = width ? Math.floor((width + 8) / (184 + 8)) : 3;

  const buttonSize = placement !== "queryLibrary" ? "small" : "middle";

  const handleScroll = _.throttle((e: any) => {
    const top = e.target.scrollTop;
    setScrolling(top > 0);
  }, 100);

  return (
    <Wrapper placement={placement}>
      <Title shadow={isScrolling} placement={placement}>
        <div onScroll={handleScroll} className="title-text">
          {trans("query.newQuery")}
        </div>
        <div className="title-close-btn">
          <CloseIcon onClick={onClose} />
        </div>
      </Title>
      <Content>
        <ScrollBar scrollableNodeProps={{ onScroll: handleScroll }}>
          <InnerContent>
            {recentlyUsed.length > 0 && (
              <>
                <div className="section-title">{trans("query.recentlyUsed")}</div>
                <div ref={ref} className="section">
                  <DataSourceListWrapper placement={placement}>
                    {_.uniq(recentlyUsed)
                      .slice(0, count)
                      .map((id, idx) => (
                        <ResButton
                          key={idx}
                          size={buttonSize}
                          identifier={id}
                          onSelect={onSelect}
                        />
                      ))}
                  </DataSourceListWrapper>
                </div>
              </>
            )}

            {placement === "editor" && (
              <>
                <div className="section-title">{trans("code")}</div>
                <div className="section">
                  <DataSourceListWrapper placement={placement}>
                    <ResButton
                      size={buttonSize}
                      identifier={BottomResTypeEnum.TempState}
                      onSelect={onSelect}
                    />
                    <ResButton
                      size={buttonSize}
                      identifier={BottomResTypeEnum.Transformer}
                      onSelect={onSelect}
                    />
                    <ResButton size={buttonSize} identifier={"js"} onSelect={onSelect} />
                    <ResButton size={buttonSize} identifier={"libraryQuery"} onSelect={onSelect} />
                  </DataSourceListWrapper>
                </div>
              </>
            )}

            <div className="section-title">{trans("query.datasource")}</div>
            <div className="section">
              <DataSourceListWrapper placement={placement}>
                <ResButton size={buttonSize} identifier={"restApi"} onSelect={onSelect} />
                <ResButton size={buttonSize} identifier={"graphql"} onSelect={onSelect} />
                {placement === "editor" && (
                  <ResButton size={buttonSize} identifier={"openblocksApi"} onSelect={onSelect} />
                )}

                {datasource.map((i) => (
                  <ResButton size={buttonSize} key={i.id} identifier={i} onSelect={onSelect} />
                ))}
                <DataSourceButton size={buttonSize} onClick={() => setVisible(true)}>
                  <LargeBottomResIconWrapper>
                    <AddIcon />
                  </LargeBottomResIconWrapper>
                  {trans("query.newDatasource")}
                </DataSourceButton>
              </DataSourceListWrapper>
            </div>
          </InnerContent>
        </ScrollBar>
      </Content>
      <CreateDataSourceModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreated={() => setVisible(false)}
      />
    </Wrapper>
  );
}
