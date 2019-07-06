import { Log } from '../utils/Log'
import { Assets } from './Assets'
import { Font } from './Font'
import { Texture } from './Texture'

type AssetList = { [key: string]: string }

export type AssetQueueMap = {
  fonts: AssetList
  textures: AssetList
}

export class Loader {
  constructor(private assetQueue: AssetQueueMap) {}

  public loadFonts(fonts: AssetList): Promise<boolean> {
    const expected = Object.keys(fonts).length
    let loaded = 0

    Log.info(`Loading ${expected} fonts...`)

    return new Promise<boolean>(async (resolve, reject) => {
      Object.entries(fonts).forEach(([key, path]) => {
        const font = new Font(key, path)
        font
          .load()
          .then(() => {
            Assets.addFont(key, font)
          })
          .catch(err => {
            Log.warn(`Error loading font resource @ "${path}" :: ${err}`)
          })
          .finally(() => {
            loaded += 1
            if (loaded === expected) {
              resolve(true)
            }
          })
      })
    })
  }

  // TODO: these loading methods can probably be abstracted into one
  public loadTextures(textures: AssetList): Promise<boolean> {
    const expected = Object.keys(textures).length
    let loaded = 0

    Log.info(`Loading ${expected} textures...`)

    return new Promise<boolean>((resolve, reject) => {
      Object.entries(textures).forEach(([key, path]) => {
        const texture = new Texture(path)
        texture
          .load()
          .then(() => {
            Assets.addTexture(key, texture)
          })
          .catch(err => {
            Log.warn(`Error loading texture resource @ "${path}" :: ${err}`)
          })
          .finally(() => {
            loaded += 1
            if (loaded === expected) {
              resolve(true)
            }
          })
      })
    })
  }

  public loadAll() {
    const { fonts, textures } = this.assetQueue

    return Promise.all([this.loadFonts(fonts), this.loadTextures(textures)])
  }
}
