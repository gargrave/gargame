import { InputHandler } from '../interfaces/InputHandler'
import { Keyboard } from './Keyboard'

export type InputConfig = {
  enableKeyboard?: boolean
}

export class Input {
  private static controllers: InputHandler[]

  private constructor() {}

  public static init(config: InputConfig = {}) {
    const { enableKeyboard = true } = config

    Input.controllers = []
    if (enableKeyboard) {
      Input.controllers.push(new Keyboard())
    }
  }

  public static earlyUpdate(dt: number) {
    for (const c of Input.controllers) {
      c.earlyUpdate && c.earlyUpdate(dt)
    }
  }

  public static update(dt: number) {
    for (const c of Input.controllers) {
      c.update(dt)
    }
  }

  public static lateUpdate(dt: number) {
    for (const c of Input.controllers) {
      c.lateUpdate && c.lateUpdate(dt)
    }
  }

  public static isDown(cmd: string): boolean {
    for (const c of Input.controllers) {
      if (c.isDown(cmd)) return true
    }

    return false
  }

  public static wasPressed(cmd: string): boolean {
    for (const c of Input.controllers) {
      if (c.wasPressed(cmd)) return true
    }

    return false
  }
}
