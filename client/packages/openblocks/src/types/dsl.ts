export interface ModuleDSLIoInput {
  name: string;
  defaultValue: {
    compType: string;
    comp: any;
  };
}

export interface ModuleDSL {
  ui: {
    compType: "module";
    comp: {
      io: {
        inputs: ModuleDSLIoInput[];
      };
    };
  };
}
