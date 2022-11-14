import { JSONObject } from "util/jsonTypes";
import { ExecuteCompAction } from "comps/controls/actionSelector/executeCompAction";
import { evalAndReduce } from "comps/utils";

test("test execute action param transform", () => {
  // old structure to new structure
  let comp = new ExecuteCompAction({
    value: {
      name: "progressCircle1",
      methodName: "setValue",
      params: ["20"],
    },
  } as JSONObject);

  comp = evalAndReduce(comp);
  comp.children.params.getView().forEach((p) => {
    expect(p.children.compType.getView()).toEqual("string");
    expect(p.children.comp.getView()).toEqual("20");
  });

  // new structure is not affected
  comp = new ExecuteCompAction({
    value: {
      name: "progressCircle1",
      methodName: "setValue",
      params: [
        {
          comp: 20,
          name: "value",
          compType: "number",
        },
      ],
    },
  });
  comp = evalAndReduce(comp);
  comp.children.params.getView().forEach((p) => {
    expect(p.children.compType.getView()).toEqual("number");
    expect(p.children.comp.getView()).toEqual(20);
    expect(p.children.name.getView()).toEqual("value");
  });
});
