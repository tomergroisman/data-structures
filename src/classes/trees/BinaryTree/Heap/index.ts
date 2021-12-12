import {BinaryTree} from '..';
import {ComparisonFunction, Element, Node} from '../interfaces';

import {
  HeapConstructor,
  HeapType,
  PercolationDirection,
} from './interfaces';

/**
 * Class of a heap representation
 */
export class Heap<T> extends BinaryTree<T> {
  private _type: HeapType;
  private _comparisonFunction?: ComparisonFunction<T>;

  /**
   * A heap class constructor
   * @param {HeapType} type the type of the heap (min or max)
   * @param {T[]} tree an array representation of a heap (optional)
   * @param {ComparisonFunction<T>} comparisonFunction a custom comparison function (optional)
   */
  constructor({type, tree, comparisonFunction}: HeapConstructor<T>) {
    super({tree});

    this._type = type;
    this._comparisonFunction = comparisonFunction;

    this.heapify();
  }

  /**
   * Insert an element to the heap
   * @param {T} element an element to insert the heap
   */
  insert(element: T): void {
    super.insert(element);
    this.percolateUp();
  }

  /**
   * Extract the root node from the heap
   * @return {Element<T>} the first element of the queue
   */
  extract(): Element<T> {
    const root = this.root;

    if (root !== null) {
      const mostRightLeafNodeIndex = this.rightMostLeafNodeIndex;
      this.swap(0, mostRightLeafNodeIndex);
      this.remove(mostRightLeafNodeIndex);
      this.percolateDown();
    }

    return root;
  }

  /**
   * Peek at the first element of the queue without dequeueing it
   * @return {Element<T>} the first element of the queue
   */
  peek(): Element<T> {
    return this.root;
  }

  /**
   * Percolate a node up the tree (default most right leaf)
   * @param {number} nodeIndex a node index
   */
  private percolateUp(nodeIndex = this.rightMostLeafNodeIndex): void {
    const isEmpty = this.isEmpty();
    if (isEmpty) return;

    const isRoot = this.isRoot(nodeIndex);
    if (isRoot) return;

    const node = this.element(nodeIndex) as T;

    const parentNodeIndex = this.parent(nodeIndex) as number;
    const parent = this.element(parentNodeIndex) as T;

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

    const node = this.element(nodeIndex) as T;
    const leftChild = this.element(leftChildNodeIndex) as T;
    const rightChild = hasRightChild ? this.element(rightChildNodeIndex) as T : null;

    if (rightChild !== null) {
      switch (this._type) {
        case HeapType.MAX: {
          const candidateIndex = this.greaterThan(leftChild, rightChild) ? leftChildNodeIndex! : rightChildNodeIndex!;
          const candidate = this.greaterThan(leftChild, rightChild) ? leftChild : rightChild!;
          this.compareAndPercolate(
              PercolationDirection.DOWN,
              {element: node, index: nodeIndex},
              {element: candidate, index: candidateIndex},
          );
          return;
        }
        case HeapType.MIN: {
          const candidateIndex = this.lessThan(leftChild, rightChild) ? leftChildNodeIndex! : rightChildNodeIndex!;
          const candidate = this.lessThan(leftChild, rightChild) ? leftChild : rightChild!;
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
   * @param {Node<T>} node a node
   * @param {Node<T>} candidate a candidate node
   */
  private compareAndPercolate(direction: PercolationDirection, node: Node<T>, candidate: Node<T>): void {
    const percolationMethod = direction === PercolationDirection.UP ?
      this.percolateUp.bind(this) :
      this.percolateDown.bind(this);

    switch (this._type) {
      case HeapType.MAX: {
        if (direction === PercolationDirection.UP) {
          const parent = candidate;
          if (this.greaterThan(node.element!, parent.element!)) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        if (direction === PercolationDirection.DOWN) {
          const child = candidate;
          if (this.greaterThan(child.element!, node.element!)) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        return;
      }
      case HeapType.MIN: {
        if (direction === PercolationDirection.UP) {
          const parent = candidate;
          if (this.lessThan(node.element!, parent.element!)) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        if (direction === PercolationDirection.DOWN) {
          const child = candidate;
          if (this.lessThan(child.element!, node.element!)) {
            this.swap(node.index, candidate.index);
            percolationMethod(candidate.index);
          }
        }
        return;
      }
    }
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
   * Checks if a is less than b
   * @param {T} a the first element for the comparison
   * @param {T} b the second element for the comparison
   * @return {boolean} true if a is less than b, false otherwise
   */
  private lessThan(a: T, b: T): boolean {
    if (this._comparisonFunction) {
      return this._comparisonFunction(a, b) < 0;
    }
    return a < b;
  }

  /**
   * Build a heap out of a tree representation
   * @param {number} nodeIndex a node index (optional)
   */
  private heapify(nodeIndex: number = this.rightMostLeafNodeIndex): void {
    const isTreeEmpty = this.isEmpty();
    if (isTreeEmpty) return;

    this.percolateDown(nodeIndex);

    const isRoot = this.isRoot(nodeIndex);
    if (isRoot) return;

    this.heapify(nodeIndex - 1);
  }

  /**
   * Returns the most right leaf index
   * @return {number} the most right leaf index
   */
  private get rightMostLeafNodeIndex(): number {
    const lastNodeIndex = this.size - 1;
    return lastNodeIndex;
  }
}
