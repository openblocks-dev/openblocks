import { runFirebasePlugin } from "./run";

const privateKey = process.env["GOOGLE_PRIVATE_KEY"] || "";

test("realtime database", async () => {
  const res = await runFirebasePlugin(
    { actionName: "QueryDatabase", databaseRef: "/hello" },
    {
      databaseUrl: "https://sarike-a3de9-default-rtdb.asia-southeast1.firebasedatabase.app/",
      privateKey,
      firestoreId: "",
    }
  );
  console.info(res);
});
