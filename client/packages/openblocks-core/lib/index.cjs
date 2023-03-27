'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');
var stylis = require('stylis');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function isEqualArgs(args, cacheArgs, equals) {
    if (!cacheArgs) {
        return false;
    }
    if (args.length === 0 && cacheArgs.length === 0) {
        return true;
    }
    return (args.length === cacheArgs.length &&
        cacheArgs.every(function (arg, index) { var _a, _b; return (_b = (_a = equals === null || equals === void 0 ? void 0 : equals[index]) === null || _a === void 0 ? void 0 : _a.call(equals, arg, args[index])) !== null && _b !== void 0 ? _b : arg === args[index]; }));
}
function getCacheResult(thisObj, fnName, args, equals) {
    var _a;
    var cache = (_a = thisObj === null || thisObj === void 0 ? void 0 : thisObj.__cache) === null || _a === void 0 ? void 0 : _a[fnName];
    if (cache && isEqualArgs(args, cache.args, equals)) {
        return cache.result;
    }
}
function cache(fn, args, thisObj, fnName, equals) {
    var result = getCacheResult(thisObj, fnName, args, equals);
    if (result) {
        return result.value;
    }
    var cache = {
        id: Symbol("id"),
        args: args,
        time: Date.now(),
    };
    if (!thisObj.__cache) {
        thisObj.__cache = {};
    }
    thisObj.__cache[fnName] = cache;
    var value = fn.apply(thisObj, args);
    cache.result = { value: value };
    return value;
}
function memoized(equals) {
    return function (target, fnName, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return cache(fn, args, this, fnName, equals);
        };
        return descriptor;
    };
}

var COST_MS_PRINT_THR = 0;
var RecursivePerfUtil = /** @class */ (function () {
    function RecursivePerfUtil() {
        var _this = this;
        this.root = Symbol("root");
        this.stack = [];
        this.initRecord = function () {
            return { obj: _this.root, name: "@root", childrenPerfInfo: [], costMs: 0, depth: 0, info: {} };
        };
        this.getRecordByStack = function (stack) {
            var curRecord = _this.record;
            (stack !== null && stack !== void 0 ? stack : _this.stack).forEach(function (idx) {
                curRecord = curRecord.childrenPerfInfo[idx];
            });
            return curRecord;
        };
        this.clear = function () {
            _this.record = _this.initRecord();
        };
        this.print = function (stack, cost_ms_print_thr) {
            if (cost_ms_print_thr === void 0) { cost_ms_print_thr = COST_MS_PRINT_THR; }
            var record = _this.getRecordByStack(stack);
            console.info("~~ PerfInfo. costMs: ".concat(record.costMs.toFixed(3), ", stack: ").concat(stack, ", [name]").concat(record.name, ", [info]"), record.info, ", obj: ", record.obj, ", depth: ".concat(record.depth, ", size: ").concat(___default["default"].size(record.childrenPerfInfo)));
            record.childrenPerfInfo.forEach(function (subRecord, idx) {
                if (subRecord.costMs >= cost_ms_print_thr) {
                    console.info("  costMs: ".concat(subRecord.costMs.toFixed(3), " [").concat(idx, "]").concat(subRecord.name, " [info]"), subRecord.info, ". obj: ", subRecord.obj, "");
                }
            });
        };
        this.record = this.initRecord();
    }
    RecursivePerfUtil.prototype.log = function (info, key, log) {
        info[key] = log;
    };
    RecursivePerfUtil.prototype.perf = function (obj, name, fn) {
        {
            return fn(___default["default"].noop);
        }
    };
    return RecursivePerfUtil;
}());
var evalPerfUtil = new RecursivePerfUtil();
// @ts-ignore
globalThis.evalPerfUtil = evalPerfUtil;

var AbstractNode = /** @class */ (function () {
    function AbstractNode() {
        this.type = "abstract";
        this.evalCache = {};
    }
    AbstractNode.prototype.evaluate = function (exposingNodes, methods) {
        var _this = this;
        return evalPerfUtil.perf(this, "eval", function () {
            exposingNodes = exposingNodes !== null && exposingNodes !== void 0 ? exposingNodes : {};
            var dependingNodeMap = _this.filterNodes(exposingNodes);
            // use cache when equals to the last dependingNodeMap
            if (dependingNodeMapEquals(_this.evalCache.dependingNodeMap, dependingNodeMap)) {
                return _this.evalCache.value;
            }
            // initialize cyclic field
            _this.evalCache.cyclic = false;
            var result = _this.justEval(exposingNodes, methods);
            // write cache
            _this.evalCache.dependingNodeMap = dependingNodeMap;
            _this.evalCache.value = result;
            if (!_this.evalCache.cyclic) {
                // check children cyclic
                _this.evalCache.cyclic = _this.getChildren().some(function (node) { return node.hasCycle(); });
            }
            return result;
        });
    };
    AbstractNode.prototype.hasCycle = function () {
        var _a;
        return (_a = this.evalCache.cyclic) !== null && _a !== void 0 ? _a : false;
    };
    AbstractNode.prototype.dependNames = function () {
        return Object.keys(this.dependValues());
    };
    AbstractNode.prototype.isHitEvalCache = function (exposingNodes) {
        exposingNodes = exposingNodes !== null && exposingNodes !== void 0 ? exposingNodes : {};
        var dependingNodeMap = this.filterNodes(exposingNodes);
        return dependingNodeMapEquals(this.evalCache.dependingNodeMap, dependingNodeMap);
    };
    return AbstractNode;
}());
/**
 * transform WrapNode in dependingNodeMap to actual node.
 * since WrapNode is dynamically constructed in eval process, its reference always changes.
 */
function unWrapDependingNodeMap(depMap) {
    var nextMap = new Map();
    depMap.forEach(function (p, n) {
        if (n.type === "wrap") {
            nextMap.set(n.delegate, p);
        }
        else {
            nextMap.set(n, p);
        }
    });
    return nextMap;
}
function setEquals(s1, s2) {
    return s2 !== undefined && s1.size === s2.size && Array.from(s2).every(function (v) { return s1.has(v); });
}
/**
 * check whether 2 dependingNodeMaps are equal
 * - Node use "===" to check
 * - string[] use deep compare to check
 *
 * @param dependingNodeMap1 first dependingNodeMap
 * @param dependingNodeMap2 second dependingNodeMap
 * @returns whether equals
 */
function dependingNodeMapEquals(dependingNodeMap1, dependingNodeMap2) {
    if (!dependingNodeMap1 || dependingNodeMap1.size !== dependingNodeMap2.size) {
        return false;
    }
    var map1 = unWrapDependingNodeMap(dependingNodeMap1);
    var map2 = unWrapDependingNodeMap(dependingNodeMap2);
    var result = true;
    map2.forEach(function (paths, node) {
        result = result && setEquals(paths, map1.get(node));
    });
    return result;
}

/**
 * return a new node, evaluating to a function result with the input node value as the function's input
 */
var FunctionNode = /** @class */ (function (_super) {
    __extends(FunctionNode, _super);
    function FunctionNode(child, func) {
        var _this = _super.call(this) || this;
        _this.child = child;
        _this.func = func;
        _this.type = "function";
        return _this;
    }
    FunctionNode.prototype.filterNodes = function (exposingNodes) {
        var _this = this;
        return evalPerfUtil.perf(this, "filterNodes", function () {
            return _this.child.filterNodes(exposingNodes);
        });
    };
    FunctionNode.prototype.justEval = function (exposingNodes, methods) {
        return this.func(this.child.evaluate(exposingNodes, methods));
    };
    FunctionNode.prototype.getChildren = function () {
        return [this.child];
    };
    FunctionNode.prototype.dependValues = function () {
        return this.child.dependValues();
    };
    FunctionNode.prototype.fetchInfo = function (exposingNodes, options) {
        return this.child.fetchInfo(exposingNodes, options);
    };
    __decorate([
        memoized()
    ], FunctionNode.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], FunctionNode.prototype, "fetchInfo", null);
    return FunctionNode;
}(AbstractNode));
function withFunction(child, func) {
    return new FunctionNode(child, func);
}

function addDepend(target, node, paths) {
    if (!node) {
        return;
    }
    var value = target.get(node);
    if (value === undefined) {
        value = new Set();
        target.set(node, value);
    }
    paths.forEach(function (p) { return value === null || value === void 0 ? void 0 : value.add(p); });
}
function addDepends(target, source) {
    source === null || source === void 0 ? void 0 : source.forEach(function (paths, node) { return addDepend(target, node, paths); });
    return target;
}

/**
 * the evaluated value is the record constructed by the children nodes
 */
var RecordNode = /** @class */ (function (_super) {
    __extends(RecordNode, _super);
    function RecordNode(children) {
        var _this = _super.call(this) || this;
        _this.children = children;
        _this.type = "record";
        return _this;
    }
    RecordNode.prototype.filterNodes = function (exposingNodes) {
        var _this = this;
        return evalPerfUtil.perf(this, "filterNodes", function () {
            var result = new Map();
            Object.values(_this.children).forEach(function (node) {
                addDepends(result, node.filterNodes(exposingNodes));
            });
            return result;
        });
    };
    RecordNode.prototype.justEval = function (exposingNodes, methods) {
        var _this = this;
        return ___default["default"].mapValues(this.children, function (v, key) {
            return evalPerfUtil.perf(_this, "eval-".concat(key), function () { return v.evaluate(exposingNodes, methods); });
        });
    };
    RecordNode.prototype.getChildren = function () {
        return Object.values(this.children);
    };
    RecordNode.prototype.dependValues = function () {
        var nodes = Object.values(this.children);
        if (nodes.length === 1) {
            return nodes[0].dependValues();
        }
        var ret = {};
        nodes.forEach(function (node) {
            Object.entries(node.dependValues()).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                ret[key] = value;
            });
        });
        return ret;
    };
    RecordNode.prototype.fetchInfo = function (exposingNodes, options) {
        var isFetching = false;
        var ready = true;
        Object.entries(this.children).forEach(function (_a) {
            _a[0]; var child = _a[1];
            var fi = child.fetchInfo(exposingNodes, options);
            isFetching = fi.isFetching || isFetching;
            ready = fi.ready && ready;
        });
        return { isFetching: isFetching, ready: ready };
    };
    __decorate([
        memoized()
    ], RecordNode.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], RecordNode.prototype, "fetchInfo", null);
    return RecordNode;
}(AbstractNode));
function fromRecord(record) {
    return new RecordNode(record);
}

var CachedNode = /** @class */ (function (_super) {
    __extends(CachedNode, _super);
    function CachedNode(child) {
        var _this = _super.call(this) || this;
        _this.type = "cached";
        _this.child = withEvalCache(child);
        return _this;
    }
    CachedNode.prototype.filterNodes = function (exposingNodes) {
        return this.child.filterNodes(exposingNodes);
    };
    CachedNode.prototype.justEval = function (exposingNodes, methods) {
        var isCached = this.child.isHitEvalCache(exposingNodes); // isCached must be set before evaluate() call
        var value = this.child.evaluate(exposingNodes, methods);
        return { value: value, isCached: isCached };
    };
    CachedNode.prototype.getChildren = function () {
        return [this.child];
    };
    CachedNode.prototype.dependValues = function () {
        return this.child.dependValues();
    };
    CachedNode.prototype.fetchInfo = function (exposingNodes) {
        return this.child.fetchInfo(exposingNodes);
    };
    __decorate([
        memoized()
    ], CachedNode.prototype, "filterNodes", null);
    return CachedNode;
}(AbstractNode));
function withEvalCache(node) {
    var newNode = withFunction(node, function (x) { return x; });
    newNode.evalCache = __assign({}, node.evalCache);
    return newNode;
}
/**
 * return a new node with two input nodes.
 * - if mainNode is never evaled, then (new node).evaluate equals to mainNode.evaluate
 * - if mainNode is evaled, then (new node).evaluate equals to minorNode.evaluate
 *
 * @remarks
 * encapsulation logic: 2 nodes -> CachedNode(mainNode)+minorNode -> RecordNode({main, minor}) -> FunctionNode
 *
 * @warn improper use may cause unexpected behaviour, be careful.
 * @param mainNode mainNode
 * @param minorNode minorNode
 * @returns the new node
 */
function evalNodeOrMinor(mainNode, minorNode) {
    var nodeRecord = { main: new CachedNode(mainNode), minor: minorNode };
    return new FunctionNode(new RecordNode(nodeRecord), function (record) {
        var mainCachedValue = record.main;
        if (!mainCachedValue.isCached) {
            return mainCachedValue.value;
        }
        return record.minor;
    });
}

function toReadableString(value) {
    if (value instanceof RegExp) {
        return value.toString();
    }
    // fix undefined NaN Infinity -Infinity
    if (value === undefined || typeof value === "number") {
        return value + "";
    }
    if (typeof value === "string") {
        // without escaping char
        return '"' + value + '"';
    }
    // FIXME: correctly show `undefined NaN Infinity -Infinity` inside Object, they are within quotes currently
    return JSON.stringify(value, function (key, val) {
        switch (typeof val) {
            case "function":
            case "bigint":
            case "symbol":
            case "undefined":
                return val + "";
            case "number":
                if (!isFinite(val)) {
                    return val + "";
                }
        }
        return val;
    });
}

var ValueAndMsg = /** @class */ (function () {
    function ValueAndMsg(value, msg, extra, midValue) {
        this.value = value;
        this.msg = msg;
        this.extra = extra;
        this.midValue = midValue;
    }
    ValueAndMsg.prototype.hasError = function () {
        return this.msg !== undefined;
    };
    ValueAndMsg.prototype.getMsg = function (displayValueFn) {
        var _a;
        if (displayValueFn === void 0) { displayValueFn = toReadableString; }
        return (_a = (this.hasError() ? this.msg : displayValueFn(this.value))) !== null && _a !== void 0 ? _a : "";
    };
    return ValueAndMsg;
}());

function dependsErrorMessage(node) {
    return "DependencyError: \"".concat(node.unevaledValue, "\" caused a cyclic dependency.");
}
function getErrorMessage(err) {
    // todo try to use 'err instanceof EvalTypeError' instead
    if (err instanceof TypeError && err.hint) {
        return err.hint + "\n" + err.name + ": " + err.message;
    }
    return err instanceof Error
        ? err.name + ": " + err.message
        : "UnknownError: unknown exception during eval";
}
function mergeNodesWithSameName(map) {
    var nameDepMap = {};
    map.forEach(function (paths, node) {
        paths.forEach(function (p) {
            var path = p.split(".");
            var dep = genDepends(path, node);
            var name = path[0];
            var newDep = mergeNode(nameDepMap[name], dep);
            nameDepMap[name] = newDep;
        });
    });
    return nameDepMap;
}
function genDepends(path, node) {
    var _a;
    if (path.length <= 0) {
        throw new Error("path length should not be 0");
    }
    if (path.length === 1) {
        return node;
    }
    return genDepends(path.slice(0, -1), fromRecord((_a = {}, _a[path[path.length - 1]] = node, _a)));
}
// node2 mostly has one path
function mergeNode(node1, node2) {
    if (!node1 || node1 === node2) {
        return node2;
    }
    if (!nodeIsRecord(node1) || !nodeIsRecord(node2)) {
        throw new Error("unevaledNode should be type of RecordNode");
    }
    var record1 = node1.children;
    var record2 = node2.children;
    var record = __assign({}, record1);
    Object.keys(record2).forEach(function (name) {
        var subNode1 = record1[name];
        var subNode2 = record2[name];
        var subNode = subNode1 ? mergeNode(subNode1, subNode2) : subNode2;
        record[name] = subNode;
    });
    return fromRecord(record);
}
function nodeIsRecord(node) {
    return node.type === "record";
}

var DYNAMIC_SEGMENT_REGEX = /{{([\s\S]*?)}}/;
function isDynamicSegment(segment) {
    return DYNAMIC_SEGMENT_REGEX.test(segment);
}
function getDynamicStringSegments(input) {
    var segments = [];
    var position = 0;
    var start = input.indexOf("{{");
    while (start >= 0) {
        var i = start + 2;
        while (i < input.length && input[i] === "{")
            i++;
        var end = input.indexOf("}}", i);
        if (end < 0) {
            break;
        }
        var nextStart = input.indexOf("{{", end + 2);
        var maxIndex = nextStart >= 0 ? nextStart : input.length;
        var maxStartOffset = i - start - 2;
        var sum = i - start;
        var minValue = Number.MAX_VALUE;
        var minOffset = Number.MAX_VALUE;
        for (; i < maxIndex; i++) {
            switch (input[i]) {
                case "{":
                    sum++;
                    break;
                case "}":
                    sum--;
                    if (input[i - 1] === "}") {
                        var offset = Math.min(Math.max(sum, 0), maxStartOffset);
                        var value = Math.abs(sum - offset);
                        if (value < minValue || (value === minValue && offset < minOffset)) {
                            minValue = value;
                            minOffset = offset;
                            end = i + 1;
                        }
                    }
                    break;
            }
        }
        segments.push(input.slice(position, start + minOffset), input.slice(start + minOffset, end));
        position = end;
        start = nextStart;
    }
    segments.push(input.slice(position));
    return segments.filter(function (t) { return t; });
}

function filterDepends(unevaledValue, exposingNodes, maxDepth) {
    var ret = new Map();
    for (var _i = 0, _a = getDynamicStringSegments(unevaledValue); _i < _a.length; _i++) {
        var segment = _a[_i];
        if (isDynamicSegment(segment)) {
            addDepends(ret, parseDepends(segment.slice(2, -2), exposingNodes, maxDepth));
        }
    }
    return ret;
}
function hasCycle(segment, exposingNodes) {
    if (!isDynamicSegment(segment)) {
        return false;
    }
    var ret = false;
    parseDepends(segment.slice(2, -2), exposingNodes).forEach(function (paths, node) {
        ret = ret || node.hasCycle();
    });
    return ret;
}
function changeDependName(unevaledValue, oldName, name, isFunction) {
    if (!unevaledValue || !oldName || !name) {
        return unevaledValue;
    }
    if (isFunction) {
        return rename(unevaledValue, oldName, name);
    }
    return getDynamicStringSegments(unevaledValue)
        .map(function (segment) {
        if (!isDynamicSegment(segment)) {
            return segment;
        }
        return rename(segment, oldName, name);
    })
        .join("");
}
function rename(segment, oldName, name) {
    var accessors = [".", "["];
    var regStrList = ["[a-zA-Z_$][a-zA-Z_$0-9.[\\]]*", "\\[[a-zA-Z_][a-zA-Z_0-9.]*"];
    var ret = segment;
    for (var _i = 0, regStrList_1 = regStrList; _i < regStrList_1.length; _i++) {
        var regStr = regStrList_1[_i];
        var reg = new RegExp(regStr, "g");
        ret = ret.replace(reg, function (s) {
            if (s === oldName) {
                return name;
            }
            var origin = oldName;
            var target = name;
            var matched = false;
            if (s.startsWith("[".concat(origin))) {
                origin = "[".concat(origin);
                target = "[".concat(name);
                matched = true;
            }
            for (var _i = 0, accessors_1 = accessors; _i < accessors_1.length; _i++) {
                var accessor = accessors_1[_i];
                if (s.startsWith(origin + accessor)) {
                    matched = true;
                    target = target + accessor + s.substring(origin.length + accessor.length);
                    break;
                }
            }
            if (matched) {
                return target;
            }
            return s;
        });
    }
    return ret;
}
function getIdentifiers(jsSnippet) {
    var ret = [];
    var commonReg = /[a-zA-Z_$][a-zA-Z_$0-9.[\]]*/g;
    var commonIds = jsSnippet.match(commonReg);
    if (commonIds) {
        ret.push.apply(ret, commonIds);
    }
    var indexIds = [];
    (jsSnippet.match(/\[[a-zA-Z_][a-zA-Z_0-9\[\].]*\]/g) || []).forEach(function (i) {
        indexIds.push.apply(indexIds, getIdentifiers(i.slice(1, -1)));
    });
    ret.push.apply(ret, indexIds);
    if (ret.length === 0) {
        return [jsSnippet];
    }
    return ret;
}
function parseDepends(jsSnippet, exposingNodes, maxDepth) {
    var depends = new Map();
    var identifiers = getIdentifiers(jsSnippet);
    identifiers.forEach(function (identifier) {
        var subpaths = ___default["default"].toPath(identifier);
        var depend = getDependNode(maxDepth ? subpaths.slice(0, maxDepth) : subpaths, exposingNodes);
        if (depend) {
            addDepend(depends, depend[0], [depend[1]]);
        }
    });
    return depends;
}
function getDependNode(subPaths, exposingNodes) {
    if (subPaths.length <= 0) {
        return undefined;
    }
    var nodes = exposingNodes;
    var node = undefined;
    var path = [];
    for (var _i = 0, subPaths_1 = subPaths; _i < subPaths_1.length; _i++) {
        var subPath = subPaths_1[_i];
        var subNode = nodes[subPath];
        if (!nodes.hasOwnProperty(subPath) || !subNode) {
            break;
        }
        node = subNode;
        path.push(subPath);
        if (!nodeIsRecord(node)) {
            break;
        }
        nodes = node.children;
    }
    return node ? [node, path.join(".")] : undefined;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var loglevel = {exports: {}};

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/

(function (module) {
	(function (root, definition) {
	    if (module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(commonjsGlobal, function () {

	    // Slightly dubious tricks to cut down minimized file size
	    var noop = function() {};
	    var undefinedType = "undefined";
	    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
	        /Trident\/|MSIE /.test(window.navigator.userAgent)
	    );

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    // Cross-browser bind equivalent that works at least back to IE6
	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // Trace() doesn't print the message in IE, so for that case we need to wrap it
	    function traceForIE() {
	        if (console.log) {
	            if (console.log.apply) {
	                console.log.apply(console, arguments);
	            } else {
	                // In old IE, native console methods themselves don't have apply().
	                Function.prototype.apply.apply(console.log, [console, arguments]);
	            }
	        }
	        if (console.trace) console.trace();
	    }

	    // Build the best logging method possible for this env
	    // Wherever possible we want to bind, not wrap, to preserve stack traces
	    function realMethod(methodName) {
	        if (methodName === 'debug') {
	            methodName = 'log';
	        }

	        if (typeof console === undefinedType) {
	            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
	        } else if (methodName === 'trace' && isIE) {
	            return traceForIE;
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    // These private functions always need `this` to be set properly

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }

	        // Define log.log as an alias for log.debug
	        this.log = this.debug;
	    }

	    // In old IE versions, the console isn't present until you first open it.
	    // We build realMethod() replacements here that regenerate logging methods
	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    // By default, we use closely bound real methods wherever possible, and
	    // otherwise we wait for a console to appear, and then try again.
	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

	      var storageKey = "loglevel";
	      if (typeof name === "string") {
	        storageKey += ":" + name;
	      } else if (typeof name === "symbol") {
	        storageKey = undefined;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          if (typeof window === undefinedType || !storageKey) return;

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          if (typeof window === undefinedType || !storageKey) return;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          // Fallback to cookies if local storage gives us nothing
	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location !== -1) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      function clearPersistedLevel() {
	          if (typeof window === undefinedType || !storageKey) return;

	          // Use localStorage if available
	          try {
	              window.localStorage.removeItem(storageKey);
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	          } catch (ignore) {}
	      }

	      /*
	       *
	       * Public logger API - see https://github.com/pimterry/loglevel for details
	       *
	       */

	      self.name = name;

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          defaultLevel = level;
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.resetLevel = function () {
	          self.setLevel(defaultLevel, false);
	          clearPersistedLevel();
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Top-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    defaultLogger.getLoggers = function getLoggers() {
	        return _loggersByName;
	    };

	    // ES6 default export, for compatibility
	    defaultLogger['default'] = defaultLogger;

	    return defaultLogger;
	}));
} (loglevel));

var log = loglevel.exports;

// global variables black list, forbidden to use in for jsQuery/jsAction
var functionBlacklist = new Set([
    "top",
    "parent",
    "document",
    "location",
    "chrome",
    "fetch",
    "XMLHttpRequest",
    "importScripts",
    "Navigator",
    "MutationObserver",
]);
var expressionBlacklist = new Set(__spreadArray(__spreadArray([], Array.from(functionBlacklist.values()), true), [
    "setTimeout",
    "setInterval",
    "setImmediate",
], false));
var globalVarNames = new Set(["window", "globalThis", "self", "global"]);
function createBlackHole() {
    return new Proxy(function () {
        return createBlackHole();
    }, {
        get: function (t, p, r) {
            if (p === "toString") {
                return function () {
                    return "";
                };
            }
            if (p === Symbol.toPrimitive) {
                return function () {
                    return "";
                };
            }
            log.log("[Sandbox] access ".concat(String(p), " on black hole, return mock object"));
            return createBlackHole();
        },
    });
}
function createMockWindow(base, blacklist, onSet, disableLimit) {
    if (blacklist === void 0) { blacklist = expressionBlacklist; }
    var win = new Proxy(Object.assign({}, base), {
        has: function () {
            return true;
        },
        set: function (target, p, newValue) {
            if (typeof p === "string") {
                onSet === null || onSet === void 0 ? void 0 : onSet(p);
            }
            return Reflect.set(target, p, newValue);
        },
        get: function (target, p) {
            if (p in target) {
                return Reflect.get(target, p);
            }
            if (globalVarNames.has(p)) {
                return win;
            }
            if (typeof p === "string" && (blacklist === null || blacklist === void 0 ? void 0 : blacklist.has(p)) && !disableLimit) {
                log.log("[Sandbox] access ".concat(String(p), " on mock window, return mock object"));
                return createBlackHole();
            }
            return getPropertyFromNativeWindow(p);
        },
    });
    return win;
}
var mockWindow;
var currentDisableLimit = false;
function clearMockWindow() {
    mockWindow = createMockWindow();
}
function isDomElement(obj) {
    return obj instanceof Element || obj instanceof HTMLCollection;
}
function getPropertyFromNativeWindow(prop) {
    var ret = Reflect.get(window, prop);
    if (typeof ret === "function" && !ret.prototype) {
        return ret.bind(window);
    }
    // get DOM element by id, serializing may cause error
    if (isDomElement(ret)) {
        return undefined;
    }
    return ret;
}
function proxySandbox(context, methods, options) {
    var _a = options || {}, _b = _a.disableLimit, disableLimit = _b === void 0 ? false : _b, _c = _a.scope, scope = _c === void 0 ? "expression" : _c, onSetGlobalVars = _a.onSetGlobalVars;
    var isProtectedVar = function (key) {
        return key in context || key in (methods || {}) || globalVarNames.has(key);
    };
    var cache = {};
    var blacklist = scope === "function" ? functionBlacklist : expressionBlacklist;
    if (scope === "function" || !mockWindow || disableLimit !== currentDisableLimit) {
        mockWindow = createMockWindow(mockWindow, blacklist, onSetGlobalVars, disableLimit);
    }
    currentDisableLimit = disableLimit;
    return new Proxy(mockWindow, {
        has: function (target, p) {
            // proxy all variables
            return true;
        },
        get: function (target, p, receiver) {
            if (p === Symbol.unscopables) {
                return undefined;
            }
            if (p === "toJSON") {
                return target;
            }
            if (globalVarNames.has(p)) {
                return target;
            }
            if (p in context) {
                if (p in cache) {
                    return Reflect.get(cache, p);
                }
                var value = Reflect.get(context, p, receiver);
                if (typeof value === "object" && value !== null) {
                    if (methods && p in methods) {
                        value = Object.assign({}, value, Reflect.get(methods, p));
                    }
                    Object.freeze(value);
                    Object.values(value).forEach(Object.freeze);
                }
                Reflect.set(cache, p, value);
                return value;
            }
            if (disableLimit) {
                return getPropertyFromNativeWindow(p);
            }
            return Reflect.get(target, p, receiver);
        },
        set: function (target, p, value, receiver) {
            if (isProtectedVar(p)) {
                throw new Error(p.toString() + " can't be modified");
            }
            return Reflect.set(target, p, value, receiver);
        },
        defineProperty: function (target, p, attributes) {
            if (isProtectedVar(p)) {
                throw new Error("can't define property:" + p.toString());
            }
            return Reflect.defineProperty(target, p, attributes);
        },
        deleteProperty: function (target, p) {
            if (isProtectedVar(p)) {
                throw new Error("can't delete property:" + p.toString());
            }
            return Reflect.deleteProperty(target, p);
        },
        setPrototypeOf: function (target, v) {
            throw new Error("can't invoke setPrototypeOf");
        },
    });
}
function evalScript(script, context, methods) {
    return evalFunc("return (".concat(script, "\n);"), context, methods);
}
function evalFunc(functionBody, context, methods, options, isAsync) {
    var code = "with(this){\n    return (".concat(isAsync ? "async " : "", "function() {\n      'use strict';\n      ").concat(functionBody, ";\n    }).call(this);\n  }");
    // eslint-disable-next-line no-new-func
    var vm = new Function(code);
    var sandbox = proxySandbox(context, methods, options);
    var result = vm.call(sandbox);
    return result;
}

var src = {exports: {}};

var umd_bundle = {exports: {}};

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018-2021 TwelveTone LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (module, exports) {
	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){return t={421:function(t,e){var n,r;void 0===(r="function"==typeof(n=function(t){var e=t;t.isBooleanArray=function(t){return (Array.isArray(t)||t instanceof Int8Array)&&"BooleanArray"===t.$type$},t.isByteArray=function(t){return t instanceof Int8Array&&"BooleanArray"!==t.$type$},t.isShortArray=function(t){return t instanceof Int16Array},t.isCharArray=function(t){return t instanceof Uint16Array&&"CharArray"===t.$type$},t.isIntArray=function(t){return t instanceof Int32Array},t.isFloatArray=function(t){return t instanceof Float32Array},t.isDoubleArray=function(t){return t instanceof Float64Array},t.isLongArray=function(t){return Array.isArray(t)&&"LongArray"===t.$type$},t.isArray=function(t){return Array.isArray(t)&&!t.$type$},t.isArrayish=function(t){return Array.isArray(t)||ArrayBuffer.isView(t)},t.arrayToString=function(e){if(null===e)return "null";var n=t.isCharArray(e)?String.fromCharCode:t.toString;return "["+Array.prototype.map.call(e,(function(t){return n(t)})).join(", ")+"]"},t.toByte=function(t){return (255&t)<<24>>24},t.toChar=function(t){return 65535&t},t.toBoxedChar=function(e){return null==e||e instanceof t.BoxedChar?e:new t.BoxedChar(e)},t.unboxChar=function(e){return null==e?e:t.toChar(e)},t.equals=function(t,e){return null==t?null==e:null!=e&&(t!=t?e!=e:"object"==typeof t&&"function"==typeof t.equals?t.equals(e):"number"==typeof t&&"number"==typeof e?t===e&&(0!==t||1/t==1/e):t===e)},t.hashCode=function(e){if(null==e)return 0;var n=typeof e;return "object"===n?"function"==typeof e.hashCode?e.hashCode():c(e):"function"===n?c(e):"number"===n?t.numberHashCode(e):"boolean"===n?Number(e):function(t){for(var e=0,n=0;n<t.length;n++)e=31*e+t.charCodeAt(n)|0;return e}(String(e))},t.toString=function(e){return null==e?"null":t.isArrayish(e)?"[...]":e.toString()};var n,r,i,o,a,s,u,p="kotlinHashCodeValue$";function c(t){if(!(p in t)){var e=4294967296*Math.random()|0;Object.defineProperty(t,p,{value:e,enumerable:!1});}return t.kotlinHashCodeValue$}function l(){throw new Error("This marker function should never been called. Looks like compiler did not eliminate it properly. Please, report an issue if you caught this exception.")}function h(t,e){return (4294901760&t)*(65535&e)+(65535&t)*(0|e)|0}function f(t,e){if(t===e)return !0;var n=t.$metadata$;if(null!=n)for(var r=n.interfaces,i=0;i<r.length;i++)if(f(r[i],e))return !0;var o=null!=t.prototype?Object.getPrototypeOf(t.prototype):null,a=null!=o?o.constructor:null;return null!=a&&f(a,e)}t.identityHashCode=c,t.Long=function(t,e){this.low_=0|t,this.high_=0|e;},t.Long.$metadata$={kind:"class",simpleName:"Long",interfaces:[]},t.Long.IntCache_={},t.Long.fromInt=function(e){if(-128<=e&&e<128){var n=t.Long.IntCache_[e];if(n)return n}var r=new t.Long(0|e,e<0?-1:0);return -128<=e&&e<128&&(t.Long.IntCache_[e]=r),r},t.Long.fromNumber=function(e){return isNaN(e)?t.Long.ZERO:e<=-t.Long.TWO_PWR_63_DBL_?t.Long.MIN_VALUE:e+1>=t.Long.TWO_PWR_63_DBL_?t.Long.MAX_VALUE:e<0?t.Long.fromNumber(-e).negate():new t.Long(e%t.Long.TWO_PWR_32_DBL_|0,e/t.Long.TWO_PWR_32_DBL_|0)},t.Long.fromBits=function(e,n){return new t.Long(e,n)},t.Long.fromString=function(e,n){if(0==e.length)throw Error("number format error: empty string");var r=n||10;if(r<2||36<r)throw Error("radix out of range: "+r);if("-"==e.charAt(0))return t.Long.fromString(e.substring(1),r).negate();if(e.indexOf("-")>=0)throw Error('number format error: interior "-" character: '+e);for(var i=t.Long.fromNumber(Math.pow(r,8)),o=t.Long.ZERO,a=0;a<e.length;a+=8){var s=Math.min(8,e.length-a),u=parseInt(e.substring(a,a+s),r);if(s<8){var p=t.Long.fromNumber(Math.pow(r,s));o=o.multiply(p).add(t.Long.fromNumber(u));}else o=(o=o.multiply(i)).add(t.Long.fromNumber(u));}return o},t.Long.TWO_PWR_16_DBL_=65536,t.Long.TWO_PWR_24_DBL_=1<<24,t.Long.TWO_PWR_32_DBL_=t.Long.TWO_PWR_16_DBL_*t.Long.TWO_PWR_16_DBL_,t.Long.TWO_PWR_31_DBL_=t.Long.TWO_PWR_32_DBL_/2,t.Long.TWO_PWR_48_DBL_=t.Long.TWO_PWR_32_DBL_*t.Long.TWO_PWR_16_DBL_,t.Long.TWO_PWR_64_DBL_=t.Long.TWO_PWR_32_DBL_*t.Long.TWO_PWR_32_DBL_,t.Long.TWO_PWR_63_DBL_=t.Long.TWO_PWR_64_DBL_/2,t.Long.ZERO=t.Long.fromInt(0),t.Long.ONE=t.Long.fromInt(1),t.Long.NEG_ONE=t.Long.fromInt(-1),t.Long.MAX_VALUE=t.Long.fromBits(-1,2147483647),t.Long.MIN_VALUE=t.Long.fromBits(0,-2147483648),t.Long.TWO_PWR_24_=t.Long.fromInt(1<<24),t.Long.prototype.toInt=function(){return this.low_},t.Long.prototype.toNumber=function(){return this.high_*t.Long.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()},t.Long.prototype.hashCode=function(){return this.high_^this.low_},t.Long.prototype.toString=function(e){var n=e||10;if(n<2||36<n)throw Error("radix out of range: "+n);if(this.isZero())return "0";if(this.isNegative()){if(this.equalsLong(t.Long.MIN_VALUE)){var r=t.Long.fromNumber(n),i=this.div(r),o=i.multiply(r).subtract(this);return i.toString(n)+o.toInt().toString(n)}return "-"+this.negate().toString(n)}for(var a=t.Long.fromNumber(Math.pow(n,6)),s=(o=this,"");;){var u=o.div(a),p=o.subtract(u.multiply(a)).toInt().toString(n);if((o=u).isZero())return p+s;for(;p.length<6;)p="0"+p;s=""+p+s;}},t.Long.prototype.getHighBits=function(){return this.high_},t.Long.prototype.getLowBits=function(){return this.low_},t.Long.prototype.getLowBitsUnsigned=function(){return this.low_>=0?this.low_:t.Long.TWO_PWR_32_DBL_+this.low_},t.Long.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equalsLong(t.Long.MIN_VALUE)?64:this.negate().getNumBitsAbs();for(var e=0!=this.high_?this.high_:this.low_,n=31;n>0&&0==(e&1<<n);n--);return 0!=this.high_?n+33:n+1},t.Long.prototype.isZero=function(){return 0==this.high_&&0==this.low_},t.Long.prototype.isNegative=function(){return this.high_<0},t.Long.prototype.isOdd=function(){return 1==(1&this.low_)},t.Long.prototype.equalsLong=function(t){return this.high_==t.high_&&this.low_==t.low_},t.Long.prototype.notEqualsLong=function(t){return this.high_!=t.high_||this.low_!=t.low_},t.Long.prototype.lessThan=function(t){return this.compare(t)<0},t.Long.prototype.lessThanOrEqual=function(t){return this.compare(t)<=0},t.Long.prototype.greaterThan=function(t){return this.compare(t)>0},t.Long.prototype.greaterThanOrEqual=function(t){return this.compare(t)>=0},t.Long.prototype.compare=function(t){if(this.equalsLong(t))return 0;var e=this.isNegative(),n=t.isNegative();return e&&!n?-1:!e&&n?1:this.subtract(t).isNegative()?-1:1},t.Long.prototype.negate=function(){return this.equalsLong(t.Long.MIN_VALUE)?t.Long.MIN_VALUE:this.not().add(t.Long.ONE)},t.Long.prototype.add=function(e){var n=this.high_>>>16,r=65535&this.high_,i=this.low_>>>16,o=65535&this.low_,a=e.high_>>>16,s=65535&e.high_,u=e.low_>>>16,p=0,c=0,l=0,h=0;return l+=(h+=o+(65535&e.low_))>>>16,h&=65535,c+=(l+=i+u)>>>16,l&=65535,p+=(c+=r+s)>>>16,c&=65535,p+=n+a,p&=65535,t.Long.fromBits(l<<16|h,p<<16|c)},t.Long.prototype.subtract=function(t){return this.add(t.negate())},t.Long.prototype.multiply=function(e){if(this.isZero())return t.Long.ZERO;if(e.isZero())return t.Long.ZERO;if(this.equalsLong(t.Long.MIN_VALUE))return e.isOdd()?t.Long.MIN_VALUE:t.Long.ZERO;if(e.equalsLong(t.Long.MIN_VALUE))return this.isOdd()?t.Long.MIN_VALUE:t.Long.ZERO;if(this.isNegative())return e.isNegative()?this.negate().multiply(e.negate()):this.negate().multiply(e).negate();if(e.isNegative())return this.multiply(e.negate()).negate();if(this.lessThan(t.Long.TWO_PWR_24_)&&e.lessThan(t.Long.TWO_PWR_24_))return t.Long.fromNumber(this.toNumber()*e.toNumber());var n=this.high_>>>16,r=65535&this.high_,i=this.low_>>>16,o=65535&this.low_,a=e.high_>>>16,s=65535&e.high_,u=e.low_>>>16,p=65535&e.low_,c=0,l=0,h=0,f=0;return h+=(f+=o*p)>>>16,f&=65535,l+=(h+=i*p)>>>16,h&=65535,l+=(h+=o*u)>>>16,h&=65535,c+=(l+=r*p)>>>16,l&=65535,c+=(l+=i*u)>>>16,l&=65535,c+=(l+=o*s)>>>16,l&=65535,c+=n*p+r*u+i*s+o*a,c&=65535,t.Long.fromBits(h<<16|f,c<<16|l)},t.Long.prototype.div=function(e){if(e.isZero())throw Error("division by zero");if(this.isZero())return t.Long.ZERO;if(this.equalsLong(t.Long.MIN_VALUE)){if(e.equalsLong(t.Long.ONE)||e.equalsLong(t.Long.NEG_ONE))return t.Long.MIN_VALUE;if(e.equalsLong(t.Long.MIN_VALUE))return t.Long.ONE;if((i=this.shiftRight(1).div(e).shiftLeft(1)).equalsLong(t.Long.ZERO))return e.isNegative()?t.Long.ONE:t.Long.NEG_ONE;var n=this.subtract(e.multiply(i));return i.add(n.div(e))}if(e.equalsLong(t.Long.MIN_VALUE))return t.Long.ZERO;if(this.isNegative())return e.isNegative()?this.negate().div(e.negate()):this.negate().div(e).negate();if(e.isNegative())return this.div(e.negate()).negate();var r=t.Long.ZERO;for(n=this;n.greaterThanOrEqual(e);){for(var i=Math.max(1,Math.floor(n.toNumber()/e.toNumber())),o=Math.ceil(Math.log(i)/Math.LN2),a=o<=48?1:Math.pow(2,o-48),s=t.Long.fromNumber(i),u=s.multiply(e);u.isNegative()||u.greaterThan(n);)i-=a,u=(s=t.Long.fromNumber(i)).multiply(e);s.isZero()&&(s=t.Long.ONE),r=r.add(s),n=n.subtract(u);}return r},t.Long.prototype.modulo=function(t){return this.subtract(this.div(t).multiply(t))},t.Long.prototype.not=function(){return t.Long.fromBits(~this.low_,~this.high_)},t.Long.prototype.and=function(e){return t.Long.fromBits(this.low_&e.low_,this.high_&e.high_)},t.Long.prototype.or=function(e){return t.Long.fromBits(this.low_|e.low_,this.high_|e.high_)},t.Long.prototype.xor=function(e){return t.Long.fromBits(this.low_^e.low_,this.high_^e.high_)},t.Long.prototype.shiftLeft=function(e){if(0==(e&=63))return this;var n=this.low_;if(e<32){var r=this.high_;return t.Long.fromBits(n<<e,r<<e|n>>>32-e)}return t.Long.fromBits(0,n<<e-32)},t.Long.prototype.shiftRight=function(e){if(0==(e&=63))return this;var n=this.high_;if(e<32){var r=this.low_;return t.Long.fromBits(r>>>e|n<<32-e,n>>e)}return t.Long.fromBits(n>>e-32,n>=0?0:-1)},t.Long.prototype.shiftRightUnsigned=function(e){if(0==(e&=63))return this;var n=this.high_;if(e<32){var r=this.low_;return t.Long.fromBits(r>>>e|n<<32-e,n>>>e)}return 32==e?t.Long.fromBits(n,0):t.Long.fromBits(n>>>e-32,0)},t.Long.prototype.equals=function(e){return e instanceof t.Long&&this.equalsLong(e)},t.Long.prototype.compareTo_11rb$=t.Long.prototype.compare,t.Long.prototype.inc=function(){return this.add(t.Long.ONE)},t.Long.prototype.dec=function(){return this.add(t.Long.NEG_ONE)},t.Long.prototype.valueOf=function(){return this.toNumber()},t.Long.prototype.unaryPlus=function(){return this},t.Long.prototype.unaryMinus=t.Long.prototype.negate,t.Long.prototype.inv=t.Long.prototype.not,t.Long.prototype.rangeTo=function(e){return new t.kotlin.ranges.LongRange(this,e)},t.defineInlineFunction=function(t,e){return e},t.wrapFunction=function(t){var e=function(){return (e=t()).apply(this,arguments)};return function(){return e.apply(this,arguments)}},t.suspendCall=function(t){return t},t.coroutineResult=function(t){l();},t.coroutineReceiver=function(t){l();},t.compareTo=function(e,n){var r=typeof e;return "number"===r?"number"==typeof n?t.doubleCompareTo(e,n):t.primitiveCompareTo(e,n):"string"===r||"boolean"===r?t.primitiveCompareTo(e,n):e.compareTo_11rb$(n)},t.primitiveCompareTo=function(t,e){return t<e?-1:t>e?1:0},t.doubleCompareTo=function(t,e){if(t<e)return -1;if(t>e)return 1;if(t===e){if(0!==t)return 0;var n=1/t;return n===1/e?0:n<0?-1:1}return t!=t?e!=e?0:1:-1},t.imul=Math.imul||h,t.imulEmulated=h,n=new ArrayBuffer(8),r=new Float64Array(n),i=new Int32Array(n),o=0,a=1,r[0]=-1,0!==i[o]&&(o=1,a=0),t.numberHashCode=function(t){return (0|t)===t?0|t:(r[0]=t,(31*i[a]|0)+i[o]|0)},t.ensureNotNull=function(e){return null!=e?e:t.throwNPE()},void 0===String.prototype.startsWith&&Object.defineProperty(String.prototype,"startsWith",{value:function(t,e){return e=e||0,this.lastIndexOf(t,e)===e}}),void 0===String.prototype.endsWith&&Object.defineProperty(String.prototype,"endsWith",{value:function(t,e){var n=this.toString();(void 0===e||e>n.length)&&(e=n.length),e-=t.length;var r=n.indexOf(t,e);return -1!==r&&r===e}}),void 0===Math.sign&&(Math.sign=function(t){return 0==(t=+t)||isNaN(t)?Number(t):t>0?1:-1}),void 0===Math.trunc&&(Math.trunc=function(t){return isNaN(t)?NaN:t>0?Math.floor(t):Math.ceil(t)}),function(){var t=Math.sqrt(2220446049250313e-31),e=Math.sqrt(t),n=1/t,r=1/e;if(void 0===Math.sinh&&(Math.sinh=function(n){if(Math.abs(n)<e){var r=n;return Math.abs(n)>t&&(r+=n*n*n/6),r}var i=Math.exp(n),o=1/i;return isFinite(i)?isFinite(o)?(i-o)/2:-Math.exp(-n-Math.LN2):Math.exp(n-Math.LN2)}),void 0===Math.cosh&&(Math.cosh=function(t){var e=Math.exp(t),n=1/e;return isFinite(e)&&isFinite(n)?(e+n)/2:Math.exp(Math.abs(t)-Math.LN2)}),void 0===Math.tanh&&(Math.tanh=function(n){if(Math.abs(n)<e){var r=n;return Math.abs(n)>t&&(r-=n*n*n/3),r}var i=Math.exp(+n),o=Math.exp(-n);return i===1/0?1:o===1/0?-1:(i-o)/(i+o)}),void 0===Math.asinh){var i=function(o){if(o>=+e)return o>r?o>n?Math.log(o)+Math.LN2:Math.log(2*o+1/(2*o)):Math.log(o+Math.sqrt(o*o+1));if(o<=-e)return -i(-o);var a=o;return Math.abs(o)>=t&&(a-=o*o*o/6),a};Math.asinh=i;}void 0===Math.acosh&&(Math.acosh=function(r){if(r<1)return NaN;if(r-1>=e)return r>n?Math.log(r)+Math.LN2:Math.log(r+Math.sqrt(r*r-1));var i=Math.sqrt(r-1),o=i;return i>=t&&(o-=i*i*i/12),Math.sqrt(2)*o}),void 0===Math.atanh&&(Math.atanh=function(n){if(Math.abs(n)<e){var r=n;return Math.abs(n)>t&&(r+=n*n*n/3),r}return Math.log((1+n)/(1-n))/2}),void 0===Math.log1p&&(Math.log1p=function(t){if(Math.abs(t)<e){var n=t*t,r=n*t;return -r*t/4+r/3-n/2+t}return Math.log(t+1)}),void 0===Math.expm1&&(Math.expm1=function(t){if(Math.abs(t)<e){var n=t*t,r=n*t;return r*t/24+r/6+n/2+t}return Math.exp(t)-1});}(),void 0===Math.hypot&&(Math.hypot=function(){for(var t=0,e=arguments.length,n=0;n<e;n++){if(arguments[n]===1/0||arguments[n]===-1/0)return 1/0;t+=arguments[n]*arguments[n];}return Math.sqrt(t)}),void 0===Math.log10&&(Math.log10=function(t){return Math.log(t)*Math.LOG10E}),void 0===Math.log2&&(Math.log2=function(t){return Math.log(t)*Math.LOG2E}),void 0===Math.clz32&&(Math.clz32=(s=Math.log,u=Math.LN2,function(t){var e=t>>>0;return 0===e?32:31-(s(e)/u|0)|0})),void 0===ArrayBuffer.isView&&(ArrayBuffer.isView=function(t){return null!=t&&null!=t.__proto__&&t.__proto__.__proto__===Int8Array.prototype.__proto__}),void 0===Array.prototype.fill&&Object.defineProperty(Array.prototype,"fill",{value:function(t){if(null==this)throw new TypeError("this is null or not defined");for(var e=Object(this),n=e.length>>>0,r=arguments[1]>>0,i=r<0?Math.max(n+r,0):Math.min(r,n),o=arguments[2],a=void 0===o?n:o>>0,s=a<0?Math.max(n+a,0):Math.min(a,n);i<s;)e[i]=t,i++;return e}}),function(){function t(t,e){return t<0?Math.max(0,t+e):Math.min(t,e)}function e(e,n){return void 0===n&&(n=this.length),e=t(e||0,this.length),n=Math.max(e,t(n,this.length)),new this.constructor(this.subarray(e,n))}for(var n=[Int8Array,Int16Array,Uint16Array,Int32Array,Float32Array,Float64Array],r=0;r<n.length;++r)void 0===(a=n[r]).prototype.fill&&Object.defineProperty(a.prototype,"fill",{value:Array.prototype.fill}),void 0===a.prototype.slice&&Object.defineProperty(a.prototype,"slice",{value:e});try{(function(){}).apply(null,new Int32Array(0));}catch(t){var i=Function.prototype.apply;Object.defineProperty(Function.prototype,"apply",{value:function(t,e){return i.call(this,t,[].slice.call(e))}});}for(r=0;r<n.length;++r)void 0===(a=n[r]).prototype.map&&Object.defineProperty(a.prototype,"map",{value:function(t,e){return [].slice.call(this).map(t,e)}});var o=function(t,e){if(t<e)return -1;if(t>e)return 1;if(t===e){if(0!==t)return 0;var n=1/t;return n===1/e?0:n<0?-1:1}return t!=t?e!=e?0:1:-1};for(r=0;r<n.length;++r){var a;void 0===(a=n[r]).prototype.sort&&Object.defineProperty(a.prototype,"sort",{value:function(t){return Array.prototype.sort.call(this,t||o)}});}}(),t.Kind={CLASS:"class",INTERFACE:"interface",OBJECT:"object"},t.isType=function(e,n){if(n===Object)switch(typeof e){case"string":case"number":case"boolean":case"function":return !0;default:return e instanceof Object}if(null==e||null==n||"object"!=typeof e&&"function"!=typeof e)return !1;if("function"==typeof n&&e instanceof n)return !0;var r=Object.getPrototypeOf(n),i=null!=r?r.constructor:null;if(null!=i&&"$metadata$"in i&&i.$metadata$.kind===t.Kind.OBJECT)return e===n;var o=n.$metadata$;return null==o?e instanceof n:o.kind===t.Kind.INTERFACE&&null!=e.constructor&&f(e.constructor,n)},t.isNumber=function(e){return "number"==typeof e||e instanceof t.Long},t.isChar=function(e){return e instanceof t.BoxedChar},t.isCharSequence=function(e){return "string"==typeof e||t.isType(e,t.kotlin.CharSequence)},function(){var n=t.Kind.INTERFACE,r=t.Kind.OBJECT,i=t.Kind.CLASS,o=(t.defineInlineFunction,t.wrapFunction,t.equals);function a(){}function s(){c(),this.name$="",this.ordinal$=0;}function u(){p=this;}t.Long.ZERO,a.$metadata$={kind:n,simpleName:"Comparable",interfaces:[]},Object.defineProperty(s.prototype,"name",{configurable:!0,get:function(){return this.name$}}),Object.defineProperty(s.prototype,"ordinal",{configurable:!0,get:function(){return this.ordinal$}}),s.prototype.compareTo_11rb$=function(e){return t.primitiveCompareTo(this.ordinal,e.ordinal)},s.prototype.equals=function(t){return this===t},s.prototype.hashCode=function(){return t.identityHashCode(this)},s.prototype.toString=function(){return this.name},u.$metadata$={kind:r,simpleName:"Companion",interfaces:[]};var p=null;function c(){return null===p&&new u,p}function l(){h=this,this.MIN_VALUE=5e-324,this.MAX_VALUE=17976931348623157e292,this.POSITIVE_INFINITY=1/0,this.NEGATIVE_INFINITY=-1/0,this.NaN=NaN,this.SIZE_BYTES=8,this.SIZE_BITS=64;}s.$metadata$={kind:i,simpleName:"Enum",interfaces:[a]},l.$metadata$={kind:r,simpleName:"DoubleCompanionObject",interfaces:[]};var h=null;function f(){_=this,this.MIN_VALUE=14e-46,this.MAX_VALUE=34028235e31,this.POSITIVE_INFINITY=1/0,this.NEGATIVE_INFINITY=-1/0,this.NaN=NaN,this.SIZE_BYTES=4,this.SIZE_BITS=32;}f.$metadata$={kind:r,simpleName:"FloatCompanionObject",interfaces:[]};var _=null;function y(){d=this,this.MIN_VALUE=-2147483648,this.MAX_VALUE=2147483647,this.SIZE_BYTES=4,this.SIZE_BITS=32;}y.$metadata$={kind:r,simpleName:"IntCompanionObject",interfaces:[]};var d=null;function m(){$=this,this.MIN_VALUE=t.Long.MIN_VALUE,this.MAX_VALUE=t.Long.MAX_VALUE,this.SIZE_BYTES=8,this.SIZE_BITS=64;}m.$metadata$={kind:r,simpleName:"LongCompanionObject",interfaces:[]};var $=null;function g(){v=this,this.MIN_VALUE=0,this.MAX_VALUE=65535,this.MIN_HIGH_SURROGATE=55296,this.MAX_HIGH_SURROGATE=56319,this.MIN_LOW_SURROGATE=56320,this.MAX_LOW_SURROGATE=57343,this.MIN_SURROGATE=this.MIN_HIGH_SURROGATE,this.MAX_SURROGATE=this.MAX_LOW_SURROGATE,this.SIZE_BYTES=2,this.SIZE_BITS=16;}g.$metadata$={kind:r,simpleName:"CharCompanionObject",interfaces:[]};var v=null;function b(){w=this;}b.$metadata$={kind:r,simpleName:"StringCompanionObject",interfaces:[]};var w=null;var x=e.kotlin||(e.kotlin={});x.Comparable=a,Object.defineProperty(s,"Companion",{get:c}),x.Enum=s,e.newArray=function(t,e){return function(t,e){var n;n=t.length-1|0;for(var r=0;r<=n;r++)t[r]=e;return t}(Array(t),e)},e.charArray=function(t,e){var n,r=new Uint16Array(t);if(r.$type$="CharArray",null==e||o(e,!0)||o(e,!1))n=r;else {var i;i=r.length-1|0;for(var a=0;a<=i;a++)r[a]=e(a);n=r;}return n};var k=x.js||(x.js={}),O=k.internal||(k.internal={});Object.defineProperty(O,"DoubleCompanionObject",{get:function(){return null===h&&new l,h}}),Object.defineProperty(O,"FloatCompanionObject",{get:function(){return null===_&&new f,_}}),Object.defineProperty(O,"IntCompanionObject",{get:function(){return null===d&&new y,d}}),Object.defineProperty(O,"LongCompanionObject",{get:function(){return null===$&&new m,$}}),Object.defineProperty(O,"CharCompanionObject",{get:function(){return null===v&&new g,v}}),Object.defineProperty(O,"StringCompanionObject",{get:function(){return null===w&&new b,w}});}(),function(){var n=t.defineInlineFunction,r=t.wrapFunction,i=t.equals,o=t.toBoxedChar,a=t.unboxChar,s=(t.kotlin.js.internal.DoubleCompanionObject,t.Long.ZERO),u=Math,p=t.Kind.CLASS,c=t.toChar,l=(t.Long.NEG_ONE,t.toByte),h=(t.Long.fromInt(-128),t.Long.fromInt(127),t.Long.fromInt(-2147483648),t.Long.fromInt(2147483647),t.Long.MIN_VALUE),f=(t.Long.MAX_VALUE,t.Long.fromInt(-32768),t.Long.fromInt(32767),t.toString),_=(t.Long.fromInt(255),new t.Long(-1,0),t.Long.fromInt(65535),t.Kind.INTERFACE),y=t.Kind.OBJECT,d=t.Long.ONE,m=t.kotlin.Enum,$=t.kotlin.Comparable,g=t.ensureNotNull,v=Object,b=t.throwCCE,w=Error,x=t.arrayToString,k=t.hashCode,O=(t.kotlin.js.internal.FloatCompanionObject,t.kotlin.js.internal.CharCompanionObject),C=(new t.Long(-1478467534,-1720727600),new t.Long(-888910638,1920087921),new t.Long(1993859828,793161749));function N(t,e){return S(t,e)>=0}function I(t,e){if(null==e){for(var n=0;n!==t.length;++n)if(null==t[n])return n}else for(var r=0;r!==t.length;++r)if(i(e,t[r]))return r;return -1}function S(t,e){for(var n=0;n!==t.length;++n)if(e===t[n])return n;return -1}function E(t,e){var n,r;if(null==e)for(n=W(A(t)).iterator();n.hasNext();){var o=n.next();if(null==t[o])return o}else for(r=W(A(t)).iterator();r.hasNext();){var a=r.next();if(i(e,t[a]))return a}return -1}function A(t){return new Mt(0,z(t))}function z(t){return t.length-1|0}function j(t,e){var n;for(n=0;n!==t.length;++n){var r=t[n];e.add_11rb$(r);}return e}function L(t){var e;switch(t.length){case 0:e=Ui();break;case 1:e=Ie(t[0]);break;default:e=j(t,bn(t.length));}return e}function T(t){this.closure$iterator=t;}function M(e,n){return t.isType(e,X)?e.contains_11rb$(n):R(e,n)>=0}function R(e,n){var r;if(t.isType(e,et))return e.indexOf_11rb$(n);var o=0;for(r=e.iterator();r.hasNext();){var a=r.next();if(Ee(o),i(n,a))return o;o=o+1|0;}return -1}function P(t,e){var n;for(n=t.iterator();n.hasNext();){var r=n.next();e.add_11rb$(r);}return e}function q(e){var n;if(t.isType(e,X)){switch(e.size){case 0:n=Ui();break;case 1:n=Ie(t.isType(e,et)?e.get_za3lpa$(0):e.iterator().next());break;default:n=P(e,bn(e.size));}return n}return Di(P(e,gn()))}function B(t,e,n,r,i,o,a,s){var u;void 0===n&&(n=", "),void 0===r&&(r=""),void 0===i&&(i=""),void 0===o&&(o=-1),void 0===a&&(a="..."),void 0===s&&(s=null),e.append_gw00v9$(r);var p=0;for(u=t.iterator();u.hasNext();){var c=u.next();if((p=p+1|0)>1&&e.append_gw00v9$(n),!(o<0||p<=o))break;vo(e,c,s);}return o>=0&&p>o&&e.append_gw00v9$(a),e.append_gw00v9$(i),e}function U(t,e,n,r,i,o,a){return void 0===e&&(e=", "),void 0===n&&(n=""),void 0===r&&(r=""),void 0===i&&(i=-1),void 0===o&&(o="..."),void 0===a&&(a=null),B(t,wr(),e,n,r,i,o,a).toString()}function F(t){return new T((e=t,function(){return e.iterator()}));var e;}function D(t,e){return Ct().fromClosedRange_qt1dr2$(t,e,-1)}function W(t){return Ct().fromClosedRange_qt1dr2$(t.last,t.first,0|-t.step)}function Z(t,e){return t<e?e:t}function K(t,e){return t>e?e:t}function V(e,n){if(!(n>=0))throw ce(("Requested element count "+n+" is less than zero.").toString());return 0===n?wi():t.isType(e,Ei)?e.take_za3lpa$(n):new ji(e,n)}function H(t,e){return new Ci(t,e)}function J(){}function G(){}function Y(){}function Q(){}function X(){}function tt(){}function et(){}function nt(){}function rt(){}function it(){}function ot(){}function at(){}function st(){}function ut(){}function pt(){}function ct(){}function lt(){}function ht(){}function ft(){}function _t(){}function yt(){}function dt(t,e,n){ft.call(this),this.step=n,this.finalElement_0=0|e,this.hasNext_0=this.step>0?t<=e:t>=e,this.next_0=this.hasNext_0?0|t:this.finalElement_0;}function mt(t,e,n){_t.call(this),this.step=n,this.finalElement_0=e,this.hasNext_0=this.step>0?t<=e:t>=e,this.next_0=this.hasNext_0?t:this.finalElement_0;}function $t(t,e,n){yt.call(this),this.step=n,this.finalElement_0=e,this.hasNext_0=this.step.toNumber()>0?t.compareTo_11rb$(e)<=0:t.compareTo_11rb$(e)>=0,this.next_0=this.hasNext_0?t:this.finalElement_0;}function gt(t,e,n){if(wt(),0===n)throw ce("Step must be non-zero.");if(-2147483648===n)throw ce("Step must be greater than Int.MIN_VALUE to avoid overflow on negation.");this.first=t,this.last=c(Yt(0|t,0|e,n)),this.step=n;}function vt(){bt=this;}new t.Long(1,-2147483648),new t.Long(1908874354,-59652324),new t.Long(1,-1073741824),new t.Long(1108857478,-1074),t.Long.fromInt(-2147483647),new t.Long(2077252342,2147),new t.Long(-2077252342,-2148),new t.Long(387905,-1073741824),new t.Long(-387905,1073741823),new t.Long(-1,1073741823),new t.Long(-1108857478,1073),t.Long.fromInt(2047),ae.prototype=Object.create(w.prototype),ae.prototype.constructor=ae,se.prototype=Object.create(ae.prototype),se.prototype.constructor=se,dt.prototype=Object.create(ft.prototype),dt.prototype.constructor=dt,mt.prototype=Object.create(_t.prototype),mt.prototype.constructor=mt,$t.prototype=Object.create(yt.prototype),$t.prototype.constructor=$t,zt.prototype=Object.create(gt.prototype),zt.prototype.constructor=zt,Mt.prototype=Object.create(xt.prototype),Mt.prototype.constructor=Mt,Bt.prototype=Object.create(Nt.prototype),Bt.prototype.constructor=Bt,ie.prototype=Object.create(w.prototype),ie.prototype.constructor=ie,pe.prototype=Object.create(se.prototype),pe.prototype.constructor=pe,le.prototype=Object.create(se.prototype),le.prototype.constructor=le,fe.prototype=Object.create(se.prototype),fe.prototype.constructor=fe,_e.prototype=Object.create(se.prototype),_e.prototype.constructor=_e,me.prototype=Object.create(pe.prototype),me.prototype.constructor=me,$e.prototype=Object.create(se.prototype),$e.prototype.constructor=$e,ge.prototype=Object.create(se.prototype),ge.prototype.constructor=ge,ve.prototype=Object.create(se.prototype),ve.prototype.constructor=ve,we.prototype=Object.create(se.prototype),we.prototype.constructor=we,Dr.prototype=Object.create(Fr.prototype),Dr.prototype.constructor=Dr,ze.prototype=Object.create(Fr.prototype),ze.prototype.constructor=ze,Te.prototype=Object.create(Le.prototype),Te.prototype.constructor=Te,je.prototype=Object.create(ze.prototype),je.prototype.constructor=je,Me.prototype=Object.create(je.prototype),Me.prototype.constructor=Me,We.prototype=Object.create(ze.prototype),We.prototype.constructor=We,qe.prototype=Object.create(We.prototype),qe.prototype.constructor=qe,Be.prototype=Object.create(We.prototype),Be.prototype.constructor=Be,Fe.prototype=Object.create(ze.prototype),Fe.prototype.constructor=Fe,Re.prototype=Object.create(Gr.prototype),Re.prototype.constructor=Re,Ze.prototype=Object.create(je.prototype),Ze.prototype.constructor=Ze,Xe.prototype=Object.create(qe.prototype),Xe.prototype.constructor=Xe,Qe.prototype=Object.create(Re.prototype),Qe.prototype.constructor=Qe,rn.prototype=Object.create(We.prototype),rn.prototype.constructor=rn,fn.prototype=Object.create(Pe.prototype),fn.prototype.constructor=fn,_n.prototype=Object.create(qe.prototype),_n.prototype.constructor=_n,hn.prototype=Object.create(Qe.prototype),hn.prototype.constructor=hn,$n.prototype=Object.create(rn.prototype),$n.prototype.constructor=$n,kn.prototype=Object.create(xn.prototype),kn.prototype.constructor=kn,On.prototype=Object.create(xn.prototype),On.prototype.constructor=On,Cn.prototype=Object.create(On.prototype),Cn.prototype.constructor=Cn,Tn.prototype=Object.create(Ln.prototype),Tn.prototype.constructor=Tn,Mn.prototype=Object.create(Ln.prototype),Mn.prototype.constructor=Mn,Rn.prototype=Object.create(Ln.prototype),Rn.prototype.constructor=Rn,Tr.prototype=Object.create(Dr.prototype),Tr.prototype.constructor=Tr,Mr.prototype=Object.create(Fr.prototype),Mr.prototype.constructor=Mr,Wr.prototype=Object.create(Dr.prototype),Wr.prototype.constructor=Wr,Kr.prototype=Object.create(Zr.prototype),Kr.prototype.constructor=Kr,ii.prototype=Object.create(Fr.prototype),ii.prototype.constructor=ii,Yr.prototype=Object.create(ii.prototype),Yr.prototype.constructor=Yr,Xr.prototype=Object.create(Fr.prototype),Xr.prototype.constructor=Xr,ho.prototype=Object.create(m.prototype),ho.prototype.constructor=ho,ko.prototype=Object.create(ft.prototype),ko.prototype.constructor=ko,Ko.prototype=Object.create(ie.prototype),Ko.prototype.constructor=Ko,T.prototype.iterator=function(){return this.closure$iterator()},T.$metadata$={kind:p,interfaces:[bi]},J.$metadata$={kind:_,simpleName:"Annotation",interfaces:[]},G.$metadata$={kind:_,simpleName:"CharSequence",interfaces:[]},Y.$metadata$={kind:_,simpleName:"Iterable",interfaces:[]},Q.$metadata$={kind:_,simpleName:"MutableIterable",interfaces:[Y]},X.$metadata$={kind:_,simpleName:"Collection",interfaces:[Y]},tt.$metadata$={kind:_,simpleName:"MutableCollection",interfaces:[Q,X]},et.$metadata$={kind:_,simpleName:"List",interfaces:[X]},nt.$metadata$={kind:_,simpleName:"MutableList",interfaces:[tt,et]},rt.$metadata$={kind:_,simpleName:"Set",interfaces:[X]},it.$metadata$={kind:_,simpleName:"MutableSet",interfaces:[tt,rt]},ot.prototype.getOrDefault_xwzc9p$=function(t,e){throw new Ko},at.$metadata$={kind:_,simpleName:"Entry",interfaces:[]},ot.$metadata$={kind:_,simpleName:"Map",interfaces:[]},st.prototype.remove_xwzc9p$=function(t,e){return !0},ut.$metadata$={kind:_,simpleName:"MutableEntry",interfaces:[at]},st.$metadata$={kind:_,simpleName:"MutableMap",interfaces:[ot]},pt.$metadata$={kind:_,simpleName:"Iterator",interfaces:[]},ct.$metadata$={kind:_,simpleName:"MutableIterator",interfaces:[pt]},lt.$metadata$={kind:_,simpleName:"ListIterator",interfaces:[pt]},ht.$metadata$={kind:_,simpleName:"MutableListIterator",interfaces:[ct,lt]},ft.prototype.next=function(){return o(this.nextChar())},ft.$metadata$={kind:p,simpleName:"CharIterator",interfaces:[pt]},_t.prototype.next=function(){return this.nextInt()},_t.$metadata$={kind:p,simpleName:"IntIterator",interfaces:[pt]},yt.prototype.next=function(){return this.nextLong()},yt.$metadata$={kind:p,simpleName:"LongIterator",interfaces:[pt]},dt.prototype.hasNext=function(){return this.hasNext_0},dt.prototype.nextChar=function(){var t=this.next_0;if(t===this.finalElement_0){if(!this.hasNext_0)throw be();this.hasNext_0=!1;}else this.next_0=this.next_0+this.step|0;return c(t)},dt.$metadata$={kind:p,simpleName:"CharProgressionIterator",interfaces:[ft]},mt.prototype.hasNext=function(){return this.hasNext_0},mt.prototype.nextInt=function(){var t=this.next_0;if(t===this.finalElement_0){if(!this.hasNext_0)throw be();this.hasNext_0=!1;}else this.next_0=this.next_0+this.step|0;return t},mt.$metadata$={kind:p,simpleName:"IntProgressionIterator",interfaces:[_t]},$t.prototype.hasNext=function(){return this.hasNext_0},$t.prototype.nextLong=function(){var t=this.next_0;if(i(t,this.finalElement_0)){if(!this.hasNext_0)throw be();this.hasNext_0=!1;}else this.next_0=this.next_0.add(this.step);return t},$t.$metadata$={kind:p,simpleName:"LongProgressionIterator",interfaces:[yt]},gt.prototype.iterator=function(){return new dt(this.first,this.last,this.step)},gt.prototype.isEmpty=function(){return this.step>0?this.first>this.last:this.first<this.last},gt.prototype.equals=function(e){return t.isType(e,gt)&&(this.isEmpty()&&e.isEmpty()||this.first===e.first&&this.last===e.last&&this.step===e.step)},gt.prototype.hashCode=function(){return this.isEmpty()?-1:(31*((31*(0|this.first)|0)+(0|this.last)|0)|0)+this.step|0},gt.prototype.toString=function(){return this.step>0?String.fromCharCode(this.first)+".."+String.fromCharCode(this.last)+" step "+this.step:String.fromCharCode(this.first)+" downTo "+String.fromCharCode(this.last)+" step "+(0|-this.step)},vt.prototype.fromClosedRange_ayra44$=function(t,e,n){return new gt(t,e,n)},vt.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var bt=null;function wt(){return null===bt&&new vt,bt}function xt(t,e,n){if(Ct(),0===n)throw ce("Step must be non-zero.");if(-2147483648===n)throw ce("Step must be greater than Int.MIN_VALUE to avoid overflow on negation.");this.first=t,this.last=Yt(t,e,n),this.step=n;}function kt(){Ot=this;}gt.$metadata$={kind:p,simpleName:"CharProgression",interfaces:[Y]},xt.prototype.iterator=function(){return new mt(this.first,this.last,this.step)},xt.prototype.isEmpty=function(){return this.step>0?this.first>this.last:this.first<this.last},xt.prototype.equals=function(e){return t.isType(e,xt)&&(this.isEmpty()&&e.isEmpty()||this.first===e.first&&this.last===e.last&&this.step===e.step)},xt.prototype.hashCode=function(){return this.isEmpty()?-1:(31*((31*this.first|0)+this.last|0)|0)+this.step|0},xt.prototype.toString=function(){return this.step>0?this.first.toString()+".."+this.last+" step "+this.step:this.first.toString()+" downTo "+this.last+" step "+(0|-this.step)},kt.prototype.fromClosedRange_qt1dr2$=function(t,e,n){return new xt(t,e,n)},kt.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Ot=null;function Ct(){return null===Ot&&new kt,Ot}function Nt(t,e,n){if(Et(),i(n,s))throw ce("Step must be non-zero.");if(i(n,h))throw ce("Step must be greater than Long.MIN_VALUE to avoid overflow on negation.");this.first=t,this.last=Qt(t,e,n),this.step=n;}function It(){St=this;}xt.$metadata$={kind:p,simpleName:"IntProgression",interfaces:[Y]},Nt.prototype.iterator=function(){return new $t(this.first,this.last,this.step)},Nt.prototype.isEmpty=function(){return this.step.toNumber()>0?this.first.compareTo_11rb$(this.last)>0:this.first.compareTo_11rb$(this.last)<0},Nt.prototype.equals=function(e){return t.isType(e,Nt)&&(this.isEmpty()&&e.isEmpty()||i(this.first,e.first)&&i(this.last,e.last)&&i(this.step,e.step))},Nt.prototype.hashCode=function(){return this.isEmpty()?-1:t.Long.fromInt(31).multiply(t.Long.fromInt(31).multiply(this.first.xor(this.first.shiftRightUnsigned(32))).add(this.last.xor(this.last.shiftRightUnsigned(32)))).add(this.step.xor(this.step.shiftRightUnsigned(32))).toInt()},Nt.prototype.toString=function(){return this.step.toNumber()>0?this.first.toString()+".."+this.last.toString()+" step "+this.step.toString():this.first.toString()+" downTo "+this.last.toString()+" step "+this.step.unaryMinus().toString()},It.prototype.fromClosedRange_b9bd0d$=function(t,e,n){return new Nt(t,e,n)},It.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var St=null;function Et(){return null===St&&new It,St}function At(){}function zt(t,e){Tt(),gt.call(this,t,e,1);}function jt(){Lt=this,this.EMPTY=new zt(c(1),c(0));}Nt.$metadata$={kind:p,simpleName:"LongProgression",interfaces:[Y]},At.prototype.contains_mef7kx$=function(e){return t.compareTo(e,this.start)>=0&&t.compareTo(e,this.endInclusive)<=0},At.prototype.isEmpty=function(){return t.compareTo(this.start,this.endInclusive)>0},At.$metadata$={kind:_,simpleName:"ClosedRange",interfaces:[]},Object.defineProperty(zt.prototype,"start",{configurable:!0,get:function(){return o(this.first)}}),Object.defineProperty(zt.prototype,"endInclusive",{configurable:!0,get:function(){return o(this.last)}}),zt.prototype.contains_mef7kx$=function(t){return this.first<=t&&t<=this.last},zt.prototype.isEmpty=function(){return this.first>this.last},zt.prototype.equals=function(e){return t.isType(e,zt)&&(this.isEmpty()&&e.isEmpty()||this.first===e.first&&this.last===e.last)},zt.prototype.hashCode=function(){return this.isEmpty()?-1:(31*(0|this.first)|0)+(0|this.last)|0},zt.prototype.toString=function(){return String.fromCharCode(this.first)+".."+String.fromCharCode(this.last)},jt.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Lt=null;function Tt(){return null===Lt&&new jt,Lt}function Mt(t,e){qt(),xt.call(this,t,e,1);}function Rt(){Pt=this,this.EMPTY=new Mt(1,0);}zt.$metadata$={kind:p,simpleName:"CharRange",interfaces:[At,gt]},Object.defineProperty(Mt.prototype,"start",{configurable:!0,get:function(){return this.first}}),Object.defineProperty(Mt.prototype,"endInclusive",{configurable:!0,get:function(){return this.last}}),Mt.prototype.contains_mef7kx$=function(t){return this.first<=t&&t<=this.last},Mt.prototype.isEmpty=function(){return this.first>this.last},Mt.prototype.equals=function(e){return t.isType(e,Mt)&&(this.isEmpty()&&e.isEmpty()||this.first===e.first&&this.last===e.last)},Mt.prototype.hashCode=function(){return this.isEmpty()?-1:(31*this.first|0)+this.last|0},Mt.prototype.toString=function(){return this.first.toString()+".."+this.last},Rt.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Pt=null;function qt(){return null===Pt&&new Rt,Pt}function Bt(t,e){Dt(),Nt.call(this,t,e,d);}function Ut(){Ft=this,this.EMPTY=new Bt(d,s);}Mt.$metadata$={kind:p,simpleName:"IntRange",interfaces:[At,xt]},Object.defineProperty(Bt.prototype,"start",{configurable:!0,get:function(){return this.first}}),Object.defineProperty(Bt.prototype,"endInclusive",{configurable:!0,get:function(){return this.last}}),Bt.prototype.contains_mef7kx$=function(t){return this.first.compareTo_11rb$(t)<=0&&t.compareTo_11rb$(this.last)<=0},Bt.prototype.isEmpty=function(){return this.first.compareTo_11rb$(this.last)>0},Bt.prototype.equals=function(e){return t.isType(e,Bt)&&(this.isEmpty()&&e.isEmpty()||i(this.first,e.first)&&i(this.last,e.last))},Bt.prototype.hashCode=function(){return this.isEmpty()?-1:t.Long.fromInt(31).multiply(this.first.xor(this.first.shiftRightUnsigned(32))).add(this.last.xor(this.last.shiftRightUnsigned(32))).toInt()},Bt.prototype.toString=function(){return this.first.toString()+".."+this.last.toString()},Ut.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Ft=null;function Dt(){return null===Ft&&new Ut,Ft}function Wt(){Zt=this;}Bt.$metadata$={kind:p,simpleName:"LongRange",interfaces:[At,Nt]},Wt.prototype.toString=function(){return "kotlin.Unit"},Wt.$metadata$={kind:y,simpleName:"Unit",interfaces:[]};var Zt=null;function Kt(){return null===Zt&&new Wt,Zt}function Vt(t,e){var n=t%e;return n>=0?n:n+e|0}function Ht(t,e){var n=t.modulo(e);return n.toNumber()>=0?n:n.add(e)}function Jt(t,e,n){return Vt(Vt(t,n)-Vt(e,n)|0,n)}function Gt(t,e,n){return Ht(Ht(t,n).subtract(Ht(e,n)),n)}function Yt(t,e,n){if(n>0)return t>=e?e:e-Jt(e,t,n)|0;if(n<0)return t<=e?e:e+Jt(t,e,0|-n)|0;throw ce("Step is zero.")}function Qt(t,e,n){if(n.toNumber()>0)return t.compareTo_11rb$(e)>=0?e:e.subtract(Gt(e,t,n));if(n.toNumber()<0)return t.compareTo_11rb$(e)<=0?e:e.add(Gt(t,e,n.unaryMinus()));throw ce("Step is zero.")}function Xt(t){this.c=t;}function te(t){this.resultContinuation_0=t,this.state_0=0,this.exceptionState_0=0,this.result_0=null,this.exception_0=null,this.finallyPath_0=null,this.context_hxcuhl$_0=this.resultContinuation_0.context,this.intercepted__0=null;}function ee(){ne=this;}Xt.prototype.equals=function(e){return t.isType(e,Xt)&&this.c===e.c},Xt.prototype.hashCode=function(){return this.c},Xt.prototype.toString=function(){return String.fromCharCode(a(this.c))},Xt.prototype.compareTo_11rb$=function(t){return this.c-t},Xt.prototype.valueOf=function(){return this.c},Xt.$metadata$={kind:p,simpleName:"BoxedChar",interfaces:[$]},Object.defineProperty(te.prototype,"context",{configurable:!0,get:function(){return this.context_hxcuhl$_0}}),te.prototype.intercepted=function(){var t,e,n,r;if(null!=(n=this.intercepted__0))r=n;else {var i=null!=(e=null!=(t=this.context.get_j3r2sn$(Hi()))?t.interceptContinuation_wj8d80$(this):null)?e:this;this.intercepted__0=i,r=i;}return r},te.prototype.resumeWith_tl1gpc$=function(e){for(var n,r={v:this},i={v:e.isFailure?null:null==(n=e.value)||t.isType(n,v)?n:b()},o={v:e.exceptionOrNull()};;){var a,s,u=r.v,p=u.resultContinuation_0;null==o.v?u.result_0=i.v:(u.state_0=u.exceptionState_0,u.exception_0=o.v);try{var c=u.doResume();if(c===lo())return;i.v=c,o.v=null;}catch(t){i.v=null,o.v=t;}if(u.releaseIntercepted_0(),!t.isType(p,te))return null!=(a=o.v)?(p.resumeWith_tl1gpc$(new qo(Wo(a))),s=Wt):s=null,void(null==s&&p.resumeWith_tl1gpc$(new qo(i.v)));r.v=p;}},te.prototype.releaseIntercepted_0=function(){var t=this.intercepted__0;null!=t&&t!==this&&g(this.context.get_j3r2sn$(Hi())).releaseInterceptedContinuation_k98bjh$(t),this.intercepted__0=re();},te.$metadata$={kind:p,simpleName:"CoroutineImpl",interfaces:[Wi]},Object.defineProperty(ee.prototype,"context",{configurable:!0,get:function(){throw he("This continuation is already complete".toString())}}),ee.prototype.resumeWith_tl1gpc$=function(t){throw he("This continuation is already complete".toString())},ee.prototype.toString=function(){return "This continuation is already complete"},ee.$metadata$={kind:y,simpleName:"CompletedContinuation",interfaces:[Wi]};var ne=null;function re(){return null===ne&&new ee,ne}function ie(e,n){var r;w.call(this),r=null!=n?n:null,this.message_q7r8iu$_0=void 0===e&&null!=r?t.toString(r):e,this.cause_us9j0c$_0=r,t.captureStack(w,this),this.name="Error";}function oe(t,e){return e=e||Object.create(ie.prototype),ie.call(e,t,null),e}function ae(e,n){var r;w.call(this),r=null!=n?n:null,this.message_8yp7un$_0=void 0===e&&null!=r?t.toString(r):e,this.cause_th0jdv$_0=r,t.captureStack(w,this),this.name="Exception";}function se(t,e){ae.call(this,t,e),this.name="RuntimeException";}function ue(t,e){return e=e||Object.create(se.prototype),se.call(e,t,null),e}function pe(t,e){se.call(this,t,e),this.name="IllegalArgumentException";}function ce(t,e){return e=e||Object.create(pe.prototype),pe.call(e,t,null),e}function le(t,e){se.call(this,t,e),this.name="IllegalStateException";}function he(t,e){return e=e||Object.create(le.prototype),le.call(e,t,null),e}function fe(t){ue(t,this),this.name="IndexOutOfBoundsException";}function _e(t,e){se.call(this,t,e),this.name="UnsupportedOperationException";}function ye(t){return t=t||Object.create(_e.prototype),_e.call(t,null,null),t}function de(t,e){return e=e||Object.create(_e.prototype),_e.call(e,t,null),e}function me(t){ce(t,this),this.name="NumberFormatException";}function $e(t){ue(t,this),this.name="NullPointerException";}function ge(t){ue(t,this),this.name="ClassCastException";}function ve(t){ue(t,this),this.name="NoSuchElementException";}function be(t){return t=t||Object.create(ve.prototype),ve.call(t,null),t}function we(t){ue(t,this),this.name="ArithmeticException";}function xe(t,e,n){return Jr().checkRangeIndexes_cub51b$(e,n,t.length),t.slice(e,n)}function ke(t){this.function$=t;}function Oe(t){return void 0!==t.toArray?t.toArray():Ce(t)}function Ce(t){for(var e=[],n=t.iterator();n.hasNext();)e.push(n.next());return e}function Ne(t,e){var n;if(e.length<t.size)return Ce(t);for(var r=t.iterator(),i=0;r.hasNext();)e[(n=i,i=n+1|0,n)]=r.next();return i<e.length&&(e[i]=null),e}function Ie(t){return Fi([t])}function Se(t,e,n,r,i){Jr().checkRangeIndexes_cub51b$(r,i,t.length);var o=i-r|0;if(Jr().checkRangeIndexes_cub51b$(n,n+o|0,e.length),ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){var a=t.subarray(r,i);e.set(a,n);}else if(t!==e||n<=r)for(var s=0;s<o;s++)e[n+s|0]=t[r+s|0];else for(var u=o-1|0;u>=0;u--)e[n+u|0]=t[r+u|0];}function Ee(t){return t<0&&fi(),t}function Ae(t){return t}function ze(){Fr.call(this);}function je(){ze.call(this),this.modCount=0;}function Le(t){this.$outer=t,this.index_0=0,this.last_0=-1;}function Te(t,e){this.$outer=t,Le.call(this,this.$outer),Jr().checkPositionIndex_6xvm5r$(e,this.$outer.size),this.index_0=e;}function Me(t,e,n){je.call(this),this.list_0=t,this.fromIndex_0=e,this._size_0=0,Jr().checkRangeIndexes_cub51b$(this.fromIndex_0,n,this.list_0.size),this._size_0=n-this.fromIndex_0|0;}function Re(){Gr.call(this),this._keys_qe2m0n$_0=null,this._values_kxdlqh$_0=null;}function Pe(t,e){this.key_5xhq3d$_0=t,this._value_0=e;}function qe(){We.call(this);}function Be(t){this.this$AbstractMutableMap=t,We.call(this);}function Ue(t){this.closure$entryIterator=t;}function Fe(t){this.this$AbstractMutableMap=t,ze.call(this);}function De(t){this.closure$entryIterator=t;}function We(){ze.call(this);}function Ze(t){je.call(this),this.array_hd7ov6$_0=t,this.isReadOnly_dbt2oh$_0=!1;}function Ke(t){return t=t||Object.create(Ze.prototype),Ze.call(t,[]),t}function Ve(t,e){return e=e||Object.create(Ze.prototype),Ze.call(e,[]),e}function He(){}function Je(){Ge=this;}Object.defineProperty(ie.prototype,"message",{get:function(){return this.message_q7r8iu$_0}}),Object.defineProperty(ie.prototype,"cause",{get:function(){return this.cause_us9j0c$_0}}),ie.$metadata$={kind:p,simpleName:"Error",interfaces:[w]},Object.defineProperty(ae.prototype,"message",{get:function(){return this.message_8yp7un$_0}}),Object.defineProperty(ae.prototype,"cause",{get:function(){return this.cause_th0jdv$_0}}),ae.$metadata$={kind:p,simpleName:"Exception",interfaces:[w]},se.$metadata$={kind:p,simpleName:"RuntimeException",interfaces:[ae]},pe.$metadata$={kind:p,simpleName:"IllegalArgumentException",interfaces:[se]},le.$metadata$={kind:p,simpleName:"IllegalStateException",interfaces:[se]},fe.$metadata$={kind:p,simpleName:"IndexOutOfBoundsException",interfaces:[se]},_e.$metadata$={kind:p,simpleName:"UnsupportedOperationException",interfaces:[se]},me.$metadata$={kind:p,simpleName:"NumberFormatException",interfaces:[pe]},$e.$metadata$={kind:p,simpleName:"NullPointerException",interfaces:[se]},ge.$metadata$={kind:p,simpleName:"ClassCastException",interfaces:[se]},ve.$metadata$={kind:p,simpleName:"NoSuchElementException",interfaces:[se]},we.$metadata$={kind:p,simpleName:"ArithmeticException",interfaces:[se]},ke.prototype.compare=function(t,e){return this.function$(t,e)},ke.$metadata$={kind:_,simpleName:"Comparator",interfaces:[]},ze.prototype.remove_11rb$=function(t){this.checkIsMutable();for(var e=this.iterator();e.hasNext();)if(i(e.next(),t))return e.remove(),!0;return !1},ze.prototype.addAll_brywnq$=function(t){var e;this.checkIsMutable();var n=!1;for(e=t.iterator();e.hasNext();){var r=e.next();this.add_11rb$(r)&&(n=!0);}return n},ze.prototype.removeAll_brywnq$=function(e){var n;return this.checkIsMutable(),$i(t.isType(this,Q)?this:Sn(),(n=e,function(t){return n.contains_11rb$(t)}))},ze.prototype.retainAll_brywnq$=function(e){var n;return this.checkIsMutable(),$i(t.isType(this,Q)?this:Sn(),(n=e,function(t){return !n.contains_11rb$(t)}))},ze.prototype.clear=function(){this.checkIsMutable();for(var t=this.iterator();t.hasNext();)t.next(),t.remove();},ze.prototype.toJSON=function(){return this.toArray()},ze.prototype.checkIsMutable=function(){},ze.$metadata$={kind:p,simpleName:"AbstractMutableCollection",interfaces:[tt,Fr]},je.prototype.add_11rb$=function(t){return this.checkIsMutable(),this.add_wxm5ur$(this.size,t),!0},je.prototype.addAll_u57x28$=function(t,e){var n,r;this.checkIsMutable();var i=t,o=!1;for(n=e.iterator();n.hasNext();){var a=n.next();this.add_wxm5ur$((i=(r=i)+1|0,r),a),o=!0;}return o},je.prototype.clear=function(){this.checkIsMutable(),this.removeRange_vux9f0$(0,this.size);},je.prototype.removeAll_brywnq$=function(t){return this.checkIsMutable(),vi(this,(e=t,function(t){return e.contains_11rb$(t)}));var e;},je.prototype.retainAll_brywnq$=function(t){return this.checkIsMutable(),vi(this,(e=t,function(t){return !e.contains_11rb$(t)}));var e;},je.prototype.iterator=function(){return new Le(this)},je.prototype.contains_11rb$=function(t){return this.indexOf_11rb$(t)>=0},je.prototype.indexOf_11rb$=function(t){var e;e=hi(this);for(var n=0;n<=e;n++)if(i(this.get_za3lpa$(n),t))return n;return -1},je.prototype.lastIndexOf_11rb$=function(t){for(var e=hi(this);e>=0;e--)if(i(this.get_za3lpa$(e),t))return e;return -1},je.prototype.listIterator=function(){return this.listIterator_za3lpa$(0)},je.prototype.listIterator_za3lpa$=function(t){return new Te(this,t)},je.prototype.subList_vux9f0$=function(t,e){return new Me(this,t,e)},je.prototype.removeRange_vux9f0$=function(t,e){for(var n=this.listIterator_za3lpa$(t),r=e-t|0,i=0;i<r;i++)n.next(),n.remove();},je.prototype.equals=function(e){return e===this||!!t.isType(e,et)&&Jr().orderedEquals_e92ka7$(this,e)},je.prototype.hashCode=function(){return Jr().orderedHashCode_nykoif$(this)},Le.prototype.hasNext=function(){return this.index_0<this.$outer.size},Le.prototype.next=function(){var t;if(!this.hasNext())throw be();return this.last_0=(t=this.index_0,this.index_0=t+1|0,t),this.$outer.get_za3lpa$(this.last_0)},Le.prototype.remove=function(){if(-1===this.last_0)throw he("Call next() or previous() before removing element from the iterator.".toString());this.$outer.removeAt_za3lpa$(this.last_0),this.index_0=this.last_0,this.last_0=-1;},Le.$metadata$={kind:p,simpleName:"IteratorImpl",interfaces:[ct]},Te.prototype.hasPrevious=function(){return this.index_0>0},Te.prototype.nextIndex=function(){return this.index_0},Te.prototype.previous=function(){if(!this.hasPrevious())throw be();return this.last_0=(this.index_0=this.index_0-1|0,this.index_0),this.$outer.get_za3lpa$(this.last_0)},Te.prototype.previousIndex=function(){return this.index_0-1|0},Te.prototype.add_11rb$=function(t){this.$outer.add_wxm5ur$(this.index_0,t),this.index_0=this.index_0+1|0,this.last_0=-1;},Te.prototype.set_11rb$=function(t){if(-1===this.last_0)throw he("Call next() or previous() before updating element value with the iterator.".toString());this.$outer.set_wxm5ur$(this.last_0,t);},Te.$metadata$={kind:p,simpleName:"ListIteratorImpl",interfaces:[ht,Le]},Me.prototype.add_wxm5ur$=function(t,e){Jr().checkPositionIndex_6xvm5r$(t,this._size_0),this.list_0.add_wxm5ur$(this.fromIndex_0+t|0,e),this._size_0=this._size_0+1|0;},Me.prototype.get_za3lpa$=function(t){return Jr().checkElementIndex_6xvm5r$(t,this._size_0),this.list_0.get_za3lpa$(this.fromIndex_0+t|0)},Me.prototype.removeAt_za3lpa$=function(t){Jr().checkElementIndex_6xvm5r$(t,this._size_0);var e=this.list_0.removeAt_za3lpa$(this.fromIndex_0+t|0);return this._size_0=this._size_0-1|0,e},Me.prototype.set_wxm5ur$=function(t,e){return Jr().checkElementIndex_6xvm5r$(t,this._size_0),this.list_0.set_wxm5ur$(this.fromIndex_0+t|0,e)},Object.defineProperty(Me.prototype,"size",{configurable:!0,get:function(){return this._size_0}}),Me.prototype.checkIsMutable=function(){this.list_0.checkIsMutable();},Me.$metadata$={kind:p,simpleName:"SubList",interfaces:[wn,je]},je.$metadata$={kind:p,simpleName:"AbstractMutableList",interfaces:[nt,ze]},Object.defineProperty(Pe.prototype,"key",{get:function(){return this.key_5xhq3d$_0}}),Object.defineProperty(Pe.prototype,"value",{configurable:!0,get:function(){return this._value_0}}),Pe.prototype.setValue_11rc$=function(t){var e=this._value_0;return this._value_0=t,e},Pe.prototype.hashCode=function(){return ri().entryHashCode_9fthdn$(this)},Pe.prototype.toString=function(){return ri().entryToString_9fthdn$(this)},Pe.prototype.equals=function(t){return ri().entryEquals_js7fox$(this,t)},Pe.$metadata$={kind:p,simpleName:"SimpleEntry",interfaces:[ut]},qe.prototype.contains_11rb$=function(t){return this.containsEntry_kw6fkd$(t)},qe.prototype.remove_11rb$=function(t){return this.removeEntry_kw6fkd$(t)},qe.$metadata$={kind:p,simpleName:"AbstractEntrySet",interfaces:[We]},Re.prototype.clear=function(){this.entries.clear();},Be.prototype.add_11rb$=function(t){throw de("Add is not supported on keys")},Be.prototype.clear=function(){this.this$AbstractMutableMap.clear();},Be.prototype.contains_11rb$=function(t){return this.this$AbstractMutableMap.containsKey_11rb$(t)},Ue.prototype.hasNext=function(){return this.closure$entryIterator.hasNext()},Ue.prototype.next=function(){return this.closure$entryIterator.next().key},Ue.prototype.remove=function(){this.closure$entryIterator.remove();},Ue.$metadata$={kind:p,interfaces:[ct]},Be.prototype.iterator=function(){return new Ue(this.this$AbstractMutableMap.entries.iterator())},Be.prototype.remove_11rb$=function(t){return this.checkIsMutable(),!!this.this$AbstractMutableMap.containsKey_11rb$(t)&&(this.this$AbstractMutableMap.remove_11rb$(t),!0)},Object.defineProperty(Be.prototype,"size",{configurable:!0,get:function(){return this.this$AbstractMutableMap.size}}),Be.prototype.checkIsMutable=function(){this.this$AbstractMutableMap.checkIsMutable();},Be.$metadata$={kind:p,interfaces:[We]},Object.defineProperty(Re.prototype,"keys",{configurable:!0,get:function(){return null==this._keys_qe2m0n$_0&&(this._keys_qe2m0n$_0=new Be(this)),g(this._keys_qe2m0n$_0)}}),Re.prototype.putAll_a2k3zr$=function(t){var e;for(this.checkIsMutable(),e=t.entries.iterator();e.hasNext();){var n=e.next(),r=n.key,i=n.value;this.put_xwzc9p$(r,i);}},Fe.prototype.add_11rb$=function(t){throw de("Add is not supported on values")},Fe.prototype.clear=function(){this.this$AbstractMutableMap.clear();},Fe.prototype.contains_11rb$=function(t){return this.this$AbstractMutableMap.containsValue_11rc$(t)},De.prototype.hasNext=function(){return this.closure$entryIterator.hasNext()},De.prototype.next=function(){return this.closure$entryIterator.next().value},De.prototype.remove=function(){this.closure$entryIterator.remove();},De.$metadata$={kind:p,interfaces:[ct]},Fe.prototype.iterator=function(){return new De(this.this$AbstractMutableMap.entries.iterator())},Object.defineProperty(Fe.prototype,"size",{configurable:!0,get:function(){return this.this$AbstractMutableMap.size}}),Fe.prototype.equals=function(e){return this===e||!!t.isType(e,X)&&Jr().orderedEquals_e92ka7$(this,e)},Fe.prototype.hashCode=function(){return Jr().orderedHashCode_nykoif$(this)},Fe.prototype.checkIsMutable=function(){this.this$AbstractMutableMap.checkIsMutable();},Fe.$metadata$={kind:p,interfaces:[ze]},Object.defineProperty(Re.prototype,"values",{configurable:!0,get:function(){return null==this._values_kxdlqh$_0&&(this._values_kxdlqh$_0=new Fe(this)),g(this._values_kxdlqh$_0)}}),Re.prototype.remove_11rb$=function(t){this.checkIsMutable();for(var e=this.entries.iterator();e.hasNext();){var n=e.next(),r=n.key;if(i(t,r)){var o=n.value;return e.remove(),o}}return null},Re.prototype.checkIsMutable=function(){},Re.$metadata$={kind:p,simpleName:"AbstractMutableMap",interfaces:[st,Gr]},We.prototype.equals=function(e){return e===this||!!t.isType(e,rt)&&si().setEquals_y8f7en$(this,e)},We.prototype.hashCode=function(){return si().unorderedHashCode_nykoif$(this)},We.$metadata$={kind:p,simpleName:"AbstractMutableSet",interfaces:[it,ze]},Ze.prototype.build=function(){return this.checkIsMutable(),this.isReadOnly_dbt2oh$_0=!0,this},Ze.prototype.trimToSize=function(){},Ze.prototype.ensureCapacity_za3lpa$=function(t){},Object.defineProperty(Ze.prototype,"size",{configurable:!0,get:function(){return this.array_hd7ov6$_0.length}}),Ze.prototype.get_za3lpa$=function(e){var n;return null==(n=this.array_hd7ov6$_0[this.rangeCheck_xcmk5o$_0(e)])||t.isType(n,v)?n:Sn()},Ze.prototype.set_wxm5ur$=function(e,n){var r;this.checkIsMutable(),this.rangeCheck_xcmk5o$_0(e);var i=this.array_hd7ov6$_0[e];return this.array_hd7ov6$_0[e]=n,null==(r=i)||t.isType(r,v)?r:Sn()},Ze.prototype.add_11rb$=function(t){return this.checkIsMutable(),this.array_hd7ov6$_0.push(t),this.modCount=this.modCount+1|0,!0},Ze.prototype.add_wxm5ur$=function(t,e){this.checkIsMutable(),this.array_hd7ov6$_0.splice(this.insertionRangeCheck_xwivfl$_0(t),0,e),this.modCount=this.modCount+1|0;},Ze.prototype.addAll_brywnq$=function(t){return this.checkIsMutable(),!t.isEmpty()&&(this.array_hd7ov6$_0=this.array_hd7ov6$_0.concat(Oe(t)),this.modCount=this.modCount+1|0,!0)},Ze.prototype.addAll_u57x28$=function(t,e){return this.checkIsMutable(),this.insertionRangeCheck_xwivfl$_0(t),t===this.size?this.addAll_brywnq$(e):!e.isEmpty()&&(t===this.size?this.addAll_brywnq$(e):(this.array_hd7ov6$_0=0===t?Oe(e).concat(this.array_hd7ov6$_0):xe(this.array_hd7ov6$_0,0,t).concat(Oe(e),xe(this.array_hd7ov6$_0,t,this.size)),this.modCount=this.modCount+1|0,!0))},Ze.prototype.removeAt_za3lpa$=function(t){return this.checkIsMutable(),this.rangeCheck_xcmk5o$_0(t),this.modCount=this.modCount+1|0,t===hi(this)?this.array_hd7ov6$_0.pop():this.array_hd7ov6$_0.splice(t,1)[0]},Ze.prototype.remove_11rb$=function(t){var e;this.checkIsMutable(),e=this.array_hd7ov6$_0;for(var n=0;n!==e.length;++n)if(i(this.array_hd7ov6$_0[n],t))return this.array_hd7ov6$_0.splice(n,1),this.modCount=this.modCount+1|0,!0;return !1},Ze.prototype.removeRange_vux9f0$=function(t,e){this.checkIsMutable(),this.modCount=this.modCount+1|0,this.array_hd7ov6$_0.splice(t,e-t|0);},Ze.prototype.clear=function(){this.checkIsMutable(),this.array_hd7ov6$_0=[],this.modCount=this.modCount+1|0;},Ze.prototype.indexOf_11rb$=function(t){return I(this.array_hd7ov6$_0,t)},Ze.prototype.lastIndexOf_11rb$=function(t){return E(this.array_hd7ov6$_0,t)},Ze.prototype.toString=function(){return x(this.array_hd7ov6$_0)},Ze.prototype.toArray_ro6dgy$=function(e){var n,r;if(e.length<this.size)return t.isArray(n=this.toArray())?n:Sn();var i=t.isArray(r=this.array_hd7ov6$_0)?r:Sn();return Se(i,e,0,0,i.length),e.length>this.size&&(e[this.size]=null),e},Ze.prototype.toArray=function(){return [].slice.call(this.array_hd7ov6$_0)},Ze.prototype.checkIsMutable=function(){if(this.isReadOnly_dbt2oh$_0)throw ye()},Ze.prototype.rangeCheck_xcmk5o$_0=function(t){return Jr().checkElementIndex_6xvm5r$(t,this.size),t},Ze.prototype.insertionRangeCheck_xwivfl$_0=function(t){return Jr().checkPositionIndex_6xvm5r$(t,this.size),t},Ze.$metadata$={kind:p,simpleName:"ArrayList",interfaces:[wn,je,nt]},Je.prototype.equals_oaftn8$=function(t,e){return i(t,e)},Je.prototype.getHashCode_s8jyv4$=function(t){var e;return null!=(e=null!=t?k(t):null)?e:0},Je.$metadata$={kind:y,simpleName:"HashCode",interfaces:[He]};var Ge=null;function Ye(){return null===Ge&&new Je,Ge}function Qe(){this.internalMap_uxhen5$_0=null,this.equality_vgh6cm$_0=null,this._entries_7ih87x$_0=null;}function Xe(t){this.$outer=t,qe.call(this);}function tn(t,e){return e=e||Object.create(Qe.prototype),Re.call(e),Qe.call(e),e.internalMap_uxhen5$_0=t,e.equality_vgh6cm$_0=t.equality,e}function en(t){return t=t||Object.create(Qe.prototype),tn(new un(Ye()),t),t}function nn(t,e,n){if(void 0===e&&(e=0),en(n=n||Object.create(Qe.prototype)),!(t>=0))throw ce(("Negative initial capacity: "+t).toString());if(!(e>=0))throw ce(("Non-positive load factor: "+e).toString());return n}function rn(){this.map_8be2vx$=null;}function on(t,e,n){return void 0===e&&(e=0),n=n||Object.create(rn.prototype),We.call(n),rn.call(n),n.map_8be2vx$=nn(t,e),n}function an(t,e){return on(t,0,e=e||Object.create(rn.prototype)),e}function sn(t,e){return e=e||Object.create(rn.prototype),We.call(e),rn.call(e),e.map_8be2vx$=t,e}function un(t){this.equality_mamlu8$_0=t,this.backingMap_0=this.createJsMap(),this.size_x3bm7r$_0=0;}function pn(t){this.this$InternalHashCodeMap=t,this.state=-1,this.keys=Object.keys(t.backingMap_0),this.keyIndex=-1,this.chainOrEntry=null,this.isChain=!1,this.itemIndex=-1,this.lastEntry=null;}function cn(){}function ln(t){this.equality_qma612$_0=t,this.backingMap_0=this.createJsMap(),this.size_6u3ykz$_0=0;}function hn(){this.head_1lr44l$_0=null,this.map_97q5dv$_0=null,this.isReadOnly_uhyvn5$_0=!1;}function fn(t,e,n){this.$outer=t,Pe.call(this,e,n),this.next_8be2vx$=null,this.prev_8be2vx$=null;}function _n(t){this.$outer=t,qe.call(this);}function yn(t){this.$outer=t,this.last_0=null,this.next_0=null,this.next_0=this.$outer.$outer.head_1lr44l$_0;}function dn(t){return en(t=t||Object.create(hn.prototype)),hn.call(t),t.map_97q5dv$_0=en(),t}function mn(t,e,n){return void 0===e&&(e=0),nn(t,e,n=n||Object.create(hn.prototype)),hn.call(n),n.map_97q5dv$_0=en(),n}function $n(){}function gn(t){return t=t||Object.create($n.prototype),sn(dn(),t),$n.call(t),t}function vn(t,e,n){return void 0===e&&(e=0),n=n||Object.create($n.prototype),sn(mn(t,e),n),$n.call(n),n}function bn(t,e){return vn(t,0,e=e||Object.create($n.prototype)),e}function wn(){}function xn(){}function kn(t){xn.call(this),this.outputStream=t;}function On(){xn.call(this),this.buffer="";}function Cn(){On.call(this);}function Nn(t,e){this.delegate_0=t,this.result_0=e;}function In(t,e){this.closure$context=t,this.closure$resumeWith=e;}function Sn(){throw new ge("Illegal cast")}function En(t){throw he(t)}function An(){}function zn(){}function jn(){}function Ln(t){this.jClass_1ppatx$_0=t;}function Tn(t){var e;Ln.call(this,t),this.simpleName_m7mxi0$_0=null!=(e=t.$metadata$)?e.simpleName:null;}function Mn(t,e,n){Ln.call(this,t),this.givenSimpleName_0=e,this.isInstanceFunction_0=n;}function Rn(){Pn=this,Ln.call(this,Object),this.simpleName_lnzy73$_0="Nothing";}He.$metadata$={kind:_,simpleName:"EqualityComparator",interfaces:[]},Xe.prototype.add_11rb$=function(t){throw de("Add is not supported on entries")},Xe.prototype.clear=function(){this.$outer.clear();},Xe.prototype.containsEntry_kw6fkd$=function(t){return this.$outer.containsEntry_8hxqw4$(t)},Xe.prototype.iterator=function(){return this.$outer.internalMap_uxhen5$_0.iterator()},Xe.prototype.removeEntry_kw6fkd$=function(t){return !!M(this,t)&&(this.$outer.remove_11rb$(t.key),!0)},Object.defineProperty(Xe.prototype,"size",{configurable:!0,get:function(){return this.$outer.size}}),Xe.$metadata$={kind:p,simpleName:"EntrySet",interfaces:[qe]},Qe.prototype.clear=function(){this.internalMap_uxhen5$_0.clear();},Qe.prototype.containsKey_11rb$=function(t){return this.internalMap_uxhen5$_0.contains_11rb$(t)},Qe.prototype.containsValue_11rc$=function(e){var n,r=this.internalMap_uxhen5$_0;t:do{var i;if(t.isType(r,X)&&r.isEmpty()){n=!1;break t}for(i=r.iterator();i.hasNext();){var o=i.next();if(this.equality_vgh6cm$_0.equals_oaftn8$(o.value,e)){n=!0;break t}}n=!1;}while(0);return n},Object.defineProperty(Qe.prototype,"entries",{configurable:!0,get:function(){return null==this._entries_7ih87x$_0&&(this._entries_7ih87x$_0=this.createEntrySet()),g(this._entries_7ih87x$_0)}}),Qe.prototype.createEntrySet=function(){return new Xe(this)},Qe.prototype.get_11rb$=function(t){return this.internalMap_uxhen5$_0.get_11rb$(t)},Qe.prototype.put_xwzc9p$=function(t,e){return this.internalMap_uxhen5$_0.put_xwzc9p$(t,e)},Qe.prototype.remove_11rb$=function(t){return this.internalMap_uxhen5$_0.remove_11rb$(t)},Object.defineProperty(Qe.prototype,"size",{configurable:!0,get:function(){return this.internalMap_uxhen5$_0.size}}),Qe.$metadata$={kind:p,simpleName:"HashMap",interfaces:[Re,st]},rn.prototype.add_11rb$=function(t){return null==this.map_8be2vx$.put_xwzc9p$(t,this)},rn.prototype.clear=function(){this.map_8be2vx$.clear();},rn.prototype.contains_11rb$=function(t){return this.map_8be2vx$.containsKey_11rb$(t)},rn.prototype.isEmpty=function(){return this.map_8be2vx$.isEmpty()},rn.prototype.iterator=function(){return this.map_8be2vx$.keys.iterator()},rn.prototype.remove_11rb$=function(t){return null!=this.map_8be2vx$.remove_11rb$(t)},Object.defineProperty(rn.prototype,"size",{configurable:!0,get:function(){return this.map_8be2vx$.size}}),rn.$metadata$={kind:p,simpleName:"HashSet",interfaces:[We,it]},Object.defineProperty(un.prototype,"equality",{get:function(){return this.equality_mamlu8$_0}}),Object.defineProperty(un.prototype,"size",{configurable:!0,get:function(){return this.size_x3bm7r$_0},set:function(t){this.size_x3bm7r$_0=t;}}),un.prototype.put_xwzc9p$=function(e,n){var r=this.equality.getHashCode_s8jyv4$(e),i=this.getChainOrEntryOrNull_0(r);if(null==i)this.backingMap_0[r]=new Pe(e,n);else {if(!t.isArray(i)){var o=i;return this.equality.equals_oaftn8$(o.key,e)?o.setValue_11rc$(n):(this.backingMap_0[r]=[o,new Pe(e,n)],this.size=this.size+1|0,null)}var a=i,s=this.findEntryInChain_0(a,e);if(null!=s)return s.setValue_11rc$(n);a.push(new Pe(e,n));}return this.size=this.size+1|0,null},un.prototype.remove_11rb$=function(e){var n,r=this.equality.getHashCode_s8jyv4$(e);if(null==(n=this.getChainOrEntryOrNull_0(r)))return null;var i=n;if(!t.isArray(i)){var o=i;return this.equality.equals_oaftn8$(o.key,e)?(delete this.backingMap_0[r],this.size=this.size-1|0,o.value):null}for(var a=i,s=0;s!==a.length;++s){var u=a[s];if(this.equality.equals_oaftn8$(e,u.key))return 1===a.length?(a.length=0,delete this.backingMap_0[r]):a.splice(s,1),this.size=this.size-1|0,u.value}return null},un.prototype.clear=function(){this.backingMap_0=this.createJsMap(),this.size=0;},un.prototype.contains_11rb$=function(t){return null!=this.getEntry_0(t)},un.prototype.get_11rb$=function(t){var e;return null!=(e=this.getEntry_0(t))?e.value:null},un.prototype.getEntry_0=function(e){var n;if(null==(n=this.getChainOrEntryOrNull_0(this.equality.getHashCode_s8jyv4$(e))))return null;var r=n;if(t.isArray(r)){var i=r;return this.findEntryInChain_0(i,e)}var o=r;return this.equality.equals_oaftn8$(o.key,e)?o:null},un.prototype.findEntryInChain_0=function(t,e){var n;t:do{var r;for(r=0;r!==t.length;++r){var i=t[r];if(this.equality.equals_oaftn8$(i.key,e)){n=i;break t}}n=null;}while(0);return n},pn.prototype.computeNext_0=function(){if(null!=this.chainOrEntry&&this.isChain){var e=this.chainOrEntry.length;if(this.itemIndex=this.itemIndex+1|0,this.itemIndex<e)return 0}return this.keyIndex=this.keyIndex+1|0,this.keyIndex<this.keys.length?(this.chainOrEntry=this.this$InternalHashCodeMap.backingMap_0[this.keys[this.keyIndex]],this.isChain=t.isArray(this.chainOrEntry),this.itemIndex=0,0):(this.chainOrEntry=null,1)},pn.prototype.hasNext=function(){return -1===this.state&&(this.state=this.computeNext_0()),0===this.state},pn.prototype.next=function(){if(!this.hasNext())throw be();var t=this.isChain?this.chainOrEntry[this.itemIndex]:this.chainOrEntry;return this.lastEntry=t,this.state=-1,t},pn.prototype.remove=function(){if(null==this.lastEntry)throw he("Required value was null.".toString());this.this$InternalHashCodeMap.remove_11rb$(g(this.lastEntry).key),this.lastEntry=null,this.itemIndex=this.itemIndex-1|0;},pn.$metadata$={kind:p,interfaces:[ct]},un.prototype.iterator=function(){return new pn(this)},un.prototype.getChainOrEntryOrNull_0=function(t){var e=this.backingMap_0[t];return void 0===e?null:e},un.$metadata$={kind:p,simpleName:"InternalHashCodeMap",interfaces:[cn]},cn.prototype.createJsMap=function(){var t=Object.create(null);return t.foo=1,delete t.foo,t},cn.$metadata$={kind:_,simpleName:"InternalMap",interfaces:[Q]},fn.prototype.setValue_11rc$=function(t){return this.$outer.checkIsMutable(),Pe.prototype.setValue_11rc$.call(this,t)},fn.$metadata$={kind:p,simpleName:"ChainEntry",interfaces:[Pe]},yn.prototype.hasNext=function(){return null!==this.next_0},yn.prototype.next=function(){if(!this.hasNext())throw be();var t=g(this.next_0);this.last_0=t;var e=t.next_8be2vx$;return this.$outer.$outer,this.next_0=e!==this.$outer.$outer.head_1lr44l$_0?e:null,t},yn.prototype.remove=function(){if(null==this.last_0)throw he("Check failed.".toString());this.$outer.checkIsMutable(),this.$outer.$outer.remove_njjxy0$_0(g(this.last_0)),this.$outer.$outer.map_97q5dv$_0.remove_11rb$(g(this.last_0).key),this.last_0=null;},yn.$metadata$={kind:p,simpleName:"EntryIterator",interfaces:[ct]},_n.prototype.add_11rb$=function(t){throw de("Add is not supported on entries")},_n.prototype.clear=function(){this.$outer.clear();},_n.prototype.containsEntry_kw6fkd$=function(t){return this.$outer.containsEntry_8hxqw4$(t)},_n.prototype.iterator=function(){return new yn(this)},_n.prototype.removeEntry_kw6fkd$=function(t){return this.checkIsMutable(),!!M(this,t)&&(this.$outer.remove_11rb$(t.key),!0)},Object.defineProperty(_n.prototype,"size",{configurable:!0,get:function(){return this.$outer.size}}),_n.prototype.checkIsMutable=function(){this.$outer.checkIsMutable();},_n.$metadata$={kind:p,simpleName:"EntrySet",interfaces:[qe]},hn.prototype.addToEnd_lfi3hf$_0=function(t){if(null!=t.next_8be2vx$||null!=t.prev_8be2vx$)throw he("Check failed.".toString());var e=this.head_1lr44l$_0;if(null==e)this.head_1lr44l$_0=t,t.next_8be2vx$=t,t.prev_8be2vx$=t;else {var n=e.prev_8be2vx$;if(null==n)throw he("Required value was null.".toString());var r=n;t.prev_8be2vx$=r,t.next_8be2vx$=e,e.prev_8be2vx$=t,r.next_8be2vx$=t;}},hn.prototype.remove_njjxy0$_0=function(t){t.next_8be2vx$===t?this.head_1lr44l$_0=null:(this.head_1lr44l$_0===t&&(this.head_1lr44l$_0=t.next_8be2vx$),g(t.next_8be2vx$).prev_8be2vx$=t.prev_8be2vx$,g(t.prev_8be2vx$).next_8be2vx$=t.next_8be2vx$),t.next_8be2vx$=null,t.prev_8be2vx$=null;},hn.prototype.build=function(){return this.checkIsMutable(),this.isReadOnly_uhyvn5$_0=!0,this},hn.prototype.clear=function(){this.checkIsMutable(),this.map_97q5dv$_0.clear(),this.head_1lr44l$_0=null;},hn.prototype.containsKey_11rb$=function(t){return this.map_97q5dv$_0.containsKey_11rb$(t)},hn.prototype.containsValue_11rc$=function(t){var e;if(null==(e=this.head_1lr44l$_0))return !1;var n=e;do{if(i(n.value,t))return !0;n=g(n.next_8be2vx$);}while(n!==this.head_1lr44l$_0);return !1},hn.prototype.createEntrySet=function(){return new _n(this)},hn.prototype.get_11rb$=function(t){var e;return null!=(e=this.map_97q5dv$_0.get_11rb$(t))?e.value:null},hn.prototype.put_xwzc9p$=function(t,e){this.checkIsMutable();var n=this.map_97q5dv$_0.get_11rb$(t);if(null==n){var r=new fn(this,t,e);return this.map_97q5dv$_0.put_xwzc9p$(t,r),this.addToEnd_lfi3hf$_0(r),null}return n.setValue_11rc$(e)},hn.prototype.remove_11rb$=function(t){this.checkIsMutable();var e=this.map_97q5dv$_0.remove_11rb$(t);return null!=e?(this.remove_njjxy0$_0(e),e.value):null},Object.defineProperty(hn.prototype,"size",{configurable:!0,get:function(){return this.map_97q5dv$_0.size}}),hn.prototype.checkIsMutable=function(){if(this.isReadOnly_uhyvn5$_0)throw ye()},hn.$metadata$={kind:p,simpleName:"LinkedHashMap",interfaces:[Qe,st]},$n.prototype.build=function(){var e;return (t.isType(e=this.map_8be2vx$,hn)?e:Sn()).build(),this},$n.prototype.checkIsMutable=function(){this.map_8be2vx$.checkIsMutable();},$n.$metadata$={kind:p,simpleName:"LinkedHashSet",interfaces:[rn,it]},wn.$metadata$={kind:_,simpleName:"RandomAccess",interfaces:[]},xn.prototype.println=function(){this.print_s8jyv4$("\n");},xn.prototype.println_s8jyv4$=function(t){this.print_s8jyv4$(t),this.println();},xn.prototype.flush=function(){},xn.$metadata$={kind:p,simpleName:"BaseOutput",interfaces:[]},kn.prototype.print_s8jyv4$=function(t){var e=String(t);this.outputStream.write(e);},kn.$metadata$={kind:p,simpleName:"NodeJsOutput",interfaces:[xn]},On.prototype.print_s8jyv4$=function(t){this.buffer+=String(t);},On.prototype.flush=function(){this.buffer="";},On.$metadata$={kind:p,simpleName:"BufferedOutput",interfaces:[xn]},Cn.prototype.print_s8jyv4$=function(t){var e=String(t),n=e.lastIndexOf("\n",0);n>=0&&(this.buffer=this.buffer+e.substring(0,n),this.flush(),e=e.substring(n+1|0)),this.buffer=this.buffer+e;},Cn.prototype.flush=function(){console.log(this.buffer),this.buffer="";},Cn.$metadata$={kind:p,simpleName:"BufferedOutputToConsoleLog",interfaces:[On]},Object.defineProperty(Nn.prototype,"context",{configurable:!0,get:function(){return this.delegate_0.context}}),Nn.prototype.resumeWith_tl1gpc$=function(t){var e=this.result_0;if(e===yo())this.result_0=t.value;else {if(e!==lo())throw he("Already resumed");this.result_0=mo(),this.delegate_0.resumeWith_tl1gpc$(t);}},Nn.prototype.getOrThrow=function(){var e;if(this.result_0===yo())return this.result_0=lo(),lo();var n=this.result_0;if(n===mo())e=lo();else {if(t.isType(n,Do))throw n.exception;e=n;}return e},Nn.$metadata$={kind:p,simpleName:"SafeContinuation",interfaces:[Wi]},Object.defineProperty(In.prototype,"context",{configurable:!0,get:function(){return this.closure$context}}),In.prototype.resumeWith_tl1gpc$=function(t){this.closure$resumeWith(t);},In.$metadata$={kind:p,interfaces:[Wi]},An.$metadata$={kind:_,simpleName:"Serializable",interfaces:[]},zn.$metadata$={kind:_,simpleName:"KCallable",interfaces:[]},jn.$metadata$={kind:_,simpleName:"KClass",interfaces:[go]},Object.defineProperty(Ln.prototype,"jClass",{get:function(){return this.jClass_1ppatx$_0}}),Object.defineProperty(Ln.prototype,"qualifiedName",{configurable:!0,get:function(){throw new Ko}}),Ln.prototype.equals=function(e){return t.isType(e,Ln)&&i(this.jClass,e.jClass)},Ln.prototype.hashCode=function(){var t,e;return null!=(e=null!=(t=this.simpleName)?k(t):null)?e:0},Ln.prototype.toString=function(){return "class "+f(this.simpleName)},Ln.$metadata$={kind:p,simpleName:"KClassImpl",interfaces:[jn]},Object.defineProperty(Tn.prototype,"simpleName",{configurable:!0,get:function(){return this.simpleName_m7mxi0$_0}}),Tn.prototype.isInstance_s8jyv4$=function(e){var n=this.jClass;return t.isType(e,n)},Tn.$metadata$={kind:p,simpleName:"SimpleKClassImpl",interfaces:[Ln]},Mn.prototype.equals=function(e){return !!t.isType(e,Mn)&&Ln.prototype.equals.call(this,e)&&i(this.givenSimpleName_0,e.givenSimpleName_0)},Object.defineProperty(Mn.prototype,"simpleName",{configurable:!0,get:function(){return this.givenSimpleName_0}}),Mn.prototype.isInstance_s8jyv4$=function(t){return this.isInstanceFunction_0(t)},Mn.$metadata$={kind:p,simpleName:"PrimitiveKClassImpl",interfaces:[Ln]},Object.defineProperty(Rn.prototype,"simpleName",{configurable:!0,get:function(){return this.simpleName_lnzy73$_0}}),Rn.prototype.isInstance_s8jyv4$=function(t){return !1},Object.defineProperty(Rn.prototype,"jClass",{configurable:!0,get:function(){throw de("There's no native JS class for Nothing type")}}),Rn.prototype.equals=function(t){return t===this},Rn.prototype.hashCode=function(){return 0},Rn.$metadata$={kind:y,simpleName:"NothingKClassImpl",interfaces:[Ln]};var Pn=null;function qn(){return null===Pn&&new Rn,Pn}function Bn(){}function Un(){}function Fn(){}function Dn(){}function Wn(){}function Zn(){}function Kn(){}function Vn(){_r=this,this.anyClass=new Mn(Object,"Any",Hn),this.numberClass=new Mn(Number,"Number",Jn),this.nothingClass=qn(),this.booleanClass=new Mn(Boolean,"Boolean",Gn),this.byteClass=new Mn(Number,"Byte",Yn),this.shortClass=new Mn(Number,"Short",Qn),this.intClass=new Mn(Number,"Int",Xn),this.floatClass=new Mn(Number,"Float",tr),this.doubleClass=new Mn(Number,"Double",er),this.arrayClass=new Mn(Array,"Array",nr),this.stringClass=new Mn(String,"String",rr),this.throwableClass=new Mn(Error,"Throwable",ir),this.booleanArrayClass=new Mn(Array,"BooleanArray",or),this.charArrayClass=new Mn(Uint16Array,"CharArray",ar),this.byteArrayClass=new Mn(Int8Array,"ByteArray",sr),this.shortArrayClass=new Mn(Int16Array,"ShortArray",ur),this.intArrayClass=new Mn(Int32Array,"IntArray",pr),this.longArrayClass=new Mn(Array,"LongArray",cr),this.floatArrayClass=new Mn(Float32Array,"FloatArray",lr),this.doubleArrayClass=new Mn(Float64Array,"DoubleArray",hr);}function Hn(e){return t.isType(e,v)}function Jn(e){return t.isNumber(e)}function Gn(t){return "boolean"==typeof t}function Yn(t){return "number"==typeof t}function Qn(t){return "number"==typeof t}function Xn(t){return "number"==typeof t}function tr(t){return "number"==typeof t}function er(t){return "number"==typeof t}function nr(e){return t.isArray(e)}function rr(t){return "string"==typeof t}function ir(e){return t.isType(e,w)}function or(e){return t.isBooleanArray(e)}function ar(e){return t.isCharArray(e)}function sr(e){return t.isByteArray(e)}function ur(e){return t.isShortArray(e)}function pr(e){return t.isIntArray(e)}function cr(e){return t.isLongArray(e)}function lr(e){return t.isFloatArray(e)}function hr(e){return t.isDoubleArray(e)}Object.defineProperty(Bn.prototype,"simpleName",{configurable:!0,get:function(){throw he("Unknown simpleName for ErrorKClass".toString())}}),Object.defineProperty(Bn.prototype,"qualifiedName",{configurable:!0,get:function(){throw he("Unknown qualifiedName for ErrorKClass".toString())}}),Bn.prototype.isInstance_s8jyv4$=function(t){throw he("Can's check isInstance on ErrorKClass".toString())},Bn.prototype.equals=function(t){return t===this},Bn.prototype.hashCode=function(){return 0},Bn.$metadata$={kind:p,simpleName:"ErrorKClass",interfaces:[jn]},Un.$metadata$={kind:_,simpleName:"KProperty",interfaces:[zn]},Fn.$metadata$={kind:_,simpleName:"KMutableProperty",interfaces:[Un]},Dn.$metadata$={kind:_,simpleName:"KProperty0",interfaces:[Un]},Wn.$metadata$={kind:_,simpleName:"KMutableProperty0",interfaces:[Fn,Dn]},Zn.$metadata$={kind:_,simpleName:"KProperty1",interfaces:[Un]},Kn.$metadata$={kind:_,simpleName:"KMutableProperty1",interfaces:[Fn,Zn]},Vn.prototype.functionClass=function(t){var e,n,r;if(null!=(e=fr[t]))n=e;else {var i=new Mn(Function,"Function"+t,(r=t,function(t){return "function"==typeof t&&t.length===r}));fr[t]=i,n=i;}return n},Vn.$metadata$={kind:y,simpleName:"PrimitiveClasses",interfaces:[]};var fr,_r=null;function yr(){return null===_r&&new Vn,_r}function dr(t){return Array.isArray(t)?mr(t):$r(t)}function mr(t){switch(t.length){case 1:return $r(t[0]);case 0:return qn();default:return new Bn}}function $r(t){var e;if(t===String)return yr().stringClass;var n=t.$metadata$;if(null!=n)if(null==n.$kClass$){var r=new Tn(t);n.$kClass$=r,e=r;}else e=n.$kClass$;else e=new Tn(t);return e}function gr(t){t.lastIndex=0;}function vr(){}function br(t){this.string_0=void 0!==t?t:"";}function wr(t){return t=t||Object.create(br.prototype),br.call(t,""),t}function xr(t){var e=String.fromCharCode(t).toUpperCase();return e.length>1?t:e.charCodeAt(0)}function kr(t){return new zt(O.MIN_HIGH_SURROGATE,O.MAX_HIGH_SURROGATE).contains_mef7kx$(t)}function Or(t){return new zt(O.MIN_LOW_SURROGATE,O.MAX_LOW_SURROGATE).contains_mef7kx$(t)}function Cr(t){this.value=t;}function Nr(t,e){Ar(),this.pattern=t,this.options=q(e),this.nativePattern_0=new RegExp(t,U(e,"","gu",void 0,void 0,void 0,zr));}function Ir(t){return t.next()}function Sr(){Er=this,this.patternEscape_0=new RegExp("[\\\\^$*+?.()|[\\]{}]","g"),this.replacementEscape_0=new RegExp("\\$","g");}vr.$metadata$={kind:_,simpleName:"Appendable",interfaces:[]},Object.defineProperty(br.prototype,"length",{configurable:!0,get:function(){return this.string_0.length}}),br.prototype.charCodeAt=function(t){var e=this.string_0;if(!(t>=0&&t<=Co(e)))throw new fe("index: "+t+", length: "+this.length+"}");return e.charCodeAt(t)},br.prototype.subSequence_vux9f0$=function(t,e){return this.string_0.substring(t,e)},br.prototype.append_s8itvh$=function(t){return this.string_0+=String.fromCharCode(t),this},br.prototype.append_gw00v9$=function(t){return this.string_0+=f(t),this},br.prototype.append_ezbsdh$=function(t,e,n){return this.appendRange_3peag4$(null!=t?t:"null",e,n)},br.prototype.reverse=function(){for(var t,e,n="",r=this.string_0.length-1|0;r>=0;){var i=this.string_0.charCodeAt((r=(t=r)-1|0,t));if(Or(i)&&r>=0){var a=this.string_0.charCodeAt((r=(e=r)-1|0,e));n=kr(a)?n+String.fromCharCode(o(a))+String.fromCharCode(o(i)):n+String.fromCharCode(o(i))+String.fromCharCode(o(a));}else n+=String.fromCharCode(i);}return this.string_0=n,this},br.prototype.append_s8jyv4$=function(t){return this.string_0+=f(t),this},br.prototype.append_6taknv$=function(t){return this.string_0+=t,this},br.prototype.append_4hbowm$=function(t){return this.string_0+=Pr(t),this},br.prototype.append_61zpoe$=function(t){return this.append_pdl1vj$(t)},br.prototype.append_pdl1vj$=function(t){return this.string_0=this.string_0+(null!=t?t:"null"),this},br.prototype.capacity=function(){return this.length},br.prototype.ensureCapacity_za3lpa$=function(t){},br.prototype.indexOf_61zpoe$=function(t){return this.string_0.indexOf(t)},br.prototype.indexOf_bm4lxs$=function(t,e){return this.string_0.indexOf(t,e)},br.prototype.lastIndexOf_61zpoe$=function(t){return this.string_0.lastIndexOf(t)},br.prototype.lastIndexOf_bm4lxs$=function(t,e){return 0===t.length&&e<0?-1:this.string_0.lastIndexOf(t,e)},br.prototype.insert_fzusl$=function(t,e){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+f(e)+this.string_0.substring(t),this},br.prototype.insert_6t1mh3$=function(t,e){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+String.fromCharCode(o(e))+this.string_0.substring(t),this},br.prototype.insert_7u455s$=function(t,e){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+Pr(e)+this.string_0.substring(t),this},br.prototype.insert_1u9bqd$=function(t,e){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+f(e)+this.string_0.substring(t),this},br.prototype.insert_6t2rgq$=function(t,e){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+f(e)+this.string_0.substring(t),this},br.prototype.insert_19mbxw$=function(t,e){return this.insert_vqvrqt$(t,e)},br.prototype.insert_vqvrqt$=function(t,e){Jr().checkPositionIndex_6xvm5r$(t,this.length);var n=null!=e?e:"null";return this.string_0=this.string_0.substring(0,t)+n+this.string_0.substring(t),this},br.prototype.setLength_za3lpa$=function(t){if(t<0)throw ce("Negative new length: "+t+".");if(t<=this.length)this.string_0=this.string_0.substring(0,t);else for(var e=this.length;e<t;e++)this.string_0+=String.fromCharCode(0);},br.prototype.substring_za3lpa$=function(t){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0.substring(t)},br.prototype.substring_vux9f0$=function(t,e){return Jr().checkBoundsIndexes_cub51b$(t,e,this.length),this.string_0.substring(t,e)},br.prototype.trimToSize=function(){},br.prototype.toString=function(){return this.string_0},br.prototype.clear=function(){return this.string_0="",this},br.prototype.set_6t1mh3$=function(t,e){Jr().checkElementIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+String.fromCharCode(o(e))+this.string_0.substring(t+1|0);},br.prototype.setRange_98i29q$=function(t,e,n){return this.checkReplaceRange_0(t,e,this.length),this.string_0=this.string_0.substring(0,t)+n+this.string_0.substring(e),this},br.prototype.checkReplaceRange_0=function(t,e,n){if(t<0||t>n)throw new fe("startIndex: "+t+", length: "+n);if(t>e)throw ce("startIndex("+t+") > endIndex("+e+")")},br.prototype.deleteAt_za3lpa$=function(t){return Jr().checkElementIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+this.string_0.substring(t+1|0),this},br.prototype.deleteRange_vux9f0$=function(t,e){return this.checkReplaceRange_0(t,e,this.length),this.string_0=this.string_0.substring(0,t)+this.string_0.substring(e),this},br.prototype.toCharArray_pqkatk$=function(t,e,n,r){var i;void 0===e&&(e=0),void 0===n&&(n=0),void 0===r&&(r=this.length),Jr().checkBoundsIndexes_cub51b$(n,r,this.length),Jr().checkBoundsIndexes_cub51b$(e,e+r-n|0,t.length);for(var o=e,a=n;a<r;a++)t[(i=o,o=i+1|0,i)]=this.string_0.charCodeAt(a);},br.prototype.appendRange_8chfmy$=function(t,e,n){return this.string_0+=qr(t,e,n),this},br.prototype.appendRange_3peag4$=function(t,e,n){var r=t.toString();return Jr().checkBoundsIndexes_cub51b$(e,n,r.length),this.string_0+=r.substring(e,n),this},br.prototype.insertRange_ar8yzk$=function(t,e,n,r){return Jr().checkPositionIndex_6xvm5r$(t,this.length),this.string_0=this.string_0.substring(0,t)+qr(e,n,r)+this.string_0.substring(t),this},br.prototype.insertRange_mnv9ne$=function(t,e,n,r){Jr().checkPositionIndex_6xvm5r$(t,this.length);var i=e.toString();return Jr().checkBoundsIndexes_cub51b$(n,r,i.length),this.string_0=this.string_0.substring(0,t)+i.substring(n,r)+this.string_0.substring(t),this},br.$metadata$={kind:p,simpleName:"StringBuilder",interfaces:[G,vr]},Cr.$metadata$={kind:p,simpleName:"MatchGroup",interfaces:[]},Cr.prototype.component1=function(){return this.value},Cr.prototype.copy_61zpoe$=function(t){return new Cr(void 0===t?this.value:t)},Cr.prototype.toString=function(){return "MatchGroup(value="+t.toString(this.value)+")"},Cr.prototype.hashCode=function(){var e=0;return 31*e+t.hashCode(this.value)|0},Cr.prototype.equals=function(e){return this===e||null!==e&&"object"==typeof e&&Object.getPrototypeOf(this)===Object.getPrototypeOf(e)&&t.equals(this.value,e.value)},Nr.prototype.matches_6bul2c$=function(t){gr(this.nativePattern_0);var e=this.nativePattern_0.exec(t.toString());return null!=e&&0===e.index&&this.nativePattern_0.lastIndex===t.length},Nr.prototype.containsMatchIn_6bul2c$=function(t){return gr(this.nativePattern_0),this.nativePattern_0.test(t.toString())},Nr.prototype.find_905azu$=function(t,e){if(void 0===e&&(e=0),e<0||e>t.length)throw new fe("Start index out of bounds: "+e+", input length: "+t.length);return Rr(this.nativePattern_0,t.toString(),e)},Nr.prototype.findAll_905azu$=function(t,e){if(void 0===e&&(e=0),e<0||e>t.length)throw new fe("Start index out of bounds: "+e+", input length: "+t.length);return Ri((n=t,r=e,i=this,function(){return i.find_905azu$(n,r)}),Ir);var n,r,i;},Nr.prototype.matchEntire_6bul2c$=function(e){return Io(this.pattern,94)&&So(this.pattern,36)?this.find_905azu$(e):new Nr("^"+xo(wo(this.pattern,t.charArrayOf(94)),t.charArrayOf(36))+"$",this.options).find_905azu$(e)},Nr.prototype.replace_x2uqeu$=function(t,e){return t.toString().replace(this.nativePattern_0,e)},Nr.prototype.replace_20wsma$=n("kotlin.kotlin.text.Regex.replace_20wsma$",r((function(){var n=e.kotlin.text.StringBuilder_init_za3lpa$,r=t.ensureNotNull;return function(t,e){var i=this.find_905azu$(t);if(null==i)return t.toString();var o=0,a=t.length,s=n(a);do{var u=r(i);s.append_ezbsdh$(t,o,u.range.start),s.append_gw00v9$(e(u)),o=u.range.endInclusive+1|0,i=u.next();}while(o<a&&null!=i);return o<a&&s.append_ezbsdh$(t,o,a),s.toString()}}))),Nr.prototype.replaceFirst_x2uqeu$=function(t,e){var n,r=this.options,i=Ve(_i(r,10));for(n=r.iterator();n.hasNext();){var o=n.next();i.add_11rb$(o.value);}var a=U(i,"");return t.toString().replace(new RegExp(this.pattern,a),e)},Nr.prototype.split_905azu$=function(e,n){var r;if(void 0===n&&(n=0),!(n>=0))throw ce(("Limit must be non-negative, but was "+n).toString());var i=this.findAll_905azu$(e),o=0===n?i:V(i,n-1|0),a=Ke(),s=0;for(r=o.iterator();r.hasNext();){var u=r.next();a.add_11rb$(t.subSequence(e,s,u.range.start).toString()),s=u.range.endInclusive+1|0;}return a.add_11rb$(t.subSequence(e,s,e.length).toString()),a},Nr.prototype.toString=function(){return this.nativePattern_0.toString()},Sr.prototype.fromLiteral_61zpoe$=function(t){return jr(this.escape_61zpoe$(t))},Sr.prototype.escape_61zpoe$=function(t){return t.replace(this.patternEscape_0,"\\$&")},Sr.prototype.escapeReplacement_61zpoe$=function(t){return t.replace(this.replacementEscape_0,"$$$$")},Sr.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Er=null;function Ar(){return null===Er&&new Sr,Er}function zr(t){return t.value}function jr(t,e){return e=e||Object.create(Nr.prototype),Nr.call(e,t,Ui()),e}function Lr(t,e,n,r){this.closure$match=t,this.this$findNext=e,this.closure$input=n,this.closure$range=r,this.range_co6b9w$_0=r,this.groups_qcaztb$_0=new Mr(t),this.groupValues__0=null;}function Tr(t){this.closure$match=t,Dr.call(this);}function Mr(t){this.closure$match=t,Fr.call(this);}function Rr(t,e,n){t.lastIndex=n;var r=t.exec(e);return null==r?null:new Lr(r,t,e,new Mt(r.index,t.lastIndex-1|0))}function Pr(t){var e,n="";for(e=0;e!==t.length;++e){var r=a(t[e]);n+=String.fromCharCode(r);}return n}function qr(t,e,n){void 0===e&&(e=0),void 0===n&&(n=t.length),Jr().checkBoundsIndexes_cub51b$(e,n,t.length);for(var r="",i=e;i<n;i++)r+=String.fromCharCode(t[i]);return r}function Br(e,n,r){if(void 0===r&&(r=!1),r){var o=e.length,a=n.length,s=u.min(o,a);if(0===s)return o-a|0;for(var p=0;;){var c=u.min(p+16|0,s),l=e.substring(p,c),h=n.substring(p,c);if(!i(l,h)&&(l=l.toUpperCase(),h=h.toUpperCase(),!i(l,h)&&(l=l.toLowerCase(),h=h.toLowerCase(),!i(l,h))))return t.compareTo(l,h);if(c===s)break;p=c;}return o-a|0}return t.compareTo(e,n)}function Ur(t,e,n,r,i,o){return void 0===o&&(o=!1),No(t,e,n,r,i,o)}function Fr(){}function Dr(){Jr(),Fr.call(this);}function Wr(t,e,n){Dr.call(this),this.list_0=t,this.fromIndex_0=e,this._size_0=0,Jr().checkRangeIndexes_cub51b$(this.fromIndex_0,n,this.list_0.size),this._size_0=n-this.fromIndex_0|0;}function Zr(t){this.$outer=t,this.index_0=0;}function Kr(t,e){this.$outer=t,Zr.call(this,this.$outer),Jr().checkPositionIndex_6xvm5r$(e,this.$outer.size),this.index_0=e;}function Vr(){Hr=this;}Nr.$metadata$={kind:p,simpleName:"Regex",interfaces:[]},Object.defineProperty(Lr.prototype,"range",{configurable:!0,get:function(){return this.range_co6b9w$_0}}),Object.defineProperty(Lr.prototype,"value",{configurable:!0,get:function(){return g(this.closure$match[0])}}),Object.defineProperty(Lr.prototype,"groups",{configurable:!0,get:function(){return this.groups_qcaztb$_0}}),Object.defineProperty(Tr.prototype,"size",{configurable:!0,get:function(){return this.closure$match.length}}),Tr.prototype.get_za3lpa$=function(t){var e;return null!=(e=this.closure$match[t])?e:""},Tr.$metadata$={kind:p,interfaces:[Dr]},Object.defineProperty(Lr.prototype,"groupValues",{configurable:!0,get:function(){return null==this.groupValues__0&&(this.groupValues__0=new Tr(this.closure$match)),g(this.groupValues__0)}}),Lr.prototype.next=function(){return Rr(this.this$findNext,this.closure$input,this.closure$range.isEmpty()?this.closure$range.start+1|0:this.closure$range.endInclusive+1|0)},Object.defineProperty(Mr.prototype,"size",{configurable:!0,get:function(){return this.closure$match.length}}),Mr.prototype.iterator=function(){return H(F(li(this)),(t=this,function(e){return t.get_za3lpa$(e)})).iterator();var t;},Mr.prototype.get_za3lpa$=function(t){var e;return null!=(e=this.closure$match[t])?new Cr(e):null},Mr.$metadata$={kind:p,interfaces:[Fr,Eo]},Lr.$metadata$={kind:p,interfaces:[Ao]},Fr.prototype.contains_11rb$=function(e){var n;t:do{var r;if(t.isType(this,X)&&this.isEmpty()){n=!1;break t}for(r=this.iterator();r.hasNext();){var o=r.next();if(i(o,e)){n=!0;break t}}n=!1;}while(0);return n},Fr.prototype.containsAll_brywnq$=function(e){var n;t:do{var r;if(t.isType(e,X)&&e.isEmpty()){n=!0;break t}for(r=e.iterator();r.hasNext();){var i=r.next();if(!this.contains_11rb$(i)){n=!1;break t}}n=!0;}while(0);return n},Fr.prototype.isEmpty=function(){return 0===this.size},Fr.prototype.toString=function(){return U(this,", ","[","]",void 0,void 0,(t=this,function(e){return e===t?"(this Collection)":f(e)}));var t;},Fr.prototype.toArray=function(){return Ce(this)},Fr.prototype.toArray_ro6dgy$=function(t){return Ne(this,t)},Fr.$metadata$={kind:p,simpleName:"AbstractCollection",interfaces:[X]},Dr.prototype.iterator=function(){return new Zr(this)},Dr.prototype.indexOf_11rb$=function(t){var e;t:do{var n,r=0;for(n=this.iterator();n.hasNext();){var o=n.next();if(i(o,t)){e=r;break t}r=r+1|0;}e=-1;}while(0);return e},Dr.prototype.lastIndexOf_11rb$=function(t){var e;t:do{for(var n=this.listIterator_za3lpa$(this.size);n.hasPrevious();)if(i(n.previous(),t)){e=n.nextIndex();break t}e=-1;}while(0);return e},Dr.prototype.listIterator=function(){return new Kr(this,0)},Dr.prototype.listIterator_za3lpa$=function(t){return new Kr(this,t)},Dr.prototype.subList_vux9f0$=function(t,e){return new Wr(this,t,e)},Wr.prototype.get_za3lpa$=function(t){return Jr().checkElementIndex_6xvm5r$(t,this._size_0),this.list_0.get_za3lpa$(this.fromIndex_0+t|0)},Object.defineProperty(Wr.prototype,"size",{configurable:!0,get:function(){return this._size_0}}),Wr.$metadata$={kind:p,simpleName:"SubList",interfaces:[wn,Dr]},Dr.prototype.equals=function(e){return e===this||!!t.isType(e,et)&&Jr().orderedEquals_e92ka7$(this,e)},Dr.prototype.hashCode=function(){return Jr().orderedHashCode_nykoif$(this)},Zr.prototype.hasNext=function(){return this.index_0<this.$outer.size},Zr.prototype.next=function(){var t,e;if(!this.hasNext())throw be();return t=this.index_0,this.index_0=t+1|0,e=t,this.$outer.get_za3lpa$(e)},Zr.$metadata$={kind:p,simpleName:"IteratorImpl",interfaces:[pt]},Kr.prototype.hasPrevious=function(){return this.index_0>0},Kr.prototype.nextIndex=function(){return this.index_0},Kr.prototype.previous=function(){if(!this.hasPrevious())throw be();return this.$outer.get_za3lpa$((this.index_0=this.index_0-1|0,this.index_0))},Kr.prototype.previousIndex=function(){return this.index_0-1|0},Kr.$metadata$={kind:p,simpleName:"ListIteratorImpl",interfaces:[lt,Zr]},Vr.prototype.checkElementIndex_6xvm5r$=function(t,e){if(t<0||t>=e)throw new fe("index: "+t+", size: "+e)},Vr.prototype.checkPositionIndex_6xvm5r$=function(t,e){if(t<0||t>e)throw new fe("index: "+t+", size: "+e)},Vr.prototype.checkRangeIndexes_cub51b$=function(t,e,n){if(t<0||e>n)throw new fe("fromIndex: "+t+", toIndex: "+e+", size: "+n);if(t>e)throw ce("fromIndex: "+t+" > toIndex: "+e)},Vr.prototype.checkBoundsIndexes_cub51b$=function(t,e,n){if(t<0||e>n)throw new fe("startIndex: "+t+", endIndex: "+e+", size: "+n);if(t>e)throw ce("startIndex: "+t+" > endIndex: "+e)},Vr.prototype.orderedHashCode_nykoif$=function(t){var e,n,r=1;for(e=t.iterator();e.hasNext();){var i=e.next();r=(31*r|0)+(null!=(n=null!=i?k(i):null)?n:0)|0;}return r},Vr.prototype.orderedEquals_e92ka7$=function(t,e){var n;if(t.size!==e.size)return !1;var r=e.iterator();for(n=t.iterator();n.hasNext();){var o=n.next(),a=r.next();if(!i(o,a))return !1}return !0},Vr.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Hr=null;function Jr(){return null===Hr&&new Vr,Hr}function Gr(){ri(),this._keys_up5z3z$_0=null,this._values_6nw1f1$_0=null;}function Yr(t){this.this$AbstractMap=t,ii.call(this);}function Qr(t){this.closure$entryIterator=t;}function Xr(t){this.this$AbstractMap=t,Fr.call(this);}function ti(t){this.closure$entryIterator=t;}function ei(){ni=this;}Dr.$metadata$={kind:p,simpleName:"AbstractList",interfaces:[et,Fr]},Gr.prototype.containsKey_11rb$=function(t){return null!=this.implFindEntry_8k1i24$_0(t)},Gr.prototype.containsValue_11rc$=function(e){var n,r=this.entries;t:do{var o;if(t.isType(r,X)&&r.isEmpty()){n=!1;break t}for(o=r.iterator();o.hasNext();){var a=o.next();if(i(a.value,e)){n=!0;break t}}n=!1;}while(0);return n},Gr.prototype.containsEntry_8hxqw4$=function(e){if(!t.isType(e,at))return !1;var n=e.key,r=e.value,o=(t.isType(this,ot)?this:b()).get_11rb$(n);if(!i(r,o))return !1;var a=null==o;return a&&(a=!(t.isType(this,ot)?this:b()).containsKey_11rb$(n)),!a},Gr.prototype.equals=function(e){if(e===this)return !0;if(!t.isType(e,ot))return !1;if(this.size!==e.size)return !1;var n,r=e.entries;t:do{var i;if(t.isType(r,X)&&r.isEmpty()){n=!0;break t}for(i=r.iterator();i.hasNext();){var o=i.next();if(!this.containsEntry_8hxqw4$(o)){n=!1;break t}}n=!0;}while(0);return n},Gr.prototype.get_11rb$=function(t){var e;return null!=(e=this.implFindEntry_8k1i24$_0(t))?e.value:null},Gr.prototype.hashCode=function(){return k(this.entries)},Gr.prototype.isEmpty=function(){return 0===this.size},Object.defineProperty(Gr.prototype,"size",{configurable:!0,get:function(){return this.entries.size}}),Yr.prototype.contains_11rb$=function(t){return this.this$AbstractMap.containsKey_11rb$(t)},Qr.prototype.hasNext=function(){return this.closure$entryIterator.hasNext()},Qr.prototype.next=function(){return this.closure$entryIterator.next().key},Qr.$metadata$={kind:p,interfaces:[pt]},Yr.prototype.iterator=function(){return new Qr(this.this$AbstractMap.entries.iterator())},Object.defineProperty(Yr.prototype,"size",{configurable:!0,get:function(){return this.this$AbstractMap.size}}),Yr.$metadata$={kind:p,interfaces:[ii]},Object.defineProperty(Gr.prototype,"keys",{configurable:!0,get:function(){return null==this._keys_up5z3z$_0&&(this._keys_up5z3z$_0=new Yr(this)),g(this._keys_up5z3z$_0)}}),Gr.prototype.toString=function(){return U(this.entries,", ","{","}",void 0,void 0,(t=this,function(e){return t.toString_55he67$_0(e)}));var t;},Gr.prototype.toString_55he67$_0=function(t){return this.toString_kthv8s$_0(t.key)+"="+this.toString_kthv8s$_0(t.value)},Gr.prototype.toString_kthv8s$_0=function(t){return t===this?"(this Map)":f(t)},Xr.prototype.contains_11rb$=function(t){return this.this$AbstractMap.containsValue_11rc$(t)},ti.prototype.hasNext=function(){return this.closure$entryIterator.hasNext()},ti.prototype.next=function(){return this.closure$entryIterator.next().value},ti.$metadata$={kind:p,interfaces:[pt]},Xr.prototype.iterator=function(){return new ti(this.this$AbstractMap.entries.iterator())},Object.defineProperty(Xr.prototype,"size",{configurable:!0,get:function(){return this.this$AbstractMap.size}}),Xr.$metadata$={kind:p,interfaces:[Fr]},Object.defineProperty(Gr.prototype,"values",{configurable:!0,get:function(){return null==this._values_6nw1f1$_0&&(this._values_6nw1f1$_0=new Xr(this)),g(this._values_6nw1f1$_0)}}),Gr.prototype.implFindEntry_8k1i24$_0=function(t){var e,n=this.entries;t:do{var r;for(r=n.iterator();r.hasNext();){var o=r.next();if(i(o.key,t)){e=o;break t}}e=null;}while(0);return e},ei.prototype.entryHashCode_9fthdn$=function(t){var e,n,r,i;return (null!=(n=null!=(e=t.key)?k(e):null)?n:0)^(null!=(i=null!=(r=t.value)?k(r):null)?i:0)},ei.prototype.entryToString_9fthdn$=function(t){return f(t.key)+"="+f(t.value)},ei.prototype.entryEquals_js7fox$=function(e,n){return !!t.isType(n,at)&&i(e.key,n.key)&&i(e.value,n.value)},ei.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var ni=null;function ri(){return null===ni&&new ei,ni}function ii(){si(),Fr.call(this);}function oi(){ai=this;}Gr.$metadata$={kind:p,simpleName:"AbstractMap",interfaces:[ot]},ii.prototype.equals=function(e){return e===this||!!t.isType(e,rt)&&si().setEquals_y8f7en$(this,e)},ii.prototype.hashCode=function(){return si().unorderedHashCode_nykoif$(this)},oi.prototype.unorderedHashCode_nykoif$=function(t){var e,n=0;for(e=t.iterator();e.hasNext();){var r,i=e.next();n=n+(null!=(r=null!=i?k(i):null)?r:0)|0;}return n},oi.prototype.setEquals_y8f7en$=function(t,e){return t.size===e.size&&t.containsAll_brywnq$(e)},oi.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var ai=null;function si(){return null===ai&&new oi,ai}function ui(){pi=this;}ii.$metadata$={kind:p,simpleName:"AbstractSet",interfaces:[rt,Fr]},ui.prototype.hasNext=function(){return !1},ui.prototype.hasPrevious=function(){return !1},ui.prototype.nextIndex=function(){return 0},ui.prototype.previousIndex=function(){return -1},ui.prototype.next=function(){throw be()},ui.prototype.previous=function(){throw be()},ui.$metadata$={kind:y,simpleName:"EmptyIterator",interfaces:[lt]};var pi=null;function ci(){return null===pi&&new ui,pi}function li(t){return new Mt(0,t.size-1|0)}function hi(t){return t.size-1|0}function fi(){throw new we("Index overflow has happened.")}function _i(e,n){return t.isType(e,X)?e.size:n}function $i(t,e){return gi(t,e,!0)}function gi(t,e,n){for(var r={v:!1},i=t.iterator();i.hasNext();)e(i.next())===n&&(i.remove(),r.v=!0);return r.v}function vi(e,n){return function(e,n,r){var i,o,a;if(!t.isType(e,wn))return gi(t.isType(i=e,Q)?i:Sn(),n,r);var s=0;o=hi(e);for(var u=0;u<=o;u++){var p=e.get_za3lpa$(u);n(p)!==r&&(s!==u&&e.set_wxm5ur$(s,p),s=s+1|0);}if(s<e.size){a=s;for(var c=hi(e);c>=a;c--)e.removeAt_za3lpa$(c);return !0}return !1}(e,n,!0)}function bi(){}function wi(){return Oi()}function xi(){ki=this;}bi.$metadata$={kind:_,simpleName:"Sequence",interfaces:[]},xi.prototype.iterator=function(){return ci()},xi.prototype.drop_za3lpa$=function(t){return Oi()},xi.prototype.take_za3lpa$=function(t){return Oi()},xi.$metadata$={kind:y,simpleName:"EmptySequence",interfaces:[Ei,bi]};var ki=null;function Oi(){return null===ki&&new xi,ki}function Ci(t,e){this.sequence_0=t,this.transformer_0=e;}function Ni(t){this.this$TransformingSequence=t,this.iterator=t.sequence_0.iterator();}function Ii(t,e,n){this.sequence_0=t,this.transformer_0=e,this.iterator_0=n;}function Si(t){this.this$FlatteningSequence=t,this.iterator=t.sequence_0.iterator(),this.itemIterator=null;}function Ei(){}function Ai(t,e,n){if(this.sequence_0=t,this.startIndex_0=e,this.endIndex_0=n,!(this.startIndex_0>=0))throw ce(("startIndex should be non-negative, but is "+this.startIndex_0).toString());if(!(this.endIndex_0>=0))throw ce(("endIndex should be non-negative, but is "+this.endIndex_0).toString());if(!(this.endIndex_0>=this.startIndex_0))throw ce(("endIndex should be not less than startIndex, but was "+this.endIndex_0+" < "+this.startIndex_0).toString())}function zi(t){this.this$SubSequence=t,this.iterator=t.sequence_0.iterator(),this.position=0;}function ji(t,e){if(this.sequence_0=t,this.count_0=e,!(this.count_0>=0))throw ce(("count must be non-negative, but was "+this.count_0+".").toString())}function Li(t){this.left=t.count_0,this.iterator=t.sequence_0.iterator();}function Ti(t,e){this.getInitialValue_0=t,this.getNextValue_0=e;}function Mi(t){this.this$GeneratorSequence=t,this.nextItem=null,this.nextState=-2;}function Ri(t,e){return new Ti(t,e)}function Pi(){qi=this,this.serialVersionUID_0=C;}Ni.prototype.next=function(){return this.this$TransformingSequence.transformer_0(this.iterator.next())},Ni.prototype.hasNext=function(){return this.iterator.hasNext()},Ni.$metadata$={kind:p,interfaces:[pt]},Ci.prototype.iterator=function(){return new Ni(this)},Ci.prototype.flatten_1tglza$=function(t){return new Ii(this.sequence_0,this.transformer_0,t)},Ci.$metadata$={kind:p,simpleName:"TransformingSequence",interfaces:[bi]},Si.prototype.next=function(){if(!this.ensureItemIterator_0())throw be();return g(this.itemIterator).next()},Si.prototype.hasNext=function(){return this.ensureItemIterator_0()},Si.prototype.ensureItemIterator_0=function(){var t;for(!1===(null!=(t=this.itemIterator)?t.hasNext():null)&&(this.itemIterator=null);null==this.itemIterator;){if(!this.iterator.hasNext())return !1;var e=this.iterator.next(),n=this.this$FlatteningSequence.iterator_0(this.this$FlatteningSequence.transformer_0(e));if(n.hasNext())return this.itemIterator=n,!0}return !0},Si.$metadata$={kind:p,interfaces:[pt]},Ii.prototype.iterator=function(){return new Si(this)},Ii.$metadata$={kind:p,simpleName:"FlatteningSequence",interfaces:[bi]},Ei.$metadata$={kind:_,simpleName:"DropTakeSequence",interfaces:[bi]},Object.defineProperty(Ai.prototype,"count_0",{configurable:!0,get:function(){return this.endIndex_0-this.startIndex_0|0}}),Ai.prototype.drop_za3lpa$=function(t){return t>=this.count_0?wi():new Ai(this.sequence_0,this.startIndex_0+t|0,this.endIndex_0)},Ai.prototype.take_za3lpa$=function(t){return t>=this.count_0?this:new Ai(this.sequence_0,this.startIndex_0,this.startIndex_0+t|0)},zi.prototype.drop_0=function(){for(;this.position<this.this$SubSequence.startIndex_0&&this.iterator.hasNext();)this.iterator.next(),this.position=this.position+1|0;},zi.prototype.hasNext=function(){return this.drop_0(),this.position<this.this$SubSequence.endIndex_0&&this.iterator.hasNext()},zi.prototype.next=function(){if(this.drop_0(),this.position>=this.this$SubSequence.endIndex_0)throw be();return this.position=this.position+1|0,this.iterator.next()},zi.$metadata$={kind:p,interfaces:[pt]},Ai.prototype.iterator=function(){return new zi(this)},Ai.$metadata$={kind:p,simpleName:"SubSequence",interfaces:[Ei,bi]},ji.prototype.drop_za3lpa$=function(t){return t>=this.count_0?wi():new Ai(this.sequence_0,t,this.count_0)},ji.prototype.take_za3lpa$=function(t){return t>=this.count_0?this:new ji(this.sequence_0,t)},Li.prototype.next=function(){if(0===this.left)throw be();return this.left=this.left-1|0,this.iterator.next()},Li.prototype.hasNext=function(){return this.left>0&&this.iterator.hasNext()},Li.$metadata$={kind:p,interfaces:[pt]},ji.prototype.iterator=function(){return new Li(this)},ji.$metadata$={kind:p,simpleName:"TakeSequence",interfaces:[Ei,bi]},Mi.prototype.calcNext_0=function(){this.nextItem=-2===this.nextState?this.this$GeneratorSequence.getInitialValue_0():this.this$GeneratorSequence.getNextValue_0(g(this.nextItem)),this.nextState=null==this.nextItem?0:1;},Mi.prototype.next=function(){var e;if(this.nextState<0&&this.calcNext_0(),0===this.nextState)throw be();var n=t.isType(e=this.nextItem,v)?e:Sn();return this.nextState=-1,n},Mi.prototype.hasNext=function(){return this.nextState<0&&this.calcNext_0(),1===this.nextState},Mi.$metadata$={kind:p,interfaces:[pt]},Ti.prototype.iterator=function(){return new Mi(this)},Ti.$metadata$={kind:p,simpleName:"GeneratorSequence",interfaces:[bi]},Pi.prototype.equals=function(e){return t.isType(e,rt)&&e.isEmpty()},Pi.prototype.hashCode=function(){return 0},Pi.prototype.toString=function(){return "[]"},Object.defineProperty(Pi.prototype,"size",{configurable:!0,get:function(){return 0}}),Pi.prototype.isEmpty=function(){return !0},Pi.prototype.contains_11rb$=function(t){return !1},Pi.prototype.containsAll_brywnq$=function(t){return t.isEmpty()},Pi.prototype.iterator=function(){return ci()},Pi.prototype.readResolve_0=function(){return Bi()},Pi.$metadata$={kind:y,simpleName:"EmptySet",interfaces:[An,rt]};var qi=null;function Bi(){return null===qi&&new Pi,qi}function Ui(){return Bi()}function Fi(t){return j(t,an(t.length))}function Di(t){switch(t.size){case 0:return Ui();case 1:return Ie(t.iterator().next());default:return t}}function Wi(){}function Zi(){Hi();}function Ki(){Vi=this;}Wi.$metadata$={kind:_,simpleName:"Continuation",interfaces:[]},n("kotlin.kotlin.coroutines.suspendCoroutine_922awp$",r((function(){var n=e.kotlin.coroutines.intrinsics.intercepted_f9mg25$,r=e.kotlin.coroutines.SafeContinuation_init_wj8d80$;return function(e,i){return t.suspendCall((o=e,function(t){var e=r(n(t));return o(e),e.getOrThrow()})(t.coroutineReceiver())),t.coroutineResult(t.coroutineReceiver());var o;}}))),Ki.$metadata$={kind:y,simpleName:"Key",interfaces:[Yi]};var Vi=null;function Hi(){return null===Vi&&new Ki,Vi}function Ji(){}function Gi(t,e){var n=t.minusKey_yeqjby$(e.key);if(n===no())return e;var r=n.get_j3r2sn$(Hi());if(null==r)return new ro(n,e);var i=n.minusKey_yeqjby$(Hi());return i===no()?new ro(e,r):new ro(new ro(i,e),r)}function Yi(){}function Qi(){}function Xi(t){this.key_no4tas$_0=t;}function to(){eo=this,this.serialVersionUID_0=s;}Ji.prototype.plus_1fupul$=function(t){return t===no()?this:t.fold_3cc69b$(this,Gi)},Yi.$metadata$={kind:_,simpleName:"Key",interfaces:[]},Qi.prototype.get_j3r2sn$=function(e){return i(this.key,e)?t.isType(this,Qi)?this:Sn():null},Qi.prototype.fold_3cc69b$=function(t,e){return e(t,this)},Qi.prototype.minusKey_yeqjby$=function(t){return i(this.key,t)?no():this},Qi.$metadata$={kind:_,simpleName:"Element",interfaces:[Ji]},Ji.$metadata$={kind:_,simpleName:"CoroutineContext",interfaces:[]},to.prototype.readResolve_0=function(){return no()},to.prototype.get_j3r2sn$=function(t){return null},to.prototype.fold_3cc69b$=function(t,e){return t},to.prototype.plus_1fupul$=function(t){return t},to.prototype.minusKey_yeqjby$=function(t){return this},to.prototype.hashCode=function(){return 0},to.prototype.toString=function(){return "EmptyCoroutineContext"},to.$metadata$={kind:y,simpleName:"EmptyCoroutineContext",interfaces:[An,Ji]};var eo=null;function no(){return null===eo&&new to,eo}function ro(t,e){this.left_0=t,this.element_0=e;}function io(t,e){return 0===t.length?e.toString():t+", "+e}function oo(t){this.elements=t;}ro.prototype.get_j3r2sn$=function(e){for(var n,r=this;;){if(null!=(n=r.element_0.get_j3r2sn$(e)))return n;var i=r.left_0;if(!t.isType(i,ro))return i.get_j3r2sn$(e);r=i;}},ro.prototype.fold_3cc69b$=function(t,e){return e(this.left_0.fold_3cc69b$(t,e),this.element_0)},ro.prototype.minusKey_yeqjby$=function(t){if(null!=this.element_0.get_j3r2sn$(t))return this.left_0;var e=this.left_0.minusKey_yeqjby$(t);return e===this.left_0?this:e===no()?this.element_0:new ro(e,this.element_0)},ro.prototype.size_0=function(){for(var e,n,r=this,i=2;;){if(null==(n=t.isType(e=r.left_0,ro)?e:null))return i;r=n,i=i+1|0;}},ro.prototype.contains_0=function(t){return i(this.get_j3r2sn$(t.key),t)},ro.prototype.containsAll_0=function(e){for(var n,r=e;;){if(!this.contains_0(r.element_0))return !1;var i=r.left_0;if(!t.isType(i,ro))return this.contains_0(t.isType(n=i,Qi)?n:Sn());r=i;}},ro.prototype.equals=function(e){return this===e||t.isType(e,ro)&&e.size_0()===this.size_0()&&e.containsAll_0(this)},ro.prototype.hashCode=function(){return k(this.left_0)+k(this.element_0)|0},ro.prototype.toString=function(){return "["+this.fold_3cc69b$("",io)+"]"},ro.prototype.writeReplace_0=function(){var e,n,r,i=this.size_0(),o=t.newArray(i,null),a={v:0};if(this.fold_3cc69b$(Kt(),(n=o,r=a,function(t,e){var i;return n[(i=r.v,r.v=i+1|0,i)]=e,Wt})),a.v!==i)throw he("Check failed.".toString());return new oo(t.isArray(e=o)?e:Sn())};var so,uo,po;function lo(){return _o()}function ho(t,e){m.call(this),this.name$=t,this.ordinal$=e;}function fo(){fo=function(){},so=new ho("COROUTINE_SUSPENDED",0),uo=new ho("UNDECIDED",1),po=new ho("RESUMED",2);}function _o(){return fo(),so}function yo(){return fo(),uo}function mo(){return fo(),po}function go(){}function vo(e,n,r){null!=r?e.append_gw00v9$(r(n)):null==n||t.isCharSequence(n)?e.append_gw00v9$(n):t.isChar(n)?e.append_s8itvh$(a(n)):e.append_gw00v9$(f(n));}function bo(t,e,n){if(void 0===n&&(n=!1),t===e)return !0;if(!n)return !1;var r=xr(t),i=xr(e),o=r===i;return o||(o=String.fromCharCode(r).toLowerCase().charCodeAt(0)===String.fromCharCode(i).toLowerCase().charCodeAt(0)),o}function wo(e,n){var r,i,s=t.isCharSequence(r=e)?r:b();t:do{var u,p,c,l;p=(u=Oo(s)).first,c=u.last,l=u.step;for(var h=p;h<=c;h+=l)if(!N(n,a(o(s.charCodeAt(h))))){i=t.subSequence(s,h,s.length);break t}i="";}while(0);return i.toString()}function xo(e,n){var r,i,s=t.isCharSequence(r=e)?r:b();t:do{var u;for(u=W(Oo(s)).iterator();u.hasNext();){var p=u.next();if(!N(n,a(o(s.charCodeAt(p))))){i=t.subSequence(s,0,p+1|0);break t}}i="";}while(0);return i.toString()}function ko(t){this.this$iterator=t,ft.call(this),this.index_0=0;}function Oo(t){return new Mt(0,t.length-1|0)}function Co(t){return t.length-1|0}function No(t,e,n,r,i,o){if(r<0||e<0||e>(t.length-i|0)||r>(n.length-i|0))return !1;for(var a=0;a<i;a++)if(!bo(t.charCodeAt(e+a|0),n.charCodeAt(r+a|0),o))return !1;return !0}function Io(t,e,n){return void 0===n&&(n=!1),t.length>0&&bo(t.charCodeAt(0),e,n)}function So(t,e,n){return void 0===n&&(n=!1),t.length>0&&bo(t.charCodeAt(Co(t)),e,n)}function Eo(){}function Ao(){}function zo(t){this.match=t;}function jo(){}function Lo(){To=this;}oo.prototype.readResolve_0=function(){var t,e=this.elements,n=no();for(t=0;t!==e.length;++t){var r=e[t];n=n.plus_1fupul$(r);}return n},oo.$metadata$={kind:p,simpleName:"Serialized",interfaces:[An]},ro.$metadata$={kind:p,simpleName:"CombinedContext",interfaces:[An,Ji]},n("kotlin.kotlin.coroutines.intrinsics.suspendCoroutineUninterceptedOrReturn_zb0pmy$",r((function(){var t=e.kotlin.NotImplementedError;return function(e,n){throw new t("Implementation of suspendCoroutineUninterceptedOrReturn is intrinsic")}}))),ho.$metadata$={kind:p,simpleName:"CoroutineSingletons",interfaces:[m]},ho.values=function(){return [_o(),yo(),mo()]},ho.valueOf_61zpoe$=function(t){switch(t){case"COROUTINE_SUSPENDED":return _o();case"UNDECIDED":return yo();case"RESUMED":return mo();default:En("No enum constant kotlin.coroutines.intrinsics.CoroutineSingletons."+t);}},go.$metadata$={kind:_,simpleName:"KClassifier",interfaces:[]},ko.prototype.nextChar=function(){var t,e;return t=this.index_0,this.index_0=t+1|0,e=t,this.this$iterator.charCodeAt(e)},ko.prototype.hasNext=function(){return this.index_0<this.this$iterator.length},ko.$metadata$={kind:p,interfaces:[ft]},Eo.$metadata$={kind:_,simpleName:"MatchGroupCollection",interfaces:[X]},Object.defineProperty(Ao.prototype,"destructured",{configurable:!0,get:function(){return new zo(this)}}),zo.prototype.component1=n("kotlin.kotlin.text.MatchResult.Destructured.component1",(function(){return this.match.groupValues.get_za3lpa$(1)})),zo.prototype.component2=n("kotlin.kotlin.text.MatchResult.Destructured.component2",(function(){return this.match.groupValues.get_za3lpa$(2)})),zo.prototype.component3=n("kotlin.kotlin.text.MatchResult.Destructured.component3",(function(){return this.match.groupValues.get_za3lpa$(3)})),zo.prototype.component4=n("kotlin.kotlin.text.MatchResult.Destructured.component4",(function(){return this.match.groupValues.get_za3lpa$(4)})),zo.prototype.component5=n("kotlin.kotlin.text.MatchResult.Destructured.component5",(function(){return this.match.groupValues.get_za3lpa$(5)})),zo.prototype.component6=n("kotlin.kotlin.text.MatchResult.Destructured.component6",(function(){return this.match.groupValues.get_za3lpa$(6)})),zo.prototype.component7=n("kotlin.kotlin.text.MatchResult.Destructured.component7",(function(){return this.match.groupValues.get_za3lpa$(7)})),zo.prototype.component8=n("kotlin.kotlin.text.MatchResult.Destructured.component8",(function(){return this.match.groupValues.get_za3lpa$(8)})),zo.prototype.component9=n("kotlin.kotlin.text.MatchResult.Destructured.component9",(function(){return this.match.groupValues.get_za3lpa$(9)})),zo.prototype.component10=n("kotlin.kotlin.text.MatchResult.Destructured.component10",(function(){return this.match.groupValues.get_za3lpa$(10)})),zo.prototype.toList=function(){return this.match.groupValues.subList_vux9f0$(1,this.match.groupValues.size)},zo.$metadata$={kind:p,simpleName:"Destructured",interfaces:[]},Ao.$metadata$={kind:_,simpleName:"MatchResult",interfaces:[]},jo.$metadata$={kind:_,simpleName:"Lazy",interfaces:[]},Lo.$metadata$={kind:y,simpleName:"UNINITIALIZED_VALUE",interfaces:[]};var To=null;function Mo(){return null===To&&new Lo,To}function Ro(t){this.initializer_0=t,this._value_0=Mo();}function Po(t){this.value_7taq70$_0=t;}function qo(t){Fo(),this.value=t;}function Bo(){Uo=this;}Object.defineProperty(Ro.prototype,"value",{configurable:!0,get:function(){var e;return this._value_0===Mo()&&(this._value_0=g(this.initializer_0)(),this.initializer_0=null),null==(e=this._value_0)||t.isType(e,v)?e:Sn()}}),Ro.prototype.isInitialized=function(){return this._value_0!==Mo()},Ro.prototype.toString=function(){return this.isInitialized()?f(this.value):"Lazy value not initialized yet."},Ro.prototype.writeReplace_0=function(){return new Po(this.value)},Ro.$metadata$={kind:p,simpleName:"UnsafeLazyImpl",interfaces:[An,jo]},Object.defineProperty(Po.prototype,"value",{get:function(){return this.value_7taq70$_0}}),Po.prototype.isInitialized=function(){return !0},Po.prototype.toString=function(){return f(this.value)},Po.$metadata$={kind:p,simpleName:"InitializedLazyImpl",interfaces:[An,jo]},Object.defineProperty(qo.prototype,"isSuccess",{configurable:!0,get:function(){return !t.isType(this.value,Do)}}),Object.defineProperty(qo.prototype,"isFailure",{configurable:!0,get:function(){return t.isType(this.value,Do)}}),qo.prototype.getOrNull=n("kotlin.kotlin.Result.getOrNull",r((function(){var e=Object,n=t.throwCCE;return function(){var r;return this.isFailure?null:null==(r=this.value)||t.isType(r,e)?r:n()}}))),qo.prototype.exceptionOrNull=function(){return t.isType(this.value,Do)?this.value.exception:null},qo.prototype.toString=function(){return t.isType(this.value,Do)?this.value.toString():"Success("+f(this.value)+")"},Bo.prototype.success_mh5how$=n("kotlin.kotlin.Result.Companion.success_mh5how$",r((function(){var t=e.kotlin.Result;return function(e){return new t(e)}}))),Bo.prototype.failure_lsqlk3$=n("kotlin.kotlin.Result.Companion.failure_lsqlk3$",r((function(){var t=e.kotlin.createFailure_tcv7n7$,n=e.kotlin.Result;return function(e){return new n(t(e))}}))),Bo.$metadata$={kind:y,simpleName:"Companion",interfaces:[]};var Uo=null;function Fo(){return null===Uo&&new Bo,Uo}function Do(t){this.exception=t;}function Wo(t){return new Do(t)}function Zo(e){if(t.isType(e.value,Do))throw e.value.exception}function Ko(t){void 0===t&&(t="An operation is not implemented."),oe(t,this),this.name="NotImplementedError";}Do.prototype.equals=function(e){return t.isType(e,Do)&&i(this.exception,e.exception)},Do.prototype.hashCode=function(){return k(this.exception)},Do.prototype.toString=function(){return "Failure("+this.exception+")"},Do.$metadata$={kind:p,simpleName:"Failure",interfaces:[An]},qo.$metadata$={kind:p,simpleName:"Result",interfaces:[An]},qo.prototype.unbox=function(){return this.value},qo.prototype.hashCode=function(){var e=0;return 31*e+t.hashCode(this.value)|0},qo.prototype.equals=function(e){return this===e||null!==e&&"object"==typeof e&&Object.getPrototypeOf(this)===Object.getPrototypeOf(e)&&t.equals(this.value,e.value)},Ko.$metadata$={kind:p,simpleName:"NotImplementedError",interfaces:[ie]};var Vo=e.kotlin||(e.kotlin={}),Ho=Vo.collections||(Vo.collections={});Ho.contains_o2f9me$=N,Ho.get_lastIndex_m7z4lg$=z,Ho.indexOf_mjy6jw$=I,Ho.indexOf_o2f9me$=S,Ho.get_indices_m7z4lg$=A;var Jo=Vo.ranges||(Vo.ranges={});Jo.reversed_zf1xzc$=W,Ho.lastIndexOf_mjy6jw$=E,Vo.IllegalArgumentException_init_pdl1vj$=ce,Ho.ArrayList_init_287e2$=Ke,Ho.mapCapacity_za3lpa$=Ae,Jo.coerceAtLeast_dqglrj$=Z,Jo.coerceAtMost_dqglrj$=K,Ho.toCollection_5n4o2z$=j,Ho.toSet_us0mfu$=L,Ho.LinkedHashMap_init_q3lmfv$=dn,Ho.ArrayList_init_ww73n8$=Ve,Vo.NoSuchElementException_init=be,Vo.UnsupportedOperationException_init_pdl1vj$=de,Ho.collectionSizeOrDefault_ba2ldo$=_i,Ho.contains_2ws7j4$=M,Ho.get_lastIndex_55thoc$=hi,Ho.indexOf_2ws7j4$=R,Ho.checkIndexOverflow_za3lpa$=Ee,Ho.toCollection_5cfyqp$=P,Ho.toSet_7wnvza$=q,Ho.Collection=X,Ho.joinTo_gcc71v$=B,Ho.joinToString_fmv235$=U,Ho.asSequence_7wnvza$=F;var Go=Vo.text||(Vo.text={});Jo.downTo_dqglrj$=D;var Yo=Vo.sequences||(Vo.sequences={});Yo.Sequence=bi,Yo.take_wuwhe2$=V,Yo.map_z5avom$=H,Go.get_lastIndex_gw00vp$=Co,Go.iterator_gw00vp$=function(t){return new ko(t)},Go.get_indices_gw00vp$=Oo,Go.StringBuilder_init=wr;var Qo=Vo.js||(Vo.js={});Vo.Annotation=J,Vo.CharSequence=G,Ho.Iterable=Y,Ho.MutableIterable=Q,Ho.MutableCollection=tt,Ho.List=et,Ho.MutableList=nt,Ho.Set=rt,Ho.MutableSet=it,ot.Entry=at,Ho.Map=ot,st.MutableEntry=ut,Ho.MutableMap=st,Ho.Iterator=pt,Ho.MutableIterator=ct,Ho.ListIterator=lt,Ho.MutableListIterator=ht,Ho.CharIterator=ft,Ho.IntIterator=_t,Ho.LongIterator=yt,Jo.CharProgressionIterator=dt,Jo.IntProgressionIterator=mt,Jo.LongProgressionIterator=$t,Object.defineProperty(gt,"Companion",{get:wt}),Jo.CharProgression=gt,Object.defineProperty(xt,"Companion",{get:Ct}),Jo.IntProgression=xt,Object.defineProperty(Nt,"Companion",{get:Et}),Jo.LongProgression=Nt,Jo.ClosedRange=At,Object.defineProperty(zt,"Companion",{get:Tt}),Jo.CharRange=zt,Object.defineProperty(Mt,"Companion",{get:qt}),Jo.IntRange=Mt,Object.defineProperty(Bt,"Companion",{get:Dt}),Jo.LongRange=Bt,Object.defineProperty(Vo,"Unit",{get:Kt});var Xo=Vo.internal||(Vo.internal={});Xo.getProgressionLastElement_qt1dr2$=Yt,Xo.getProgressionLastElement_b9bd0d$=Qt,e.subSequence=function(t,e,n){return "string"==typeof t?t.substring(e,n):t.subSequence_vux9f0$(e,n)},e.captureStack=function(t,e){Error.captureStackTrace?Error.captureStackTrace(e):e.stack=(new Error).stack;},e.newThrowable=function(t,e){var n,r=new Error;return n=i(typeof t,"undefined")?null!=e?e.toString():null:t,r.message=n,r.cause=e,r.name="Throwable",r},e.BoxedChar=Xt,e.charArrayOf=function(){var t="CharArray",e=new Uint16Array([].slice.call(arguments));return e.$type$=t,e};var ta=Vo.coroutines||(Vo.coroutines={});ta.CoroutineImpl=te,Object.defineProperty(ta,"CompletedContinuation",{get:re});var ea=ta.intrinsics||(ta.intrinsics={});ea.intercepted_f9mg25$=function(e){var n,r,i;return null!=(i=null!=(r=t.isType(n=e,te)?n:null)?r.intercepted():null)?i:e},Vo.Error_init_pdl1vj$=oe,Vo.Error=ie,Vo.Exception=ae,Vo.RuntimeException_init_pdl1vj$=ue,Vo.RuntimeException=se,Vo.IllegalArgumentException=pe,Vo.IllegalStateException_init_pdl1vj$=he,Vo.IllegalStateException=le,Vo.IndexOutOfBoundsException=fe,Vo.UnsupportedOperationException_init=ye,Vo.UnsupportedOperationException=_e,Vo.NumberFormatException=me,Vo.NullPointerException=$e,Vo.ClassCastException=ge,Vo.NoSuchElementException=ve,Vo.ArithmeticException=we,Vo.lazy_klfg04$=function(t){return new Ro(t)},Ho.arrayCopy=Se,Ho.copyOfRange_5f8l3u$=xe,Vo.Comparator=ke,Ho.copyToArray=Oe,Ho.copyToArrayImpl=Ce,Ho.copyToExistingArrayImpl=Ne,Ho.setOf_mh5how$=Ie,Ho.LinkedHashSet_init_287e2$=gn,Ho.LinkedHashSet_init_ww73n8$=bn,Ho.AbstractMutableCollection=ze,Ho.AbstractMutableList=je,Re.SimpleEntry_init_trwmqg$=function(t,e){return e=e||Object.create(Pe.prototype),Pe.call(e,t.key,t.value),e},Re.SimpleEntry=Pe,Re.AbstractEntrySet=qe,Ho.AbstractMutableMap=Re,Ho.AbstractMutableSet=We,Ho.ArrayList_init_mqih57$=function(t,e){return e=e||Object.create(Ze.prototype),Ze.call(e,Oe(t)),e},Ho.ArrayList=Ze,Object.defineProperty(He,"HashCode",{get:Ye}),Ho.EqualityComparator=He,Ho.HashMap_init_va96d4$=tn,Ho.HashMap_init_q3lmfv$=en,Ho.HashMap_init_xf5xz2$=nn,Ho.HashMap=Qe,Ho.HashSet_init_2wofer$=on,Ho.HashSet_init_ww73n8$=an,Ho.HashSet_init_nn01ho$=sn,Ho.HashSet=rn,Ho.InternalHashCodeMap=un,Ho.InternalMap=cn,Ho.InternalStringMap=ln,Ho.LinkedHashMap_init_xf5xz2$=mn,Ho.LinkedHashMap=hn,Ho.LinkedHashSet_init_2wofer$=vn,Ho.LinkedHashSet=$n,Ho.RandomAccess=wn;var na=Vo.io||(Vo.io={});na.BaseOutput=xn,na.NodeJsOutput=kn,na.BufferedOutput=On,na.BufferedOutputToConsoleLog=Cn,ta.SafeContinuation_init_wj8d80$=function(t,e){return e=e||Object.create(Nn.prototype),Nn.call(e,t,yo()),e},ta.SafeContinuation=Nn,e.throwNPE=function(t){throw new $e(t)},e.throwCCE=Sn,e.throwISE=En,na.Serializable=An;var ra=Vo.reflect||(Vo.reflect={});ra.KCallable=zn,ra.KClass=jn;var ia=ra.js||(ra.js={}),oa=ia.internal||(ia.internal={});oa.KClassImpl=Ln,oa.SimpleKClassImpl=Tn,oa.PrimitiveKClassImpl=Mn,Object.defineProperty(oa,"NothingKClassImpl",{get:qn}),oa.ErrorKClass=Bn,ra.KProperty=Un,ra.KMutableProperty=Fn,ra.KProperty0=Dn,ra.KMutableProperty0=Wn,ra.KProperty1=Zn,ra.KMutableProperty1=Kn,Object.defineProperty(oa,"PrimitiveClasses",{get:yr}),e.getKClass=dr,e.getKClassM=mr,e.getKClassFromExpression=function(e){var n;switch(typeof e){case"string":n=yr().stringClass;break;case"number":n=(0|e)===e?yr().intClass:yr().doubleClass;break;case"boolean":n=yr().booleanClass;break;case"function":n=yr().functionClass(e.length);break;default:if(t.isBooleanArray(e))n=yr().booleanArrayClass;else if(t.isCharArray(e))n=yr().charArrayClass;else if(t.isByteArray(e))n=yr().byteArrayClass;else if(t.isShortArray(e))n=yr().shortArrayClass;else if(t.isIntArray(e))n=yr().intArrayClass;else if(t.isLongArray(e))n=yr().longArrayClass;else if(t.isFloatArray(e))n=yr().floatArrayClass;else if(t.isDoubleArray(e))n=yr().doubleArrayClass;else if(t.isType(e,jn))n=dr(jn);else if(t.isArray(e))n=yr().arrayClass;else {var r=Object.getPrototypeOf(e).constructor;n=r===Object?yr().anyClass:r===Error?yr().throwableClass:$r(r);}}return n},e.getKClass1=$r,Qo.reset_xjqeni$=gr,Go.Appendable=vr,Go.StringBuilder_init_za3lpa$=function(t,e){return wr(e=e||Object.create(br.prototype)),e},Go.StringBuilder=br,Go.uppercaseChar_myv2d0$=xr,Go.isHighSurrogate_myv2d0$=kr,Go.isLowSurrogate_myv2d0$=Or,Go.MatchGroup=Cr,Object.defineProperty(Nr,"Companion",{get:Ar}),Go.Regex_init_61zpoe$=jr,Go.Regex=Nr,Go.concatToString_355ntz$=Pr,Go.concatToString_wlitf7$=qr,Go.compareTo_7epoxm$=Br,Go.regionMatches_h3ii2q$=Ur,Go.replace_680rmw$=function(t,e,n,r){return void 0===r&&(r=!1),t.replace(new RegExp(Ar().escape_61zpoe$(e),r?"gui":"gu"),Ar().escapeReplacement_61zpoe$(n))},Ho.AbstractCollection=Fr,Object.defineProperty(Dr,"Companion",{get:Jr}),Ho.AbstractList=Dr,Object.defineProperty(Gr,"Companion",{get:ri}),Ho.AbstractMap=Gr,Object.defineProperty(ii,"Companion",{get:si}),Ho.AbstractSet=ii,Object.defineProperty(Ho,"EmptyIterator",{get:ci}),Ho.get_indices_gzk92b$=li,Ho.throwIndexOverflow=fi,Ho.removeAll_uhyeqt$=$i,Ho.removeAll_qafx1e$=vi,Yo.emptySequence_287e2$=wi,Yo.TransformingSequence=Ci,Yo.FlatteningSequence=Ii,Yo.DropTakeSequence=Ei,Yo.SubSequence=Ai,Yo.TakeSequence=ji,Yo.generateSequence_c6s9hp$=Ri,Object.defineProperty(Ho,"EmptySet",{get:Bi}),Ho.emptySet_287e2$=Ui,Ho.setOf_i5x0yv$=function(t){return t.length>0?L(t):Ui()},Ho.hashSetOf_i5x0yv$=Fi,Ho.optimizeReadOnlySet_94kdbt$=Di,ta.Continuation=Wi,Vo.Result=qo,ea.get_COROUTINE_SUSPENDED=lo,Object.defineProperty(Zi,"Key",{get:Hi}),ta.ContinuationInterceptor=Zi,Ji.Key=Yi,Ji.Element=Qi,ta.CoroutineContext=Ji,ta.AbstractCoroutineContextElement=Xi,Object.defineProperty(ta,"EmptyCoroutineContext",{get:no}),ta.CombinedContext=ro,Object.defineProperty(ea,"COROUTINE_SUSPENDED",{get:lo}),Object.defineProperty(ho,"COROUTINE_SUSPENDED",{get:_o}),Object.defineProperty(ho,"UNDECIDED",{get:yo}),Object.defineProperty(ho,"RESUMED",{get:mo}),ea.CoroutineSingletons=ho,ra.KClassifier=go,Go.appendElement_k2zgzt$=vo,Go.equals_4lte5s$=bo,Go.trimStart_wqw3xr$=wo,Go.trimEnd_wqw3xr$=xo,Go.regionMatchesImpl_4c7s8r$=No,Go.startsWith_sgbm27$=Io,Go.endsWith_sgbm27$=So,Go.indexOf_l5u8uk$=function(t,e,n,r){return void 0===n&&(n=0),void 0===r&&(r=!1),r||"string"!=typeof t?function(t,e,n,r,i,o){var a,s;void 0===o&&(o=!1);var u=o?D(K(n,Co(t)),Z(r,0)):new Mt(Z(n,0),K(r,t.length));if("string"==typeof t&&"string"==typeof e)for(a=u.iterator();a.hasNext();){var p=a.next();if(Ur(e,0,t,p,e.length,i))return p}else for(s=u.iterator();s.hasNext();){var c=s.next();if(No(e,0,t,c,e.length,i))return c}return -1}(t,e,n,t.length,r):t.indexOf(e,n)},Go.MatchGroupCollection=Eo,Ao.Destructured=zo,Go.MatchResult=Ao,Vo.Lazy=jo,Object.defineProperty(Vo,"UNINITIALIZED_VALUE",{get:Mo}),Vo.UnsafeLazyImpl=Ro,Vo.InitializedLazyImpl=Po,Vo.createFailure_tcv7n7$=Wo,Object.defineProperty(qo,"Companion",{get:Fo}),qo.Failure=Do,Vo.throwOnFailure_iacion$=Zo,Vo.NotImplementedError=Ko,st.prototype.getOrDefault_xwzc9p$=ot.prototype.getOrDefault_xwzc9p$,Gr.prototype.getOrDefault_xwzc9p$=ot.prototype.getOrDefault_xwzc9p$,Re.prototype.remove_xwzc9p$=st.prototype.remove_xwzc9p$,un.prototype.createJsMap=cn.prototype.createJsMap,ln.prototype.createJsMap=cn.prototype.createJsMap,Object.defineProperty(Lr.prototype,"destructured",Object.getOwnPropertyDescriptor(Ao.prototype,"destructured")),ot.prototype.getOrDefault_xwzc9p$,st.prototype.remove_xwzc9p$,st.prototype.getOrDefault_xwzc9p$,ot.prototype.getOrDefault_xwzc9p$,Qi.prototype.plus_1fupul$=Ji.prototype.plus_1fupul$,Zi.prototype.fold_3cc69b$=Qi.prototype.fold_3cc69b$,Zi.prototype.plus_1fupul$=Qi.prototype.plus_1fupul$,Xi.prototype.get_j3r2sn$=Qi.prototype.get_j3r2sn$,Xi.prototype.fold_3cc69b$=Qi.prototype.fold_3cc69b$,Xi.prototype.minusKey_yeqjby$=Qi.prototype.minusKey_yeqjby$,Xi.prototype.plus_1fupul$=Qi.prototype.plus_1fupul$,ro.prototype.plus_1fupul$=Ji.prototype.plus_1fupul$,At.prototype.contains_mef7kx$,At.prototype.isEmpty,"undefined"!=typeof process&&process.versions&&process.versions.node?new kn(process.stdout):new Cn,new In(no(),(function(e){var n;return Zo(e),null==(n=e.value)||t.isType(n,v)||b(),Wt})),fr=t.newArray(0,null),new ke((function(t,e){return Br(t,e,!0)})),new Int8Array([l(239),l(191),l(189)]),new qo(lo());}();})?n.apply(e,[e]):n)||(t.exports=r);},42:function(t,e,n){var r,i,o;i=[e,n(421)],void 0===(o="function"==typeof(r=function(t,e){var n=e.Kind.OBJECT,r=e.Kind.CLASS,i=(e.kotlin.js.internal.StringCompanionObject,Error),o=e.Kind.INTERFACE,a=e.toChar,s=e.ensureNotNull,u=e.kotlin.Unit,p=(e.kotlin.js.internal.IntCompanionObject,e.kotlin.js.internal.LongCompanionObject,e.kotlin.js.internal.FloatCompanionObject,e.kotlin.js.internal.DoubleCompanionObject,e.kotlin.collections.MutableIterator),c=e.hashCode,l=e.throwCCE,h=e.equals,f=e.kotlin.collections.MutableIterable,_=e.kotlin.collections.ArrayList_init_mqih57$,y=e.getKClass,d=e.kotlin.collections.Iterator,m=e.toByte,$=e.kotlin.collections.Iterable,g=e.toString,v=e.unboxChar,b=e.kotlin.collections.joinToString_fmv235$,w=e.kotlin.collections.setOf_i5x0yv$,x=e.kotlin.collections.ArrayList_init_ww73n8$,k=e.kotlin.text.iterator_gw00vp$,O=e.toBoxedChar,C=Math,N=e.kotlin.text.Regex_init_61zpoe$,I=e.kotlin.lazy_klfg04$,S=e.kotlin.text.replace_680rmw$,E=e.kotlin.text.StringBuilder_init_za3lpa$,A=e.kotlin.Annotation,z=String,j=e.kotlin.text.indexOf_l5u8uk$,L=e.kotlin.NumberFormatException,T=e.kotlin.Exception,M=Object,R=e.kotlin.collections.MutableList;function P(){q=this;}G.prototype=Object.create(i.prototype),G.prototype.constructor=G,Y.prototype=Object.create(i.prototype),Y.prototype.constructor=Y,X.prototype=Object.create(i.prototype),X.prototype.constructor=X,tt.prototype=Object.create(i.prototype),tt.prototype.constructor=tt,rt.prototype=Object.create(i.prototype),rt.prototype.constructor=rt,st.prototype=Object.create(xt.prototype),st.prototype.constructor=st,wt.prototype=Object.create(i.prototype),wt.prototype.constructor=wt,St.prototype=Object.create(qt.prototype),St.prototype.constructor=St,zt.prototype=Object.create(Xt.prototype),zt.prototype.constructor=zt,Bt.prototype=Object.create(Xt.prototype),Bt.prototype.constructor=Bt,Ut.prototype=Object.create(Xt.prototype),Ut.prototype.constructor=Ut,Ft.prototype=Object.create(Xt.prototype),Ft.prototype.constructor=Ft,Qt.prototype=Object.create(Xt.prototype),Qt.prototype.constructor=Qt,pe.prototype=Object.create(i.prototype),pe.prototype.constructor=pe,le.prototype=Object.create(re.prototype),le.prototype.constructor=le,ce.prototype=Object.create(ye.prototype),ce.prototype.constructor=ce,me.prototype=Object.create(ye.prototype),me.prototype.constructor=me,ve.prototype=Object.create(xt.prototype),ve.prototype.constructor=ve,be.prototype=Object.create(i.prototype),be.prototype.constructor=be,we.prototype=Object.create(i.prototype),we.prototype.constructor=we,Me.prototype=Object.create(Te.prototype),Me.prototype.constructor=Me,Re.prototype=Object.create(Te.prototype),Re.prototype.constructor=Re,Pe.prototype=Object.create(Te.prototype),Pe.prototype.constructor=Pe,Be.prototype=Object.create(i.prototype),Be.prototype.constructor=Be,Ue.prototype=Object.create(i.prototype),Ue.prototype.constructor=Ue,Ke.prototype=Object.create(i.prototype),Ke.prototype.constructor=Ke,He.prototype=Object.create(Pe.prototype),He.prototype.constructor=He,Je.prototype=Object.create(Pe.prototype),Je.prototype.constructor=Je,Ge.prototype=Object.create(Pe.prototype),Ge.prototype.constructor=Ge,Ye.prototype=Object.create(Pe.prototype),Ye.prototype.constructor=Ye,Qe.prototype=Object.create(Pe.prototype),Qe.prototype.constructor=Qe,Xe.prototype=Object.create(Pe.prototype),Xe.prototype.constructor=Xe,tn.prototype=Object.create(Pe.prototype),tn.prototype.constructor=tn,en.prototype=Object.create(Pe.prototype),en.prototype.constructor=en,nn.prototype=Object.create(Pe.prototype),nn.prototype.constructor=nn,rn.prototype=Object.create(Pe.prototype),rn.prototype.constructor=rn,P.prototype.fill_ugzc7n$=function(t,e){var n;n=t.length-1|0;for(var r=0;r<=n;r++)t[r]=e;},P.$metadata$={kind:n,simpleName:"Arrays",interfaces:[]};var q=null;function B(){return null===q&&new P,q}function U(t){void 0===t&&(t=""),this.src=t;}function F(t){this.this$ByteInputStream=t,this.next=0;}function D(){W=this;}F.prototype.read_8chfmy$=function(t,e,n){var r,i,o=0;r=e+n-1|0;for(var a=e;a<=r&&!(this.next>=this.this$ByteInputStream.src.length);a++)t[a]=this.this$ByteInputStream.src.charCodeAt((i=this.next,this.next=i+1|0,i)),o=o+1|0;return 0===o?-1:o},F.$metadata$={kind:r,interfaces:[nt]},U.prototype.bufferedReader=function(){return new F(this)},U.prototype.reader=function(){return this.bufferedReader()},U.$metadata$={kind:r,simpleName:"ByteInputStream",interfaces:[Q]},D.prototype.isWhitespace_s8itvh$=function(t){var e;switch(t){case 32:case 9:case 10:case 13:e=!0;break;default:e=!1;}return e},D.$metadata$={kind:n,simpleName:"Character",interfaces:[]};var W=null;function Z(){K=this;}Z.prototype.unmodifiableList_zfnyf4$=function(t){dt("not implemented");},Z.$metadata$={kind:n,simpleName:"Collections",interfaces:[]};var K=null;function V(){return null===K&&new Z,K}function H(t,e,n,r,i){var o,a,s=n;o=r+i-1|0;for(var u=r;u<=o;u++)e[(a=s,s=a+1|0,a)]=t.charCodeAt(u);}function J(t,e,n,r){return En().create_8chfmy$(e,n,r)}function G(t){void 0===t&&(t=null),i.call(this),this.message_opjsbb$_0=t,this.cause_18nhvr$_0=null,e.captureStack(i,this),this.name="IOException";}function Y(t){void 0===t&&(t=null),i.call(this),this.message_nykor0$_0=t,this.cause_n038z2$_0=null,e.captureStack(i,this),this.name="IllegalArgumentException";}function Q(){}function X(t){void 0===t&&(t=null),i.call(this),this.message_77za5l$_0=t,this.cause_jiegcr$_0=null,e.captureStack(i,this),this.name="NullPointerException";}function tt(){i.call(this),this.message_l78tod$_0=void 0,this.cause_y27uld$_0=null,e.captureStack(i,this),this.name="NumberFormatException";}function et(){}function nt(){}function rt(t){void 0===t&&(t=null),i.call(this),this.message_2hhrll$_0=t,this.cause_blbmi1$_0=null,e.captureStack(i,this),this.name="RuntimeException";}function it(t,e){return e=e||Object.create(rt.prototype),rt.call(e,t.message),e}function ot(){this.value="";}function at(t){this.string=t,this.nextPos_0=0;}function st(){Nt(this),this.value="";}function ut(t,e){e();}function pt(t){return new U(t)}function ct(t,e,n){dt("implement");}function lt(t,e){dt("implement");}function ht(t,e,n){dt("implement");}function ft(t,e,n){dt("implement");}function _t(t,e){dt("implement");}function yt(t,e){dt("implement");}function dt(t){throw e.newThrowable(t)}function mt(t,e){dt("implement");}function $t(t,e){dt("implement");}function gt(t,e){dt("implement");}function vt(t,e){dt("implement");}function bt(t,e){dt("implement");}function wt(t){void 0===t&&(t=null),i.call(this),this.message_3rkdyj$_0=t,this.cause_2kxft9$_0=null,e.captureStack(i,this),this.name="UnsupportedOperationException";}function xt(){Ct(),this.writeBuffer_9jar4r$_0=null,this.lock=null;}function kt(){Ot=this,this.WRITE_BUFFER_SIZE_0=1024;}Object.defineProperty(G.prototype,"message",{get:function(){return this.message_opjsbb$_0}}),Object.defineProperty(G.prototype,"cause",{get:function(){return this.cause_18nhvr$_0}}),G.$metadata$={kind:r,simpleName:"IOException",interfaces:[i]},Object.defineProperty(Y.prototype,"message",{get:function(){return this.message_nykor0$_0}}),Object.defineProperty(Y.prototype,"cause",{get:function(){return this.cause_n038z2$_0}}),Y.$metadata$={kind:r,simpleName:"IllegalArgumentException",interfaces:[i]},Q.$metadata$={kind:o,simpleName:"InputStream",interfaces:[]},Object.defineProperty(X.prototype,"message",{get:function(){return this.message_77za5l$_0}}),Object.defineProperty(X.prototype,"cause",{get:function(){return this.cause_jiegcr$_0}}),X.$metadata$={kind:r,simpleName:"NullPointerException",interfaces:[i]},Object.defineProperty(tt.prototype,"message",{get:function(){return this.message_l78tod$_0}}),Object.defineProperty(tt.prototype,"cause",{get:function(){return this.cause_y27uld$_0}}),tt.$metadata$={kind:r,simpleName:"NumberFormatException",interfaces:[i]},et.prototype.defaultReadObject=function(){dt("not implemented");},et.$metadata$={kind:o,simpleName:"ObjectInputStream",interfaces:[]},nt.$metadata$={kind:o,simpleName:"Reader",interfaces:[]},Object.defineProperty(rt.prototype,"message",{get:function(){return this.message_2hhrll$_0}}),Object.defineProperty(rt.prototype,"cause",{get:function(){return this.cause_blbmi1$_0}}),rt.$metadata$={kind:r,simpleName:"RuntimeException",interfaces:[i]},Object.defineProperty(ot.prototype,"length",{configurable:!0,get:function(){return this.value.length},set:function(t){this.value=this.value.substring(0,t);}}),ot.prototype.append_8chfmy$=function(t,e,n){var r;r=e+n-1|0;for(var i=e;i<=r;i++)this.value+=String.fromCharCode(t[i]);},ot.prototype.append_s8itvh$=function(t){this.value+=String.fromCharCode(t);},ot.prototype.append_61zpoe$=function(t){var e;e=t.length-1|0;for(var n=0;n<=e;n++)this.value+=String.fromCharCode(t.charCodeAt(n));},ot.prototype.isEmpty=function(){return 0===this.length},ot.prototype.toString=function(){return this.value},ot.prototype.byteInputStream=function(){return new U(this.value)},ot.$metadata$={kind:r,simpleName:"StringBuilder",interfaces:[]},at.prototype.read_8chfmy$=function(t,e,n){var r,i,o=0;r=e+n-1|0;for(var a=e;a<=r&&!(this.nextPos_0>=this.string.length);a++)t[a]=this.string.charCodeAt((i=this.nextPos_0,this.nextPos_0=i+1|0,i)),o=o+1|0;return o>0?o:-1},at.$metadata$={kind:r,simpleName:"StringReader",interfaces:[nt]},st.prototype.write_8chfmy$=function(t,e,n){var r;r=e+n-1|0;for(var i=e;i<=r;i++)this.value+=String.fromCharCode(t[i]);},st.prototype.flush=function(){this.value="";},st.prototype.close=function(){},st.prototype.toString=function(){return this.value},st.$metadata$={kind:r,simpleName:"StringWriter",interfaces:[xt]},Object.defineProperty(wt.prototype,"message",{get:function(){return this.message_3rkdyj$_0}}),Object.defineProperty(wt.prototype,"cause",{get:function(){return this.cause_2kxft9$_0}}),wt.$metadata$={kind:r,simpleName:"UnsupportedOperationException",interfaces:[i]},xt.prototype.write_za3lpa$=function(t){var n,r;ut(this.lock,(n=this,r=t,function(){return null==n.writeBuffer_9jar4r$_0&&(n.writeBuffer_9jar4r$_0=e.charArray(Ct().WRITE_BUFFER_SIZE_0)),s(n.writeBuffer_9jar4r$_0)[0]=a(r),n.write_8chfmy$(s(n.writeBuffer_9jar4r$_0),0,1),u}));},xt.prototype.write_4hbowm$=function(t){this.write_8chfmy$(t,0,t.length);},xt.prototype.write_61zpoe$=function(t){this.write_3m52m6$(t,0,t.length);},xt.prototype.write_3m52m6$=function(t,n,r){var i,o,a,p;ut(this.lock,(i=r,o=this,a=t,p=n,function(){var t;return i<=Ct().WRITE_BUFFER_SIZE_0?(null==o.writeBuffer_9jar4r$_0&&(o.writeBuffer_9jar4r$_0=e.charArray(Ct().WRITE_BUFFER_SIZE_0)),t=s(o.writeBuffer_9jar4r$_0)):t=e.charArray(i),H(a,t,0,p,p+i|0),o.write_8chfmy$(t,0,i),u}));},xt.prototype.append_gw00v9$=function(t){return null==t?this.write_61zpoe$("null"):this.write_61zpoe$(t.toString()),this},xt.prototype.append_ezbsdh$=function(t,n,r){var i=null!=t?t:"null";return this.write_61zpoe$(e.subSequence(i,n,r).toString()),this},xt.prototype.append_s8itvh$=function(t){return this.write_za3lpa$(0|t),this},kt.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Ot=null;function Ct(){return null===Ot&&new kt,Ot}function Nt(t){return t=t||Object.create(xt.prototype),xt.call(t),t.lock=t,t}function It(){Et=this,this.NULL=new Bt("null"),this.TRUE=new Bt("true"),this.FALSE=new Bt("false");}function St(){qt.call(this),this.value_wcgww9$_0=null;}xt.$metadata$={kind:r,simpleName:"Writer",interfaces:[]},It.prototype.value_za3lpa$=function(t){return new Ut(ft())},It.prototype.value_s8cxhz$=function(t){return new Ut(ht())},It.prototype.value_mx4ult$=function(t){if(gt()||$t())throw new Y("Infinite and NaN values not permitted in JSON");return new Ut(this.cutOffPointZero_0(_t()))},It.prototype.value_14dthe$=function(t){if(bt()||vt())throw new Y("Infinite and NaN values not permitted in JSON");return new Ut(this.cutOffPointZero_0(yt()))},It.prototype.value_pdl1vj$=function(t){return null==t?this.NULL:new Qt(t)},It.prototype.value_6taknv$=function(t){return t?this.TRUE:this.FALSE},It.prototype.array=function(){return Rt()},It.prototype.array_pmhfmb$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_za3lpa$(r);}return n},It.prototype.array_2muz52$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_s8cxhz$(r);}return n},It.prototype.array_8cqhcw$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_mx4ult$(r);}return n},It.prototype.array_yqxtqz$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_14dthe$(r);}return n},It.prototype.array_wwrst0$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_6taknv$(r);}return n},It.prototype.array_vqirvp$=function(t){var e,n=Rt();for(e=0;e!==t.length;++e){var r=t[e];n.add_61zpoe$(r);}return n},It.prototype.object=function(){return Gt()},It.prototype.parse_61zpoe$=function(t){return (new dn).parse_61zpoe$(t)},It.prototype.parse_6nb378$=function(t){return (new dn).streamToValue(new xn(t))},It.prototype.cutOffPointZero_0=function(t){var e;if(mt()){var n=t.length-2|0;e=t.substring(0,n);}else e=t;return e},Object.defineProperty(St.prototype,"value",{configurable:!0,get:function(){return this.value_wcgww9$_0},set:function(t){this.value_wcgww9$_0=t;}}),St.prototype.startArray=function(){return Rt()},St.prototype.startObject=function(){return Gt()},St.prototype.endNull=function(){this.value=At().NULL;},St.prototype.endBoolean_6taknv$=function(t){this.value=t?At().TRUE:At().FALSE;},St.prototype.endString_61zpoe$=function(t){this.value=new Qt(t);},St.prototype.endNumber_61zpoe$=function(t){this.value=new Ut(t);},St.prototype.endArray_11rb$=function(t){this.value=t;},St.prototype.endObject_11rc$=function(t){this.value=t;},St.prototype.endArrayValue_11rb$=function(t){null!=t&&t.add_luq74r$(this.value);},St.prototype.endObjectValue_otyqx2$=function(t,e){null!=t&&t.add_8kvr2e$(e,this.value);},St.$metadata$={kind:r,simpleName:"DefaultHandler",interfaces:[qt]},It.$metadata$={kind:n,simpleName:"Json",interfaces:[]};var Et=null;function At(){return null===Et&&new It,Et}function zt(){Mt(),this.values_0=null;}function jt(t){this.closure$iterator=t;}function Lt(){Tt=this;}Object.defineProperty(zt.prototype,"isEmpty",{configurable:!0,get:function(){return this.values_0.isEmpty()}}),zt.prototype.add_za3lpa$=function(t){return this.values_0.add_11rb$(At().value_za3lpa$(t)),this},zt.prototype.add_s8cxhz$=function(t){return this.values_0.add_11rb$(At().value_s8cxhz$(t)),this},zt.prototype.add_mx4ult$=function(t){return this.values_0.add_11rb$(At().value_mx4ult$(t)),this},zt.prototype.add_14dthe$=function(t){return this.values_0.add_11rb$(At().value_14dthe$(t)),this},zt.prototype.add_6taknv$=function(t){return this.values_0.add_11rb$(At().value_6taknv$(t)),this},zt.prototype.add_61zpoe$=function(t){return this.values_0.add_11rb$(At().value_pdl1vj$(t)),this},zt.prototype.add_luq74r$=function(t){if(null==t)throw new X("value is null");return this.values_0.add_11rb$(t),this},zt.prototype.set_vux9f0$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_za3lpa$(e)),this},zt.prototype.set_6svq3l$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_s8cxhz$(e)),this},zt.prototype.set_24o109$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_mx4ult$(e)),this},zt.prototype.set_5wr77w$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_14dthe$(e)),this},zt.prototype.set_fzusl$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_6taknv$(e)),this},zt.prototype.set_19mbxw$=function(t,e){return this.values_0.set_wxm5ur$(t,At().value_pdl1vj$(e)),this},zt.prototype.set_zefct7$=function(t,e){if(null==e)throw new X("value is null");return this.values_0.set_wxm5ur$(t,e),this},zt.prototype.remove_za3lpa$=function(t){return this.values_0.removeAt_za3lpa$(t),this},zt.prototype.size=function(){return this.values_0.size},zt.prototype.get_za3lpa$=function(t){return this.values_0.get_za3lpa$(t)},zt.prototype.values=function(){return V().unmodifiableList_zfnyf4$(this.values_0)},jt.prototype.hasNext=function(){return this.closure$iterator.hasNext()},jt.prototype.next=function(){return this.closure$iterator.next()},jt.prototype.remove=function(){throw new wt},jt.$metadata$={kind:r,interfaces:[p]},zt.prototype.iterator=function(){return new jt(this.values_0.iterator())},zt.prototype.write_l4e0ba$=function(t){t.writeArrayOpen();var e=this.iterator();if(e.hasNext())for(e.next().write_l4e0ba$(t);e.hasNext();)t.writeArraySeparator(),e.next().write_l4e0ba$(t);t.writeArrayClose();},Object.defineProperty(zt.prototype,"isArray",{configurable:!0,get:function(){return !0}}),zt.prototype.asArray=function(){return this},zt.prototype.hashCode=function(){return c(this.values_0)},zt.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,zt)?r:l();return h(this.values_0,s(i).values_0)},Lt.prototype.readFrom_6nb378$=function(t){return ne().readFromReader_6nb378$(t).asArray()},Lt.prototype.readFrom_61zpoe$=function(t){return ne().readFrom_61zpoe$(t).asArray()},Lt.prototype.unmodifiableArray_v27daa$=function(t){return Pt(t,!0)},Lt.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Tt=null;function Mt(){return null===Tt&&new Lt,Tt}function Rt(t){return t=t||Object.create(zt.prototype),Xt.call(t),zt.call(t),t.values_0=new Tn,t}function Pt(t,e,n){if(n=n||Object.create(zt.prototype),Xt.call(n),zt.call(n),null==t)throw new X("array is null");return n.values_0=e?V().unmodifiableList_zfnyf4$(t.values_0):_(t.values_0),n}function qt(){this.parser_3qxlfk$_0=null;}function Bt(t){Xt.call(this),this.value=t,this.isNull_35npp$_0=h("null",this.value),this.isTrue_3de4$_0=h("true",this.value),this.isFalse_6t83vt$_0=h("false",this.value);}function Ut(t){Xt.call(this),this.string_0=t;}function Ft(){Jt(),this.names_0=null,this.values_0=null,this.table_0=null;}function Dt(t,e){this.closure$namesIterator=t,this.closure$valuesIterator=e;}function Wt(t,e){this.name=t,this.value=e;}function Zt(){this.hashTable_0=new Int8Array(32);}function Kt(t){return t=t||Object.create(Zt.prototype),Zt.call(t),t}function Vt(){Ht=this;}zt.$metadata$={kind:r,simpleName:"JsonArray",interfaces:[f,Xt]},Object.defineProperty(qt.prototype,"parser",{configurable:!0,get:function(){return this.parser_3qxlfk$_0},set:function(t){this.parser_3qxlfk$_0=t;}}),Object.defineProperty(qt.prototype,"location",{configurable:!0,get:function(){return s(this.parser).location}}),qt.prototype.startNull=function(){},qt.prototype.endNull=function(){},qt.prototype.startBoolean=function(){},qt.prototype.endBoolean_6taknv$=function(t){},qt.prototype.startString=function(){},qt.prototype.endString_61zpoe$=function(t){},qt.prototype.startNumber=function(){},qt.prototype.endNumber_61zpoe$=function(t){},qt.prototype.startArray=function(){return null},qt.prototype.endArray_11rb$=function(t){},qt.prototype.startArrayValue_11rb$=function(t){},qt.prototype.endArrayValue_11rb$=function(t){},qt.prototype.startObject=function(){return null},qt.prototype.endObject_11rc$=function(t){},qt.prototype.startObjectName_11rc$=function(t){},qt.prototype.endObjectName_otyqx2$=function(t,e){},qt.prototype.startObjectValue_otyqx2$=function(t,e){},qt.prototype.endObjectValue_otyqx2$=function(t,e){},qt.$metadata$={kind:r,simpleName:"JsonHandler",interfaces:[]},Object.defineProperty(Bt.prototype,"isNull",{configurable:!0,get:function(){return this.isNull_35npp$_0}}),Object.defineProperty(Bt.prototype,"isTrue",{configurable:!0,get:function(){return this.isTrue_3de4$_0}}),Object.defineProperty(Bt.prototype,"isFalse",{configurable:!0,get:function(){return this.isFalse_6t83vt$_0}}),Object.defineProperty(Bt.prototype,"isBoolean",{configurable:!0,get:function(){return this.isTrue||this.isFalse}}),Bt.prototype.write_l4e0ba$=function(t){t.writeLiteral_y4putb$(this.value);},Bt.prototype.toString=function(){return this.value},Bt.prototype.hashCode=function(){return c(this.value)},Bt.prototype.asBoolean=function(){return this.isNull?Xt.prototype.asBoolean.call(this):this.isTrue},Bt.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=y(Bt))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,Bt)?r:l();return h(this.value,s(i).value)},Bt.$metadata$={kind:r,simpleName:"JsonLiteral",interfaces:[Xt]},Object.defineProperty(Ut.prototype,"isNumber",{configurable:!0,get:function(){return !0}}),Ut.prototype.toString=function(){return this.string_0},Ut.prototype.write_l4e0ba$=function(t){t.writeNumber_y4putb$(this.string_0);},Ut.prototype.asInt=function(){return Bn(0,this.string_0,10)},Ut.prototype.asLong=function(){return ct(0,this.string_0)},Ut.prototype.asFloat=function(){return lt(0,this.string_0)},Ut.prototype.asDouble=function(){return Ln(0,this.string_0)},Ut.prototype.hashCode=function(){return c(this.string_0)},Ut.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,Ut)?r:l();return h(this.string_0,s(i).string_0)},Ut.$metadata$={kind:r,simpleName:"JsonNumber",interfaces:[Xt]},Object.defineProperty(Ft.prototype,"isEmpty",{configurable:!0,get:function(){return this.names_0.isEmpty()}}),Object.defineProperty(Ft.prototype,"isObject",{configurable:!0,get:function(){return !0}}),Ft.prototype.add_bm4lxs$=function(t,e){return this.add_8kvr2e$(t,At().value_za3lpa$(e)),this},Ft.prototype.add_4wgjuj$=function(t,e){return this.add_8kvr2e$(t,At().value_s8cxhz$(e)),this},Ft.prototype.add_9sobi5$=function(t,e){return this.add_8kvr2e$(t,At().value_mx4ult$(e)),this},Ft.prototype.add_io5o9c$=function(t,e){return this.add_8kvr2e$(t,At().value_14dthe$(e)),this},Ft.prototype.add_ivxn3r$=function(t,e){return this.add_8kvr2e$(t,At().value_6taknv$(e)),this},Ft.prototype.add_puj7f4$=function(t,e){return this.add_8kvr2e$(t,At().value_pdl1vj$(e)),this},Ft.prototype.add_8kvr2e$=function(t,e){if(null==t)throw new X("name is null");if(null==e)throw new X("value is null");return s(this.table_0).add_bm4lxs$(t,this.names_0.size),this.names_0.add_11rb$(t),this.values_0.add_11rb$(e),this},Ft.prototype.set_bm4lxs$=function(t,e){return this.set_8kvr2e$(t,At().value_za3lpa$(e)),this},Ft.prototype.set_4wgjuj$=function(t,e){return this.set_8kvr2e$(t,At().value_s8cxhz$(e)),this},Ft.prototype.set_9sobi5$=function(t,e){return this.set_8kvr2e$(t,At().value_mx4ult$(e)),this},Ft.prototype.set_io5o9c$=function(t,e){return this.set_8kvr2e$(t,At().value_14dthe$(e)),this},Ft.prototype.set_ivxn3r$=function(t,e){return this.set_8kvr2e$(t,At().value_6taknv$(e)),this},Ft.prototype.set_puj7f4$=function(t,e){return this.set_8kvr2e$(t,At().value_pdl1vj$(e)),this},Ft.prototype.set_8kvr2e$=function(t,e){if(null==t)throw new X("name is null");if(null==e)throw new X("value is null");var n=this.indexOf_y4putb$(t);return -1!==n?this.values_0.set_wxm5ur$(n,e):(s(this.table_0).add_bm4lxs$(t,this.names_0.size),this.names_0.add_11rb$(t),this.values_0.add_11rb$(e)),this},Ft.prototype.remove_pdl1vj$=function(t){if(null==t)throw new X("name is null");var e=this.indexOf_y4putb$(t);return -1!==e&&(s(this.table_0).remove_za3lpa$(e),this.names_0.removeAt_za3lpa$(e),this.values_0.removeAt_za3lpa$(e)),this},Ft.prototype.merge_1kkabt$=function(t){var e;if(null==t)throw new X("object is null");for(e=t.iterator();e.hasNext();){var n=e.next();this.set_8kvr2e$(n.name,n.value);}return this},Ft.prototype.get_pdl1vj$=function(t){if(null==t)throw new X("name is null");var e=this.indexOf_y4putb$(t);return -1!==e?this.values_0.get_za3lpa$(e):null},Ft.prototype.getInt_bm4lxs$=function(t,e){var n,r=this.get_pdl1vj$(t);return null!=(n=null!=r?r.asInt():null)?n:e},Ft.prototype.getLong_4wgjuj$=function(t,e){var n,r=this.get_pdl1vj$(t);return null!=(n=null!=r?r.asLong():null)?n:e},Ft.prototype.getFloat_9sobi5$=function(t,e){var n,r=this.get_pdl1vj$(t);return null!=(n=null!=r?r.asFloat():null)?n:e},Ft.prototype.getDouble_io5o9c$=function(t,e){var n,r=this.get_pdl1vj$(t);return null!=(n=null!=r?r.asDouble():null)?n:e},Ft.prototype.getBoolean_ivxn3r$=function(t,e){var n,r=this.get_pdl1vj$(t);return null!=(n=null!=r?r.asBoolean():null)?n:e},Ft.prototype.getString_puj7f4$=function(t,e){var n=this.get_pdl1vj$(t);return null!=n?n.asString():e},Ft.prototype.size=function(){return this.names_0.size},Ft.prototype.names=function(){return V().unmodifiableList_zfnyf4$(this.names_0)},Dt.prototype.hasNext=function(){return this.closure$namesIterator.hasNext()},Dt.prototype.next=function(){return new Wt(this.closure$namesIterator.next(),this.closure$valuesIterator.next())},Dt.$metadata$={kind:r,interfaces:[d]},Ft.prototype.iterator=function(){return new Dt(this.names_0.iterator(),this.values_0.iterator())},Ft.prototype.write_l4e0ba$=function(t){t.writeObjectOpen();var e=this.names_0.iterator(),n=this.values_0.iterator();if(e.hasNext())for(t.writeMemberName_y4putb$(e.next()),t.writeMemberSeparator(),n.next().write_l4e0ba$(t);e.hasNext();)t.writeObjectSeparator(),t.writeMemberName_y4putb$(e.next()),t.writeMemberSeparator(),n.next().write_l4e0ba$(t);t.writeObjectClose();},Ft.prototype.asObject=function(){return this},Ft.prototype.hashCode=function(){var t=1;return (31*(t=(31*t|0)+c(this.names_0)|0)|0)+c(this.values_0)|0},Ft.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,Ft)?r:l();return h(this.names_0,s(i).names_0)&&h(this.values_0,i.values_0)},Ft.prototype.indexOf_y4putb$=function(t){var e=s(this.table_0).get_za3rmp$(t);return -1!==e&&h(t,this.names_0.get_za3lpa$(e))?e:this.names_0.lastIndexOf_11rb$(t)},Ft.prototype.readObject_0=function(t){t.defaultReadObject(),this.table_0=Kt(),this.updateHashIndex_0();},Ft.prototype.updateHashIndex_0=function(){var t;t=this.names_0.size-1|0;for(var e=0;e<=t;e++)s(this.table_0).add_bm4lxs$(this.names_0.get_za3lpa$(e),e);},Wt.prototype.hashCode=function(){var t=1;return (31*(t=(31*t|0)+c(this.name)|0)|0)+c(this.value)|0},Wt.prototype.equals=function(t){var n,r,i;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var o=null==(r=t)||e.isType(r,Wt)?r:l();return h(this.name,s(o).name)&&(null!=(i=this.value)?i.equals(o.value):null)},Wt.$metadata$={kind:r,simpleName:"Member",interfaces:[]},Zt.prototype.add_bm4lxs$=function(t,e){var n=this.hashSlotFor_0(t);this.hashTable_0[n]=e<255?m(e+1|0):0;},Zt.prototype.remove_za3lpa$=function(t){var e;e=this.hashTable_0.length-1|0;for(var n=0;n<=e;n++)if(this.hashTable_0[n]===(t+1|0))this.hashTable_0[n]=0;else if(this.hashTable_0[n]>(t+1|0)){var r;(r=this.hashTable_0)[n]=m(r[n]-1);}},Zt.prototype.get_za3rmp$=function(t){var e=this.hashSlotFor_0(t);return (255&this.hashTable_0[e])-1|0},Zt.prototype.hashSlotFor_0=function(t){return c(t)&this.hashTable_0.length-1},Zt.$metadata$={kind:r,simpleName:"HashIndexTable",interfaces:[]},Vt.prototype.readFrom_6nb378$=function(t){return ne().readFromReader_6nb378$(t).asObject()},Vt.prototype.readFrom_61zpoe$=function(t){return ne().readFrom_61zpoe$(t).asObject()},Vt.prototype.unmodifiableObject_p5jd56$=function(t){return Yt(t,!0)},Vt.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Ht=null;function Jt(){return null===Ht&&new Vt,Ht}function Gt(t){return t=t||Object.create(Ft.prototype),Xt.call(t),Ft.call(t),t.names_0=new Tn,t.values_0=new Tn,t.table_0=Kt(),t}function Yt(t,e,n){if(n=n||Object.create(Ft.prototype),Xt.call(n),Ft.call(n),null==t)throw new X("object is null");return e?(n.names_0=V().unmodifiableList_zfnyf4$(t.names_0),n.values_0=V().unmodifiableList_zfnyf4$(t.values_0)):(n.names_0=_(t.names_0),n.values_0=_(t.values_0)),n.table_0=Kt(),n.updateHashIndex_0(),n}function Qt(t){Xt.call(this),this.string_0=t;}function Xt(){ne();}function te(){ee=this,this.TRUE=new Bt("true"),this.FALSE=new Bt("false"),this.NULL=new Bt("null");}Ft.$metadata$={kind:r,simpleName:"JsonObject",interfaces:[$,Xt]},Qt.prototype.write_l4e0ba$=function(t){t.writeString_y4putb$(this.string_0);},Object.defineProperty(Qt.prototype,"isString",{configurable:!0,get:function(){return !0}}),Qt.prototype.asString=function(){return this.string_0},Qt.prototype.hashCode=function(){return c(this.string_0)},Qt.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,Qt)?r:l();return h(this.string_0,s(i).string_0)},Qt.$metadata$={kind:r,simpleName:"JsonString",interfaces:[Xt]},Object.defineProperty(Xt.prototype,"isObject",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isArray",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isNumber",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isString",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isBoolean",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isTrue",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isFalse",{configurable:!0,get:function(){return !1}}),Object.defineProperty(Xt.prototype,"isNull",{configurable:!0,get:function(){return !1}}),Xt.prototype.asObject=function(){throw new wt("Not an object: "+this.toString())},Xt.prototype.asArray=function(){throw new wt("Not an array: "+this.toString())},Xt.prototype.asInt=function(){throw new wt("Not a number: "+this.toString())},Xt.prototype.asLong=function(){throw new wt("Not a number: "+this.toString())},Xt.prototype.asFloat=function(){throw new wt("Not a number: "+this.toString())},Xt.prototype.asDouble=function(){throw new wt("Not a number: "+this.toString())},Xt.prototype.asString=function(){throw new wt("Not a string: "+this.toString())},Xt.prototype.asBoolean=function(){throw new wt("Not a boolean: "+this.toString())},Xt.prototype.writeTo_j6tqms$=function(t,e){if(void 0===e&&(e=ge().MINIMAL),null==t)throw new X("writer is null");if(null==e)throw new X("config is null");var n=new ve(t,128);this.write_l4e0ba$(e.createWriter_97tyn8$(n)),n.flush();},Xt.prototype.toString=function(){return this.toString_fmi98k$(ge().MINIMAL)},Xt.prototype.toString_fmi98k$=function(t){var n=new st;try{this.writeTo_j6tqms$(n,t);}catch(t){throw e.isType(t,G)?it(t):t}return n.toString()},Xt.prototype.equals=function(t){return this===t},te.prototype.readFromReader_6nb378$=function(t){return At().parse_6nb378$(t)},te.prototype.readFrom_61zpoe$=function(t){return At().parse_61zpoe$(t)},te.prototype.valueOf_za3lpa$=function(t){return At().value_za3lpa$(t)},te.prototype.valueOf_s8cxhz$=function(t){return At().value_s8cxhz$(t)},te.prototype.valueOf_mx4ult$=function(t){return At().value_mx4ult$(t)},te.prototype.valueOf_14dthe$=function(t){return At().value_14dthe$(t)},te.prototype.valueOf_61zpoe$=function(t){return At().value_pdl1vj$(t)},te.prototype.valueOf_6taknv$=function(t){return At().value_6taknv$(t)},te.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var ee=null;function ne(){return null===ee&&new te,ee}function re(t){ae(),this.writer=t;}function ie(){oe=this,this.CONTROL_CHARACTERS_END_0=31,this.QUOT_CHARS_0=e.charArrayOf(92,34),this.BS_CHARS_0=e.charArrayOf(92,92),this.LF_CHARS_0=e.charArrayOf(92,110),this.CR_CHARS_0=e.charArrayOf(92,114),this.TAB_CHARS_0=e.charArrayOf(92,116),this.UNICODE_2028_CHARS_0=e.charArrayOf(92,117,50,48,50,56),this.UNICODE_2029_CHARS_0=e.charArrayOf(92,117,50,48,50,57),this.HEX_DIGITS_0=e.charArrayOf(48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102);}Xt.$metadata$={kind:r,simpleName:"JsonValue",interfaces:[]},re.prototype.writeLiteral_y4putb$=function(t){this.writer.write_61zpoe$(t);},re.prototype.writeNumber_y4putb$=function(t){this.writer.write_61zpoe$(t);},re.prototype.writeString_y4putb$=function(t){se(this.writer,34),this.writeJsonString_y4putb$(t),se(this.writer,34);},re.prototype.writeArrayOpen=function(){se(this.writer,91);},re.prototype.writeArrayClose=function(){se(this.writer,93);},re.prototype.writeArraySeparator=function(){se(this.writer,44);},re.prototype.writeObjectOpen=function(){se(this.writer,123);},re.prototype.writeObjectClose=function(){se(this.writer,125);},re.prototype.writeMemberName_y4putb$=function(t){se(this.writer,34),this.writeJsonString_y4putb$(t),se(this.writer,34);},re.prototype.writeMemberSeparator=function(){se(this.writer,58);},re.prototype.writeObjectSeparator=function(){se(this.writer,44);},re.prototype.writeJsonString_y4putb$=function(t){var e,n=t.length,r=0;e=n-1|0;for(var i=0;i<=e;i++){var o=ae().getReplacementChars_0(t.charCodeAt(i));null!=o&&(this.writer.write_3m52m6$(t,r,i-r|0),this.writer.write_4hbowm$(o),r=i+1|0);}this.writer.write_3m52m6$(t,r,n-r|0);},ie.prototype.getReplacementChars_0=function(t){return t>92?t<8232||t>8233?null:8232===t?this.UNICODE_2028_CHARS_0:this.UNICODE_2029_CHARS_0:92===t?this.BS_CHARS_0:t>34?null:34===t?this.QUOT_CHARS_0:(0|t)>this.CONTROL_CHARACTERS_END_0?null:10===t?this.LF_CHARS_0:13===t?this.CR_CHARS_0:9===t?this.TAB_CHARS_0:e.charArrayOf(92,117,48,48,this.HEX_DIGITS_0[(0|t)>>4&15],this.HEX_DIGITS_0[15&(0|t)])},ie.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var oe=null;function ae(){return null===oe&&new ie,oe}function se(t,e){t.write_za3lpa$(0|e);}function ue(t,e,n){this.offset=t,this.line=e,this.column=n;}function pe(t,n){i.call(this),this.message_72rz6e$_0=t+" at "+g(n),this.cause_95carw$_0=null,this.location=n,e.captureStack(i,this),this.name="ParseException";}function ce(t){_e(),ye.call(this),this.indentChars_0=t;}function le(t,e){re.call(this,t),this.indentChars_0=e,this.indent_0=0;}function he(){fe=this;}re.$metadata$={kind:r,simpleName:"JsonWriter",interfaces:[]},ue.prototype.toString=function(){return this.line.toString()+":"+g(this.column)},ue.prototype.hashCode=function(){return this.offset},ue.prototype.equals=function(t){var n,r;if(this===t)return !0;if(null==t)return !1;if(null==(n=e.getKClassFromExpression(this))||!n.equals(e.getKClassFromExpression(t)))return !1;var i=null==(r=t)||e.isType(r,ue)?r:l();return this.offset===s(i).offset&&this.column===i.column&&this.line===i.line},ue.$metadata$={kind:r,simpleName:"Location",interfaces:[]},Object.defineProperty(pe.prototype,"offset",{configurable:!0,get:function(){return this.location.offset}}),Object.defineProperty(pe.prototype,"line",{configurable:!0,get:function(){return this.location.line}}),Object.defineProperty(pe.prototype,"column",{configurable:!0,get:function(){return this.location.column}}),Object.defineProperty(pe.prototype,"message",{get:function(){return this.message_72rz6e$_0}}),Object.defineProperty(pe.prototype,"cause",{get:function(){return this.cause_95carw$_0}}),pe.$metadata$={kind:r,simpleName:"ParseException",interfaces:[i]},ce.prototype.createWriter_97tyn8$=function(t){return new le(t,this.indentChars_0)},le.prototype.writeArrayOpen=function(){this.indent_0=this.indent_0+1|0,this.writer.write_za3lpa$(91),this.writeNewLine_0();},le.prototype.writeArrayClose=function(){this.indent_0=this.indent_0-1|0,this.writeNewLine_0(),this.writer.write_za3lpa$(93);},le.prototype.writeArraySeparator=function(){this.writer.write_za3lpa$(44),this.writeNewLine_0()||this.writer.write_za3lpa$(32);},le.prototype.writeObjectOpen=function(){this.indent_0=this.indent_0+1|0,this.writer.write_za3lpa$(123),this.writeNewLine_0();},le.prototype.writeObjectClose=function(){this.indent_0=this.indent_0-1|0,this.writeNewLine_0(),this.writer.write_za3lpa$(125);},le.prototype.writeMemberSeparator=function(){this.writer.write_za3lpa$(58),this.writer.write_za3lpa$(32);},le.prototype.writeObjectSeparator=function(){this.writer.write_za3lpa$(44),this.writeNewLine_0()||this.writer.write_za3lpa$(32);},le.prototype.writeNewLine_0=function(){var t;if(null==this.indentChars_0)return !1;this.writer.write_za3lpa$(10),t=this.indent_0-1|0;for(var e=0;e<=t;e++)this.writer.write_4hbowm$(this.indentChars_0);return !0},le.$metadata$={kind:r,simpleName:"PrettyPrintWriter",interfaces:[re]},he.prototype.singleLine=function(){return new ce(e.charArray(0))},he.prototype.indentWithSpaces_za3lpa$=function(t){if(t<0)throw new Y("number is negative");var n=e.charArray(t);return B().fill_ugzc7n$(n,32),new ce(n)},he.prototype.indentWithTabs=function(){return new ce(e.charArrayOf(9))},he.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var fe=null;function _e(){return null===fe&&new he,fe}function ye(){ge();}function de(){$e=this,this.MINIMAL=new me,this.PRETTY_PRINT=_e().indentWithSpaces_za3lpa$(2);}function me(){ye.call(this);}ce.$metadata$={kind:r,simpleName:"PrettyPrint",interfaces:[ye]},me.prototype.createWriter_97tyn8$=function(t){return new re(t)},me.$metadata$={kind:r,interfaces:[ye]},de.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var $e=null;function ge(){return null===$e&&new de,$e}function ve(t,n){void 0===n&&(n=16),Nt(this),this.writer_0=t,this.buffer_0=null,this.fill_0=0,this.buffer_0=e.charArray(n);}function be(t){void 0===t&&(t=null),i.call(this),this.message_y7nasg$_0=t,this.cause_26vz5q$_0=null,e.captureStack(i,this),this.name="SyntaxException";}function we(t){void 0===t&&(t=null),i.call(this),this.message_kt89er$_0=t,this.cause_c2uidd$_0=null,e.captureStack(i,this),this.name="IoException";}function xe(t){Ce(),this.flex=t,this.myTokenType_0=null,this.bufferSequence_i8enee$_0=null,this.myTokenStart_0=0,this.myTokenEnd_0=0,this.bufferEnd_7ee91e$_0=0,this.myState_0=0,this.myFailed_0=!1;}function ke(){Oe=this;}ye.$metadata$={kind:r,simpleName:"WriterConfig",interfaces:[]},ve.prototype.write_za3lpa$=function(t){var e;this.fill_0>(this.buffer_0.length-1|0)&&this.flush(),this.buffer_0[(e=this.fill_0,this.fill_0=e+1|0,e)]=a(t);},ve.prototype.write_8chfmy$=function(t,e,n){this.fill_0>(this.buffer_0.length-n|0)&&(this.flush(),n>this.buffer_0.length)?this.writer_0.write_8chfmy$(t,e,n):(qn().arraycopy_yp22ie$(t,e,this.buffer_0,this.fill_0,n),this.fill_0=this.fill_0+n|0);},ve.prototype.write_3m52m6$=function(t,e,n){this.fill_0>(this.buffer_0.length-n|0)&&(this.flush(),n>this.buffer_0.length)?this.writer_0.write_3m52m6$(t,e,n):(H(t,this.buffer_0,this.fill_0,e,n),this.fill_0=this.fill_0+n|0);},ve.prototype.flush=function(){this.writer_0.write_8chfmy$(this.buffer_0,0,this.fill_0),this.fill_0=0;},ve.prototype.close=function(){},ve.$metadata$={kind:r,simpleName:"WritingBuffer",interfaces:[xt]},Object.defineProperty(be.prototype,"message",{get:function(){return this.message_y7nasg$_0}}),Object.defineProperty(be.prototype,"cause",{get:function(){return this.cause_26vz5q$_0}}),be.$metadata$={kind:r,simpleName:"SyntaxException",interfaces:[i]},Object.defineProperty(we.prototype,"message",{get:function(){return this.message_kt89er$_0}}),Object.defineProperty(we.prototype,"cause",{get:function(){return this.cause_c2uidd$_0}}),we.$metadata$={kind:r,simpleName:"IoException",interfaces:[i]},Object.defineProperty(xe.prototype,"bufferSequence",{configurable:!0,get:function(){return this.bufferSequence_i8enee$_0},set:function(t){this.bufferSequence_i8enee$_0=t;}}),Object.defineProperty(xe.prototype,"bufferEnd",{configurable:!0,get:function(){return this.bufferEnd_7ee91e$_0},set:function(t){this.bufferEnd_7ee91e$_0=t;}}),Object.defineProperty(xe.prototype,"state",{configurable:!0,get:function(){return this.locateToken_0(),this.myState_0}}),Object.defineProperty(xe.prototype,"tokenType",{configurable:!0,get:function(){return this.locateToken_0(),this.myTokenType_0}}),Object.defineProperty(xe.prototype,"tokenStart",{configurable:!0,get:function(){return this.locateToken_0(),this.myTokenStart_0}}),Object.defineProperty(xe.prototype,"tokenEnd",{configurable:!0,get:function(){return this.locateToken_0(),this.myTokenEnd_0}}),xe.prototype.start_6na8x6$=function(t,e,n,r){this.bufferSequence=t,this.myTokenEnd_0=e,this.myTokenStart_0=this.myTokenEnd_0,this.bufferEnd=n,this.flex.reset_6na8x6$(s(this.bufferSequence),e,n,r),this.myTokenType_0=null;},xe.prototype.advance=function(){this.locateToken_0(),this.myTokenType_0=null;},xe.prototype.locateToken_0=function(){if(null==this.myTokenType_0&&(this.myTokenStart_0=this.myTokenEnd_0,!this.myFailed_0))try{this.myState_0=this.flex.yystate(),this.myTokenType_0=this.flex.advance();}catch(t){if(e.isType(t,Ke))throw t;if(!e.isType(t,i))throw t;this.myFailed_0=!0,this.myTokenType_0=wn().BAD_CHARACTER,this.myTokenEnd_0=this.bufferEnd;}},ke.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Oe=null;function Ce(){return null===Oe&&new ke,Oe}function Ne(t){void 0===t&&(t=new Ie),this.options_0=t,this.buffer_0=new ot,this.level_0=0;}function Ie(){ze(),this.target="json",this.quoteFallback="double",this.useQuotes=!0,this.usePropertyNameQuotes=!0,this.useArrayCommas=!0,this.useObjectCommas=!0,this.indentLevel=2,this.objectItemNewline=!1,this.arrayItemNewline=!1,this.isSpaceAfterComma=!0,this.isSpaceAfterColon=!0,this.escapeUnicode=!1;}function Se(){Ae=this;}xe.$metadata$={kind:r,simpleName:"FlexAdapter",interfaces:[]},Object.defineProperty(Se.prototype,"RJsonCompact",{configurable:!0,get:function(){var t=new Ie;return t.target="rjson",t.useQuotes=!1,t.usePropertyNameQuotes=!1,t.quoteFallback="single",t.useArrayCommas=!1,t.useObjectCommas=!1,t.objectItemNewline=!1,t.arrayItemNewline=!1,t.isSpaceAfterComma=!1,t.isSpaceAfterColon=!1,t}}),Object.defineProperty(Se.prototype,"RJsonPretty",{configurable:!0,get:function(){var t=new Ie;return t.target="rjson",t.useQuotes=!1,t.usePropertyNameQuotes=!1,t.quoteFallback="single",t.useArrayCommas=!1,t.useObjectCommas=!1,t.objectItemNewline=!0,t.arrayItemNewline=!0,t.isSpaceAfterComma=!0,t.isSpaceAfterColon=!0,t}}),Object.defineProperty(Se.prototype,"JsonCompact",{configurable:!0,get:function(){var t=new Ie;return t.target="json",t.useQuotes=!0,t.usePropertyNameQuotes=!0,t.useArrayCommas=!0,t.useObjectCommas=!0,t.objectItemNewline=!1,t.arrayItemNewline=!1,t.isSpaceAfterComma=!1,t.isSpaceAfterColon=!1,t}}),Object.defineProperty(Se.prototype,"JsonPretty",{configurable:!0,get:function(){var t=new Ie;return t.target="json",t.useQuotes=!0,t.usePropertyNameQuotes=!0,t.useArrayCommas=!0,t.useObjectCommas=!0,t.objectItemNewline=!0,t.arrayItemNewline=!0,t.isSpaceAfterComma=!0,t.isSpaceAfterColon=!0,t}}),Object.defineProperty(Se.prototype,"JsCompact",{configurable:!0,get:function(){var t=new Ie;return t.target="js",t.useQuotes=!0,t.usePropertyNameQuotes=!1,t.quoteFallback="single",t.useArrayCommas=!0,t.useObjectCommas=!0,t.objectItemNewline=!1,t.arrayItemNewline=!1,t.isSpaceAfterComma=!1,t.isSpaceAfterColon=!1,t}}),Object.defineProperty(Se.prototype,"JsPretty",{configurable:!0,get:function(){var t=new Ie;return t.target="js",t.useQuotes=!0,t.usePropertyNameQuotes=!1,t.quoteFallback="single",t.useArrayCommas=!0,t.useObjectCommas=!0,t.objectItemNewline=!0,t.arrayItemNewline=!0,t.isSpaceAfterComma=!0,t.isSpaceAfterColon=!0,t}}),Se.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Ee,Ae=null;function ze(){return null===Ae&&new Se,Ae}function je(t){return !!Ee.contains_11rb$(t)||!N("[a-zA-Z_][a-zA-Z_0-9]*").matches_6bul2c$(t)}function Le(t){this.elementType=t;}function Te(t){this.id=t;}function Me(t){Te.call(this,t);}function Re(t){Te.call(this,t);}function Pe(t){Te.call(this,t.elementType.id),this.node=t;}function qe(t){this.string=t;}function Be(){i.call(this),this.message_5xs4d4$_0=void 0,this.cause_f0a41y$_0=null,e.captureStack(i,this),this.name="ArrayIndexOutOfBoundsException";}function Ue(t){i.call(this),this.message_v24yh0$_0=t,this.cause_rj05em$_0=null,e.captureStack(i,this),this.name="Error";}function Fe(){Ze();}function De(){We=this;}Ie.$metadata$={kind:r,simpleName:"Options",interfaces:[]},Ne.prototype.valueToStream=function(t){return this.buffer_0.length=0,this.printValue_0(t),this.buffer_0.byteInputStream()},Ne.prototype.valueToString=function(t){return this.buffer_0.length=0,this.printValue_0(t),this.buffer_0.toString()},Ne.prototype.stringToString=function(t){var e=yn().getDefault().createParser().streamToValue(pt(t));return this.buffer_0.length=0,this.printValue_0(e),this.buffer_0.toString()},Ne.prototype.streamToStream=function(t){var e=yn().getDefault().createParser().streamToValue(t);return this.buffer_0.length=0,this.printValue_0(e),this.buffer_0.byteInputStream()},Ne.prototype.streamToString=function(t){var e=yn().getDefault().createParser().streamToValue(t);return this.printValue_0(e),this.buffer_0.toString()},Ne.prototype.printValue_0=function(t,n){if(void 0===n&&(n=!1),e.isType(t,Bt))this.append_0(t.value,void 0,n);else if(e.isType(t,Qt)){var r=this.tryEscapeUnicode_0(t.asString());this.append_0(zn(r,this.options_0,!1),void 0,n);}else if(e.isType(t,Ut))this.append_0(this.toIntOrDecimalString_0(t),void 0,n);else if(e.isType(t,Ft))this.printObject_0(t,n);else {if(!e.isType(t,zt))throw new be("Unexpected type: "+e.getKClassFromExpression(t).toString());this.printArray_0(t,n);}},Ne.prototype.tryEscapeUnicode_0=function(t){var e;if(this.options_0.escapeUnicode){var n,r=x(t.length);for(n=k(t);n.hasNext();){var i,o=v(n.next()),a=r.add_11rb$,s=O(o);if((0|v(s))>2047){for(var u="\\u"+An(0|v(s));u.length<4;)u="0"+u;i=u;}else i=String.fromCharCode(v(s));a.call(r,i);}e=b(r,"");}else e=t;return e},Ne.prototype.printObject_0=function(t,e){this.append_0("{",void 0,e),this.level_0=this.level_0+1|0;for(var n=!!this.options_0.objectItemNewline&&this.options_0.arrayItemNewline,r=0,i=t.iterator();i.hasNext();++r){var o=i.next();this.options_0.objectItemNewline&&this.buffer_0.append_61zpoe$("\n"),this.printPair_0(o.name,o.value,n),r<(t.size()-1|0)&&(this.options_0.useObjectCommas?(this.append_0(",",void 0,!1),this.options_0.isSpaceAfterComma&&!this.options_0.objectItemNewline&&this.append_0(" ",void 0,!1)):this.options_0.objectItemNewline||this.append_0(" ",void 0,!1));}this.level_0=this.level_0-1|0,this.options_0.objectItemNewline&&this.buffer_0.append_61zpoe$("\n"),this.append_0("}",void 0,this.options_0.objectItemNewline);},Ne.prototype.printArray_0=function(t,e){var n;void 0===e&&(e=!0),this.append_0("[",void 0,e),this.level_0=this.level_0+1|0;var r=0;for(n=t.iterator();n.hasNext();){var i=n.next(),o=this.options_0.arrayItemNewline;this.options_0.arrayItemNewline&&this.buffer_0.append_61zpoe$("\n"),this.printValue_0(i,o),r<(t.size()-1|0)&&(this.options_0.useArrayCommas?(this.append_0(",",void 0,!1),this.options_0.isSpaceAfterComma&&!this.options_0.arrayItemNewline&&this.append_0(" ",void 0,!1)):this.options_0.arrayItemNewline||this.append_0(" ",void 0,!1)),r=r+1|0;}this.level_0=this.level_0-1|0,this.options_0.arrayItemNewline&&this.buffer_0.append_61zpoe$("\n"),this.append_0("]",void 0,this.options_0.arrayItemNewline);},Ne.prototype.printPair_0=function(t,e,n){void 0===n&&(n=!0),this.printKey_0(t,n),this.append_0(":",void 0,!1),this.options_0.isSpaceAfterColon&&this.append_0(" ",void 0,!1),this.printValue_0(e,!1);},Ne.prototype.printKey_0=function(t,e){if(void 0===e&&(e=!0),!this.options_0.usePropertyNameQuotes&&jn(t))this.append_0(t,void 0,e);else {var n=this.tryEscapeUnicode_0(t);this.append_0(zn(n,this.options_0,!0),void 0,e);}},Ne.prototype.append_0=function(t,e,n){var r,i;if(void 0===e&&(e=!1),void 0===n&&(n=!0),e&&this.buffer_0.append_61zpoe$("\n"),n){r=this.level_0;for(var o=0;o<r;o++){i=this.options_0.indentLevel;for(var a=0;a<i;a++)this.buffer_0.append_61zpoe$(" ");}}this.buffer_0.append_61zpoe$(t);},Ne.prototype.toIntOrDecimalString_0=function(t){var n,r=t.asDouble(),o=t.asDouble();if(r===C.floor(o))return t.asInt().toString();try{return t.asDouble().toString()}catch(r){if(!e.isType(r,i))throw r;n=t.asInt().toString();}return n},Ne.$metadata$={kind:r,simpleName:"PrettyPrinter",interfaces:[]},Le.$metadata$={kind:r,simpleName:"ASTNode",interfaces:[]},Te.$metadata$={kind:r,simpleName:"IElementType",interfaces:[]},Me.$metadata$={kind:r,simpleName:"RJsonElementType",interfaces:[Te]},Re.$metadata$={kind:r,simpleName:"RJsonTokenType",interfaces:[Te]},Pe.$metadata$={kind:r,simpleName:"PsiElement",interfaces:[Te]},qe.$metadata$={kind:r,simpleName:"Reader",interfaces:[]},Object.defineProperty(Be.prototype,"message",{get:function(){return this.message_5xs4d4$_0}}),Object.defineProperty(Be.prototype,"cause",{get:function(){return this.cause_f0a41y$_0}}),Be.$metadata$={kind:r,simpleName:"ArrayIndexOutOfBoundsException",interfaces:[i]},Object.defineProperty(Ue.prototype,"message",{get:function(){return this.message_v24yh0$_0}}),Object.defineProperty(Ue.prototype,"cause",{get:function(){return this.cause_rj05em$_0}}),Ue.$metadata$={kind:r,simpleName:"Error",interfaces:[i]},De.prototype.codePointAt_905azu$=function(t,e){return 0|t.charCodeAt(e)},De.prototype.charCount_za3lpa$=function(t){return 1},De.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var We=null;function Ze(){return null===We&&new De,We}function Ke(){i.call(this),this.message_us6fov$_0=void 0,this.cause_i5ew99$_0=null,e.captureStack(i,this),this.name="ProcessCanceledException";}function Ve(){}function He(t){Pe.call(this,t);}function Je(t){Pe.call(this,t);}function Ge(t){Pe.call(this,t);}function Ye(t){Pe.call(this,t);}function Qe(t){Pe.call(this,t);}function Xe(t){Pe.call(this,t);}function tn(t){Pe.call(this,t);}function en(t){Pe.call(this,t);}function nn(t){Pe.call(this,t);}function rn(t){Pe.call(this,t);}function on(t){un(),this.zzReader_0=t,this.zzState_0=0,this.zzLexicalState_0=un().YYINITIAL,this.zzBuffer_0="",this.zzMarkedPos_0=0,this.zzCurrentPos_0=0,this.tokenStart_f7s8lc$_0=0,this.zzEndRead_0=0,this.zzAtBOL_0=!0,this.zzAtEOF_0=!1,this.zzEOFDone_0=!1,this.yychar=0,this.yycolumn=0,this.yyline=0;}function an(){sn=this,this.YYEOF=-1,this.ZZ_BUFFERSIZE_0=16384,this.YYINITIAL=0,this.ZZ_LEXSTATE_0=new Int32Array([0,0]),this.ZZ_CMAP_Z=this.zzUnpackCMap_0("\0C"),this.ZZ_CMAP_Y=this.zzUnpackCMap_0("\0+"),this.ZZ_CMAP_A=this.zzUnpackCMap_0('\t\0\0\0\0\t\0\v\v\f\t\r\0\0\0\t\0\0\b\0\n!\0\0"\0\0# \0\0\0\0\0ß\0\0\v\0\0/\0 \0'),this.ZZ_ACTION_PACKED_0_0="\b\t\n\0\v\f\0\r\0\0\0\f\0",this.ZZ_ACTION_0=this.zzUnpackAction_1(),this.ZZ_ROWMAP_PACKED_0_0="\0\0\0$\0H\0l\0\0´\0Ø\0ü\0Ġ\0ń\0Ũ\0ƌ\0ư\0ǔ\0Ǹ\0Ȝ\0ɀ\0ɤ\0ʈ\0\0\0\0\0\0\0ʬ\0Ø\0ː\0˴\0̘\0\0̼\0͠\0΄\0\0Ψ\0ό\0\0ϰ\0Д\0и\0ќ\0Ҁ\0Ҥ\0ӈ\0Ӭ\0Ԑ\0Դ\0՘\0ϰ\0ռ\0֠\0ׄ\0ר\0$\0\0´\0ü\0Ġ\0،\0$\0ذ\0$\0ٔ\0$\0ٸ\0ڜ",this.ZZ_ROWMAP_0=this.zzUnpackRowMap_1(),this.ZZ_TRANS_PACKED_0_0="\b\t\n\v\f\r\0\0\0\0\0 \0$\0\0 \0!!\0!\"#!$\0$%$&$\0\0\0\v\f\r\0\0\0\0\r'\b\0\0\0\0\f\r\t\0\0\0\0\r\t\0\0\0\0(\v\0\0\0\0)\0\0\0\0\0*\0\0\0\r+\0\0\0\0\0,\0\0\0\r-\0\n\0\0!.\0/\0!!\0!0#!\0!!$\0$1$&$\0!$\02\0\02222\02\0\0\0(\v\0\0\0\0\b3\0\0\0\0\04\0\0\0\05\0\0\0\06\0\0\0\f7\08.\09!!\0:!!$\0;!$\0\0\0\t<\0\0\0\0\0=\0\0\0\0>\0\0\0\0?\0\0\0@\0\0\0\0\0A\0\0\0\tB\0\0\0\0\nC\0\0\0\0\v7\0",this.ZZ_TRANS_0=this.zzUnpackTrans_1(),this.ZZ_UNKNOWN_ERROR_0=0,this.ZZ_NO_MATCH_0=1,this.ZZ_PUSHBACK_2BIG_0=2,this.ZZ_ERROR_MSG_0=["Unknown internal scanner error","Error: could not match input","Error: pushback value was too large"],this.ZZ_ATTRIBUTE_PACKED_0_0="\t\t\0\0\t\0\t\0\t\0\t\0\b",this.ZZ_ATTRIBUTE_0=this.zzUnpackAttribute_1();}Fe.$metadata$={kind:r,simpleName:"Character",interfaces:[]},Object.defineProperty(Ke.prototype,"message",{get:function(){return this.message_us6fov$_0}}),Object.defineProperty(Ke.prototype,"cause",{get:function(){return this.cause_i5ew99$_0}}),Ke.$metadata$={kind:r,simpleName:"ProcessCanceledException",interfaces:[i]},Ve.$metadata$={kind:r,simpleName:"StringBuffer",interfaces:[]},He.$metadata$={kind:r,simpleName:"RJsonIdImpl",interfaces:[Pe]},Je.$metadata$={kind:r,simpleName:"RJsonBooleanImpl",interfaces:[Pe]},Ge.$metadata$={kind:r,simpleName:"RJsonCommentImpl",interfaces:[Pe]},Ye.$metadata$={kind:r,simpleName:"RJsonListImpl",interfaces:[Pe]},Qe.$metadata$={kind:r,simpleName:"RJsonObjectImpl",interfaces:[Pe]},Xe.$metadata$={kind:r,simpleName:"RJsonPairImpl",interfaces:[Pe]},tn.$metadata$={kind:r,simpleName:"RJsonStringImpl",interfaces:[Pe]},en.$metadata$={kind:r,simpleName:"RJsonValueImpl",interfaces:[Pe]},nn.$metadata$={kind:r,simpleName:"RJsonWhiteSpaceImpl",interfaces:[Pe]},rn.$metadata$={kind:r,simpleName:"RJsonBadCharacterImpl",interfaces:[Pe]},Object.defineProperty(on.prototype,"tokenStart",{configurable:!0,get:function(){return this.tokenStart_f7s8lc$_0},set:function(t){this.tokenStart_f7s8lc$_0=t;}}),Object.defineProperty(on.prototype,"tokenEnd",{configurable:!0,get:function(){return this.tokenStart+this.yylength()|0}}),on.prototype.reset_6na8x6$=function(t,e,n,r){this.zzBuffer_0=t,this.tokenStart=e,this.zzMarkedPos_0=this.tokenStart,this.zzCurrentPos_0=this.zzMarkedPos_0,this.zzAtEOF_0=!1,this.zzAtBOL_0=!0,this.zzEndRead_0=n,this.yybegin_za3lpa$(r);},on.prototype.zzRefill_0=function(){return !0},on.prototype.yystate=function(){return this.zzLexicalState_0},on.prototype.yybegin_za3lpa$=function(t){this.zzLexicalState_0=t;},on.prototype.yytext=function(){return e.subSequence(this.zzBuffer_0,this.tokenStart,this.zzMarkedPos_0)},on.prototype.yycharat_za3lpa$=function(t){return O(this.zzBuffer_0.charCodeAt(this.tokenStart+t|0))},on.prototype.yylength=function(){return this.zzMarkedPos_0-this.tokenStart|0},on.prototype.zzScanError_0=function(t){var n;try{n=un().ZZ_ERROR_MSG_0[t];}catch(t){if(!e.isType(t,Be))throw t;n=un().ZZ_ERROR_MSG_0[un().ZZ_UNKNOWN_ERROR_0];}throw new Ue(n)},on.prototype.yypushback_za3lpa$=function(t){t>this.yylength()&&this.zzScanError_0(un().ZZ_PUSHBACK_2BIG_0),this.zzMarkedPos_0=this.zzMarkedPos_0-t|0;},on.prototype.zzDoEOF_0=function(){this.zzEOFDone_0||(this.zzEOFDone_0=!0);},on.prototype.advance=function(){for(var t={v:0},e={v:null},n={v:null},r={v:null},i={v:this.zzEndRead_0},o={v:this.zzBuffer_0},a=un().ZZ_TRANS_0,s=un().ZZ_ROWMAP_0,u=un().ZZ_ATTRIBUTE_0;;){r.v=this.zzMarkedPos_0,this.yychar=this.yychar+(r.v-this.tokenStart)|0;var p,c,l=!1;for(n.v=this.tokenStart;n.v<r.v;){switch(p=Ze().codePointAt_905azu$(o.v,n.v),c=Ze().charCount_za3lpa$(p),p){case 11:case 12:case 133:case 8232:case 8233:this.yyline=this.yyline+1|0,this.yycolumn=0,l=!1;break;case 13:this.yyline=this.yyline+1|0,this.yycolumn=0,l=!0;break;case 10:l?l=!1:(this.yyline=this.yyline+1|0,this.yycolumn=0);break;default:l=!1,this.yycolumn=this.yycolumn+c|0;}n.v=n.v+c|0;}if(l){var h;if(r.v<i.v)h=10===o.v.charCodeAt(r.v);else if(this.zzAtEOF_0)h=!1;else {var f=this.zzRefill_0();i.v=this.zzEndRead_0,r.v=this.zzMarkedPos_0,o.v=this.zzBuffer_0,h=!f&&10===o.v.charCodeAt(r.v);}h&&(this.yyline=this.yyline-1|0);}e.v=-1,this.tokenStart=r.v,this.zzCurrentPos_0=this.tokenStart,n.v=this.zzCurrentPos_0,this.zzState_0=un().ZZ_LEXSTATE_0[this.zzLexicalState_0];var _={v:u[this.zzState_0]};for(1==(1&_.v)&&(e.v=this.zzState_0);;){if(n.v<i.v)t.v=Ze().codePointAt_905azu$(o.v,n.v),n.v=n.v+Ze().charCount_za3lpa$(t.v)|0;else {if(this.zzAtEOF_0){t.v=un().YYEOF;break}this.zzCurrentPos_0=n.v,this.zzMarkedPos_0=r.v;var y=this.zzRefill_0();if(n.v=this.zzCurrentPos_0,r.v=this.zzMarkedPos_0,o.v=this.zzBuffer_0,i.v=this.zzEndRead_0,y){t.v=un().YYEOF;break}t.v=Ze().codePointAt_905azu$(o.v,n.v),n.v=n.v+Ze().charCount_za3lpa$(t.v)|0;}var d=a[s[this.zzState_0]+un().ZZ_CMAP_za3lpa$(t.v)|0];if(-1===d)break;if(this.zzState_0=d,_.v=u[this.zzState_0],1==(1&_.v)&&(e.v=this.zzState_0,r.v=n.v,8==(8&_.v)))break}if(this.zzMarkedPos_0=r.v,t.v===un().YYEOF&&this.tokenStart===this.zzCurrentPos_0)return this.zzAtEOF_0=!0,this.zzDoEOF_0(),null;switch(e.v<0?e.v:un().ZZ_ACTION_0[e.v]){case 1:return wn().NUMBER;case 19:break;case 2:return wn().BARE_STRING;case 20:break;case 3:return wn().WHITE_SPACE;case 21:break;case 4:return wn().BAD_CHARACTER;case 22:break;case 5:return wn().COLON;case 23:break;case 6:return wn().L_CURLY;case 24:break;case 7:return wn().R_CURLY;case 25:break;case 8:return wn().L_BRACKET;case 26:break;case 9:return wn().R_BRACKET;case 27:break;case 10:return wn().COMMA;case 28:break;case 11:return wn().LINE_COMMENT;case 29:break;case 12:return wn().BLOCK_COMMENT;case 30:break;case 13:return wn().DOUBLE_QUOTED_STRING;case 31:break;case 14:return wn().SINGLE_QUOTED_STRING;case 32:break;case 15:return wn().TICK_QUOTED_STRING;case 33:break;case 16:return wn().NULL;case 34:break;case 17:return wn().TRUE;case 35:break;case 18:return wn().FALSE;case 36:break;default:this.zzScanError_0(un().ZZ_NO_MATCH_0);}}},an.prototype.ZZ_CMAP_za3lpa$=function(t){return 0|this.ZZ_CMAP_A[(0|this.ZZ_CMAP_Y[0|this.ZZ_CMAP_Z[t>>14]|t>>7&127])<<7|127&t]},an.prototype.zzUnpackAction_1=function(){var t=new Int32Array(67),e=0;return e=this.zzUnpackAction_0(this.ZZ_ACTION_PACKED_0_0,e,t),t},an.prototype.zzUnpackAction_0=function(t,e,n){for(var r,i,o,a=0,s=e,u=t.length;a<u;){var p=0|t.charCodeAt((a=(r=a)+1|0,r)),c=0|t.charCodeAt((a=(i=a)+1|0,i));do{n[(o=s,s=o+1|0,o)]=c;}while((p=p-1|0)>0)}return s},an.prototype.zzUnpackRowMap_1=function(){var t=new Int32Array(67),e=0;return e=this.zzUnpackRowMap_0(this.ZZ_ROWMAP_PACKED_0_0,e,t),t},an.prototype.zzUnpackRowMap_0=function(t,e,n){for(var r,i,o,a=0,s=e,u=t.length;a<u;){var p=(0|t.charCodeAt((a=(r=a)+1|0,r)))<<16;n[(o=s,s=o+1|0,o)]=0|p|t.charCodeAt((a=(i=a)+1|0,i));}return s},an.prototype.zzUnpackTrans_1=function(){var t=new Int32Array(1728),e=0;return e=this.zzUnpackTrans_0(this.ZZ_TRANS_PACKED_0_0,e,t),t},an.prototype.zzUnpackTrans_0=function(t,e,n){for(var r,i,o,a=0,s=e,u=t.length;a<u;){var p=0|t.charCodeAt((a=(r=a)+1|0,r)),c=0|t.charCodeAt((a=(i=a)+1|0,i));c=c-1|0;do{n[(o=s,s=o+1|0,o)]=c;}while((p=p-1|0)>0)}return s},an.prototype.zzUnpackAttribute_1=function(){var t=new Int32Array(67),e=0;return e=this.zzUnpackAttribute_0(this.ZZ_ATTRIBUTE_PACKED_0_0,e,t),t},an.prototype.zzUnpackAttribute_0=function(t,e,n){for(var r,i,o,a=0,s=e,u=t.length;a<u;){var p=0|t.charCodeAt((a=(r=a)+1|0,r)),c=0|t.charCodeAt((a=(i=a)+1|0,i));do{n[(o=s,s=o+1|0,o)]=c;}while((p=p-1|0)>0)}return s},an.prototype.zzUnpackCMap_0=function(t){for(var n,r,i,o={v:0},a=0,s=t.length;a<s;)o.v=o.v+(0|t.charCodeAt(a))|0,a=a+2|0;for(var u=e.charArray(o.v),p=0,c=0;p<t.length;){var l=0|t.charCodeAt((p=(n=p)+1|0,n)),h=t.charCodeAt((p=(r=p)+1|0,r));do{u[(i=c,c=i+1|0,i)]=h;}while((l=l-1|0)>0)}return u},an.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var sn=null;function un(){return null===sn&&new an,sn}function pn(){}function cn(){}function ln(){yn();}function hn(){_n=this,this.factory_2h3e2k$_0=I(fn);}function fn(){return new ln}on.$metadata$={kind:r,simpleName:"RJsonLexer",interfaces:[]},pn.$metadata$={kind:o,simpleName:"RJsonParser",interfaces:[]},cn.prototype.stringToJson=function(t){return At().parse_61zpoe$(t).toString()},cn.prototype.stringToValue=function(t){return At().parse_61zpoe$(t)},cn.prototype.streamToValue=function(t){return At().parse_6nb378$(t.reader())},cn.prototype.streamToJsonStream=function(t){return new U(At().parse_6nb378$(t.reader()).toString())},cn.prototype.streamToRJsonStream=function(t){var e=At().parse_6nb378$(t.bufferedReader());return new Ne(ze().RJsonCompact).valueToStream(e)},cn.$metadata$={kind:r,simpleName:"RJsonParserImpl",interfaces:[pn]},Object.defineProperty(hn.prototype,"factory_0",{configurable:!0,get:function(){return this.factory_2h3e2k$_0.value}}),hn.prototype.getDefault=function(){return this.factory_0},hn.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var _n=null;function yn(){return null===_n&&new hn,_n}function dn(){this.lexer=new on(null),this.type=null,this.location_i61z51$_0=new ue(this.lexer.yychar,this.lexer.yyline,this.lexer.yycolumn),this.rxUnicode_0=N("\\\\u([a-fA-F0-9]{4})"),this.rxBareEscape_0=N("\\\\.");}function mn(){wn();}function $n(){gn=this;}ln.prototype.createParser=function(){return new dn},ln.$metadata$={kind:r,simpleName:"RJsonParserFactory",interfaces:[]},Object.defineProperty(dn.prototype,"location",{configurable:!0,get:function(){return new ue(this.lexer.yychar,this.lexer.yyline,this.lexer.yycolumn)},set:function(t){this.location_i61z51$_0=t;}}),dn.prototype.parse_61zpoe$=function(t){var n;this.lexer.reset_6na8x6$(t,0,t.length,un().YYINITIAL),this.advance_0(),this.skipWhitespaceAndComments_0();try{n=this.readValue_0();}catch(t){throw e.isType(t,pe)?t:e.isType(t,i)?new pe("Expected value",this.location):t}if(this.skipWhitespaceAndComments_0(),null!=this.type)throw new pe("Expected EOF but received "+this.currentTokenString_0(),this.location);return n},dn.prototype.stringToValue=function(t){return this.parse_61zpoe$(t)},dn.prototype.stringToJson=function(t){return this.stringToValue(t).toString()},dn.prototype.streamToValue=function(t){return e.isType(t,U)?this.parse_61zpoe$(t.src):this.parse_61zpoe$(t.bufferedReader().toString())},dn.prototype.streamToJsonStream=function(t){return new Ne(ze().JsonCompact).streamToStream(t)},dn.prototype.streamToRJsonStream=function(t){return new Ne(ze().RJsonCompact).streamToStream(t)},dn.prototype.advance_0=function(){this.type=this.lexer.advance();},dn.prototype.readValue_0=function(){var t;if(this.skipWhitespaceAndComments_0(),s(this.type),t=this.type,h(t,wn().L_BRACKET))return this.advance_0(),this.readList_0();if(h(t,wn().L_CURLY))return this.advance_0(),this.readObject_0();if(h(t,wn().BARE_STRING)){var e=new Qt(this.unescapeBare_0(this.lexer.yytext().toString()));return this.advance_0(),e}if(h(t,wn().DOUBLE_QUOTED_STRING)||h(t,wn().SINGLE_QUOTED_STRING)||h(t,wn().TICK_QUOTED_STRING)){var n=this.lexer.yytext().toString(),r=n.length-1|0,i=new Qt(this.unescape_0(n.substring(1,r)));return this.advance_0(),i}if(h(t,wn().TRUE)){var o=new Bt(this.lexer.yytext().toString());return this.advance_0(),o}if(h(t,wn().FALSE)){var a=new Bt(this.lexer.yytext().toString());return this.advance_0(),a}if(h(t,wn().NULL)){var u=new Bt(this.lexer.yytext().toString());return this.advance_0(),u}if(h(t,wn().NUMBER)){var p=new Ut(this.lexer.yytext().toString());return this.advance_0(),p}throw new pe("Did not expect "+this.currentTokenString_0(),this.location)},dn.prototype.currentTokenString_0=function(){return h(this.type,wn().BAD_CHARACTER)?"("+this.lexer.yytext()+")":s(this.type).id},dn.prototype.skipWhitespaceAndComments_0=function(){for(var t;;){if(t=this.type,!(h(t,wn().WHITE_SPACE)||h(t,wn().BLOCK_COMMENT)||h(t,wn().LINE_COMMENT)))return;this.advance_0();}},dn.prototype.skipComma_0=function(){for(var t;;){if(t=this.type,!(h(t,wn().WHITE_SPACE)||h(t,wn().BLOCK_COMMENT)||h(t,wn().LINE_COMMENT)||h(t,wn().COMMA)))return;this.advance_0();}},dn.prototype.readList_0=function(){for(var t=Rt();;){if(this.skipWhitespaceAndComments_0(),h(this.type,wn().R_BRACKET))return this.advance_0(),t;try{t.add_luq74r$(this.readValue_0());}catch(t){throw e.isType(t,i)?new pe("Expected value or R_BRACKET",this.location):t}this.skipComma_0();}},dn.prototype.readObject_0=function(){for(var t=Gt();;){if(this.skipWhitespaceAndComments_0(),h(this.type,wn().R_CURLY))return this.advance_0(),t;var n,r;try{n=this.readName_0();}catch(t){throw e.isType(t,i)?new pe("Expected object property name or R_CURLY",this.location):t}this.skipWhitespaceAndComments_0(),this.consume_0(wn().COLON),this.skipWhitespaceAndComments_0();try{r=this.readValue_0();}catch(t){throw e.isType(t,i)?new pe("Expected value or R_CURLY",this.location):t}this.skipComma_0(),t.add_8kvr2e$(n,r);}},dn.prototype.consume_0=function(t){if(this.skipWhitespaceAndComments_0(),!h(this.type,t))throw new pe("Expected "+t.id,new ue(this.lexer.yychar,this.lexer.yyline,this.lexer.yycolumn));this.advance_0();},dn.prototype.readName_0=function(){var t;if(this.skipWhitespaceAndComments_0(),t=this.type,h(t,wn().NUMBER)||h(t,wn().TRUE)||h(t,wn().FALSE)||h(t,wn().NULL)){var e=this.lexer.yytext().toString();return this.advance_0(),e}if(h(t,wn().BARE_STRING)){var n=this.lexer.yytext().toString();return this.advance_0(),this.unescapeBare_0(n)}if(h(t,wn().DOUBLE_QUOTED_STRING)||h(t,wn().SINGLE_QUOTED_STRING)||h(t,wn().TICK_QUOTED_STRING)){var r=this.lexer.yytext().toString(),i=r.length-1|0,o=r.substring(1,i);return this.advance_0(),this.unescape_0(o)}throw new pe("Expected property name or R_CURLY, not "+this.currentTokenString_0(),new ue(this.lexer.yychar,this.lexer.yyline,this.lexer.yycolumn))},dn.prototype.unescape_0=function(t){var e,n=this.rxUnicode_0;t:do{var r=n.find_905azu$(t);if(null==r){e=t.toString();break t}var i=0,o=t.length,u=E(o);do{var p=s(r);u.append_ezbsdh$(t,i,p.range.start),u.append_gw00v9$(""+String.fromCharCode(O(a(Bn(0,s(p.groups.get_za3lpa$(1)).value,16))))),i=p.range.endInclusive+1|0,r=p.next();}while(i<o&&null!=r);i<o&&u.append_ezbsdh$(t,i,o),e=u.toString();}while(0);var c=e;return c=S(c,"\\'","'"),c=S(c,"\\`","`"),c=S(c,'\\"','"'),c=S(c,"\\ "," "),S(c,"\\\n","")},dn.prototype.unescapeBare_0=function(t){var e,n=this.rxUnicode_0;t:do{var r=n.find_905azu$(t);if(null==r){e=t.toString();break t}var i=0,o=t.length,u=E(o);do{var p=s(r);u.append_ezbsdh$(t,i,p.range.start),u.append_gw00v9$(""+String.fromCharCode(O(a(Bn(0,s(p.groups.get_za3lpa$(1)).value,16))))),i=p.range.endInclusive+1|0,r=p.next();}while(i<o&&null!=r);i<o&&u.append_ezbsdh$(t,i,o),e=u.toString();}while(0);var c,l=e,h=l,f=this.rxBareEscape_0;t:do{var _=f.find_905azu$(h);if(null==_){c=h.toString();break t}var y=0,d=h.length,m=E(d);do{var $=s(_);m.append_ezbsdh$(h,y,$.range.start),m.append_gw00v9$($.value.substring(1)),y=$.range.endInclusive+1|0,_=$.next();}while(y<d&&null!=_);y<d&&m.append_ezbsdh$(h,y,d),c=m.toString();}while(0);return c},dn.$metadata$={kind:r,simpleName:"RJsonParser2",interfaces:[pn]},$n.prototype.createElement_a4qy0p$=function(t){var n=t.elementType;if(n===wn().BOOLEAN)return new Je(t);if(n===wn().COMMENT)return new Ge(t);if(n===wn().ID)return new He(t);if(n===wn().LIST)return new Ye(t);if(n===wn().OBJECT)return new Qe(t);if(n===wn().PAIR)return new Xe(t);if(n===wn().STRING)return new tn(t);if(n===wn().VALUE)return new en(t);if(n===wn().WHITE_SPACE)return new nn(t);if(n===wn().BAD_CHARACTER)return new rn(t);throw e.newThrowable("Unknown element type: "+n)},$n.$metadata$={kind:n,simpleName:"Factory",interfaces:[]};var gn=null;function vn(){bn=this,this.BOOLEAN=new Me("BOOLEAN"),this.COMMENT=new Me("COMMENT"),this.ID=new Me("ID"),this.LIST=new Me("LIST"),this.OBJECT=new Me("OBJECT"),this.PAIR=new Me("PAIR"),this.STRING=new Me("STRING"),this.VALUE=new Me("VALUE"),this.BARE_STRING=new Re("BARE_STRING"),this.BLOCK_COMMENT=new Re("BLOCK_COMMENT"),this.COLON=new Re("COLON"),this.COMMA=new Re("COMMA"),this.DOUBLE_QUOTED_STRING=new Re("DOUBLE_QUOTED_STRING"),this.FALSE=new Re("FALSE"),this.LINE_COMMENT=new Re("LINE_COMMENT"),this.L_BRACKET=new Re("L_BRACKET"),this.L_CURLY=new Re("L_CURLY"),this.NULL=new Re("NULL"),this.NUMBER=new Re("NUMBER"),this.R_BRACKET=new Re("R_BRACKET"),this.R_CURLY=new Re("R_CURLY"),this.SINGLE_QUOTED_STRING=new Re("SINGLE_QUOTED_STRING"),this.TICK_QUOTED_STRING=new Re("TICK_QUOTED_STRING"),this.TRUE=new Re("TRUE"),this.WHITE_SPACE=new Re("WHITE_SPACE"),this.BAD_CHARACTER=new Re("BAD_CHARACTER");}vn.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var bn=null;function wn(){return null===bn&&new vn,bn}function xn(t){this.theReader_0=t;}function kn(){}function On(){En();}function Cn(){Sn=this;}mn.$metadata$={kind:o,simpleName:"RJsonTypes",interfaces:[]},xn.prototype.reader=function(){return this.theReader_0},xn.prototype.bufferedReader=function(){return this.reader()},xn.$metadata$={kind:r,simpleName:"ReaderInputStream",interfaces:[Q]},kn.$metadata$={kind:r,simpleName:"JsDummy",interfaces:[A]},Cn.prototype.create_8chfmy$=function(t,e,n){var r,i=new z;r=e+n-1|0;for(var o=e;o<=r;o++)i+=String.fromCharCode(O(t[o]));return i},Cn.$metadata$={kind:n,simpleName:"Companion",interfaces:[]};var Nn,In,Sn=null;function En(){return null===Sn&&new Cn,Sn}function An(t){return t.toString(16)}function zn(t,e,n){var r;if(!isNaN(parseFloat(t)))return h(e.quoteFallback,"single")?"'"+t+"'":h(e.quoteFallback,"backtick")?"`"+t+"`":'"'+t+'"';var i=n?e.usePropertyNameQuotes:e.useQuotes;if(!i&&Nn.test(t)&&(i=!0),!i&&h(t,"")&&(i=!0),!i&&n&&h(e.target,"js")&&(i=je(t)),i){var o=t;r=h(e.quoteFallback,"single")&&-1===j(t,"'")?"'"+(o=S(o,"'","\\'"))+"'":h(e.quoteFallback,"backtick")&&-1===j(t,"`")?"`"+(o=S(o,"`","\\`"))+"`":'"'+(o=S(o,'"','\\"'))+'"';}else r=t;return r}function jn(t){return In.test(t)}function Ln(t,n){try{if(!In.test(n))throw new L("not a float");var r=parseFloat(n);if(!isFinite(r))throw new L("not finite");return r}catch(t){throw e.isType(t,T)?new L(t.message):t}}function Tn(){this.a=[];}function Mn(t){this.this$ArrayList=t,this._n=0;}function Rn(){Pn=this;}On.$metadata$={kind:r,simpleName:"XString",interfaces:[]},Tn.prototype.add_11rb$=function(t){return this.a.push(t),!0},Tn.prototype.add_wxm5ur$=function(t,e){dt("not implemented");},Tn.prototype.addAll_u57x28$=function(t,e){dt("not implemented");},Tn.prototype.addAll_brywnq$=function(t){dt("not implemented");},Tn.prototype.clear=function(){dt("not implemented");},Tn.prototype.listIterator=function(){dt("not implemented");},Tn.prototype.listIterator_za3lpa$=function(t){dt("not implemented");},Tn.prototype.remove_11rb$=function(t){dt("not implemented");},Tn.prototype.removeAll_brywnq$=function(t){dt("not implemented");},Tn.prototype.removeAt_za3lpa$=function(t){dt("not implemented");},Tn.prototype.retainAll_brywnq$=function(t){dt("not implemented");},Tn.prototype.subList_vux9f0$=function(t,e){dt("not implemented");},Object.defineProperty(Tn.prototype,"size",{configurable:!0,get:function(){return this.a.length}}),Tn.prototype.contains_11rb$=function(t){dt("not implemented");},Tn.prototype.containsAll_brywnq$=function(t){dt("not implemented");},Tn.prototype.get_za3lpa$=function(t){return this.a[t]},Tn.prototype.indexOf_11rb$=function(t){dt("not implemented");},Tn.prototype.isEmpty=function(){dt("not implemented");},Mn.prototype.hasNext=function(){var t;return this._n<("number"==typeof(t=this.this$ArrayList.a.length)?t:l())},Mn.prototype.next=function(){var t,n;return null==(n=this.this$ArrayList.a[(t=this._n,this._n=t+1|0,t)])||e.isType(n,M)?n:l()},Mn.prototype.remove=function(){dt("not implemented");},Mn.$metadata$={kind:r,interfaces:[p]},Tn.prototype.iterator=function(){return new Mn(this)},Tn.prototype.set_wxm5ur$=function(t,e){dt("not implemented");},Tn.prototype.lastIndexOf_11rb$=function(t){dt("not implemented");},Tn.$metadata$={kind:r,simpleName:"ArrayList",interfaces:[R]},Rn.prototype.arraycopy_yp22ie$=function(t,e,n,r,i){var o,a,s=r;o=e+i|0;for(var u=e;u<o;u++)n[(a=s,s=a+1|0,a)]=t[u];},Rn.prototype.arraycopy_nlwz52$=function(t,e,n,r,i){dt("not implemented");},Rn.$metadata$={kind:n,simpleName:"System",interfaces:[]};var Pn=null;function qn(){return null===Pn&&new Rn,Pn}function Bn(t,n,r){try{return parseInt(n,r)}catch(t){throw e.isType(t,i)?e.newThrowable(t.message):t}}var Un=t.tv||(t.tv={}),Fn=Un.twelvetone||(Un.twelvetone={}),Dn=Fn.io||(Fn.io={});Object.defineProperty(Dn,"Arrays",{get:B}),Dn.ByteInputStream=U,Object.defineProperty(Dn,"Character",{get:function(){return null===W&&new D,W}}),Object.defineProperty(Dn,"Collections",{get:V}),Dn.toCharArray_s3n7h2$=H,Dn.create_cqx1qy$=function(t,e){return J(0,e,0,e.length)},Dn.create_h51huu$=J,Dn.IOException=G,Dn.IllegalArgumentException=Y,Dn.InputStream=Q,Dn.NullPointerException=X,Dn.NumberFormatException=tt,Dn.ObjectInputStream=et,Dn.Reader=nt,Dn.RuntimeException_init_tcv7n7$=it,Dn.RuntimeException=rt,Dn.StringBuilder=ot,Dn.StringReader=at,Dn.StringWriter=st,Dn.synchronized_d6h5k9$=ut,Dn.byteInputStream_7efafi$=pt,Dn.parseLong_bufzu3$=ct,Dn.parseFloat_b12yl5$=lt,Dn.toString_esb6h6$=ht,Dn.toString_mgw2my$=ft,Dn.toString_4qhq6s$=_t,Dn.toString_9s8ssy$=yt,Dn.TODO_y4putb$=dt,Dn.endsWith_7azisw$=mt,Dn.isNaN_4qhq6s$=$t,Dn.isInfinite_4qhq6s$=gt,Dn.isNaN_9s8ssy$=vt,Dn.isInfinite_9s8ssy$=bt,Dn.UnsupportedOperationException=wt,Object.defineProperty(xt,"Companion",{get:Ct}),Dn.Writer_init=Nt,Dn.Writer_init_s8jyv4$=function(t,e){if(e=e||Object.create(xt.prototype),xt.call(e),null==t)throw new X;return e.lock=t,e},Dn.Writer=xt,It.prototype.DefaultHandler=St;var Wn=Fn.json||(Fn.json={});Object.defineProperty(Wn,"Json",{get:At}),Object.defineProperty(zt,"Companion",{get:Mt}),Wn.JsonArray_init=Rt,Wn.JsonArray_init_v27daa$=function(t,e){return Pt(t,!1,e=e||Object.create(zt.prototype)),e},Wn.JsonArray=zt,Wn.JsonHandler=qt,Wn.JsonLiteral=Bt,Wn.JsonNumber=Ut,Ft.Member=Wt,Ft.HashIndexTable_init=Kt,Ft.HashIndexTable_init_s5uoma$=function(t,e){return e=e||Object.create(Zt.prototype),Zt.call(e),qn().arraycopy_nlwz52$(t.hashTable_0,0,e.hashTable_0,0,e.hashTable_0.length),e},Ft.HashIndexTable=Zt,Object.defineProperty(Ft,"Companion",{get:Jt}),Wn.JsonObject_init=Gt,Wn.JsonObject_init_p5jd56$=function(t,e){return Yt(t,!1,e=e||Object.create(Ft.prototype)),e},Wn.JsonObject=Ft,Wn.JsonString=Qt,Object.defineProperty(Xt,"Companion",{get:ne}),Wn.JsonValue=Xt,Object.defineProperty(re,"Companion",{get:ae}),Wn.JsonWriter=re,Wn.write_cm3p45$=se,Wn.Location=ue,Wn.ParseException=pe,Object.defineProperty(ce,"Companion",{get:_e}),Wn.PrettyPrint=ce,Object.defineProperty(ye,"Companion",{get:ge}),Wn.WriterConfig=ye,Wn.WritingBuffer=ve;var Zn=Fn.rjson||(Fn.rjson={});return Zn.SyntaxException=be,Zn.IoException=we,Object.defineProperty(xe,"Companion",{get:Ce}),Zn.FlexAdapter=xe,Object.defineProperty(Ie,"Companion",{get:ze}),Ne.Options=Ie,Zn.PrettyPrinter=Ne,Object.defineProperty(Zn,"es3keywords",{get:function(){return Ee}}),Zn.needsPropertyNameQuotes_y4putb$=je,Zn.ASTNode=Le,Zn.IElementType=Te,Zn.RJsonElementType=Me,Zn.RJsonTokenType=Re,Zn.PsiElement=Pe,Zn.Reader=qe,Zn.ArrayIndexOutOfBoundsException=Be,Zn.Error=Ue,Object.defineProperty(Fe,"Companion",{get:Ze}),Zn.Character=Fe,Zn.ProcessCanceledException=Ke,Zn.StringBuffer=Ve,Zn.RJsonIdImpl=He,Zn.RJsonBooleanImpl=Je,Zn.RJsonCommentImpl=Ge,Zn.RJsonListImpl=Ye,Zn.RJsonObjectImpl=Qe,Zn.RJsonPairImpl=Xe,Zn.RJsonStringImpl=tn,Zn.RJsonValueImpl=en,Zn.RJsonWhiteSpaceImpl=nn,Zn.RJsonBadCharacterImpl=rn,Object.defineProperty(on,"Companion",{get:un}),Zn.RJsonLexer=on,Zn.RJsonParser=pn,Zn.RJsonParserImpl=cn,Object.defineProperty(ln,"Companion",{get:yn}),Zn.RJsonParserFactory=ln,Zn.RJsonParser2=dn,Object.defineProperty(mn,"Factory",{get:function(){return null===gn&&new $n,gn}}),Object.defineProperty(mn,"Companion",{get:wn}),Zn.RJsonTypes=mn,Zn.ReaderInputStream=xn,Dn.JsDummy=kn,Object.defineProperty(On,"Companion",{get:En}),Dn.XString=On,Dn.toHexString_kcn2v3$=An,Dn.startsWith_7azisw$=function(t,e){return t.startsWith(e)},Dn.escapeIfNeeded_po7bw7$=zn,Dn.isNumber_y4putb$=jn,Dn.parseDouble_2lv9n6$=Ln,Dn.ArrayList=Tn,Object.defineProperty(Dn,"System",{get:qn}),Dn.parseInt_doe1q$=Bn,Dn.substring_2ag3u6$=function(t,e,n,r){return e.substring(n,r)},Ee=w(["abstract","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","export","extends","false","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with"]),Nn=/[\s\u0012:\[\]\{\},\\"']/,In=/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,t})?r.apply(e,i):r)||(t.exports=o);}},e={},function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}(42);var t,e;}));
} (umd_bundle));

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018-2021 TwelveTone LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (module) {
	const theModule = umd_bundle.exports;
	const thePackage = theModule.tv.twelvetone.rjson;

	// Pull options out of Companion
	const Options = thePackage.PrettyPrinter.Options;
	Options.JsonCompact = Options.Companion.JsonCompact;
	Options.JsonPretty = Options.Companion.JsonPretty;
	Options.RJsonCompact = Options.Companion.RJsonCompact;
	Options.RJsonPretty = Options.Companion.RJsonPretty;
	Options.JsCompact = Options.Companion.JsCompact;
	Options.JsPretty = Options.Companion.JsPretty;

	module.exports = {
	    createParser: () => thePackage.RJsonParserFactory.Companion.getDefault().createParser(),
	    createParserFactory: () => thePackage.RJsonParserFactory.Companion.getDefault(),

	    PrettyPrinter: thePackage.PrettyPrinter,
	    /**
	     * @deprecated since 0.1.0.  Use toJson() instead.
	     * @param rjsonString {String}
	     * @returns {String}
	     */
	    convert: function (rjsonString) {
	        const parser = thePackage.RJsonParserFactory.Companion.getDefault().createParser();
	        return parser.stringToJson(rjsonString);
	    },
	    /**
	     *
	     * @param rjsonString {String}
	     * @param compact {Boolean}
	     * @returns {String}
	     */
	    toJson: function (rjsonString, compact = true) {
	        const parser = thePackage.RJsonParserFactory.Companion.getDefault().createParser();
	        const value = parser.stringToValue(rjsonString);
	        let opts;
	        if (compact) {
	            opts = thePackage.PrettyPrinter.Options.Companion.JsonCompact;
	        } else {
	            opts = thePackage.PrettyPrinter.Options.Companion.JsonPretty;
	        }
	        const printer = new thePackage.PrettyPrinter(opts);
	        return printer.valueToString(value);
	    },
	    /**
	     *
	     * @param rjsonString {String}
	     * @param compact {Boolean}
	     * @returns {String}
	     */
	    toRJson: function (jsonString, compact = true) {
	        const parser = thePackage.RJsonParserFactory.Companion.getDefault().createParser();
	        const value = parser.stringToValue(jsonString);
	        let opts;
	        if (compact) {
	            opts = thePackage.PrettyPrinter.Options.Companion.RJsonCompact;
	        } else {
	            opts = thePackage.PrettyPrinter.Options.Companion.RJsonPretty;
	        }
	        const printer = new thePackage.PrettyPrinter(opts);
	        return printer.valueToString(value);
	    },
	    /**
	     *
	     * @param rjsonString {String}
	     * @param compact {Boolean}
	     * @returns {String}
	     */
	    toJs: function (rjsonString, compact = true) {
	        const parser = thePackage.RJsonParserFactory.Companion.getDefault().createParser();
	        const value = parser.stringToValue(rjsonString);
	        let opts;
	        if (compact) {
	            opts = thePackage.PrettyPrinter.Options.Companion.JsCompact;
	        } else {
	            opts = thePackage.PrettyPrinter.Options.Companion.JsPretty;
	        }
	        const printer = new thePackage.PrettyPrinter(opts);
	        return printer.valueToString(value);
	    },

	    /**
	     *
	     * @param options {Options} PrettyPrinter options
	     * @param stringOrValue {string|object} a JsonLike string or JsonValue
	     * @returns {string}
	     */
	    prettyPrint: function (options, stringOrValue) {
	        const prettyPrinter = new thePackage.PrettyPrinter(options);
	        if (typeof stringOrValue === 'string') {
	            return prettyPrinter.stringToString(stringOrValue);
	        } else {
	            return prettyPrinter.valueToString(stringOrValue);
	        }
	    },

	    api: theModule,
	    PrettyPrinter: thePackage.PrettyPrinter,
	    Options,

	};

	module.exports.default = module.exports;
} (src));

function relaxedJSONToJSON(text, compact) {
    if (text.trim().length === 0) {
        return "";
    }
    return src.exports.toJson(text, compact);
}

function call(content, context, segment) {
    if (!content) {
        return new ValueAndMsg("", undefined, { segments: [{ value: segment, success: true }] });
    }
    try {
        var value = evalScript(content, context);
        return new ValueAndMsg(value, undefined, { segments: [{ value: segment, success: true }] });
    }
    catch (err) {
        return new ValueAndMsg("", getErrorMessage(err), {
            segments: [{ value: segment, success: false }],
        });
    }
}
function evalDefault(unevaledValue, context) {
    return new DefaultParser(unevaledValue, context).parse();
}
var DefaultParser = /** @class */ (function () {
    function DefaultParser(unevaledValue, context) {
        this.context = context;
        this.valueAndMsgs = [];
        this.segments = getDynamicStringSegments(unevaledValue.trim());
    }
    DefaultParser.prototype.parse = function () {
        var _a;
        try {
            var object = this.parseObject();
            if (this.valueAndMsgs.length === 0) {
                return new ValueAndMsg(object);
            }
            return new ValueAndMsg(object, (_a = ___default["default"].find(this.valueAndMsgs, "msg")) === null || _a === void 0 ? void 0 : _a.msg, {
                segments: this.valueAndMsgs.flatMap(function (v) { var _a, _b; return (_b = (_a = v === null || v === void 0 ? void 0 : v.extra) === null || _a === void 0 ? void 0 : _a.segments) !== null && _b !== void 0 ? _b : []; }),
            });
        }
        catch (err) {
            // return null, the later transform will determine the default value
            return new ValueAndMsg("", getErrorMessage(err));
        }
    };
    DefaultParser.prototype.parseObject = function () {
        var _this = this;
        var values = this.segments.map(function (segment) {
            return isDynamicSegment(segment) ? _this.evalDynamicSegment(segment) : segment;
        });
        return values.length === 1 ? values[0] : values.join("");
    };
    DefaultParser.prototype.evalDynamicSegment = function (segment) {
        var valueAndMsg = call(segment.slice(2, -2).trim(), this.context, segment);
        this.valueAndMsgs.push(valueAndMsg);
        return valueAndMsg.value;
    };
    return DefaultParser;
}());
function evalJson(unevaledValue, context) {
    return new RelaxedJsonParser(unevaledValue, context).parse();
}
// this will also be used in node-service
var RelaxedJsonParser = /** @class */ (function (_super) {
    __extends(RelaxedJsonParser, _super);
    function RelaxedJsonParser(unevaledValue, context) {
        var _this = _super.call(this, unevaledValue, context) || this;
        _this.evalIndexedObject = _this.evalIndexedObject.bind(_this);
        return _this;
    }
    RelaxedJsonParser.prototype.parseObject = function () {
        try {
            return this.parseRelaxedJson();
        }
        catch (e) {
            return _super.prototype.parseObject.call(this);
        }
    };
    RelaxedJsonParser.prototype.parseRelaxedJson = function () {
        // replace the original {{...}} as relaxed-json adaptive \{\{ + ${index} + \}\}
        var indexedRelaxedJsonString = this.segments
            .map(function (s, i) { return (isDynamicSegment(s) ? "\\{\\{" + i + "\\}\\}" : s); })
            .join("");
        if (indexedRelaxedJsonString.length === 0) {
            // return empty, let the later transform determines the default value
            return "";
        }
        // transform to standard JSON strings with RELAXED JSON
        // here is a trick: if "\{\{ \}\}" is in quotes, keep it unchanged; otherwise transform to "{{ }}"
        var indexedJsonString = relaxedJSONToJSON(indexedRelaxedJsonString, true);
        // here use eval instead of JSON.parse, in order to support escaping like JavaScript. JSON.parse will cause error when escaping non-spicial char
        // since eval support escaping, replace "\{\{ + ${index} + \}\}" as "\\{\\{ + ${index} + \\}\\}"
        var indexedJsonObject = evalScript(indexedJsonString.replace(/\\{\\{\d+\\}\\}/g, function (s) { return "\\\\{\\\\{" + s.slice(4, -4) + "\\\\}\\\\}"; }), {});
        return this.evalIndexedObject(indexedJsonObject);
    };
    RelaxedJsonParser.prototype.evalIndexedObject = function (obj) {
        if (typeof obj === "string") {
            return this.evalIndexedStringToObject(obj);
        }
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(this.evalIndexedObject);
        }
        var ret = {};
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            ret[this.evalIndexedStringToString(key)] = this.evalIndexedObject(value);
        }
        return ret;
    };
    RelaxedJsonParser.prototype.evalIndexedStringToObject = function (indexedString) {
        // if the whole string is "{{ + ${index} + }}", it indicates that the original "{{...}}" is not in quotes, as a standalone JSON value.
        if (indexedString.match(/^{{\d+}}$/)) {
            return this.evalIndexedSnippet(indexedString);
        }
        return this.evalIndexedStringToString(indexedString);
    };
    RelaxedJsonParser.prototype.evalIndexedStringToString = function (indexedString) {
        var _this = this;
        // replace all {{ + ${index} + }} and \{\{ + ${index} \}\}
        return indexedString.replace(/({{\d+}})|(\\{\\{\d+\\}\\})/g, function (s) { return _this.evalIndexedSnippet(s) + ""; });
    };
    // eval {{ + ${index} + }} or \{\{ + ${index} + \}\}
    RelaxedJsonParser.prototype.evalIndexedSnippet = function (snippet) {
        var index = parseInt(snippet.startsWith("{{") ? snippet.slice(2, -2) : snippet.slice(4, -4));
        if (index >= 0 && index < this.segments.length) {
            var segment = this.segments[index];
            if (isDynamicSegment(segment)) {
                return this.evalDynamicSegment(segment);
            }
        }
        return snippet;
    };
    return RelaxedJsonParser;
}(DefaultParser));
function evalFunction(unevaledValue, context, methods, isAsync) {
    try {
        return new ValueAndMsg(function (args, runInHost, scope) {
            if (runInHost === void 0) { runInHost = false; }
            if (scope === void 0) { scope = "function"; }
            return evalFunc(unevaledValue.startsWith("return")
                ? unevaledValue + "\n"
                : "return ".concat(isAsync ? "async " : "", "function(){'use strict'; ").concat(unevaledValue, "\n}()"), args ? __assign(__assign({}, context), args) : context, methods, { disableLimit: runInHost, scope: scope }, isAsync);
        });
    }
    catch (err) {
        return new ValueAndMsg(function () { }, getErrorMessage(err));
    }
}
function evalFunctionResult(unevaledValue, context, methods) {
    return __awaiter(this, void 0, void 0, function () {
        var valueAndMsg, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    valueAndMsg = evalFunction(unevaledValue, context, methods, true);
                    if (valueAndMsg.hasError()) {
                        return [2 /*return*/, new ValueAndMsg("", valueAndMsg.msg)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = ValueAndMsg.bind;
                    return [4 /*yield*/, valueAndMsg.value()];
                case 2: return [2 /*return*/, new (_a.apply(ValueAndMsg, [void 0, _b.sent()]))()];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, new ValueAndMsg("", getErrorMessage(err_1))];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function string2Fn(unevaledValue, type, methods) {
    if (type) {
        switch (type) {
            case "JSON":
                return function (context) { return evalJson(unevaledValue, context); };
            case "Function":
                return function (context) { return evalFunction(unevaledValue, context, methods); };
        }
    }
    return function (context) { return evalDefault(unevaledValue, context); };
}

var IS_FETCHING_FIELD = "isFetching";
var LATEST_END_TIME_FIELD = "latestEndTime";
var TRIGGER_TYPE_FIELD = "triggerType";
/**
 * user input node
 *
 * @remarks
 * CodeNode should resolve the cyclic dependency problem
 * we may assume cyclic dependency only imported by CodeNode
 *
 * FIXME(libin): distinguish Json CodeNode，since wrapContext may cause problems.
 */
var CodeNode = /** @class */ (function (_super) {
    __extends(CodeNode, _super);
    function CodeNode(unevaledValue, options) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this.unevaledValue = unevaledValue;
        _this.options = options;
        _this.type = "input";
        _this.directDepends = new Map();
        _this.codeType = options === null || options === void 0 ? void 0 : options.codeType;
        _this.evalWithMethods = (_a = options === null || options === void 0 ? void 0 : options.evalWithMethods) !== null && _a !== void 0 ? _a : true;
        return _this;
    }
    // FIXME: optimize later
    CodeNode.prototype.convertedValue = function () {
        if (this.codeType === "Function") {
            return "{{function(){".concat(this.unevaledValue, "}}}");
        }
        return this.unevaledValue;
    };
    CodeNode.prototype.filterNodes = function (exposingNodes) {
        if (!!this.evalCache.inFilterNodes) {
            return new Map();
        }
        this.evalCache.inFilterNodes = true;
        try {
            var filteredDepends = this.filterDirectDepends(exposingNodes);
            // log.log("unevaledValue: ", this.unevaledValue, "\nfilteredDepends:", filteredDepends);
            var result_1 = addDepends(new Map(), filteredDepends);
            filteredDepends.forEach(function (paths, node) {
                addDepends(result_1, node.filterNodes(exposingNodes));
            });
            // Add isFetching & latestEndTime node for FetchCheck
            var topDepends = filterDepends(this.convertedValue(), exposingNodes, 1);
            topDepends.forEach(function (paths, depend) {
                if (nodeIsRecord(depend)) {
                    var _loop_1 = function (field) {
                        var node = depend.children[field];
                        if (node) {
                            addDepend(result_1, node, Array.from(paths).map(function (p) { return p + "." + field; }));
                        }
                    };
                    for (var _i = 0, _a = [IS_FETCHING_FIELD, LATEST_END_TIME_FIELD]; _i < _a.length; _i++) {
                        var field = _a[_i];
                        _loop_1(field);
                    }
                }
            });
            return result_1;
        }
        finally {
            this.evalCache.inFilterNodes = false;
        }
    };
    // only includes direct depends, exlucdes depends of dependencies
    CodeNode.prototype.filterDirectDepends = function (exposingNodes) {
        return filterDepends(this.convertedValue(), exposingNodes);
    };
    CodeNode.prototype.justEval = function (exposingNodes, methods) {
        // log.log("justEval: ", this, "\nexposingNodes: ", exposingNodes);
        if (!!this.evalCache.inEval) {
            // found cyclic eval
            this.evalCache.cyclic = true;
            return new ValueAndMsg("");
        }
        this.evalCache.inEval = true;
        try {
            var dependingNodeMap = this.filterDirectDepends(exposingNodes);
            this.directDepends = dependingNodeMap;
            var dependingNodes = mergeNodesWithSameName(dependingNodeMap);
            var fn = string2Fn(this.unevaledValue, this.codeType, this.evalWithMethods ? methods : {});
            var evalNode = withFunction(fromRecord(dependingNodes), fn);
            var valueAndMsg = evalNode.evaluate(exposingNodes);
            // log.log("unevaledValue: ", this.unevaledValue, "\ndependingNodes: ", dependingNodes, "\nvalueAndMsg: ", valueAndMsg);
            if (this.evalCache.cyclic) {
                valueAndMsg = new ValueAndMsg(valueAndMsg.value, (valueAndMsg.msg ? valueAndMsg.msg + "\n" : "") + dependsErrorMessage(this), fixCyclic(valueAndMsg.extra, exposingNodes));
            }
            return valueAndMsg;
        }
        finally {
            this.evalCache.inEval = false;
        }
    };
    CodeNode.prototype.getChildren = function () {
        if (this.directDepends) {
            return Array.from(this.directDepends.keys());
        }
        return [];
    };
    CodeNode.prototype.dependValues = function () {
        var ret = {};
        this.directDepends.forEach(function (paths, node) {
            if (node instanceof AbstractNode) {
                paths.forEach(function (path) {
                    ret[path] = node.evalCache.value;
                });
            }
        });
        return ret;
    };
    CodeNode.prototype.fetchInfo = function (exposingNodes, options) {
        if (!!this.evalCache.inIsFetching) {
            return {
                isFetching: false,
                ready: true,
            };
        }
        this.evalCache.inIsFetching = true;
        try {
            var topDepends = filterDepends(this.convertedValue(), exposingNodes, 1);
            var isFetching_1 = false;
            var ready_1 = true;
            topDepends.forEach(function (paths, depend) {
                var value = depend.evaluate(exposingNodes);
                if ((options === null || options === void 0 ? void 0 : options.ignoreManualDepReadyStatus) &&
                    ___default["default"].has(value, TRIGGER_TYPE_FIELD) &&
                    value.triggerType === "manual") {
                    return;
                }
                if (___default["default"].has(value, IS_FETCHING_FIELD)) {
                    isFetching_1 = isFetching_1 || value.isFetching === true;
                }
                if (___default["default"].has(value, LATEST_END_TIME_FIELD)) {
                    ready_1 = ready_1 && value.latestEndTime > 0;
                }
            });
            var dependingNodeMap = this.filterNodes(exposingNodes);
            dependingNodeMap.forEach(function (paths, depend) {
                var fi = depend.fetchInfo(exposingNodes, options);
                isFetching_1 = isFetching_1 || fi.isFetching;
                ready_1 = ready_1 && fi.ready;
            });
            return {
                isFetching: isFetching_1,
                ready: ready_1,
            };
        }
        finally {
            this.evalCache.inIsFetching = false;
        }
    };
    __decorate([
        memoized()
    ], CodeNode.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], CodeNode.prototype, "filterDirectDepends", null);
    __decorate([
        memoized()
    ], CodeNode.prototype, "fetchInfo", null);
    return CodeNode;
}(AbstractNode));
/**
 * generate node for unevaledValue
 */
function fromUnevaledValue(unevaledValue) {
    return new FunctionNode(new CodeNode(unevaledValue), function (valueAndMsg) { return valueAndMsg.value; });
}
function fixCyclic(extra, exposingNodes) {
    var _a;
    (_a = extra === null || extra === void 0 ? void 0 : extra.segments) === null || _a === void 0 ? void 0 : _a.forEach(function (segment) {
        if (segment.success) {
            segment.success = !hasCycle(segment.value, exposingNodes);
        }
    });
    return extra;
}

/**
 * evaluate to get FetchInfo or fetching status
 */
var FetchCheckNode = /** @class */ (function (_super) {
    __extends(FetchCheckNode, _super);
    function FetchCheckNode(child, options) {
        var _this = _super.call(this) || this;
        _this.child = child;
        _this.options = options;
        _this.type = "fetchCheck";
        return _this;
    }
    FetchCheckNode.prototype.filterNodes = function (exposingNodes) {
        return this.child.filterNodes(exposingNodes);
    };
    FetchCheckNode.prototype.justEval = function (exposingNodes) {
        return this.fetchInfo(exposingNodes);
    };
    FetchCheckNode.prototype.getChildren = function () {
        return [this.child];
    };
    FetchCheckNode.prototype.dependValues = function () {
        return this.child.dependValues();
    };
    FetchCheckNode.prototype.fetchInfo = function (exposingNodes) {
        return this.child.fetchInfo(exposingNodes, this.options);
    };
    __decorate([
        memoized()
    ], FetchCheckNode.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], FetchCheckNode.prototype, "fetchInfo", null);
    return FetchCheckNode;
}(AbstractNode));
function isFetching(node) {
    return new FetchCheckNode(node);
}

const perf =
  typeof performance === 'object' &&
  performance &&
  typeof performance.now === 'function'
    ? performance
    : Date;

const hasAbortController = typeof AbortController === 'function';

// minimal backwards-compatibility polyfill
// this doesn't have nearly all the checks and whatnot that
// actual AbortController/Signal has, but it's enough for
// our purposes, and if used properly, behaves the same.
const AC = hasAbortController
  ? AbortController
  : class AbortController {
      constructor() {
        this.signal = new AS();
      }
      abort() {
        this.signal.dispatchEvent('abort');
      }
    };

const hasAbortSignal = typeof AbortSignal === 'function';
// Some polyfills put this on the AC class, not global
const hasACAbortSignal = typeof AC.AbortSignal === 'function';
const AS = hasAbortSignal
  ? AbortSignal
  : hasACAbortSignal
  ? AC.AbortController
  : class AbortSignal {
      constructor() {
        this.aborted = false;
        this._listeners = [];
      }
      dispatchEvent(type) {
        if (type === 'abort') {
          this.aborted = true;
          const e = { type, target: this };
          this.onabort(e);
          this._listeners.forEach(f => f(e), this);
        }
      }
      onabort() {}
      addEventListener(ev, fn) {
        if (ev === 'abort') {
          this._listeners.push(fn);
        }
      }
      removeEventListener(ev, fn) {
        if (ev === 'abort') {
          this._listeners = this._listeners.filter(f => f !== fn);
        }
      }
    };

const warned = new Set();
const deprecatedOption = (opt, instead) => {
  const code = `LRU_CACHE_OPTION_${opt}`;
  if (shouldWarn(code)) {
    warn(code, `${opt} option`, `options.${instead}`, LRUCache);
  }
};
const deprecatedMethod = (method, instead) => {
  const code = `LRU_CACHE_METHOD_${method}`;
  if (shouldWarn(code)) {
    const { prototype } = LRUCache;
    const { get } = Object.getOwnPropertyDescriptor(prototype, method);
    warn(code, `${method} method`, `cache.${instead}()`, get);
  }
};
const deprecatedProperty = (field, instead) => {
  const code = `LRU_CACHE_PROPERTY_${field}`;
  if (shouldWarn(code)) {
    const { prototype } = LRUCache;
    const { get } = Object.getOwnPropertyDescriptor(prototype, field);
    warn(code, `${field} property`, `cache.${instead}`, get);
  }
};

const emitWarning = (...a) => {
  typeof process === 'object' &&
  process &&
  typeof process.emitWarning === 'function'
    ? process.emitWarning(...a)
    : console.error(...a);
};

const shouldWarn = code => !warned.has(code);

const warn = (code, what, instead, fn) => {
  warned.add(code);
  const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
  emitWarning(msg, 'DeprecationWarning', code, fn);
};

const isPosInt = n => n && n === Math.floor(n) && n > 0 && isFinite(n);

/* istanbul ignore next - This is a little bit ridiculous, tbh.
 * The maximum array length is 2^32-1 or thereabouts on most JS impls.
 * And well before that point, you're caching the entire world, I mean,
 * that's ~32GB of just integers for the next/prev links, plus whatever
 * else to hold that many keys and values.  Just filling the memory with
 * zeroes at init time is brutal when you get that big.
 * But why not be complete?
 * Maybe in the future, these limits will have expanded. */
const getUintArray = max =>
  !isPosInt(max)
    ? null
    : max <= Math.pow(2, 8)
    ? Uint8Array
    : max <= Math.pow(2, 16)
    ? Uint16Array
    : max <= Math.pow(2, 32)
    ? Uint32Array
    : max <= Number.MAX_SAFE_INTEGER
    ? ZeroArray
    : null;

class ZeroArray extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
}

class Stack {
  constructor(max) {
    if (max === 0) {
      return []
    }
    const UintArray = getUintArray(max);
    this.heap = new UintArray(max);
    this.length = 0;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length]
  }
}

class LRUCache {
  constructor(options = {}) {
    const {
      max = 0,
      ttl,
      ttlResolution = 1,
      ttlAutopurge,
      updateAgeOnGet,
      updateAgeOnHas,
      allowStale,
      dispose,
      disposeAfter,
      noDisposeOnSet,
      noUpdateTTL,
      maxSize = 0,
      maxEntrySize = 0,
      sizeCalculation,
      fetchMethod,
      fetchContext,
      noDeleteOnFetchRejection,
      noDeleteOnStaleGet,
    } = options;

    // deprecated options, don't trigger a warning for getting them if
    // the thing being passed in is another LRUCache we're copying.
    const { length, maxAge, stale } =
      options instanceof LRUCache ? {} : options;

    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError('max option must be a nonnegative integer')
    }

    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error('invalid max value: ' + max)
    }

    this.max = max;
    this.maxSize = maxSize;
    this.maxEntrySize = maxEntrySize || this.maxSize;
    this.sizeCalculation = sizeCalculation || length;
    if (this.sizeCalculation) {
      if (!this.maxSize && !this.maxEntrySize) {
        throw new TypeError(
          'cannot set sizeCalculation without setting maxSize or maxEntrySize'
        )
      }
      if (typeof this.sizeCalculation !== 'function') {
        throw new TypeError('sizeCalculation set to non-function')
      }
    }

    this.fetchMethod = fetchMethod || null;
    if (this.fetchMethod && typeof this.fetchMethod !== 'function') {
      throw new TypeError(
        'fetchMethod must be a function if specified'
      )
    }

    this.fetchContext = fetchContext;
    if (!this.fetchMethod && fetchContext !== undefined) {
      throw new TypeError(
        'cannot set fetchContext without fetchMethod'
      )
    }

    this.keyMap = new Map();
    this.keyList = new Array(max).fill(null);
    this.valList = new Array(max).fill(null);
    this.next = new UintArray(max);
    this.prev = new UintArray(max);
    this.head = 0;
    this.tail = 0;
    this.free = new Stack(max);
    this.initialFill = 1;
    this.size = 0;

    if (typeof dispose === 'function') {
      this.dispose = dispose;
    }
    if (typeof disposeAfter === 'function') {
      this.disposeAfter = disposeAfter;
      this.disposed = [];
    } else {
      this.disposeAfter = null;
      this.disposed = null;
    }
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;

    // NB: maxEntrySize is set to maxSize if it's set
    if (this.maxEntrySize !== 0) {
      if (this.maxSize !== 0) {
        if (!isPosInt(this.maxSize)) {
          throw new TypeError(
            'maxSize must be a positive integer if specified'
          )
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError(
          'maxEntrySize must be a positive integer if specified'
        )
      }
      this.initializeSizeTracking();
    }

    this.allowStale = !!allowStale || !!stale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution =
      isPosInt(ttlResolution) || ttlResolution === 0
        ? ttlResolution
        : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || maxAge || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError(
          'ttl must be a positive integer if specified'
        )
      }
      this.initializeTTLTracking();
    }

    // do not allow completely unbounded caches
    if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
      throw new TypeError(
        'At least one of max, maxSize, or ttl is required'
      )
    }
    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
      const code = 'LRU_CACHE_UNBOUNDED';
      if (shouldWarn(code)) {
        warned.add(code);
        const msg =
          'TTL caching without ttlAutopurge, max, or maxSize can ' +
          'result in unbounded memory consumption.';
        emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
      }
    }

    if (stale) {
      deprecatedOption('stale', 'allowStale');
    }
    if (maxAge) {
      deprecatedOption('maxAge', 'ttl');
    }
    if (length) {
      deprecatedOption('length', 'sizeCalculation');
    }
  }

  getRemainingTTL(key) {
    return this.has(key, { updateAgeOnHas: false }) ? Infinity : 0
  }

  initializeTTLTracking() {
    this.ttls = new ZeroArray(this.max);
    this.starts = new ZeroArray(this.max);

    this.setItemTTL = (index, ttl, start = perf.now()) => {
      this.starts[index] = ttl !== 0 ? start : 0;
      this.ttls[index] = ttl;
      if (ttl !== 0 && this.ttlAutopurge) {
        const t = setTimeout(() => {
          if (this.isStale(index)) {
            this.delete(this.keyList[index]);
          }
        }, ttl + 1);
        /* istanbul ignore else - unref() not supported on all platforms */
        if (t.unref) {
          t.unref();
        }
      }
    };

    this.updateItemAge = index => {
      this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
    };

    // debounce calls to perf.now() to 1s so we're not hitting
    // that costly call repeatedly.
    let cachedNow = 0;
    const getNow = () => {
      const n = perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(
          () => (cachedNow = 0),
          this.ttlResolution
        );
        /* istanbul ignore else - not available on all platforms */
        if (t.unref) {
          t.unref();
        }
      }
      return n
    };

    this.getRemainingTTL = key => {
      const index = this.keyMap.get(key);
      if (index === undefined) {
        return 0
      }
      return this.ttls[index] === 0 || this.starts[index] === 0
        ? Infinity
        : this.starts[index] +
            this.ttls[index] -
            (cachedNow || getNow())
    };

    this.isStale = index => {
      return (
        this.ttls[index] !== 0 &&
        this.starts[index] !== 0 &&
        (cachedNow || getNow()) - this.starts[index] >
          this.ttls[index]
      )
    };
  }
  updateItemAge(index) {}
  setItemTTL(index, ttl, start) {}
  isStale(index) {
    return false
  }

  initializeSizeTracking() {
    this.calculatedSize = 0;
    this.sizes = new ZeroArray(this.max);
    this.removeItemSize = index => {
      this.calculatedSize -= this.sizes[index];
      this.sizes[index] = 0;
    };
    this.requireSize = (k, v, size, sizeCalculation) => {
      // provisionally accept background fetches.
      // actual value size will be checked when they return.
      if (this.isBackgroundFetch(v)) {
        return 0
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== 'function') {
            throw new TypeError('sizeCalculation must be a function')
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError(
              'sizeCalculation return invalid (expect positive integer)'
            )
          }
        } else {
          throw new TypeError(
            'invalid size value (must be positive integer)'
          )
        }
      }
      return size
    };
    this.addItemSize = (index, size) => {
      this.sizes[index] = size;
      if (this.maxSize) {
        const maxSize = this.maxSize - this.sizes[index];
        while (this.calculatedSize > maxSize) {
          this.evict(true);
        }
      }
      this.calculatedSize += this.sizes[index];
    };
  }
  removeItemSize(index) {}
  addItemSize(index, size) {}
  requireSize(k, v, size, sizeCalculation) {
    if (size || sizeCalculation) {
      throw new TypeError(
        'cannot set size without setting maxSize or maxEntrySize on cache'
      )
    }
  }

  *indexes({ allowStale = this.allowStale } = {}) {
    if (this.size) {
      for (let i = this.tail; true; ) {
        if (!this.isValidIndex(i)) {
          break
        }
        if (allowStale || !this.isStale(i)) {
          yield i;
        }
        if (i === this.head) {
          break
        } else {
          i = this.prev[i];
        }
      }
    }
  }

  *rindexes({ allowStale = this.allowStale } = {}) {
    if (this.size) {
      for (let i = this.head; true; ) {
        if (!this.isValidIndex(i)) {
          break
        }
        if (allowStale || !this.isStale(i)) {
          yield i;
        }
        if (i === this.tail) {
          break
        } else {
          i = this.next[i];
        }
      }
    }
  }

  isValidIndex(index) {
    return this.keyMap.get(this.keyList[index]) === index
  }

  *entries() {
    for (const i of this.indexes()) {
      yield [this.keyList[i], this.valList[i]];
    }
  }
  *rentries() {
    for (const i of this.rindexes()) {
      yield [this.keyList[i], this.valList[i]];
    }
  }

  *keys() {
    for (const i of this.indexes()) {
      yield this.keyList[i];
    }
  }
  *rkeys() {
    for (const i of this.rindexes()) {
      yield this.keyList[i];
    }
  }

  *values() {
    for (const i of this.indexes()) {
      yield this.valList[i];
    }
  }
  *rvalues() {
    for (const i of this.rindexes()) {
      yield this.valList[i];
    }
  }

  [Symbol.iterator]() {
    return this.entries()
  }

  find(fn, getOptions = {}) {
    for (const i of this.indexes()) {
      if (fn(this.valList[i], this.keyList[i], this)) {
        return this.get(this.keyList[i], getOptions)
      }
    }
  }

  forEach(fn, thisp = this) {
    for (const i of this.indexes()) {
      fn.call(thisp, this.valList[i], this.keyList[i], this);
    }
  }

  rforEach(fn, thisp = this) {
    for (const i of this.rindexes()) {
      fn.call(thisp, this.valList[i], this.keyList[i], this);
    }
  }

  get prune() {
    deprecatedMethod('prune', 'purgeStale');
    return this.purgeStale
  }

  purgeStale() {
    let deleted = false;
    for (const i of this.rindexes({ allowStale: true })) {
      if (this.isStale(i)) {
        this.delete(this.keyList[i]);
        deleted = true;
      }
    }
    return deleted
  }

  dump() {
    const arr = [];
    for (const i of this.indexes({ allowStale: true })) {
      const key = this.keyList[i];
      const v = this.valList[i];
      const value = this.isBackgroundFetch(v)
        ? v.__staleWhileFetching
        : v;
      const entry = { value };
      if (this.ttls) {
        entry.ttl = this.ttls[i];
        // always dump the start relative to a portable timestamp
        // it's ok for this to be a bit slow, it's a rare operation.
        const age = perf.now() - this.starts[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (this.sizes) {
        entry.size = this.sizes[i];
      }
      arr.unshift([key, entry]);
    }
    return arr
  }

  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        // entry.start is a portable timestamp, but we may be using
        // node's performance.now(), so calculate the offset.
        // it's ok for this to be a bit slow, it's a rare operation.
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }

  dispose(v, k, reason) {}

  set(
    k,
    v,
    {
      ttl = this.ttl,
      start,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
    } = {}
  ) {
    size = this.requireSize(k, v, size, sizeCalculation);
    // if the item doesn't fit, don't do anything
    // NB: maxEntrySize set to maxSize by default
    if (this.maxEntrySize && size > this.maxEntrySize) {
      // have to delete, in case a background fetch is there already.
      // in non-async cases, this is a no-op
      this.delete(k);
      return this
    }
    let index = this.size === 0 ? undefined : this.keyMap.get(k);
    if (index === undefined) {
      // addition
      index = this.newIndex();
      this.keyList[index] = k;
      this.valList[index] = v;
      this.keyMap.set(k, index);
      this.next[this.tail] = index;
      this.prev[index] = this.tail;
      this.tail = index;
      this.size++;
      this.addItemSize(index, size);
      noUpdateTTL = false;
    } else {
      // update
      const oldVal = this.valList[index];
      if (v !== oldVal) {
        if (this.isBackgroundFetch(oldVal)) {
          oldVal.__abortController.abort();
        } else {
          if (!noDisposeOnSet) {
            this.dispose(oldVal, k, 'set');
            if (this.disposeAfter) {
              this.disposed.push([oldVal, k, 'set']);
            }
          }
        }
        this.removeItemSize(index);
        this.valList[index] = v;
        this.addItemSize(index, size);
      }
      this.moveToTail(index);
    }
    if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
      this.initializeTTLTracking();
    }
    if (!noUpdateTTL) {
      this.setItemTTL(index, ttl, start);
    }
    if (this.disposeAfter) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
    return this
  }

  newIndex() {
    if (this.size === 0) {
      return this.tail
    }
    if (this.size === this.max && this.max !== 0) {
      return this.evict(false)
    }
    if (this.free.length !== 0) {
      return this.free.pop()
    }
    // initial fill, just keep writing down the list
    return this.initialFill++
  }

  pop() {
    if (this.size) {
      const val = this.valList[this.head];
      this.evict(true);
      return val
    }
  }

  evict(free) {
    const head = this.head;
    const k = this.keyList[head];
    const v = this.valList[head];
    if (this.isBackgroundFetch(v)) {
      v.__abortController.abort();
    } else {
      this.dispose(v, k, 'evict');
      if (this.disposeAfter) {
        this.disposed.push([v, k, 'evict']);
      }
    }
    this.removeItemSize(head);
    // if we aren't about to use the index, then null these out
    if (free) {
      this.keyList[head] = null;
      this.valList[head] = null;
      this.free.push(head);
    }
    this.head = this.next[head];
    this.keyMap.delete(k);
    this.size--;
    return head
  }

  has(k, { updateAgeOnHas = this.updateAgeOnHas } = {}) {
    const index = this.keyMap.get(k);
    if (index !== undefined) {
      if (!this.isStale(index)) {
        if (updateAgeOnHas) {
          this.updateItemAge(index);
        }
        return true
      }
    }
    return false
  }

  // like get(), but without any LRU updating or TTL expiration
  peek(k, { allowStale = this.allowStale } = {}) {
    const index = this.keyMap.get(k);
    if (index !== undefined && (allowStale || !this.isStale(index))) {
      const v = this.valList[index];
      // either stale and allowed, or forcing a refresh of non-stale value
      return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v
    }
  }

  backgroundFetch(k, index, options, context) {
    const v = index === undefined ? undefined : this.valList[index];
    if (this.isBackgroundFetch(v)) {
      return v
    }
    const ac = new AC();
    const fetchOpts = {
      signal: ac.signal,
      options,
      context,
    };
    const cb = v => {
      if (!ac.signal.aborted) {
        this.set(k, v, fetchOpts.options);
      }
      return v
    };
    const eb = er => {
      if (this.valList[index] === p) {
        const del =
          !options.noDeleteOnFetchRejection ||
          p.__staleWhileFetching === undefined;
        if (del) {
          this.delete(k);
        } else {
          // still replace the *promise* with the stale value,
          // since we are done with the promise at this point.
          this.valList[index] = p.__staleWhileFetching;
        }
      }
      if (p.__returned === p) {
        throw er
      }
    };
    const pcall = res => res(this.fetchMethod(k, v, fetchOpts));
    const p = new Promise(pcall).then(cb, eb);
    p.__abortController = ac;
    p.__staleWhileFetching = v;
    p.__returned = null;
    if (index === undefined) {
      this.set(k, p, fetchOpts.options);
      index = this.keyMap.get(k);
    } else {
      this.valList[index] = p;
    }
    return p
  }

  isBackgroundFetch(p) {
    return (
      p &&
      typeof p === 'object' &&
      typeof p.then === 'function' &&
      Object.prototype.hasOwnProperty.call(
        p,
        '__staleWhileFetching'
      ) &&
      Object.prototype.hasOwnProperty.call(p, '__returned') &&
      (p.__returned === p || p.__returned === null)
    )
  }

  // this takes the union of get() and set() opts, because it does both
  async fetch(
    k,
    {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      fetchContext = this.fetchContext,
      forceRefresh = false,
    } = {}
  ) {
    if (!this.fetchMethod) {
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
      })
    }

    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
    };

    let index = this.keyMap.get(k);
    if (index === undefined) {
      const p = this.backgroundFetch(k, index, options, fetchContext);
      return (p.__returned = p)
    } else {
      // in cache, maybe already fetching
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) {
        return allowStale && v.__staleWhileFetching !== undefined
          ? v.__staleWhileFetching
          : (v.__returned = v)
      }

      // if we force a refresh, that means do NOT serve the cached value,
      // unless we are already in the process of refreshing the cache.
      if (!forceRefresh && !this.isStale(index)) {
        this.moveToTail(index);
        if (updateAgeOnGet) {
          this.updateItemAge(index);
        }
        return v
      }

      // ok, it is stale or a forced refresh, and not already fetching.
      // refresh the cache.
      const p = this.backgroundFetch(k, index, options, fetchContext);
      return allowStale && p.__staleWhileFetching !== undefined
        ? p.__staleWhileFetching
        : (p.__returned = p)
    }
  }

  get(
    k,
    {
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
    } = {}
  ) {
    const index = this.keyMap.get(k);
    if (index !== undefined) {
      const value = this.valList[index];
      const fetching = this.isBackgroundFetch(value);
      if (this.isStale(index)) {
        // delete only if not an in-flight background fetch
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k);
          }
          return allowStale ? value : undefined
        } else {
          return allowStale ? value.__staleWhileFetching : undefined
        }
      } else {
        // if we're currently fetching it, we don't actually have it yet
        // it's not stale, which means this isn't a staleWhileRefetching,
        // so we just return undefined
        if (fetching) {
          return undefined
        }
        this.moveToTail(index);
        if (updateAgeOnGet) {
          this.updateItemAge(index);
        }
        return value
      }
    }
  }

  connect(p, n) {
    this.prev[n] = p;
    this.next[p] = n;
  }

  moveToTail(index) {
    // if tail already, nothing to do
    // if head, move head to next[index]
    // else
    //   move next[prev[index]] to next[index] (head has no prev)
    //   move prev[next[index]] to prev[index]
    // prev[index] = tail
    // next[tail] = index
    // tail = index
    if (index !== this.tail) {
      if (index === this.head) {
        this.head = this.next[index];
      } else {
        this.connect(this.prev[index], this.next[index]);
      }
      this.connect(this.tail, index);
      this.tail = index;
    }
  }

  get del() {
    deprecatedMethod('del', 'delete');
    return this.delete
  }

  delete(k) {
    let deleted = false;
    if (this.size !== 0) {
      const index = this.keyMap.get(k);
      if (index !== undefined) {
        deleted = true;
        if (this.size === 1) {
          this.clear();
        } else {
          this.removeItemSize(index);
          const v = this.valList[index];
          if (this.isBackgroundFetch(v)) {
            v.__abortController.abort();
          } else {
            this.dispose(v, k, 'delete');
            if (this.disposeAfter) {
              this.disposed.push([v, k, 'delete']);
            }
          }
          this.keyMap.delete(k);
          this.keyList[index] = null;
          this.valList[index] = null;
          if (index === this.tail) {
            this.tail = this.prev[index];
          } else if (index === this.head) {
            this.head = this.next[index];
          } else {
            this.next[this.prev[index]] = this.next[index];
            this.prev[this.next[index]] = this.prev[index];
          }
          this.size--;
          this.free.push(index);
        }
      }
    }
    if (this.disposed) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
    return deleted
  }

  clear() {
    for (const index of this.rindexes({ allowStale: true })) {
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) {
        v.__abortController.abort();
      } else {
        const k = this.keyList[index];
        this.dispose(v, k, 'delete');
        if (this.disposeAfter) {
          this.disposed.push([v, k, 'delete']);
        }
      }
    }

    this.keyMap.clear();
    this.valList.fill(null);
    this.keyList.fill(null);
    if (this.ttls) {
      this.ttls.fill(0);
      this.starts.fill(0);
    }
    if (this.sizes) {
      this.sizes.fill(0);
    }
    this.head = 0;
    this.tail = 0;
    this.initialFill = 1;
    this.free.length = 0;
    this.calculatedSize = 0;
    this.size = 0;
    if (this.disposed) {
      while (this.disposed.length) {
        this.disposeAfter(...this.disposed.shift());
      }
    }
  }

  get reset() {
    deprecatedMethod('reset', 'clear');
    return this.clear
  }

  get length() {
    deprecatedProperty('length', 'size');
    return this.size
  }

  static get AbortController() {
    return AC
  }
  static get AbortSignal() {
    return AS
  }
}

var lruCache = LRUCache;

var LRU = lruCache;

/**
 * directly provide data
 */
var SimpleNode = /** @class */ (function (_super) {
    __extends(SimpleNode, _super);
    function SimpleNode(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.type = "simple";
        return _this;
    }
    SimpleNode.prototype.filterNodes = function (exposingNodes) {
        return evalPerfUtil.perf(this, "filterNodes", function () {
            return new Map();
        });
    };
    SimpleNode.prototype.justEval = function (exposingNodes) {
        return this.value;
    };
    SimpleNode.prototype.getChildren = function () {
        return [];
    };
    SimpleNode.prototype.dependValues = function () {
        return {};
    };
    SimpleNode.prototype.fetchInfo = function (exposingNodes) {
        return {
            isFetching: false,
            ready: true,
        };
    };
    __decorate([
        memoized()
    ], SimpleNode.prototype, "filterNodes", null);
    return SimpleNode;
}(AbstractNode));
/**
 * provide simple value, don't need to eval
 */
function fromValue(value) {
    return new SimpleNode(value);
}
var lru = new LRU({ max: 16384 });
function fromValueWithCache(value) {
    var res = lru.get(value);
    if (res === undefined) {
        res = fromValue(value);
        lru.set(value, res);
    }
    return res;
}

// encapsulate module node, use specified exposing nodes and input nodes
var WrapNode = /** @class */ (function (_super) {
    __extends(WrapNode, _super);
    function WrapNode(delegate, moduleExposingNodes, moduleExposingMethods, inputNodes) {
        var _this = _super.call(this) || this;
        _this.delegate = delegate;
        _this.moduleExposingNodes = moduleExposingNodes;
        _this.moduleExposingMethods = moduleExposingMethods;
        _this.inputNodes = inputNodes;
        _this.type = "wrap";
        return _this;
    }
    WrapNode.prototype.wrap = function (exposingNodes, exposingMethods) {
        if (!this.inputNodes) {
            return this.moduleExposingNodes;
        }
        var inputNodeEntries = Object.entries(this.inputNodes);
        if (inputNodeEntries.length === 0) {
            return this.moduleExposingNodes;
        }
        var inputNodes = {};
        inputNodeEntries.forEach(function (_a) {
            var name = _a[0], node = _a[1];
            var targetNode = typeof node === "string" ? exposingNodes[node] : node;
            if (!targetNode) {
                return;
            }
            inputNodes[name] = new WrapNode(targetNode, exposingNodes, exposingMethods);
        });
        return __assign(__assign({}, this.moduleExposingNodes), inputNodes);
    };
    WrapNode.prototype.filterNodes = function (exposingNodes) {
        return this.delegate.filterNodes(this.wrap(exposingNodes, {}));
    };
    WrapNode.prototype.justEval = function (exposingNodes, methods) {
        return this.delegate.evaluate(this.wrap(exposingNodes, methods), this.moduleExposingMethods);
    };
    WrapNode.prototype.fetchInfo = function (exposingNodes) {
        return this.delegate.fetchInfo(this.wrap(exposingNodes, {}));
    };
    WrapNode.prototype.getChildren = function () {
        return [this.delegate];
    };
    WrapNode.prototype.dependValues = function () {
        return {};
    };
    __decorate([
        memoized()
    ], WrapNode.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], WrapNode.prototype, "fetchInfo", null);
    return WrapNode;
}(AbstractNode));

var WrapContextNode = /** @class */ (function (_super) {
    __extends(WrapContextNode, _super);
    function WrapContextNode(child) {
        var _this = _super.call(this) || this;
        _this.child = child;
        _this.type = "wrapContext";
        return _this;
    }
    WrapContextNode.prototype.filterNodes = function (exposingNodes) {
        return this.child.filterNodes(exposingNodes);
    };
    WrapContextNode.prototype.justEval = function (exposingNodes, methods) {
        var _this = this;
        return function (params) {
            var nodes;
            if (params) {
                nodes = __assign({}, exposingNodes);
                Object.entries(params).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    nodes[key] = fromValueWithCache(value);
                });
            }
            else {
                nodes = exposingNodes;
            }
            return _this.child.evaluate(nodes, methods);
        };
    };
    WrapContextNode.prototype.getChildren = function () {
        return [this.child];
    };
    WrapContextNode.prototype.dependValues = function () {
        return this.child.dependValues();
    };
    WrapContextNode.prototype.fetchInfo = function (exposingNodes) {
        return this.child.fetchInfo(exposingNodes);
    };
    __decorate([
        memoized()
    ], WrapContextNode.prototype, "filterNodes", null);
    return WrapContextNode;
}(AbstractNode));
function wrapContext(node) {
    return new WrapContextNode(node);
}

/**
 * build a new node by setting new dependent nodes in child node
 */
var WrapContextNodeV2 = /** @class */ (function (_super) {
    __extends(WrapContextNodeV2, _super);
    function WrapContextNodeV2(child, paramNodes) {
        var _this = _super.call(this) || this;
        _this.child = child;
        _this.paramNodes = paramNodes;
        _this.type = "wrapContextV2";
        return _this;
    }
    WrapContextNodeV2.prototype.filterNodes = function (exposingNodes) {
        return this.child.filterNodes(exposingNodes);
    };
    WrapContextNodeV2.prototype.justEval = function (exposingNodes, methods) {
        return this.child.evaluate(this.wrap(exposingNodes), methods);
    };
    WrapContextNodeV2.prototype.getChildren = function () {
        return [this.child];
    };
    WrapContextNodeV2.prototype.dependValues = function () {
        return this.child.dependValues();
    };
    WrapContextNodeV2.prototype.fetchInfo = function (exposingNodes) {
        return this.child.fetchInfo(this.wrap(exposingNodes));
    };
    WrapContextNodeV2.prototype.wrap = function (exposingNodes) {
        return __assign(__assign({}, exposingNodes), this.paramNodes);
    };
    __decorate([
        memoized()
    ], WrapContextNodeV2.prototype, "filterNodes", null);
    __decorate([
        memoized()
    ], WrapContextNodeV2.prototype, "wrap", null);
    return WrapContextNodeV2;
}(AbstractNode));

function transformWrapper(transformFn, defaultValue) {
    function transformWithMsg(valueAndMsg) {
        var _a;
        var result;
        try {
            var value = transformFn(valueAndMsg.value);
            result = new ValueAndMsg(value, valueAndMsg.msg, valueAndMsg.extra, valueAndMsg.value);
        }
        catch (err) {
            var value = void 0;
            try {
                value = defaultValue !== null && defaultValue !== void 0 ? defaultValue : transformFn("");
            }
            catch (err2) {
                value = undefined;
            }
            var errorMsg = (_a = valueAndMsg.msg) !== null && _a !== void 0 ? _a : getErrorMessage(err);
            result = new ValueAndMsg(value, errorMsg, valueAndMsg.extra, valueAndMsg.value);
        }
        // log.trace(
        //   "transformWithMsg. func: ",
        //   transformFn.name,
        //   "\nsource: ",
        //   valueAndMsg,
        //   "\nresult: ",
        //   result
        // );
        return result;
    }
    return transformWithMsg;
}

function styleNamespace(id) {
    return "style-for-".concat(id);
}
function evalStyle(id, css) {
    var _a;
    var styleId = styleNamespace(id);
    var compiledCSS = "";
    css.forEach(function (i) {
        if (!i.trim()) {
            return;
        }
        compiledCSS += stylis.serialize(stylis.compile("#".concat(id, "{").concat(i, "}")), stylis.middleware([stylis.prefixer, stylis.stringify]));
    });
    var styleNode = document.querySelector("#".concat(styleId));
    if (!styleNode) {
        styleNode = document.createElement("style");
        styleNode.setAttribute("type", "text/css");
        styleNode.setAttribute("id", styleId);
        styleNode.setAttribute("data-style-src", "eval");
        (_a = document.querySelector("head")) === null || _a === void 0 ? void 0 : _a.appendChild(styleNode);
    }
    styleNode.textContent = compiledCSS;
}
function clearStyleEval(id) {
    var styleId = id && styleNamespace(id);
    var styleNode = document.querySelectorAll("style[data-style-src=eval]");
    if (styleNode) {
        styleNode.forEach(function (i) {
            if (!styleId || styleId === i.id) {
                i.remove();
            }
        });
    }
}

exports.CompActionTypes = void 0;
(function (CompActionTypes) {
    CompActionTypes["CHANGE_VALUE"] = "CHANGE_VALUE";
    CompActionTypes["RENAME"] = "RENAME";
    CompActionTypes["MULTI_CHANGE"] = "MULTI_CHANGE";
    CompActionTypes["DELETE_COMP"] = "DELETE_COMP";
    CompActionTypes["REPLACE_COMP"] = "REPLACE_COMP";
    CompActionTypes["ONLY_EVAL"] = "NEED_EVAL";
    // UPDATE_NODES = "UPDATE_NODES",
    CompActionTypes["UPDATE_NODES_V2"] = "UPDATE_NODES_V2";
    CompActionTypes["EXECUTE_QUERY"] = "EXECUTE_QUERY";
    CompActionTypes["TRIGGER_MODULE_EVENT"] = "TRIGGER_MODULE_EVENT";
    /**
     * this action can pass data to the comp by name
     */
    CompActionTypes["ROUTE_BY_NAME"] = "ROUTE_BY_NAME";
    /**
     * execute action with context. for example, buttons in table's column should has currentRow as context
     * FIXME: this is a broadcast message, better to be improved by a heritage mechanism.
     */
    CompActionTypes["UPDATE_ACTION_CONTEXT"] = "UPDATE_ACTION_CONTEXT";
    /**
     * comp-specific action can be placed not globally.
     * use CUSTOM uniformly.
     */
    CompActionTypes["CUSTOM"] = "CUSTOM";
    /**
     * broadcast other actions in comp tree structure.
     * used for encapsulate MultiBaseComp
     */
    CompActionTypes["BROADCAST"] = "BROADCAST";
})(exports.CompActionTypes || (exports.CompActionTypes = {}));

function customAction(value, editDSL) {
    return {
        type: exports.CompActionTypes.CUSTOM,
        path: [],
        value: value,
        editDSL: editDSL,
    };
}
function updateActionContextAction(context) {
    var value = {
        type: exports.CompActionTypes.UPDATE_ACTION_CONTEXT,
        path: [],
        editDSL: false,
        context: context,
    };
    return {
        type: exports.CompActionTypes.BROADCAST,
        path: [],
        editDSL: false,
        action: value,
    };
}
/**
 * check if it's current custom action.
 * keep type safe via generics, users should keep type the same as T, otherwise may cause bug.
 */
function isMyCustomAction(action, type) {
    return !isChildAction(action) && isCustomAction(action, type);
}
function isCustomAction(action, type) {
    return action.type === exports.CompActionTypes.CUSTOM && ___default["default"].get(action.value, "type") === type;
}
/**
 * The action of execute query.
 * path route to the query exactly.
 * RootComp will change the path correctly when queryName is passed.
 */
function executeQueryAction(props) {
    return __assign({ type: exports.CompActionTypes.EXECUTE_QUERY, path: [], editDSL: false }, props);
}
function triggerModuleEventAction(name) {
    return {
        type: exports.CompActionTypes.TRIGGER_MODULE_EVENT,
        path: [],
        editDSL: false,
        name: name,
    };
}
/**
 * better to use comp.dispatchChangeValueAction to keep type safe
 */
function changeValueAction(value, editDSL) {
    return {
        type: exports.CompActionTypes.CHANGE_VALUE,
        path: [],
        editDSL: editDSL,
        value: value,
    };
}
function isBroadcastAction(action, type) {
    return action.type === exports.CompActionTypes.BROADCAST && ___default["default"].get(action.action, "type") === type;
}
function renameAction(oldName, name) {
    var value = {
        type: exports.CompActionTypes.RENAME,
        path: [],
        editDSL: true,
        oldName: oldName,
        name: name,
    };
    return {
        type: exports.CompActionTypes.BROADCAST,
        path: [],
        editDSL: true,
        action: value,
    };
}
function routeByNameAction(name, action) {
    return {
        type: exports.CompActionTypes.ROUTE_BY_NAME,
        path: [],
        name: name,
        editDSL: action.editDSL,
        action: action,
    };
}
function multiChangeAction(changes) {
    var editDSL = Object.values(changes).some(function (action) { return !!action.editDSL; });
    console.assert(Object.values(changes).every(function (action) { return !___default["default"].isNil(action.editDSL) && action.editDSL === editDSL; }), "multiChangeAction should wrap actions with the same editDSL value in property. editDSL: ".concat(editDSL, "\nchanges:"), changes);
    return {
        type: exports.CompActionTypes.MULTI_CHANGE,
        path: [],
        editDSL: editDSL,
        changes: changes,
    };
}
function deleteCompAction() {
    return {
        type: exports.CompActionTypes.DELETE_COMP,
        path: [],
        editDSL: true,
    };
}
function replaceCompAction(compFactory) {
    return {
        type: exports.CompActionTypes.REPLACE_COMP,
        path: [],
        editDSL: false,
        compFactory: compFactory,
    };
}
function onlyEvalAction() {
    return {
        type: exports.CompActionTypes.ONLY_EVAL,
        path: [],
        editDSL: false,
    };
}
function wrapChildAction(childName, action) {
    return __assign(__assign({}, action), { path: __spreadArray([childName], action.path, true) });
}
function isChildAction(action) {
    var _a, _b;
    return ((_b = (_a = action === null || action === void 0 ? void 0 : action.path) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
}
function unwrapChildAction(action) {
    return [action.path[0], __assign(__assign({}, action), { path: action.path.slice(1) })];
}
function changeChildAction(childName, value, editDSL) {
    return wrapChildAction(childName, changeValueAction(value, editDSL));
}
function updateNodesV2Action(value) {
    return {
        type: exports.CompActionTypes.UPDATE_NODES_V2,
        path: [],
        editDSL: false,
        value: value,
    };
}
function wrapActionExtraInfo(action, extraInfos) {
    return __assign(__assign({}, action), { extraInfo: __assign(__assign({}, action.extraInfo), extraInfos) });
}
function deferAction(action) {
    return __assign(__assign({}, action), { priority: "defer" });
}
function changeEditDSLAction(action, editDSL) {
    return __assign(__assign({}, action), { editDSL: editDSL });
}

var CACHE_PREFIX = "__cache__";
/**
 * a decorator for caching function's result ignoring params.
 *
 * @remarks
 * caches are stored in `__cache__xxx` fields.
 * `ObjectUtils.setFields` will not save this cache.
 *
 */
function memo(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    var cachePropertyKey = CACHE_PREFIX + propertyKey;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var thisObj = this;
        if (!thisObj[cachePropertyKey]) {
            // put the result into array, for representing `undefined`
            thisObj[cachePropertyKey] = [originalMethod.apply(this, args)];
        }
        return thisObj[cachePropertyKey][0];
    };
}

/**
 * compare keys and values
 */
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    return (Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && obj1[key] === obj2[key]; }));
}
function containFields(obj, fields) {
    if (fields === undefined) {
        return true;
    }
    var notEqualIndex = Object.keys(fields).findIndex(function (key) {
        return obj[key] !== fields[key];
    });
    return notEqualIndex === -1;
}
/**
 * type unsafe, users should keep safe by self.
 * pros: this function can support private fields.
 */
function setFieldsNoTypeCheck(obj, fields, params) {
    var res = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
    Object.keys(res).forEach(function (key) {
        if (key.startsWith(CACHE_PREFIX)) {
            var propertyKey = key.slice(CACHE_PREFIX.length);
            if (!(params === null || params === void 0 ? void 0 : params.keepCacheKeys) || !(params === null || params === void 0 ? void 0 : params.keepCacheKeys.includes(propertyKey))) {
                delete res[key];
            }
        }
    });
    return Object.assign(res, fields);
}

var AbstractComp = /** @class */ (function () {
    function AbstractComp(params) {
        var _a;
        this.dispatch = (_a = params.dispatch) !== null && _a !== void 0 ? _a : (function (_action) { });
    }
    AbstractComp.prototype.changeDispatch = function (dispatch) {
        return setFieldsNoTypeCheck(this, { dispatch: dispatch }, { keepCacheKeys: ["node"] });
    };
    /**
     * trigger changeValueAction, type safe
     */
    AbstractComp.prototype.dispatchChangeValueAction = function (value) {
        this.dispatch(this.changeValueAction(value));
    };
    AbstractComp.prototype.changeValueAction = function (value) {
        return changeValueAction(value, true);
    };
    /**
     * don't override the function, override nodeWithout function instead
     * FIXME: node reference mustn't be changed if this object is changed
     */
    AbstractComp.prototype.node = function () {
        return this.nodeWithoutCache();
    };
    __decorate([
        memo
    ], AbstractComp.prototype, "node", null);
    return AbstractComp;
}());

/**
 * wrap a dispatch as a child dispatch
 *
 * @param dispatch input dispatch
 * @param childName the key of the child dispatch
 * @returns a wrapped dispatch with the child dispatch
 */
function wrapDispatch(dispatch, childName) {
    return function (action) {
        if (dispatch) {
            dispatch(wrapChildAction(childName, action));
        }
    };
}
/**
 * the core class of multi function
 * build the tree structure of comps
 * @remarks
 * functions can be cached if needed.
 **/
var MultiBaseComp = /** @class */ (function (_super) {
    __extends(MultiBaseComp, _super);
    function MultiBaseComp(params) {
        var _this = _super.call(this, params) || this;
        _this.IGNORABLE_DEFAULT_VALUE = {};
        _this.children = _this.parseChildrenFromValue(params);
        return _this;
    }
    MultiBaseComp.prototype.reduce = function (action) {
        var comp = this.reduceOrUndefined(action);
        if (!comp) {
            console.warn("not supported action, should not happen, action:", action, "\ncurrent comp:", this);
            return this;
        }
        return comp;
    };
    // if the base class can't handle this action, just return undefined
    MultiBaseComp.prototype.reduceOrUndefined = function (action) {
        var _a, _b;
        var _c;
        // log.debug("reduceOrUndefined. action: ", action, " this: ", this);
        // must handle DELETE in the parent level
        if (action.type === exports.CompActionTypes.DELETE_COMP && action.path.length === 1) {
            return this.setChildren(___default["default"].omit(this.children, action.path[0]));
        }
        if (action.type === exports.CompActionTypes.REPLACE_COMP && action.path.length === 1) {
            var NextComp = action.compFactory;
            if (!NextComp) {
                return this;
            }
            var compName = action.path[0];
            var currentComp = this.children[compName];
            var value = currentComp.toJsonValue();
            var nextComp = new NextComp({
                value: value,
                dispatch: wrapDispatch(this.dispatch, compName),
            });
            return this.setChildren(__assign(__assign({}, this.children), (_a = {}, _a[compName] = nextComp, _a)));
        }
        if (isChildAction(action)) {
            var _d = unwrapChildAction(action), childName = _d[0], childAction = _d[1];
            var child = this.children[childName];
            if (!child) {
                log.error("found bad action path ", childName);
                return this;
            }
            var newChild = child.reduce(childAction);
            return this.setChild(childName, newChild);
        }
        // key, value
        switch (action.type) {
            case exports.CompActionTypes.MULTI_CHANGE: {
                var changes_1 = action.changes;
                // handle DELETE in the parent level
                var mcChildren = ___default["default"].omitBy(this.children, function (comp, childName) {
                    var innerAction = changes_1[childName];
                    return (innerAction &&
                        innerAction.type === exports.CompActionTypes.DELETE_COMP &&
                        innerAction.path.length === 0);
                });
                // CHANGE
                mcChildren = ___default["default"].mapValues(mcChildren, function (comp, childName) {
                    var innerAction = changes_1[childName];
                    if (innerAction) {
                        return comp.reduce(innerAction);
                    }
                    return comp;
                });
                return this.setChildren(mcChildren);
            }
            case exports.CompActionTypes.UPDATE_NODES_V2: {
                var value_1 = action.value;
                if (value_1 === undefined) {
                    return this;
                }
                var cacheKey = CACHE_PREFIX + "REDUCE_UPDATE_NODE";
                // if constructed by the value, just return
                if (this[cacheKey] === value_1) {
                    // console.info("inside: UPDATE_NODE_V2 cache hit. action: ", action, "\nvalue: ", value, "\nthis: ", this);
                    return this;
                }
                var children = ___default["default"].mapValues(this.children, function (comp, childName) {
                    if (value_1.hasOwnProperty(childName)) {
                        return comp.reduce(updateNodesV2Action(value_1[childName]));
                    }
                    return comp;
                });
                var extraFields = (_c = this.extraNode()) === null || _c === void 0 ? void 0 : _c.updateNodeFields(value_1);
                if (shallowEqual(children, this.children) && containFields(this, extraFields)) {
                    return this;
                }
                return setFieldsNoTypeCheck(this, __assign((_b = { children: children }, _b[cacheKey] = value_1, _b), extraFields), { keepCacheKeys: ["node"] });
            }
            case exports.CompActionTypes.CHANGE_VALUE: {
                return this.setChildren(this.parseChildrenFromValue({
                    dispatch: this.dispatch,
                    value: action.value,
                }));
            }
            case exports.CompActionTypes.BROADCAST: {
                return this.setChildren(___default["default"].mapValues(this.children, function (comp) {
                    return comp.reduce(action);
                }));
            }
            case exports.CompActionTypes.ONLY_EVAL: {
                return this;
            }
        }
    };
    MultiBaseComp.prototype.setChild = function (childName, newChild) {
        var _a;
        if (this.children[childName] === newChild) {
            return this;
        }
        return this.setChildren(__assign(__assign({}, this.children), (_a = {}, _a[childName] = newChild, _a)));
    };
    MultiBaseComp.prototype.setChildren = function (children, params) {
        if (shallowEqual(children, this.children)) {
            return this;
        }
        return setFieldsNoTypeCheck(this, { children: children }, params);
    };
    /**
     * extended interface.
     *
     * @return node for additional node, updateNodeFields for handling UPDATE_NODE event
     * FIXME: make type safe
     */
    MultiBaseComp.prototype.extraNode = function () {
        return undefined;
    };
    MultiBaseComp.prototype.childrenNode = function () {
        var _this = this;
        var result = {};
        Object.keys(this.children).forEach(function (key) {
            var node = _this.children[key].node();
            if (node !== undefined) {
                result[key] = node;
            }
        });
        return result;
    };
    MultiBaseComp.prototype.nodeWithoutCache = function () {
        var _a;
        return fromRecord(__assign(__assign({}, this.childrenNode()), (_a = this.extraNode()) === null || _a === void 0 ? void 0 : _a.node));
    };
    MultiBaseComp.prototype.changeDispatch = function (dispatch) {
        var newChildren = ___default["default"].mapValues(this.children, function (comp, childName) {
            return comp.changeDispatch(wrapDispatch(dispatch, childName));
        });
        return _super.prototype.changeDispatch.call(this, dispatch).setChildren(newChildren, { keepCacheKeys: ["node"] });
    };
    MultiBaseComp.prototype.ignoreChildDefaultValue = function () {
        return false;
    };
    MultiBaseComp.prototype.toJsonValue = function () {
        var _this = this;
        var result = {};
        var ignore = this.ignoreChildDefaultValue();
        Object.keys(this.children).forEach(function (key) {
            var comp = _this.children[key];
            // FIXME: this implementation is a little tricky, better choose a encapsulated implementation
            if (comp.hasOwnProperty("NO_PERSISTENCE")) {
                return;
            }
            var value = comp.toJsonValue();
            if (ignore && ___default["default"].isEqual(value, comp["IGNORABLE_DEFAULT_VALUE"])) {
                return;
            }
            result[key] = value;
        });
        return result;
    };
    // FIXME: autoHeight should be encapsulated in UIComp/UICompBuilder
    MultiBaseComp.prototype.autoHeight = function () {
        return true;
    };
    MultiBaseComp.prototype.changeChildAction = function (childName, value) {
        return wrapChildAction(childName, this.children[childName].changeValueAction(value));
    };
    return MultiBaseComp;
}(AbstractComp));
function mergeExtra(e1, e2) {
    if (e1 === undefined) {
        return e2;
    }
    return {
        node: __assign(__assign({}, e1.node), e2.node),
        updateNodeFields: function (value) {
            return __assign(__assign({}, e1.updateNodeFields(value)), e2.updateNodeFields(value));
        },
    };
}

/**
 * maintainer a JSONValue, nothing else
 */
var SimpleAbstractComp = /** @class */ (function (_super) {
    __extends(SimpleAbstractComp, _super);
    function SimpleAbstractComp(params) {
        var _this = this;
        var _a;
        _this = _super.call(this, params) || this;
        _this.value = (_a = _this.oldValueToNew(params.value)) !== null && _a !== void 0 ? _a : _this.getDefaultValue();
        return _this;
    }
    /**
     * may override this to implement compatibility
     */
    SimpleAbstractComp.prototype.oldValueToNew = function (value) {
        return value;
    };
    SimpleAbstractComp.prototype.reduce = function (action) {
        if (action.type === exports.CompActionTypes.CHANGE_VALUE) {
            if (this.value === action.value) {
                return this;
            }
            return setFieldsNoTypeCheck(this, { value: action.value });
        }
        return this;
    };
    SimpleAbstractComp.prototype.nodeWithoutCache = function () {
        return fromValue(this.value);
    };
    SimpleAbstractComp.prototype.exposingNode = function () {
        return this.node();
    };
    // may be used in defaultValue
    SimpleAbstractComp.prototype.toJsonValue = function () {
        return this.value;
    };
    return SimpleAbstractComp;
}(AbstractComp));
var SimpleComp = /** @class */ (function (_super) {
    __extends(SimpleComp, _super);
    function SimpleComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleComp.prototype.getView = function () {
        return this.value;
    };
    return SimpleComp;
}(SimpleAbstractComp));

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	return objectAssign;
}

var react = {exports: {}};

var react_production_min = {};

/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_production_min;

function requireReact_production_min () {
	if (hasRequiredReact_production_min) return react_production_min;
	hasRequiredReact_production_min = 1;
var l=requireObjectAssign(),n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";
	return react_production_min;
}

var react_development = {};

/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReact_development;

function requireReact_development () {
	if (hasRequiredReact_development) return react_development;
	hasRequiredReact_development = 1;
	(function (exports) {

		if (process.env.NODE_ENV !== "production") {
		  (function() {

		var _assign = requireObjectAssign();

		// TODO: this is special because it gets imported during build.
		var ReactVersion = '17.0.2';

		// ATTENTION
		// When adding new symbols to this file,
		// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
		// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
		// nor polyfill, then a plain number is used for performance.
		var REACT_ELEMENT_TYPE = 0xeac7;
		var REACT_PORTAL_TYPE = 0xeaca;
		exports.Fragment = 0xeacb;
		exports.StrictMode = 0xeacc;
		exports.Profiler = 0xead2;
		var REACT_PROVIDER_TYPE = 0xeacd;
		var REACT_CONTEXT_TYPE = 0xeace;
		var REACT_FORWARD_REF_TYPE = 0xead0;
		exports.Suspense = 0xead1;
		var REACT_SUSPENSE_LIST_TYPE = 0xead8;
		var REACT_MEMO_TYPE = 0xead3;
		var REACT_LAZY_TYPE = 0xead4;
		var REACT_BLOCK_TYPE = 0xead9;
		var REACT_SERVER_BLOCK_TYPE = 0xeada;
		var REACT_FUNDAMENTAL_TYPE = 0xead5;
		var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
		var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

		if (typeof Symbol === 'function' && Symbol.for) {
		  var symbolFor = Symbol.for;
		  REACT_ELEMENT_TYPE = symbolFor('react.element');
		  REACT_PORTAL_TYPE = symbolFor('react.portal');
		  exports.Fragment = symbolFor('react.fragment');
		  exports.StrictMode = symbolFor('react.strict_mode');
		  exports.Profiler = symbolFor('react.profiler');
		  REACT_PROVIDER_TYPE = symbolFor('react.provider');
		  REACT_CONTEXT_TYPE = symbolFor('react.context');
		  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
		  exports.Suspense = symbolFor('react.suspense');
		  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
		  REACT_MEMO_TYPE = symbolFor('react.memo');
		  REACT_LAZY_TYPE = symbolFor('react.lazy');
		  REACT_BLOCK_TYPE = symbolFor('react.block');
		  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
		  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
		  symbolFor('react.scope');
		  symbolFor('react.opaque.id');
		  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
		  symbolFor('react.offscreen');
		  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
		}

		var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }

		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }

		  return null;
		}

		/**
		 * Keeps track of the current dispatcher.
		 */
		var ReactCurrentDispatcher = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		/**
		 * Keeps track of the current batch's configuration such as how long an update
		 * should suspend for if it needs to.
		 */
		var ReactCurrentBatchConfig = {
		  transition: 0
		};

		/**
		 * Keeps track of the current owner.
		 *
		 * The current owner is the component who should own any components that are
		 * currently being constructed.
		 */
		var ReactCurrentOwner = {
		  /**
		   * @internal
		   * @type {ReactComponent}
		   */
		  current: null
		};

		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
		  {
		    currentExtraStackFrame = stack;
		  }
		}

		{
		  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
		    {
		      currentExtraStackFrame = stack;
		    }
		  }; // Stack implementation injected by the current renderer.


		  ReactDebugCurrentFrame.getCurrentStack = null;

		  ReactDebugCurrentFrame.getStackAddendum = function () {
		    var stack = ''; // Add an extra top frame while an element is being validated

		    if (currentExtraStackFrame) {
		      stack += currentExtraStackFrame;
		    } // Delegate to the injected renderer-specific implementation


		    var impl = ReactDebugCurrentFrame.getCurrentStack;

		    if (impl) {
		      stack += impl() || '';
		    }

		    return stack;
		  };
		}

		/**
		 * Used by act() to track whether you're inside an act() scope.
		 */
		var IsSomeRendererActing = {
		  current: false
		};

		var ReactSharedInternals = {
		  ReactCurrentDispatcher: ReactCurrentDispatcher,
		  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
		  ReactCurrentOwner: ReactCurrentOwner,
		  IsSomeRendererActing: IsSomeRendererActing,
		  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
		  assign: _assign
		};

		{
		  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
		}

		// by calls to these methods by a Babel plugin.
		//
		// In PROD (or in packages without access to React internals),
		// they are left as they are instead.

		function warn(format) {
		  {
		    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    printWarning('warn', format, args);
		  }
		}
		function error(format) {
		  {
		    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		      args[_key2 - 1] = arguments[_key2];
		    }

		    printWarning('error', format, args);
		  }
		}

		function printWarning(level, format, args) {
		  // When changing this logic, you might want to also
		  // update consoleWithStackDev.www.js as well.
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();

		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    }

		    var argsWithFormat = args.map(function (item) {
		      return '' + item;
		    }); // Careful: RN currently depends on this prefix

		    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
		    // breaks IE9: https://github.com/facebook/react/issues/13610
		    // eslint-disable-next-line react-internal/no-production-logging

		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}

		var didWarnStateUpdateForUnmountedComponent = {};

		function warnNoop(publicInstance, callerName) {
		  {
		    var _constructor = publicInstance.constructor;
		    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
		    var warningKey = componentName + "." + callerName;

		    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
		      return;
		    }

		    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

		    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
		  }
		}
		/**
		 * This is the abstract API for an update queue.
		 */


		var ReactNoopUpdateQueue = {
		  /**
		   * Checks whether or not this composite component is mounted.
		   * @param {ReactClass} publicInstance The instance we want to test.
		   * @return {boolean} True if mounted, false otherwise.
		   * @protected
		   * @final
		   */
		  isMounted: function (publicInstance) {
		    return false;
		  },

		  /**
		   * Forces an update. This should only be invoked when it is known with
		   * certainty that we are **not** in a DOM transaction.
		   *
		   * You may want to call this when you know that some deeper aspect of the
		   * component's state has changed but `setState` was not called.
		   *
		   * This will not invoke `shouldComponentUpdate`, but it will invoke
		   * `componentWillUpdate` and `componentDidUpdate`.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueForceUpdate: function (publicInstance, callback, callerName) {
		    warnNoop(publicInstance, 'forceUpdate');
		  },

		  /**
		   * Replaces all of the state. Always use this or `setState` to mutate state.
		   * You should treat `this.state` as immutable.
		   *
		   * There is no guarantee that `this.state` will be immediately updated, so
		   * accessing `this.state` after calling this method may return the old value.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} completeState Next state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} callerName name of the calling function in the public API.
		   * @internal
		   */
		  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
		    warnNoop(publicInstance, 'replaceState');
		  },

		  /**
		   * Sets a subset of the state. This only exists because _pendingState is
		   * internal. This provides a merging strategy that is not available to deep
		   * properties which is confusing. TODO: Expose pendingState or don't use it
		   * during the merge.
		   *
		   * @param {ReactClass} publicInstance The instance that should rerender.
		   * @param {object} partialState Next partial state to be merged with state.
		   * @param {?function} callback Called after component is updated.
		   * @param {?string} Name of the calling function in the public API.
		   * @internal
		   */
		  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
		    warnNoop(publicInstance, 'setState');
		  }
		};

		var emptyObject = {};

		{
		  Object.freeze(emptyObject);
		}
		/**
		 * Base class helpers for the updating state of a component.
		 */


		function Component(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
		  // renderer.

		  this.updater = updater || ReactNoopUpdateQueue;
		}

		Component.prototype.isReactComponent = {};
		/**
		 * Sets a subset of the state. Always use this to mutate
		 * state. You should treat `this.state` as immutable.
		 *
		 * There is no guarantee that `this.state` will be immediately updated, so
		 * accessing `this.state` after calling this method may return the old value.
		 *
		 * There is no guarantee that calls to `setState` will run synchronously,
		 * as they may eventually be batched together.  You can provide an optional
		 * callback that will be executed when the call to setState is actually
		 * completed.
		 *
		 * When a function is provided to setState, it will be called at some point in
		 * the future (not synchronously). It will be called with the up to date
		 * component arguments (state, props, context). These values can be different
		 * from this.* because your function may be called after receiveProps but before
		 * shouldComponentUpdate, and this new state, props, and context will not yet be
		 * assigned to this.
		 *
		 * @param {object|function} partialState Next partial state or function to
		 *        produce next partial state to be merged with current state.
		 * @param {?function} callback Called after state is updated.
		 * @final
		 * @protected
		 */

		Component.prototype.setState = function (partialState, callback) {
		  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
		    {
		      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
		    }
		  }

		  this.updater.enqueueSetState(this, partialState, callback, 'setState');
		};
		/**
		 * Forces an update. This should only be invoked when it is known with
		 * certainty that we are **not** in a DOM transaction.
		 *
		 * You may want to call this when you know that some deeper aspect of the
		 * component's state has changed but `setState` was not called.
		 *
		 * This will not invoke `shouldComponentUpdate`, but it will invoke
		 * `componentWillUpdate` and `componentDidUpdate`.
		 *
		 * @param {?function} callback Called after update is complete.
		 * @final
		 * @protected
		 */


		Component.prototype.forceUpdate = function (callback) {
		  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
		};
		/**
		 * Deprecated APIs. These APIs used to exist on classic React classes but since
		 * we would like to deprecate them, we're not going to move them over to this
		 * modern base class. Instead, we define a getter that warns if it's accessed.
		 */


		{
		  var deprecatedAPIs = {
		    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
		    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
		  };

		  var defineDeprecationWarning = function (methodName, info) {
		    Object.defineProperty(Component.prototype, methodName, {
		      get: function () {
		        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

		        return undefined;
		      }
		    });
		  };

		  for (var fnName in deprecatedAPIs) {
		    if (deprecatedAPIs.hasOwnProperty(fnName)) {
		      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		    }
		  }
		}

		function ComponentDummy() {}

		ComponentDummy.prototype = Component.prototype;
		/**
		 * Convenience component with default shallow equality check for sCU.
		 */

		function PureComponent(props, context, updater) {
		  this.props = props;
		  this.context = context; // If a component has string refs, we will assign a different object later.

		  this.refs = emptyObject;
		  this.updater = updater || ReactNoopUpdateQueue;
		}

		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

		_assign(pureComponentPrototype, Component.prototype);

		pureComponentPrototype.isPureReactComponent = true;

		// an immutable object with a single mutable value
		function createRef() {
		  var refObject = {
		    current: null
		  };

		  {
		    Object.seal(refObject);
		  }

		  return refObject;
		}

		function getWrappedName(outerType, innerType, wrapperName) {
		  var functionName = innerType.displayName || innerType.name || '';
		  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
		}

		function getContextName(type) {
		  return type.displayName || 'Context';
		}

		function getComponentName(type) {
		  if (type == null) {
		    // Host root, text node or just invalid type.
		    return null;
		  }

		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }

		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }

		  if (typeof type === 'string') {
		    return type;
		  }

		  switch (type) {
		    case exports.Fragment:
		      return 'Fragment';

		    case REACT_PORTAL_TYPE:
		      return 'Portal';

		    case exports.Profiler:
		      return 'Profiler';

		    case exports.StrictMode:
		      return 'StrictMode';

		    case exports.Suspense:
		      return 'Suspense';

		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';

		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';

		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');

		      case REACT_MEMO_TYPE:
		        return getComponentName(type.type);

		      case REACT_BLOCK_TYPE:
		        return getComponentName(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            return getComponentName(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }
		    }
		  }

		  return null;
		}

		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

		{
		  didWarnAboutStringRefs = {};
		}

		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.ref !== undefined;
		}

		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.key !== undefined;
		}

		function defineKeyPropWarningGetter(props, displayName) {
		  var warnAboutAccessingKey = function () {
		    {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;

		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingKey.isReactWarning = true;
		  Object.defineProperty(props, 'key', {
		    get: warnAboutAccessingKey,
		    configurable: true
		  });
		}

		function defineRefPropWarningGetter(props, displayName) {
		  var warnAboutAccessingRef = function () {
		    {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;

		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    }
		  };

		  warnAboutAccessingRef.isReactWarning = true;
		  Object.defineProperty(props, 'ref', {
		    get: warnAboutAccessingRef,
		    configurable: true
		  });
		}

		function warnIfStringRefCannotBeAutoConverted(config) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
		      var componentName = getComponentName(ReactCurrentOwner.current.type);

		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}
		/**
		 * Factory method to create a new React element. This no longer adheres to
		 * the class pattern, so do not use new to call it. Also, instanceof check
		 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		 * if something is a React Element.
		 *
		 * @param {*} type
		 * @param {*} props
		 * @param {*} key
		 * @param {string|object} ref
		 * @param {*} owner
		 * @param {*} self A *temporary* helper to detect places where `this` is
		 * different from the `owner` when React.createElement is called, so that we
		 * can warn. We want to get rid of owner and replace string `ref`s with arrow
		 * functions, and as long as `this` and owner are the same, there will be no
		 * change in behavior.
		 * @param {*} source An annotation object (added by a transpiler or otherwise)
		 * indicating filename, line number, and/or other information.
		 * @internal
		 */


		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    // This tag allows us to uniquely identify this as a React Element
		    $$typeof: REACT_ELEMENT_TYPE,
		    // Built-in properties that belong on the element
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    // Record the component responsible for creating this element.
		    _owner: owner
		  };

		  {
		    // The validation flag is currently mutative. We put it on
		    // an external backing store so that we can freeze the whole object.
		    // This can be replaced with a WeakMap once they are implemented in
		    // commonly used development environments.
		    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
		    // the validation flag non-enumerable (where possible, which should
		    // include every environment we run tests in), so the test framework
		    // ignores it.

		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    }); // self and source are DEV only properties.

		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    }); // Two elements created in two different places should be considered
		    // equal for testing purposes and therefore we hide it from enumeration.

		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });

		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }

		  return element;
		};
		/**
		 * Create and return a new ReactElement of the given type.
		 * See https://reactjs.org/docs/react-api.html#createelement
		 */

		function createElement(type, config, children) {
		  var propName; // Reserved names are extracted

		  var props = {};
		  var key = null;
		  var ref = null;
		  var self = null;
		  var source = null;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      ref = config.ref;

		      {
		        warnIfStringRefCannotBeAutoConverted(config);
		      }
		    }

		    if (hasValidKey(config)) {
		      key = '' + config.key;
		    }

		    self = config.__self === undefined ? null : config.__self;
		    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    {
		      if (Object.freeze) {
		        Object.freeze(childArray);
		      }
		    }

		    props.children = childArray;
		  } // Resolve default props


		  if (type && type.defaultProps) {
		    var defaultProps = type.defaultProps;

		    for (propName in defaultProps) {
		      if (props[propName] === undefined) {
		        props[propName] = defaultProps[propName];
		      }
		    }
		  }

		  {
		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }

		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }
		  }

		  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
		  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
		  return newElement;
		}
		/**
		 * Clone and return a new ReactElement using element as the starting point.
		 * See https://reactjs.org/docs/react-api.html#cloneelement
		 */

		function cloneElement(element, config, children) {
		  if (!!(element === null || element === undefined)) {
		    {
		      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
		    }
		  }

		  var propName; // Original props are copied

		  var props = _assign({}, element.props); // Reserved names are extracted


		  var key = element.key;
		  var ref = element.ref; // Self is preserved since the owner is preserved.

		  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
		  // transpiler, and the original source is probably a better indicator of the
		  // true owner.

		  var source = element._source; // Owner will be preserved, unless ref is overridden

		  var owner = element._owner;

		  if (config != null) {
		    if (hasValidRef(config)) {
		      // Silently steal the ref from the parent.
		      ref = config.ref;
		      owner = ReactCurrentOwner.current;
		    }

		    if (hasValidKey(config)) {
		      key = '' + config.key;
		    } // Remaining properties override existing props


		    var defaultProps;

		    if (element.type && element.type.defaultProps) {
		      defaultProps = element.type.defaultProps;
		    }

		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        if (config[propName] === undefined && defaultProps !== undefined) {
		          // Resolve default props
		          props[propName] = defaultProps[propName];
		        } else {
		          props[propName] = config[propName];
		        }
		      }
		    }
		  } // Children can be more than one argument, and those are transferred onto
		  // the newly allocated props object.


		  var childrenLength = arguments.length - 2;

		  if (childrenLength === 1) {
		    props.children = children;
		  } else if (childrenLength > 1) {
		    var childArray = Array(childrenLength);

		    for (var i = 0; i < childrenLength; i++) {
		      childArray[i] = arguments[i + 2];
		    }

		    props.children = childArray;
		  }

		  return ReactElement(element.type, key, ref, self, source, owner, props);
		}
		/**
		 * Verifies the object is a ReactElement.
		 * See https://reactjs.org/docs/react-api.html#isvalidelement
		 * @param {?object} object
		 * @return {boolean} True if `object` is a ReactElement.
		 * @final
		 */

		function isValidElement(object) {
		  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}

		var SEPARATOR = '.';
		var SUBSEPARATOR = ':';
		/**
		 * Escape and wrap key so it is safe to use as a reactid
		 *
		 * @param {string} key to be escaped.
		 * @return {string} the escaped key.
		 */

		function escape(key) {
		  var escapeRegex = /[=:]/g;
		  var escaperLookup = {
		    '=': '=0',
		    ':': '=2'
		  };
		  var escapedString = key.replace(escapeRegex, function (match) {
		    return escaperLookup[match];
		  });
		  return '$' + escapedString;
		}
		/**
		 * TODO: Test that a single child and an array with one item have the same key
		 * pattern.
		 */


		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;

		function escapeUserProvidedKey(text) {
		  return text.replace(userProvidedKeyEscapeRegex, '$&/');
		}
		/**
		 * Generate a key string that identifies a element within a set.
		 *
		 * @param {*} element A element that could contain a manual key.
		 * @param {number} index Index that is used if a manual key is not provided.
		 * @return {string}
		 */


		function getElementKey(element, index) {
		  // Do some typechecking here since we call this blindly. We want to ensure
		  // that we don't block potential future ES APIs.
		  if (typeof element === 'object' && element !== null && element.key != null) {
		    // Explicit key
		    return escape('' + element.key);
		  } // Implicit key determined by the index in the set


		  return index.toString(36);
		}

		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		  var type = typeof children;

		  if (type === 'undefined' || type === 'boolean') {
		    // All of the above are perceived as null.
		    children = null;
		  }

		  var invokeCallback = false;

		  if (children === null) {
		    invokeCallback = true;
		  } else {
		    switch (type) {
		      case 'string':
		      case 'number':
		        invokeCallback = true;
		        break;

		      case 'object':
		        switch (children.$$typeof) {
		          case REACT_ELEMENT_TYPE:
		          case REACT_PORTAL_TYPE:
		            invokeCallback = true;
		        }

		    }
		  }

		  if (invokeCallback) {
		    var _child = children;
		    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
		    // so that it's consistent if the number of children grows:

		    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

		    if (Array.isArray(mappedChild)) {
		      var escapedChildKey = '';

		      if (childKey != null) {
		        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
		      }

		      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
		        return c;
		      });
		    } else if (mappedChild != null) {
		      if (isValidElement(mappedChild)) {
		        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
		        // traverseAllChildren used to do for objects as children
		        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
		        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
		        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
		      }

		      array.push(mappedChild);
		    }

		    return 1;
		  }

		  var child;
		  var nextName;
		  var subtreeCount = 0; // Count of children found in the current subtree.

		  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

		  if (Array.isArray(children)) {
		    for (var i = 0; i < children.length; i++) {
		      child = children[i];
		      nextName = nextNamePrefix + getElementKey(child, i);
		      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		    }
		  } else {
		    var iteratorFn = getIteratorFn(children);

		    if (typeof iteratorFn === 'function') {
		      var iterableChildren = children;

		      {
		        // Warn about using Maps as children
		        if (iteratorFn === iterableChildren.entries) {
		          if (!didWarnAboutMaps) {
		            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
		          }

		          didWarnAboutMaps = true;
		        }
		      }

		      var iterator = iteratorFn.call(iterableChildren);
		      var step;
		      var ii = 0;

		      while (!(step = iterator.next()).done) {
		        child = step.value;
		        nextName = nextNamePrefix + getElementKey(child, ii++);
		        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
		      }
		    } else if (type === 'object') {
		      var childrenString = '' + children;

		      {
		        {
		          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead." );
		        }
		      }
		    }
		  }

		  return subtreeCount;
		}

		/**
		 * Maps children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
		 *
		 * The provided mapFunction(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} func The map function.
		 * @param {*} context Context for mapFunction.
		 * @return {object} Object containing the ordered map of results.
		 */
		function mapChildren(children, func, context) {
		  if (children == null) {
		    return children;
		  }

		  var result = [];
		  var count = 0;
		  mapIntoArray(children, result, '', '', function (child) {
		    return func.call(context, child, count++);
		  });
		  return result;
		}
		/**
		 * Count the number of children that are typically specified as
		 * `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrencount
		 *
		 * @param {?*} children Children tree container.
		 * @return {number} The number of children.
		 */


		function countChildren(children) {
		  var n = 0;
		  mapChildren(children, function () {
		    n++; // Don't return anything
		  });
		  return n;
		}

		/**
		 * Iterates through children that are typically specified as `props.children`.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		 *
		 * The provided forEachFunc(child, index) will be called for each
		 * leaf child.
		 *
		 * @param {?*} children Children tree container.
		 * @param {function(*, int)} forEachFunc
		 * @param {*} forEachContext Context for forEachContext.
		 */
		function forEachChildren(children, forEachFunc, forEachContext) {
		  mapChildren(children, function () {
		    forEachFunc.apply(this, arguments); // Don't return anything.
		  }, forEachContext);
		}
		/**
		 * Flatten a children object (typically specified as `props.children`) and
		 * return an array with appropriately re-keyed children.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		 */


		function toArray(children) {
		  return mapChildren(children, function (child) {
		    return child;
		  }) || [];
		}
		/**
		 * Returns the first child in a collection of children and verifies that there
		 * is only one child in the collection.
		 *
		 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
		 *
		 * The current implementation of this function assumes that a single child gets
		 * passed without a wrapper, but the purpose of this helper function is to
		 * abstract away the particular structure of children.
		 *
		 * @param {?object} children Child collection structure.
		 * @return {ReactElement} The first and only `ReactElement` contained in the
		 * structure.
		 */


		function onlyChild(children) {
		  if (!isValidElement(children)) {
		    {
		      throw Error( "React.Children.only expected to receive a single React element child." );
		    }
		  }

		  return children;
		}

		function createContext(defaultValue, calculateChangedBits) {
		  if (calculateChangedBits === undefined) {
		    calculateChangedBits = null;
		  } else {
		    {
		      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
		        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
		      }
		    }
		  }

		  var context = {
		    $$typeof: REACT_CONTEXT_TYPE,
		    _calculateChangedBits: calculateChangedBits,
		    // As a workaround to support multiple concurrent renderers, we categorize
		    // some renderers as primary and others as secondary. We only expect
		    // there to be two concurrent renderers at most: React Native (primary) and
		    // Fabric (secondary); React DOM (primary) and React ART (secondary).
		    // Secondary renderers store their context values on separate fields.
		    _currentValue: defaultValue,
		    _currentValue2: defaultValue,
		    // Used to track how many concurrent renderers this context currently
		    // supports within in a single renderer. Such as parallel server rendering.
		    _threadCount: 0,
		    // These are circular
		    Provider: null,
		    Consumer: null
		  };
		  context.Provider = {
		    $$typeof: REACT_PROVIDER_TYPE,
		    _context: context
		  };
		  var hasWarnedAboutUsingNestedContextConsumers = false;
		  var hasWarnedAboutUsingConsumerProvider = false;
		  var hasWarnedAboutDisplayNameOnConsumer = false;

		  {
		    // A separate object, but proxies back to the original context object for
		    // backwards compatibility. It has a different $$typeof, so we can properly
		    // warn for the incorrect usage of Context as a Consumer.
		    var Consumer = {
		      $$typeof: REACT_CONTEXT_TYPE,
		      _context: context,
		      _calculateChangedBits: context._calculateChangedBits
		    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

		    Object.defineProperties(Consumer, {
		      Provider: {
		        get: function () {
		          if (!hasWarnedAboutUsingConsumerProvider) {
		            hasWarnedAboutUsingConsumerProvider = true;

		            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
		          }

		          return context.Provider;
		        },
		        set: function (_Provider) {
		          context.Provider = _Provider;
		        }
		      },
		      _currentValue: {
		        get: function () {
		          return context._currentValue;
		        },
		        set: function (_currentValue) {
		          context._currentValue = _currentValue;
		        }
		      },
		      _currentValue2: {
		        get: function () {
		          return context._currentValue2;
		        },
		        set: function (_currentValue2) {
		          context._currentValue2 = _currentValue2;
		        }
		      },
		      _threadCount: {
		        get: function () {
		          return context._threadCount;
		        },
		        set: function (_threadCount) {
		          context._threadCount = _threadCount;
		        }
		      },
		      Consumer: {
		        get: function () {
		          if (!hasWarnedAboutUsingNestedContextConsumers) {
		            hasWarnedAboutUsingNestedContextConsumers = true;

		            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
		          }

		          return context.Consumer;
		        }
		      },
		      displayName: {
		        get: function () {
		          return context.displayName;
		        },
		        set: function (displayName) {
		          if (!hasWarnedAboutDisplayNameOnConsumer) {
		            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

		            hasWarnedAboutDisplayNameOnConsumer = true;
		          }
		        }
		      }
		    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

		    context.Consumer = Consumer;
		  }

		  {
		    context._currentRenderer = null;
		    context._currentRenderer2 = null;
		  }

		  return context;
		}

		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;

		function lazyInitializer(payload) {
		  if (payload._status === Uninitialized) {
		    var ctor = payload._result;
		    var thenable = ctor(); // Transition to the next state.

		    var pending = payload;
		    pending._status = Pending;
		    pending._result = thenable;
		    thenable.then(function (moduleObject) {
		      if (payload._status === Pending) {
		        var defaultExport = moduleObject.default;

		        {
		          if (defaultExport === undefined) {
		            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
		            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
		          }
		        } // Transition to the next state.


		        var resolved = payload;
		        resolved._status = Resolved;
		        resolved._result = defaultExport;
		      }
		    }, function (error) {
		      if (payload._status === Pending) {
		        // Transition to the next state.
		        var rejected = payload;
		        rejected._status = Rejected;
		        rejected._result = error;
		      }
		    });
		  }

		  if (payload._status === Resolved) {
		    return payload._result;
		  } else {
		    throw payload._result;
		  }
		}

		function lazy(ctor) {
		  var payload = {
		    // We use these fields to store the result.
		    _status: -1,
		    _result: ctor
		  };
		  var lazyType = {
		    $$typeof: REACT_LAZY_TYPE,
		    _payload: payload,
		    _init: lazyInitializer
		  };

		  {
		    // In production, this would just set it on the object.
		    var defaultProps;
		    var propTypes; // $FlowFixMe

		    Object.defineProperties(lazyType, {
		      defaultProps: {
		        configurable: true,
		        get: function () {
		          return defaultProps;
		        },
		        set: function (newDefaultProps) {
		          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          defaultProps = newDefaultProps; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'defaultProps', {
		            enumerable: true
		          });
		        }
		      },
		      propTypes: {
		        configurable: true,
		        get: function () {
		          return propTypes;
		        },
		        set: function (newPropTypes) {
		          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

		          propTypes = newPropTypes; // Match production behavior more closely:
		          // $FlowFixMe

		          Object.defineProperty(lazyType, 'propTypes', {
		            enumerable: true
		          });
		        }
		      }
		    });
		  }

		  return lazyType;
		}

		function forwardRef(render) {
		  {
		    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
		      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
		    } else if (typeof render !== 'function') {
		      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
		    } else {
		      if (render.length !== 0 && render.length !== 2) {
		        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
		      }
		    }

		    if (render != null) {
		      if (render.defaultProps != null || render.propTypes != null) {
		        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
		      }
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_FORWARD_REF_TYPE,
		    render: render
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name;

		        if (render.displayName == null) {
		          render.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

		var enableScopeAPI = false; // Experimental Create Event Handle API.

		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


		  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
		    return true;
		  }

		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
		      return true;
		    }
		  }

		  return false;
		}

		function memo(type, compare) {
		  {
		    if (!isValidElementType(type)) {
		      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
		    }
		  }

		  var elementType = {
		    $$typeof: REACT_MEMO_TYPE,
		    type: type,
		    compare: compare === undefined ? null : compare
		  };

		  {
		    var ownName;
		    Object.defineProperty(elementType, 'displayName', {
		      enumerable: false,
		      configurable: true,
		      get: function () {
		        return ownName;
		      },
		      set: function (name) {
		        ownName = name;

		        if (type.displayName == null) {
		          type.displayName = name;
		        }
		      }
		    });
		  }

		  return elementType;
		}

		function resolveDispatcher() {
		  var dispatcher = ReactCurrentDispatcher.current;

		  if (!(dispatcher !== null)) {
		    {
		      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem." );
		    }
		  }

		  return dispatcher;
		}

		function useContext(Context, unstable_observedBits) {
		  var dispatcher = resolveDispatcher();

		  {
		    if (unstable_observedBits !== undefined) {
		      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
		    } // TODO: add a more generic warning for invalid values.


		    if (Context._context !== undefined) {
		      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
		      // and nobody should be using this in existing code.

		      if (realContext.Consumer === Context) {
		        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
		      } else if (realContext.Provider === Context) {
		        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
		      }
		    }
		  }

		  return dispatcher.useContext(Context, unstable_observedBits);
		}
		function useState(initialState) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useRef(initialValue);
		}
		function useEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useCallback(callback, deps);
		}
		function useMemo(create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
		  var dispatcher = resolveDispatcher();
		  return dispatcher.useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
		  {
		    var dispatcher = resolveDispatcher();
		    return dispatcher.useDebugValue(value, formatterFn);
		  }
		}

		// Helpers to patch console.logs to avoid logging during side-effect free
		// replaying on render function. This currently only patches the object
		// lazily which won't cover if the log function was extracted eagerly.
		// We could also eagerly patch the method.
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;

		function disabledLog() {}

		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;

		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        log: _assign({}, props, {
		          value: prevLog
		        }),
		        info: _assign({}, props, {
		          value: prevInfo
		        }),
		        warn: _assign({}, props, {
		          value: prevWarn
		        }),
		        error: _assign({}, props, {
		          value: prevError
		        }),
		        group: _assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: _assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: _assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}

		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      // Extract the VM specific prefix used by each line.
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    } // We use the prefix to ensure our stacks line up with native stack frames.


		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;

		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}

		function describeNativeComponentFrame(fn, construct) {
		  // If something asked for a stack inside a fake render, it should get ignored.
		  if (!fn || reentry) {
		    return '';
		  }

		  {
		    var frame = componentFrameCache.get(fn);

		    if (frame !== undefined) {
		      return frame;
		    }
		  }

		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;

		  {
		    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
		    // for warnings.

		    ReactCurrentDispatcher$1.current = null;
		    disableLogs();
		  }

		  try {
		    // This should throw.
		    if (construct) {
		      // Something should be setting the props in the constructor.
		      var Fake = function () {
		        throw Error();
		      }; // $FlowFixMe


		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          // We use a throwing setter instead of frozen or non-writable props
		          // because that won't throw in a non-strict mode function.
		          throw Error();
		        }
		      });

		      if (typeof Reflect === 'object' && Reflect.construct) {
		        // We construct a different control for this case to include any extra
		        // frames added by the construct call.
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }

		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }

		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }

		      fn();
		    }
		  } catch (sample) {
		    // This is inlined manually because closure doesn't do it for us.
		    if (sample && control && typeof sample.stack === 'string') {
		      // This extracts the first frame from the sample that isn't also in the control.
		      // Skipping one frame that we assume is the frame that calls the two.
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;

		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        // We expect at least one stack frame to be shared.
		        // Typically this will be the root most one. However, stack frames may be
		        // cut off due to maximum stack limits. In this case, one maybe cut off
		        // earlier than the other. We assume that the sample is longer or the same
		        // and there for cut off earlier. So we should find the root most frame in
		        // the sample somewhere in the control.
		        c--;
		      }

		      for (; s >= 1 && c >= 0; s--, c--) {
		        // Next we find the first one that isn't the same which should be the
		        // frame that called our sample function and the control.
		        if (sampleLines[s] !== controlLines[c]) {
		          // In V8, the first line is describing the message but other VMs don't.
		          // If we're about to return the first line, and the control is also on the same
		          // line, that's a pretty good indicator that our sample threw at same line as
		          // the control. I.e. before we entered the sample frame. So we ignore this result.
		          // This can happen if you passed a class to function component, or non-function.
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--; // We may still have similar intermediate frames from the construct call.
		              // The next one that isn't the same should be our match though.

		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                } // Return the line we found.


		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }

		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;

		    {
		      ReactCurrentDispatcher$1.current = previousDispatcher;
		      reenableLogs();
		    }

		    Error.prepareStackTrace = previousPrepareStackTrace;
		  } // Fallback to just using the name if we couldn't make it throw.


		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }

		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}

		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}

		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

		  if (type == null) {
		    return '';
		  }

		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }

		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }

		  switch (type) {
		    case exports.Suspense:
		      return describeBuiltInComponentFrame('Suspense');

		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);

		      case REACT_MEMO_TYPE:
		        // Memo may contain any component type so we recursively resolve it.
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

		      case REACT_BLOCK_TYPE:
		        return describeFunctionComponentFrame(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            // Lazy may contain any component type so we recursively resolve it.
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }

		  return '';
		}

		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}

		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    // $FlowFixMe This is okay but Flow doesn't know it.
		    var has = Function.call.bind(Object.prototype.hasOwnProperty);

		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.

		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }

		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }

		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);

		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

		          setCurrentlyValidatingElement(null);
		        }

		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);

		          error('Failed %s type: %s', location, error$1.message);

		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}

		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      setExtraStackFrame(stack);
		    } else {
		      setExtraStackFrame(null);
		    }
		  }
		}

		var propTypesMisspellWarningShown;

		{
		  propTypesMisspellWarningShown = false;
		}

		function getDeclarationErrorAddendum() {
		  if (ReactCurrentOwner.current) {
		    var name = getComponentName(ReactCurrentOwner.current.type);

		    if (name) {
		      return '\n\nCheck the render method of `' + name + '`.';
		    }
		  }

		  return '';
		}

		function getSourceInfoErrorAddendum(source) {
		  if (source !== undefined) {
		    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		    var lineNumber = source.lineNumber;
		    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		  }

		  return '';
		}

		function getSourceInfoErrorAddendumForProps(elementProps) {
		  if (elementProps !== null && elementProps !== undefined) {
		    return getSourceInfoErrorAddendum(elementProps.__source);
		  }

		  return '';
		}
		/**
		 * Warn if there's no key explicitly set on dynamic arrays of children or
		 * object keys are not valid. This allows us to keep track of children between
		 * updates.
		 */


		var ownerHasKeyUseWarning = {};

		function getCurrentComponentErrorInfo(parentType) {
		  var info = getDeclarationErrorAddendum();

		  if (!info) {
		    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

		    if (parentName) {
		      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		    }
		  }

		  return info;
		}
		/**
		 * Warn if the element doesn't have an explicit key assigned to it.
		 * This element is in an array. The array could grow and shrink or be
		 * reordered. All children that haven't already been validated are required to
		 * have a "key" property assigned to it. Error statuses are cached so a warning
		 * will only be shown once.
		 *
		 * @internal
		 * @param {ReactElement} element Element that requires a key.
		 * @param {*} parentType element's parent's type.
		 */


		function validateExplicitKey(element, parentType) {
		  if (!element._store || element._store.validated || element.key != null) {
		    return;
		  }

		  element._store.validated = true;
		  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

		  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		    return;
		  }

		  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
		  // property, it may be the creator of the child that's responsible for
		  // assigning it a key.

		  var childOwner = '';

		  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
		    // Give the component that originally created this child.
		    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
		  }

		  {
		    setCurrentlyValidatingElement$1(element);

		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

		    setCurrentlyValidatingElement$1(null);
		  }
		}
		/**
		 * Ensure that every element either is passed in a static location, in an
		 * array with an explicit keys property defined, or in an object literal
		 * with valid key property.
		 *
		 * @internal
		 * @param {ReactNode} node Statically passed child of any type.
		 * @param {*} parentType node's parent's type.
		 */


		function validateChildKeys(node, parentType) {
		  if (typeof node !== 'object') {
		    return;
		  }

		  if (Array.isArray(node)) {
		    for (var i = 0; i < node.length; i++) {
		      var child = node[i];

		      if (isValidElement(child)) {
		        validateExplicitKey(child, parentType);
		      }
		    }
		  } else if (isValidElement(node)) {
		    // This element was passed in a valid location.
		    if (node._store) {
		      node._store.validated = true;
		    }
		  } else if (node) {
		    var iteratorFn = getIteratorFn(node);

		    if (typeof iteratorFn === 'function') {
		      // Entry iterators used to provide implicit keys,
		      // but now we print a separate warning for them later.
		      if (iteratorFn !== node.entries) {
		        var iterator = iteratorFn.call(node);
		        var step;

		        while (!(step = iterator.next()).done) {
		          if (isValidElement(step.value)) {
		            validateExplicitKey(step.value, parentType);
		          }
		        }
		      }
		    }
		  }
		}
		/**
		 * Given an element, validate that its props follow the propTypes definition,
		 * provided by the type.
		 *
		 * @param {ReactElement} element
		 */


		function validatePropTypes(element) {
		  {
		    var type = element.type;

		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }

		    var propTypes;

		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
		    // Inner props are checked in the reconciler.
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }

		    if (propTypes) {
		      // Intentionally inside to avoid triggering lazy initializers:
		      var name = getComponentName(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

		      var _name = getComponentName(type);

		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }

		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		/**
		 * Given a fragment, validate that it can only be provided with fragment props
		 * @param {ReactElement} fragment
		 */


		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);

		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];

		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);

		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }

		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);

		      error('Invalid attribute `ref` supplied to `React.Fragment`.');

		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}
		function createElementWithValidation(type, props, children) {
		  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
		  // succeed and there will likely be errors in render.

		  if (!validType) {
		    var info = '';

		    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		    }

		    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

		    if (sourceInfo) {
		      info += sourceInfo;
		    } else {
		      info += getDeclarationErrorAddendum();
		    }

		    var typeString;

		    if (type === null) {
		      typeString = 'null';
		    } else if (Array.isArray(type)) {
		      typeString = 'array';
		    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
		      info = ' Did you accidentally export a JSX literal instead of a component?';
		    } else {
		      typeString = typeof type;
		    }

		    {
		      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }
		  }

		  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
		  // TODO: Drop this when these are no longer allowed as the type argument.

		  if (element == null) {
		    return element;
		  } // Skip key warning if the type isn't valid since our key validation logic
		  // doesn't expect a non-string/function type and can throw confusing errors.
		  // We don't want exception behavior to differ between dev and prod.
		  // (Rendering will throw with a helpful message and as soon as the type is
		  // fixed, the key warnings will appear.)


		  if (validType) {
		    for (var i = 2; i < arguments.length; i++) {
		      validateChildKeys(arguments[i], type);
		    }
		  }

		  if (type === exports.Fragment) {
		    validateFragmentProps(element);
		  } else {
		    validatePropTypes(element);
		  }

		  return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
		  var validatedFactory = createElementWithValidation.bind(null, type);
		  validatedFactory.type = type;

		  {
		    if (!didWarnAboutDeprecatedCreateFactory) {
		      didWarnAboutDeprecatedCreateFactory = true;

		      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
		    } // Legacy hook: remove it


		    Object.defineProperty(validatedFactory, 'type', {
		      enumerable: false,
		      get: function () {
		        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

		        Object.defineProperty(this, 'type', {
		          value: type
		        });
		        return type;
		      }
		    });
		  }

		  return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
		  var newElement = cloneElement.apply(this, arguments);

		  for (var i = 2; i < arguments.length; i++) {
		    validateChildKeys(arguments[i], newElement.type);
		  }

		  validatePropTypes(newElement);
		  return newElement;
		}

		{

		  try {
		    var frozenObject = Object.freeze({});
		    /* eslint-disable no-new */

		    new Map([[frozenObject, null]]);
		    new Set([frozenObject]);
		    /* eslint-enable no-new */
		  } catch (e) {
		  }
		}

		var createElement$1 =  createElementWithValidation ;
		var cloneElement$1 =  cloneElementWithValidation ;
		var createFactory =  createFactoryWithValidation ;
		var Children = {
		  map: mapChildren,
		  forEach: forEachChildren,
		  count: countChildren,
		  toArray: toArray,
		  only: onlyChild
		};

		exports.Children = Children;
		exports.Component = Component;
		exports.PureComponent = PureComponent;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useEffect = useEffect;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.version = ReactVersion;
		  })();
		}
} (react_development));
	return react_development;
}

(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = requireReact_production_min();
	} else {
	  module.exports = requireReact_development();
	}
} (react));

/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
requireObjectAssign();var f=react.exports,g=60103;reactJsxRuntime_production_min.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");reactJsxRuntime_production_min.Fragment=h("react.fragment");}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
	function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	(function (exports) {

		if (process.env.NODE_ENV !== "production") {
		  (function() {

		var React = react.exports;
		var _assign = requireObjectAssign();

		// ATTENTION
		// When adding new symbols to this file,
		// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
		// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
		// nor polyfill, then a plain number is used for performance.
		var REACT_ELEMENT_TYPE = 0xeac7;
		var REACT_PORTAL_TYPE = 0xeaca;
		exports.Fragment = 0xeacb;
		var REACT_STRICT_MODE_TYPE = 0xeacc;
		var REACT_PROFILER_TYPE = 0xead2;
		var REACT_PROVIDER_TYPE = 0xeacd;
		var REACT_CONTEXT_TYPE = 0xeace;
		var REACT_FORWARD_REF_TYPE = 0xead0;
		var REACT_SUSPENSE_TYPE = 0xead1;
		var REACT_SUSPENSE_LIST_TYPE = 0xead8;
		var REACT_MEMO_TYPE = 0xead3;
		var REACT_LAZY_TYPE = 0xead4;
		var REACT_BLOCK_TYPE = 0xead9;
		var REACT_SERVER_BLOCK_TYPE = 0xeada;
		var REACT_FUNDAMENTAL_TYPE = 0xead5;
		var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
		var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

		if (typeof Symbol === 'function' && Symbol.for) {
		  var symbolFor = Symbol.for;
		  REACT_ELEMENT_TYPE = symbolFor('react.element');
		  REACT_PORTAL_TYPE = symbolFor('react.portal');
		  exports.Fragment = symbolFor('react.fragment');
		  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
		  REACT_PROFILER_TYPE = symbolFor('react.profiler');
		  REACT_PROVIDER_TYPE = symbolFor('react.provider');
		  REACT_CONTEXT_TYPE = symbolFor('react.context');
		  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
		  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
		  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
		  REACT_MEMO_TYPE = symbolFor('react.memo');
		  REACT_LAZY_TYPE = symbolFor('react.lazy');
		  REACT_BLOCK_TYPE = symbolFor('react.block');
		  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
		  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
		  symbolFor('react.scope');
		  symbolFor('react.opaque.id');
		  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
		  symbolFor('react.offscreen');
		  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
		}

		var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }

		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }

		  return null;
		}

		var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

		function error(format) {
		  {
		    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		      args[_key2 - 1] = arguments[_key2];
		    }

		    printWarning('error', format, args);
		  }
		}

		function printWarning(level, format, args) {
		  // When changing this logic, you might want to also
		  // update consoleWithStackDev.www.js as well.
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();

		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    }

		    var argsWithFormat = args.map(function (item) {
		      return '' + item;
		    }); // Careful: RN currently depends on this prefix

		    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
		    // breaks IE9: https://github.com/facebook/react/issues/13610
		    // eslint-disable-next-line react-internal/no-production-logging

		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}

		// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

		var enableScopeAPI = false; // Experimental Create Event Handle API.

		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


		  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
		    return true;
		  }

		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
		      return true;
		    }
		  }

		  return false;
		}

		function getWrappedName(outerType, innerType, wrapperName) {
		  var functionName = innerType.displayName || innerType.name || '';
		  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
		}

		function getContextName(type) {
		  return type.displayName || 'Context';
		}

		function getComponentName(type) {
		  if (type == null) {
		    // Host root, text node or just invalid type.
		    return null;
		  }

		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }

		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }

		  if (typeof type === 'string') {
		    return type;
		  }

		  switch (type) {
		    case exports.Fragment:
		      return 'Fragment';

		    case REACT_PORTAL_TYPE:
		      return 'Portal';

		    case REACT_PROFILER_TYPE:
		      return 'Profiler';

		    case REACT_STRICT_MODE_TYPE:
		      return 'StrictMode';

		    case REACT_SUSPENSE_TYPE:
		      return 'Suspense';

		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';

		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';

		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');

		      case REACT_MEMO_TYPE:
		        return getComponentName(type.type);

		      case REACT_BLOCK_TYPE:
		        return getComponentName(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            return getComponentName(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }
		    }
		  }

		  return null;
		}

		// Helpers to patch console.logs to avoid logging during side-effect free
		// replaying on render function. This currently only patches the object
		// lazily which won't cover if the log function was extracted eagerly.
		// We could also eagerly patch the method.
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;

		function disabledLog() {}

		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;

		    if (disabledDepth === 0) {
		      /* eslint-disable react-internal/no-production-logging */
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      }; // $FlowFixMe Flow thinks console is immutable.

		      Object.defineProperties(console, {
		        log: _assign({}, props, {
		          value: prevLog
		        }),
		        info: _assign({}, props, {
		          value: prevInfo
		        }),
		        warn: _assign({}, props, {
		          value: prevWarn
		        }),
		        error: _assign({}, props, {
		          value: prevError
		        }),
		        group: _assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: _assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: _assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		      /* eslint-enable react-internal/no-production-logging */
		    }

		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}

		var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      // Extract the VM specific prefix used by each line.
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    } // We use the prefix to ensure our stacks line up with native stack frames.


		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;

		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}

		function describeNativeComponentFrame(fn, construct) {
		  // If something asked for a stack inside a fake render, it should get ignored.
		  if (!fn || reentry) {
		    return '';
		  }

		  {
		    var frame = componentFrameCache.get(fn);

		    if (frame !== undefined) {
		      return frame;
		    }
		  }

		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;

		  {
		    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
		    // for warnings.

		    ReactCurrentDispatcher.current = null;
		    disableLogs();
		  }

		  try {
		    // This should throw.
		    if (construct) {
		      // Something should be setting the props in the constructor.
		      var Fake = function () {
		        throw Error();
		      }; // $FlowFixMe


		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          // We use a throwing setter instead of frozen or non-writable props
		          // because that won't throw in a non-strict mode function.
		          throw Error();
		        }
		      });

		      if (typeof Reflect === 'object' && Reflect.construct) {
		        // We construct a different control for this case to include any extra
		        // frames added by the construct call.
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }

		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }

		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }

		      fn();
		    }
		  } catch (sample) {
		    // This is inlined manually because closure doesn't do it for us.
		    if (sample && control && typeof sample.stack === 'string') {
		      // This extracts the first frame from the sample that isn't also in the control.
		      // Skipping one frame that we assume is the frame that calls the two.
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;

		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        // We expect at least one stack frame to be shared.
		        // Typically this will be the root most one. However, stack frames may be
		        // cut off due to maximum stack limits. In this case, one maybe cut off
		        // earlier than the other. We assume that the sample is longer or the same
		        // and there for cut off earlier. So we should find the root most frame in
		        // the sample somewhere in the control.
		        c--;
		      }

		      for (; s >= 1 && c >= 0; s--, c--) {
		        // Next we find the first one that isn't the same which should be the
		        // frame that called our sample function and the control.
		        if (sampleLines[s] !== controlLines[c]) {
		          // In V8, the first line is describing the message but other VMs don't.
		          // If we're about to return the first line, and the control is also on the same
		          // line, that's a pretty good indicator that our sample threw at same line as
		          // the control. I.e. before we entered the sample frame. So we ignore this result.
		          // This can happen if you passed a class to function component, or non-function.
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--; // We may still have similar intermediate frames from the construct call.
		              // The next one that isn't the same should be our match though.

		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                } // Return the line we found.


		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }

		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;

		    {
		      ReactCurrentDispatcher.current = previousDispatcher;
		      reenableLogs();
		    }

		    Error.prepareStackTrace = previousPrepareStackTrace;
		  } // Fallback to just using the name if we couldn't make it throw.


		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }

		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}

		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}

		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

		  if (type == null) {
		    return '';
		  }

		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }

		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }

		  switch (type) {
		    case REACT_SUSPENSE_TYPE:
		      return describeBuiltInComponentFrame('Suspense');

		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }

		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);

		      case REACT_MEMO_TYPE:
		        // Memo may contain any component type so we recursively resolve it.
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

		      case REACT_BLOCK_TYPE:
		        return describeFunctionComponentFrame(type._render);

		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;

		          try {
		            // Lazy may contain any component type so we recursively resolve it.
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }

		  return '';
		}

		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame.setExtraStackFrame(null);
		    }
		  }
		}

		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    // $FlowFixMe This is okay but Flow doesn't know it.
		    var has = Function.call.bind(Object.prototype.hasOwnProperty);

		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.

		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }

		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }

		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);

		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

		          setCurrentlyValidatingElement(null);
		        }

		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);

		          error('Failed %s type: %s', location, error$1.message);

		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}

		var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown;
		var specialPropRefWarningShown;
		var didWarnAboutStringRefs;

		{
		  didWarnAboutStringRefs = {};
		}

		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.ref !== undefined;
		}

		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }

		  return config.key !== undefined;
		}

		function warnIfStringRefCannotBeAutoConverted(config, self) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
		      var componentName = getComponentName(ReactCurrentOwner.current.type);

		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}

		function defineKeyPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingKey = function () {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;

		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };

		    warnAboutAccessingKey.isReactWarning = true;
		    Object.defineProperty(props, 'key', {
		      get: warnAboutAccessingKey,
		      configurable: true
		    });
		  }
		}

		function defineRefPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingRef = function () {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;

		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };

		    warnAboutAccessingRef.isReactWarning = true;
		    Object.defineProperty(props, 'ref', {
		      get: warnAboutAccessingRef,
		      configurable: true
		    });
		  }
		}
		/**
		 * Factory method to create a new React element. This no longer adheres to
		 * the class pattern, so do not use new to call it. Also, instanceof check
		 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		 * if something is a React Element.
		 *
		 * @param {*} type
		 * @param {*} props
		 * @param {*} key
		 * @param {string|object} ref
		 * @param {*} owner
		 * @param {*} self A *temporary* helper to detect places where `this` is
		 * different from the `owner` when React.createElement is called, so that we
		 * can warn. We want to get rid of owner and replace string `ref`s with arrow
		 * functions, and as long as `this` and owner are the same, there will be no
		 * change in behavior.
		 * @param {*} source An annotation object (added by a transpiler or otherwise)
		 * indicating filename, line number, and/or other information.
		 * @internal
		 */


		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    // This tag allows us to uniquely identify this as a React Element
		    $$typeof: REACT_ELEMENT_TYPE,
		    // Built-in properties that belong on the element
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    // Record the component responsible for creating this element.
		    _owner: owner
		  };

		  {
		    // The validation flag is currently mutative. We put it on
		    // an external backing store so that we can freeze the whole object.
		    // This can be replaced with a WeakMap once they are implemented in
		    // commonly used development environments.
		    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
		    // the validation flag non-enumerable (where possible, which should
		    // include every environment we run tests in), so the test framework
		    // ignores it.

		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    }); // self and source are DEV only properties.

		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    }); // Two elements created in two different places should be considered
		    // equal for testing purposes and therefore we hide it from enumeration.

		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });

		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }

		  return element;
		};
		/**
		 * https://github.com/reactjs/rfcs/pull/107
		 * @param {*} type
		 * @param {object} props
		 * @param {string} key
		 */

		function jsxDEV(type, config, maybeKey, source, self) {
		  {
		    var propName; // Reserved names are extracted

		    var props = {};
		    var key = null;
		    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
		    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
		    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
		    // but as an intermediary step, we will use jsxDEV for everything except
		    // <div {...props} key="Hi" />, because we aren't currently able to tell if
		    // key is explicitly declared to be undefined or not.

		    if (maybeKey !== undefined) {
		      key = '' + maybeKey;
		    }

		    if (hasValidKey(config)) {
		      key = '' + config.key;
		    }

		    if (hasValidRef(config)) {
		      ref = config.ref;
		      warnIfStringRefCannotBeAutoConverted(config, self);
		    } // Remaining properties are added to a new props object


		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    } // Resolve default props


		    if (type && type.defaultProps) {
		      var defaultProps = type.defaultProps;

		      for (propName in defaultProps) {
		        if (props[propName] === undefined) {
		          props[propName] = defaultProps[propName];
		        }
		      }
		    }

		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }

		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }

		    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		  }
		}

		var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}

		var propTypesMisspellWarningShown;

		{
		  propTypesMisspellWarningShown = false;
		}
		/**
		 * Verifies the object is a ReactElement.
		 * See https://reactjs.org/docs/react-api.html#isvalidelement
		 * @param {?object} object
		 * @return {boolean} True if `object` is a ReactElement.
		 * @final
		 */

		function isValidElement(object) {
		  {
		    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		  }
		}

		function getDeclarationErrorAddendum() {
		  {
		    if (ReactCurrentOwner$1.current) {
		      var name = getComponentName(ReactCurrentOwner$1.current.type);

		      if (name) {
		        return '\n\nCheck the render method of `' + name + '`.';
		      }
		    }

		    return '';
		  }
		}

		function getSourceInfoErrorAddendum(source) {
		  {
		    if (source !== undefined) {
		      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		      var lineNumber = source.lineNumber;
		      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		    }

		    return '';
		  }
		}
		/**
		 * Warn if there's no key explicitly set on dynamic arrays of children or
		 * object keys are not valid. This allows us to keep track of children between
		 * updates.
		 */


		var ownerHasKeyUseWarning = {};

		function getCurrentComponentErrorInfo(parentType) {
		  {
		    var info = getDeclarationErrorAddendum();

		    if (!info) {
		      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

		      if (parentName) {
		        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		      }
		    }

		    return info;
		  }
		}
		/**
		 * Warn if the element doesn't have an explicit key assigned to it.
		 * This element is in an array. The array could grow and shrink or be
		 * reordered. All children that haven't already been validated are required to
		 * have a "key" property assigned to it. Error statuses are cached so a warning
		 * will only be shown once.
		 *
		 * @internal
		 * @param {ReactElement} element Element that requires a key.
		 * @param {*} parentType element's parent's type.
		 */


		function validateExplicitKey(element, parentType) {
		  {
		    if (!element._store || element._store.validated || element.key != null) {
		      return;
		    }

		    element._store.validated = true;
		    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

		    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		      return;
		    }

		    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
		    // property, it may be the creator of the child that's responsible for
		    // assigning it a key.

		    var childOwner = '';

		    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
		      // Give the component that originally created this child.
		      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
		    }

		    setCurrentlyValidatingElement$1(element);

		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

		    setCurrentlyValidatingElement$1(null);
		  }
		}
		/**
		 * Ensure that every element either is passed in a static location, in an
		 * array with an explicit keys property defined, or in an object literal
		 * with valid key property.
		 *
		 * @internal
		 * @param {ReactNode} node Statically passed child of any type.
		 * @param {*} parentType node's parent's type.
		 */


		function validateChildKeys(node, parentType) {
		  {
		    if (typeof node !== 'object') {
		      return;
		    }

		    if (Array.isArray(node)) {
		      for (var i = 0; i < node.length; i++) {
		        var child = node[i];

		        if (isValidElement(child)) {
		          validateExplicitKey(child, parentType);
		        }
		      }
		    } else if (isValidElement(node)) {
		      // This element was passed in a valid location.
		      if (node._store) {
		        node._store.validated = true;
		      }
		    } else if (node) {
		      var iteratorFn = getIteratorFn(node);

		      if (typeof iteratorFn === 'function') {
		        // Entry iterators used to provide implicit keys,
		        // but now we print a separate warning for them later.
		        if (iteratorFn !== node.entries) {
		          var iterator = iteratorFn.call(node);
		          var step;

		          while (!(step = iterator.next()).done) {
		            if (isValidElement(step.value)) {
		              validateExplicitKey(step.value, parentType);
		            }
		          }
		        }
		      }
		    }
		  }
		}
		/**
		 * Given an element, validate that its props follow the propTypes definition,
		 * provided by the type.
		 *
		 * @param {ReactElement} element
		 */


		function validatePropTypes(element) {
		  {
		    var type = element.type;

		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }

		    var propTypes;

		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
		    // Inner props are checked in the reconciler.
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }

		    if (propTypes) {
		      // Intentionally inside to avoid triggering lazy initializers:
		      var name = getComponentName(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

		      var _name = getComponentName(type);

		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }

		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		/**
		 * Given a fragment, validate that it can only be provided with fragment props
		 * @param {ReactElement} fragment
		 */


		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);

		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];

		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);

		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }

		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);

		      error('Invalid attribute `ref` supplied to `React.Fragment`.');

		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}

		function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
		  {
		    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
		    // succeed and there will likely be errors in render.

		    if (!validType) {
		      var info = '';

		      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		      }

		      var sourceInfo = getSourceInfoErrorAddendum(source);

		      if (sourceInfo) {
		        info += sourceInfo;
		      } else {
		        info += getDeclarationErrorAddendum();
		      }

		      var typeString;

		      if (type === null) {
		        typeString = 'null';
		      } else if (Array.isArray(type)) {
		        typeString = 'array';
		      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
		        info = ' Did you accidentally export a JSX literal instead of a component?';
		      } else {
		        typeString = typeof type;
		      }

		      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }

		    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
		    // TODO: Drop this when these are no longer allowed as the type argument.

		    if (element == null) {
		      return element;
		    } // Skip key warning if the type isn't valid since our key validation logic
		    // doesn't expect a non-string/function type and can throw confusing errors.
		    // We don't want exception behavior to differ between dev and prod.
		    // (Rendering will throw with a helpful message and as soon as the type is
		    // fixed, the key warnings will appear.)


		    if (validType) {
		      var children = props.children;

		      if (children !== undefined) {
		        if (isStaticChildren) {
		          if (Array.isArray(children)) {
		            for (var i = 0; i < children.length; i++) {
		              validateChildKeys(children[i], type);
		            }

		            if (Object.freeze) {
		              Object.freeze(children);
		            }
		          } else {
		            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
		          }
		        } else {
		          validateChildKeys(children, type);
		        }
		      }
		    }

		    if (type === exports.Fragment) {
		      validateFragmentProps(element);
		    } else {
		      validatePropTypes(element);
		    }

		    return element;
		  }
		} // These two functions exist to still get child warnings in dev
		// even with the prod transform. This means that jsxDEV is purely
		// opt-in behavior for better messages but that we won't stop
		// giving you warnings if you use production apis.

		function jsxWithValidationStatic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, true);
		  }
		}
		function jsxWithValidationDynamic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, false);
		  }
		}

		var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
		// for now we can ship identical prod functions

		var jsxs =  jsxWithValidationStatic ;

		exports.jsx = jsx;
		exports.jsxs = jsxs;
		  })();
		}
} (reactJsxRuntime_development));
	return reactJsxRuntime_development;
}

(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = requireReactJsxRuntime_production_min();
	} else {
	  module.exports = requireReactJsxRuntime_development();
	}
} (jsxRuntime));

var en = {};

var zh = {};

// file examples: en, enGB, zh, zhHK

var localeData = /*#__PURE__*/Object.freeze({
    __proto__: null,
    en: en,
    zh: zh
});

var ErrorKind;
(function (ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */
    ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */
    ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */
    ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
    ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
    ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
    ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
     * Expecting a message fragment after the `plural` or `selectordinal` selector
     * (e.g. `{foo, plural, one}`)
     */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
     * Duplicate selectors in `plural` or `selectordinal` argument.
     * (e.g. {foo, plural, one {#} one {#}})
     */
    ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
     * (e.g. {foo, select, apple {apple} apple {apple}})
     */
    ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */
    ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
    ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */
    ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
    ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
    ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));

var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.dateTime);
}

// @generated from regex-gen.ts
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}

// @generated from regex-gen.ts
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error('Number skeleton cannot be empty');
    }
    // Parse the skeleton
    var stringTokens = skeleton
        .split(WHITE_SPACE_REGEX)
        .filter(function (x) { return x.length > 0; });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split('/');
        if (stemAndOptions.length === 0) {
            throw new Error('Invalid number skeleton');
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var option = options_1[_a];
            if (option.length === 0) {
                throw new Error('Invalid number skeleton');
            }
        }
        tokens.push({ stem: stem, options: options });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === 'r') {
        result.roundingPriority = 'morePrecision';
    }
    else if (str[str.length - 1] === 's') {
        result.roundingPriority = 'lessPrecision';
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
        case '()':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
        case '+!':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
        case '()!':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
        case '+?':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
        case '()?':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
        case '+_':
            return {
                signDisplay: 'never',
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    var result;
    if (stem[0] === 'E' && stem[1] === 'E') {
        result = {
            notation: 'engineering',
        };
        stem = stem.slice(2);
    }
    else if (stem[0] === 'E') {
        result = {
            notation: 'scientific',
        };
        stem = stem.slice(1);
    }
    if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === '+!') {
            result.signDisplay = 'always';
            stem = stem.slice(2);
        }
        else if (signDisplay === '+?') {
            result.signDisplay = 'exceptZero';
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error('Malformed concise eng/scientific notation');
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
            case '%':
                result.style = 'percent';
                continue;
            case '%x100':
                result.style = 'percent';
                result.scale = 100;
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
            case ',_':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
            case 'unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
            case 'K':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
            case 'KK':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = __assign(__assign(__assign({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = __assign(__assign(__assign({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
            case 'scale':
                result.scale = parseFloat(token.options[0]);
                continue;
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
            case 'integer-width':
                if (token.options.length > 1) {
                    throw new RangeError('integer-width stems only accept a single optional option');
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    }
                    else if (g3 && g4) {
                        throw new Error('We currently do not support maximum integer digits');
                    }
                    else if (g5) {
                        throw new Error('We currently do not support exact integer digits');
                    }
                    return '';
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            var opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === 'w') {
                result = __assign(__assign({}, result), { trailingZeroDisplay: 'stripIfInteger' });
            }
            else if (opt) {
                result = __assign(__assign({}, result), parseSignificantPrecision(opt));
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = __assign(__assign({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
        }
    }
    return result;
}

// @generated from time-data-gen.ts
// prettier-ignore  
var timeData = {
    "AX": [
        "H"
    ],
    "BQ": [
        "H"
    ],
    "CP": [
        "H"
    ],
    "CZ": [
        "H"
    ],
    "DK": [
        "H"
    ],
    "FI": [
        "H"
    ],
    "ID": [
        "H"
    ],
    "IS": [
        "H"
    ],
    "ML": [
        "H"
    ],
    "NE": [
        "H"
    ],
    "RU": [
        "H"
    ],
    "SE": [
        "H"
    ],
    "SJ": [
        "H"
    ],
    "SK": [
        "H"
    ],
    "AS": [
        "h",
        "H"
    ],
    "BT": [
        "h",
        "H"
    ],
    "DJ": [
        "h",
        "H"
    ],
    "ER": [
        "h",
        "H"
    ],
    "GH": [
        "h",
        "H"
    ],
    "IN": [
        "h",
        "H"
    ],
    "LS": [
        "h",
        "H"
    ],
    "PG": [
        "h",
        "H"
    ],
    "PW": [
        "h",
        "H"
    ],
    "SO": [
        "h",
        "H"
    ],
    "TO": [
        "h",
        "H"
    ],
    "VU": [
        "h",
        "H"
    ],
    "WS": [
        "h",
        "H"
    ],
    "001": [
        "H",
        "h"
    ],
    "AL": [
        "h",
        "H",
        "hB"
    ],
    "TD": [
        "h",
        "H",
        "hB"
    ],
    "ca-ES": [
        "H",
        "h",
        "hB"
    ],
    "CF": [
        "H",
        "h",
        "hB"
    ],
    "CM": [
        "H",
        "h",
        "hB"
    ],
    "fr-CA": [
        "H",
        "h",
        "hB"
    ],
    "gl-ES": [
        "H",
        "h",
        "hB"
    ],
    "it-CH": [
        "H",
        "h",
        "hB"
    ],
    "it-IT": [
        "H",
        "h",
        "hB"
    ],
    "LU": [
        "H",
        "h",
        "hB"
    ],
    "NP": [
        "H",
        "h",
        "hB"
    ],
    "PF": [
        "H",
        "h",
        "hB"
    ],
    "SC": [
        "H",
        "h",
        "hB"
    ],
    "SM": [
        "H",
        "h",
        "hB"
    ],
    "SN": [
        "H",
        "h",
        "hB"
    ],
    "TF": [
        "H",
        "h",
        "hB"
    ],
    "VA": [
        "H",
        "h",
        "hB"
    ],
    "CY": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "GR": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "CO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "DO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KP": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "VE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BW": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BZ": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "DG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "FK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GB": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IM": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IO": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "JE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "LT": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NF": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NR": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NU": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "PN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SH": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "TA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ZA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "AR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CL": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "CU": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "EA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-BO": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-EC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-PE": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "GT": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "HN": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "IC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KG": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KM": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "LK": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MX": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "NI": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "PY": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "SV": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "UY": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "JP": [
        "H",
        "h",
        "K"
    ],
    "AD": [
        "H",
        "hB"
    ],
    "AM": [
        "H",
        "hB"
    ],
    "AO": [
        "H",
        "hB"
    ],
    "AT": [
        "H",
        "hB"
    ],
    "AW": [
        "H",
        "hB"
    ],
    "BE": [
        "H",
        "hB"
    ],
    "BF": [
        "H",
        "hB"
    ],
    "BJ": [
        "H",
        "hB"
    ],
    "BL": [
        "H",
        "hB"
    ],
    "BR": [
        "H",
        "hB"
    ],
    "CG": [
        "H",
        "hB"
    ],
    "CI": [
        "H",
        "hB"
    ],
    "CV": [
        "H",
        "hB"
    ],
    "DE": [
        "H",
        "hB"
    ],
    "EE": [
        "H",
        "hB"
    ],
    "FR": [
        "H",
        "hB"
    ],
    "GA": [
        "H",
        "hB"
    ],
    "GF": [
        "H",
        "hB"
    ],
    "GN": [
        "H",
        "hB"
    ],
    "GP": [
        "H",
        "hB"
    ],
    "GW": [
        "H",
        "hB"
    ],
    "HR": [
        "H",
        "hB"
    ],
    "IL": [
        "H",
        "hB"
    ],
    "IT": [
        "H",
        "hB"
    ],
    "KZ": [
        "H",
        "hB"
    ],
    "MC": [
        "H",
        "hB"
    ],
    "MD": [
        "H",
        "hB"
    ],
    "MF": [
        "H",
        "hB"
    ],
    "MQ": [
        "H",
        "hB"
    ],
    "MZ": [
        "H",
        "hB"
    ],
    "NC": [
        "H",
        "hB"
    ],
    "NL": [
        "H",
        "hB"
    ],
    "PM": [
        "H",
        "hB"
    ],
    "PT": [
        "H",
        "hB"
    ],
    "RE": [
        "H",
        "hB"
    ],
    "RO": [
        "H",
        "hB"
    ],
    "SI": [
        "H",
        "hB"
    ],
    "SR": [
        "H",
        "hB"
    ],
    "ST": [
        "H",
        "hB"
    ],
    "TG": [
        "H",
        "hB"
    ],
    "TR": [
        "H",
        "hB"
    ],
    "WF": [
        "H",
        "hB"
    ],
    "YT": [
        "H",
        "hB"
    ],
    "BD": [
        "h",
        "hB",
        "H"
    ],
    "PK": [
        "h",
        "hB",
        "H"
    ],
    "AZ": [
        "H",
        "hB",
        "h"
    ],
    "BA": [
        "H",
        "hB",
        "h"
    ],
    "BG": [
        "H",
        "hB",
        "h"
    ],
    "CH": [
        "H",
        "hB",
        "h"
    ],
    "GE": [
        "H",
        "hB",
        "h"
    ],
    "LI": [
        "H",
        "hB",
        "h"
    ],
    "ME": [
        "H",
        "hB",
        "h"
    ],
    "RS": [
        "H",
        "hB",
        "h"
    ],
    "UA": [
        "H",
        "hB",
        "h"
    ],
    "UZ": [
        "H",
        "hB",
        "h"
    ],
    "XK": [
        "H",
        "hB",
        "h"
    ],
    "AG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "CA": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "DM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "en-001": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FJ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GD": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "JM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KN": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LR": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MH": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MP": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MW": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "NZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SL": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TT": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "UM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "US": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ZM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BO": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "EC": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "ES": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "GQ": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "PE": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "AE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "BH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "DZ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EG": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "HK": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "IQ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "JO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "KW": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LB": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MR": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "OM": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PS": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "QA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SD": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "TN": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "YE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "AF": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "LA": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "CN": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "LV": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "TL": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "CD": [
        "hB",
        "H"
    ],
    "IR": [
        "hB",
        "H"
    ],
    "hi-IN": [
        "hB",
        "h",
        "H"
    ],
    "kn-IN": [
        "hB",
        "h",
        "H"
    ],
    "ml-IN": [
        "hB",
        "h",
        "H"
    ],
    "te-IN": [
        "hB",
        "h",
        "H"
    ],
    "KH": [
        "hB",
        "h",
        "H",
        "hb"
    ],
    "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
    ],
    "BN": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "MY": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "ET": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "TW": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "KE": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "MM": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "TZ": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UG": [
        "hB",
        "hb",
        "H",
        "h"
    ]
};

/**
 * Returns the best matching date time pattern if a date time skeleton
 * pattern is provided with a locale. Follows the Unicode specification:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#table-mapping-requested-time-skeletons-to-patterns
 * @param skeleton date time skeleton pattern that possibly includes j, J or C
 * @param locale
 */
function getBestPattern(skeleton, locale) {
    var skeletonCopy = '';
    for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
        var patternChar = skeleton.charAt(patternPos);
        if (patternChar === 'j') {
            var extraLength = 0;
            while (patternPos + 1 < skeleton.length &&
                skeleton.charAt(patternPos + 1) === patternChar) {
                extraLength++;
                patternPos++;
            }
            var hourLen = 1 + (extraLength & 1);
            var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
            var dayPeriodChar = 'a';
            var hourChar = getDefaultHourSymbolFromLocale(locale);
            if (hourChar == 'H' || hourChar == 'k') {
                dayPeriodLen = 0;
            }
            while (dayPeriodLen-- > 0) {
                skeletonCopy += dayPeriodChar;
            }
            while (hourLen-- > 0) {
                skeletonCopy = hourChar + skeletonCopy;
            }
        }
        else if (patternChar === 'J') {
            skeletonCopy += 'H';
        }
        else {
            skeletonCopy += patternChar;
        }
    }
    return skeletonCopy;
}
/**
 * Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
 * of the given `locale` to the corresponding time pattern.
 * @param locale
 */
function getDefaultHourSymbolFromLocale(locale) {
    var hourCycle = locale.hourCycle;
    if (hourCycle === undefined &&
        // @ts-ignore hourCycle(s) is not identified yet
        locale.hourCycles &&
        // @ts-ignore
        locale.hourCycles.length) {
        // @ts-ignore
        hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
        switch (hourCycle) {
            case 'h24':
                return 'k';
            case 'h23':
                return 'H';
            case 'h12':
                return 'h';
            case 'h11':
                return 'K';
            default:
                throw new Error('Invalid hourCycle');
        }
    }
    // TODO: Once hourCycle is fully supported remove the following with data generation
    var languageTag = locale.language;
    var regionTag;
    if (languageTag !== 'root') {
        regionTag = locale.maximize().region;
    }
    var hourCycles = timeData[regionTag || ''] ||
        timeData[languageTag || ''] ||
        timeData["".concat(languageTag, "-001")] ||
        timeData['001'];
    return hourCycles[0];
}

var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
    return { start: start, end: end };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
var hasNativeStartsWith = !!String.prototype.startsWith;
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger
    ? Number.isSafeInteger
    : function (n) {
        return (typeof n === 'number' &&
            isFinite(n) &&
            Math.floor(n) === n &&
            Math.abs(n) <= 0x1fffffffffffff);
    };
// IE11 does not support y and u.
var REGEX_SUPPORTS_U_AND_Y = true;
try {
    var re = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    /**
     * legacy Edge or Xbox One browser
     * Unicode flag support: supported
     * Pattern_Syntax support: not supported
     * See https://github.com/formatjs/formatjs/issues/2822
     */
    REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec('a')) === null || _a === void 0 ? void 0 : _a[0]) === 'a';
}
catch (_) {
    REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith
    ? // Native
        function startsWith(s, search, position) {
            return s.startsWith(search, position);
        }
    : // For IE11
        function startsWith(s, search, position) {
            return s.slice(position, position + search.length) === search;
        };
var fromCodePoint = hasNativeFromCodePoint
    ? String.fromCodePoint
    : // IE11
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i] = arguments[_i];
            }
            var elements = '';
            var length = codePoints.length;
            var i = 0;
            var code;
            while (length > i) {
                code = codePoints[i++];
                if (code > 0x10ffff)
                    throw RangeError(code + ' is not a valid code point');
                elements +=
                    code < 0x10000
                        ? String.fromCharCode(code)
                        : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, (code % 0x400) + 0xdc00);
            }
            return elements;
        };
var fromEntries = 
// native
hasNativeFromEntries
    ? Object.fromEntries
    : // Ponyfill
        function fromEntries(entries) {
            var obj = {};
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], k = _a[0], v = _a[1];
                obj[k] = v;
            }
            return obj;
        };
var codePointAt = hasNativeCodePointAt
    ? // Native
        function codePointAt(s, index) {
            return s.codePointAt(index);
        }
    : // IE 11
        function codePointAt(s, index) {
            var size = s.length;
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = s.charCodeAt(index);
            var second;
            return first < 0xd800 ||
                first > 0xdbff ||
                index + 1 === size ||
                (second = s.charCodeAt(index + 1)) < 0xdc00 ||
                second > 0xdfff
                ? first
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
var trimStart = hasTrimStart
    ? // Native
        function trimStart(s) {
            return s.trimStart();
        }
    : // Ponyfill
        function trimStart(s) {
            return s.replace(SPACE_SEPARATOR_START_REGEX, '');
        };
var trimEnd = hasTrimEnd
    ? // Native
        function trimEnd(s) {
            return s.trimEnd();
        }
    : // Ponyfill
        function trimEnd(s) {
            return s.replace(SPACE_SEPARATOR_END_REGEX, '');
        };
// Prevent minifier to translate new RegExp to literal form that might cause syntax error on IE11.
function RE(s, flag) {
    return new RegExp(s, flag);
}
// #endregion
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
    // Native
    var IDENTIFIER_PREFIX_RE_1 = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var _a;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a = match[1]) !== null && _a !== void 0 ? _a : '';
    };
}
else {
    // IE11
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var match = [];
        while (true) {
            var c = codePointAt(s, index);
            if (c === undefined || _isWhiteSpace(c) || _isPatternSyntax(c)) {
                break;
            }
            match.push(c);
            index += c >= 0x10000 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
    };
}
var Parser = /** @class */ (function () {
    function Parser(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser.prototype.parse = function () {
        if (this.offset() !== 0) {
            throw Error('parser can only be used once');
        }
        return this.parseMessage(0, '', false);
    };
    Parser.prototype.parseMessage = function (nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
            var char = this.char();
            if (char === 123 /* `{` */) {
                var result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else if (char === 125 /* `}` */ && nestingLevel > 0) {
                break;
            }
            else if (char === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) {
                var position = this.clonePosition();
                this.bump();
                elements.push({
                    type: TYPE.pound,
                    location: createLocation(position, this.clonePosition()),
                });
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                this.peek() === 47 // char code for '/'
            ) {
                if (expectingCloseTag) {
                    break;
                }
                else {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                _isAlpha(this.peek() || 0)) {
                var result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else {
                var result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return { val: elements, err: null };
    };
    /**
     * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
     * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
     * are accepted:
     *
     * ```
     * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
     * tagName ::= [a-z] (PENChar)*
     * PENChar ::=
     *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
     *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
     *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
     * ```
     *
     * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
     * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
     * since other tag-based engines like React allow it
     */
    Parser.prototype.parseTag = function (nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump(); // `<`
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf('/>')) {
            // Self closing tag
            return {
                val: {
                    type: TYPE.literal,
                    value: "<".concat(tagName, "/>"),
                    location: createLocation(startPosition, this.clonePosition()),
                },
                err: null,
            };
        }
        else if (this.bumpIf('>')) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            var children = childrenResult.val;
            // Expecting a close tag
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf('</')) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                var closingTagNameStartPosition = this.clonePosition();
                var closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf('>')) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: TYPE.tag,
                        value: tagName,
                        children: children,
                        location: createLocation(startPosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            else {
                return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        }
        else {
            return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    };
    /**
     * This method assumes that the caller has peeked ahead for the first tag character.
     */
    Parser.prototype.parseTagName = function () {
        var startOffset = this.offset();
        this.bump(); // the first tag name character
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    };
    Parser.prototype.parseLiteral = function (nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = '';
        while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
            val: { type: TYPE.literal, value: value, location: location },
            err: null,
        };
    };
    Parser.prototype.tryParseLeftAngleBracket = function () {
        if (!this.isEOF() &&
            this.char() === 60 /* `<` */ &&
            (this.ignoreTag ||
                // If at the opening tag or closing tag position, bail.
                !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump(); // `<`
            return '<';
        }
        return null;
    };
    /**
     * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
     * a character that requires quoting (that is, "only where needed"), and works the same in
     * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
     */
    Parser.prototype.tryParseQuote = function (parentArgType) {
        if (this.isEOF() || this.char() !== 39 /* `'` */) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch (this.peek()) {
            case 39 /* `'` */:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35: // '#'
                if (parentArgType === 'plural' || parentArgType === 'selectordinal') {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump(); // apostrophe
        var codePoints = [this.char()]; // escaped char
        this.bump();
        // read chars until the optional closing apostrophe is found
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39 /* `'` */) {
                if (this.peek() === 39 /* `'` */) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                }
                else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            }
            else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
    };
    Parser.prototype.tryParseUnquoted = function (nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        var ch = this.char();
        if (ch === 60 /* `<` */ ||
            ch === 123 /* `{` */ ||
            (ch === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) ||
            (ch === 125 /* `}` */ && nestingLevel > 0)) {
            return null;
        }
        else {
            this.bump();
            return fromCodePoint(ch);
        }
    };
    Parser.prototype.parseArgument = function (nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump(); // `{`
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125 /* `}` */) {
            this.bump();
            return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
            // Simple argument: `{name}`
            case 125 /* `}` */: {
                this.bump(); // `}`
                return {
                    val: {
                        type: TYPE.argument,
                        // value does not include the opening and closing braces.
                        value: value,
                        location: createLocation(openingBracePosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            // Argument with options: `{name, format, ...}`
            case 44 /* `,` */: {
                this.bump(); // `,`
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                }
                return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
                return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    };
    /**
     * Advance the parser until the end of the identifier, if it is currently on
     * an identifier character. Return an empty string otherwise.
     */
    Parser.prototype.parseIdentifierIfPossible = function () {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value: value, location: location };
    };
    Parser.prototype.parseArgumentOptions = function (nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a;
        // Parse this range:
        // {name, type, style}
        //        ^---^
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
            case '':
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case 'number':
            case 'date':
            case 'time': {
                // Parse this range:
                // {name, number, style}
                //              ^-------^
                this.bumpSpace();
                var styleAndLocation = null;
                if (this.bumpIf(',')) {
                    this.bumpSpace();
                    var styleStartPosition = this.clonePosition();
                    var result = this.parseSimpleArgStyleIfPossible();
                    if (result.err) {
                        return result;
                    }
                    var style = trimEnd(result.val);
                    if (style.length === 0) {
                        return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                    styleAndLocation = { style: style, styleLocation: styleLocation };
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_1 = createLocation(openingBracePosition, this.clonePosition());
                // Extract style or skeleton
                if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, '::', 0)) {
                    // Skeleton starts with `::`.
                    var skeleton = trimStart(styleAndLocation.style.slice(2));
                    if (argType === 'number') {
                        var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                        if (result.err) {
                            return result;
                        }
                        return {
                            val: { type: TYPE.number, value: value, location: location_1, style: result.val },
                            err: null,
                        };
                    }
                    else {
                        if (skeleton.length === 0) {
                            return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                        }
                        var dateTimePattern = skeleton;
                        // Get "best match" pattern only if locale is passed, if not, let it
                        // pass as-is where `parseDateTimeSkeleton()` will throw an error
                        // for unsupported patterns.
                        if (this.locale) {
                            dateTimePattern = getBestPattern(skeleton, this.locale);
                        }
                        var style = {
                            type: SKELETON_TYPE.dateTime,
                            pattern: dateTimePattern,
                            location: styleAndLocation.styleLocation,
                            parsedOptions: this.shouldParseSkeletons
                                ? parseDateTimeSkeleton(dateTimePattern)
                                : {},
                        };
                        var type = argType === 'date' ? TYPE.date : TYPE.time;
                        return {
                            val: { type: type, value: value, location: location_1, style: style },
                            err: null,
                        };
                    }
                }
                // Regular style or no style.
                return {
                    val: {
                        type: argType === 'number'
                            ? TYPE.number
                            : argType === 'date'
                                ? TYPE.date
                                : TYPE.time,
                        value: value,
                        location: location_1,
                        style: (_a = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a !== void 0 ? _a : null,
                    },
                    err: null,
                };
            }
            case 'plural':
            case 'selectordinal':
            case 'select': {
                // Parse this range:
                // {name, plural, options}
                //              ^---------^
                var typeEndPosition_1 = this.clonePosition();
                this.bumpSpace();
                if (!this.bumpIf(',')) {
                    return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
                }
                this.bumpSpace();
                // Parse offset:
                // {name, plural, offset:1, options}
                //                ^-----^
                //
                // or the first option:
                //
                // {name, plural, one {...} other {...}}
                //                ^--^
                var identifierAndLocation = this.parseIdentifierIfPossible();
                var pluralOffset = 0;
                if (argType !== 'select' && identifierAndLocation.value === 'offset') {
                    if (!this.bumpIf(':')) {
                        return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    this.bumpSpace();
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                    if (result.err) {
                        return result;
                    }
                    // Parse another identifier for option parsing
                    this.bumpSpace();
                    identifierAndLocation = this.parseIdentifierIfPossible();
                    pluralOffset = result.val;
                }
                var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                if (optionsResult.err) {
                    return optionsResult;
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_2 = createLocation(openingBracePosition, this.clonePosition());
                if (argType === 'select') {
                    return {
                        val: {
                            type: TYPE.select,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            location: location_2,
                        },
                        err: null,
                    };
                }
                else {
                    return {
                        val: {
                            type: TYPE.plural,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            offset: pluralOffset,
                            pluralType: argType === 'plural' ? 'cardinal' : 'ordinal',
                            location: location_2,
                        },
                        err: null,
                    };
                }
            }
            default:
                return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    };
    Parser.prototype.tryParseArgumentClose = function (openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125 /* `}` */) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump(); // `}`
        return { val: true, err: null };
    };
    /**
     * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
     */
    Parser.prototype.parseSimpleArgStyleIfPossible = function () {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
                case 39 /* `'` */: {
                    // Treat apostrophe as quoting but include it in the style part.
                    // Find the end of the quoted literal text.
                    this.bump();
                    var apostrophePosition = this.clonePosition();
                    if (!this.bumpUntil("'")) {
                        return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                    }
                    this.bump();
                    break;
                }
                case 123 /* `{` */: {
                    nestedBraces += 1;
                    this.bump();
                    break;
                }
                case 125 /* `}` */: {
                    if (nestedBraces > 0) {
                        nestedBraces -= 1;
                    }
                    else {
                        return {
                            val: this.message.slice(startPosition.offset, this.offset()),
                            err: null,
                        };
                    }
                    break;
                }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null,
        };
    };
    Parser.prototype.parseNumberSkeletonFromString = function (skeleton, location) {
        var tokens = [];
        try {
            tokens = parseNumberSkeletonFromString(skeleton);
        }
        catch (e) {
            return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: SKELETON_TYPE.number,
                tokens: tokens,
                location: location,
                parsedOptions: this.shouldParseSkeletons
                    ? parseNumberSkeleton(tokens)
                    : {},
            },
            err: null,
        };
    };
    /**
     * @param nesting_level The current nesting level of messages.
     *     This can be positive when parsing message fragment in select or plural argument options.
     * @param parent_arg_type The parent argument's type.
     * @param parsed_first_identifier If provided, this is the first identifier-like selector of
     *     the argument. It is a by-product of a previous parsing attempt.
     * @param expecting_close_tag If true, this message is directly or indirectly nested inside
     *     between a pair of opening and closing tags. The nested message will not parse beyond
     *     the closing tag boundary.
     */
    Parser.prototype.tryParsePluralOrSelectOptions = function (nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        // Parse:
        // one {one apple}
        // ^--^
        while (true) {
            if (selector.length === 0) {
                var startPosition = this.clonePosition();
                if (parentArgType !== 'select' && this.bumpIf('=')) {
                    // Try parse `={number}` selector
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                }
                else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                    : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === 'other') {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf('{')) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                    : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition()),
                },
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            (_a = this.parseIdentifierIfPossible(), selector = _a.value, selectorLocation = _a.location);
        }
        if (options.length === 0) {
            return this.error(parentArgType === 'select'
                ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR
                : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
    };
    Parser.prototype.tryParseDecimalInteger = function (expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf('+')) ;
        else if (this.bumpIf('-')) {
            sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 /* `0` */ && ch <= 57 /* `9` */) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            }
            else {
                break;
            }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
    };
    Parser.prototype.offset = function () {
        return this.position.offset;
    };
    Parser.prototype.isEOF = function () {
        return this.offset() === this.message.length;
    };
    Parser.prototype.clonePosition = function () {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column,
        };
    };
    /**
     * Return the code point at the current position of the parser.
     * Throws if the index is out of bound.
     */
    Parser.prototype.char = function () {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error('out of bound');
        }
        var code = codePointAt(this.message, offset);
        if (code === undefined) {
            throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
    };
    Parser.prototype.error = function (kind, location) {
        return {
            val: null,
            err: {
                kind: kind,
                message: this.message,
                location: location,
            },
        };
    };
    /** Bump the parser to the next UTF-16 code unit. */
    Parser.prototype.bump = function () {
        if (this.isEOF()) {
            return;
        }
        var code = this.char();
        if (code === 10 /* '\n' */) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        }
        else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 0x10000 ? 1 : 2;
        }
    };
    /**
     * If the substring starting at the current position of the parser has
     * the given prefix, then bump the parser to the character immediately
     * following the prefix and return true. Otherwise, don't bump the parser
     * and return false.
     */
    Parser.prototype.bumpIf = function (prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
                this.bump();
            }
            return true;
        }
        return false;
    };
    /**
     * Bump the parser until the pattern character is found and return `true`.
     * Otherwise bump to the end of the file and return `false`.
     */
    Parser.prototype.bumpUntil = function (pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        }
        else {
            this.bumpTo(this.message.length);
            return false;
        }
    };
    /**
     * Bump the parser to the target offset.
     * If target offset is beyond the end of the input, bump the parser to the end of the input.
     */
    Parser.prototype.bumpTo = function (targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    };
    /** advance the parser through all whitespace to the next non-whitespace code unit. */
    Parser.prototype.bumpSpace = function () {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
        }
    };
    /**
     * Peek at the *next* Unicode codepoint in the input without advancing the parser.
     * If the input has been exhausted, then this returns null.
     */
    Parser.prototype.peek = function () {
        if (this.isEOF()) {
            return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 0x10000 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser;
}());
/**
 * This check if codepoint is alphabet (lower & uppercase)
 * @param codepoint
 * @returns
 */
function _isAlpha(codepoint) {
    return ((codepoint >= 97 && codepoint <= 122) ||
        (codepoint >= 65 && codepoint <= 90));
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47; /* '/' */
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
    return (c === 45 /* '-' */ ||
        c === 46 /* '.' */ ||
        (c >= 48 && c <= 57) /* 0..9 */ ||
        c === 95 /* '_' */ ||
        (c >= 97 && c <= 122) /** a..z */ ||
        (c >= 65 && c <= 90) /* A..Z */ ||
        c == 0xb7 ||
        (c >= 0xc0 && c <= 0xd6) ||
        (c >= 0xd8 && c <= 0xf6) ||
        (c >= 0xf8 && c <= 0x37d) ||
        (c >= 0x37f && c <= 0x1fff) ||
        (c >= 0x200c && c <= 0x200d) ||
        (c >= 0x203f && c <= 0x2040) ||
        (c >= 0x2070 && c <= 0x218f) ||
        (c >= 0x2c00 && c <= 0x2fef) ||
        (c >= 0x3001 && c <= 0xd7ff) ||
        (c >= 0xf900 && c <= 0xfdcf) ||
        (c >= 0xfdf0 && c <= 0xfffd) ||
        (c >= 0x10000 && c <= 0xeffff));
}
/**
 * Code point equivalent of regex `\p{White_Space}`.
 * From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isWhiteSpace(c) {
    return ((c >= 0x0009 && c <= 0x000d) ||
        c === 0x0020 ||
        c === 0x0085 ||
        (c >= 0x200e && c <= 0x200f) ||
        c === 0x2028 ||
        c === 0x2029);
}
/**
 * Code point equivalent of regex `\p{Pattern_Syntax}`.
 * See https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isPatternSyntax(c) {
    return ((c >= 0x0021 && c <= 0x0023) ||
        c === 0x0024 ||
        (c >= 0x0025 && c <= 0x0027) ||
        c === 0x0028 ||
        c === 0x0029 ||
        c === 0x002a ||
        c === 0x002b ||
        c === 0x002c ||
        c === 0x002d ||
        (c >= 0x002e && c <= 0x002f) ||
        (c >= 0x003a && c <= 0x003b) ||
        (c >= 0x003c && c <= 0x003e) ||
        (c >= 0x003f && c <= 0x0040) ||
        c === 0x005b ||
        c === 0x005c ||
        c === 0x005d ||
        c === 0x005e ||
        c === 0x0060 ||
        c === 0x007b ||
        c === 0x007c ||
        c === 0x007d ||
        c === 0x007e ||
        c === 0x00a1 ||
        (c >= 0x00a2 && c <= 0x00a5) ||
        c === 0x00a6 ||
        c === 0x00a7 ||
        c === 0x00a9 ||
        c === 0x00ab ||
        c === 0x00ac ||
        c === 0x00ae ||
        c === 0x00b0 ||
        c === 0x00b1 ||
        c === 0x00b6 ||
        c === 0x00bb ||
        c === 0x00bf ||
        c === 0x00d7 ||
        c === 0x00f7 ||
        (c >= 0x2010 && c <= 0x2015) ||
        (c >= 0x2016 && c <= 0x2017) ||
        c === 0x2018 ||
        c === 0x2019 ||
        c === 0x201a ||
        (c >= 0x201b && c <= 0x201c) ||
        c === 0x201d ||
        c === 0x201e ||
        c === 0x201f ||
        (c >= 0x2020 && c <= 0x2027) ||
        (c >= 0x2030 && c <= 0x2038) ||
        c === 0x2039 ||
        c === 0x203a ||
        (c >= 0x203b && c <= 0x203e) ||
        (c >= 0x2041 && c <= 0x2043) ||
        c === 0x2044 ||
        c === 0x2045 ||
        c === 0x2046 ||
        (c >= 0x2047 && c <= 0x2051) ||
        c === 0x2052 ||
        c === 0x2053 ||
        (c >= 0x2055 && c <= 0x205e) ||
        (c >= 0x2190 && c <= 0x2194) ||
        (c >= 0x2195 && c <= 0x2199) ||
        (c >= 0x219a && c <= 0x219b) ||
        (c >= 0x219c && c <= 0x219f) ||
        c === 0x21a0 ||
        (c >= 0x21a1 && c <= 0x21a2) ||
        c === 0x21a3 ||
        (c >= 0x21a4 && c <= 0x21a5) ||
        c === 0x21a6 ||
        (c >= 0x21a7 && c <= 0x21ad) ||
        c === 0x21ae ||
        (c >= 0x21af && c <= 0x21cd) ||
        (c >= 0x21ce && c <= 0x21cf) ||
        (c >= 0x21d0 && c <= 0x21d1) ||
        c === 0x21d2 ||
        c === 0x21d3 ||
        c === 0x21d4 ||
        (c >= 0x21d5 && c <= 0x21f3) ||
        (c >= 0x21f4 && c <= 0x22ff) ||
        (c >= 0x2300 && c <= 0x2307) ||
        c === 0x2308 ||
        c === 0x2309 ||
        c === 0x230a ||
        c === 0x230b ||
        (c >= 0x230c && c <= 0x231f) ||
        (c >= 0x2320 && c <= 0x2321) ||
        (c >= 0x2322 && c <= 0x2328) ||
        c === 0x2329 ||
        c === 0x232a ||
        (c >= 0x232b && c <= 0x237b) ||
        c === 0x237c ||
        (c >= 0x237d && c <= 0x239a) ||
        (c >= 0x239b && c <= 0x23b3) ||
        (c >= 0x23b4 && c <= 0x23db) ||
        (c >= 0x23dc && c <= 0x23e1) ||
        (c >= 0x23e2 && c <= 0x2426) ||
        (c >= 0x2427 && c <= 0x243f) ||
        (c >= 0x2440 && c <= 0x244a) ||
        (c >= 0x244b && c <= 0x245f) ||
        (c >= 0x2500 && c <= 0x25b6) ||
        c === 0x25b7 ||
        (c >= 0x25b8 && c <= 0x25c0) ||
        c === 0x25c1 ||
        (c >= 0x25c2 && c <= 0x25f7) ||
        (c >= 0x25f8 && c <= 0x25ff) ||
        (c >= 0x2600 && c <= 0x266e) ||
        c === 0x266f ||
        (c >= 0x2670 && c <= 0x2767) ||
        c === 0x2768 ||
        c === 0x2769 ||
        c === 0x276a ||
        c === 0x276b ||
        c === 0x276c ||
        c === 0x276d ||
        c === 0x276e ||
        c === 0x276f ||
        c === 0x2770 ||
        c === 0x2771 ||
        c === 0x2772 ||
        c === 0x2773 ||
        c === 0x2774 ||
        c === 0x2775 ||
        (c >= 0x2794 && c <= 0x27bf) ||
        (c >= 0x27c0 && c <= 0x27c4) ||
        c === 0x27c5 ||
        c === 0x27c6 ||
        (c >= 0x27c7 && c <= 0x27e5) ||
        c === 0x27e6 ||
        c === 0x27e7 ||
        c === 0x27e8 ||
        c === 0x27e9 ||
        c === 0x27ea ||
        c === 0x27eb ||
        c === 0x27ec ||
        c === 0x27ed ||
        c === 0x27ee ||
        c === 0x27ef ||
        (c >= 0x27f0 && c <= 0x27ff) ||
        (c >= 0x2800 && c <= 0x28ff) ||
        (c >= 0x2900 && c <= 0x2982) ||
        c === 0x2983 ||
        c === 0x2984 ||
        c === 0x2985 ||
        c === 0x2986 ||
        c === 0x2987 ||
        c === 0x2988 ||
        c === 0x2989 ||
        c === 0x298a ||
        c === 0x298b ||
        c === 0x298c ||
        c === 0x298d ||
        c === 0x298e ||
        c === 0x298f ||
        c === 0x2990 ||
        c === 0x2991 ||
        c === 0x2992 ||
        c === 0x2993 ||
        c === 0x2994 ||
        c === 0x2995 ||
        c === 0x2996 ||
        c === 0x2997 ||
        c === 0x2998 ||
        (c >= 0x2999 && c <= 0x29d7) ||
        c === 0x29d8 ||
        c === 0x29d9 ||
        c === 0x29da ||
        c === 0x29db ||
        (c >= 0x29dc && c <= 0x29fb) ||
        c === 0x29fc ||
        c === 0x29fd ||
        (c >= 0x29fe && c <= 0x2aff) ||
        (c >= 0x2b00 && c <= 0x2b2f) ||
        (c >= 0x2b30 && c <= 0x2b44) ||
        (c >= 0x2b45 && c <= 0x2b46) ||
        (c >= 0x2b47 && c <= 0x2b4c) ||
        (c >= 0x2b4d && c <= 0x2b73) ||
        (c >= 0x2b74 && c <= 0x2b75) ||
        (c >= 0x2b76 && c <= 0x2b95) ||
        c === 0x2b96 ||
        (c >= 0x2b97 && c <= 0x2bff) ||
        (c >= 0x2e00 && c <= 0x2e01) ||
        c === 0x2e02 ||
        c === 0x2e03 ||
        c === 0x2e04 ||
        c === 0x2e05 ||
        (c >= 0x2e06 && c <= 0x2e08) ||
        c === 0x2e09 ||
        c === 0x2e0a ||
        c === 0x2e0b ||
        c === 0x2e0c ||
        c === 0x2e0d ||
        (c >= 0x2e0e && c <= 0x2e16) ||
        c === 0x2e17 ||
        (c >= 0x2e18 && c <= 0x2e19) ||
        c === 0x2e1a ||
        c === 0x2e1b ||
        c === 0x2e1c ||
        c === 0x2e1d ||
        (c >= 0x2e1e && c <= 0x2e1f) ||
        c === 0x2e20 ||
        c === 0x2e21 ||
        c === 0x2e22 ||
        c === 0x2e23 ||
        c === 0x2e24 ||
        c === 0x2e25 ||
        c === 0x2e26 ||
        c === 0x2e27 ||
        c === 0x2e28 ||
        c === 0x2e29 ||
        (c >= 0x2e2a && c <= 0x2e2e) ||
        c === 0x2e2f ||
        (c >= 0x2e30 && c <= 0x2e39) ||
        (c >= 0x2e3a && c <= 0x2e3b) ||
        (c >= 0x2e3c && c <= 0x2e3f) ||
        c === 0x2e40 ||
        c === 0x2e41 ||
        c === 0x2e42 ||
        (c >= 0x2e43 && c <= 0x2e4f) ||
        (c >= 0x2e50 && c <= 0x2e51) ||
        c === 0x2e52 ||
        (c >= 0x2e53 && c <= 0x2e7f) ||
        (c >= 0x3001 && c <= 0x3003) ||
        c === 0x3008 ||
        c === 0x3009 ||
        c === 0x300a ||
        c === 0x300b ||
        c === 0x300c ||
        c === 0x300d ||
        c === 0x300e ||
        c === 0x300f ||
        c === 0x3010 ||
        c === 0x3011 ||
        (c >= 0x3012 && c <= 0x3013) ||
        c === 0x3014 ||
        c === 0x3015 ||
        c === 0x3016 ||
        c === 0x3017 ||
        c === 0x3018 ||
        c === 0x3019 ||
        c === 0x301a ||
        c === 0x301b ||
        c === 0x301c ||
        c === 0x301d ||
        (c >= 0x301e && c <= 0x301f) ||
        c === 0x3020 ||
        c === 0x3030 ||
        c === 0xfd3e ||
        c === 0xfd3f ||
        (c >= 0xfe45 && c <= 0xfe46));
}

function pruneLocation(els) {
    els.forEach(function (el) {
        delete el.location;
        if (isSelectElement(el) || isPluralElement(el)) {
            for (var k in el.options) {
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        }
        else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
            delete el.style.location;
        }
        else if ((isDateElement(el) || isTimeElement(el)) &&
            isDateTimeSkeleton(el.style)) {
            delete el.style.location;
        }
        else if (isTagElement(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts) {
    if (opts === void 0) { opts = {}; }
    opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new Parser(message, opts).parse();
    if (result.err) {
        var error = SyntaxError(ErrorKind[result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
    }
    return result.val;
}

//
// Main
//
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return (value == null || typeof value === 'number' || typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
var serializerDefault = function () {
    return JSON.stringify(arguments);
};
//
// Cache
//
function ObjectWithoutPrototypeCache() {
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        // @ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    };
    return FormatError;
}(Error));
var InvalidValueError = /** @class */ (function (_super) {
    __extends(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"".concat(variableId, "\": \"").concat(value, "\". Options are \"").concat(Object.keys(options).join('", "'), "\""), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));
var InvalidValueTypeError = /** @class */ (function (_super) {
    __extends(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"".concat(value, "\" must be of type ").concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));
var MissingValueError = /** @class */ (function (_super) {
    __extends(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"".concat(variableId, "\" was not provided to the string \"").concat(originalMessage, "\""), ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));

var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== PART_TYPE.literal ||
            part.type !== PART_TYPE.literal) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (isLiteralElement(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if (isPoundElement(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if (isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTimeElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : formats.time.medium;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isNumberElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : isNumberSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            if (style && style.scale) {
                value =
                    value *
                        (style.scale || 1);
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTagElement(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new InvalidValueTypeError(value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                    value: c,
                };
            }));
        }
        if (isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (isPluralElement(el)) {
            var opt = el.options["=".concat(value)];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", ErrorCode.MISSING_INTL_API, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign(__assign(__assign({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign(__assign({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign({}, defaultConfig));
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.number),
            strategy: strategies.variadic,
        }),
        getDateTimeFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: strategies.variadic,
        }),
        getPluralRules: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: strategies.variadic,
        }),
    };
}
var IntlMessageFormat$1 = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        var _this = this;
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== PART_TYPE.literal ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () {
            var _a;
            return ({
                locale: ((_a = _this.resolvedLocale) === null || _a === void 0 ? void 0 : _a.toString()) ||
                    Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
            });
        };
        this.getAst = function () { return _this.ast; };
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
                locale: this.resolvedLocale,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale =
                    new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.resolveLocale = function (locales) {
        if (typeof Intl.Locale === 'undefined') {
            return;
        }
        var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === 'string' ? locales : locales[0]);
    };
    IntlMessageFormat.__parse = parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            integer: {
                maximumFractionDigits: 0,
            },
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var IntlMessageFormat = IntlMessageFormat$1;

var defaultLocale = "en";
var locales = [defaultLocale];
if (globalThis.navigator) {
    if (navigator.languages && navigator.languages.length > 0) {
        locales = __spreadArray([], navigator.languages, true);
    }
    else {
        locales = [navigator.language || navigator.userLanguage || defaultLocale];
    }
}
function parseLocale(s) {
    var locale = s.trim();
    if (!locale) {
        return;
    }
    try {
        if (Intl.Locale) {
            var _a = new Intl.Locale(locale), language = _a.language, region = _a.region;
            return { locale: locale, language: language, region: region };
        }
        var parts = locale.split("-");
        var r = parts.slice(1, 3).find(function (t) { return t.length === 2; });
        return { locale: locale, language: parts[0].toLowerCase(), region: r === null || r === void 0 ? void 0 : r.toUpperCase() };
    }
    catch (e) {
        log.error("Parse locale:".concat(locale, " failed."), e);
    }
}
function parseLocales(list) {
    return list.map(parseLocale).filter(function (t) { return t; });
}
var fallbackLocaleInfos = parseLocales(locales.includes(defaultLocale) ? locales : __spreadArray(__spreadArray([], locales, true), [defaultLocale], false));
var i18n = __assign({ locales: locales }, fallbackLocaleInfos[0]);
function getValueByLocale(defaultValue, func) {
    for (var _i = 0, fallbackLocaleInfos_1 = fallbackLocaleInfos; _i < fallbackLocaleInfos_1.length; _i++) {
        var info = fallbackLocaleInfos_1[_i];
        var t = func(info);
        if (t !== undefined) {
            return t;
        }
    }
    return defaultValue;
}
function getDataByLocale(fileData, suffix, filterLocales, targetLocales) {
    var localeInfos = __spreadArray([], fallbackLocaleInfos, true);
    var targetLocaleInfo = parseLocales(targetLocales || []);
    if (targetLocaleInfo.length > 0) {
        localeInfos = __spreadArray(__spreadArray([], targetLocaleInfo, true), localeInfos, true);
    }
    var filterNames = parseLocales((filterLocales !== null && filterLocales !== void 0 ? filterLocales : "").split(","))
        .map(function (l) { var _a; return l.language + ((_a = l.region) !== null && _a !== void 0 ? _a : ""); })
        .filter(function (s) { return fileData[s + suffix] !== undefined; });
    var names = __spreadArray(__spreadArray([], localeInfos
        .flatMap(function (_a) {
        var language = _a.language, region = _a.region;
        return [
            region ? language + region : undefined,
            language,
            filterNames.find(function (n) { return n.startsWith(language); }),
        ];
    })
        .filter(function (s) { return s && (!filterLocales || filterNames.includes(s)); }), true), filterNames, true).map(function (s) { return s + suffix; });
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        var data = fileData[name_1];
        if (data !== undefined) {
            return { data: data, language: name_1.slice(0, 2) };
        }
    }
    throw new Error("Not found ".concat(names));
}
var globalMessageKeyPrefix = "@";
var globalMessages = Object.fromEntries(Object.entries(getDataByLocale(localeData, "").data).map(function (_a) {
    var k = _a[0], v = _a[1];
    return [
        globalMessageKeyPrefix + k,
        v,
    ];
}));
var Translator = /** @class */ (function () {
    function Translator(fileData, filterLocales, locales) {
        var _a = getDataByLocale(fileData, "", filterLocales, locales), data = _a.data, language = _a.language;
        this.messages = Object.assign({}, data, globalMessages);
        this.language = language;
        this.trans = this.trans.bind(this);
        this.transToNode = this.transToNode.bind(this);
    }
    Translator.prototype.trans = function (key, variables) {
        return this.transToNode(key, variables).toString();
    };
    Translator.prototype.transToNode = function (key, variables) {
        var message = this.getMessage(key);
        var node = new IntlMessageFormat(message, i18n.locale).format(variables);
        if (Array.isArray(node)) {
            return node.map(function (n, i) { return jsxRuntime.exports.jsx(react.exports.Fragment, { children: n }, i); });
        }
        return node;
    };
    Translator.prototype.getMessage = function (key) {
        var value = this.messages[key];
        if (value !== undefined) {
            return value;
        }
        var obj = this.messages;
        for (var _i = 0, _a = key.split("."); _i < _a.length; _i++) {
            var k = _a[_i];
            if (obj !== undefined) {
                obj = obj[k];
            }
        }
        return obj;
    };
    return Translator;
}());
function getI18nObjects(fileData, filterLocales) {
    return getDataByLocale(fileData, "Obj", filterLocales).data;
}

exports.AbstractComp = AbstractComp;
exports.AbstractNode = AbstractNode;
exports.CachedNode = CachedNode;
exports.CodeNode = CodeNode;
exports.FetchCheckNode = FetchCheckNode;
exports.FunctionNode = FunctionNode;
exports.MultiBaseComp = MultiBaseComp;
exports.RecordNode = RecordNode;
exports.RelaxedJsonParser = RelaxedJsonParser;
exports.SimpleAbstractComp = SimpleAbstractComp;
exports.SimpleComp = SimpleComp;
exports.SimpleNode = SimpleNode;
exports.Translator = Translator;
exports.ValueAndMsg = ValueAndMsg;
exports.WrapContextNodeV2 = WrapContextNodeV2;
exports.WrapNode = WrapNode;
exports.changeChildAction = changeChildAction;
exports.changeDependName = changeDependName;
exports.changeEditDSLAction = changeEditDSLAction;
exports.changeValueAction = changeValueAction;
exports.clearMockWindow = clearMockWindow;
exports.clearStyleEval = clearStyleEval;
exports.customAction = customAction;
exports.deferAction = deferAction;
exports.deleteCompAction = deleteCompAction;
exports.dependingNodeMapEquals = dependingNodeMapEquals;
exports.evalFunc = evalFunc;
exports.evalFunctionResult = evalFunctionResult;
exports.evalNodeOrMinor = evalNodeOrMinor;
exports.evalPerfUtil = evalPerfUtil;
exports.evalScript = evalScript;
exports.evalStyle = evalStyle;
exports.executeQueryAction = executeQueryAction;
exports.fromRecord = fromRecord;
exports.fromUnevaledValue = fromUnevaledValue;
exports.fromValue = fromValue;
exports.fromValueWithCache = fromValueWithCache;
exports.getDynamicStringSegments = getDynamicStringSegments;
exports.getI18nObjects = getI18nObjects;
exports.getValueByLocale = getValueByLocale;
exports.i18n = i18n;
exports.isBroadcastAction = isBroadcastAction;
exports.isChildAction = isChildAction;
exports.isCustomAction = isCustomAction;
exports.isDynamicSegment = isDynamicSegment;
exports.isFetching = isFetching;
exports.isMyCustomAction = isMyCustomAction;
exports.mergeExtra = mergeExtra;
exports.multiChangeAction = multiChangeAction;
exports.nodeIsRecord = nodeIsRecord;
exports.onlyEvalAction = onlyEvalAction;
exports.relaxedJSONToJSON = relaxedJSONToJSON;
exports.renameAction = renameAction;
exports.replaceCompAction = replaceCompAction;
exports.routeByNameAction = routeByNameAction;
exports.transformWrapper = transformWrapper;
exports.triggerModuleEventAction = triggerModuleEventAction;
exports.unwrapChildAction = unwrapChildAction;
exports.updateActionContextAction = updateActionContextAction;
exports.updateNodesV2Action = updateNodesV2Action;
exports.withFunction = withFunction;
exports.wrapActionExtraInfo = wrapActionExtraInfo;
exports.wrapChildAction = wrapChildAction;
exports.wrapContext = wrapContext;
exports.wrapDispatch = wrapDispatch;
