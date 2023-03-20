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
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isUserViewMode, useAppPathParam } from "util/hooks";

const StyledSide = styled(Layout.Sider)`
  max-height: calc(100vh - ${TopHeaderHeight});
  overflow: auto;

  .ant-menu-item:first-child {
    margin-top: 0;
  }

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

  // Find by path itemKey
  const findItemPathByKey = useCallback(
    (itemComps: LayoutMenuItemComp[], itemKey: string): string[] => {
      for (let item of itemComps) {
        const subItems = item.children.items.getView();
        if (subItems.length > 0) {
          // have subMenus
          const childPath = findItemPathByKey(subItems, itemKey);
          if (childPath.length > 0) {
            return [item.getItemKey(), ...childPath];
          }
        } else {
          if (item.getItemKey() === itemKey && !item.children.hidden.getView()) {
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

  const defaultOpenKeys = useMemo(() => {
    let itemPath: string[];
    if (pathParam.appPageId) {
      itemPath = findItemPathByKey(items, pathParam.appPageId);
    } else {
      itemPath = findFirstItemPath(items);
    }
    return itemPath.slice(0, itemPath.length - 1);
  }, []);

  useEffect(() => {
    let selectedKey = pathParam.appPageId;
    if (!selectedKey) {
      const firstItem = findFirstItemPath(items)?.slice(-1);
      if (firstItem.length > 0) {
        selectedKey = firstItem[0];
      }
    }
    setSelectedKey(selectedKey);
  }, [pathParam.appPageId]);

  let pageView = <EmptyContent text="" style={{ height: "100%" }} />;
  const selectedItem = itemKeyRecord[selectedKey];
  if (selectedItem && !selectedItem.children.hidden.getView()) {
    const compView = selectedItem.children.action.getView();
    if (compView) {
      pageView = compView;
    }
  }

  let content = (
    <Layout>
      <StyledSide theme="light" width={240}>
        <AntdMenu
          items={menuItems}
          mode="inline"
          style={{ height: "100%" }}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[selectedKey]}
          onClick={(e) => {
            const itemComp = itemKeyRecord[e.key];
            const url = [
              ALL_APPLICATIONS_URL,
              pathParam.applicationId,
              pathParam.viewMode,
              itemComp.getItemKey(),
            ].join("/");
            itemComp.children.action.act(url);
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
