import { Loadable } from '../interfaces/Loadable'
import { Sound } from '../sound/Sound'

export class SoundFile implements Loadable {
  private readonly path: string

  private _buffer!: AudioBuffer

  get buffer() { return this._buffer } // prettier-ignore

  constructor(path: string) {
    this.path = path
  }

  public load() {
    return new Promise<boolean>((resolve, reject) => {
      fetch(this.path)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
          Sound.ctx.decodeAudioData(arrayBuffer).then(buffer => {
            this._buffer = buffer
            resolve(true)
          })
        })
    })
  }
}
