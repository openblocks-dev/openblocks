import { trans } from "i18n";

const dsl = {
  ui: {
    layout: {
      "19427536": { i: "19427536", h: 10, w: 12, x: 0, y: 0 },
      "71170d57": { i: "71170d57", h: 5, w: 7, x: 17, y: 5 },
      db6e8345: { i: "db6e8345", h: 37, w: 10, x: 0, y: 11 },
      "4fbf5ef0": {
        i: "4fbf5ef0",
        h: 37,
        w: 13,
        delayCollision: true,
        x: 11,
        y: 11,
      },
    },
    items: {
      "19427536": {
        compType: "text",
        comp: {
          text: `### ${trans("theme.previewTitle")}`,
          autoHeight: "auto",
          type: "markdown",
          horizontalAlignment: "left",
          verticalAlignment: "center",
          style: { background: "", text: "", links: "" },
          hidden: "",
        },
        name: "text1",
      },
      db6e8345: {
        compType: "table",
        comp: {
          hideBordered: false,
          hideHeader: false,
          data: `[\n  {\n    key: 1,\n    date: \"${trans(
            "theme.previewDate"
          )}\",\n    email: \"${trans("theme.previewEmail1")}\",\n    phone: \"${trans(
            "theme.previewPhone1"
          )}\",\n  },
                  \n  {\n    key: 2,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail2")}\",\n    phone: \"${trans(
            "theme.previewPhone2"
          )}\",\n   },
                  \n  {\n    key: 3,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail3")}\",\n    phone: \"${trans(
            "theme.previewPhone3"
          )}\",\n  },
                  \n  {\n    key: 1,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail4")}\",\n    phone: \"${trans(
            "theme.previewPhone4"
          )}\",\n   },
                  \n  {\n    key: 2,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail1")}\",\n    phone: \"${trans(
            "theme.previewPhone1"
          )}\",\n  },
                  \n  {\n    key: 3,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail2")}\",\n    phone: \"${trans(
            "theme.previewPhone2"
          )}\",\n  },
                  \n  {\n    key: 1,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail3")}\",\n    phone: \"${trans(
            "theme.previewPhone3"
          )}\",\n   },
                  \n  {\n    key: 2,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail4")}\",\n    phone: \"${trans(
            "theme.previewPhone4"
          )}\",\n  },
                  \n  {\n    key: 3,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail1")}\",\n    phone: \"${trans(
            "theme.previewPhone1"
          )}\",\n  },
                  \n  {\n    key: 1,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail2")}\",\n    phone: \"${trans(
            "theme.previewPhone2"
          )}\",\n   },
                  \n  {\n    key: 2,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail3")}\",\n    phone: \"${trans(
            "theme.previewPhone3"
          )}\",\n  },
                  \n  {\n    key: 3,\n    date: \"${trans(
                    "theme.previewDate"
                  )}\",\n    email: \"${trans("theme.previewEmail4")}\",\n    phone: \"${trans(
            "theme.previewPhone4"
          )}\",\n  },
                  \n]`,
          columns: [
            {
              title: trans("theme.dateColumn"),
              isCustom: false,
              dataIndex: "date",
              hide: false,
              sortable: false,
              width: 77.828125,
              autoWidth: "fixed",
              render: {
                compType: "text",
                comp: { text: "{{currentCell}}" },
              },
              align: "left",
              fixed: "close",
            },
            {
              title: trans("theme.emailColumn"),
              isCustom: false,
              dataIndex: "email",
              hide: false,
              sortable: false,
              width: 92.3359375,
              autoWidth: "fixed",
              render: {
                compType: "text",
                comp: { text: "{{currentCell}}" },
              },
              align: "left",
              fixed: "close",
            },
            {
              title: trans("theme.phoneColumn"),
              isCustom: false,
              dataIndex: "phone",
              hide: false,
              sortable: false,
              width: -1,
              autoWidth: "auto",
              render: {
                compType: "text",
                comp: { text: "{{currentCell}}" },
              },
              align: "left",
              fixed: "close",
            },
            {
              title: "key",
              isCustom: false,
              dataIndex: "key",
              hide: true,
              sortable: false,
              width: -1,
              autoWidth: "auto",
              render: {
                compType: "text",
                comp: { text: "{{currentCell}}" },
              },
              align: "left",
              fixed: "close",
            },
          ],
          size: "middle",
          selection: { mode: "single" },
          pagination: {
            showQuickJumper: false,
            showSizeChanger: false,
            hideOnSinglePage: false,
            changeablePageSize: "",
            pageSize: "4",
            total: "",
            pageSizeOptions: "[5, 10, 20, 50]",
          },
          sort: [],
          toolbar: {
            showRefresh: true,
            showDownload: true,
            showFilter: true,
            columnSetting: false,
            searchText: "",
          },
          style: {
            background: "",
            border: "",
            radius: "",
            cellText: "",
            selectedRowBackground: "",
            hoverRowBackground: "",
            alternateBackground: "",
            headerBackground: "",
            headerText: "",
            toolbarBackground: "",
            toolbarText: "",
          },
          viewModeResizable: false,
          hidden: "",
        },
        name: "table1",
      },
      "4fbf5ef0": {
        compType: "container",
        comp: {
          container: {
            header: {
              layout: {
                "3cc69b0a": {
                  i: "3cc69b0a",
                  h: 5,
                  w: 9,
                  x: 0,
                  y: 0,
                },
                "3cf6b90e": {
                  i: "3cf6b90e",
                  h: 5,
                  w: 12,
                  x: 12,
                  y: 0,
                },
              },
              items: {
                "3cc69b0a": {
                  compType: "text",
                  comp: {
                    text: `### ${trans("theme.subTitle")}`,
                    autoHeight: "auto",
                    type: "markdown",
                    horizontalAlignment: "left",
                    verticalAlignment: "center",
                    style: { background: "", text: "", links: "" },
                    hidden: "",
                  },
                  name: "containerTitle1",
                },
                "3cf6b90e": {
                  compType: "select",
                  comp: {
                    label: {
                      text: trans("label"),
                      tooltip: "",
                      hidden: false,
                      width: "30",
                      widthUnit: "%",
                      position: "row",
                      align: "left",
                    },
                    placeholder: "",
                    disabled: "",
                    onEvent: [],
                    options: {
                      optionType: "manual",
                      manual: {
                        manual: [
                          {
                            value: "1",
                            label: trans("theme.option", { index: 1 }),
                            disabled: "",
                            hidden: "",
                          },
                          {
                            value: "2",
                            label: trans("theme.option", { index: 2 }),
                            disabled: "",
                            hidden: "",
                          },
                        ],
                      },
                      mapData: {
                        optionType: "manual",
                        data: "[]",
                        mapData: {
                          value: "",
                          label: "",
                          disabled: "",
                          hidden: "",
                        },
                      },
                    },
                    allowClear: false,
                    required: false,
                    customRule: "",
                    formDataKey: "",
                    value: "",
                    style: {
                      label: "",
                      background: "",
                      border: "",
                      radius: "",
                      text: "",
                      accent: "",
                      validate: "",
                    },
                    hidden: "",
                  },
                  name: "select1",
                },
              },
            },
            body: {
              "0": {
                view: {
                  layout: {
                    "42997154": {
                      i: "42997154",
                      h: 5,
                      w: 6,
                      x: 0,
                      y: 15,
                    },
                    "2c7d3f7f": {
                      i: "2c7d3f7f",
                      h: 5,
                      w: 17,
                      x: 7,
                      y: 0,
                    },
                    f2577a09: {
                      i: "f2577a09",
                      h: 5,
                      w: 6,
                      x: 0,
                      y: 0,
                    },
                    bd5263ca: {
                      i: "bd5263ca",
                      h: 5,
                      w: 17,
                      x: 7,
                      y: 5,
                    },
                    "47533d59": {
                      i: "47533d59",
                      h: 5,
                      w: 7,
                      x: 0,
                      y: 5,
                    },
                    ea117cf2: {
                      i: "ea117cf2",
                      h: 5,
                      w: 22,
                      x: 0,
                      y: 10,
                    },
                    a7f2eb5e: {
                      i: "a7f2eb5e",
                      h: 5,
                      w: 16,
                      x: 6,
                      y: 15,
                    },
                  },
                  items: {
                    "42997154": {
                      compType: "text",
                      comp: {
                        text: trans("theme.linkLabel"),
                        autoHeight: "auto",
                        type: "markdown",
                        horizontalAlignment: "left",
                        verticalAlignment: "center",
                        style: {
                          background: "",
                          text: "",
                          links: "",
                        },
                        hidden: "",
                      },
                      name: "text6",
                    },
                    "2c7d3f7f": {
                      compType: "radio",
                      comp: {
                        value: "",
                        label: {
                          text: "",
                          tooltip: "",
                          hidden: false,
                          width: "25",
                          widthUnit: "%",
                          position: "row",
                          align: "left",
                        },
                        disabled: "",
                        onEvent: [],
                        options: {
                          optionType: "manual",
                          manual: {
                            manual: [
                              {
                                value: "1",
                                label: trans("theme.option", { index: 1 }),
                                disabled: "",
                                hidden: "",
                              },
                              {
                                value: "2",
                                label: trans("theme.option", { index: 2 }),
                                disabled: "",
                                hidden: "",
                              },
                            ],
                          },
                          mapData: {
                            optionType: "manual",
                            data: "[]",
                            mapData: {
                              value: "",
                              label: "",
                              disabled: "",
                              hidden: "",
                            },
                          },
                        },
                        style: {
                          label: "",
                          checkedBackground: "",
                          uncheckedBackground: "",
                          uncheckedBorder: "",
                          checked: "",
                          staticText: "",
                          validate: "",
                        },
                        layout: "horizontal",
                        required: false,
                        customRule: "",
                        formDataKey: "",
                        hidden: "",
                      },
                      name: "radio1",
                    },
                    bd5263ca: {
                      compType: "checkbox",
                      comp: {
                        value: '["1"]',
                        label: {
                          text: "",
                          tooltip: "",
                          hidden: false,
                          width: "25",
                          widthUnit: "%",
                          position: "row",
                          align: "left",
                        },
                        disabled: "",
                        onEvent: [],
                        options: {
                          optionType: "manual",
                          manual: {
                            manual: [
                              {
                                value: "1",
                                label: trans("theme.option", { index: 1 }),
                                disabled: "",
                                hidden: "",
                              },
                              {
                                value: "2",
                                label: trans("theme.option", { index: 2 }),
                                disabled: "",
                                hidden: "",
                              },
                            ],
                          },
                          mapData: {
                            optionType: "manual",
                            data: "[]",
                            mapData: {
                              value: "",
                              label: "",
                              disabled: "",
                              hidden: "",
                            },
                          },
                        },
                        style: {
                          label: "",
                          checkedBackground: "",
                          uncheckedBackground: "",
                          uncheckedBorder: "",
                          checked: "",
                          radius: "",
                          staticText: "",
                          validate: "",
                        },
                        layout: "horizontal",
                        required: false,
                        customRule: "",
                        formDataKey: "",
                        hidden: "",
                      },
                      name: "checkbox1",
                    },
                    ea117cf2: {
                      compType: "slider",
                      comp: {
                        max: "100",
                        min: "0",
                        step: "1",
                        label: {
                          text: trans("theme.sliderLabel"),
                          tooltip: "",
                          hidden: false,
                          width: "70",
                          widthUnit: "px",
                          position: "row",
                          align: "left",
                        },
                        disabled: "",
                        onEvent: [],
                        style: {
                          label: "",
                          fill: "",
                          thumbBoder: "",
                          thumb: "",
                          track: "",
                        },
                        value: "60",
                        formDataKey: "",
                        hidden: "",
                      },
                      name: "slider1",
                    },
                    f2577a09: {
                      compType: "text",
                      comp: {
                        text: trans("theme.radioLabel"),
                        autoHeight: "auto",
                        type: "markdown",
                        horizontalAlignment: "left",
                        verticalAlignment: "center",
                        style: {
                          background: "",
                          text: "",
                          links: "",
                        },
                        hidden: "",
                      },
                      name: "text4",
                    },
                    "47533d59": {
                      compType: "text",
                      comp: {
                        text: trans("theme.checkboxLabel"),
                        autoHeight: "auto",
                        type: "markdown",
                        horizontalAlignment: "left",
                        verticalAlignment: "center",
                        style: {
                          background: "",
                          text: "",
                          links: "",
                        },
                        hidden: "",
                      },
                      name: "text5",
                    },
                    a7f2eb5e: {
                      compType: "link",
                      comp: {
                        text: trans("theme.linkUrl"),
                        onEvent: [
                          {
                            name: "click",
                            handler: {
                              compType: "goToURL",
                              comp: {
                                url: "https://" + trans("theme.linkUrl"),
                                inNewTab: true,
                              },
                              condition: "",
                              slowdown: "debounce",
                              delay: "",
                            },
                          },
                        ],
                        disabled: "",
                        loading: "",
                        style: { text: "" },
                        prefixIcon: "",
                        suffixIcon: "",
                        hidden: "",
                      },
                      name: "link1",
                    },
                  },
                },
              },
            },
            footer: {
              layout: {
                e9f9d60b: {
                  i: "e9f9d60b",
                  h: 5,
                  w: 9,
                  x: 15,
                  y: 0,
                },
              },
              items: {
                e9f9d60b: {
                  compType: "button",
                  comp: {
                    text: trans("theme.buttonLabel"),
                    type: "",
                    onEvent: [],
                    disabled: "",
                    loading: "",
                    form: "",
                    prefixIcon: "",
                    suffixIcon: "",
                    style: {
                      background: "",
                      border: "",
                      radius: "",
                      text: "",
                    },
                    hidden: "",
                  },
                  name: "button1",
                },
              },
            },
            showHeader: true,
            showBody: true,
            showFooter: true,
            autoHeight: "fixed",
            style: {
              background: "",
              border: "",
              radius: "",
              headerBackground: "",
              footerBackground: "",
            },
          },
          hidden: "",
        },
        name: "container1",
      },
      "71170d57": {
        compType: "switch",
        comp: {
          value: "1",
          label: {
            text: trans("theme.switch"),
            tooltip: "",
            hidden: false,
            width: "70",
            widthUnit: "%",
            position: "row",
            align: "right",
          },
          onEvent: [],
          disabled: "",
          style: {
            label: "",
            handle: "",
            unchecked: "",
            checked: "",
          },
          formDataKey: "",
          hidden: "",
        },
        name: "switch3",
      },
    },
  },
  queries: [],
  tempStates: [],
  transformers: [],
  hooks: [
    { compType: "urlParams", comp: {}, name: "url" },
    { compType: "momentJsLib", comp: {}, name: "moment" },
    { compType: "lodashJsLib", comp: {}, name: "_" },
    { compType: "utils", comp: {}, name: "utils" },
    { compType: "message", comp: {}, name: "message" },
    { compType: "localStorage", comp: {}, name: "localStorage" },
    { compType: "currentUser", comp: {}, name: "currentUser" },
  ],
  settings: {
    maxWidth: { dropdown: "3200", input: "3200" },
    themeId: "",
  },
  preload: { libs: [], script: "", css: "" },
};

export default dsl;
