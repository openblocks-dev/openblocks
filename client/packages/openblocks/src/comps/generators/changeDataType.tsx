import { JSONValue } from "util/jsonTypes";
import { Comp, CompParams, ConstructorToNodeType, ConstructorToView } from "openblocks-core";
import { MultiBaseComp } from "openblocks-core";

type GetDataType<T> = T extends new (params: CompParams<any>) => MultiBaseComp<any, infer A, any>
  ? A
  : never;

/**
 * Change the datatype of comp
 */
type ChangeDataType<
  T extends new (...args: any) => any,
  DataType extends JSONValue
> = T extends new (...args: any) => infer Return
  ? new (params: CompParams<DataType>) => Modify<
      Return,
      {
        toJsonValue: () => DataType;
      } & Comp<ConstructorToView<T>, DataType, ConstructorToNodeType<T>>
    >
  : never;

interface Comp2 extends Comp<any, number> {}

type Modify<T, R> = Omit<T, keyof R> & R;

// type A = InstanceType<typeof NewComp>;
type A = Modify<Comp2, Comp<any, string>>;
type B = A extends Comp<any, infer X, any> ? X : never;
type C = B;

/**
 * Change the DataType of comp to another data, because the original data structure may not be the most suitable
 */
export function changeDataType<T extends new (...args: any) => any, DataType extends JSONValue>(
  VariantComp: T,
  oldToNew: (oldData: GetDataType<T>) => DataType,
  newToOld: (newData: DataType) => GetDataType<T>
) {
  type NewCompType = ChangeDataType<T, DataType>;
  class TmpComp extends VariantComp {
    parseChildrenFromValue(params: CompParams<DataType>) {
      return super.parseChildrenFromValue({
        dispatch: params.dispatch,
        value: params.value !== undefined ? newToOld(params.value) : undefined,
      });
    }
    toJsonValue() {
      return oldToNew(super.toJsonValue());
    }
  }
  return TmpComp as unknown as NewCompType;
}
