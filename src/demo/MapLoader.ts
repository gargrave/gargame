import { Assets, Pixel, Texture, Vector } from '../engine'

import { MAP_SIZE, MAPS_PER_ROW, MAX_LEVEL, TILES } from './config/constants'
import { clamp } from '@gargrave/ggdash/numbers'

const isTile = (a: Pixel, b: Pixel) =>
  a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a

export class MapLoader {
  private readonly mapAtlas: Texture

  constructor() {
    this.mapAtlas = Assets.texture('level')
  }

  public loadMap(level: number = 1) {
    const atlas = this.mapAtlas.imageData
    const [w, h] = MAP_SIZE

    const lvl = clamp(0, MAX_LEVEL - 1, level - 1) as number
    const levelOffset = {
      x: lvl % MAPS_PER_ROW || 0,
      y: Math.floor(lvl / MAPS_PER_ROW) || 0,
    }

    const pxOffset = {
      x: w * levelOffset.x,
      y: h * levelOffset.y,
    }

    const mapAssets = {
      player: null as any, // eslint-disable-line
      sign: null as any, // eslint-disable-line
      stars: [] as Vector[],
      tiles: [] as Vector[],
    }

    for (let x = 0; x < w; x += 1) {
      for (let y = 0; y < h; y += 1) {
        const px = atlas.getPixelAt(x + pxOffset.x, y + pxOffset.y)

        if (isTile(px, TILES.SOLID)) {
          mapAssets.tiles.push(new Vector(x, y))
        } else if (isTile(px, TILES.PLAYER)) {
          mapAssets.player = new Vector(x, y)
        } else if (isTile(px, TILES.SIGN)) {
          mapAssets.sign = new Vector(x, y)
        } else if (isTile(px, TILES.STAR)) {
          mapAssets.stars.push(new Vector(x, y))
        } else if (!isTile(px, TILES.EMPTY)) {
          console.log('Found unhandled tile...')
          console.log({ px })
        }
      }
    }

    return mapAssets
  }
}
