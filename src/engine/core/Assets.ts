import { Texture } from '../resources'

const _assets = {
  textures: {},
}

export default class Assets {
  static get allAssets() { return _assets } // prettier-ignore

  public static addTexture(key: string, t: Texture) {
    _assets.textures[key] = t
  }

  public static texture(key: string) {
    return _assets.textures[key]
  }
}
