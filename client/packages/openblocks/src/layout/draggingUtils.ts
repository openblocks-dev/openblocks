// must call clearData() after drag completes, otherwise isDragging() status may be wrong!!
export namespace draggingUtils {
  let _data: Record<string, any> = {};
  let _isDragging: boolean = false;
  export function setData<T>(key: string, value: T) {
    _data[key] = value;
    _isDragging = true;
  }
  export function getData<T = string>(key: string) {
    return _data[key] as T;
  }
  export function clearData() {
    _data = {};
    _isDragging = false;
  }
  export function isDragging() {
    return _isDragging;
  }
}
