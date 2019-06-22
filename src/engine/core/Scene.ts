import { Entity, GuiObject } from '../core'
import { Drawable, DrawableGUI, Updateable } from '../interfaces'

export default class Scene implements Drawable, DrawableGUI, Updateable {
  protected entities: Entity[] = []
  protected guiObjects: GuiObject[] = []

  constructor() {}

  public enter() {}

  public exit() {
    this.entities = []
    this.guiObjects = []
  }

  public add(e: Entity) {
    this.entities.push(e)
  }

  public addGuiObject(g: GuiObject) {
    this.guiObjects.push(g)
  }

  public earlyUpdate(dt: number) {
    for (const e of this.entities) e.earlyUpdate && e.earlyUpdate(dt)
    for (const g of this.guiObjects) g.earlyUpdate && g.earlyUpdate(dt)
  }

  public update(dt: number) {
    for (const e of this.entities) e.update(dt)
    for (const g of this.guiObjects) g.update(dt)
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
