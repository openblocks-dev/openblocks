import React from "react";
import SimpleBar from "simplebar-react";
import styled from "styled-components";

const ScrollBarWrapper = styled.div`
  min-height: 0;
  height: 100%;
  width: 100%;

  .simplebar-scrollbar::before {
    background: rgba(139, 143, 163, 0.5) !important;
    right: 4px !important;
    left: 1px !important;
  }

  .simplebar-hover::before {
    background: rgba(139, 143, 163, 0.5) !important;
    right: 4px !important;
    left: 1px !important;
    opacity: 1 !important;
  }

  .simplebar-content-wrapper {
    height: 100% !important;
    outline: none !important;
  }

  .simplebar-offset {
    width: 100% !important;
  }

  .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
    top: 10px;
    bottom: 10px;
  }
`;

interface IProps extends SimpleBar.Props {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export const ScrollBar = (props: IProps) => {
  const { height = "100%", className, children, ...otherProps } = props;
  return (
    <ScrollBarWrapper className={className}>
      <SimpleBar forceVisible="y" style={{ height: height }} {...otherProps}>
        {children}
      </SimpleBar>
    </ScrollBarWrapper>
  );
};
