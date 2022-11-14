import { JSONObject } from "util/jsonTypes";
import { hookToStateComp } from "comps/generators/hookToComp";
import { useEffect, useState } from "react";
import history from "util/history";

interface UrlParams {
  href: string;
  hash: Record<string, string>;
  query: Record<string, string>;
}

function parseUrlParams(): UrlParams {
  const href = window.location.href;
  const url = new URL(href);
  const hashSearch = new URLSearchParams(url.hash.slice(1));
  return {
    href,
    hash: Object.fromEntries(hashSearch.entries()),
    query: Object.fromEntries(url.searchParams.entries()),
  };
}

function useUrlParams(): JSONObject {
  const [params, setParams] = useState({});

  useEffect(() => {
    setParams(parseUrlParams());

    const handleUrlChange = () => {
      setParams(parseUrlParams());
    };

    const unListen = history.listen(handleUrlChange);

    return () => {
      unListen();
    };
  }, []);

  return params as unknown as JSONObject;
}

const UrlParamsHookComp = hookToStateComp(useUrlParams);
export default UrlParamsHookComp;
