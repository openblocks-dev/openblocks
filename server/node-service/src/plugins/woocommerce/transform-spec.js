/**
 * The origin woo OpenApi spec is from https://github.com/gerbrand/WooCommerce-OpenAPI-Client/blob/main/src/main/resources/woocommerce-openapi-3.0.x.yml. Thanks.
 * Current script is used to transform it to a more useable OpenApi spec, such as:
 * - Add readable summary
 * - Add tags
 */
const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const spec = require("./origin-spec.json");

const ret = {
  ...spec,
  paths: {},
  tags: [],
};

const predefinedOperationSummaries = [
  {
    method: "post",
    path: "/coupons/batch",
    summary: "Batch update coupons",
  },
  {
    method: "get",
    path: "/system_status",
    summary: "Get system status",
  },
];

const operationsToRemove = [
  {
    method: "post",
    path: "/shipping/zones/{zone_id}/methods/{instance_id}",
  },
];

const words = {
  class: "classes",
  country: "countries",
  tax: "taxes",
  system_status: "system_status",
  currency: "currencies",
};

function trimEnds(str) {
  const word = Object.entries(words).find(([, v]) => v === str)?.[0];
  if (word) {
    return word;
  }
  return _.trimEnd(str, "s");
}

function appendEnds(str) {
  if (words[str]) {
    return words[str];
  }
  return str + "s";
}

function autoGenSummary(method, path, tag) {
  const m = method.toLowerCase();
  const parts = path.split("/").filter((i) => !!i);
  const hasId = parts.includes("{id}");
  const partsWithoutParams = parts.filter((i) => !i.startsWith("{")).map((i) => trimEnds(i));
  const verbs = {
    get: "Get",
    post: "Create",
    put: "Update",
    delete: "Delete",
  };

  let object = "";
  if (partsWithoutParams.length > 0) {
    object = partsWithoutParams[partsWithoutParams.length - 1];
  }

  let middle = "";
  if (partsWithoutParams.length > 1) {
    middle = partsWithoutParams
      .slice(0, partsWithoutParams.length - 1)
      .filter((i) => !!i)
      .join(" ");
  }

  let verb = `${verbs[m]} a`;

  if (!hasId && m === "get") {
    verb = "List all";
    object = appendEnds(object);
  }

  return `${verb} ${middle} ${object}`;
}

Object.entries(spec.paths).forEach(([path, pathObj]) => {
  const [, tag] = path.split("/");
  const tagName = _.upperFirst(tag);
  const tagObj = { name: tagName };
  if (tagName && !ret.tags.find((i) => i.name === tagName)) {
    ret.tags.push(tagObj);
  }
  ret.paths[path] = {
    ...Object.fromEntries(
      Object.entries(pathObj)
        .filter(([k]) => {
          if (path === "/") {
            return false;
          }
          const m = k.toLowerCase();
          if (operationsToRemove.find((i) => i.method === m && i.path === path)) {
            return false;
          }
          const s = predefinedOperationSummaries.find((i) => i.method === m && i.path === path);
          if (s) {
            return true;
          }
          return m !== "patch" && !(path.includes("{id}") && m === "post");
        })
        .map(([k, v]) => {
          const predefinedOperationSummary = predefinedOperationSummaries.find(
            (i) => i.method === k.toLowerCase() && i.path === path
          );
          return [
            k,
            {
              ...v,
              summary: predefinedOperationSummary?.summary || autoGenSummary(k, path, tagName),
              tags: [tagName],
            },
          ];
        })
    ),
  };
});

fs.writeFileSync(path.join(__dirname, `woocommerce-spec.json`), JSON.stringify(ret, null, 2));
