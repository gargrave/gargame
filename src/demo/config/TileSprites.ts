import { Assets, SpriteConfig } from '../../engine'

export class TileSprites {
  private static sprites: { [key: number]: SpriteConfig } = {}

  public static init() {
    const size = 32
    const def = {
      height: size,
      texture: Assets.texture('tiles'),
      width: size,
    }

    TileSprites.sprites = {
      0: {
        ...def,
        x: size * 3,
        y: size * 3,
      },
      1: {
        ...def,
        x: size * 3,
        y: size * 2,
      },
      2: {
        ...def,
        x: 0,
        y: size * 3,
      },
      3: {
        ...def,
        x: 0,
        y: size * 2,
      },
      4: {
        ...def,
        x: size * 3,
        y: 0,
      },
      5: {
        ...def,
        x: size * 3,
        y: size,
      },
      6: {
        ...def,
        x: 0,
        y: 0,
      },
      7: {
        ...def,
        x: 0,
        y: size,
      },
      8: {
        ...def,
        x: size * 2,
        y: size * 3,
      },
      9: {
        ...def,
        x: size * 2,
        y: size * 2,
      },
      11: {
        ...def,
        x: size,
        y: size * 2,
      },
      12: {
        ...def,
        x: size * 2,
        y: 0,
      },
      13: {
        ...def,
        x: size * 2,
        y: size,
      },
      14: {
        ...def,
        x: size,
        y: 0,
      },
      15: {
        ...def,
        x: size,
        y: size,
      },
    }
  }

  public static getSpriteConfig(bit: number): SpriteConfig {
    return TileSprites.sprites[bit] || TileSprites.sprites[0]
  }
}
