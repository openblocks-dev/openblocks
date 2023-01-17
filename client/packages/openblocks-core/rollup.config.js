import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
  {
    input: "src/index.ts",
    plugins: [resolve({ browser: true }), commonjs(), typescript()],
    output: {
      dir: "lib",
      format: "esm",
    },
    external: ["lodash", "stylis"],
  },
  {
    input: "src/index.ts",
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({ declaration: false, declarationDir: undefined }),
    ],
    output: {
      format: "cjs",
      file: "lib/index.cjs",
    },
    external: ["lodash", "stylis"],
  },
  {
    input: "lib/dts/index.d.ts",
    plugins: [
      dts({
        compilerOptions: { baseUrl: "lib/dts" },
      }),
    ],
    output: {
      file: "lib/index.d.ts",
      format: "es",
    },
  },
];

export default config;
