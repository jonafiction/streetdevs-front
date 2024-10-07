import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Ensure this is set to 'jsdom'
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
};

export default config;
