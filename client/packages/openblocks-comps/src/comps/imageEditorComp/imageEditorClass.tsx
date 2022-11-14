import React from "react";
import TuiImageEditor from "tui-image-editor";

export class ImageEditor extends React.Component<any> {
  rootEl = React.createRef<any>();

  imageEditorInst: TuiImageEditor | undefined;
  props: any;
  constructor(props: any) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    if (this.rootEl.current !== null) {
      this.imageEditorInst = new TuiImageEditor(this.rootEl.current, {
        ...(this.props as any),
      });
    }
  }

  componentWillUnmount() {
    if (this.imageEditorInst !== undefined) {
      this.imageEditorInst.destroy();

      this.imageEditorInst = undefined;
    }
  }

  shouldComponentUpdate(nextProps: any) {
    if (
      JSON.stringify([this.props.includeUI.menu, this.props.includeUI.loadImage]) !==
      JSON.stringify([nextProps.includeUI.menu, nextProps.includeUI.loadImage])
    ) {
      this.imageEditorInst = new TuiImageEditor(this.rootEl.current as any, {
        ...nextProps,
      });
    }
    return false;
  }

  getInstance() {
    return this.imageEditorInst;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}
