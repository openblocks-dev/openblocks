import getI18nTranslator from "./i18n";
import run, { validateDataSourceConfig } from "./run";

const dataSourceConfig = {
  accessKey: "<AK>",
  secretKey: "<SK>",
  endpointUrl: "",
  region: "<REGION>",
  arn: "",
};

const i18n = getI18nTranslator(["en"]);

describe.skip("s3 plugin", () => {
  test("validate data source config", async () => {
    const a = await validateDataSourceConfig(dataSourceConfig);
    expect(a.success).toBe(true);

    const b = await validateDataSourceConfig({
      ...dataSourceConfig,
      accessKey: "error ak",
    });
    console.info(b.message);
    expect(b.success).toBe(false);
  });

  test("read not existed file", async () => {
    await expect(
      run(
        {
          actionName: "readFile",
          bucket: "openblocks-demo",
          fileName: "not-found.txt",
          encoding: "utf8",
        },
        dataSourceConfig,
        i18n
      )
    ).rejects.toThrow();
  });

  test("list buckets", async () => {
    const buckets = await run(
      {
        actionName: "listBuckets",
      },
      dataSourceConfig,
      i18n
    );
    expect(buckets?.length).toBeGreaterThan(0);
  });

  test("crud file", async () => {
    const txtFileName = `ut-${Date.now()}.txt`;
    const binFileName = `ut-${Date.now()}.txt`;
    const fileData = `This is file ${txtFileName}`;
    const binRawFileData = `This is file ${binFileName}`;
    const binFileData = Buffer.from(binRawFileData).toString("base64");

    // upload txt
    const uploadRes = await run(
      {
        actionName: "uploadData",
        fileName: txtFileName,
        encoding: "utf8",
        contentType: "text/plain",
        data: fileData,
        bucket: "openblocks-demo",
        returnSignedUrl: true,
      },
      dataSourceConfig,
      i18n
    );
    expect((uploadRes as any).signedUrl).not.toBe("");

    // upload bin
    const uploadBinRes = await run(
      {
        actionName: "uploadData",
        fileName: binFileName,
        encoding: "base64",
        contentType: "",
        data: binFileData,
        bucket: "openblocks-demo",
        returnSignedUrl: true,
      },
      dataSourceConfig,
      i18n
    );
    expect((uploadBinRes as any).signedUrl).not.toBe("");

    // list
    const list = await run(
      {
        actionName: "listObjects",
        bucket: "openblocks-demo",
        prefix: txtFileName,
        delimiter: "",
        limit: 10,
        returnSignedUrl: false,
      },
      dataSourceConfig,
      i18n
    );
    expect((list as any).files.length).toBeGreaterThan(0);
    expect((list as any).files?.find((i: any) => i.name === txtFileName)).not.toBeUndefined();
    expect((list as any).files?.find((i: any) => i.name === binFileName)).not.toBeUndefined();

    // read txt
    const readRes = await run(
      {
        actionName: "readFile",
        bucket: "openblocks-demo",
        fileName: txtFileName,
        encoding: "utf8",
      },
      dataSourceConfig,
      i18n
    );
    expect((readRes as any).data).toEqual(fileData);

    // read bin
    const readBinRes = await run(
      {
        actionName: "readFile",
        bucket: "openblocks-demo",
        fileName: binFileName,
        encoding: "base64",
      },
      dataSourceConfig,
      i18n
    );
    expect((readBinRes as any).data).toEqual(binFileData);

    // delete
    const delRes = await run(
      {
        actionName: "deleteFile",
        bucket: "openblocks-demo",
        fileName: txtFileName,
      },
      dataSourceConfig,
      i18n
    );
    expect((delRes as any).success).toBe(true);

    const delBinRes = await run(
      {
        actionName: "deleteFile",
        bucket: "openblocks-demo",
        fileName: binFileName,
      },
      dataSourceConfig,
      i18n
    );
    expect((delBinRes as any).success).toBe(true);
  });
});
