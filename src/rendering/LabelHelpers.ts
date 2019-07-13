import { Label } from './Label'
import { Globals as gl } from '../Globals'

export class LabelHelpers {
  public static getDrawX(label: Label) {
    const { centeredX } = label.props

    if (centeredX) {
      return gl.game.widthHalf - label.width / 2
    }

    return label.pos.x
  }
}
