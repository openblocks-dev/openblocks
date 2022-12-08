import { QueryComp } from "./queryComp";
import { CompParams } from "openblocks-core";

// shallow copy all values and methods
test("object create", () => {
  new QueryComp({ value: { compType: "js" } });
});

test("onSuccess/onFail => onEvent", () => {
  let comp = new QueryComp({
    value: {
      compType: "js",
      onSuccess: [
        {
          name: "after",
          handler: {
            compType: "empty",
            comp: {},
            condition: "",
            slowdown: "debounce",
            delay: "",
          },
        },
      ],
      onFail: [
        {
          name: "after",
          handler: {
            compType: "empty",
            comp: {},
            condition: "",
            slowdown: "debounce",
            delay: "",
          },
        },
      ],
    },
  } as CompParams<any>);

  expect(comp.children.onEvent.toJsonValue().length).toEqual(2);
  expect(comp.children.onEvent.toJsonValue()[0].name).toEqual("success");
  expect(comp.children.onEvent.toJsonValue()[1].name).toEqual("fail");
  expect((comp.children.onEvent.toJsonValue() as any)["onSuccess"]).toEqual(undefined);
  expect((comp.children.onEvent.toJsonValue() as any)["onFail"]).toEqual(undefined);
});

test("add notification for old query", () => {
  let comp = new QueryComp({ value: { compType: "js" } });

  expect(comp.children.notification.toJsonValue().showSuccess).toEqual(true);
  expect(comp.children.notification.toJsonValue().showFail).toEqual(true);

  comp = new QueryComp({ value: { compType: "js", onEvent: [] } });

  expect(comp.children.notification.toJsonValue().showSuccess).toEqual(false);
  expect(comp.children.notification.toJsonValue().showFail).toEqual(false);

  comp = new QueryComp({
    value: {
      compType: "js",
      notification: {
        showSuccess: true,
        success: {
          text: "",
        },
        showFail: true,
        fail: [
          {
            text: "",
            condition: "",
          },
        ],
        duration: "",
      },
    },
  });
  expect(comp.children.notification.toJsonValue().showSuccess).toEqual(true);
  expect(comp.children.notification.toJsonValue().showFail).toEqual(true);
});
