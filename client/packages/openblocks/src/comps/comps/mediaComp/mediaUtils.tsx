import { RefControl } from "comps/controls/refControl";
import { ToInstanceType } from "comps/generators/multi";
import {
  ExposeMethodCompConstructor,
  MethodConfigInfo,
  refMethods,
} from "comps/generators/withMethodExposing";
import { trans } from "i18n";
import { MultiBaseComp } from "openblocks-core";
import ReactPlayer from "react-player";

export const mediaCommonChildren = {
  viewRef: RefControl<ReactPlayer>,
  containerRef: RefControl<HTMLDivElement>,
};

type MediaCompType = ExposeMethodCompConstructor<
  MultiBaseComp<ToInstanceType<typeof mediaCommonChildren>>
>;

export function mediaMethods(): MethodConfigInfo<MediaCompType>[] {
  return [
    ...refMethods<ReactPlayer>([
      {
        name: "seekTo",
        description: trans("media.seekTo"),
        params: [{ name: "amount", type: "number", description: trans("media.seekToAmount") }],
      },
      {
        name: "showPreview",
        description: trans("media.showPreview"),
        params: [],
      },
    ]),
    {
      method: {
        name: "play",
        description: trans("media.playDesc"),
        params: [],
      },
      execute: (comp) => {
        const player = comp.children.viewRef.viewRef?.getInternalPlayer();
        if (player && player["play"]) {
          return (player as HTMLMediaElement).play();
        } else {
          const element = comp.children.containerRef.viewRef
            ?.getElementsByClassName("react-player__preview")
            ?.item(0);
          if (element) {
            (element as HTMLElement).click?.();
          }
        }
      },
    },
    {
      method: {
        name: "pause",
        description: trans("media.pauseDesc"),
        params: [],
      },
      execute: (comp) => {
        const player = comp.children.viewRef.viewRef?.getInternalPlayer();
        if (player && player["pause"]) {
          (player as HTMLMediaElement).pause();
        }
      },
    },
    {
      method: {
        name: "load",
        description: trans("media.loadDesc"),
        params: [],
      },
      execute: (comp) => {
        const player = comp.children.viewRef.viewRef?.getInternalPlayer();
        if (player && player["load"]) {
          (player as HTMLMediaElement).load();
        }
      },
    },
  ];
}
