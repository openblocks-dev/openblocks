import SwaggerParser from "@apidevtools/swagger-parser";
import path from "path";
import openApiPlugin from ".";
import { ConfigKeySplit } from "./util";

const demoSwaggerYaml = path.join(__dirname, "./fixture/swagger.yaml");
const ctx = { languages: [] };
describe("openApi plugin", () => {
  it.skip("run swagger 2.0 spec", async () => {
    const spec = await SwaggerParser.bundle(demoSwaggerYaml);
    const actionData = {
      actionName: "addPet",
      [`body${ConfigKeySplit}body`]: {
        id: 0,
        category: {
          id: 0,
          name: "string",
        },
        name: "doggie",
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    };
    const dataSourceConfig = {
      url: "",
      serverURL: "",
      extra: {
        spec: JSON.stringify(spec),
      },
    };
    expect.assertions(2);
    const res = await openApiPlugin.run(actionData, dataSourceConfig, ctx);
    expect(res.id).toBeGreaterThan(0);
    expect(res.name).toBe("doggie");
  });
});
