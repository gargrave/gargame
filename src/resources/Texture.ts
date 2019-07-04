import { Loadable } from '../interfaces/Loadable'
import { ImageData } from './ImageData'

export class Texture implements Loadable {
  protected _img!: HTMLImageElement
  protected _imageData!: ImageData

  constructor(private imgSrc: string) {}

  get img() { return this._img } // prettier-ignore

  /**
   * Creates an ImageData instance for this Texture instance.
   * Note that this ImageData object is created on-demand.
   * In most cases, a Texture will probably not need to access the data
   * stored in an ImageData instance, and it since it a relatively heavy
   * process to build one, nothing is created until it is accessed for the first time.
   */
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
