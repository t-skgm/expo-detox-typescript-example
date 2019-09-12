import { cleanup, init, device } from "detox";
import * as adapter from "detox/runners/jest/adapter";
import { registerScreenshotReporter } from "./registerScreenshotReporter";

const config = require('../package.json').detox;

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);
registerScreenshotReporter()

beforeAll(async () => {
  await init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
