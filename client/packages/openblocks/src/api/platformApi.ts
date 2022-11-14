import { AxiosPromise } from "axios";
import Api from "./api";

export class PlatformApi extends Api {
  static url = "v1/query";

  static version(): AxiosPromise<string> {
    return Api.get("/VERSION", { _t: Date.now() }, { baseURL: "/" });
  }
}
