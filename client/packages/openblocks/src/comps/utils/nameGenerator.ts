import _ from "lodash";

/**
 * name automatic generator, used to generate the default name of the component
 *
 * @remarks
 * The automatic generator automatically generates itemName according to the incoming typeName.
 * For example: pass in typeName="button", the current button generation number is 2, then return itemName="button3"
 */
export class NameGenerator {
  /**
   * A structure to record the current numbering progress
   */
  protected record: Record<string, number> = {};

  isDistinct(name: string): boolean {
    const nameSet: Set<string> = this.getNameSet();
    return !nameSet.has(name);
  }

  /**
   * Automatically generate itemName
   *
   * @remarks
   * Has side effects, will change the state of the generator
   *
   * @param typeName typeName to get itemName
   * @returns the generated itemName result corresponding to typeName
   */
  genItemName(typeName: string): string {
    let name;
    do {
      name = this.genDefaultItemName(typeName);
    } while (!this.isDistinct(name));
    return name;
  }

  init(itemNames: Array<string>): this {
    this.clear();
    const regex = new RegExp("^(.+?)(\\d+)$", "i");
    itemNames.forEach((name: string) => {
      const result = regex.exec(name);
      // log.log("result", result);
      if (result) {
        const [, typeName, itemName] = result;
        if (typeName && itemName) {
          this.update(typeName, _.ceil(+itemName));
        }
      }
    });
    return this;
  }

  private clear() {
    this.record = {};
  }

  private update(typeName: string, num: number) {
    if (!Number.isInteger(num)) {
      return;
    }
    const recNum = this.record[typeName] ?? 0;
    if (recNum < num) {
      this.record[typeName] = num;
    }
  }

  private getNameSet(): Set<string> {
    // FIXME: add name
    return new Set();
  }

  private genDefaultItemName(typeName: string): string {
    const nextNum = (this.record[typeName] ?? 0) + 1;
    this.update(typeName, nextNum);
    return typeName + nextNum;
  }
}
