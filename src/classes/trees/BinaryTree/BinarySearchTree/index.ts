import {BinaryTree} from '..';
import {ComparisonFunction} from '../interfaces';
import {BinarySearchTreeConstructor} from './interfaces';

/**
 * Class of a binary search tree representation
 */
export class BinarySearchTree<T> extends BinaryTree<T> {
  private _comparisonFunction?: ComparisonFunction<T>;

  /**
   * A binary search tree class constructor
   * @param {T[]} tree an array representation of a binary search tree (optional)
   * @param {ComparisonFunction<T>} comparisonFunction a custom comparison function (optional)
   */
  constructor({tree, comparisonFunction}: BinarySearchTreeConstructor<T> = {}) {
    super({tree});

    this._comparisonFunction = comparisonFunction;

    this.buildBinarySearchTree();
  }

  /**
   * Insert an element to the binary search tree
   * @param {T} element an element to insert the binary search tree
   */
  insert(element: T): void {
    const isEmpty = this.isEmpty();
    if (isEmpty) {
      super.insert(element);
      return;
    }

    const {parentNodeIndex, isGreater} = this.traverseAndCompare(element, 0);
    if (isGreater) {
      this.insertRightChild(element, parentNodeIndex);
    } else {
      this.insertLeftChild(element, parentNodeIndex);
    }
  }

  /**
   * Traverse the tree and compare the elements until reach its place
   * @param {T} element the element to compare
   * @param {number} comparedNodeIndex the current compared node index
   * @return {object} an object contains the parentNodeIndex and isGreater keys, related to the element's position
   */
  traverseAndCompare(element: T, comparedNodeIndex: number): {parentNodeIndex: number, isGreater: boolean} {
    const parentElement = this.element(comparedNodeIndex) as T;
    const leftChild = this.leftChild(comparedNodeIndex);
    const rightChild = this.rightChild(comparedNodeIndex);

    if (this.greaterThan(element, parentElement)) {
      return rightChild === null ?
        {parentNodeIndex: comparedNodeIndex, isGreater: true} :
        this.traverseAndCompare(element, rightChild);
    }

    return leftChild === null ?
        {parentNodeIndex: comparedNodeIndex, isGreater: false} :
        this.traverseAndCompare(element, leftChild);
  }

  /**
   * Checks if a is greater than b
   * @param {T} a the first element for the comparison
   * @param {T} b the second element for the comparison
   * @return {boolean} true if a is greater than b, false otherwise
   */
  private greaterThan(a: T, b: T): boolean {
    if (this._comparisonFunction) {
      return this._comparisonFunction(a, b) > 0;
    }
    return a > b;
  }

  /**
   * Build a binary search tree out of a tree representation
   */
  private buildBinarySearchTree(): void {}
}
