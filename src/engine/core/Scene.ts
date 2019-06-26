import { Drawable } from '../interfaces/Drawable'
import { DrawableGUI } from '../interfaces/DrawableGUI'
import { Updateable } from '../interfaces/Updateable'

import { Game } from './Game'
import { Entity } from './Entity'
import { GuiObject } from './GuiObject'

export class Scene implements Drawable, DrawableGUI, Updateable {
  private entities: Entity[] = []
  private guiObjects: GuiObject[] = []

  protected game: Game
  protected collidableEntities: { [key: string]: Entity[] } = {}

  constructor(game: Game) {
    this.game = game
  }

  public enter() {}

  public exit() {
    this.entities = []
    this.guiObjects = []
  }

  public add(entity: Entity) {
    this.entities.push(entity)
    const coll = entity.collisionGroups || []
    coll.forEach(c => {
      if (!(c in this.collidableEntities)) {
        this.collidableEntities[c] = []
      }

      this.collidableEntities[c].push(entity)
    })
  }

  public addGuiObject(g: GuiObject) {
    this.guiObjects.push(g)
  }

  // TODO: need  a way of safely removing Entities

  public earlyUpdate(dt: number) {
    for (const e of this.entities) e.earlyUpdate && e.earlyUpdate(dt)
    for (const g of this.guiObjects) g.earlyUpdate && g.earlyUpdate(dt)
  }

  public update(dt: number) {
    for (const e of this.entities) e.update(dt)
    for (const g of this.guiObjects) g.update(dt)

    Object.entries(this.collidableEntities).forEach(([group, entities]) => {
      //TODO: make a Lodash like get-function for this
      const collWith = (this.game.collGroups[group] || {}).collidesWith || []
      collWith.forEach(targetColl => {
        const targets = this.collidableEntities[targetColl]
        if (targets.length) {
          entities.forEach(e => {
            targets.forEach(t => {
              if (e.bounds.overlaps(t.bounds)) {
                e.onCollision(targetColl, t)
              }
            })
          })
        }
      })
    })
  }

  public lateUpdate(dt: number) {
    for (const e of this.entities) e.lateUpdate && e.lateUpdate(dt)
    for (const g of this.guiObjects) g.lateUpdate && g.lateUpdate(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const e of this.entities) {
      e.draw(ctx)
    }
  }

  public drawGUI(ctx: CanvasRenderingContext2D) {
    for (const g of this.guiObjects) {
      g.drawGUI(ctx)
    }
  }
}
