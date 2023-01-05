import Segmented from "components/Segmented";
import { featureSwitch } from "constants/featureSwitch";
import { ScrollBar, Search } from "openblocks-design";
import { useState } from "react";
import styled from "styled-components";
import { RightContext } from "./rightContext";
import { UICompPanel } from "./uiCompPanel";
import { trans } from "i18n";
import ExtensionPanel from "./ExtensionPanel";

type OptionValue = "ui" | "extension";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InsertViewBody = styled.div`
  flex: 1;
  overflow: hidden;
`;

const InsertViewHeader = styled.div`
  padding: 0 16px;
  padding-bottom: 12px;
  .comp-panel-tab {
    margin-top: 16px;
  }
`;

const options = [
  {
    value: "ui",
    label: trans("rightPanel.uiComponentTab"),
  },
  {
    value: "extension",
    label: trans("rightPanel.extensionTab"),
  },
];

interface InsertViewProps {
  onCompDrag: (dragCompKey: string) => void;
}

export default function InsertView(props: InsertViewProps) {
  const { onCompDrag } = props;
  const [searchValue, setSearchValue] = useState("");
  const [activeKey, setActiveKey] = useState<OptionValue>("ui");

  return (
    <Wrapper>
      <InsertViewHeader>
        <Search
          placeholder={trans("rightPanel.searchPlaceHolder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear={true}
        />
        {featureSwitch.ModuleEnabled && (
          <Segmented
            block
            options={options}
            value={activeKey}
            className="comp-panel-tab"
            onChange={(k) => setActiveKey(k as OptionValue)}
          />
        )}
      </InsertViewHeader>
      <RightContext.Provider
        value={{
          searchValue: searchValue,
          onDrag: onCompDrag,
        }}
      >
        <InsertViewBody>
          <ScrollBar>
            {activeKey === "ui" && <UICompPanel />}
            {activeKey === "extension" && <ExtensionPanel />}
          </ScrollBar>
        </InsertViewBody>
      </RightContext.Provider>
    </Wrapper>
  );
}
