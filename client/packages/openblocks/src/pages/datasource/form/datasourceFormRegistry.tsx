import { HttpDatasourceForm } from "./httpDatasourceForm";
import { RedisDatasourceForm } from "./redisDatasourceForm";
import { EsDatasourceForm } from "./esDatasourceForm";
import { SMTPDatasourceForm } from "./smtpDatasourceForm";
import { FormInstance } from "antd";
import { MysqlDatasourceForm } from "./mysqlDatasourceForm";
import { MSSQLDatasourceForm } from "./mssqlDatasourceForm";
import { MongoDatasourceForm } from "./mongoDatasourceForm";
import { PostgresqlDatasourceForm } from "./postgresqlDatasourceForm";
import { FormSize } from "openblocks-design";
import { OracleDatasourceForm } from "./oracleDatasourceForm";
import { ClickHouseDatasourceForm } from "./clickhouseDatasourceForm";
import { GoogleSheetsDatasourceForm } from "./googleSheetsDatasourceForm";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";

export interface DatasourceFormProps {
  form: FormInstance;
  datasource: Datasource;
  size?: FormSize;
}

export type DatasourceFormManifest = {
  enableTest?: boolean;
  form: (props: DatasourceFormProps) => JSX.Element;
  whitelist?: boolean; // need users config the whitelist?
};

export const DatasourceFormRegistry: Partial<Record<DatasourceType, DatasourceFormManifest>> = {
  mysql: { form: MysqlDatasourceForm, whitelist: true },
  mongodb: { form: MongoDatasourceForm, whitelist: true },
  postgres: { form: PostgresqlDatasourceForm, whitelist: true },
  restApi: { enableTest: false, form: HttpDatasourceForm },
  redis: { form: RedisDatasourceForm, whitelist: true },
  es: { form: EsDatasourceForm, whitelist: true },
  mssql: { form: MSSQLDatasourceForm, whitelist: true },
  smtp: { form: SMTPDatasourceForm },
  oracle: { form: OracleDatasourceForm, whitelist: true },
  clickHouse: { form: ClickHouseDatasourceForm, whitelist: true },
  googleSheets: { enableTest: false, form: GoogleSheetsDatasourceForm },
};
