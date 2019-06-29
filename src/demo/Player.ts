import {
  Animation,
  Assets,
  Entity,
  Globals as gl,
  WithAnimation,
} from '../engine'

import { CollisionGroup } from './config/collisionGroups'

const D = 68
const A = 65
const W = 87
const S = 83

export class Player extends Entity {
  private readonly animator: WithAnimation

  constructor() {
    super({
      collisionGroups: [CollisionGroup.player],
      height: 66,
      speed: 300,
      width: 34,
      x: 300,
      y: 320,
    })

    const h = this._height
    const w = this._width
    const texture = Assets.texture('player')
    const frameDuration = 100

    const animations = {
      fall: new Animation(this, {
        firstFrame: 3,
        height: h,
        texture: texture,
        width: w,
      }),
      idle: new Animation(this, {
        firstFrame: 0,
        height: h,
        texture: texture,
        width: w,
      }),
      run: new Animation(this, {
        firstFrame: 1,
        frameDuration,
        height: h,
        lastFrame: 2,
        texture: texture,
        width: w,
      }),
    }

    this.animator = new WithAnimation(animations, 'idle')
    this.addBehavior(this.animator)
  }

  public update(dt: number) {
    super.update(dt)

    const vel = { x: 0, y: 0 }
    const i = gl.input

    if (i.isDown(D)) vel.x += 1
    if (i.isDown(A)) vel.x -= 1

    if (i.isDown(W)) vel.y -= 1
    if (i.isDown(S)) vel.y += 1

    const speed = this.speed * (dt / 1000.0)
    const sceneColl = gl.scene.collisionHandler

    this._collRect.translateFrom(this._bounds, vel.x * speed, 0)
    const collX = sceneColl.getFirstCollision(this, CollisionGroup.tile)
    if (collX) {
      if (vel.x > 0) {
        this._pos.x = collX.pos.x - this._width
      } else if (vel.x < 0) {
        this._pos.x = collX.bounds.right
      }

      vel.x = 0
    }

    this._collRect.translateFrom(this._bounds, 0, vel.y * speed)
    const collY = sceneColl.getFirstCollision(this, CollisionGroup.tile)
    if (collY) {
      if (vel.y > 0) {
        this._pos.y = collY.pos.y - this._height
      } else if (vel.y < 0) {
        this._pos.y = collY.bounds.bottom
      }

      vel.y = 0
    }

    if (vel.y !== 0) {
      this.animator.setCurrent('fall')
    } else if (vel.x !== 0) {
      this.animator.setCurrent('run')
    } else {
      this.animator.setCurrent('idle')
    }

    this.move(vel.x * speed, vel.y * speed)
  }
}
