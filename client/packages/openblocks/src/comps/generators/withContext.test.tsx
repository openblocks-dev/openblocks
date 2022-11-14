import { NumberControl, StringControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import { valueComp } from ".";
import { MultiCompBuilder } from "./multi";
import { withContext } from "./withContext";

const emptyViewFunc = (props: Record<string, any>) => {
  return <div></div>;
};
export const TestComp = (function () {
  const childrenMap = {
    v1: valueComp<number>(0),
    v2: NumberControl,
    vStr: StringControl,
  };

  return new MultiCompBuilder(childrenMap, (props) => {
    return {
      v1: props.v1,
      v2: props.v2,
      v3: props.v1 + props.v2,
      vStr: props.vStr,
    };
  })
    .setPropertyViewFn(emptyViewFunc)
    .build();
})();

const testData = {
  value: {
    v1: 11,
    v2: "{{testParam + 10}}",
  },
};
test("without context", () => {
  let comp = new TestComp(testData);
  // comp = evalAndReduce(comp);
  comp = evalAndReduce(comp);
  let output = comp.getView();
  expect(output.v1).toEqual(11);
  expect(output.v2).toEqual(0);
  expect(output.v3).toEqual(11);
});

test("test with context", () => {
  const NewComp = withContext(TestComp, ["testParam"]);
  let comp = new NewComp(testData);
  // comp = evalAndReduce(comp);
  comp = evalAndReduce(comp);
  let output = comp.getView()({
    testParam: 100,
  });
  expect(output.v1).toEqual(11);
  expect(output.v2).toEqual(110);
  expect(output.v3).toEqual(121);

  output = comp.getView()({
    testParam: -100,
  });
  expect(output.v1).toEqual(11);
  expect(output.v2).toEqual(-90);
  expect(output.v3).toEqual(-79);
});

test("test with multi context", () => {
  const testDataTmp = {
    value: {
      v1: 11,
      v2: "{{param1+param2*2}}",
    },
  };
  const NewComp = withContext(TestComp, ["param1", "param2"]);
  let comp = new NewComp(testDataTmp);
  comp = evalAndReduce(comp);
  let output = comp.getView()({
    param1: 100,
    param2: 102,
  });
  expect(output.v1).toEqual(11);
  // get the correct eval value
  expect(output.v2).toEqual(304);
});

test("test with context bad input", () => {
  const testDataBad = {
    value: {
      v1: 11,
      v2: "{{tstParam}}",
    },
  };
  const NewComp = withContext(TestComp, ["testParam"]);
  let comp = new NewComp(testDataBad);
  comp = evalAndReduce(comp);
  let output = comp.getView()({
    testParam: 100,
  });
  expect(output.v1).toEqual(11);
});

test("with context Date value", () => {
  const testData = {
    value: {
      v1: 11,
      v2: "{{testParam}}",
      vStr: "{{testParam}}",
    },
  };
  const NewComp = withContext(TestComp, ["testParam"]);
  let comp = new NewComp(testData);
  comp = evalAndReduce(comp);
  let output = comp.getView()({
    testParam: new Date(1664887576000), // 2022-10-04T12:46:16.000Z
  });
  expect(output.v1).toEqual(11);
  expect(output.v2).toEqual(1664887576000);
  expect(output.vStr).toEqual("2022-10-04T12:46:16.000Z");
});

test("with context Date method", () => {
  const testData = {
    value: {
      v1: 11,
      v2: "{{testParam.getTime()}}",
      vStr: "{{testParam.getTime()}}",
    },
  };
  const NewComp = withContext(TestComp, ["testParam"]);
  let comp = new NewComp(testData);
  comp = evalAndReduce(comp);
  let output = comp.getView()({
    testParam: new Date(1664887576000),
  });
  expect(output.v1).toEqual(11);
  expect(output.v2).toEqual(1664887576000);
  expect(output.vStr).toEqual("1664887576000");
});
