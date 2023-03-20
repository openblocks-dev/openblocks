import { JSONObject } from "util/jsonTypes";
import { UICompType } from "comps/uiCompRegistry";

export type CompConfig = {
  // comp type
  type: UICompType;
  // comp init data
  compInitData?: JSONObject;
  // The default is xxx.value, can be overridden in special cases
  exposingValueJs?: (compName: string) => string;
};

// text input, return string
const stringComps: CompConfig[] = [
  {
    type: "input",
  },
  {
    type: "textArea",
  },
  {
    type: "password",
  },
  {
    type: "richTextEditor",
  },
];
// number input, return number
const numberComps: CompConfig[] = [
  {
    type: "numberInput",
    compInitData: {
      allowNull: true,
    },
  },
  {
    type: "slider",
  },
  {
    type: "rating",
  },
];
// return type is boolean
const booleanComps: CompConfig[] = [
  {
    type: "switch",
  },
];
function toNumber(compName: string) {
  return "+" + compName + ".value";
}
// single selection, return type varies
function singleSelectComps(exposingValueJs?: (compName: string) => string): CompConfig[] {
  return [
    {
      type: "select",
      exposingValueJs,
    },
    {
      type: "radio",
      exposingValueJs,
    },
    {
      type: "segmentedControl",
      exposingValueJs,
    },
  ];
}
// return value is of type string[]
function joinString(compName: string) {
  return compName + '.value.join(",")';
}
const multiSelectComps: CompConfig[] = [
  {
    type: "checkbox",
    exposingValueJs: joinString,
  },
  {
    type: "multiSelect",
    exposingValueJs: joinString,
  },
  {
    type: "file",
    exposingValueJs: joinString,
  },
];
// return value is of type string
const dateComp: CompConfig = {
  type: "date",
};
function dateTimeToTimestamp(compName: string) {
  return "moment(" + compName + ".value || 0).valueOf()";
}
function dateTimeComp(toTimestamp?: boolean): CompConfig {
  return {
    type: "date",
    compInitData: {
      showTime: true,
    },
    exposingValueJs: toTimestamp ? dateTimeToTimestamp : undefined,
  };
}
const timeComp: CompConfig = {
  type: "time",
};
function dateTimeComps(): CompConfig[] {
  return [dateComp, timeComp];
}

export type CompSelection = {
  // comp selection list
  comps: CompConfig[];
  // default selection
  defaultCompType: UICompType;
};
export function allCompSelection(): CompSelection {
  return {
    comps: [
      ...stringComps,
      ...numberComps,
      ...booleanComps,
      ...singleSelectComps(),
      ...multiSelectComps,
      ...dateTimeComps(),
    ],
    defaultCompType: "input",
  };
}
export function stringCompSelection(): CompSelection {
  return {
    comps: [...stringComps, ...singleSelectComps(), ...multiSelectComps, ...dateTimeComps()],
    defaultCompType: "input",
  };
}
export function enumCompSelection(): CompSelection {
  return {
    comps: singleSelectComps(),
    defaultCompType: "select",
  };
}
export function setCompSelection(): CompSelection {
  return {
    comps: [...multiSelectComps, ...singleSelectComps()],
    defaultCompType: "checkbox",
  };
}
export function numberCompSelection(withMore?: boolean): CompSelection {
  // support number radio
  let comps = [...numberComps, ...singleSelectComps(toNumber)];
  if (withMore) {
    // tinyint may be bool, bigint may be timestamp
    comps = [...comps, ...booleanComps, dateTimeComp(true)];
  }
  return {
    comps: comps,
    defaultCompType: "numberInput",
  };
}
export function booleanCompSelection(): CompSelection {
  return {
    comps: booleanComps,
    defaultCompType: "switch",
  };
}
export function dateCompSelection(): CompSelection {
  return {
    comps: [dateComp],
    defaultCompType: "date",
  };
}
export function dateTimeCompSelection(): CompSelection {
  return {
    comps: [dateTimeComp()],
    defaultCompType: "date",
  };
}
export function timestampCompSelection(): CompSelection {
  return {
    comps: [dateTimeComp(true)],
    defaultCompType: "date",
  };
}
export function timeCompSelection(): CompSelection {
  return {
    comps: [timeComp],
    defaultCompType: "time",
  };
}

export function generateWrapJs(compName: string, config: CompConfig) {
  if (!compName) {
    return undefined;
  }
  return (
    "{{" + (config.exposingValueJs ? config.exposingValueJs(compName) : compName + ".value") + "}}"
  );
}
