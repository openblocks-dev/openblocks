import { Spin } from "antd";
import {
  FetchCheckNode,
  FetchInfo,
  fromRecord,
  mergeExtra,
  MultiCompConstructor,
  CompAction,
  CompActionTypes,
} from "openblocks-core";
import styled from "styled-components";
import { codeControl } from "comps/controls/codeControl";
import { setFieldsNoTypeCheck } from "util/objectUtils";

const Wrapper = styled.div`
  &,
  .ant-spin-nested-loading,
  .ant-spin-container {
    width: 100%;
    height: 100%;
  }
`;

const __WITH_IS_LOADING = "__WITH_IS_LOADING";

/**
 * Unified increase isLoading effect
 */
export function withIsLoading<T extends MultiCompConstructor>(VariantComp: T): T {
  // @ts-ignore
  class IS_LOADING_CLASS extends VariantComp {
    readonly isLoading: boolean = false;

    override extraNode() {
      return mergeExtra(super.extraNode(), {
        node: {
          [__WITH_IS_LOADING]: new FetchCheckNode(fromRecord(this.childrenNode())),
        },
        updateNodeFields: (value: any) => {
          const fetchInfo = value[__WITH_IS_LOADING] as FetchInfo;
          return { isLoading: fetchInfo.isFetching };
        },
      });
    }

    override getView() {
      return (
        <Wrapper>
          <Spin spinning={this.isLoading}>{super.getView()}</Spin>
        </Wrapper>
      );
    }
  }

  return IS_LOADING_CLASS;
}

export const __SUPER_NODE_KEY = "__LOADING_SUPER_NODE";

/**
 * only add isLoading method to codeControl, without override getView
 * @param VariantComp
 */
export function withIsLoadingMethod<T extends ReturnType<typeof codeControl>>(VariantComp: T) {
  // @ts-ignore
  class IS_LOADING_CLASS extends VariantComp {
    private loading: boolean = false;

    isLoading() {
      return this.loading;
    }

    override reduce(action: CompAction) {
      if (action.type === CompActionTypes.UPDATE_NODES_V2) {
        const value = action.value;
        const superValue = value[__SUPER_NODE_KEY];
        const fetchInfo = value[__WITH_IS_LOADING] as FetchInfo;
        const comp = super.reduce({
          ...action,
          value: superValue,
        });
        if (fetchInfo.isFetching !== this.loading) {
          return setFieldsNoTypeCheck(comp, {
            loading: fetchInfo.isFetching,
          });
        } else {
          return comp;
        }
      }
      return super.reduce(action);
    }

    override nodeWithoutCache() {
      const superNode = super.nodeWithoutCache();
      return fromRecord({
        [__SUPER_NODE_KEY]: superNode,
        [__WITH_IS_LOADING]: new FetchCheckNode(superNode),
      }) as any;
    }
  }

  return IS_LOADING_CLASS;
}
