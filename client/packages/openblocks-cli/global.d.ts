declare global {
  interface Window {
    printPerf: () => void;
    __OPENBLOCKS_DEV__?: {};
  }
}

export {};
