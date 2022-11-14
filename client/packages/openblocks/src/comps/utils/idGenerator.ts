export function genRandomKey(): string {
  return Math.floor(Math.random() * 0xffffffff).toString(16);
}

const inOptions: string = "abcdefghijklmnopqrstuvwxyz0123456789";

export function genQueryId(length: number = 24): string {
  let outString: string = "";
  for (let i = 0; i < length; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
}
