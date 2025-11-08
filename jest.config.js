export default {
  testEnvironment: "node",
  transform: {}, // desativa transformações desnecessárias (sem Babel)
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/tests/helpers/setup.js"],
  setupFiles: ["<rootDir>/jest.setup.js"],
};
