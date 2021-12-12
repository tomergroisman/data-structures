import {ComparisonFunction} from '../interfaces';

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
