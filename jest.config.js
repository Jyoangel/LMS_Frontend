const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
    //moduleNameMapper: {
    //    "^@/(.*)$": "<rootDir>/src/$1",
    //    "^next/navigation$": "<rootDir>/__mocks__/next/router.js",
    //},
};

module.exports = createJestConfig(customJestConfig);

