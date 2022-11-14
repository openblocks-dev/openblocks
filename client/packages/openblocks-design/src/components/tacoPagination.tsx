import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination/Pagination";
import styled, { css } from "styled-components";
import { ReactComponent as PackUpIcon } from "icons/icon-Pack-up.svg";

const packUpIconCss = css`
  height: 24px;
  width: 24px;

  :hover:not([disabled]) {
    g path {
      fill: #315efb;
    }
  }

  &[disabled] g path {
    fill: #b8b9bf;
    opacity: 45%;
  }
`;

const PrevIcon = styled(PackUpIcon)`
  transform: rotate(270deg);
  ${packUpIconCss};
`;
const NextIcon = styled(PackUpIcon)`
  transform: rotate(90deg);
  ${packUpIconCss};
`;

const StyledPagination = styled(Pagination)`
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    .ant-pagination-item-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 24px;
      min-width: 24px;

      .ant-pagination-item-link-icon {
        color: #315efb;
      }

      .ant-pagination-item-ellipsis {
        transform: scale(0.5, 0.5);
        color: #333333;
        line-height: 24px;
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    height: 24px;
    width: 24px;
    min-width: 24px;
  }

  .ant-pagination-item {
    border: unset;
    background: #f5f5f6;
    border-radius: 4px;
    height: 24px;
    width: 24px;
    min-width: 24px;

    a {
      font-size: 13px;
      color: #8b8fa3;
      text-align: center;
      line-height: 24px;
      padding: 0;
    }
  }

  .ant-pagination-item-active,
  .ant-pagination-item:hover {
    background: #f2f7fc;
    font-weight: unset;

    a {
      color: #315efb;
    }
  }
`;

export const pageItemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
  if (type === "prev") {
    return <PrevIcon />;
  }
  if (type === "next") {
    return <NextIcon />;
  }
  return originalElement;
};

export function TacoPagination(props: PaginationProps) {
  return <StyledPagination itemRender={pageItemRender} {...props} />;
}
