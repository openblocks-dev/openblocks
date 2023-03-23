import { ThemeType } from "api/commonSettingApi";
import { EditorContext } from "comps/editorState";
import { simpleMultiComp, stateComp, withViewFn } from "comps/generators";
import { withSimpleExposing } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { getGlobalSettings } from "comps/utils/globalSettings";
import { getCurrentTheme } from "comps/utils/themeUtil";
import { trans } from "i18n";
import { useContext, useEffect, useMemo } from "react";
import { getThemeList } from "redux/selectors/commonSettingSelectors";
import { useSelector } from "redux/store/store";
import { setLocalThemeId } from "util/localStorageUtil";

type ExposingTheme = {
  id: string;
  name: string;
};

type ExposingData = ExposingTheme & {
  allThemes: ExposingTheme[];
};

function exposingTheme(theme?: ThemeType): ExposingTheme {
  return {
    id: theme?.id ?? "",
    name: theme?.name ?? "",
  };
}

const INIT_DATA: ExposingData = {
  ...exposingTheme(),
  allThemes: [],
};

let ThemeTempComp = withViewFn(
  simpleMultiComp({
    localThemeId: stateComp<string | null>(null),
    stateValue: stateComp<ExposingData>(INIT_DATA),
  }),
  (comp) => {
    const commonThemes = useSelector(getThemeList);
    const globalThemes = getGlobalSettings().orgCommonSettings?.themeList;
    const themeList = useMemo(
      () => commonThemes || globalThemes || [],
      [commonThemes, globalThemes]
    );
    const editorState = useContext(EditorContext);
    const appThemeId = editorState?.getAppSettings().themeId;
    const currentTheme = getCurrentTheme(themeList, appThemeId);
    useEffect(() => {
      comp.children.stateValue.dispatchChangeValueAction({
        ...exposingTheme(currentTheme),
        allThemes: themeList.map((t) => exposingTheme(t)),
      });
    }, [themeList, currentTheme]);
    return null;
  }
);

export let ThemeComp = withSimpleExposing(ThemeTempComp, (comp) =>
  comp.children.stateValue.getView()
);

ThemeComp = withMethodExposing(ThemeComp, [
  {
    method: {
      name: "switchTo",
      description: trans("themeComp.switchTo"),
      params: [{ name: "themeId", type: "string" }],
    },
    execute: (comp, params) => {
      const themeId = params?.[0];
      if (typeof themeId !== "string") {
        return;
      }
      if (themeId) {
        const data = comp.children.stateValue.getView();
        if (!data.allThemes.find((t) => t.id === themeId)) {
          return;
        }
      }
      setLocalThemeId(themeId);
      // trigger update
      comp.children.localThemeId.dispatchChangeValueAction(themeId);
    },
  },
]);
