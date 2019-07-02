export type CurriedNumberFn = (x: number) => number
export type CurriedUnaryFn<T, R> = (x: T) => R
export type PartiallyAppliedBinaryFn<T, R> = (x: T, y: T) => R
