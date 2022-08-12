/**
 * Given a type parameter T, returns a function that would accept
 * a constant that HAS to look like T, and give back that same constant.
 * @returns a function to create constants with type enforcement
 */
export const makeAConstCreator =
  <T>() =>
  <U extends Immutable<T>>(readOnlyStructure: U): U => {
    return readOnlyStructure;
  };

type ImmutablePrimitive =
  | undefined
  | null
  | boolean
  | string
  | number
  | Function;

export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Array<infer U>
  ? ImmutableArray<U>
  : T extends Map<infer K, infer V>
  ? ImmutableMap<K, V>
  : T extends Set<infer M>
  ? ImmutableSet<M>
  : ImmutableObject<T>;

export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
