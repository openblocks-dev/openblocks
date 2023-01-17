import styled from "styled-components";
import { ResourceType } from "@openblocks-ee/constants/queryConstants";
import {
  ClickHouseIcon,
  EsIcon,
  GoogleSheetsIcon,
  GraphqlIcon,
  JSIcon,
  MongoIcon,
  MSSQLIcon,
  MysqlIcon,
  OpenBlocksQueryIcon,
  OracleIcon,
  PostgresIcon,
  QueryLibraryIcon,
  RedisIcon,
  RestApiIcon,
  SMTPIcon,
  TempStateIcon,
  TransformerIcon,
} from "openblocks-design";
import { BottomResTypeEnum } from "types/bottomRes";

const QueryLibrary = styled(QueryLibraryIcon)`
  g g g {
    stroke: #222222;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 4px;
  align-items: center;
`;

export const LargeBottomResIconWrapper = styled(IconWrapper)`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

function getBottomResIconInnerByUrl(type: ResourceType, url: string) {
  let fullUrl = url;
  if (!fullUrl.startsWith("http")) {
    fullUrl = `${REACT_APP_API_HOST}/node-service/plugin-icons/${url}`;
  }
  return <img style={{ width: "100%", height: "100%" }} src={fullUrl} alt="" />;
}

export type BottomResType =
  | ResourceType
  | BottomResTypeEnum.TempState
  | BottomResTypeEnum.Transformer;

export const getBottomResIcon = (
  type: BottomResType,
  size?: "middle" | "large",
  defaultIconUrl?: string
) => {
  const getIcon = () => {
    switch (type) {
      case BottomResTypeEnum.TempState:
        return <TempStateIcon />;
      case BottomResTypeEnum.Transformer:
        return <TransformerIcon />;
      case "mysql":
        return <MysqlIcon />;
      case "mongodb":
        return <MongoIcon />;
      case "restApi":
        return <RestApiIcon />;
      case "postgres":
        return <PostgresIcon />;
      case "js":
        return <JSIcon />;
      case "redis":
        return <RedisIcon />;
      case "es":
        return <EsIcon />;
      case "mssql":
        return <MSSQLIcon />;
      case "smtp":
        return <SMTPIcon />;
      case "oracle":
        return <OracleIcon />;
      case "clickHouse":
        return <ClickHouseIcon />;
      case "libraryQuery":
        return <QueryLibrary />;
      case "googleSheets":
        return <GoogleSheetsIcon />;
      case "graphql":
        return <GraphqlIcon />;
      case "openblocksApi":
        return <OpenBlocksQueryIcon />;
      default:
        if (defaultIconUrl) {
          return getBottomResIconInnerByUrl(type, defaultIconUrl);
        }
        return <RestApiIcon />;
    }
  };
  return size === "large" ? (
    <LargeBottomResIconWrapper>{getIcon()}</LargeBottomResIconWrapper>
  ) : (
    <IconWrapper>{getIcon()}</IconWrapper>
  );
};
