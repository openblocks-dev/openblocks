import { NavComp } from "comps/comps/navComp/navComp";
import { trans } from "i18n";
import Example from "../common/Example";
import ExampleGroup from "../common/ExampleGroup";

export default function NavigationExample() {
  const blackListConfig: string[] = [
    "logoEvent",
    trans("componentDoc.styleBackgroundColor"),
    trans("componentDoc.styleBorderColor"),
    trans("componentDoc.styleColor"),
    "style.accentColor",
    "items",
  ];
  const nameMap: Record<string, string> = { logoUrl: trans("componentDoc.src") };
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            horizontalAlignment: "left",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
        <Example
          title="LOGO"
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            logoUrl: "https://temp.im/400x400",
            horizontalAlignment: "left",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.hAlignType")}>
        <Example
          title={trans("componentDoc.left")}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            horizontalAlignment: "left",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
        <Example
          title={trans("componentDoc.center")}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            horizontalAlignment: "center",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
        <Example
          title={trans("componentDoc.right")}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            horizontalAlignment: "right",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
        <Example
          title={trans("componentDoc.justify")}
          blackListConfig={blackListConfig}
          nameMap={nameMap}
          config={{
            horizontalAlignment: "justify",
            style: {
              backgroundColor: "#00000000",
              borderColor: "#00000000",
              color: "#333333",
              accentColor: "#1890ff",
            },
            items: [
              {
                label: trans("componentDoc.menuItem", { num: 1 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                  {
                    label: trans("componentDoc.subMenuItem", { num: 2 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
              {
                label: trans("componentDoc.menuItem", { num: 2 }),
                hidden: "",
                active: "",
                onEvent: [
                  {
                    name: "click",
                    handler: {
                      compType: "openAppPage",
                      comp: {
                        applicationId: {
                          applicationId: "",
                        },
                        query: [{ key: "", value: "" }],
                        hash: [{ key: "", value: "" }],
                        inNewTab: false,
                      },
                      condition: "",
                      slowdown: "debounce",
                      delay: "",
                    },
                  },
                ],
                items: [
                  {
                    label: trans("componentDoc.subMenuItem", { num: 1 }),
                    hidden: "",
                    active: "",
                    onEvent: [
                      {
                        name: "click",
                        handler: {
                          compType: "openAppPage",
                          comp: {
                            applicationId: {
                              applicationId: "",
                            },
                            query: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            hash: [
                              {
                                key: "",
                                value: "",
                              },
                            ],
                            inNewTab: false,
                          },
                          condition: "",
                          slowdown: "debounce",
                          delay: "",
                        },
                      },
                    ],
                    items: [],
                  },
                ],
              },
            ],
          }}
          compFactory={NavComp}
        />
      </ExampleGroup>
    </>
  );
}
