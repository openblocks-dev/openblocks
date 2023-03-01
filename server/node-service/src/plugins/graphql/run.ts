import { badRequest } from "../../common/error";
import { request, Variables, ClientError } from "graphql-request";

export async function runGraphQL(
  endpoint: string,
  query: string,
  variables: Variables,
  headers: Record<string, string>
) {
  try {
    const ret = await request(endpoint, query, variables, headers);
    return ret;
  } catch (e) {
    console.info(e);
    if (e instanceof ClientError) {
      throw badRequest(e.message);
    }
    throw e;
  }
}
