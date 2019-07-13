import { InputHandler } from '../interfaces/InputHandler'
import { Keyboard } from './Keyboard'

export type InputProps = {
  enableKeyboard?: boolean
}

export class Input {
  private static controllers: InputHandler[]

  private constructor() {}

  public static init(props: InputProps = {}) {
    const { enableKeyboard = true } = props

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

  public static isDown(cmd: string[]): boolean {
    for (const c of Input.controllers) {
      for (const ctrl of cmd) {
        if (c.isDown(ctrl)) return true
      }
    }

    return false
  }

  public static wasPressed(cmd: string[]): boolean {
    for (const c of Input.controllers) {
      for (const ctrl of cmd) {
        if (c.wasPressed(ctrl)) return true
      }
    }

    return false
  }
}
