import {BinaryTree} from '..';

import {HeapType} from './interfaces';

/**
 * Class of a priority queue representation
 */
export class Heap<T> extends BinaryTree<T> {
  private _type: HeapType;

  /**
   * A queue priority class constructor
   * @param {HeapType} type The type of the prioritized queue (min or max)
   * @param {T[]} tree An array representation of a priority queue (optional)
   */
  constructor(type: HeapType, tree?: T[]) {
    super(tree);

    this._type = type;
  }

  /**
   *
   * @param {T} element An element to add to the queue
   */
  insert(element: T) {
    super.insert(element);
    this.percolateUp();
  }


  /**
   * Peek at the first element of the queue without dequeueing it
   * @return {T | null} the first element of the queue
   */
  peek(): T | null {
    return this.root;
  }

  /**
   * Percolate a node up (default most right leaf)
   * @param {number} nodeIndex A node index
   */
  private percolateUp(nodeIndex = this.mostRightLeafTreeIndex): void {
    const parentNodeIndex = this.parent(nodeIndex);

    const isRoot = parentNodeIndex === null;
    if (isRoot) return;

    const node = this.element(nodeIndex);
    const parent = this.element(parentNodeIndex);

    if (node && parent) {
      switch (this._type) {
        case HeapType.MAX: {
          if (parent < node) {
            this.swap(nodeIndex, parentNodeIndex);
            this.percolateUp(parentNodeIndex);
          }
          return;
        }
        case HeapType.MIN: {
          if (parent > node) {
            this.swap(nodeIndex, parentNodeIndex);
            this.percolateUp(parentNodeIndex);
          }
          return;
        }
      }
    }
  }

  // _percolateDown(nodeNum: number) {}

  /**
   * Returns the most right leaf index
   * @return {number} The most right leaf index
   */
  private get mostRightLeafTreeIndex(): number {
    const lastNodeIndex = this.size - 1;
    return this.getTreeIndex(lastNodeIndex);
  }
}
