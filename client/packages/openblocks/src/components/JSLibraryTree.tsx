import { Collapse } from "components/Collapase";
import React, { useEffect, useMemo } from "react";
import { EditPopover } from "components/popover";
import { trans } from "i18n";
import styled, { css } from "styled-components";
import { PointIcon } from "icons";
import { EllipsisTextCss } from "components/Label";
import { useDispatch, useSelector } from "react-redux";
import { parseJSLibraryURL } from "util/jsLibraryUtils";
import { jsLibrarySelector } from "redux/selectors/jsLibrarySelector";
import { fetchJSLibraryMetasAction } from "redux/reduxActions/jsLibraryActions";
import { Typography } from "antd";

const InfoWrapper = styled.div`
  color: #8b8fa3;
  margin-top: 5px;

  .exported-items {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
`;
const ExportWrapper = styled.div`
  background: #f5f5f6;
  border-radius: 4px;
  padding: 0 8px;
  width: fit-content;
  margin-left: 4px;
  height: 20px;
  line-height: 20px;
`;
const DescWrapper = styled(Typography.Paragraph)`
  line-height: 1.5em;
  font-size: 13px;
  color: #8b8fa3;
  margin-bottom: 8px !important;
`;
export const JSLibraryInfo = (props: { exportedAs?: string; description?: string }) => {
  return (
    <InfoWrapper>
      {props.exportedAs && !!props.exportedAs.length && (
        <div className={"exported-items"}>
          <div style={{ fontSize: "12px" }}>{trans("preLoad.exportedAs")}</div>
          <ExportWrapper>{props.exportedAs}</ExportWrapper>
        </div>
      )}
      {props.description && (
        <DescWrapper ellipsis={{ tooltip: { placement: "right" }, rows: 2 }}>
          {props.description}
        </DescWrapper>
      )}
    </InfoWrapper>
  );
};

export const JSLibraryLabel = (props: { name: string; version: string }) => (
  <div style={{ display: "flex", minWidth: 0, fontSize: "13px" }}>
    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {props.name}
    </div>
    <span style={{ color: "#8B8FA3", marginLeft: "4px", flexShrink: 0 }}>{props.version}</span>
  </div>
);

const Icon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;
  color: #8b8fa3;

  &:hover g {
    fill: #315efb;
  }
`;

const JSLibraryCollapse = styled(Collapse)<{ mode: "row" | "column" }>`
  margin-bottom: 12px;

  cursor: inherit;
  padding-left: 0;

  div {
    font-weight: 400;
  }

  ${(props) =>
    props.mode === "row"
      ? css`
          width: 284px;

          .ant-collapse {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 13px 56px;
            margin-top: 13px;
          }

          .ant-typography {
            margin-bottom: 0;
          }

          .lib-label {
            width: 266px;
          }
        `
      : css`
          .ant-typography {
            margin-bottom: 10px;
          }

          .lib-label {
            margin-right: 16px;
            width: 256px;
          }
        `}
  &:hover {
    background-color: #ffffff;
  }

  .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding-left: 14px;
    margin-right: 16px;
  }

  .lib-label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .lib-label-name {
    ${EllipsisTextCss};
  }
`;

export interface JSLibraryTreeLibInfo {
  url: string;
  deletable: boolean;
  exportedAs?: string;
}

export const JSLibraryTree = (props: {
  mode: "row" | "column";
  libs: JSLibraryTreeLibInfo[];
  onDelete: (idx: number) => void;
}) => {
  const dispatch = useDispatch();
  const metas = useSelector(jsLibrarySelector);

  const nameAndVersions = useMemo(
    () => props.libs.map((lib) => ({ ...lib, ...parseJSLibraryURL(lib.url) })),
    [props.libs]
  );

  const finalMetas = useMemo(
    () =>
      nameAndVersions.map(({ name, ...others }) => ({
        ...metas[name],
        ...others,
        name,
      })),
    [nameAndVersions, metas]
  );

  useEffect(() => {
    const notExistMetas = nameAndVersions
      .filter(({ name }) => !metas[name])
      .map(({ name }) => name);
    !!notExistMetas.length && dispatch(fetchJSLibraryMetasAction(notExistMetas));
  }, []);

  return (
    <JSLibraryCollapse
      mode={props.mode}
      isSelected={false}
      isOpen={false}
      config={finalMetas.map((meta, idx) => {
        const options = [];
        if (meta.homepage) {
          options.push({
            text: trans("preLoad.viewJSLibraryDocument"),
            onClick: () => window.open(meta.homepage, "_blank"),
          });
        }
        if (meta.deletable) {
          options.push({
            text: trans("delete"),
            onClick: () => {
              props.onDelete(idx);
            },
            type: "delete",
          } as const);
        }
        return {
          key: idx,
          title: (
            <div className={"lib-label"}>
              <JSLibraryLabel name={meta.name} version={meta.latestVersion} />
              {!!options.length && (
                <EditPopover items={options}>
                  <Icon tabIndex={-1} />
                </EditPopover>
              )}
            </div>
          ),
          data: (
            <JSLibraryInfo
              description={meta.description ?? meta.url}
              exportedAs={meta.exportedAs}
            />
          ),
        };
      })}
    />
  );
};
