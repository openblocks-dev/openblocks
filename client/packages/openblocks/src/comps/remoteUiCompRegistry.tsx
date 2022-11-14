import { ChartCompIcon, imageEditorIcon } from "openblocks-design";
import { trans } from "i18n";
import { CompConstructor } from "openblocks-core";
import { UICompManifest } from "./uiCompRegistry";

interface ICompPackage {
  name: string;
  versions: ICompPackageVersion[];
}

interface ICompPackageVersion {
  version: string;
  entry: string;
  comps: {
    [key: string]: Omit<UICompManifest, "comp">;
  };
}

function packageVersionEntry(packageName: string): string {
  if (process.env.NODE_ENV === "development") {
    return "";
  }
  try {
    return JSON.parse(REACT_APP_IMPORT_MAP).imports[packageName];
  } catch {
    return "";
  }
}

// below is comp package's meta data
// it should be persisted in database and fetched from backend in the future.
export const compPackageRegistry: ICompPackage[] = [
  {
    name: "openblocks-comps",
    versions: [
      {
        version: "1.0.0",
        entry: packageVersionEntry("openblocks-comps"),
        comps: {
          chart: {
            name: trans("uiComp.chartCompName"),
            enName: "Chart",
            description: trans("uiComp.chartCompDesc"),
            categories: ["dataDisplay", "common"],
            icon: ChartCompIcon,
            keywords: trans("uiComp.chartCompKeywords"),
            layoutInfo: {
              w: 11,
              h: 35,
            },
          },
          imageEditor: {
            name: trans("uiComp.imageEditorCompName"),
            enName: "Image Editor",
            description: trans("uiComp.imageEditorCompDesc"),
            categories: ["dataDisplay"],
            icon: imageEditorIcon,
            keywords: trans("uiComp.imageEditorCompKeywords"),
            layoutInfo: {
              w: 15,
              h: 60,
            },
          },
        },
      },
    ],
  },
];

export interface RemoteInfo {
  compName: string;
  packageName: string;
  packageVersion: string;
}

export type RemoteCompLoader = (info: RemoteInfo) => Promise<CompConstructor | null>;

export async function loadRemoteComp(info: RemoteInfo): Promise<CompConstructor | null> {
  const { packageName, packageVersion, compName } = info;
  const pkg = compPackageRegistry.find((i) => i.name === packageName);
  if (!pkg) {
    return null;
  }

  const pkgVersion = pkg.versions.find((i) => i.version === packageVersion);
  if (!pkgVersion) {
    return null;
  }

  const { entry } = pkgVersion;

  let remoteVersion = null;
  if (process.env.NODE_ENV === "development") {
    const remoteModule = await import("openblocks-comps");
    remoteVersion = remoteModule.default;
  }

  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-restricted-properties
    const remoteModule = await System.import(entry);
    remoteVersion = remoteModule.default;
  }
  return (remoteVersion?.[compName] as CompConstructor) || null;
}
