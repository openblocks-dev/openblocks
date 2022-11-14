import * as echarts from "echarts";
import { EChartsReactProps, EChartsOption, EChartsInstance } from "./types";
import EChartsReactCore from "./core";

/**
 * reference: https://github.com/hustcc/echarts-for-react
 * add exception-catch for setOption
 * if query isn't successfully loaded, chart will fail to load and can't reload
 */
export type { EChartsReactProps, EChartsOption, EChartsInstance };

// export the Component the echarts Object.
export default class EChartsReact extends EChartsReactCore {
  constructor(props: EChartsReactProps) {
    super(props);

    // initialize as echarts package
    this.echarts = echarts;
  }
}
