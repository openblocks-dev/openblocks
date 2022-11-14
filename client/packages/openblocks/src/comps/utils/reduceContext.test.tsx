import { getApplicationIdInReducer, reduceInContext } from "./reduceContext";

test("test reduce in context", () => {
  let changed = false;
  reduceInContext({ applicationId: "test1" }, () => {
    changed = true;
    expect(getApplicationIdInReducer()).toBe("test1");
  });
  // make sure expect is executed
  expect(changed).toBeTruthy();
});
