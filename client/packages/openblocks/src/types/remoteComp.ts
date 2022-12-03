import { UICompManifest } from "comps/uiCompRegistry";
import { CompConstructor } from "openblocks-core";

export type RemoteCompSource = "npm";
export type OpenblocksCompMeta = Omit<UICompManifest, "comp">;

export interface OpenblocksMeta {
  entry: string;
  description: string;
  comps: Record<string, OpenblocksCompMeta>;
}

export interface NpmVersionMeta {
  name: string;
  version: string;
  openblocks: OpenblocksMeta;
}

export interface NpmPackageMeta {
  name: string;
  versions: Record<string, NpmVersionMeta>;
  "dist-tags": {
    latest: string;
  };
}

export interface RemoteCompInfo {
  source: RemoteCompSource;
  compName: string;
  isRemote: true;
  packageName: string;
  packageVersion?: string;
}

export type RemoteCompLoader<T = RemoteCompInfo> = (info: T) => Promise<CompConstructor | null>;
