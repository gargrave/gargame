export interface Updateable {
  earlyUpdate?: (dt: number) => void
  update: (dt: number) => void
  lateUpdate?: (dt: number) => void
}
