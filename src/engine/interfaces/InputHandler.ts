import { Updateable } from './index'

export interface InputHandler extends Updateable {
  isDown(key: string): boolean
  wasPressed(key: string): boolean
}
