export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  globalSetup: "./jest.global-setup.ts",
};
