import { InputHandler } from '../interfaces/InputHandler'

export class Keyboard implements InputHandler {
  private kbState: { [key: string]: boolean } = {}
  private prevKbState: { [key: string]: boolean } = {}

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  public destroy() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  public onKeyDown = (e: KeyboardEvent) => {
    this.kbState[e.code] = true
  }

  public onKeyUp = (e: KeyboardEvent) => {
    this.kbState[e.code] = false
  }

  public update(dt: number) {
    // currently no need for any per-frame updates
  }

  public lateUpdate(dt: number) {
    this.prevKbState = { ...this.kbState }
  }

  public isDown(key: string) {
    return this.kbState[key]
  }

  public wasPressed(key: string) {
    return this.kbState[key] && !this.prevKbState[key]
  }
}
