import { get } from '@gargrave/growbag'

import { StateMachine } from './StateMachine'

export abstract class State<T> {
  private static nextId = 0

  protected _stateId = ++State.nextId // eslint-disable-line
  protected stateMachine: StateMachine<T>
  protected host: T

  protected constructor(stateMachine: StateMachine<T>, host: T) {
    this.stateMachine = stateMachine
    this.host = host
  }

  public enter(prevState: State<T>) {}
  public exit(nextState: State<T>) {}

  /**
   * Returns whether this state is the same as "otherState".
   *
   * Note that this is an _instance_ check, so even two instances of the same State
   * class will return false here.
   * @param otherState
   */
  public is(otherState: State<T>) {
    return get(this, '_stateId') === get(otherState, '_stateId')
  }

  abstract earlyUpdate(dt: number): void
  abstract update(dt: number): void
  abstract lateUpdate(dt: number): void
}
