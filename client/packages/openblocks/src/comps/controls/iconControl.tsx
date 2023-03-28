import { CodeEditorTooltipContainer } from "base/codeEditor/codeEditor";
import { EditorState, EditorView } from "base/codeEditor/codeMirror";
import { iconRegexp, iconWidgetClass } from "base/codeEditor/extensions/iconExtension";
import { i18nObjs, trans } from "i18n";
import {
  AbstractComp,
  CompAction,
  CompActionTypes,
  CompParams,
  customAction,
  DispatchType,
  Node,
  ValueAndMsg,
} from "openblocks-core";
import {
  BlockGrayLabel,
  controlItem,
  ControlPropertyViewWrapper,
  DeleteInputIcon,
  iconPrefix,
  IconSelect,
  IconSelectBase,
  removeQuote,
  SwitchJsIcon,
  SwitchWrapper,
  TacoButton,
  useIcon,
  wrapperToControlItem,
} from "openblocks-design";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { StringControl } from "./codeControl";
import { ControlParams } from "./controlParams";

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ButtonIconWrapper = styled.div`
  display: flex;
  font-size: 16px;
`;
const ButtonText = styled.div`
  margin: 0 4px;
  flex: 1;
  width: 0px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;
const StyledDeleteInputIcon = styled(DeleteInputIcon)`
  margin-left: auto;
  cursor: pointer;

  &:hover circle {
    fill: #8b8fa3;
  }
`;

const StyledImage = styled.img`
  height: 1em;
  color: currentColor;
`;

const Wrapper = styled.div`
  > div:nth-of-type(1) {
    margin-bottom: 4px;
  }
`;

const IconPicker = (props: {
  value: string;
  onChange: (value: string) => void;
  label?: ReactNode;
}) => {
  const icon = useIcon(props.value);
  return (
    <IconSelect
      onChange={props.onChange}
      label={props.label}
      searchKeywords={i18nObjs.iconSearchKeywords}
    >
      <TacoButton style={{ width: "100%" }}>
        {icon ? (
          <ButtonWrapper>
            <ButtonIconWrapper>{icon.getView()}</ButtonIconWrapper>
            <ButtonText title={icon.title}>{icon.title}</ButtonText>
            <StyledDeleteInputIcon
              onClick={(e) => {
                props.onChange("");
                e.stopPropagation();
              }}
            />
          </ButtonWrapper>
        ) : (
          <BlockGrayLabel label={trans("iconControl.selectIcon")} />
        )}
      </TacoButton>
    </IconSelect>
  );
};

function onClickIcon(e: React.MouseEvent, v: EditorView) {
  for (let t = e.target as HTMLElement | null; t; t = t.parentElement) {
    if (t.classList.contains(iconWidgetClass)) {
      const pos = v.posAtDOM(t);
      const result = iconRegexp.exec(v.state.doc.sliceString(pos));
      if (result) {
        const from = pos + result.index;
        return { from, to: from + result[0].length };
      }
    }
  }
}

function IconSpan(props: { value: string }) {
  const icon = useIcon(props.value);
  return <span>{icon?.getView() ?? props.value}</span>;
}

function cardRichContent(s: string) {
  let result = s.match(iconRegexp);
  if (result) {
    const nodes: React.ReactNode[] = [];
    let pos = 0;
    for (const iconStr of result) {
      const i = s.indexOf(iconStr, pos);
      if (i >= 0) {
        nodes.push(s.slice(pos, i));
        nodes.push(<IconSpan key={i} value={iconStr} />);
        pos = i + iconStr.length;
      }
    }
    nodes.push(s.slice(pos));
    return nodes;
  }
  return s;
}

type Range = {
  from: number;
  to: number;
};

function IconCodeEditor(props: {
  codeControl: InstanceType<typeof StringControl>;
  params: ControlParams;
}) {
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState<Range>();
  const widgetPopup = useCallback(
    (v: EditorView) => (
      <IconSelectBase
        onChange={(value) => {
          const r: Range = range ?? v.state.selection.ranges[0] ?? { from: 0, to: 0 };
          const insert = '"' + value + '"';
          setRange({ ...r, to: r.from + insert.length });
          v.dispatch({ changes: { ...r, insert } });
        }}
        visible={visible}
        setVisible={setVisible}
        trigger="contextMenu"
        parent={document.querySelector<HTMLElement>(`${CodeEditorTooltipContainer}`)}
        searchKeywords={i18nObjs.iconSearchKeywords}
      />
    ),
    [visible, range]
  );
  const onClick = useCallback((e: React.MouseEvent, v: EditorView) => {
    const r = onClickIcon(e, v);
    if (r) {
      setVisible(true);
      setRange(r);
    }
  }, []);
  const extraOnChange = useCallback((state: EditorState) => {
    // popover should hide on change
    setVisible(false);
    setRange(undefined);
  }, []);
  return props.codeControl.codeEditor({
    ...props.params,
    enableIcon: true,
    widgetPopup,
    onClick,
    extraOnChange,
    cardRichContent,
    cardTips: (
      <>
        {trans("iconControl.insertImage")}
        <TacoButton style={{ display: "inline" }} onClick={() => setVisible(true)}>
          {trans("iconControl.insertIcon")}
        </TacoButton>
      </>
    ),
  });
}

function isSelectValue(value: any) {
  return !value || (typeof value === "string" && value.startsWith(iconPrefix));
}

type ChangeModeAction = {
  useCodeEditor: boolean;
};

function IconControlView(props: { value: string }) {
  const { value } = props;
  const icon = useIcon(value);
  if (icon) {
    return icon.getView();
  }
  return <StyledImage src={value} alt="" />;
}

export class IconControl extends AbstractComp<ReactNode, string, Node<ValueAndMsg<string>>> {
  private readonly useCodeEditor: boolean;
  private readonly codeControl: InstanceType<typeof StringControl>;

  constructor(params: CompParams<string>) {
    super(params);
    this.useCodeEditor = !isSelectValue(params.value);
    this.codeControl = new StringControl(params);
  }

  override getView(): ReactNode {
    const value = this.codeControl.getView();
    return <IconControlView value={value} />;
  }

  override getPropertyView(): ReactNode {
    throw new Error("Method not implemented.");
  }

  changeModeAction() {
    return customAction<ChangeModeAction>({ useCodeEditor: !this.useCodeEditor }, true);
  }

  propertyView(params: ControlParams) {
    const jsContent = (
      <SwitchJsIcon
        checked={this.useCodeEditor}
        onChange={() => this.dispatch(this.changeModeAction())}
      />
    );
    if (this.useCodeEditor) {
      return controlItem(
        { filterText: params.label },
        <Wrapper>
          <SwitchWrapper label={params.label} tooltip={params.tooltip} lastNode={jsContent} />
          {this.useCodeEditor && <IconCodeEditor codeControl={this.codeControl} params={params} />}
        </Wrapper>
      );
    }
    return wrapperToControlItem(
      <ControlPropertyViewWrapper {...params} lastNode={jsContent}>
        {!this.useCodeEditor && (
          <IconPicker
            value={this.codeControl.getView()}
            onChange={(x) => this.dispatchChangeValueAction(x)}
            label={params.label}
          />
        )}
      </ControlPropertyViewWrapper>
    );
  }

  readonly IGNORABLE_DEFAULT_VALUE = "";
  override toJsonValue(): string {
    if (this.useCodeEditor) {
      return this.codeControl.toJsonValue();
    }
    // in select mode, don't save editor's original value when saving
    const v = removeQuote(this.codeControl.getView());
    return isSelectValue(v) ? v : "";
  }

  override reduce(action: CompAction): this {
    switch (action.type) {
      case CompActionTypes.CUSTOM: {
        const useCodeEditor = (action.value as ChangeModeAction).useCodeEditor;
        let codeControl = this.codeControl;
        if (!this.useCodeEditor && useCodeEditor) {
          // value should be transformed when switching to editor from select mode
          const value = this.codeControl.toJsonValue();
          if (value && isSelectValue(value)) {
            codeControl = codeControl.reduce(codeControl.changeValueAction(`{{ "${value}" }}`));
          }
        }
        return setFieldsNoTypeCheck(this, { useCodeEditor, codeControl });
      }
      case CompActionTypes.CHANGE_VALUE: {
        const useCodeEditor = this.useCodeEditor ? true : !isSelectValue(action.value);
        const codeControl = this.codeControl.reduce(action);
        if (useCodeEditor !== this.useCodeEditor || codeControl !== this.codeControl) {
          return setFieldsNoTypeCheck(this, { useCodeEditor, codeControl });
        }
        return this;
      }
    }
    const codeControl = this.codeControl.reduce(action);
    if (codeControl !== this.codeControl) {
      return setFieldsNoTypeCheck(this, { codeControl });
    }
    return this;
  }

  override nodeWithoutCache() {
    return this.codeControl.nodeWithoutCache();
  }

  exposingNode() {
    return this.codeControl.exposingNode();
  }

  override changeDispatch(dispatch: DispatchType): this {
    const result = setFieldsNoTypeCheck(
      super.changeDispatch(dispatch),
      { codeControl: this.codeControl.changeDispatch(dispatch) },
      { keepCacheKeys: ["node"] }
    );
    return result;
  }
}
