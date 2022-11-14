import { Skeleton } from "antd";
import { simpleMultiComp } from "comps/generators";
import { withExposingConfigs } from "comps/generators/withExposing";
import { loadRemoteComp, RemoteCompLoader, RemoteInfo } from "comps/remoteUiCompRegistry";
import { Comp, CompAction, CompParams, customAction, isCustomAction } from "openblocks-core";
import { useMount } from "react-use";
import styled from "styled-components";

const ViewLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
  padding: 24px;
`;

function ViewLoading() {
  return (
    <ViewLoadingWrapper>
      <Skeleton active />
    </ViewLoadingWrapper>
  );
}
interface RemoteCompReadyAction {
  type: "RemoteCompReady";
  comp: Comp;
}

interface RemoteCompViewProps {
  loadComp: () => void;
}

function RemoteCompView(props: React.PropsWithChildren<RemoteCompViewProps>) {
  const { loadComp } = props;

  useMount(() => {
    loadComp();
  });

  return <ViewLoading />;
}

export function remoteComp(remoteInfo: RemoteInfo, loader: RemoteCompLoader = loadRemoteComp) {
  class RemoteComp extends simpleMultiComp({}) {
    compValue: any;
    constructor(params: CompParams<any>) {
      super(params);
      this.compValue = params.value;
    }

    async load() {
      const RemoteExportedComp = await loader(remoteInfo);
      if (!RemoteExportedComp) {
        return;
      }

      const params: CompParams<any> = {
        dispatch: this.dispatch,
      };

      if (this.compValue) {
        params.value = this.compValue;
      }

      this.dispatch(
        customAction<RemoteCompReadyAction>({
          type: "RemoteCompReady",
          comp: new RemoteExportedComp(params),
        })
      );
    }

    getView() {
      return <RemoteCompView loadComp={() => this.load()} />;
    }

    getPropertyView() {
      return <ViewLoading />;
    }

    reduce(action: CompAction<any>): this {
      if (isCustomAction<RemoteCompReadyAction>(action, "RemoteCompReady")) {
        // use real remote comp instance to replace RemoteCompLoader
        return action.value.comp as this;
      }
      return super.reduce(action);
    }

    autoHeight(): boolean {
      return false;
    }

    toJsonValue() {
      return this.compValue;
    }
  }
  return withExposingConfigs(RemoteComp, []);
}
