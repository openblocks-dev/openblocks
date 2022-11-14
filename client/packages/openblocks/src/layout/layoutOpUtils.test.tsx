import { changeItemOp } from "./layoutOp";
import { getUILayout } from "./layoutOpUtils";
import { ExtraLayout, Layout } from "./utils";

describe("layoutOpUtils", () => {
  it("getUILayout with stickyItem", () => {
    const layout: Layout = {
      1: { i: "1", w: 11, h: 32, x: 3, y: 65 },
      2: { i: "2", w: 3, h: 5, x: 3, y: 97 },
    };
    const extraLayout: ExtraLayout = {};
    const changedHs = { 1: 24 };
    const ops = [changeItemOp("3", { i: "3", w: 3, h: 5, x: 13, y: 63, isDragging: true })];

    const testLayout = getUILayout(layout, extraLayout, changedHs, ops);
    const expectedLayout = {
      1: { i: "1", w: 11, h: 24, x: 3, y: 68 },
      2: { i: "2", w: 3, h: 5, x: 3, y: 92 },
      3: { i: "3", w: 3, h: 5, x: 13, y: 63 },
    };
    expect(testLayout).toEqual(expectedLayout);
  });
});
