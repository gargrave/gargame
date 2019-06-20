import { Assets } from '.'
import { Texture } from '../resources'

export type AssetMap = {
  textures: {
    [key: string]: string
  }
}

export default class Loader {
  constructor(private assets: AssetMap) {}

  loadAll() {
    const { textures } = this.assets

    const expectedTextures = Object.keys(textures).length

    let loadedTextures = 0

    return new Promise<boolean>((resolve, reject) => {
      Object.entries(textures).forEach(([key, path]) => {
        const t = new Texture(path)
        t.load().then(() => {
          Assets.addTexture(key, t)
          if (++loadedTextures === expectedTextures) {
            resolve(true)
          }
        })
      })
    })
  }
}
