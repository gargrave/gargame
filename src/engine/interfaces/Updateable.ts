export default interface Updateable {
  update: (dt: number) => void
  lateUpdate: (dt: number) => void
}
