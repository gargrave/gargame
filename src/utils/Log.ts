/* eslint-disable no-console */
const allowLogging = process.env.NODE_ENV === 'development'

export class Log {
  private constructor() {}

  public static info(value: string) {
    if (!allowLogging) return
    console.log(value)
  }

  public static warn(value: string) {
    if (!allowLogging) return
    console.warn(value)
  }

  public static assert(condition: boolean, err: string) {
    if (!allowLogging) return
    console.assert(condition, err)
  }
}
