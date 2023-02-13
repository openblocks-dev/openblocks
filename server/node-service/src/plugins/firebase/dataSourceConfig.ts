import { ConfigToType } from "openblocks-sdk/dataSource";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "databaseUrl",
      label: "Firebase Database URL",
      tooltip:
        "You can find your database URL and Firestore ID in your [Firebase project console](https://console.firebase.google.com/)",
      type: "textInput",
    },
    {
      key: "firestoreId",
      label: "Firestore Project ID",
      type: "textInput",
    },
    {
      key: "privateKey",
      label: "Private Key",
      type: "password",
      tooltip:
        "The [document](https://firebase.google.com/docs/admin/setup) on how to obtain the private key.",
    },
  ],
} as const;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;

export default dataSourceConfig;
