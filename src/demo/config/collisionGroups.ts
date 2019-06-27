export const CollisionGroup = Object.freeze({
  enemy: 'enemy',
  plant: 'plant',
  player: 'player',
  star: 'star',
  tile: 'tile',
})

export const collisionGroups = {
  [CollisionGroup.enemy]: {},
  [CollisionGroup.player]: {},
  [CollisionGroup.plant]: {},
  [CollisionGroup.star]: {
    collidesWith: ['player'],
  },
  [CollisionGroup.tile]: {},
}
