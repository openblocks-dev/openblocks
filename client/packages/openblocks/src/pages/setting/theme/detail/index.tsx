import { InputRef, message } from "antd";
import {
  CommonSettingResponseData,
  SetCommonSettingPayload,
  ThemeDetail,
  ThemeType,
} from "api/commonSettingApi";
import history from "util/history";
import { CodeEditor } from "base/codeEditor";
import { BASE_URL, THEME_SETTING } from "constants/routesURL";
import ColorPicker, { configChangeParams } from "../../../../components/ColorPicker";
import React from "react";
import { connect } from "react-redux";
import { fetchCommonSettings, setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import { AppState } from "redux/reducers";
import { DETAIL_TYPE } from "../themeConstant";
import { ArrowIcon, CustomModal, ResetIcon } from "openblocks-design";
import {
  DetailContainer,
  DetailContent,
  DetailTitle,
  ResetButton,
  SaveButton,
  ChartDesc,
  ChartInput,
  Footer,
  Header,
} from "../styledComponents";
import PreviewApp from "../../../../components/PreviewApp";
import { trans } from "i18n";
import { Prompt } from "react-router";
import { HeaderBack } from "pages/setting/permission/styledComponents";
import dsl from "./previewDsl";
import chartDsl from "./chartPreviewDsl";

type LocationProp = {
  theme: ThemeDetail;
  name: string;
  id: string;
  type: DETAIL_TYPE;
};

type ThemeDetailPageProps = {
  setCommonSettings: (params: SetCommonSettingPayload) => void;
  fetchCommonSettings: (
    orgId: string,
    onSuccess?: (data: CommonSettingResponseData) => void
  ) => void;
  themeList?: ThemeType[];
  orgId: string;
  location: Location & { state: LocationProp };
};

type ThemeDetailPageState = {
  name: string;
  theme: ThemeDetail;
  canLeave: boolean;
};

class ThemeDetailPage extends React.Component<ThemeDetailPageProps, ThemeDetailPageState> {
  themeDefault: ThemeDetail;
  readonly id: string;
  readonly type: string;
  readonly inputRef: React.RefObject<InputRef>;
  footerRef = React.createRef<HTMLDivElement>();

  constructor(props: ThemeDetailPageProps) {
    super(props);
    const { name, id, theme, type } = props.location.state || {};
    if (!name || !id || !theme || !type) {
      history.replace(BASE_URL);
      window.location.reload();
    }

    if (theme.chart) {
      this.themeDefault = theme;
    } else {
      this.themeDefault = {
        ...theme,
        chart: undefined,
      };
    }

    this.id = id;
    this.type = type;
    this.state = {
      theme,
      name,
      canLeave: false,
    };
    this.inputRef = React.createRef();
  }

  handleReset() {
    this.setState({ theme: this.themeDefault });
  }

  handleSave() {
    this.props.fetchCommonSettings(this.props.orgId, ({ themeList }) => {
      let list = [];
      const currentTheme = {
        name: this.state.name,
        id: this.id,
        updateTime: new Date().getTime(),
        theme: this.state.theme,
      };
      list = themeList!.map((theme) => {
        if (theme.id === this.id) {
          return currentTheme;
        } else {
          return theme;
        }
      });

      this.props.setCommonSettings({
        orgId: this.props.orgId,
        data: { key: "themeList", value: list },
        onSuccess: () => {
          message.success(trans("theme.saveSuccessMsg"));
          this.themeDefault = this.state.theme;
        },
      });
    });
  }

  configChange(params: configChangeParams) {
    this.setState({
      theme: {
        ...this.state.theme,
        [params.colorKey]: params.color || params.radius || params.chart,
      },
    });
  }

  isThemeNotChange() {
    return (
      JSON.stringify({ ...this.state.theme }) ===
      JSON.stringify({ ...this.state.theme, ...this.themeDefault })
    );
  }

  goList = () => {
    history.push(THEME_SETTING);
  };

  render() {
    return (
      <>
        <Prompt
          message={(location) => {
            if (!this.state.canLeave && this.isThemeNotChange()) {
              this.setState({
                canLeave: true,
              });
            }
            if (this.state.canLeave) {
              return true;
            }
            CustomModal.confirm({
              title: trans("theme.leaveTipTitle"),
              content: trans("theme.leaveTipContent"),
              okText: trans("theme.leaveTipOkText"),
              onConfirm: () => {
                this.setState(
                  {
                    canLeave: true,
                  },
                  () => history.push(location.pathname)
                );
              },
            });
            return false;
          }}
          when={!this.isThemeNotChange()}
        ></Prompt>
        <DetailContainer
          onScroll={(e) => {
            if (
              e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
              e.currentTarget.scrollHeight - 2
            ) {
              // scroll to the bottom
              this.footerRef.current && this.footerRef.current.classList.remove("no-bottom");
            } else {
              this.footerRef.current && this.footerRef.current.classList.add("no-bottom");
            }
          }}
        >
          <Header>
            <HeaderBack>
              <span onClick={() => this.goList()}>{trans("settings.theme")}</span>
              <ArrowIcon />
              <span>{this.state.name}</span>
            </HeaderBack>
          </Header>
          <DetailContent>
            <div className="common">
              <div>
                <DetailTitle>{trans("theme.mainColor")}</DetailTitle>
                <ColorPicker
                  colorKey="primary"
                  name={trans("themeDetail.primary")}
                  desc={trans("themeDetail.primaryDesc")}
                  color={this.state.theme.primary}
                  configChange={(params) => this.configChange(params)}
                />
              </div>
              <ColorPicker
                colorKey="canvas"
                name={trans("themeDetail.canvas")}
                desc={trans("themeDetail.canvasDesc")}
                color={this.state.theme.canvas}
                configChange={(params) => this.configChange(params)}
              />
              <ColorPicker
                colorKey="primarySurface"
                name={trans("themeDetail.primarySurface")}
                desc={trans("themeDetail.primarySurfaceDesc")}
                color={this.state.theme.primarySurface}
                configChange={(params) => this.configChange(params)}
              />
              <div>
                <DetailTitle>{trans("theme.text")}</DetailTitle>
                <ColorPicker
                  colorKey="textLight"
                  name={trans("themeDetail.textLight")}
                  desc={trans("themeDetail.textLightDesc")}
                  color={this.state.theme.textLight}
                  configChange={(params) => this.configChange(params)}
                />
              </div>
              <ColorPicker
                colorKey="textDark"
                name={trans("themeDetail.textDark")}
                desc={trans("themeDetail.textDarkDesc")}
                color={this.state.theme.textDark}
                configChange={(params) => this.configChange(params)}
              />
              <div>
                <DetailTitle>{trans("themeDetail.borderRadius")}</DetailTitle>
                <ColorPicker
                  colorKey="borderRadius"
                  name={trans("themeDetail.borderRadius")}
                  desc={trans("themeDetail.borderRadiusDesc")}
                  radius={this.state.theme.borderRadius}
                  configChange={(params) => this.configChange(params)}
                />
              </div>
            </div>
            <PreviewApp style={{marginTop: '3px'}} theme={this.state.theme} dsl={dsl} />
            <div className="chart">
              <DetailTitle>{trans("themeDetail.chart")}</DetailTitle>
              <ChartDesc>
                {trans("themeDetail.chartDesc")}
                <a target="_blank" href="https://echarts.apache.org/en/theme-builder.html">
                  {" "}
                  {trans("themeDetail.echartsJson")}
                </a>
              </ChartDesc>
              <ChartInput>
              <div className="code-editor">
                <CodeEditor
                  value={this.state.theme.chart || ""}
                  onChange={(value) => this.configChange({
                    colorKey: "chart",
                    chart: value.doc.toString() ? value.doc.toString() : undefined,
                  })}
                  styleName="higher"
                  codeType="Function"
                  showLineNum
                  bordered
                />
                </div>
              </ChartInput>
            </div>
            <PreviewApp
              style={{ height: "346px", margin: "20px 0 8px 0" }}
              theme={this.state.theme}
              dsl={chartDsl}
            />
          </DetailContent>
          <Footer ref={this.footerRef} className="no-bottom">
            <ResetButton
              icon={<ResetIcon />}
              disabled={this.isThemeNotChange()}
              onClick={() => this.handleReset()}
            >
              {trans("reset")}
            </ResetButton>
            <SaveButton
              type="primary"
              disabled={this.isThemeNotChange() || !this.state.name}
              onClick={() => this.handleSave()}
            >
              {trans("theme.saveBtn")}
            </SaveButton>
          </Footer>
        </DetailContainer>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  themeList: state.ui.commonSettings?.settings?.themeList || [],
  orgId: state.ui.users.user.currentOrgId,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCommonSettings: (params: SetCommonSettingPayload) => dispatch(setCommonSettings(params)),
  fetchCommonSettings: (orgId: string, onSuccess?: (data: CommonSettingResponseData) => void) =>
    dispatch(fetchCommonSettings({ orgId, onSuccess })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeDetailPage);
