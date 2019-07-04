import { Texture } from './Texture'

export type AssetMap = {
  textures: { [key: string]: Texture }
}

const _assets: AssetMap = {
  textures: {},
}

export class Assets {
  static get allAssets(): AssetMap { return _assets } // prettier-ignore

  public static addTexture(key: string, t: Texture) {
    _assets.textures[key] = t
  }

  public static texture(key: string): Texture {
    return _assets.textures[key]
  }
}
