import path from "path";
import SwaggerClient from "swagger-client";
import SwaggerParser from "@apidevtools/swagger-parser";
import { parseOpenApi } from "./parse";

const demoSwaggerYaml = path.join(__dirname, "./fixture/swagger.yaml");
const demoOpenApiYaml = path.join(__dirname, "./fixture/openapi.yaml");

describe("swagger parse", () => {
  it("parse yaml success", async () => {
    const doc = await SwaggerParser.bundle(demoSwaggerYaml);
    const { actions } = await parseOpenApi(doc);
    expect(actions.length).toBeGreaterThan(0);
  });
});
