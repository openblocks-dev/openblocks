import { cascade, Layout } from "./utils";
import "./utils.ts";

describe("cascade", () => {
  it("table over multiple comps", () => {
    const layout: Layout = {
      1: { w: 14, h: 43, x: 3, y: 0, i: "1" },
      2: { w: 5, h: 5, x: 8, y: 0, i: "2" },
      3: { w: 5, h: 5, x: 3, y: 0, i: "3" },
      4: { w: 5, h: 5, x: 3, y: 5, i: "4" },
      5: { w: 5, h: 4, x: 8, y: 5, i: "5" },
    };
    const expectLayout: Layout = {
      1: { w: 14, h: 43, x: 3, y: 0, i: "1" },
      2: { w: 5, h: 5, x: 8, y: 43, i: "2" },
      3: { w: 5, h: 5, x: 3, y: 43, i: "3" },
      4: { w: 5, h: 5, x: 3, y: 48, i: "4" },
      5: { w: 5, h: 4, x: 8, y: 48, i: "5" },
    };
    const extraItem = layout[1];
    const cascadedLayout = cascade(layout, {
      [extraItem.i]: extraItem,
    });
    expect(cascadedLayout).toEqual(expectLayout);
  });

  it("cascade mutiple comps", () => {
    const layout: Layout = {
      1: { i: "1", w: 14, h: 43, x: 2, y: 12 },
      2: { i: "2", w: 5, h: 5, x: 2, y: 0 },
      3: { i: "3", w: 5, h: 5, x: 6, y: 6 },
      4: { i: "4", w: 5, h: 5, x: 2, y: 6 },
    };
    const extraItem = layout[3];
    const expectLayout: Layout = {
      1: { i: "1", w: 14, h: 43, x: 2, y: 16 },
      2: { i: "2", w: 5, h: 5, x: 2, y: 0 },
      3: { i: "3", w: 5, h: 5, x: 6, y: 6 },
      4: { i: "4", w: 5, h: 5, x: 2, y: 11 },
    };
    const cascadedLayout = cascade(layout, {
      [extraItem.i]: extraItem,
    });
    expect(cascadedLayout).toEqual(expectLayout);
  });
});
