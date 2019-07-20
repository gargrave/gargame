/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from '../../core/Entity'
import { State } from './State'
import { StateMachine, StateMachineProps } from './StateMachine'

class TestEntity extends Entity {
  constructor() {
    super({})
  }
}

class TestState extends State<TestEntity> {
  constructor(stateMachine: StateMachine<TestEntity>) {
    super(stateMachine, {} as any)
  }

  public earlyUpdate(dt: number) {}
  public update(dt: number) {}
  public lateUpdate(dt: number) {}
}

describe('StateMachine', () => {
  let ent: TestEntity
  let sm: StateMachine<TestEntity>
  let state1: State<TestEntity>
  let state2: State<TestEntity>
  let props: StateMachineProps<TestEntity>

  beforeEach(() => {
    props = {
      onStateChanged: jest.fn(),
    }

    ent = new TestEntity()
    sm = new StateMachine(ent, props)
    state1 = new TestState(sm)
    state2 = new TestState(sm)
    sm.addState('1', state1)
    sm.addState('2', state2)

    sm.gotoState('1', false)
  })

  describe('state adding', () => {
    it('correctly adds individual states', () => {
      expect(sm.getState('hi')).toBeUndefined()
      sm.addState('hi', state1)
      expect(sm.getState('hi')).toBe(state1)

      // states at the same key will be silently overwritten
      sm.addState('hi', state2)
      expect(sm.getState('hi')).toBe(state2)
    })

    it('correctly adds multiple states', () => {
      expect(sm.getState('hi')).toBeUndefined()
      expect(sm.getState('hello')).toBeUndefined()

      sm.addStates({
        hello: state2,
        hi: state1,
      })

      expect(sm.getState('hi')).toBe(state1)
      expect(sm.getState('hello')).toBe(state2)

      // overwrites existing states at the requested keys, while adding new ones
      sm.addStates({
        ahoyhoy: state2,
        hello: state1,
        hi: state2,
      })

      expect(sm.getState('ahoyhoy')).toBe(state2)
      expect(sm.getState('hi')).toBe(state2)
      expect(sm.getState('hello')).toBe(state1)
    })
  })

  describe('gotoState', () => {
    it('ignores state change requests when the state is the same instance', () => {
      const { onStateChanged } = props

      expect(sm.nextState).toBeUndefined()
      sm.gotoState('1', false)
      expect(sm.nextState).toBeUndefined()
      expect(onStateChanged).toHaveBeenCalledTimes(1)
    })

    it('processes state changes at next frame start by default (earlyUpdate())', () => {
      const { onStateChanged } = props
      const s1ExitSpy = jest.spyOn(state1, 'exit')
      const s2EnterSpy = jest.spyOn(state2, 'enter')

      expect(onStateChanged).toHaveBeenCalledTimes(1)
      expect(onStateChanged).toHaveBeenCalledWith(state1, undefined)
      expect(sm.currentState).toBe(state1)
      expect(sm.nextState).toBeUndefined()
      sm.gotoState('2')

      // no updates have been processed yet
      expect(sm.currentState).toBe(state1)
      expect(sm.nextState).toBe(state2)

      sm.earlyUpdate(1)
      expect(sm.currentState).toBe(state2)
      expect(sm.nextState).toBeUndefined()
      expect(onStateChanged).toHaveBeenCalledTimes(2)
      expect(onStateChanged).toHaveBeenCalledWith(state2, state1)
      expect(s1ExitSpy).toHaveBeenCalledTimes(1)
      expect(s1ExitSpy).toHaveBeenCalledWith(state2)
      expect(s2EnterSpy).toHaveBeenCalledWith(state1)
    })

    it('processes state changes immediately when requested', () => {
      const { onStateChanged } = props

      expect(sm.currentState).toBe(state1)
      sm.gotoState('2', false)
      expect(sm.currentState).toBe(state2)
      expect(onStateChanged).toHaveBeenCalledTimes(2)
      expect(onStateChanged).toHaveBeenCalledWith(state2, state1)
    })

    it('calls all update/draw methods on current state', () => {
      const earlyUpdateSpy = jest.spyOn(state1, 'earlyUpdate')
      const updateSpy = jest.spyOn(state1, 'update')
      const lateUpdateSpy = jest.spyOn(state1, 'lateUpdate')

      expect(earlyUpdateSpy).not.toHaveBeenCalled()
      expect(updateSpy).not.toHaveBeenCalled()
      expect(lateUpdateSpy).not.toHaveBeenCalled()

      sm.earlyUpdate(9)
      expect(earlyUpdateSpy).toHaveBeenCalledTimes(1)
      expect(earlyUpdateSpy).toHaveBeenCalledWith(9)
      expect(updateSpy).not.toHaveBeenCalled()
      expect(lateUpdateSpy).not.toHaveBeenCalled()
      sm.update(42)
      expect(updateSpy).toHaveBeenCalledTimes(1)
      expect(updateSpy).toHaveBeenCalledWith(42)
      expect(lateUpdateSpy).not.toHaveBeenCalled()
      sm.lateUpdate(217)
      expect(lateUpdateSpy).toHaveBeenCalledTimes(1)
      expect(lateUpdateSpy).toHaveBeenCalledWith(217)
    })
  })
})
