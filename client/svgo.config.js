// svgo.config.js
export default {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: ["cleanupIds", "prefixIds", "removeTitle"],
};
