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

class Icon {
  readonly title: string;
  constructor(readonly def: IconDefinition, readonly names: string[]) {
    this.title = def.iconName.split("-").map(_.upperFirst).join(" ");
  }
  getView() {
    return <FontAwesomeIcon icon={this.def} style={{ width: "1em", height: "1em" }} />;
  }
}

let allIcons: Record<string, Icon> | undefined = undefined;

async function getAllIcons() {
  if (allIcons !== undefined) {
    return allIcons;
  }
  const [{ far }, { fas }] = await Promise.all([
    import("@fortawesome/free-regular-svg-icons"),
    import("@fortawesome/free-solid-svg-icons"),
  ]);
  const ret: Record<string, Icon> = {};
  for (const [type, pack] of Object.entries({ solid: fas, regular: far })) {
    const list = Object.entries(pack);
    for (const [k, def] of list) {
      ret[type + "/" + def.iconName] = new Icon(def, [def.iconName]);
    }
    for (const [k, def] of list) {
      const name = k.startsWith("fa") ? k.slice(2) : k;
      ret[type + "/" + def.iconName].names.push(name);
      // for compatibility of old data
      const key = type + "/" + name;
      if (ret[key] === undefined) {
        ret[key] = new Icon(def, []);
      }
    }
  }
  allIcons = ret;
  return ret;
}

export const iconPrefix = "/icon:";

export function removeQuote(value?: string) {
  return value ? (value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : value) : "";
}

function getIconKey(value?: string) {
  const v = removeQuote(value);
  return v.startsWith(iconPrefix) ? v.slice(iconPrefix.length) : "";
}

export function useIcon(value?: string) {
  const key = getIconKey(value);
  const [icon, setIcon] = useState<Icon | undefined>(undefined);
  useEffect(() => {
    getAllIcons().then((icons) => setIcon(icons[key]));
  }, [key]);
  return icon;
}

function search(
  allIcons: Record<string, Icon>,
  searchText: string,
  searchKeywords?: Record<string, string>
) {
  const tokens = searchText
    .toLowerCase()
    .split(/\s+/g)
    .filter((t) => t);
  return _.sortBy(
    Object.entries(allIcons).filter(([key, icon]) => {
      if (icon.names.length === 0) {
        return false;
      }
      let text = icon.names
        .flatMap((name) => [name, searchKeywords?.[name]])
        .filter((t) => t)
        .join(" ");
      text = (icon.title + " " + text).toLowerCase();
      return tokens.every((t) => text.includes(t));
    }),
    ([key, icon]) => icon.title
  );
}

const IconPopup = (props: {
  onChange: (value: string) => void;
  label?: ReactNode;
  onClose: () => void;
  searchKeywords?: Record<string, string>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [allIcons, setAllIcons] = useState<Record<string, Icon>>({});
  const searchResults = useMemo(
    () => search(allIcons, searchText, props.searchKeywords),
    [searchText, allIcons]
  );
  const onChangeRef = useRef(props.onChange);
  onChangeRef.current = props.onChange;
  const onChangeIcon = useCallback((key: string) => onChangeRef.current(iconPrefix + key), []);
  const columnNum = 8;

  useEffect(() => {
    getAllIcons().then(setAllIcons);
  }, []);

  const rowRenderer = useCallback(
    (p: ListRowProps) => (
      <IconRow key={p.key} style={p.style}>
        {searchResults.slice(p.index * columnNum, (p.index + 1) * columnNum).map(([key, icon]) => (
          <Tooltip
            key={key}
            title={icon.title}
            placement="bottom"
            align={{ offset: [0, -7, 0, 0] }}
            destroyTooltipOnHide
          >
            <IconItemContainer
              tabIndex={0}
              onClick={() => {
                onChangeIcon(key);
              }}
            >
              {icon.getView()}
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
