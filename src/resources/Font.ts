import { Loadable } from '../interfaces/Loadable'

export class Font implements Loadable {
  private readonly name: string
  private readonly path: string

  constructor(name: string, path: string) {
    this.name = name
    this.path = path
  }

  public load() {
    return new Promise<boolean>((resolve, reject) => {
      // @ts-ignore
      const fontFace = new FontFace(this.name, `url(${this.path})`, {
        style: 'normal',
        unicodeRange: 'U+000-5FF',
        weight: '400',
      })

      fontFace
        .load()
        .then(() => {
          // @ts-ignore
          document.fonts.add(fontFace)
          resolve(true)
        })
        .catch(err => reject(err))
    })
  }
}
