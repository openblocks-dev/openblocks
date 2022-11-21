import { Layout, Menu as AntdMenu, MenuProps } from "antd";
import MainContent from "components/layout/MainContent";
import { LayoutMenuItemComp, LayoutMenuItemListComp } from "comps/comps/layout/layoutMenuItemComp";
import { menuPropertyView } from "comps/comps/navComp/components/MenuItemList";
import { registerLayoutMap } from "comps/comps/uiComp";
import { MultiCompBuilder, withDefault, withViewFn } from "comps/generators";
import { withDispatchHook } from "comps/generators/withDispatchHook";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { ALL_APPLICATIONS_URL } from "constants/routesURL";
import { TopHeaderHeight } from "constants/style";
import { Section } from "openblocks-design";
import { trans } from "i18n";
import { EditorContainer, EmptyContent } from "pages/common/styledComponent";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { KeyValue } from "types/common";
import { keyValueListToSearchStr } from "util/appUtils";
import history from "util/history";
import { isUserViewMode, useAppPathParam } from "util/hooks";

const StyledSide = styled(Layout.Sider)`
  max-height: calc(100vh - ${TopHeaderHeight});
  overflow: auto;

  .ant-layout-sider-trigger {
    position: relative;
    bottom: 1px;
    border-right: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
  }
`;

const ContentWrapper = styled.div`
  height: 100%;

  main::-webkit-scrollbar {
    display: none;
  }
`;

let NavTmpLayout = (function () {
  const childrenMap = {
    items: withDefault(LayoutMenuItemListComp, [
      {
        label: trans("menuItem") + " 1",
      },
    ]),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return null;
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={trans("menu")}>{menuPropertyView(children.items)}</Section>
        </>
      );
    })
    .build();
})();

NavTmpLayout = withViewFn(NavTmpLayout, (comp) => {
  const pathParam = useAppPathParam();
  const isViewMode = isUserViewMode(pathParam);
  const [selectedKey, setSelectedKey] = useState("");
  const items = useMemo(() => comp.children.items.getView(), [comp.children.items]);

  // filter out hidden. unauthorised items filtered by server
  const filterItem = useCallback((item: LayoutMenuItemComp): boolean => {
    return !item.children.hidden.getView();
  }, []);

  const getMenuItem = useCallback(
    (itemComps: LayoutMenuItemComp[]): MenuProps["items"] => {
      return itemComps.filter(filterItem).map((item) => {
        const label = item.children.label.getView();
        const subItems = item.children.items.getView();
        return {
          label: label,
          title: label,
          key: item.getItemKey(),
          icon: <span>{item.children.icon.getView()}</span>,
          ...(subItems.length > 0 && { children: getMenuItem(subItems) }),
        };
      });
    },
    [filterItem]
  );

  const menuItems = useMemo(() => getMenuItem(items), [items, getMenuItem]);

  // Find by path appId
  const findItemPathByAppId = useCallback(
    (itemComps: LayoutMenuItemComp[], appIdParam: string): string[] => {
      for (let item of itemComps) {
        const subItems = item.children.items.getView();
        if (subItems.length > 0) {
          // have subMenus
          const childPath = findItemPathByAppId(subItems, appIdParam);
          if (childPath.length > 0) {
            return [item.getItemKey(), ...childPath];
          }
        } else {
          const appId = item.children.app.getAppId();
          if (appId === appIdParam && !item.children.hidden.getView()) {
            return [item.getItemKey()];
          }
        }
      }
      return [];
    },
    []
  );

  // Get the first visible menu
  const findFirstItemPath = useCallback(
    (itemComps: LayoutMenuItemComp[]): string[] => {
      for (let item of itemComps) {
        if (filterItem(item)) {
          const subItems = item.children.items.getView();
          if (subItems.length > 0) {
            // have subMenus
            const childPath = findFirstItemPath(subItems);
            if (childPath.length > 0) {
              return [item.getItemKey(), ...childPath];
            }
          } else {
            return [item.getItemKey()];
          }
        }
      }
      return [];
    },
    [filterItem]
  );

  const itemKeyRecord = useMemo(() => {
    const result: Record<string, LayoutMenuItemComp> = {};
    items.forEach((item) => {
      const subItems = item.children.items.getView();
      if (subItems.length > 0) {
        item.children.items
          .getView()
          .forEach((subItem) => (result[subItem.getItemKey()] = subItem));
      } else {
        result[item.getItemKey()] = item;
      }
    });
    return result;
  }, [items]);

  const defaultKey = useMemo(() => {
    let defaultSelectKeys;
    let defaultOpenKeys;
    let itemPath: string[];
    if (pathParam.appPageId) {
      itemPath = findItemPathByAppId(items, pathParam.appPageId);
    } else {
      itemPath = findFirstItemPath(items);
    }
    defaultOpenKeys = itemPath.slice(0, itemPath.length - 1);
    defaultSelectKeys = itemPath.slice(-1);
    return { defaultSelectKeys, defaultOpenKeys };
  }, []);

  let pageView = <EmptyContent text="" style={{ height: "100%" }} />;
  const selectedItem = itemKeyRecord[selectedKey || defaultKey.defaultSelectKeys[0]];
  if (
    selectedItem &&
    !selectedItem.children.hidden.getView() &&
    selectedItem.children.app.getAppId()
  ) {
    pageView = selectedItem.children.app.getView();
  }

  let content = (
    <Layout>
      <StyledSide theme="light" width={240}>
        <AntdMenu
          items={menuItems}
          mode="inline"
          style={{ height: "100%" }}
          defaultOpenKeys={defaultKey.defaultOpenKeys}
          defaultSelectedKeys={defaultKey.defaultSelectKeys}
          onClick={(e) => {
            setSelectedKey(e.key);
            const itemComp = itemKeyRecord[e.key];
            let url = [
              ALL_APPLICATIONS_URL,
              pathParam.applicationId,
              pathParam.viewMode,
              itemComp.children.app.getAppId(),
            ].join("/");
            const queryParam = keyValueListToSearchStr(
              itemComp.children.queryParam.getView().map((i) => i.getView() as KeyValue)
            );
            const hashParam = keyValueListToSearchStr(
              itemComp.children.hashParam.getView().map((i) => i.getView() as KeyValue)
            );
            if (queryParam) {
              url += `?${queryParam}`;
            }
            if (hashParam) {
              url += `#${hashParam}`;
            }
            history.push(url);
          }}
        />
      </StyledSide>
      <MainContent>{pageView}</MainContent>
    </Layout>
  );
  return isViewMode ? (
    content
  ) : (
    <EditorContainer>
      <ContentWrapper>{content}</ContentWrapper>
    </EditorContainer>
  );
});

const navLayoutCompType = "nav";

// action adds extraInfo to save history
NavTmpLayout = withDispatchHook(NavTmpLayout, (dispatch) => (action) => {
  if (!dispatch) {
    return;
  }
  return dispatch({
    ...action,
    extraInfo: {
      compInfos: [
        {
          compName: trans("aggregation.navLayout"),
          compType: navLayoutCompType,
          type: "modify",
        },
      ],
    },
  });
});

export const NavLayout = class extends NavTmpLayout {
  getAllCompItems() {
    return {};
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    return {};
  }
};
registerLayoutMap({ compType: navLayoutCompType, comp: NavLayout });
