import _ from "lodash";
import { checkCursorInBinding } from "../codeEditorUtils";
import { completeFromList, CompletionContext, CompletionResult, ifNotIn } from "../codeMirror";
import { CompletionSource } from "./completion";

const enum Token {
  TYPE = 1,
  KEYWORD = 2,
}
const SQL_TYPES = "";
//  "array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ";
const SQL_KEYWORDS =
  "add after all alter and any as asc before begin between by case cast column count create cross current_timestamp cursor declare default delete desc describe distinct drop else end except exists fetch first from full function group having if in inner insert intersect into is join key last lateral left like limit natural next not on option or order outer prepare primary right select set similar some table then to union unique update using when where with without ";
//  "absolute action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded case cast catalog check close collate collation column commit condition connect connection constraint constraints constructor continue corresponding count create cross cube current current_date current_default_transform_group current_transform_group_for_type current_path current_role current_time current_timestamp current_user cursor cycle data day deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exists exit external fetch first for foreign found from free full function general get global go goto grant group grouping handle having hold hour identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local localtime localtimestamp locator loop map match method minute modifies module month names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search second section select session session_user set sets signal similar size some space specific specifictype sql sqlexception sqlstate sqlwarning start state static system_user table temporary then timezone_hour timezone_minute to trailing transaction translation treat trigger under undo union unique unnest until update usage user using value values view when whenever where while with without work write year zone ";
const SQL_KEY_WORD_MAP = _.fromPairs([
  ...SQL_TYPES.split(" ").map((word) => [word, Token.TYPE]),
  ...SQL_KEYWORDS.split(" ").map((word) => [word, Token.KEYWORD]),
]);

const PRIORITY_WORDS = new Set([
  "select",
  "distinct",
  "from",
  "where",
  "and",
  "or",
  "not",
  "in",
  "between",
  "like",
  "group",
  "grouping",
  "order",
  "by",
  "limit",
  "asc",
  "desc",
  "as",
  "join",
  "inner",
  "outer",
  "intersect",
  "union",
  "using",
  "count",
  "exists",
  "having",
]);

function completeKeywords(
  keywords: { [name: string]: number },
  upperCase?: boolean,
  metaData?: Record<string, string>
) {
  let completions = Object.keys(keywords).map((keyword) => ({
    label: upperCase ? keyword.toUpperCase() : keyword,
    detail:
      keywords[keyword] === Token.TYPE
        ? "type"
        : keywords[keyword] === Token.KEYWORD
        ? "keyword"
        : "variable",
    boost: PRIORITY_WORDS.has(keyword) ? 2 : -1,
  }));
  if (metaData) {
    completions = completions.concat(
      Object.keys(metaData)?.map((name) => ({
        label: name,
        detail: metaData[name],
        boost: -1,
      }))
    );
  }
  return ifNotIn(
    ["QuotedIdentifier", "SpecialVar", "String", "LineComment", "BlockComment", "."],
    completeFromList(completions)
  );
}

export class SQLCompletionSource extends CompletionSource {
  metaData?: Record<string, string>;
  completionSource(
    context: CompletionContext
  ): CompletionResult | Promise<CompletionResult | null> | null {
    return sqlCompletionSource(context, this.metaData, this.isFunction);
  }
}

function sqlCompletionSource(
  context: CompletionContext,
  metaData?: Record<string, string>,
  isFunction?: boolean
): CompletionResult | Promise<CompletionResult | null> | null {
  if (checkCursorInBinding(context, isFunction)) {
    return null;
  }
  const word = context.matchBefore(/[\w.]*/);
  if (!word || word.text.length === 0) {
    return null;
  }
  const completionSource = completeKeywords(SQL_KEY_WORD_MAP, true, metaData);
  return completionSource(context);
}
