export interface Collider {
  readonly active: boolean

  activate(): void
  deactivate(): void

  overlaps(other: any): boolean
}
