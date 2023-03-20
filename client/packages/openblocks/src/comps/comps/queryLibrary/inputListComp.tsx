import { JSONValueControl } from "comps/controls/codeControl";
import CompNameControl from "comps/controls/compNameControl";
import { simpleMultiComp, valueComp, withPropertyViewFn } from "comps/generators";
import { withExposingRaw } from "comps/generators/withExposing";
import { trans } from "i18n";
import {
  ControlPropertyViewWrapper,
  EditPopover,
  Input,
  PointIcon,
  SimplePopover,
  TacoButton,
} from "openblocks-design";
import { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EmptyContent } from "../../../components/EmptyContent";
import { QueryLibraryContext } from "../../../util/context/QueryLibraryContext";
import { list } from "../../generators/list";

const childrenMap = {
  name: CompNameControl,
  description: valueComp<string>(""),
  value: JSONValueControl,
};

const PropertyView = (props: {
  comp: InstanceType<typeof InputCompBase>;
  onDelete: () => void;
  showPopover: boolean;
}) => {
  const [isPopShow, showPop] = useState(props.showPopover);

  const context = useContext(QueryLibraryContext);

  const name = props.comp.children.name.getView();
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {props.comp.children.value.propertyView({
        key: name,
        label: (
          <SimplePopover
            visible={isPopShow}
            setVisible={showPop}
            content={
              <>
                {props.comp.children.name.propertyView({
                  label: trans("queryLibrary.inputName"),
                  onValidate: (pre: string, value: string) => context.checkRename(pre, value),
                  onFinish: (pre: string, value: string) => context.rename(pre, value),
                })}
                <ControlPropertyViewWrapper label={trans("queryLibrary.inputDesc")}>
                  <Input
                    value={props.comp.children.description.getView()}
                    onChange={(e) => {
                      props.comp.children.description.dispatchChangeValueAction(e.target.value);
                    }}
                  />
                </ControlPropertyViewWrapper>
              </>
            }
            title={trans("edit")}
          >
            <div style={{ cursor: "pointer" }}>{name}</div>
          </SimplePopover>
        ),
        layout: "vertical",
        tooltip: props.comp.children.description.getView(),
      })}
      <EditPopover
        items={[{ text: trans("edit"), onClick: () => showPop(true) }]}
        del={props.onDelete}
      >
        <PopoverIcon tabIndex={-1} />
      </EditPopover>
    </div>
  );
};
const InputCompBase = class extends simpleMultiComp(childrenMap) {
  propertyView(props: { onDelete: () => void; showPopover: boolean }) {
    return <PropertyView comp={this} {...props} />;
  }
};

const InputListItemComp = withExposingRaw(InputCompBase, {}, (comp) =>
  comp.children.value.exposingNode()
);

const Wrapper = styled.div`
  padding: 0 16px;
`;

const PopoverIcon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  right: 0;

  g {
    fill: #8b8fa3;
  }

  :hover {
    background: #eef0f3;
    border-radius: 4px;
    cursor: pointer;

    g {
      fill: #3377ff;
    }
  }
`;

const AddButton = styled(TacoButton)`
  height: 28px;
  width: 70px;
  background-color: #fafbff;
  color: #4965f2;
  border-color: #c9d1fc;
  display: flex;
  align-items: center;
  box-shadow: none;

  :hover {
    color: #315efb;
    background-color: #f5faff;
    border-color: #c2d6ff;
  }

  :focus {
    color: #315efb;
    background-color: #f5faff;
    border-color: #c2d6ff;
  }

  :disabled,
  :disabled:hover {
    background: #f9fbff;
    border: 1px solid #dee9ff;
    border-radius: 4px;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

export const InputListComp = withPropertyViewFn(list(InputListItemComp), (comp) => {
  const queryLibraryState = useContext(QueryLibraryContext);
  const [newIdx, setNewIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    setNewIdx(undefined);
  }, [comp]);

  const handleAdd = () => {
    comp.dispatch(
      comp.pushAction({
        name: queryLibraryState.getNameGenerator().genItemName("queryInput"),
      })
    );
    setNewIdx(comp.getView().length);
  };

  return (
    <Wrapper>
      {comp.getView().length > 0 ? (
        <InputsWrapper>
          {comp.getView().map((t, i) => (
            <Fragment key={i}>
              {(t as any).propertyView({
                onDelete: () => comp.dispatch(comp.deleteAction(i)),
                showPopover: i === newIdx,
              })}
            </Fragment>
          ))}
          <AddButton onClick={handleAdd}>{trans("addItem")}</AddButton>
        </InputsWrapper>
      ) : (
        <EmptyContent
          text={
            <>
              <div>{trans("queryLibrary.emptyInputs")}</div>
              <span
                style={{ color: "#4965f2", cursor: "pointer", margin: "0 4px" }}
                onClick={handleAdd}
              >
                {trans("queryLibrary.clickToAdd")}
              </span>
            </>
          }
        />
      )}
    </Wrapper>
  );
});
