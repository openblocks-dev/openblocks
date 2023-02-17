import { BottomContent } from "pages/editor/bottom/BottomContent";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import styled from "styled-components";
import * as React from "react";
import { useMemo, useState } from "react";
import { getPanelStyle, savePanelStyle } from "util/localStorageUtil";
import { BottomResultPanel } from "../../../components/resultPanel/BottomResultPanel";
import { AppState } from "../../../redux/reducers";
import { getUser } from "../../../redux/selectors/usersSelectors";
import { connect } from "react-redux";
import { Layers } from "constants/Layers";

const StyledResizableBox = styled(ResizableBox)`
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e1e3eb;
  z-index: ${Layers.bottomPanel};

  .react-resizable-handle {
    position: absolute;
    border-top: transparent solid 3px;
    width: 100%;
    padding: 0 3px 3px 0;
    top: 0;
    cursor: row-resize;
  }
`;

const preventDefault = (e: any) => {
  e.preventDefault();
};

// prevent the editor window slide when resize
const addListener = () => {
  window.addEventListener("mousedown", preventDefault);
};

const removeListener = () => {
  window.removeEventListener("mousedown", preventDefault);
};

function Bottom(props: any) {
  const panelStyle = useMemo(() => getPanelStyle(), []);
  const clientHeight = document.documentElement.clientHeight;
  const resizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    savePanelStyle({ ...panelStyle, bottom: { h: data.size.height } });
    setBottomHeight(data.size.height);
    removeListener();
  };

  const [bottomHeight, setBottomHeight] = useState(panelStyle.bottom.h);

  return (
    <>
      <BottomResultPanel bottom={bottomHeight} />
      <StyledResizableBox
        width={Infinity}
        height={panelStyle.bottom.h}
        resizeHandles={["n"]}
        minConstraints={[680, 285]}
        maxConstraints={[Infinity, clientHeight - 48 - 40]} // - app_header - right_header
        onResizeStart={addListener}
        onResizeStop={resizeStop}
      >
        <BottomContent />
      </StyledResizableBox>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    orgId: getUser(state).currentOrgId,
    datasourceInfos: state.entities.datasource.data,
  };
};

export default connect(mapStateToProps, null)(Bottom);
