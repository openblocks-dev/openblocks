import { CompAction, changeValueAction, CompActionTypes } from "openblocks-core";
import _ from "lodash";
import { actionHandlerGenerator, nestDispatchHandlerGenerator } from "./useCompInstance";

it("test action handler", (done) => {
  const [actionHandler] = actionHandlerGenerator();
  let cnt = 0;
  const dumAction = changeValueAction(0, true);
  const addOne = {
    action: dumAction,
    reduceFn: () => {
      cnt += 1;
    },
  };

  const addOneDefer = {
    ...addOne,
    action: {
      ...dumAction,
      priority: "defer",
    } as const,
  };

  const clear = {
    ...addOne,
    action: undefined,
  };

  // execute the normal action immediately
  _.range(3).forEach(() => {
    actionHandler(addOne);
  });
  expect(cnt).toBe(3);

  // defer action not executed
  _.range(3).forEach(() => {
    actionHandler(addOneDefer);
  });

  expect(cnt).toBe(3);

  // Clear low priority queue after high priority action
  actionHandler(addOne);

  expect(cnt).toBe(7);

  // last defer action is not executed
  let size = 0;
  _.range(3).forEach(() => {
    size = actionHandler(addOneDefer);
  });

  expect(size).toBe(3);
  expect(cnt).toBe(7);

  setTimeout(() => {
    size = actionHandler(clear);
    expect(cnt).toBe(11);
    expect(size).toBe(0);
    done();
  });

  actionHandler(addOneDefer);
});

test("nestDispatchHandler", () => {
  const handler = nestDispatchHandlerGenerator();
  const result: string[] = [];
  const dispatch = (action: CompAction) => {
    handler(action, (a) => {
      if (a.type !== CompActionTypes.CHANGE_VALUE) {
        return;
      }
      result.push("start" + a.value);
      if (a.value === 1) {
        dispatch(changeValueAction(2, true));
        dispatch(changeValueAction(4, true));
      }
      if (a.value === 2) {
        dispatch(changeValueAction(3, true));
      }
      if (a.value === 4) {
        dispatch(changeValueAction(5, true));
      }
      if (a.value === 6) {
        dispatch(changeValueAction(7, true));
      }
      result.push("end" + a.value);
    });
  };
  dispatch(changeValueAction(1, true));
  dispatch(changeValueAction(6, true));
  expect(result).toStrictEqual([
    "start1",
    "end1",
    "start2",
    "end2",
    "start3",
    "end3",
    "start4",
    "end4",
    "start5",
    "end5",
    "start6",
    "end6",
    "start7",
    "end7",
  ]);
});
