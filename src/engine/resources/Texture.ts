export default class Texture {
  protected _img: HTMLImageElement

  constructor(imgSrc: string) {
    const img = new Image()
    img.src = imgSrc
    this._img = img
  }

  get img() { return this._img } // prettier-ignore
}
