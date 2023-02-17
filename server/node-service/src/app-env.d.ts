declare module "swagger-client" {
  const SwaggerClient: {
    helpers: {
      opId(operation: OpenAPI.Operation, path: string, method: string): string;
    };
    execute: any;
  };
  export default SwaggerClient;
}
