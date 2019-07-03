export const MAP_SIZE = [40, 23]
export const MAPS_PER_ROW = 6
export const MAX_LEVEL = 17
export const TILE_SIZE = 32

/* eslint-disable sort-keys */
export const COLORS = {
  BLACK: { r: 0, g: 0, b: 0, a: 255 },
  BLUE: { r: 0, g: 0, b: 255, a: 255 },
  RED: { r: 255, g: 0, b: 0, a: 255 },
  WHITE: { r: 255, g: 255, b: 255, a: 255 },
  YELLOW: { r: 255, g: 255, b: 0, a: 255 },
}

export const TILES = {
  SIGN: COLORS.BLUE,
  EMPTY: COLORS.BLACK,
  PLAYER: COLORS.RED,
  SOLID: COLORS.WHITE,
  STAR: COLORS.YELLOW,
}
