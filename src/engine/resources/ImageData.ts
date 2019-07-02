/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getAtXy } from '@gargrave/ggdash'

import { Texture } from './Texture'

export type Pixel = {
  r: number
  g: number
  b: number
  a: number
}

export class ImageData {
  private readonly _width: number
  private readonly _height: number
  private readonly _pixels: Pixel[]

  private readonly pixelGetter // curry-able "getPixelAt" function

  get width() { return this._width } // prettier-ignore
  get height() { return this._height } // prettier-ignore

  constructor(texture: Texture) {
    const w = texture.img.width
    const h = texture.img.height
    const canvas = document.createElement('canvas')
    canvas.style.visibility = 'hidden'
    canvas.width = w
    canvas.height = h

    const ctx = canvas.getContext('2d')
    ctx!.drawImage(texture.img, 0, 0, w, h)

    const imageData = ctx!.getImageData(0, 0, w, h)
    this._width = imageData.width
    this._height = imageData.height

    const data = imageData.data
    this._pixels = []
    for (let i = 0; i < data.length; i += 4) {
      /* eslint-disable sort-keys */
      this._pixels.push({
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: data[i + 3],
      })
      /* eslint-enable sort-keys */
    }

    this.pixelGetter = getAtXy(this._pixels, w)
  }

  public getPixelAt(x: number, y: number): Pixel {
    return this.pixelGetter(x, y)
  }
}
