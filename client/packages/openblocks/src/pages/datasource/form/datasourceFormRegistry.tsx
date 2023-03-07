import { HttpDatasourceForm } from "./httpDatasourceForm";
import { RedisDatasourceForm } from "./redisDatasourceForm";
import { EsDatasourceForm } from "./esDatasourceForm";
import { SMTPDatasourceForm } from "./smtpDatasourceForm";
import { FormInstance } from "antd";
import { MongoDatasourceForm } from "./mongoDatasourceForm";
import { FormSize } from "openblocks-design";
import { GoogleSheetsDatasourceForm } from "./googleSheetsDatasourceForm";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import { sqlDatasourceForm } from "./sqlDatasourceForm";
import { GraphqlDatasourceForm } from "./graphqlDatasourceForm";
import { OracleDatasourceForm } from "./oracleDatasourceForm";
import { DataSourceTypeInfo } from "api/datasourceApi";
import { SnowflakeDatasourceForm } from "pages/datasource/form/snowflakeDatasourceForm";

export interface DatasourceFormProps {
  form: FormInstance;
  dataSourceTypeInfo?: DataSourceTypeInfo;
  datasource: Datasource;
  onFormReadyStatusChange: (ready: boolean) => void;
  size?: FormSize;
}

export type DatasourceFormManifest = {
  enableTest?: boolean;
  form: (props: DatasourceFormProps) => JSX.Element;
  whitelist?: boolean; // need users config the whitelist?
};

export const DatasourceFormRegistry: Partial<Record<DatasourceType, DatasourceFormManifest>> = {
  mysql: { form: sqlDatasourceForm({ placeholder: "My MySQL1", port: "3306" }), whitelist: true },
  mongodb: { form: MongoDatasourceForm, whitelist: true },
  postgres: {
    form: sqlDatasourceForm({ placeholder: "My PostgreSQL1", port: "5432" }),
    whitelist: true,
  },
  restApi: { enableTest: false, form: HttpDatasourceForm },
  redis: { form: RedisDatasourceForm, whitelist: true },
  es: { form: EsDatasourceForm, whitelist: true },
  mssql: {
    form: sqlDatasourceForm({ placeholder: "My SQLServer1", port: "1433" }),
    whitelist: true,
  },
  smtp: { form: SMTPDatasourceForm },
  oracle: { form: OracleDatasourceForm, whitelist: true },
  clickHouse: {
    form: sqlDatasourceForm({ placeholder: "My ClickHouse1", port: "8123" }),
    whitelist: true,
  },
  googleSheets: { enableTest: false, form: GoogleSheetsDatasourceForm },
  graphql: { enableTest: false, form: GraphqlDatasourceForm },
  snowflake: { form: SnowflakeDatasourceForm, whitelist: true },
  oceanBase: {
    form: sqlDatasourceForm({ placeholder: "My OceanBase1", port: "2881" }),
    whitelist: true,
  },
  tidb: {
    form: sqlDatasourceForm({ placeholder: "My TiDB1", port: "4000" }),
    whitelist: true,
  },
  openGauss: {
    form: sqlDatasourceForm({ placeholder: "My OpenGauss1", port: "5432" }),
    whitelist: true,
  },
  gaussdb: {
    form: sqlDatasourceForm({ placeholder: "My Gauss1", port: "5432" }),
    whitelist: true,
  },
  dameng: {
    form: sqlDatasourceForm({
      placeholder: "My DaMeng1",
      port: "5236",
      supportSSL: false,
      supportDatabase: false,
    }),
    whitelist: true,
  },
  polardbMysql: {
    form: sqlDatasourceForm({ placeholder: "My PolarDB1", port: "3306" }),
    whitelist: true,
  },
  tdengine: {
    form: sqlDatasourceForm({
      placeholder: "My TDengine1",
      port: "6041",
      supportPreparedStatement: false,
    }),
    whitelist: true,
  },
  sequoiadbMysql: {
    form: sqlDatasourceForm({ placeholder: "My SequoiaDB1", port: "3306" }),
    whitelist: true,
  },
  mogdb: {
    form: sqlDatasourceForm({ placeholder: "My MogDB1", port: "5432" }),
    whitelist: true,
  },
  starrocks: {
    form: sqlDatasourceForm({ placeholder: "My StarRocks1", port: "9030" }),
    whitelist: true,
  },
};
