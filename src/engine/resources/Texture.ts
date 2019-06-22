import Loadable from '../interfaces/Loadable'

export default class Texture implements Loadable {
  protected _img!: HTMLImageElement

  constructor(private imgSrc: string) {}

  get img() { return this._img } // prettier-ignore

  public load = () => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const img = new Image()
        img.src = this.imgSrc
        this._img = img
        resolve(true)
      } catch (e) {
        reject(false)
      }
    })
  }
}
