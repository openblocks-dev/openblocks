import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const ColumnTypeViewWrapper = styled.div`
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
`;

const ColumnTypeHoverView = styled.div<{
  adjustLeft?: number;
  adjustTop?: number;
  adjustWidth?: number;
  adjustHeight?: number;
  minWidth?: number;
  padding: string;
  visible: boolean;
}>`
  position: absolute;
  height: ${(props) => (props.adjustHeight ? `${props.adjustHeight}px` : "max-content")};
  width: ${(props) => (props.adjustWidth ? `${props.adjustWidth}px` : "max-content")};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : "unset")};
  max-height: 150px;
  max-width: 300px;
  overflow: auto;
  background: inherit;
  z-index: 3;
  padding: ${(props) => props.padding};
  top: ${(props) => `${props.adjustTop || 0}px`};
  left: ${(props) => `${props.adjustLeft || 0}px`};

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
    min-height: 30px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.5);
  }
`;

function childIsOverflow(nodes: HTMLCollection): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const overflow = node.clientHeight < node.scrollHeight || node.clientWidth < node.scrollWidth;
    if (overflow) {
      return true;
    }
    return childIsOverflow(node.children);
  }
  return false;
}

export default function ColumnTypeView(props: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoverViewRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState<{
    left?: number;
    top?: number;
    done: boolean;
    height?: number;
    width?: number;
  }>({ done: false });
  const [delayHandler, setDelayHandler] = useState<any>();
  const delayMouseEnter = useMemo(() => {
    return () =>
      setDelayHandler(
        setTimeout(() => {
          setIsHover(true);
        }, 300)
      );
  }, []);

  useEffect(() => {
    const wrapperEle = wrapperRef.current;
    if (!isHover || !wrapperEle) {
      return;
    }
    const overflow =
      wrapperEle.clientHeight < wrapperEle.scrollHeight ||
      wrapperEle.clientWidth < wrapperEle.scrollWidth;
    if (overflow || childIsOverflow(wrapperEle.children)) {
      !hasOverflow && setHasOverflow(true);
    } else {
      hasOverflow && setHasOverflow(false);
    }
  }, [isHover]);

  useEffect(() => {
    const wrapperEle = wrapperRef.current;
    const hoverEle = hoverViewRef.current;
    if (!isHover || !hasOverflow) {
      if (wrapperEle?.parentElement) {
        wrapperEle.parentElement.style.zIndex = "";
      }
      setAdjustedPosition({ done: false });
      return;
    }
    // Get the position of the outer table
    const tableEle = wrapperRef.current?.closest(".ant-table-content") as HTMLDivElement;
    if (!hoverEle || !tableEle || !wrapperEle) {
      return;
    }
    if (wrapperEle.parentElement) {
      // change parent z-index, fix bug when column sticky
      wrapperEle.parentElement.style.zIndex = "999";
    }

    // actual width and height of the element
    const width = Math.min(
      hoverEle.getBoundingClientRect().width,
      tableEle.getBoundingClientRect().width
    );
    const height = Math.min(
      hoverEle.getBoundingClientRect().height,
      tableEle.getBoundingClientRect().height
    );

    let left;
    const leftOverflow = tableEle.getBoundingClientRect().x - hoverEle.getBoundingClientRect().x;
    const rightOverflow =
      tableEle.getBoundingClientRect().x +
      tableEle.offsetWidth -
      (hoverEle.getBoundingClientRect().x + width);
    if (leftOverflow > 0) {
      left = leftOverflow;
    } else if (rightOverflow < 0) {
      // minus one, to avoid flashing scrollbars
      left = rightOverflow;
    }

    const bottomOverflow =
      tableEle.getBoundingClientRect().y +
      tableEle.offsetHeight -
      (hoverEle.getBoundingClientRect().y + height);

    // Adjust the hover position according to the table position
    setAdjustedPosition({
      left: left,
      top: bottomOverflow < 0 ? bottomOverflow : undefined,
      height: height,
      width: width,
      done: true,
    });
  }, [isHover, hasOverflow]);

  return (
    <>
      <ColumnTypeViewWrapper
        ref={wrapperRef}
        onMouseEnter={() => {
          delayMouseEnter();
        }}
        onMouseLeave={() => {
          clearTimeout(delayHandler);
          setIsHover(false);
        }}
      >
        {props.children}
      </ColumnTypeViewWrapper>
      {isHover && hasOverflow && wrapperRef.current && (
        <ColumnTypeHoverView
          ref={hoverViewRef}
          visible={adjustedPosition.done}
          minWidth={wrapperRef.current.offsetParent?.clientWidth}
          adjustWidth={adjustedPosition.width}
          adjustHeight={adjustedPosition.height}
          adjustLeft={adjustedPosition.left}
          adjustTop={adjustedPosition.top}
          padding={`${wrapperRef.current.offsetTop}px ${wrapperRef.current.offsetLeft}px`}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => setIsHover(false)}
        >
          {props.children}
        </ColumnTypeHoverView>
      )}
    </>
  );
}
