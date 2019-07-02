import { Loadable } from '../interfaces/Loadable'
import { ImageData } from './ImageData'

export class Texture implements Loadable {
  protected _img!: HTMLImageElement
  protected _imageData!: ImageData

  constructor(private imgSrc: string) {}

  get img() { return this._img } // prettier-ignore

  get imageData() {
    if (!this._imageData) {
      this._imageData = new ImageData(this)
    }

    return this._imageData
  }

  public load = () => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const img = new Image()
        img.src = this.imgSrc
        this._img = img

        img.onload = () => {
          resolve(true)
        }
      } catch (e) {
        reject(false)
      }
    })
  }
}
