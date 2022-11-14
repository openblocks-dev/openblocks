import type { ECharts } from "echarts";
import { PureComponent } from "react";
import isEqual from "fast-deep-equal";
import { EChartsReactProps, EChartsInstance } from "./types";
import _ from "lodash";
import log from "loglevel";

function isString(v: any): boolean {
  return typeof v === "string";
}

function isFunction(v: any): boolean {
  return typeof v === "function";
}

/**
 * core component for echarts binding
 */
export default class EChartsReactCore extends PureComponent<EChartsReactProps> {
  /**
   * echarts render container
   */
  public ele: HTMLElement | null;

  /**
   * echarts library entry
   */
  protected echarts: any;

  constructor(props: EChartsReactProps) {
    super(props);

    this.echarts = props.echarts;
    this.ele = null;
  }

  componentDidMount() {
    this.renderNewEcharts();
  }

  // update
  componentDidUpdate(prevProps: EChartsReactProps) {
    /**
     * if shouldSetOption return false, then return, not update echarts options
     * default is true
     */
    const { shouldSetOption } = this.props;
    if (shouldSetOption && isFunction(shouldSetOption) && !shouldSetOption(prevProps, this.props)) {
      return;
    }

    /**
     * the props below need to dispose before re-render
     * 1. when switching theme
     * 2. when modifying opts
     * 3. when modifying onEvents, thus the binded event issue #151 can be cancel
     */
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.renderNewEcharts(); // re-render
      return;
    }

    // when these props are not isEqual, update echarts
    const pickKeys = ["option", "notMerge", "lazyUpdate", "showLoading", "loadingOption"];
    if (!isEqual(_.pick(this.props, pickKeys), _.pick(prevProps, pickKeys))) {
      this.updateEChartsOption();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  /**
   * return the echart object
   * 1. if exist, return the existed instance
   * 2. or new one instance
   */
  public getEchartsInstance(): ECharts {
    return (
      this.echarts.getInstanceByDom(this.ele) ||
      this.echarts.init(this.ele, this.props.theme, this.props.opts)
    );
  }

  /**
   * dispose echarts and clear size-sensor
   */
  private dispose() {
    if (this.ele) {
      // dispose echarts instance
      this.echarts.dispose(this.ele);
    }
  }

  /**
   * render a new echarts instance
   */
  private renderNewEcharts() {
    const { onEvents, onChartReady } = this.props;

    // 1. new echarts instance
    const echartsInstance = this.updateEChartsOption();

    // 2. bind events
    this.bindEvents(echartsInstance, onEvents || {});

    // 3. on chart ready
    if (onChartReady && isFunction(onChartReady)) onChartReady(echartsInstance);
  }

  // bind the events
  private bindEvents(instance: any, events: EChartsReactProps["onEvents"]) {
    function _bindEvent(eventName: string, func: Function) {
      // ignore the event config which not satisfy
      if (isString(eventName) && isFunction(func)) {
        // binding event
        instance.on(eventName, (param: any) => {
          func(param, instance);
        });
      }
    }

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  }

  /**
   * render the echarts
   */
  private updateEChartsOption(): EChartsInstance {
    const {
      option,
      notMerge = false,
      lazyUpdate = false,
      showLoading,
      loadingOption = null,
    } = this.props;
    // 1. get or initial the echarts object
    const echartInstance = this.getEchartsInstance();
    // 2. set the echarts option
    try {
      // set option catch exception
      echartInstance.setOption(option, {
        notMerge: notMerge,
        lazyUpdate: lazyUpdate,
        silent: true,
      });
    } catch (e) {
      // FIXME: if don't dispose, setOption again will call cause bugs
      // https://github.com/apache/echarts/issues/16608
      this.dispose();
      log.warn("invalid echarts option:", e);
    }
    // 3. set loading mask
    if (showLoading) echartInstance.showLoading(loadingOption);
    else echartInstance.hideLoading();

    return echartInstance;
  }

  render(): JSX.Element {
    const { style, className = "" } = this.props;
    // default height = 300
    const newStyle = { height: 300, ...style };

    return (
      <div
        ref={(e: HTMLElement | null) => {
          this.ele = e;
        }}
        style={newStyle}
        className={`echarts-for-react ${className}`}
      />
    );
  }
}
