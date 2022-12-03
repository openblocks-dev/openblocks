import { trans } from "i18n";
import { CompConstructor } from "openblocks-core";
import { RemoteCompInfo, RemoteCompLoader, RemoteCompSource } from "types/remoteComp";

const baseUrl = "https://unpkg.com";

async function npmLoader(remoteInfo: RemoteCompInfo): Promise<CompConstructor | null> {
  // log.info("load npm plugin:", remoteInfo);
  const { packageName, packageVersion = "latest", compName } = remoteInfo;
  const entry = `${baseUrl}/${packageName}@${packageVersion}/index.js`;
  const module = await import(/* @vite-ignore */ entry);
  const comp = module.default?.[compName];
  if (!comp) {
    throw new Error(trans("npm.compNotFound", { compName }));
  }
  return comp;
}

export const loaders: Record<RemoteCompSource, RemoteCompLoader> = {
  npm: npmLoader,
};
