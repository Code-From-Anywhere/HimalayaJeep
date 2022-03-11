// const transpilables = require("./transpile.config");
// const transpileModulesContent = transpilables
//   .map((module) => {
//     return [
//       // it needs to search both node_modules and the node_modules of my links
//       `./node_modules/${module}/**/*.tsx`,
//     ].filter(Boolean);
//   })
//   .reduce((previous, current) => [...previous, ...current], []);

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ...transpileModulesContent],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
