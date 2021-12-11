export interface HeapConstructor<T> {
  type: HeapType,
  tree?: T[],
  comparisonFunction?: ComparisonFunction<T>
}

export enum HeapType {
  MIN = 'min',
  MAX = 'max'
}

export enum PercolationDirection {
  UP = 'up',
  DOWN = 'down',
}

export type ComparisonFunction<T> = (a: T, b: T) => number;
