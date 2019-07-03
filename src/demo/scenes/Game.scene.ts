import { Label, Scene } from '../../engine'

import { TILE_SIZE } from '../config/constants'
import { Player } from '../entities/Player'
import { Star } from '../entities/Star'
import { Tile } from '../entities/Tile'
import { MapLoader } from '../MapLoader'

export class GameScene extends Scene {
  private map: MapLoader

  constructor(game) {
    super(game)
    this.map = new MapLoader()
  }

  public enter() {
    super.enter()

    // this.addGuiObject(new Label('This is a label!', { x: 10, y: 24 }))

    const mapAssets = this.map.loadMap(1)

    // instantiate player
    const player = new Player()
    player.pos.setTo(
      mapAssets.player.x * TILE_SIZE,
      mapAssets.player.y * TILE_SIZE - player.height / 2 - 1,
    )
    this.add(player)

    // instantiate stars
    mapAssets.stars.forEach(_star => {
      const star = new Star(_star.x * TILE_SIZE, _star.y * TILE_SIZE)
      this.add(star)
    })

    // instantiate sign
    // TODO: create a sign Entity, and instantiate it!

    // instantiate tiles
    const tilePosMap: { [key: string]: Tile } = {}
    mapAssets.tiles.forEach(_tile => {
      const tile = new Tile(_tile.x, _tile.y, TILE_SIZE)
      tilePosMap[`${_tile.x}__${_tile.y}`] = tile
      this.add(tile)
    })
    Object.values(tilePosMap).forEach((tile: Tile) => {
      tile.setSpriteByNeighbors(tilePosMap)
    })

    if (process.env.NODE_ENV === 'development') {
      const w = window as any // eslint-disable-line
      w.player = player
    }
  }
}
