/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60000,
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
