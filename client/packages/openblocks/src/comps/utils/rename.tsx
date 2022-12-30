import { trans } from "i18n";

const JAVA_SCRIPT_KEYWORDS = new Set([
  "abstract",
  "arguments",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
  "Array",
  "Date",
  "eval",
  "function",
  "hasOwnProperty",
  "Infinity",
  "isFinite",
  "isNaN",
  "isPrototypeOf",
  "length",
  "Math",
  "NaN",
  "name",
  "Number",
  "Object",
  "prototype",
  "String",
  "toString",
  "undefined",
  "valueOf",
  "global",
]);

export function checkName(name: string): string {
  if (!name) {
    return trans("comp.nameNotEmpty");
  }
  if (!/^[a-zA-Z][a-zA-Z_0-9]*$/.test(name)) {
    return trans("comp.nameRegex");
  }
  if (JAVA_SCRIPT_KEYWORDS.has(name)) {
    return trans("comp.nameJSKeyword");
  }
  if (name in window) {
    return trans("comp.nameGlobalVariable");
  }
  return "";
}
