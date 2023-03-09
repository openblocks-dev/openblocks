// svgo.config.js
module.exports = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: ["cleanupIds", "prefixIds", "removeTitle"],
};
