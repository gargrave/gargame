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

    // this.add(new Tile(16 * size, 10 * size, size))
    // this.add(new Tile(16 * size, 11 * size, size))
    // this.add(new Tile(8 * size, 10 * size, size))
    // this.add(new Tile(8 * size, 11 * size, size))
    //
    // this.add(new Tile(10 * size, 8 * size, size))
    // this.add(new Tile(11 * size, 8 * size, size))
    // this.add(new Tile(10 * size, 13 * size, size))
    // this.add(new Tile(11 * size, 13 * size, size))
    //
    // this.addGuiObject(new Label('This is a label!', { x: 10, y: 24 }))

    console.log('Loading...')
    const mapAssets = this.map.loadMap()
    console.log('Done loading...')
    console.log({ mapAssets })

    // instantiate player
    const player = new Player()
    player.pos.setTo(
      mapAssets.player.x * TILE_SIZE,
      mapAssets.player.y * TILE_SIZE,
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
    mapAssets.tiles.forEach(_tile => {
      const tile = new Tile(_tile.x * TILE_SIZE, _tile.y * TILE_SIZE, TILE_SIZE)
      this.add(tile)
    })

    if (process.env.NODE_ENV === 'development') {
      const w = window as any // eslint-disable-line
      w.player = player
    }
  }
}
