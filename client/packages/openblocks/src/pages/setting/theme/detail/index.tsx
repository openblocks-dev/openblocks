import { InputRef, message } from "antd";
import {
  CommonSettingResponseData,
  SetCommonSettingPayload,
  ThemeDetail,
  ThemeType,
} from "api/commonSettingApi";
import history from "util/history";
import { BASE_URL, THEME_SETTING } from "constants/routesURL";
import ColorConfig, { configChangeParams } from "./colorConfig";
import React from "react";
import { connect } from "react-redux";
import { fetchCommonSettings, setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import { AppState } from "redux/reducers";
import { DETAIL_TYPE } from "../themeConstant";
import { ArrowIcon, CustomModal } from "openblocks-design";
import { ResetIcon } from "openblocks-design";
import {
  DetailContainer,
  DetailContent,
  DetailHeader,
  DetailTitle,
  DividerStyled,
  InlineFlexAlignCenter,
  ResetButton,
  SaveButton,
} from "../styledComponents";
import PreviewApp from "./previewApp";
import { trans } from "i18n";
import { Prompt } from "react-router";
import { HeaderBack } from "pages/setting/permission/styledComponents";

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

  constructor(props: ThemeDetailPageProps) {
    super(props);
    const { name, id, theme, type } = props.location.state || {};
    if (!name || !id || !theme || !type) {
      history.replace(BASE_URL);
      window.location.reload();
    }

    this.themeDefault = theme;
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
        [params.colorKey]: params.color || params.radius,
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
        <DetailContainer>
          <DetailHeader>
            <HeaderBack>
              <span onClick={() => this.goList()}>{trans("settings.theme")}</span>
              <ArrowIcon />
              <span>{this.state.name}</span>
            </HeaderBack>
            <InlineFlexAlignCenter>
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
            </InlineFlexAlignCenter>
          </DetailHeader>
          <DetailContent>
            <div>
              <DetailTitle>{trans("theme.mainColor")}</DetailTitle>
              <ColorConfig
                colorKey="primary"
                name={trans("themeDetail.primary")}
                desc={trans("themeDetail.primaryDesc")}
                color={this.state.theme.primary}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <ColorConfig
                colorKey="canvas"
                name={trans("themeDetail.canvas")}
                desc={trans("themeDetail.canvasDesc")}
                color={this.state.theme.canvas}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <ColorConfig
                colorKey="primarySurface"
                name={trans("themeDetail.primarySurface")}
                desc={trans("themeDetail.primarySurfaceDesc")}
                color={this.state.theme.primarySurface}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <DividerStyled />
              <DetailTitle>{trans("theme.text")}</DetailTitle>
              <ColorConfig
                colorKey="textLight"
                name={trans("themeDetail.textLight")}
                desc={trans("themeDetail.textLightDesc")}
                color={this.state.theme.textLight}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <ColorConfig
                colorKey="textDark"
                name={trans("themeDetail.textDark")}
                desc={trans("themeDetail.textDarkDesc")}
                color={this.state.theme.textDark}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <DividerStyled />
              <DetailTitle>{trans("themeDetail.borderRadius")}</DetailTitle>
              <ColorConfig
                colorKey="borderRadius"
                name={trans("themeDetail.borderRadius")}
                desc={trans("themeDetail.borderRadiusDesc")}
                radius={this.state.theme.borderRadius}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
            </div>
            <PreviewApp theme={this.state.theme} />
          </DetailContent>
        </DetailContainer>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  themeList: state.ui.commonSettings?.themeList || [],
  orgId: state.ui.users.currentUser.currentOrgId,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCommonSettings: (params: SetCommonSettingPayload) => dispatch(setCommonSettings(params)),
  fetchCommonSettings: (orgId: string, onSuccess?: (data: CommonSettingResponseData) => void) =>
    dispatch(fetchCommonSettings({ orgId, onSuccess })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeDetailPage);
