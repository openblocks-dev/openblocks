import nodeFetch, { RequestInit, RequestInfo } from "node-fetch";
import proxyAgent from "proxy-agent";

export function fetch(url: RequestInfo, init?: RequestInit) {
  return nodeFetch(url, { agent: proxyAgent(), ...init });
}
