import { changeChildAction, CompAction } from "openblocks-core";
import { ChartCompChildrenType, ChartTypeOptions, getDataKeys } from "./chartConstants";
import { newSeries } from "./seriesComp";
import {
  CustomModal,
  Dropdown,
  hiddenPropertyView,
  Option,
  RedButton,
  Section,
  sectionNames,
} from "openblocks-sdk";
import { trans } from "i18n/comps";
import { examplesUrl, optionUrl } from "./chartConfigs/chartUrls";

export function chartPropertyView(
  children: ChartCompChildrenType,
  dispatch: (action: CompAction) => void
) {
  const series = children.series.getView();
  const columnOptions = getDataKeys(children.data.getView()).map((key) => ({
    label: key,
    value: key,
  }));

  const uiModePropertyView = (
    <>
      <Section name={trans("chart.data")}>
        {children.data.propertyView({
          label: trans("chart.data"),
        })}
        <Dropdown
          value={children.chartConfig.children.compType.getView()}
          options={ChartTypeOptions}
          label={trans("chart.chartType")}
          onChange={(value) => {
            // keep the previous value
            if (children.chartConfig.children.comp.children.hasOwnProperty("showLabel")) {
              children.chartConfig.dispatchChangeValueAction({
                compType: value as any,
                comp: {
                  showLabel: (
                    children.chartConfig.children.comp.children as any
                  ).showLabel.toJsonValue(),
                },
              });
            } else {
              children.chartConfig.dispatchChangeValueAction({
                compType: value,
              });
            }
          }}
        />
        <Dropdown
          value={children.xAxisKey.getView()}
          options={columnOptions}
          label={trans("chart.xAxis")}
          onChange={(value) => {
            dispatch(changeChildAction("xAxisKey", value));
          }}
        />
        <Option
          items={series}
          title={trans("chart.chartSeries")}
          itemTitle={(s) => s.getView().seriesName}
          popoverTitle={(s) => s.getView().columnName}
          content={(s, index) => (
            <>
              {s.getPropertyViewWithData(columnOptions)}
              {
                <RedButton
                  onClick={() => {
                    CustomModal.confirm({
                      title: trans("chart.delete"),
                      content: trans("chart.confirmDelete") + `${s.getView().seriesName}?`,
                      onConfirm: () =>
                        children.series.dispatch(children.series.deleteAction(index)),
                      confirmBtnType: "delete",
                      okText: trans("chart.delete"),
                    });
                  }}
                >
                  {trans("chart.delete")}
                </RedButton>
              }
            </>
          )}
          onAdd={() => {
            if (columnOptions.length <= 0) {
              return;
            }
            children.series.dispatch(
              children.series.pushAction(
                newSeries(trans("chart.customSeries"), columnOptions[0].value)
              )
            );
          }}
          onMove={(fromIndex, toIndex) => {
            const action = children.series.arrayMoveAction(fromIndex, toIndex);
            children.series.dispatch(action);
          }}
          hide={(s) => s.getView().hide}
          onHide={(s, hide) => s.children.hide.dispatchChangeValueAction(hide)}
          dataIndex={(s) => s.getView().dataIndex}
        />
      </Section>
      <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>
      <Section name={sectionNames.layout}>
        {children.title.propertyView({ label: trans("chart.title") })}
        {children.chartConfig.children.compType.getView() !== "pie" && (
          <>
            {children.xAxisDirection.propertyView({
              label: trans("chart.xAxisDirection"),
              radioButton: true,
            })}
            {children.xConfig.getPropertyView()}
            {children.yConfig.getPropertyView()}
          </>
        )}
        {children.legendConfig.getPropertyView()}
        {hiddenPropertyView(children)}
      </Section>
      <Section name={sectionNames.style}>{children.chartConfig.getPropertyView()}</Section>
    </>
  );

  const jsonModePropertyView = (
    <>
      <Section name={trans("chart.config")}>
        {children.echartsOption.propertyView({
          label: trans("chart.echartsOptionLabel"),
          styleName: "higher",
          tooltip: (
            <div>
              <a href={optionUrl} target="_blank" rel="noopener noreferrer">
                {trans("chart.echartsOptionTooltip")}
              </a>
              <br />
              <a href={examplesUrl} target="_blank" rel="noopener noreferrer">
                {trans("chart.echartsOptionExamples")}
              </a>
            </div>
          ),
        })}
      </Section>
      <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
    </>
  );

  return (
    <>
      <Section name={trans("chart.mode")}>
        {children.mode.propertyView({
          label: "",
          radioButton: true,
        })}
      </Section>
      {children.mode.getView() === "ui" ? uiModePropertyView : jsonModePropertyView}
    </>
  );
}
