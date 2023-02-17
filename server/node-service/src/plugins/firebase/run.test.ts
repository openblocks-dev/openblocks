import { runFirebasePlugin } from "./run";

const privateKey = process.env["GOOGLE_PRIVATE_KEY"] || "";

test.skip("realtime database", async () => {
  const res = await runFirebasePlugin(
    { actionName: "RTDB.QueryDatabase", databaseRef: "/hello" },
    {
      databaseUrl: "https://sarike-a3de9-default-rtdb.asia-southeast1.firebasedatabase.app/",
      privateKey,
      firestoreId: "",
    }
  );
  console.info(res);
});
