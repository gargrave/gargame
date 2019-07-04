import { clamp } from '@gargrave/ggdash'
import {
  Animation,
  Assets,
  Entity,
  Globals as gl,
  WithAnimation,
} from '../../engine'

import { CollisionGroup } from '../config/collisionGroups'
import { GRAVITY, TERMINAL_VELOCITY } from '../config/constants'

const D = 68
const A = 65

export class Player extends Entity {
  private readonly animator: WithAnimation

  private readonly gravClamper

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

    this.gravClamper = clamp(0, TERMINAL_VELOCITY)
  }

  private updateGravity(_dt: number) {
    this._currentSpeed.y = this.gravClamper(
      this._currentSpeed.y + GRAVITY * _dt * 0.5,
    )
  }

  public update(dt: number) {
    super.update(dt)

    const _dt = dt / 1000.0
    const sceneColl = gl.scene.collisionHandler

    //===================================================
    // vertical collision checks
    //===================================================
    this.updateGravity(_dt)
    this._collRect.translateFrom(this._bounds, 0, this._currentSpeed.y)

    const collY = sceneColl.getFirstCollision(this, CollisionGroup.tile)
    if (collY) {
      this._pos.y = collY.pos.y - this._height
      this._currentSpeed.y = 0
    }

    //===================================================
    // horizontal collision checks
    //===================================================
    let velX = 0
    if (gl.input.isDown(D)) velX += 1
    if (gl.input.isDown(A)) velX -= 1

    this._currentSpeed.x = velX * this._speed * _dt
    this._collRect.translateFrom(this._bounds, this._currentSpeed.x, 0)

    const collX = sceneColl.getFirstCollision(this, CollisionGroup.tile)
    if (collX) {
      if (this._currentSpeed.x > 0) {
        this._pos.x = collX.pos.x - this._width
      } else if (this._currentSpeed.x < 0) {
        this._pos.x = collX.bounds.right
      }

      this._currentSpeed.x = 0
    }

    //===================================================
    // animation state updates
    //===================================================
    if (this._currentSpeed.y !== 0) {
      this.animator.setCurrent('fall')
    } else if (this._currentSpeed.x !== 0) {
      this.animator.setCurrent('run')
    } else {
      this.animator.setCurrent('idle')
    }

    this.move()
    this.updateGravity(_dt)
  }
}
