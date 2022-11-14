import styled from "styled-components";
import { ResourceType } from "@openblocks-ee/constants/queryConstants";
import {
  ClickHouseIcon,
  EsIcon,
  GoogleSheetsIcon,
  JSIcon,
  MongoIcon,
  MSSQLIcon,
  MysqlIcon,
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

export const getBottomResIcon = (
  type: ResourceType | BottomResTypeEnum.TempState | BottomResTypeEnum.Transformer,
  size?: "middle" | "large"
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
      default:
        return <RestApiIcon />;
    }
  };
  return size === "large" ? (
    <LargeBottomResIconWrapper>{getIcon()}</LargeBottomResIconWrapper>
  ) : (
    <IconWrapper>{getIcon()}</IconWrapper>
  );
};
