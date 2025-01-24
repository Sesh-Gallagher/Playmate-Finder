/**
 * Jest configuration object that sets up the testing environment, transforms, and module mappings for the project.
 * This configuration is used by Jest, a JavaScript testing framework, to run tests in the project.
 * The configuration includes the following settings:
 * - `testEnvironment`: Sets the testing environment to 'jsdom', which is a JavaScript implementation of the WHATWG DOM and HTML standards for testing in a browser-like environment.
 * - `transform`: Specifies the transformation rules for files with the '.ts' or '.tsx' extensions, using the 'ts-jest' transformer.
 * - `moduleNameMapper`: Defines the mapping of imported module names to their corresponding implementation, including handling of CSS, Less, Scss, and Sass files.
 * - `setupFilesAfterEnv`: Specifies the setup file to be executed after the Jest environment has been set up.
 * - `testMatch`: Defines the patterns to match test files, including both unit tests and integration tests.
 */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
