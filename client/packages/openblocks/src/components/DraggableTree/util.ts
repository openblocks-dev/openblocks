export function checkDroppableFlag<T extends any>(
  flag: boolean | ((arg: T) => boolean) | undefined,
  arg: T
) {
  if (!flag) {
    return true;
  }
  return typeof flag === "function" ? flag(arg) : flag;
}
