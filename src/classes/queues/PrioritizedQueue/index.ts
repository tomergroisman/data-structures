import {BinaryTree} from '../../trees/BinaryTree';
import {PriorityQueueType} from './interfaces';

/**
 * Class of a priority queue representation
 */
export class PriorityQueue<T> extends BinaryTree<T> {
  private _type: PriorityQueueType;

  /**
   * A queue priority class constructor
   * @param {PrioritizedQueueType} type The type of the prioritized queue (min or max)
   * @param {T[]} queue An array representation of a priority queue (optional)
   */
  constructor(type: PriorityQueueType, queue?: T[]) {
    super(queue);

    this._type = type;
  }

  /**
   *
   * @param {T} element An element to add to the queue
   */
  enqueue(element: T) {
    this.addNode(element);
    this._percolateUp();
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
   * @param {number} nodeNum A node index number
   */
  _percolateUp(nodeNum = this.mostRightLeaf): void {
    const parentNodeNum = this.parentNodeNum(nodeNum);


    const node = this.node(nodeNum);
    const parent = this.parent(nodeNum);

    if (node && parent) {
      switch (this._type) {
        case PriorityQueueType.MAX: {
          if (parent < node) {
            this.swap(nodeNum, parentNodeNum);
            this._percolateUp(parentNodeNum);
          }
          break;
        }
        case PriorityQueueType.MIN: {
          if (parent > node) {
            this.swap(nodeNum, parentNodeNum);
            this._percolateUp(parentNodeNum);
          }
          break;
        }
      }
    }
  }

  // _percolateDown(nodeNum: number) {}
}
