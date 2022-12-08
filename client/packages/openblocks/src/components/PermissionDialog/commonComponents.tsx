import styled from "styled-components";
import { AdminIcon, CustomSelect, GroupIcon, WhiteLoading } from "openblocks-design";
import React from "react";

export const StyledRoleSelect = styled(CustomSelect)`
  margin-left: auto;

  .ant-select-arrow {
    right: 0;
  }

  .ant-select-selector {
    border: none !important;
  }

  .ant-select:hover {
    .ant-select-selector .ant-select-selection-item {
      color: #4965f2;
    }

    .ant-select-arrow svg g path {
      fill: #4965f2;
    }
  }

  .ant-select .ant-select-selector .ant-select-selection-item {
    padding-right: 12px;

    font-size: 13px;
    color: #333333;
    text-align: right;
    line-height: 15px;
  }
`;

export const RoleSelectOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 15px;
  height: fit-content;
`;

export const StyledGroupIcon = styled(GroupIcon)<{
  color: string;
  side?: number;
}>`
  width: ${(props) => props.side ?? 16}px;
  height: ${(props) => props.side ?? 16}px;

  g g {
    fill: ${(props) => props.color};
  }
`;

export const StyledAdminIcon = styled(AdminIcon)<{ color: string }>`
  width: 16px;
  height: 16px;

  g path {
    fill: ${(props) => props.color};
  }
`;

export const PermissionItemName = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  line-height: 16px;
  margin-left: 12px;
  max-width: 276px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export function RoleSelectOption(props: { role: string }) {
  return (
    <RoleSelectOptionWrapper>
      <div>{props.role}</div>
    </RoleSelectOptionWrapper>
  );
}

export const StyledLoading = styled(WhiteLoading)`
  height: 353px;
  width: 100%;
`;
