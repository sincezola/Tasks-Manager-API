import JestConfig from './jest.config';
import type { Config } from 'jest';

const e2eConfig: Config = {
  ...JestConfig,
  testEnvironment: '../prisma/prisma-test-environment.ts',
  testRegex: '.e2e-spec.ts$',
};

export default e2eConfig;
