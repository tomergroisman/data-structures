import {BinaryTreeMaps, Element, Node} from './interfaces';

/**
 * Class of a binary tree representation
 */
export class BinaryTree<T> {
  protected _tree: Node<T>[];
  protected _maps: BinaryTreeMaps;

  /**
   * A binary tree class constructor
   * @param {(Element<T>)[]} tree an array representation of a binary tree (optional)
   */
  constructor(tree?: (Element<T>)[]) {
    this._tree = this.elementsArrayToTree(tree);
    this._maps = this.generateBinaryTreeMaps();
  }

  /**
   * Returns the number of nodes of the tree
   * @return {number} the size of the tree (number of nodes)
   */
  get size(): number {
    return this._maps.nodeToIndex.length;
  }

  /**
   * Get the root element of the tree, or null if the tree is empty
   * @return {Element<T> | null} the root element
   */
  get root(): Element<T> | null {
    return this._tree[0]?.element ?? null;
  }

  /**
   * Get an element of the provided node index
   * @param {number} nodeIndex a node index
   * @return {Element<T> | null} the value of the node
   * @throws {RangeError} node is not a valid node
   */
  element(nodeIndex: number): Element<T> | null {
    const treeIndex = this.getTreeIndex(nodeIndex);
    return this._tree[treeIndex].element as T;
  }

  /**
   * Get the parent node index of the provided node index, or null if the parent is missing
   * @param {number} nodeIndex a node index
   * @return {number | null} the parent node index
   * @throws {RangeError} node is not a valid node
   */
  parent(nodeIndex: number): number | null {
    const treeIndex = this.getTreeIndex(nodeIndex);
    const parentTreeIndex = Math.floor((treeIndex - 1) / 2);
    try {
      const parentNodeIndex = this.getNodeIndex(parentTreeIndex);
      return parentNodeIndex;
    } catch {
      return null;
    }
  }

  /**
   * Returns the left chide node index of the provided node index, or null if the left child is missing
   * @param {number} nodeIndex a node index
   * @return {number | null} the right child node index
   * @throws {RangeError} node is not a valid node
   */
  leftChild(nodeIndex: number): number | null {
    const treeIndex = this.getTreeIndex(nodeIndex);
    const leftChildTreeIndex = ((treeIndex + 1) * 2) - 1;
    try {
      const leftChildNodeIndex = this.getNodeIndex(leftChildTreeIndex);
      return leftChildNodeIndex;
    } catch {
      return null;
    }
  }

  /**
   * Returns the right chide node index of the provided node index, or null if the right child is missing
   * @param {number} nodeIndex a node index
   * @return {number | null} the right child node index
   * @throws {RangeError} node is not a valid node
   */
  rightChild(nodeIndex: number): number | null {
    const treeIndex = this.getTreeIndex(nodeIndex);
    const rightChildTreeIndex = (treeIndex + 1) * 2;
    try {
      const rightChildNodeIndex = this.getNodeIndex(rightChildTreeIndex);
      return rightChildNodeIndex;
    } catch {
      return null;
    }
  }

  /**
   * Returns the depth of the tree
   * @return {number} the tree depth
   */
  get depth(): number {
    return Math.floor(Math.log2(this.size));
  }

  /**
   * Returns the depth of the node index provided
   * @param {number} nodeIndex a node index
   * @return {number} the depth of the node
   * @throws {RangeError} node is not a valid node
   */
  depthOf(nodeIndex: number): number {
    const treeIndex = this.getTreeIndex(nodeIndex);
    return this.depthOfTreeIndex(treeIndex);
  }

  /**
   * Add a new node to the end of the tree
   * @param {Element<T>} element the node to add
   */
  insert(element: Element<T>): void {
    const index = this._tree.length;
    const node: Node<T> = {
      element,
      index,
    };
    this._tree.push(node);
    if (element !== null) {
      this._maps.indexToNode.push(this.size);
      this._maps.nodeToIndex.push(index);
    };
  }

  /**
   * Remove a node from the tree
   * @param {number} nodeIndex a node index
   */
  remove(nodeIndex: number): void {
    const treeIndex = this.getTreeIndex(nodeIndex);
    this._tree.splice(treeIndex, 1);
    this._maps.indexToNode.splice(treeIndex, 1);
    this._maps.nodeToIndex.splice(nodeIndex, 1);
  }

  /**
   * Swap between two nodes
   * @param {number} nodeIndex1 first node to swap
   * @param {number} nodeIndex2 second node to swap
   */
  swap(nodeIndex1: number, nodeIndex2: number): void {
    if (this.isNode(nodeIndex1) && this.isNode(nodeIndex2)) {
      const index1 = this.getTreeIndex(nodeIndex1);
      const index2 = this.getTreeIndex(nodeIndex2);

      const value1 = this._tree[index1];
      const value2 = this._tree[index2];

      value1.index = index2;
      value2.index = index1;

      this._tree[index1] = value2;
      this._tree[index2] = value1;
    }
  }

  /**
   * Returns true if the tree is empty, false otherwise
   * @return {boolean} true of the tree is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns true if the node of the provided node index is a valid node, false otherwise
   * @param {number} nodeIndex a node index
   * @return {boolean} true of the node is a valid node, false otherwise
   */
  isNode(nodeIndex: number): boolean {
    return this._maps.nodeToIndex[nodeIndex] !== undefined;
  }

  /**
   * Returns true if the node is the root node, false otherwise
   * @param {number} nodeIndex a node index number
   * @return {boolean} true if the node is the root node, false otherwise
   * @throws {RangeError} node is not a valid node
   */
  isRoot(nodeIndex: number): boolean {
    const hasNoParent = this.parent(nodeIndex) === null;
    return hasNoParent;
  }

  /**
   * Returns true if the node is a leaf, false otherwise
   * @param {number} nodeIndex a node index number
   * @return {boolean} true if the node is a leaf, false otherwise
   * @throws {RangeError} node is not a valid node
   */
  isLeaf(nodeIndex: number): boolean {
    const hasNoLeftChild = this.leftChild(nodeIndex) === null;
    const hasNoRightChild = this.rightChild(nodeIndex) === null;
    return hasNoLeftChild && hasNoRightChild;
  }

  /**
   * Returns a string representation of the tree
   * @return {string} Aa string representation of the tree
   */
  toString(): string {
    return this._tree.reduce((prev, current, i) => {
      prev += current.element;
      this.isLastInDepthLevel(i);
      if (this.isLastInDepthLevel(i)) {
        return prev + '\n';
      }
      return prev + ' ';
    }, '').slice(0, -1);
  }

  /**
   * Returns true if the tree index is a valid tree index, false otherwise
   * @param {number} treeIndex the tree index
   * @return {boolean} true if the tree index is a valid tree index, false otherwise
   */
  protected isTreeIndexValid(treeIndex: number): boolean {
    return 0 <= treeIndex && treeIndex < this._maps.indexToNode.length;
  }

  /**
   * Returns a tree index of this node index
   * @param {number} nodeIndex a node index
   * @return {number} the tree index of this node index
   * @throws {RangeError} node index is not a valid node
   */
  protected getTreeIndex(nodeIndex: number): number {
    if (this.isNode(nodeIndex)) {
      return this._maps.nodeToIndex[nodeIndex];
    }
    throw new RangeError('Node number is out of range');
  }

  /**
   * Returns a node index of this tree index
   * @param {number} treeIndex a tree index
   * @return {number | null} the node index of this tree index
   * @throws {RangeError} tree index is not a valid index
   */
  protected getNodeIndex(treeIndex: number): number | null {
    if (this.isTreeIndexValid(treeIndex)) {
      return this._maps.indexToNode[treeIndex];
    }
    throw new RangeError('Index is out of range');
  }

  /**
   * Returns true if the tree index is a valid tree index, false otherwise
   * @param {(Element<T>)[]} elements the elements array (optional)
   * @return {boolean} true if the tree index is a valid tree index, false otherwise
   */
  private elementsArrayToTree(elements: (Element<T>)[] = []): Node<T>[] {
    return elements.map((element, i) => ({
      element: element,
      index: i,
    }));
  }

  /**
   * Generate a map from node index to tree index (ignoring null elements)
   * @return {number[]} an array map from node index to tree index
   */
  private generateBinaryTreeMaps(): BinaryTreeMaps {
    return this._tree.reduce<BinaryTreeMaps>((prev, current, treeIndex) => {
      if (current.element !== null) {
        const nodeIndex = prev.nodeToIndex.length;
        prev.nodeToIndex.push(treeIndex);
        prev.indexToNode.push(nodeIndex);
      } else {
        prev.indexToNode.push(null);
      }
      return prev;
    }, {
      nodeToIndex: [],
      indexToNode: [],
    });
  }

  /**
   * Returns the depth of an index
   * @param {number} treeIndex a tree index
   * @return {number} the depth of the tree index
   * @throws {RangeError} node is not a valid node
   */
  private depthOfTreeIndex(treeIndex: number): number {
    if (this.isTreeIndexValid(treeIndex)) {
      return Math.floor(Math.log2(treeIndex + 1));
    }
    throw new RangeError('Index number is out of range');
  }

  /**
   * Returns rue if the node is tree index is last in the depth level
   * @param {number} treeIndex the tree index
   * @return {boolean} true if the node in the provided tree index is the last in the depth level
   */
  private isLastInDepthLevel(treeIndex: number): boolean {
    const depthOfCurrent = this.depthOfTreeIndex(treeIndex);
    const nextTreeIndex = treeIndex + 1;
    if (this.isTreeIndexValid(nextTreeIndex)) {
      const depthOfNext = this.depthOfTreeIndex(nextTreeIndex);
      return depthOfCurrent < depthOfNext;
    }
    return true;
  }
}
