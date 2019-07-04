export interface Loadable {
  load(): Promise<boolean>
}
