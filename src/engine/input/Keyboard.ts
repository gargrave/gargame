import { Updateable } from '../interfaces/Updateable'

export class Keyboard implements Updateable {
  private kbState: { [key: number]: boolean } = {}
  private prevKbState: { [key: number]: boolean } = {}

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  public onKeyDown = (e: KeyboardEvent) => {
    this.kbState[e.keyCode] = true
  }

  public onKeyUp = (e: KeyboardEvent) => {
    this.kbState[e.keyCode] = false
  }

  public update(dt: number) {}

  public lateUpdate(dt: number) {
    this.prevKbState = { ...this.kbState }
  }

  public isDown(key: number) {
    return this.kbState[key]
  }

  public wasPressed(key: number) {
    return this.kbState[key] && !this.prevKbState[key]
  }
}
