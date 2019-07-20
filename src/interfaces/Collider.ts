export interface Collidable {
  overlaps(other: Collidable): boolean
}

export interface Collider extends Collidable {
  readonly active: boolean

  activate(): void
  deactivate(): void
}
