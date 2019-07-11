import { Sound } from './Sound'

class AudioContext {}
const _window = window as any // eslint-disable-line
_window.AudioContext = AudioContext

describe('Sound', () => {
  describe('initialization', () => {
    it('initializes correctly', () => {
      expect(() => Sound.ctx).toThrow() // test that it throws error before initializing

      Sound.init()
      expect(Sound.ctx).toBeDefined()
    })
  })
})
