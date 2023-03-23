import styled from "styled-components";
import { CloseIcon } from "openblocks-design";
import { allShortcutGroups } from "./shortcutConfigs";
import { isMac } from "util/commonUtils";
import { trans } from "i18n";

const Wrapper = styled.div`
  position: absolute;
  right: 0px;
  bottom: 50px;
  background: #2c2c2c;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 280px;
  max-height: min(640px, calc(100vh - 124px));
  padding: 0 0 16px 16px;
  display: flex;
  flex-flow: column;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden scroll;
  scrollbar-gutter: stable;
  padding-right: 2px;
  ::-webkit-scrollbar {
    width: 14px;
  }
  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0);
  }
  :hover {
    ::-webkit-scrollbar-thumb {
      background-color: rgba(139, 143, 163, 0.24);
    }
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.36);
  }
`;

const HeadLine = styled.div`
  flex-shrink: 0;
  height: 34px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
  padding-right: 16px;
`;

const CloseIconWrapper = styled.div`
  margin-left: auto;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #7a7c80;

  :hover svg g line {
    stroke: #ffffff;
  }
`;

const ShortcutGroup = styled.div`
  margin-bottom: 5px;
`;

const ShortcutHead = styled.div`
  padding-top: 7px;
  height: 25px;
  font-size: 13px;
  color: #7a7c80;
  line-height: 13px;
`;

const ShortcutLine = styled.div`
  height: 29px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444444;
  font-size: 13px;
  color: #ffffff;
  line-height: 13px;
`;

const ShortcutKeys = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const ShortcutKey = styled.span`
  display: flex;
  align-items: center;
`;

const ShortcutKeyItem = styled.div<{ autoWidth?: boolean }>`
  ${(props) => (props.autoWidth ? "min-width" : "width")}: 20px;
  ${(props) => (props.autoWidth ? "padding: 0 3px;" : "")}
  height: 20px;
  background: #f9f9fa;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  font-family: LucidaGrande;
  font-size: 14px;
  color: #222222;
  text-align: center;
  line-height: 18px;
  margin-left: 6px;
`;

const ShortcutTextItem = styled.div`
  margin-left: 6px;
  font-family: LucidaGrande;
  font-size: 14px;
  color: #ffffff;
  text-align: right;
  line-height: 14px;
`;

function getKeyItemString(key: string) {
  switch (key) {
    case "Enter":
      return "⏎"; // eslint-disable-line only-ascii/only-ascii
    case "Backspace":
      return "Backspace";
    case "Escape":
      return "ESC";
    case "Delete":
      return "DEL";
    default:
      return key.toUpperCase();
  }
}

export function ShortcutListPopup(props: { setShowShortcutList: (v: boolean) => void }) {
  return (
    <Wrapper className="shortcutList">
      <HeadLine>
        {trans("shortcut.shortcutList")}
        <CloseIconWrapper onClick={() => props.setShowShortcutList(false)}>
          <CloseIcon />
        </CloseIconWrapper>
      </HeadLine>
      <Content>
        {allShortcutGroups
          .filter((g) => g.shortcuts.length > 0)
          .map((group, groupIndex) => (
            <ShortcutGroup key={"group" + groupIndex}>
              <ShortcutHead>{group.name}</ShortcutHead>
              {group.shortcuts
                .filter((s) => s.keys.length > 0)
                .map((s, shortcutIndex) => (
                  <ShortcutLine key={"shortcut" + shortcutIndex}>
                    {s.name}
                    <ShortcutKeys>
                      {/* eslint-disable only-ascii/only-ascii */}
                      {s.keys.map((k, keyIndex) => (
                        <ShortcutKey key={"key" + keyIndex}>
                          {keyIndex > 0 && <ShortcutTextItem>,</ShortcutTextItem>}
                          {k.mod && <ShortcutKeyItem>{isMac ? "⌘" : "⌃"}</ShortcutKeyItem>}
                          {k.ctrl && <ShortcutKeyItem>⌃</ShortcutKeyItem>}
                          {k.alt && <ShortcutKeyItem>⌥</ShortcutKeyItem>}
                          {k.shift && <ShortcutKeyItem>⇧</ShortcutKeyItem>}
                          {k.key && (
                            <ShortcutKeyItem autoWidth={getKeyItemString(k.key).length > 1}>
                              {getKeyItemString(k.key)}
                            </ShortcutKeyItem>
                          )}
                          {k.click && (
                            <ShortcutTextItem>+ {trans("shortcut.click")}</ShortcutTextItem>
                          )}
                          {k.directionKey && (
                            <>
                              {k.mod && <ShortcutTextItem>+ </ShortcutTextItem>}
                              <ShortcutKeyItem>↑</ShortcutKeyItem>
                              <ShortcutKeyItem>→</ShortcutKeyItem>
                              <ShortcutKeyItem>↓</ShortcutKeyItem>
                              <ShortcutKeyItem>←</ShortcutKeyItem>
                            </>
                          )}
                        </ShortcutKey>
                      ))}
                      {/* eslint-disable only-ascii/only-ascii */}
                    </ShortcutKeys>
                  </ShortcutLine>
                ))}
            </ShortcutGroup>
          ))}
      </Content>
    </Wrapper>
  );
}
