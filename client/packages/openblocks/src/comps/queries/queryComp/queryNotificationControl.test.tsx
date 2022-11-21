import { message } from "antd";
import { QueryNotificationControl } from "./queryNotificationControl";
import { trans } from "../../../i18n";
import { evalAndReduce } from "comps/utils";

const param = {
  value: {
    showSuccess: true,
    success: {
      text: "success",
    },
    showFail: true,
    fail: [
      {
        text: "{{ data + 1 }}",
        condition: "{{ data + 1 === 2 }}",
      },
      {
        text: "{{ data }}",
        condition: "{{ data === 3 }}",
      },
    ],
    duration: "",
  },
};

beforeAll(() => {
  jest.spyOn(message, "error");
  jest.spyOn(message, "success");
});

test("test custom fail", () => {
  let notification = new QueryNotificationControl(param);
  notification = evalAndReduce(notification);
  notification.getView()("", "automatic", { data: 1, success: false } as any);
  expect(message.error).toHaveBeenCalledWith("2", 3);
});

test("test system fail", () => {
  let notification = new QueryNotificationControl(param);
  notification = evalAndReduce(notification);
  notification.getView()("", "automatic", { data: 4, success: false } as any);
  expect(message.error).toHaveBeenCalledWith(
    trans("query.failMessageWithName", {
      name: "",
      result: "{}",
    }),
    3
  );
});

test("test custom success", () => {
  let notification = new QueryNotificationControl(param);
  notification = evalAndReduce(notification);

  notification.getView()("", "automatic", { data: 4, success: true } as any);
  expect(message.success).toHaveBeenCalledTimes(0);

  notification.getView()("", "manual", { data: 4, success: false } as any);
  expect(message.success).toHaveBeenCalledTimes(0);

  notification.getView()("", "manual", { data: 1, success: true } as any);
  expect(message.success).toHaveBeenCalledTimes(0);
  expect(message.error).toHaveBeenCalled();

  notification.getView()("", "manual", { data: 4, success: true } as any);
  expect(message.success).toHaveBeenCalledWith("success", 3);
});

test("test system success", () => {
  let notification = new QueryNotificationControl({
    value: {
      showSuccess: true,
      success: {
        text: "",
      },
      showFail: true,
      fail: [
        {
          text: "{{ data }}",
          condition: "{{ data === 2 }}",
        },
        {
          text: "{{ data }}",
          condition: "{{ data === 3 }}",
        },
      ],
      duration: "",
    },
  });
  notification = evalAndReduce(notification);
  notification.getView()("", "manual", { data: 4, success: true } as any);
  expect(message.success).toHaveBeenCalledWith(
    trans("query.successMessageWithName", { name: "" }),
    3
  );
});

test("test duration", () => {
  let notification = new QueryNotificationControl({ value: { ...param.value, duration: "3s" } });
  notification = evalAndReduce(notification);
  notification.getView()("", "automatic", { data: 1, success: false } as any);
  expect(message.error).toHaveBeenNthCalledWith(1, "2", 3);

  notification = new QueryNotificationControl({ value: { ...param.value, duration: "1000ms" } });
  notification = evalAndReduce(notification);
  notification.getView()("", "automatic", { data: 1, success: false } as any);
  expect(message.error).toHaveBeenNthCalledWith(2, "2", 1);

  notification = new QueryNotificationControl({
    value: { ...param.value, duration: "{{2*2}}" },
  });
  notification = evalAndReduce(notification);
  notification.getView()("", "automatic", { data: 1, success: false } as any);
  expect(message.error).toHaveBeenNthCalledWith(3, "2", 4);
});
