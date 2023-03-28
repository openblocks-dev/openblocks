import { trans } from "i18n";
import { CompConstructor } from "openblocks-core";
import React, { ErrorInfo } from "react";
import styled from "styled-components";

const ErrorMsg = styled.div`
  padding: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorView = (props: { msg: string; onReload: () => void }) => {
  return (
    <ErrorMsg>
      <div>
        {trans("errorBoundary.encounterError")}
        <a type="button" onClick={props.onReload}>
          {trans("errorBoundary.clickToReload")}
        </a>
        <br />
        {trans("errorBoundary.errorMsg")}
        {props.msg}
      </div>
    </ErrorMsg>
  );
};

class CompErrorBoundary extends React.Component<
  { viewRender: () => JSX.Element | React.ReactNode },
  { hasError: boolean; msg: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, msg: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, msg: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // error report
  }

  reload() {
    this.setState({ hasError: false });
  }

  render() {
    try {
      if (this.state.hasError) {
        return <ErrorView msg={this.state.msg} onReload={() => this.reload()} />;
      }
      return this.props.viewRender();
    } catch (e: any) {
      return <ErrorView msg={e.message} onReload={() => this.reload()} />;
    }
  }
}

export function withErrorBoundary<T extends CompConstructor>(VariantComp: T): T {
  // @ts-ignore
  return class extends VariantComp {
    override getView() {
      return <CompErrorBoundary viewRender={() => super.getView()} />;
    }
  };
}
