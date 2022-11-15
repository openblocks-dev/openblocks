import { QueryComp } from "../../queries";
import { simpleMultiComp, withPropertyViewFn } from "../../generators";
import { exposingDataForAutoComplete, NameAndExposingInfo } from "../../utils/exposingTypes";
import React, { useEffect, useState } from "react";
import { QueryGeneralPropertyView } from "../../queries/queryComp/queryPropertyView";
import { InputListComp } from "./inputListComp";
import { CompExposingContext } from "comps/generators/withContext";
import { QueryContext } from "util/context/QueryContext";
import { QueryLibraryEditorView } from "../../../pages/queryLibrary/queryLibraryEditorView";
import { CustomModal, EditPopover, Section, TacoButton } from "openblocks-design";
import ReactHotkeys from "../../../util/hotkeys";
import { executeQueryAction, renameAction } from "openblocks-core";
import { deleteQueryLibrary } from "../../../redux/reduxActions/queryLibraryActions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { PointIcon } from "openblocks-design";
import { UnfoldWhiteIcon } from "openblocks-design";
import { QueryLibraryResultPanel } from "../../../components/ResultPanel";
import { DataSourceStructureTree } from "../../../pages/editor/bottom/BottomMetaDrawer";
import { ScrollBar } from "openblocks-design";
import { EditText } from "openblocks-design";
import { trans } from "i18n";

const children = {
  query: withPropertyViewFn(QueryComp, (comp) => (
    <QueryContext.Provider
      value={{ datasourceId: comp.children.datasourceId.getView(), disableJSCompletion: true }}
    >
      <QueryGeneralPropertyView comp={comp} placement={"queryLibrary"} />
    </QueryContext.Provider>
  )),
  inputs: InputListComp,
};

const QueryLibraryCompBase = simpleMultiComp(children);

export const QueryLibraryComp = class extends QueryLibraryCompBase {
  propertyView(params: { onPublish: () => void; onHistoryShow: () => void }) {
    return (
      <PropertyView comp={this} onPublish={params.onPublish} onHistoryShow={params.onHistoryShow} />
    );
  }

  getQueryPropertyView() {
    return this.children.query.getPropertyView();
  }

  getRightPropertyView() {
    return (
      <>
        <Section key={"inputs"} name={trans("prop.inputs")} width={296} noMargin>
          {this.children.inputs.getPropertyView()}
        </Section>
        <Section key={"meta"} name={trans("prop.meta")} width={296} noMargin>
          <div style={{ padding: " 0 8px" }}>
            <DataSourceStructureTree
              dataSourceId={this.children.query.children.datasourceId.getView()}
              datasourceType={this.children.query.children.compType.getView()}
            />
          </div>
        </Section>
      </>
    );
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    const result: NameAndExposingInfo = {};
    this.children.inputs.getView().forEach((item: any) => {
      result[item.children.name.getView()] = item.exposingInfo();
    });
    return result;
  }
};

const PropertyView = (props: {
  comp: QueryLibraryCompType;
  onPublish: () => void;
  onHistoryShow: () => void;
}) => {
  const { comp, onPublish, onHistoryShow } = props;

  const reduxDispatch = useDispatch();

  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    setShowResult(false);
  }, [comp.children.query.children.id.getView()]);

  const handleExec = () =>
    comp.children.query.dispatch(
      executeQueryAction({
        afterExecFunc: () => setShowResult(true),
      })
    );

  return (
    <CompExposingContext.Provider
      value={exposingDataForAutoComplete(comp.nameAndExposingInfo(), false)}
    >
      <ReactHotkeys
        global={true}
        keyName={"command+enter"}
        onKeyDown={handleExec}
        allowRepeat={true}
        wrapperStyle={{ width: "100%" }}
      >
        <QueryLibraryEditorView
          comp={comp}
          title={
            <EditText
              text={comp.children.query.children.name.getView()}
              onFinish={(value) =>
                value !== comp.children.query.children.name.getView() &&
                comp.dispatch(renameAction(comp.children.query.children.name.getView(), value))
              }
            />
          }
          headerRight={
            <>
              <EditPopover
                items={[
                  { text: trans("queryLibrary.publish"), onClick: onPublish },
                  { text: trans("queryLibrary.historyVersion"), onClick: onHistoryShow },
                ]}
                del={() =>
                  CustomModal.confirm({
                    title: trans("queryLibrary.deleteQueryLabel"),
                    content: trans("queryLibrary.deleteQueryContent"),
                    onConfirm: () =>
                      reduxDispatch(
                        deleteQueryLibrary({
                          queryLibraryId: comp.children.query.children.id.getView(),
                        })
                      ),
                    confirmBtnType: "delete",
                    okText: trans("delete"),
                  })
                }
              >
                <PopoverButton>
                  <PopoverIcon tabIndex={-1} />
                </PopoverButton>
              </EditPopover>
              <RunButton
                onClick={handleExec}
                loading={comp.children.query.children.isFetching.getView()}
                buttonType="primary"
              >
                <RunIcon />
                {trans("queryLibrary.run")}
              </RunButton>
            </>
          }
          bodyLeft={
            <>
              {comp.getQueryPropertyView()}
              {showResult && (
                <QueryLibraryResultPanel
                  comp={comp.children.query as any}
                  onClose={() => setShowResult(false)}
                />
              )}
            </>
          }
          bodyRight={<ScrollBar>{comp.getRightPropertyView()}</ScrollBar>}
        />
      </ReactHotkeys>
    </CompExposingContext.Provider>
  );
};

const PopoverIcon = styled(PointIcon)`
  flex-shrink: 0;

  g {
    fill: #8b8fa3;
  }
`;
const PopoverButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border: 1px solid #d7d9e0;
  border-radius: 4px;

  :hover {
    background-color: #f5f5f6;
    border: 1px solid #d7d9e0;

    g {
      fill: #222222;
    }
  }
`;
const RunIcon = styled(UnfoldWhiteIcon)`
  transform: rotate(-90deg);
  display: inline-block;
  padding-right: 2px;
  margin-right: 4px;
`;
const RunButton = styled(TacoButton)`
  padding: 0;
  width: 80px;
  height: 32px;
  border: none;

  :hover {
    padding: 0;
    border: none;
    box-shadow: none;
  }

  :focus {
    padding: 0;
    border: none;
    box-shadow: none;
  }

  :after {
    content: "";
  }
`;

export type QueryLibraryCompType = InstanceType<typeof QueryLibraryComp>;
