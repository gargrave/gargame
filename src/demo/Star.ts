import {
  Assets,
  Entity,
  Globals as gl,
  Sprite,
  SpriteConfig,
  WithSprite,
} from '../engine'

import { CollisionGroup } from './config/collisionGroups'

export class Star extends Entity {
  constructor(x, y) {
    super({
      collisionGroups: [CollisionGroup.star],
      height: 32,
      width: 32,
      x,
      y,
    })

    const config: SpriteConfig = {
      height: 32,
      texture: Assets.texture('star'),
      width: 32,
    }
    const sprite = new Sprite(this, config)
    this.addBehavior(new WithSprite(this, sprite))
  }

  public onCollisionEnter(group: string, other: Entity) {
    if (group === 'player') {
      this.deactivate()
      gl.scene.addToDestroyQueue(this)
    }
  }
}
