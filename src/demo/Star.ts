import { Assets, Entity, Sprite, SpriteConfig, WithSprite } from '../engine'

export class Star extends Entity {
  constructor() {
    super({
      height: 32,
      width: 32,
      x: 64,
      y: 200,
    })

    const config: SpriteConfig = {
      height: 32,
      texture: Assets.texture('star'),
      width: 32,
    }
    const sprite = new Sprite(this, config)
    this.addBehavior(new WithSprite(this, sprite))
  }
}
