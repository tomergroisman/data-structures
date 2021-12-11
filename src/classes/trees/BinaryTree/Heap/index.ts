import {BinaryTree} from '..';
import {Node} from '../interfaces';

import {HeapType, PercolationDirection} from './interfaces';

/**
 * Class of a priority queue representation
 */
export class Heap extends BinaryTree<number> {
  private _type: HeapType;

  /**
   * A queue priority class constructor
   * @param {HeapType} type the type of the prioritized queue (min or max)
   * @param {number[]} tree an array representation of a priority queue (optional)
   */
  constructor(type: HeapType, tree?: number[]) {
    super(tree);

    this._type = type;
  }

  /**
   *
   * @param {number} element an element to add to the queue
   */
  insert(element: number): void {
    super.insert(element);
    this.percolateUp();
  }

  /**
   * Extract the root node from the heap
   * @return {number | null} the first element of the queue
   */
  extract(): number | null {
    const root = this.root;

    if (root !== null) {
      const mostRightLeafNodeIndex = this.mostRightLeafNodeIndex;
      this.swap(0, mostRightLeafNodeIndex);
      this.remove(mostRightLeafNodeIndex);
      this.percolateDown();
    }

    return root;
  }

  /**
   * Peek at the first element of the queue without dequeueing it
   * @return {number | null} the first element of the queue
   */
  peek(): number | null {
    return this.root;
  }

  /**
   * Percolate a node up the tree (default most right leaf)
   * @param {number} nodeIndex a node index
   */
  private percolateUp(nodeIndex = this.mostRightLeafNodeIndex): void {
    const isEmpty = this.isEmpty();
    if (isEmpty) return;

    const isRoot = this.isRoot(nodeIndex);
    if (isRoot) return;

    const node = this.element(nodeIndex) as number;

    const parentNodeIndex = this.parent(nodeIndex) as number;
    const parent = this.element(parentNodeIndex) as number;

    this.compareAndPercolate(
        PercolationDirection.UP,
        {element: node, index: nodeIndex},
        {element: parent, index: parentNodeIndex},
    );
  };

  /**
   * Percolate a node down the tree (default root node)
   * @param {number} nodeIndex a node index
   */
  private percolateDown(nodeIndex: number = 0) {
    const isEmpty = this.isEmpty();
    if (isEmpty) return;

    const isLeaf = this.isLeaf(nodeIndex);
    if (isLeaf) return;

    const leftChildNodeIndex = this.leftChild(nodeIndex) as number;
    const rightChildNodeIndex = this.rightChild(nodeIndex);

    const hasRightChild = rightChildNodeIndex !== null;

    const node = this.element(nodeIndex) as number;
    const leftChild = this.element(leftChildNodeIndex) as number;
    const rightChild = hasRightChild ? this.element(rightChildNodeIndex) as number : null;

    if (rightChild) {
      switch (this._type) {
        case HeapType.MAX: {
          const candidateIndex = leftChild > rightChild ? leftChildNodeIndex! : rightChildNodeIndex!;
          const candidate = leftChild > rightChild ? leftChild : rightChild!;

          this.compareAndPercolate(
              PercolationDirection.DOWN,
              {element: node, index: nodeIndex},
              {element: candidate, index: candidateIndex},
          );
          return;
        }
        case HeapType.MIN: {
          const candidateIndex = leftChild < rightChild ? leftChildNodeIndex! : rightChildNodeIndex!;
          const candidate = leftChild < rightChild ? leftChild : rightChild!;
          this.compareAndPercolate(
              PercolationDirection.DOWN,
              {element: node, index: nodeIndex},
              {element: candidate, index: candidateIndex},
          );
          return;
        }
      }
    } else {
      this.compareAndPercolate(
          PercolationDirection.DOWN,
          {element: node, index: nodeIndex},
          {element: leftChild, index: leftChildNodeIndex},
      );
    }
  };

  /**
   * Compare a node to a swap candidate
   * swap and call percolation method if comparison succeeded
   * @param {number} direction the percolation direction
   * @param {Node<number>} node a node
   * @param {Node<number>} candidate a candidate node
   */
  private compareAndPercolate(direction: PercolationDirection, node: Node<number>, candidate: Node<number>): void {
    const percolationMethod = direction === PercolationDirection.UP ?
      this.percolateUp.bind(this) :
      this.percolateDown.bind(this);

    switch (this._type) {
      case HeapType.MAX: {
        if (direction === PercolationDirection.UP) {
          if (candidate.element! < node.element!) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        if (direction === PercolationDirection.DOWN) {
          if (node.element! < candidate.element!) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        return;
      }
      case HeapType.MIN: {
        if (direction === PercolationDirection.UP) {
          if (candidate.element! > node.element!) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        if (direction === PercolationDirection.DOWN) {
          if (node.element! > candidate.element!) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        return;
      }
    }
  }

  /**
   * Returns the most right leaf index
   * @return {number} the most right leaf index
   */
  private get mostRightLeafNodeIndex(): number {
    const lastNodeIndex = this.size - 1;
    return lastNodeIndex;
  }
}
