import axios from "axios";
import { NPM_REGISTRY_URL } from "constants/npmPlugins";
import { RemoteCompSource, RemoteCompInfo, NpmVersionMeta, NpmPackageMeta } from "types/remoteComp";

export function getRemoteCompType(
  source: "npm",
  packageName: string,
  version: string,
  compName: string
) {
  return `remote#${source}#${packageName}@${version}#${compName}`;
}

export function parseCompType(compType: string) {
  const [type, source, packageNameAndVersion, compName] = compType.split("#");
  const isRemote = type === "remote";

  if (!isRemote) {
    return {
      isRemote,
      compName: compType,
    };
  }

  const [packageName, packageVersion] = packageNameAndVersion.split("@");
  return {
    compName,
    isRemote,
    packageName,
    packageVersion,
    source: source as RemoteCompSource,
  } as RemoteCompInfo;
}

export async function getLatestVersion(remoteInfo: RemoteCompInfo): Promise<NpmVersionMeta | null> {
  if (!remoteInfo.isRemote || remoteInfo.source !== "npm") {
    return null;
  }

  const res = await axios.get<NpmPackageMeta>(`${NPM_REGISTRY_URL}/${remoteInfo.packageName}/`);
  if (res.status >= 400) {
    return null;
  }
  const latestVersion = res.data["dist-tags"].latest;
  return res.data.versions?.[latestVersion] || null;
}
