import { badRequest } from "../../common/error";
import { initializeApp, deleteApp, cert } from "firebase-admin/app";
import { getDatabase, Reference } from "firebase-admin/database";
import { DataSourceDataType } from "./dataSourceConfig";
import { ActionDataType } from "./queryConfig";

export async function runFirebasePlugin(
  actionData: ActionDataType,
  dataSourceConfig: DataSourceDataType
) {
  const { actionName } = actionData;
  const { privateKey, databaseUrl } = dataSourceConfig;
  const serviceAccount = JSON.parse(privateKey);

  const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: databaseUrl,
  });

  const witDbRef = <T>(fn: (ref: Reference) => T): T => {
    if (!("databaseRef" in actionData)) {
      throw badRequest("not a realtime database action:" + actionName);
    }
    const ref = getDatabase().ref(actionData.databaseRef);
    return fn(ref);
  };

  try {
    // firebase
    if (actionName === "RTDB.QueryDatabase") {
      const data = await witDbRef((ref) => ref.once("value"));
      return data.val();
    }

    if (actionName === "RTDB.SetData") {
      return await witDbRef((ref) => ref.set(actionData.data));
    }

    if (actionName === "RTDB.UpdateData") {
      return await witDbRef((ref) => ref.update(actionData.data));
    }

    if (actionName === "RTDB.AppendDataToList") {
      return await witDbRef((ref) => ref.push(actionData.data));
    }
  } finally {
    deleteApp(app);
  }
}
