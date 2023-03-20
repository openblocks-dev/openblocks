/**
 * libs to import as global var
 * name: module name
 * mergeDefaultAndNameExports: whether to merge default and named exports
 */
export const libs = [
  "axios",
  "redux",
  "react-router",
  "react-router-dom",
  "react-redux",
  "react",
  "react-dom",
  "lodash",
  "history",
  "antd",
  "@dnd-kit/core",
  "@dnd-kit/modifiers",
  "@dnd-kit/sortable",
  "@dnd-kit/utilities",
  {
    name: "moment",
    extractDefault: true,
  },
  {
    name: "openblocks-sdk",
    from: "./src/index.sdk.ts",
  },
  {
    name: "styled-components",
    mergeDefaultAndNameExports: true,
  },
];

/**
 * get global var name from module name
 * @param {string} name
 * @returns
 */
export const getLibGlobalVarName = (name) => {
  return "$" + name.replace(/@/g, "$").replace(/[\/\-]/g, "_");
};

export const getLibNames = () => {
  return libs.map((i) => {
    if (typeof i === "object") {
      return i.name;
    }
    return i;
  });
};

export const getAllLibGlobalVarNames = () => {
  const ret = {};
  libs.forEach((lib) => {
    let name = lib;
    if (typeof lib === "object") {
      name = lib.name;
    }
    ret[name] = getLibGlobalVarName(name);
  });
  return ret;
};

export const libsImportCode = (exclude = []) => {
  const importLines = [];
  const assignLines = [];
  libs.forEach((i) => {
    let name = i;
    let merge = false;
    let from = name;
    let extractDefault = false;

    if (typeof i === "object") {
      name = i.name;
      merge = i.mergeDefaultAndNameExports ?? false;
      from = i.from ?? name;
      extractDefault = i.extractDefault ?? false;
    }

    if (exclude.includes(name)) {
      return;
    }

    const varName = getLibGlobalVarName(name);
    if (merge) {
      importLines.push(`import * as ${varName}_named_exports from '${from}';`);
      importLines.push(`import ${varName} from '${from}';`);
      assignLines.push(`Object.assign(${varName}, ${varName}_named_exports);`);
    } else if (extractDefault) {
      importLines.push(`import ${varName} from '${from}';`);
    } else {
      importLines.push(`import * as ${varName} from '${from}';`);
    }
    assignLines.push(`window.${varName} = ${varName};`);
  });
  return importLines.concat(assignLines).join("\n");
};
