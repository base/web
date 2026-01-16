const ogConsoleDebug = global.console.debug;
const ogConsoleLog = global.console.log;
const ogConsoleWarn = global.console.warn;
const ogConsoleError = global.console.error;
const ogConsoleInfo = global.console.info;

type ConsoleFunctionNames = {
  [K in keyof typeof console]: (typeof console)[K] extends (...args: unknown[]) => unknown
    ? K
    : never;
}[keyof typeof console];

type MockableConsoleFunctionNames = Extract<
  ConsoleFunctionNames,
  'debug' | 'log' | 'warn' | 'error' | 'info'
>;

/**
 * Mocks the console.log, console.warn, console.error, console.debug and console.info functions by default.
 * An array of console function names can be passed in to mock only the specified functions.
 *
 * NOTE: **This should go in a `beforeEach` block, NOT a `beforeAll`**
 */
export function mockConsoleLog(
  listFunctions: MockableConsoleFunctionNames[] = ['debug', 'log', 'warn', 'error', 'info'],
): void {
  listFunctions.forEach((funcName) => {
    global.console[funcName] = jest.fn();
  });
}

/**
 * Restores the original console.log, console.warn, and console.error functions.
 *
 * NOTE: **This should go in a `afterEach` block, NOT a `afterAll`**
 */
export function restoreConsoleLog(): void {
  global.console.debug = ogConsoleDebug;
  global.console.log = ogConsoleLog;
  global.console.warn = ogConsoleWarn;
  global.console.error = ogConsoleError;
  global.console.info = ogConsoleInfo;
}
