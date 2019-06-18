import { Updateable } from '../interfaces'

export default class Keyboard implements Updateable {
  private kbState: { [key: number]: boolean } = {}
  private prevKbState: { [key: number]: boolean } = {}

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  onKeyDown = (e: KeyboardEvent) => {
    // console.log('onKeyDown')
    // console.log({ e })
    this.kbState[e.keyCode] = true
  }

  onKeyUp = (e: KeyboardEvent) => {
    // console.log('onKeyUp')
    // console.log({ e })
    this.kbState[e.keyCode] = false
  }

  update(dt: number) {}

  lateUpdate(dt: number) {
    this.prevKbState = { ...this.kbState }
  }

  isDown(key: number) {
    return this.kbState[key]
  }

  wasPressed(key: number) {
    return this.kbState[key] && !this.prevKbState[key]
  }
}
