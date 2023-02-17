import { ConfigToType, QueryConfig } from "openblocks-sdk/dataSource";

enum FirebaseCategory {
  RealtimeDatabase = "RealtimeDatabase",
  Firestore = "Firestore",
}

const databaseRefParamConfig = {
  key: "databaseRef",
  label: "Database Ref",
  type: "textInput",
} as const;

const dataParamConfig = {
  key: "data",
  label: "Data",
  type: "jsonInput",
} as const;

const firestoreCollectionParamConfig = {
  key: "collection",
  label: "Collection",
  type: "textInput",
} as const;

const firestoreDocIdParamConfig = {
  key: "documentId",
  label: "Document ID",
  type: "textInput",
} as const;

const firestoreParentDocIdParamConfig = {
  key: "parentDocumentId",
  label: "Parent",
  type: "textInput",
  tooltip:
    "The parent document id of collections you want to list. Leave empty for top-level collections.",
} as const;

const firestoreDataParamConfig = {
  key: "data",
  label: "Data",
  type: "jsonInput",
} as const;

const categories = {
  label: "Service",
  items: [
    { label: "Realtime Database", value: FirebaseCategory.RealtimeDatabase },
    { label: "Firestore", value: FirebaseCategory.Firestore },
  ],
};

const queryConfig = {
  type: "query",
  categories,
  label: "Action",
  actions: [
    // actions of realtime database
    ...(
      [
        {
          label: "Query Database",
          actionName: "RTDB.QueryDatabase",
          params: [databaseRefParamConfig],
        },
        {
          label: "Set Data",
          actionName: "RTDB.SetData",
          params: [databaseRefParamConfig, dataParamConfig],
        },
        {
          label: "Update Data",
          actionName: "RTDB.UpdateData",
          params: [databaseRefParamConfig, dataParamConfig],
        },
        {
          label: "Append Data to a list",
          actionName: "RTDB.AppendDataToList",
          params: [databaseRefParamConfig, dataParamConfig],
        },
      ] as const
    ).map((i) => ({ ...i, category: [FirebaseCategory.RealtimeDatabase] })),

    // actions of firestore
    ...(
      [
        {
          label: "Query Firestore",
          actionName: "FS.QueryFireStore",
          params: [
            firestoreCollectionParamConfig,
            {
              key: "orderBy",
              label: "Order by",
              type: "textInput",
            },
            {
              key: "orderDirection",
              label: "Order direction",
              type: "textInput",
              defaultValue: "asc",
              placeholder: "asc",
            },
            {
              key: "limit",
              label: "Limit",
              type: "numberInput",
              defaultValue: 10,
            },
          ],
        },
        {
          label: "Insert Document",
          actionName: "FS.InsertDocument",
          params: [
            firestoreCollectionParamConfig,
            {
              ...firestoreDocIdParamConfig,
              tooltip: "Leaving empty will use auto generated document id.",
            },
            firestoreDataParamConfig,
          ],
        },
        {
          label: "Update Document",
          actionName: "FS.UpdateDocument",
          params: [
            firestoreCollectionParamConfig,
            firestoreDocIdParamConfig,
            firestoreDataParamConfig,
          ],
        },
        {
          label: "Get Document",
          actionName: "FS.GetDocument",
          params: [firestoreCollectionParamConfig, firestoreDocIdParamConfig],
        },
        {
          label: "Delete Document",
          actionName: "FS.DeleteDocument",
          params: [firestoreCollectionParamConfig, firestoreDocIdParamConfig],
        },
        {
          label: "Get Collections",
          actionName: "FS.GetCollections",
          params: [firestoreParentDocIdParamConfig],
        },
      ] as const
    ).map((i) => ({ ...i, category: [FirebaseCategory.Firestore] })),
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;
