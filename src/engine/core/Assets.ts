import { Texture } from '../resources'

const _assets = {
  textures: {},
}

const Assets = {
  addTexture(key: string, t: Texture) {
    _assets.textures[key] = t
  },

  texture(key: string) {
    return _assets.textures[key]
  },
}

if (process.env.NODE_ENV === 'development') {
  ;(window as any).assets = _assets
}

export default Assets
