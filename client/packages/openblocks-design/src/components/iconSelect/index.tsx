import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { Popover } from "antd";
import { TacoInput } from "components/tacoInput";
import { Tooltip } from "components/toolTip";
import { trans } from "i18n/design";
import _ from "lodash";
import { ReactNode, useEffect, useCallback, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { List, ListRowProps } from "react-virtualized";
import styled from "styled-components";
import { CloseIcon, SearchIcon } from "icons";

const PopupContainer = styled.div`
  width: 408px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
`;
const TitleDiv = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  user-select: none;
`;
const TitleText = styled.span`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #222222;
  line-height: 16px;
`;
const StyledCloseIcon = styled(CloseIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #8b8fa3;

  &:hover g line {
    stroke: #222222;
  }
`;

const SearchDiv = styled.div`
  position: relative;
  margin: 0px 16px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 6px;
  left: 12px;
`;
const IconListWrapper = styled.div`
  padding-left: 10px;
  padding-right: 4px;
`;
const IconList = styled(List)`
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.36);
  }
`;
const IconRow = styled.div`
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  :last-child {
    gap: 8px;
    justify-content: flex-start;
  }
`;
const IconItemContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    border: 1px solid #315efb;
    border-radius: 4px;
  }

  &:focus {
    border: 1px solid #315efb;
    border-radius: 4px;
    box-shadow: 0 0 0 2px #d6e4ff;
  }
`;

async function getAllIcons() {
  const [{ far }, { fas }] = await Promise.all([
    import("@fortawesome/free-regular-svg-icons"),
    import("@fortawesome/free-solid-svg-icons"),
  ]);

  return Object.fromEntries(
    Object.entries({ solid: fas, regular: far }).flatMap(([type, pack]) =>
      Object.entries(pack).map(([k, v]) => [type + "/" + (k.startsWith("fa") ? k.slice(2) : k), v])
    )
  );
}

function getName(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}

async function getAllPaths() {
  const allIcons = await getAllIcons();
  return Object.values(_.groupBy(Object.keys(allIcons), getName)).flatMap((v) => v);
}

export const iconPrefix = "/icon:";

export function removeQuote(value?: string) {
  return value ? (value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : value) : "";
}

export function getIconPath(value?: string) {
  const v = removeQuote(value);
  return v.startsWith(iconPrefix) ? v.slice(iconPrefix.length) : "";
}

function getIconViewByPath(allIcons: Record<string, IconDefinition>, path: string) {
  if (!path) {
    return;
  }
  const icon = allIcons[path];
  if (icon !== undefined) {
    return <FontAwesomeIcon icon={icon} style={{ width: "1em", height: "1em" }} />;
  }
}

export function useIconViewByPath(path: string) {
  const [view, setView] = useState<ReactNode>(null);
  useEffect(() => {
    getAllIcons().then((icons) => {
      setView(getIconViewByPath(icons, path));
    });
  }, [path]);
  return view;
}

async function getIconViewByValue(value?: string) {
  const icons = await getAllIcons();
  return getIconViewByPath(icons, getIconPath(value));
}

export function useIconViewByValue(value?: string) {
  const [view, setView] = useState<ReactNode>(null);
  useEffect(() => {
    getIconViewByValue(value).then((v) => setView(v));
  }, [value]);
  return view;
}

export function getDescription(path: string) {
  return getName(path)
    .replace(/[A-Z][a-z]+/g, (s) => " " + s + " ")
    .replace(/[a-z][A-Z]/g, (s) => s[0] + " " + s[1])
    .replace(/[ ]+/g, (s) => " ")
    .trim();
}

function search(allPaths: string[], searchText: string, searchKeywords?: Record<string, string>) {
  const tokens = searchText
    .toLowerCase()
    .split(/\s+/g)
    .filter((t) => t);
  return allPaths.filter((path) => {
    const name = getName(path);
    const desc = name.toLowerCase() + " " + (searchKeywords?.[name] ?? "");
    return tokens.every((t) => desc.includes(t));
  });
}

const IconPopup = (props: {
  onChange: (value: string) => void;
  label?: ReactNode;
  onClose: () => void;
  searchKeywords?: Record<string, string>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [allPaths, setAllPaths] = useState<string[]>([]);
  const [allIcons, setAllIcons] = useState<Record<string, IconDefinition>>({});
  const searchResults = useMemo(
    () => search(allPaths, searchText, props.searchKeywords),
    [searchText, allPaths]
  );
  const onChangeRef = useRef(props.onChange);
  onChangeRef.current = props.onChange;
  const onChangeIcon = useCallback((path: string) => onChangeRef.current(iconPrefix + path), []);
  const columnNum = 8;

  useEffect(() => {
    getAllPaths().then(setAllPaths);
    getAllIcons().then(setAllIcons);
  }, []);

  const rowRenderer = useCallback(
    (p: ListRowProps) => (
      <IconRow key={p.key} style={p.style}>
        {searchResults.slice(p.index * columnNum, (p.index + 1) * columnNum).map((path) => (
          <Tooltip
            key={path}
            title={getDescription(path)}
            placement="bottom"
            align={{ offset: [0, -7, 0, 0] }}
            destroyTooltipOnHide
          >
            <IconItemContainer
              tabIndex={0}
              onClick={() => {
                console.info(path);
                onChangeIcon(path);
              }}
            >
              {getIconViewByPath(allIcons, path)}
            </IconItemContainer>
          </Tooltip>
        ))}
      </IconRow>
    ),
    [searchResults, allIcons, onChangeIcon]
  );
  return (
    <Draggable handle=".dragHandle">
      <PopupContainer>
        <TitleDiv className="dragHandle">
          <TitleText>{trans("iconSelect.title")}</TitleText>
          <StyledCloseIcon onClick={props.onClose} />
        </TitleDiv>
        <SearchDiv>
          <TacoInput
            style={{ width: "100%", paddingLeft: "40px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={trans("iconSelect.searchPlaceholder")}
          />
          <StyledSearchIcon />
        </SearchDiv>
        <IconListWrapper>
          <IconList
            width={394}
            height={312}
            rowHeight={48}
            rowCount={Math.ceil(searchResults.length / columnNum)}
            rowRenderer={rowRenderer}
          />
        </IconListWrapper>
      </PopupContainer>
    </Draggable>
  );
};

export const IconSelectBase = (props: {
  onChange: (value: string) => void;
  label?: ReactNode;
  children?: ReactNode;
  visible?: boolean;
  setVisible?: (v: boolean) => void;
  trigger?: string;
  leftOffset?: number;
  parent?: HTMLElement | null;
  searchKeywords?: Record<string, string>;
}) => {
  const { setVisible, parent } = props;
  return (
    <Popover
      trigger={props.trigger}
      placement="left"
      align={{ offset: [props.leftOffset ?? 0, 0, 0, 0] }}
      visible={props.visible}
      onVisibleChange={setVisible}
      getPopupContainer={parent ? () => parent : undefined}
      // hide the original background when dragging the popover is allowed
      overlayInnerStyle={{ border: "none", boxShadow: "none", background: "transparent" }}
      // when dragging is allowed, always re-location to avoid the popover exceeds the screen
      destroyTooltipOnHide
      content={
        <IconPopup
          onChange={props.onChange}
          label={props.label}
          onClose={() => setVisible?.(false)}
          searchKeywords={props.searchKeywords}
        />
      }
    >
      {props.children}
    </Popover>
  );
};

export const IconSelect = (props: {
  onChange: (value: string) => void;
  label?: ReactNode;
  children?: ReactNode;
  searchKeywords?: Record<string, string>;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <IconSelectBase
      {...props}
      visible={visible}
      setVisible={setVisible}
      trigger="click"
      leftOffset={-96}
      searchKeywords={props.searchKeywords}
    />
  );
};
