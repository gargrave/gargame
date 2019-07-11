import { SoundFile } from '../resources/SoundFile'
import { Globals as gl } from '../Globals'

const ERR_NO_INIT =
  'Sound.ctx is undefined. Be sure to call Sound.init() before attempting to access the AudioContext.'

export class Sound {
  private constructor() {}

  private static _ctx: AudioContext

  static get ctx() {
    if (Sound._ctx) return Sound._ctx
    throw new Error(ERR_NO_INIT)
  }

  public static init() {
    const _window = window as any // eslint-disable-line
    const AudioContextCtor = _window.AudioContext || _window.webkitAudioContext
    Sound._ctx = new AudioContextCtor()
  }

  public static playSound(soundFile: SoundFile) {
    if (!gl.settings.enableSound) return

    const source = Sound._ctx.createBufferSource()
    source.buffer = soundFile.buffer
    source.connect(Sound._ctx.destination)
    source.start()
  }
}
