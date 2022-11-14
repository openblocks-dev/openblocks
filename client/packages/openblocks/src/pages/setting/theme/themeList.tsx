import { Button, Dropdown, Empty, Menu, Table } from "antd";
import { timestampToHumanReadable } from "util/dateTimeUtils";
import { MENU_TYPE } from "./themeConstant";
import React, { useState } from "react";
import {
  ColumnName,
  ControlCol,
  EditButton,
  EllipsisSpan,
  EmptySpan,
  ListDropdown,
  MoreIconDiv,
  StyledMoreActionIcon,
  TableStyled,
  TagDesc,
} from "./styledComponents";
import { ThemeType } from "api/commonSettingApi";
import { trans } from "i18n";

const { Column } = Table;

type ThemeListProp = {
  themeList: ThemeType[] | undefined | null;
  defaultTheme: string | undefined | null;
  isAdmin: boolean;
  clickMenu: (params: { themeId: string; key: string }) => void;
  createTheme: () => void;
};

function ThemeList(props: ThemeListProp) {
  const { themeList, defaultTheme, clickMenu, isAdmin, createTheme } = props;
  const tableRef = React.useRef(null);
  const [activeRow, setActiveRow] = useState("0");

  function editTheme(id: string) {
    clickMenu({ key: MENU_TYPE.EDIT, themeId: id });
  }
  return (
    <TableStyled
      ref={tableRef}
      rowKey="id"
      pagination={false}
      dataSource={themeList || []}
      rowClassName={(record) => ((record as ThemeType).id === activeRow ? "row-hover" : "")}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <EmptySpan>
                <span>{trans("theme.emptyTheme")}</span>
                <span>
                  {trans("theme.click")}
                  <Button type="link" disabled={!isAdmin} onClick={() => createTheme()}>
                    {trans("theme.createTheme")}
                  </Button>
                  {trans("theme.toCreate")}
                </span>
              </EmptySpan>
            }
          />
        ),
      }}
      onRow={(theme) => ({
        onClick: (event) => {
          if (!event.defaultPrevented) {
            editTheme((theme as ThemeType).id);
          }
        },
        onMouseEnter: () => {
          setActiveRow((theme as ThemeType).id);
        },
        onMouseLeave: () => {
          setActiveRow("0");
        },
      })}
    >
      <Column
        title={trans("theme.nameColumn")}
        dataIndex="name"
        key="name"
        ellipsis
        render={(value, theme: ThemeType) => (
          <ColumnName>
            <TagDesc theme={theme.theme}>
              <div className="left" />
              <div className="right" />
            </TagDesc>
            <EllipsisSpan>{value}</EllipsisSpan>
            {theme.id === defaultTheme && (
              <span className="default">{trans("theme.defaultTip")}</span>
            )}
          </ColumnName>
        )}
      />
      <Column
        title={trans("theme.updateTimeColumn")}
        dataIndex="updateTime"
        key="updateTime"
        ellipsis
        render={(value) => (
          <span style={{ color: "#8B8FA3" }}>{timestampToHumanReadable(value)}</span>
        )}
      />
      <Column
        key="id"
        dataIndex="id"
        render={(value, theme) =>
          isAdmin && (
            <ControlCol>
              <EditButton
                className="edit-button"
                buttonType="primary"
                onClick={() => editTheme(value)}
              >
                {trans("theme.edit")}{" "}
              </EditButton>
              <ListDropdown onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  trigger={["click"]}
                  getPopupContainer={() => tableRef.current!}
                  overlay={
                    <Menu
                      onClick={(params) => {
                        clickMenu({ key: params.key, themeId: value });
                      }}
                      items={[
                        (theme as ThemeType).id === defaultTheme
                          ? {
                              label: trans("theme.cancelDefaultTheme"),
                              key: MENU_TYPE.CANCEL_DEFAULT,
                            }
                          : {
                              label: trans("theme.setDefaultTheme"),
                              key: MENU_TYPE.SET_DEFAULT,
                            },
                        {
                          label: trans("theme.copyTheme"),
                          key: MENU_TYPE.COPY,
                        },
                        {
                          label: trans("delete"),
                          key: MENU_TYPE.DELETE,
                        },
                      ]}
                    />
                  }
                >
                  <MoreIconDiv>
                    <StyledMoreActionIcon />
                  </MoreIconDiv>
                </Dropdown>
              </ListDropdown>
            </ControlCol>
          )
        }
      />
    </TableStyled>
  );
}

export default ThemeList;
