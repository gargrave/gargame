import { mergeWhereDefined } from '@gargrave/growbag'

import { Log } from '../Log'
import { State } from './State'

const NOOP = () => void 0

// eslint-disable-next-line @typescript-eslint/camelcase
const err__invalidStateKey = (key: string) =>
  `StateMachine.gotoState() :: invalid state "${key}" received. 
Ensure that you have added this state key with StateMachine.addState() before attempting to activate it.`

export type StateMap<T> = {
  [key: string]: State<T>
}

type RequiredProps = {}

type OptionalProps<T> = {
  onStateChanged: (newState: State<T>, prevState: State<T>) => void
}

type Props<T> = RequiredProps & OptionalProps<T>
export type StateMachineProps<T> = RequiredProps & Partial<OptionalProps<T>>

const DEFAULT_PROPS: OptionalProps<unknown> = Object.freeze({
  onStateChanged: NOOP,
})

export class StateMachine<T> {
  private host: T
  private props: Props<T>

  private stateMap: StateMap<T> = {}
  private _currentState: State<T>
  private _nextState: State<T> | undefined

  get currentState(): State<T> { return this._currentState } // prettier-ignore
  get nextState(): State<T> | undefined { return this._nextState } // prettier-ignore

  constructor(host: T, props: StateMachineProps<T>) {
    this.host = host
    this.props = mergeWhereDefined(DEFAULT_PROPS, props)
  }

  private _handleStateChange() {
    if (!this._nextState) return

    const prevState = this._currentState
    const nextState = this._nextState

    if (prevState) {
      prevState.exit(nextState)
    }
    nextState.enter(prevState)

    this._currentState = nextState
    this._nextState = undefined

    this.props.onStateChanged(nextState, prevState)
  }

  // ============================================================
  //  State mgmt methods
  // ============================================================
  // TODO: maybe update this to take a Array of state, or a full StateMap
  public addState(key: string, state: State<T>) {
    this.stateMap[key] = state
  }

  public gotoState(key: string, waitForNextFrame = true) {
    const nextState = this.stateMap[key]
    if (!nextState) {
      Log.warn(err__invalidStateKey(key))
    }
    if (nextState.is(this._currentState)) return

    this._nextState = nextState

    if (!waitForNextFrame) {
      this._handleStateChange()
    }
  }

  // ============================================================
  //  Update methods
  // ============================================================
  public earlyUpdate(dt: number) {
    if (this._nextState) {
      this._handleStateChange()
    }
    this._currentState.earlyUpdate(dt)
  }

  public update(dt: number) {
    this._currentState.update(dt)
  }

  public lateUpdate(dt: number) {
    this._currentState.lateUpdate(dt)
  }
}
