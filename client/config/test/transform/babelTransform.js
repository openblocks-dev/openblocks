import babelJest from "babel-jest";

export default babelJest.createTransformer({
  presets: [
    [
      "babel-preset-react-app",
      {
        runtime: "automatic",
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});
