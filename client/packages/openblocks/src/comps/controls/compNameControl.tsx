import { PopupCard } from "openblocks-design";
import { Input } from "openblocks-design";
import { EditorContext } from "comps/editorState";
import { valueComp } from "comps/generators";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { trans } from "i18n";
import { ReactNode, useContext, useRef, useState } from "react";
import { ControlParams } from "./controlParams";

interface PropertyViewProps {
  comp: CompNameControl;
  onValidate?: (preValue: string, nextValue: string) => string;
  onFinish?: (preValue: string, nextValue: string) => void;
}

function PropertyView(props: PropertyViewProps) {
  const { comp, onValidate } = props;
  const [error, setError] = useState("");
  const editorState = useContext(EditorContext);
  const prevName = comp.getView();
  const originNameRef = useRef(prevName);

  const handleFinish = (nextName: string) => {
    if (error) {
      // reset
      comp.dispatchChangeValueAction(originNameRef.current);
      return;
    }
    if (!onValidate) {
      if (!editorState.rename(originNameRef.current, nextName)) {
        return;
      }
    }
    comp.dispatchChangeValueAction(nextName);
    originNameRef.current = nextName;
    props.onFinish && props.onFinish(prevName, nextName);
  };

  return (
    <div>
      <Input
        value={prevName}
        onFocus={() => {
          originNameRef.current = prevName;
        }}
        onBlur={(e) => handleFinish(e.target.value)}
        onPressEnter={(e) => handleFinish((e.target as HTMLInputElement).value)}
        onChange={(e) => {
          const nextName = e.target.value;
          if (onValidate) {
            setError(onValidate(originNameRef.current, nextName));
            return;
          }
          setError(editorState.checkRename(prevName, nextName));
        }}
      />
      <PopupCard
        editorFocus={!!error}
        title={error ? trans("error") : ""}
        content={error}
        hasError={!!error}
      />
    </div>
  );
}

class CompNameControl extends valueComp<string>("") {
  getPropertyView(): ReactNode {
    return <PropertyView comp={this} />;
  }

  propertyView(
    params: ControlParams & {
      onValidate?: (pre: string, value: string) => string;
      onFinish?: (preValue: string, nextValue: string) => void;
    }
  ): JSX.Element {
    const { onValidate, ...otherParams } = params;
    return (
      <ControlPropertyViewWrapper {...otherParams}>
        <PropertyView comp={this} onValidate={onValidate} onFinish={params.onFinish} />
      </ControlPropertyViewWrapper>
    );
  }
}

export default CompNameControl;
