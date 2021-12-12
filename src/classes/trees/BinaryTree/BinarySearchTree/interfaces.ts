import {ComparisonFunction} from '../interfaces';

export interface BinarySearchTreeConstructor<T> {
  tree?: T[],
  comparisonFunction?: ComparisonFunction<T>
}
