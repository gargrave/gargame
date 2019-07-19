import { State } from './State'
import { StateMachine } from './StateMachine'

class TestHost {
  public earlyUpdate(dt: number) {}
  public update(dt: number) {}
  public lateUpdate(dt: number) {}
}

class TestState extends State<TestHost> {
  constructor(sm, host) {
    super(sm, host)
  }

  public earlyUpdate(dt: number) {}
  public update(dt: number) {}
  public lateUpdate(dt: number) {}
}

describe('State', () => {
  let sm: StateMachine<TestHost>
  let state: TestState
  let host: TestHost

  beforeEach(() => {
    host = new TestHost()
    sm = new StateMachine(host, {})
    state = new TestState(sm, host)
  })

  describe('comparison', () => {
    it('returns true for the same State instance', () => {
      expect(state.is(state)).toBe(true)
    })

    it('returns false for different instances', () => {
      const state2 = new TestState(sm, host)
      expect(state.is(state2)).toBe(false)
    })
  })
})
