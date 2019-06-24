import { Texture } from '../resources/Texture'

import { Assets } from './Assets'

export type AssetQueueMap = {
  textures: {
    [key: string]: string
  }
}

export class Loader {
  constructor(private assets: AssetQueueMap) {}

  public loadAll() {
    const { textures } = this.assets
    const expectedTextures = Object.keys(textures).length
    let loadedTextures = 0

    return new Promise<boolean>((resolve, reject) => {
      Object.entries(textures).forEach(([key, path]) => {
        const t = new Texture(path)
        t.load().then(() => {
          Assets.addTexture(key, t)
          loadedTextures += 1
          if (loadedTextures === expectedTextures) {
            resolve(true)
          }
        })
      })
    })
  }
}
