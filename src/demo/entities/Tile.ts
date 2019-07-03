import {
  Assets,
  Entity,
  Globals as gl,
  Primitive,
  Sprite,
  SpriteConfig,
  Vector,
  WithSprite,
} from '../../engine'

import { CollisionGroup } from '../config/collisionGroups'
import { TileSprites } from '../config/TileSprites'
import { MAP_SIZE } from '../config/constants'

export class Tile extends Entity {
  private static defaultSprite: Sprite

  private readonly color: string
  private readonly gridPos: Vector
  private readonly withSprite: WithSprite

  constructor(x, y, size) {
    super({
      collisionGroups: [CollisionGroup.tile],
      height: size,
      width: size,
      x: x * size,
      y: y * size,
    })

    const c = () => Math.floor(Math.random() * 255)
    this.color = `rgb(${c()}, ${c()}, ${c()})`
    this.gridPos = new Vector(x, y)

    Tile.defaultSprite = new Sprite(this, TileSprites.getSpriteConfig(0))
    this.withSprite = new WithSprite(this, Tile.defaultSprite)
    this.addBehavior(this.withSprite)
  }

  public setSpriteByNeighbors(tiles: {}) {
    let bit = 0
    const { x: gx, y: gy } = this.gridPos
    const [mx, my] = MAP_SIZE // max map height/width, to check for map edge tiles

    const posKey = (dx, dy) => `${gx + dx}__${gy + dy}`
    const above = posKey(0, -1)
    const right = posKey(1, 0)
    const below = posKey(0, 1)
    const left = posKey(-1, 0)

    if (tiles[above] || gy <= 0) bit += 1
    if (tiles[right] || gx >= mx - 1) bit += 2
    if (tiles[below] || gy >= my - 1) bit += 4
    if (tiles[left] || gx <= 0) bit += 8

    this.withSprite.sprite = new Sprite(this, TileSprites.getSpriteConfig(bit))
  }

  public draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)
    //
    // NOTE: leaving this here for future fun with random colors
    //
    // ctx.clearRect(this._pos.x, this._pos.y, this._width, this._height)
    // Primitive.Fill.rect(ctx, this.color, this._bounds, 0)
    //
    // if (gl.debug) {
    //   this.debugDraw(ctx)
    // }
  }
}
