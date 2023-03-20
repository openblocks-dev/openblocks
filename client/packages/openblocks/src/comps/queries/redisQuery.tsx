import { withTypeAndChildrenAbstract } from "comps/generators/withType";
import { trans } from "i18n";
import { includes } from "lodash";
import { CompAction, CompConstructor } from "openblocks-core";
import {
  Dropdown,
  QueryConfigWrapper,
  QueryTutorialButton,
  ValueFromOption,
} from "openblocks-design";
import { QueryTutorials } from "util/tutorialUtils";
import {
  ParamsNumberControl,
  ParamsPositiveNumberControl,
  ParamsStringControl,
} from "../controls/paramsControl";
import { withPropertyViewFn } from "../generators";
import { QueryConfigLabelMethod } from "./query";
import { buildQueryCommand, FunctionProperty, toQueryView } from "./queryCompUtils";

const RedisCommands = [
  "GET",
  "SET",
  "DEL",
  "KEYS",
  "MGET",
  "HGET",
  "HMGET",
  "HGETALL",
  "HSET",
  "HSETNX",
  "HLEN",
  "HDEL",
  "HKEYS",
  "HVALS",
  "LINDEX",
  "LLEN",
  "LPUSH",
  "LREM",
  "RPOPLPUSH",
  "LRANGE",
  "SADD",
  "SCARD",
  "SMEMBERS",
  "SISMEMBER",
  "SRANDMEMBER",
  "SREM",
  "ZADD",
  "ZCARD",
  "ZCOUNT",
  "ZRANGE",
  "ZRANGEBYSCORE",
  "ZRANK",
  "ZREM",
  "ZSCORE",
] as const;
const CommandOptions = [
  { label: trans("redisQuery.rawCommand"), value: "RAW" },
  ...RedisCommands.map((item) => ({ label: item, value: item })),
] as const;

const KeyInput = {
  key: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: "Key",
      placement: "bottom",
      placeholder: `my_key`,
    })
  ),
};
const ValueInput = {
  value: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: "Value",
      placement: "bottom",
      placeholder: `my_value`,
    })
  ),
};
const FieldInput = {
  field: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: "Field",
      placement: "bottom",
      placeholder: `my_field`,
    })
  ),
};
const MemberInput = {
  member: withPropertyViewFn(ParamsStringControl, (comp) =>
    comp.propertyView({
      label: "Member",
      placement: "bottom",
      placeholder: `my_member`,
    })
  ),
};

const CountInput = {
  count: withPropertyViewFn(ParamsPositiveNumberControl, (comp) =>
    comp.propertyView({
      label: "Count",
      placement: "bottom",
      placeholder: `10`,
    })
  ),
};
const StartStopInput = {
  start: withPropertyViewFn(ParamsNumberControl, (comp) =>
    comp.propertyView({
      label: "Start",
      placement: "bottom",
      placeholder: `0`,
    })
  ),
  stop: withPropertyViewFn(ParamsNumberControl, (comp) =>
    comp.propertyView({
      label: "Stop",
      placement: "bottom",
      placeholder: `10`,
    })
  ),
};
const MinMaxInput = {
  min: withPropertyViewFn(ParamsNumberControl, (comp) =>
    comp.propertyView({
      label: "Min",
      placement: "bottom",
      placeholder: `0`,
    })
  ),
  max: withPropertyViewFn(ParamsNumberControl, (comp) =>
    comp.propertyView({
      label: "Max",
      placement: "bottom",
      placeholder: `10`,
    })
  ),
};

const CommandMap: Record<
  ValueFromOption<typeof CommandOptions>,
  CompConstructor<FunctionProperty[]>
> = {
  RAW: buildQueryCommand({
    command: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        label: trans("redisQuery.command"),
        placement: "bottom",
        placeholder: `INCR counter`,
        styleName: "medium",
      })
    ),
  }),
  GET: buildQueryCommand({ ...KeyInput }),
  SET: buildQueryCommand({ ...KeyInput, ...ValueInput }),
  DEL: buildQueryCommand({ ...KeyInput }),
  KEYS: buildQueryCommand({
    pattern: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        label: "Pattern",
        placement: "bottom",
        placeholder: `blocks*`,
      })
    ),
  }),
  MGET: buildQueryCommand({
    keys: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        label: "Keys",
        placement: "bottom",
        placeholder: `my_key1 my_key2`,
      })
    ),
  }),
  HGET: buildQueryCommand({ ...KeyInput, ...FieldInput }),
  HMGET: buildQueryCommand({
    ...KeyInput,
    fields: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        width: "100%",
        label: "Fields",
        placement: "bottom",
        placeholder: `my_field1 my_field2`,
      })
    ),
  }),
  HGETALL: buildQueryCommand({ ...KeyInput }),
  HSET: buildQueryCommand({ ...KeyInput, ...FieldInput, ...ValueInput }),
  HSETNX: buildQueryCommand({ ...KeyInput, ...FieldInput, ...ValueInput }),
  HLEN: buildQueryCommand({ ...KeyInput }),
  HDEL: buildQueryCommand({ ...KeyInput, ...FieldInput }),
  HKEYS: buildQueryCommand({ ...KeyInput }),
  HVALS: buildQueryCommand({ ...KeyInput }),
  LINDEX: buildQueryCommand({
    ...KeyInput,
    index: withPropertyViewFn(ParamsNumberControl, (comp) =>
      comp.propertyView({
        label: "Index",
        placement: "bottom",
        placeholder: `3`,
      })
    ),
  }),
  LLEN: buildQueryCommand({ ...KeyInput }),
  LPUSH: buildQueryCommand({ ...KeyInput, ...ValueInput }),
  LREM: buildQueryCommand({ ...KeyInput, ...CountInput, ...ValueInput }),
  RPOPLPUSH: buildQueryCommand({
    source: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        label: "Source",
        placement: "bottom",
        placeholder: `source_list`,
      })
    ),
    destination: withPropertyViewFn(ParamsStringControl, (comp) =>
      comp.propertyView({
        label: "Destination",
        placement: "bottom",
        placeholder: `destination_list`,
      })
    ),
  }),
  LRANGE: buildQueryCommand({ ...KeyInput, ...StartStopInput }),
  SADD: buildQueryCommand({ ...KeyInput, ...MemberInput }),
  SCARD: buildQueryCommand({ ...KeyInput }),
  SMEMBERS: buildQueryCommand({ ...KeyInput }),
  SISMEMBER: buildQueryCommand({ ...KeyInput, ...MemberInput }),
  SRANDMEMBER: buildQueryCommand({ ...KeyInput, ...CountInput }),
  SREM: buildQueryCommand({ ...KeyInput, ...MemberInput }),
  ZADD: buildQueryCommand({
    ...KeyInput,
    score: withPropertyViewFn(ParamsNumberControl, (comp) =>
      comp.propertyView({
        label: "Score",
        placement: "bottom",
        placeholder: `10`,
      })
    ),
    ...MemberInput,
  }),
  ZCARD: buildQueryCommand({ ...KeyInput }),
  ZCOUNT: buildQueryCommand({ ...KeyInput, ...MinMaxInput }),
  ZRANGE: buildQueryCommand({ ...KeyInput, ...StartStopInput }),
  ZRANGEBYSCORE: buildQueryCommand({ ...KeyInput, ...MinMaxInput }),
  ZRANK: buildQueryCommand({ ...KeyInput, ...MemberInput }),
  ZREM: buildQueryCommand({ ...KeyInput, ...MemberInput }),
  ZSCORE: buildQueryCommand({ ...KeyInput, ...MemberInput }),
};

const RedisTmpQuery = withTypeAndChildrenAbstract(CommandMap, "RAW", {});

export class RedisQuery extends RedisTmpQuery {
  isWrite(action: CompAction) {
    return (
      "value" in action &&
      includes(
        [
          "SET",
          "DEL",
          "HSET",
          "HSETNX",
          "HDEL",
          "LPUSH",
          "LREM",
          "RPOPLPUSH",
          "SADD",
          "SREM",
          "ZADD",
          "ZREM",
        ],
        action.value["compType"]
      )
    );
  }

  override getView() {
    const params = this.children.comp.getView();
    return toQueryView(params);
  }

  override getPropertyView() {
    return (
      <>
        <QueryConfigWrapper>
          <QueryConfigLabelMethod />
          <div style={{ width: "184px", flexGrow: 1 }}>
            <Dropdown
              showSearch={true}
              options={CommandOptions}
              value={this.children.compType.getView()}
              onChange={(value) =>
                this.dispatch(this.changeValueAction({ compType: value, comp: {} } as any))
              }
            />
          </div>
          <QueryTutorialButton
            label={trans("redisQuery.queryTutorial")}
            url={QueryTutorials.redis}
            styleName={"dropdownRight"}
          />
        </QueryConfigWrapper>

        {this.children.comp.getPropertyView()}
      </>
    );
  }
}
