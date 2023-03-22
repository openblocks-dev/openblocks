import styled from "styled-components";
import { ResourceType } from "@openblocks-ee/constants/queryConstants";
import {
  ClickHouseIcon,
  DataResponderIcon,
  DeleteApiIcon,
  EsIcon,
  FileFolderIcon,
  GetApiIcon,
  GoogleSheetsIcon,
  GraphqlIcon,
  HeadApiIcon,
  JSIcon,
  MariaDBIcon,
  MongoIcon,
  MSSQLIcon,
  MysqlIcon,
  OpenBlocksQueryIcon,
  OptionsApiIcon,
  OracleIcon,
  PatchApiIcon,
  PostApiIcon,
  PostgresIcon,
  PutApiIcon,
  QueryLibraryIcon,
  RedisIcon,
  RestApiIcon,
  SMTPIcon,
  SnowflakeIcon,
  TempStateIcon,
  TraceApiIcon,
  TransformerIcon,
} from "openblocks-design";
import { BottomResTypeEnum } from "types/bottomRes";
import { HttpMethod } from "api/api";

const QueryLibrary = styled(QueryLibraryIcon)`
  g g g {
    stroke: #222222;
  }
`;

export const IconWrapper = styled.div<{ isRestApi?: boolean }>`
  display: flex;
  width: ${(props) => (props.isRestApi ? "26px" : "16px")};
  height: ${(props) => (props.isRestApi ? "13px" : "16px")};
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 4px;
  align-items: center;
`;

export const LargeBottomResIconWrapper = styled(IconWrapper)`
  width: ${(props) => (props.isRestApi ? "32px" : "20px")};
  height: ${(props) => (props.isRestApi ? "16px" : "20px")};
  margin-right: 8px;

  svg {
    width: ${(props) => (props.isRestApi ? "32px" : "20px")};
    height: ${(props) => (props.isRestApi ? "16px" : "20px")};
  }
`;

function getBottomResIconInnerByUrl(type: BottomResType, url: string) {
  let fullUrl = url;
  if (!fullUrl.startsWith("http")) {
    fullUrl = `${REACT_APP_API_HOST}/node-service/plugin-icons/${url}`;
  }
  return <img style={{ width: "100%", height: "100%" }} src={fullUrl} alt="" />;
}

export type BottomResType =
  | ResourceType
  | BottomResTypeEnum.TempState
  | BottomResTypeEnum.Transformer
  | BottomResTypeEnum.Folder
  | BottomResTypeEnum.DateResponder;

const HttpMethodIcon = {
  DELETE: <DeleteApiIcon />,
  GET: <GetApiIcon />,
  PATCH: <PatchApiIcon />,
  POST: <PostApiIcon />,
  PUT: <PutApiIcon />,
  HEAD: <HeadApiIcon />,
  OPTIONS: <OptionsApiIcon />,
  TRACE: <TraceApiIcon />,
};

export const getBottomResIcon = (
  type: BottomResType,
  size?: "middle" | "large",
  defaultIconUrl?: string,
  httpMethod?: HttpMethod
) => {
  const getIcon = () => {
    switch (type) {
      case BottomResTypeEnum.TempState:
        return <TempStateIcon />;
      case BottomResTypeEnum.Transformer:
        return <TransformerIcon />;
      case BottomResTypeEnum.DateResponder:
        return <DataResponderIcon />;
      case BottomResTypeEnum.Folder:
        return <FileFolderIcon />;
      case "mysql":
        return <MysqlIcon />;
      case "mongodb":
        return <MongoIcon />;
      case "restApi":
        return httpMethod ? HttpMethodIcon[httpMethod] : <RestApiIcon />;
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
      case "snowflake":
        return <SnowflakeIcon />;
      case "mariadb":
        return <MariaDBIcon />;
      default:
        if (defaultIconUrl) {
          return getBottomResIconInnerByUrl(type, defaultIconUrl);
        }
        return <RestApiIcon />;
    }
  };
  const isRestApi = type === "restApi" && !!httpMethod;
  return size === "large" ? (
    <LargeBottomResIconWrapper isRestApi={isRestApi}>{getIcon()}</LargeBottomResIconWrapper>
  ) : (
    <IconWrapper isRestApi={isRestApi}>{getIcon()}</IconWrapper>
  );
};
