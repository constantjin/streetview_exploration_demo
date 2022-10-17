// Reference: https://stackoverflow.com/questions/37764665/how-to-implement-sleep-function-in-typescript
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
