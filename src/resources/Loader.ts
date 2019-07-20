import { Loadable } from '../interfaces/Loadable'
import { Log } from '../utils/Log'
import { Globals as gl } from '../Globals'
import { Assets } from './Assets'
import { Font } from './Font'
import { SoundFile } from './SoundFile'
import { Texture } from './Texture'

type AssetList = { [key: string]: string }

export type AssetQueueMap = {
  fonts: AssetList
  sounds: AssetList
  textures: AssetList
}

type LoaderConfig<T> = {
  onResourceLoaded: (key: string, resource: T) => void
  resourceList: AssetList
  resourceLoader: (key, path) => T & Loadable
  resourceName: string
}

export class Loader {
  constructor(private assetQueue: AssetQueueMap) {}

  /**
   * Generic loader method for all resource types.
   * @param onResourceLoaded
   * @param resourceList
   * @param resourceLoader
   * @param resourceName
   */
  private _loadResources<T>({
    onResourceLoaded,
    resourceList,
    resourceLoader,
    resourceName,
  }: LoaderConfig<T>) {
    const expected = Object.keys(resourceList).length
    let loaded = 0
    Log.info(`Loading ${expected} ${resourceName}s...`)

    return new Promise<boolean>(async (resolve, reject) => {
      Object.entries(resourceList).forEach(([key, path]) => {
        const res = resourceLoader(key, path)
        res
          .load()
          .then(() => {
            onResourceLoaded(key, res)
          })
          .catch(err => {
            Log.warn(
              `Error loading ${resourceName} resource @ "${path}" :: ${err}`,
            )
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

  public loadFonts(fonts: AssetList): Promise<boolean> {
    const loaderConfig: LoaderConfig<Font> = {
      onResourceLoaded: (key, font) => {
        Assets.addFont(key, font)
      },
      resourceList: fonts,
      resourceLoader: (key, path) => new Font(key, path),
      resourceName: 'font',
    }
    return this._loadResources(loaderConfig)
  }

  public loadSounds(sounds: AssetList): Promise<boolean> {
    if (!gl.settings.enableSound) {
      Log.info(
        'No sound resources loaded because sound is disabled in game settings...',
      )
      return Promise.resolve(true)
    }

    const loaderConfig: LoaderConfig<SoundFile> = {
      onResourceLoaded: (key, sound) => {
        Assets.addSound(key, sound)
      },
      resourceList: sounds,
      resourceLoader: (key, path) => new SoundFile(path),
      resourceName: 'sound',
    }
    return this._loadResources(loaderConfig)
  }

  public loadTextures(textures: AssetList): Promise<boolean> {
    const loaderConfig: LoaderConfig<Texture> = {
      onResourceLoaded: (key, texture) => {
        Assets.addTexture(key, texture)
      },
      resourceList: textures,
      resourceLoader: (key, path) => new Texture(path),
      resourceName: 'texture',
    }
    return this._loadResources(loaderConfig)
  }

  public loadAll() {
    const { fonts, sounds, textures } = this.assetQueue

    return Promise.all([
      this.loadFonts(fonts),
      this.loadSounds(sounds),
      this.loadTextures(textures),
    ])
  }
}
