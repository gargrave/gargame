export default interface Loadable {
  load(): Promise<boolean>
}
