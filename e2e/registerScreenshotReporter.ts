import { device } from "detox";

export const registerScreenshotReporter = () => {
  /**
   * jasmine reporter does not support async.
   * So we store the screenshot promise and wait for it before each test
   */
  let screenshotPromise = Promise.resolve();
  beforeEach(() => screenshotPromise);
  // afterAll(() => screenshotPromise);

  /**
   * Take a screenshot on Failed test.
   * Jest standard reporters run in a separate process so they don't have
   * access to the page instance. Using jasmine reporter allows us to
   * have access to the test result, test name and page instance at the same time.
   */
  jasmine.getEnv().addReporter({
    specDone: async result => {
      if (result.status === 'failed') {
        screenshotPromise = screenshotPromise
          .catch(e => { console.log(e) })
          .then(() => {
            // @ts-ignore: takeScreenshot
            return device.takeScreenshot((`Fail: ${result.fullName}`))
          })
      }
    },
  });
};
