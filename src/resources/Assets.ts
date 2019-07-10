import { Font } from './Font'
import { SoundFile } from './SoundFile'
import { Texture } from './Texture'

export type AssetMap = {
  fonts: { [key: string]: Font }
  sounds: { [key: string]: SoundFile }
  textures: { [key: string]: Texture }
}

const assets: AssetMap = {
  fonts: {},
  sounds: {},
  textures: {},
}

export class Assets {
  static get allAssets(): AssetMap { return assets } // prettier-ignore

  public static addFont(key: string, font: Font) {
    assets.fonts[key] = font
  }

  public static addSound(key: string, sound: SoundFile) {
    assets.sounds[key] = sound
  }

  public static addTexture(key: string, texture: Texture) {
    assets.textures[key] = texture
  }

  public static font(key: string): Font {
    return assets.fonts[key]
  }

  public static sound(key: string): SoundFile {
    return assets.sounds[key]
  }

  public static texture(key: string): Texture {
    return assets.textures[key]
  }
}
