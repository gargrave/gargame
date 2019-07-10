import { SoundFile } from '../resources/SoundFile'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioContextCtor =
  (window as any).AudioContext || (window as any).webkitAudioContext

export class Sound {
  private static _ctx: AudioContext

  static get ctx() { return Sound._ctx } // prettier-ignore

  private constructor() {}

  public static init() {
    Sound._ctx = new AudioContextCtor()
  }

  public static playSound(soundFile: SoundFile) {
    const source = Sound._ctx.createBufferSource()
    source.buffer = soundFile.buffer
    source.connect(Sound._ctx.destination)
    source.start()
  }
}
