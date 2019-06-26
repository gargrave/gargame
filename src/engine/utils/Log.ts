/* eslint-disable no-console */
export class Log {
  private constructor() {}

  public static info(value: string) {
    console.log(value)
  }

  public static warn(value: string) {
    console.warn(value)
  }

  public static assert(condition: boolean, err: string) {
    console.assert(condition, err)
  }
}
