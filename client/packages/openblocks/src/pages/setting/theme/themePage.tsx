import React from "react";
import { connect } from "react-redux";
import { AppState } from "redux/reducers";
import { fetchCommonSettings, setCommonSettings } from "redux/reduxActions/commonSettingsActions";
import {
  CommonSettingResponseData,
  SetCommonSettingPayload,
  ThemeType,
} from "api/commonSettingApi";
import { message } from "antd";
import ThemeList from "./themeList";
import { DETAIL_TYPE, MENU_TYPE } from "./themeConstant";
import CreateModal from "./createModal";
import history from "util/history";
import { THEME_DETAIL } from "constants/routesURL";
import { currentOrgAdmin } from "util/permissionUtils";
import { AddIcon } from "openblocks-design";
import { CreateButton, ThemeContent } from "./styledComponents";
import { genQueryId } from "comps/utils/idGenerator";
import { trans } from "i18n";
import { Level1SettingPageTitleWithBtn } from "../styled";

type ThemeProps = {
  setCommonSettings: (params: SetCommonSettingPayload) => void;
  fetchCommonSettings: (
    orgId: string,
    onSuccess?: (data: CommonSettingResponseData) => void
  ) => void;
  defaultTheme?: string | null;
  themeList?: ThemeType[] | null;
  orgId: string;
  isAdmin: boolean;
};

type ThemeState = {
  modalVisible: boolean;
};

class ThemePage extends React.Component<ThemeProps, ThemeState> {
  constructor(props: ThemeProps) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount() {
    if (this.props.orgId) {
      this.props.fetchCommonSettings(this.props.orgId);
    }
  }

  componentDidUpdate(prevProps: ThemeProps, prevState: ThemeState) {
    if (prevProps.orgId !== this.props.orgId) {
      this.props.fetchCommonSettings(this.props.orgId);
    }
  }

  GoDetail(params: ThemeType, themeList: ThemeType[], type: string) {
    this.props.setCommonSettings({
      orgId: this.props.orgId,
      data: {
        key: "themeList",
        value: themeList,
      },
    });
    history.push({
      pathname: THEME_DETAIL,
      state: { ...params, type },
    });
  }

  createTheme(params: ThemeType) {
    // check duplicate names
    if (this.props.themeList?.find((theme) => theme.name === params.name)) {
      message.error(trans("theme.checkDuplicateNames"));
      return;
    }
    this.setState({
      modalVisible: false,
    });
    this.props.fetchCommonSettings(this.props.orgId, ({ themeList }) => {
      const list = [...(themeList || []), params];
      this.GoDetail(params, list, DETAIL_TYPE.CREATE);
    });
  }

  copyTheme(themeId: string) {
    this.props.fetchCommonSettings(this.props.orgId, ({ themeList }) => {
      const copyTheme = themeList!.find((theme) => theme.id === themeId);
      const copyName = copyTheme!.name + trans("theme.copySuffix");
      let name = copyName;
      let maxCopyId = 0;
      let exist = false;
      themeList?.forEach((theme) => {
        if (theme.name.includes(copyName)) {
          exist = true;
          const num = theme.name.split(copyName)[1];
          if (Number(num) && Number(num) > maxCopyId) {
            maxCopyId = Number(num);
          }
        }
      });
      if (exist) {
        name += maxCopyId + 1;
      }
      const params = {
        theme: copyTheme!.theme,
        id: genQueryId(),
        updateTime: new Date().getTime(),
        name,
      };
      const list = [...(themeList || []), params];
      this.GoDetail(params, list, DETAIL_TYPE.COPY);
    });
  }

  setCommonSettings(key: string, value: null | string | ThemeType[], tips?: string) {
    this.props.setCommonSettings({
      orgId: this.props.orgId,
      data: {
        key,
        value,
      },
      onSuccess: () => {
        if (tips) {
          message.success(tips);
        }
        this.props.fetchCommonSettings(this.props.orgId);
      },
    });
  }

  handleClickMenu(info: { themeId: string; key: string; name?: string }) {
    switch (info.key) {
      case MENU_TYPE.SET_DEFAULT:
        this.setCommonSettings("defaultTheme", info.themeId, trans("theme.setSuccessMsg"));
        break;
      case MENU_TYPE.CANCEL_DEFAULT:
        this.setCommonSettings("defaultTheme", null, trans("theme.cancelSuccessMsg"));
        break;
      case MENU_TYPE.DELETE:
        this.setCommonSettings(
          "themeList",
          this.props.themeList?.filter((theme) => theme.id !== info.themeId) || [],
          trans("theme.deleteSuccessMsg")
        );
        if (info.themeId === this.props.defaultTheme) {
          this.setCommonSettings("defaultTheme", null);
        }
        break;
      case MENU_TYPE.COPY:
        this.copyTheme(info.themeId);
        break;
      case MENU_TYPE.EDIT:
        history.push({
          pathname: THEME_DETAIL,
          state: {
            ...this.props.themeList?.find((theme) => theme.id === info.themeId),
            type: DETAIL_TYPE.EDIT,
          },
        });
        break;
      case MENU_TYPE.RENAME:
        this.setCommonSettings(
          "themeList",
          this.props.themeList?.map((item) => {
            if (item.id === info.themeId && info.name) {
              return {
                ...item,
                name: info.name,
              };
            } else {
              return item;
            }
          }) || [],
          trans("theme.setSuccessMsg")
        );
    }
  }

  render() {
    const { defaultTheme, isAdmin, themeList } = this.props;

    return (
      <ThemeContent>
        <Level1SettingPageTitleWithBtn>
          <span>{trans("theme.title")}</span>
          <CreateButton
            type="primary"
            disabled={!isAdmin}
            icon={<AddIcon />}
            onClick={() =>
              this.setState({
                modalVisible: true,
              })
            }
          >
            {trans("theme.createTheme")}
          </CreateButton>
        </Level1SettingPageTitleWithBtn>
        <ThemeList
          themeList={themeList}
          defaultTheme={defaultTheme}
          isAdmin={isAdmin}
          clickMenu={(params) => this.handleClickMenu(params)}
          createTheme={() =>
            this.setState({
              modalVisible: true,
            })
          }
        />
        <CreateModal
          themeList={themeList}
          modalVisible={this.state.modalVisible}
          closeModal={() =>
            this.setState({
              modalVisible: false,
            })
          }
          createTheme={(params) => this.createTheme(params)}
        />
      </ThemeContent>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { currentOrgId: orgId } = state.ui.users.user;
  const isAdmin = currentOrgAdmin(state.ui.users.user);
  return {
    themeList: state.ui.commonSettings.settings.themeList,
    defaultTheme: state.ui.commonSettings.settings.defaultTheme,
    orgId,
    isAdmin: isAdmin,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchCommonSettings: (orgId: string, onSuccess?: (data: CommonSettingResponseData) => void) =>
    dispatch(fetchCommonSettings({ orgId, onSuccess })),
  setCommonSettings: (params: SetCommonSettingPayload) => dispatch(setCommonSettings(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemePage);
