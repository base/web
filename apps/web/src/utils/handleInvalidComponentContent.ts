// util to fail gracefully and prevent app from crashing
// skips rendering the component if the content is invalid

/**
 * Logs a warning in development and returns true if the component should be disabled (render null).
 * @param isInvalid - Boolean indicating if the content is invalid.
 * @param componentName - Name of the component that is being disabled.
 * @returns true if the component should be disabled (render null), false otherwise.
 */
export function handleInvalidComponentContent(isInvalid: boolean, componentName: string): boolean {
  if (isInvalid) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Disallowed content in ${componentName}: check component internal constraints.`);
    }
    return true;
  }
  return false;
}
