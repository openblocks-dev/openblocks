import { NameGenerator } from "./nameGenerator";

describe("NameGenerator", () => {
  it("generator from scratch should work well", () => {
    const generator = new NameGenerator();
    expect(generator.genItemName("button")).toBe("button1");
    expect(generator.genItemName("button")).toBe("button2");
  });

  it("generator from storage without typeSet should work well", () => {
    const generator = new NameGenerator().init(["button1", "button10", "_button0"]);
    expect(generator.genItemName("button")).toBe("button11");
    expect(generator.genItemName("button")).toBe("button12");
  });

  it("generator from storage with typeSet should work well", () => {
    const generator = new NameGenerator().init(["button1", "button10", "_button0"]);
    expect(generator.genItemName("button")).toBe("button11");
    expect(generator.genItemName("button")).toBe("button12");
  });
});
