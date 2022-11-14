import { fromUnevaledValue } from "./codeNode";
import { FetchCheckNode } from "./fetchCheckNode";
import { fromRecord } from "./recordNode";
import { fromValue } from "./simpleNode";

it("simple test", () => {
  const x = fromRecord({
    x1: new FetchCheckNode(fromUnevaledValue("{{hasFetching.x}}")),
    x2: new FetchCheckNode(fromUnevaledValue("{{noFetching}}")),
    x3: new FetchCheckNode(fromUnevaledValue("{{nestedFetching}}")),
    x4: new FetchCheckNode(fromUnevaledValue("{{notReady}}")),
  });
  const exposingNodes = {
    hasFetching: fromRecord({
      isFetching: fromValue(true),
      x: fromValue(1),
    }),
    noFetching: fromRecord({}),
    nestedFetching: fromUnevaledValue("{{hasFetching}}"),
    notReady: fromRecord({
      latestEndTime: fromValue(0),
    }),
  };
  const value = x.evaluate(exposingNodes);
  expect(value.x1).toEqual({ isFetching: true, ready: true });
  expect(value.x2).toEqual({ isFetching: false, ready: true });
  expect(value.x3).toEqual({ isFetching: true, ready: true });
  expect(value.x4).toEqual({ isFetching: false, ready: false });
});
