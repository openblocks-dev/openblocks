import { InputRef, message, Typography } from "antd";
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
import { CustomModal, PackUpIcon } from "openblocks-design";
import { ResetIcon } from "openblocks-design";
import { EditIcon } from "openblocks-design";
import {
  BackBtn,
  DetailContainer,
  DetailContent,
  DetailHead,
  DetailHeader,
  DetailTitle,
  DividerStyled,
  InlineFlexAlignCenter,
  NameDiv,
  ResetButton,
  SaveButton,
} from "../styledComponents";
import PreviewApp from "./previewApp";
import { trans } from "i18n";
import { Prompt } from "react-router";

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
  nameDefault: string;
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
    this.nameDefault = name;
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
    this.setState({ name: this.nameDefault });
  }

  handleSave() {
    this.props.fetchCommonSettings(this.props.orgId, ({ themeList }) => {
      // check duplicate names
      const isExist = themeList?.find((theme) => theme.name === this.state.name);
      if (isExist && this.state.name !== this.nameDefault) {
        message.error(trans("theme.checkDuplicateNames"));
        return;
      }
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
          this.nameDefault = this.state.name;
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
      JSON.stringify({ ...this.state.theme, name: this.state.name }) ===
      JSON.stringify({ ...this.state.theme, ...this.themeDefault, name: this.nameDefault })
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
            <BackBtn onClick={() => this.goList()}>
              <PackUpIcon />
              {trans("theme.goList")}
            </BackBtn>
          </DetailHeader>
          <DetailHead>
            <NameDiv>
              <Typography.Text
                editable={{
                  icon: <EditIcon />,
                  enterIcon: null,
                  tooltip: false,
                  maxLength: 25,
                  onChange: (value: string) => this.setState({ name: value }),
                }}
              >
                {this.state.name}
              </Typography.Text>
            </NameDiv>
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
          </DetailHead>
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
                name={trans("theme.textColor")}
                colorKey="textDark"
                desc={trans("theme.textDesc")}
                color={this.state.theme.textDark}
                configChange={(params) => this.configChange(params)}
              ></ColorConfig>
              <ColorConfig
                colorKey="textLight"
                color={this.state.theme.textLight}
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
