import { getDataInfo } from "./exposingCompletionSource";

describe("getDataInfo", () => {
  const tmp = {
    data2: {
      p21: 5,
      p22: "def",
      p33: [[{ go: 3 }]],
    },
  };
  const data = {
    data1: {
      p1: 3,
      p2: "abc",
    },
    data2: "abc",
    data3: 5.4,
    query1: [
      [tmp],
      {
        data3: {
          p31: 7,
          p32: "ge",
        },
      },
      3.4,
      "test",
    ],
  };
  test("no .", () => {
    expect(getDataInfo(data, "")).toStrictEqual([data, 0, ""]);
    expect(getDataInfo(data, "d")).toStrictEqual([data, 0, "d"]);
    expect(getDataInfo(data, "e")).toStrictEqual([data, 0, "e"]);
    expect(getDataInfo(data, "dat")).toStrictEqual([data, 0, "dat"]);
  });
  test("one .", () => {
    expect(getDataInfo(data, "dat.")).toBe(undefined);
    expect(getDataInfo(data, "data2.")).toBe(undefined);
    expect(getDataInfo(data, "data3.")).toBe(undefined);
    expect(getDataInfo(data, "query1.")).toBe(undefined);

    expect(getDataInfo(data, "data1.")).toStrictEqual([data.data1, 6, ""]);
    expect(getDataInfo(data, "data1.p")).toStrictEqual([data.data1, 6, "p"]);
    expect(getDataInfo(data, "data1.te")).toStrictEqual([data.data1, 6, "te"]);
  });
  test("one . one []", () => {
    expect(getDataInfo(data, "dat[0].")).toBe(undefined);
    expect(getDataInfo(data, "data1[0].")).toBe(undefined);
    expect(getDataInfo(data, "data2[0].")).toBe(undefined);
    expect(getDataInfo(data, "data3[0].")).toBe(undefined);

    expect(getDataInfo(data, "query1[1].")).toStrictEqual([data.query1[1], 10, ""]);
    expect(getDataInfo(data, "query1[1].d")).toStrictEqual([data.query1[1], 10, "d"]);
    expect(getDataInfo(data, "query1[1].te")).toStrictEqual([data.query1[1], 10, "te"]);
    expect(getDataInfo(data, "query1[1 ].te")).toStrictEqual([data.query1[1], 11, "te"]);
    expect(getDataInfo(data, "query1[ 1].te")).toStrictEqual([data.query1[1], 11, "te"]);
    expect(getDataInfo(data, "query1[  1  ].te")).toStrictEqual([data.query1[1], 14, "te"]);
  });
  test("one . two []", () => {
    expect(getDataInfo(data, "query1[1][0].")).toBe(undefined);
    expect(getDataInfo(data, "query1[2][0].")).toBe(undefined);
    expect(getDataInfo(data, "query1[3][0].")).toBe(undefined);

    expect(getDataInfo(data, "query1[0][0].")).toStrictEqual([tmp, 13, ""]);
    expect(getDataInfo(data, "query1[0][0].d")).toStrictEqual([tmp, 13, "d"]);
    expect(getDataInfo(data, "query1[0][0].te")).toStrictEqual([tmp, 13, "te"]);
  });
  test("more complex", () => {
    expect(getDataInfo(data, "query1[0][0].data2.")).toStrictEqual([tmp.data2, 19, ""]);
    expect(getDataInfo(data, "query1[0][0].data2.d")).toStrictEqual([tmp.data2, 19, "d"]);
    expect(getDataInfo(data, "query1[0][0].data2.p33[0][0].ge")).toStrictEqual([
      tmp.data2.p33[0][0],
      29,
      "ge",
    ]);
  });
});
