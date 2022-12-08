import { fromValue, Node } from "openblocks-core";
import _ from "lodash";
import moment from "moment";
import { useCurrentUser } from "util/currentUser";

/**
 * This file puts the global data used by eval
 */

//  export type GlobalExposingData = {
//    currentUser: any;
//  };
//  export type GlobalExposingData = [{
//   name: string,
//   value: unknown,
// }];
export type GlobalExposingData = Array<{
  name: string;
  value: any;
  hideInLeftPanel?: boolean;
}>;

//  type GlobalExposingNodes = { [K in keyof GlobalExposingData]: Node<GlobalExposingData[K]> };
type GlobalExposingNodes = Record<string, Node<any>>;

export type GlobalExposingType = {
  data: GlobalExposingData;
  nodes: GlobalExposingNodes;
};
export type GlobalExposingWithName = {
  globalExposing: GlobalExposingType;
};

export function withGlobalExposingData<T extends GlobalExposingWithName>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: Omit<T, keyof GlobalExposingWithName>) => {
    const currentUser = useCurrentUser();
    const newProps = {
      ...props,
      globalExposing: {
        data: [
          { name: "currentUser", value: currentUser },
          { name: "_", value: _, hideInLeftPanel: true },
          { name: "moment", value: moment, hideInLeftPanel: true },
        ],
        nodes: {
          currentUser: fromValue(currentUser),
          _: fromValue(_),
          moment: fromValue(moment),
        } as GlobalExposingNodes,
      },
    } as T;
    return <WrappedComponent {...newProps} />;
  };
}
