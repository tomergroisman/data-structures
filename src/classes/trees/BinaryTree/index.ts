/**
 * Class of a binary tree representation
 */
export class BinaryTree<T> {
  private _tree: (T | null)[];
  private _nodes: number[];

  /**
   * A binary tree class constructor
   * @param {(T | null)[]} tree An array representation of a binary tree (optional)
   */
  constructor(tree?: (T | null)[]) {
    this._tree = tree ?? [];
    this._nodes = this._getNodeNumToIndexMap();
  }

  /**
   * Returns the number of nodes of the tree
   * @return {number} The size of the tree (number of nodes)
   */
  get size(): number {
    return this._nodes.length;
  }

  /**
   * Get a node of the tree
   * @param {number} nodeNum A node index number
   * @return {T | null} The value of the node
   * @throws {RangeError} NodeNum is not a valid node
   */
  node(nodeNum: number): T| null {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    return this._tree[nodeIndex];
  }

  /**
   * Returns the parent of a node or null if the node is the root
   * @param {number} nodeNum A node index number
   * @return {T | null} The value of the parent node
   * @throws {RangeError} NodeNum is not a valid node
   */
  parent(nodeNum: number): T | null {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    const parentIndex = Math.floor((nodeIndex - 1) / 2);
    return this._tree[parentIndex] ?? null;
  }

  /**
   * Get the parent node tree index
   * @param {number} nodeNum A node index number
   * @return {number} The parent node tree index
   */
  parentNodeNum(nodeNum: number): number {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    const parentIndex = Math.floor((nodeIndex - 1) / 2);
    return parentIndex;
  }

  /**
   * Returns the left chide of a node or null if the left child is missing
   * @param {number} nodeNum A node index number
   * @return {T | null} The value of the left child node
   * @throws {RangeError} NodeNum is not a valid node
   */
  leftChild(nodeNum: number): T | null {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    const leftChildIndex = ((nodeIndex + 1) * 2) - 1;
    return this._tree[leftChildIndex] ?? null;
  }

  /**
   * Returns the right chide of a node or null if the right child is missing
   * @param {number} nodeNum A node index number
   * @return {T | null} The value of the right child node
   * @throws {RangeError} NodeNum is not a valid node
   */
  rightChild(nodeNum: number): T | null {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    const rightChildIndex = (nodeIndex + 1) * 2;
    return this._tree[rightChildIndex] ?? null;
  }

  /**
   * Get the root element of the tree
   * @return {T | null} the root element
   */
  get root(): T | null {
    return this._tree[0] ?? null;
  }

  /**
   * Add a new node to the end of the tree
   * @param {T} node The node to add
   */
  addNode(node: T | null): void {
    const nIndexes = this._tree.push(node);
    if (node !== null) {
      this._nodes.push(nIndexes - 1);
    };
  }

  /**
   * Swap between two nodes
   * @param {number} nodeNum1 First node to swap
   * @param {number} nodeNum2 Second node to swap
   */
  swap(nodeNum1: number, nodeNum2: number): void {
    if (this.isNode(nodeNum1) && this.isNode(nodeNum2)) {
      const index1 = this._nodeNumToIndex(nodeNum1);
      const index2 = this._nodeNumToIndex(nodeNum2);

      const key1 = this._tree[index1];
      const key2 = this._tree[index2];

      this._tree[index1] = key2;
      this._tree[index2] = key1;
    }
  }

  /**
   * Returns the depth of a node
   * @param {number} nodeNum A node index number
   * @return {number} The depth of the node
   * @throws {RangeError} NodeNum is not a valid node
   */
  depth(nodeNum: number): number {
    const nodeIndex = this._nodeNumToIndex(nodeNum);
    return this._depthOfIndex(nodeIndex);
  }

  /**
   * Returns the most right leaf index
   * @return {number} The most right leaf index
   */
  get mostRightLeaf(): number {
    const lastNodeNumber = this.size - 1;
    return this._nodeNumToIndex(lastNodeNumber);
  }

  /**
   * Returns true if the node is a valid node, false otherwise
   * @param {number} nodeNum A node index number
   * @return {boolean} True of the node is a valid node, false otherwise
   */
  isNode(nodeNum: number): boolean {
    return this._nodes[nodeNum] !== undefined;
  }

  /**
   * Returns true if the node is a leaf, false otherwise
   * @param {number} nodeNum A node index number
   * @return {boolean} True if the node is a leaf, false otherwise
   * @throws {RangeError} NodeNum is not a valid node
   */
  isLeaf(nodeNum: number): boolean {
    const hasNoLeftChild = !this.leftChild(nodeNum);
    const hasNoRightChild = !this.rightChild(nodeNum);
    return hasNoLeftChild && hasNoRightChild;
  }

  /**
   * Returns a string representation of the tree
   * @return {string} A string representation of the tree
   */
  toString(): string {
    return this._tree.reduce((prev, current, i) => {
      prev += current;
      this._isLastInDepthLevel(i);
      if (this._isLastInDepthLevel(i)) {
        return prev + '\n';
      }
      return prev + ' ';
    }, '').slice(0, -1);
  }

  // /**
  //  * Returns the most right leaf index
  //  * @return {T | null} The most right leaf
  //  */
  // _getMostRightLeaf(): T | null {
  //   return this._tree[this._getMostRightLeafIndex()];
  // }


  /**
   * Returns true if the tree index is a valid tree index, false otherwise
   * @param {number} index The tree index
   * @return {boolean} True if the tree index is a valid tree index, false otherwise
   */
  _isIndexValid(index: number): boolean {
    return 0 <= index && index > this._tree.length;
  }

  /**
   * Returns a tree index number of this node index number
   * @param {number} nodeNum A node index number
   * @return {number} The tree index of this node index number
   * @throws {RangeError} NodeNum is not a valid node
   */
  _nodeNumToIndex(nodeNum: number): number {
    if (this.isNode(nodeNum)) {
      return this._nodes[nodeNum];
    }
    throw new RangeError('Node number is out of range');
  }

  /**
   * Generate a map from node index to tree index (ignoring null nodes)
   * @return {number[]} An array map from node index to tree index
   */
  _getNodeNumToIndexMap(): number[] {
    return this._tree.reduce<number[]>((prev, current, i) => {
      if (current !== null) {
        prev.push(i);
      }
      return prev;
    }, []);
  }

  /**
   * Returns the depth of an index
   * @param {number} index A tree index
   * @return {number} The depth of the tree index
   * @throws {RangeError} NodeNum is not a valid node
   */
  _depthOfIndex(index: number): number {
    if (this._isIndexValid(index)) {
      throw new RangeError('Index number is out of range');
    }
    return Math.floor(Math.log2(index + 1));
  }

  /**
   * Returns rue if the node is tree index is last in the depth level
   * @param {number} index The index of the tree index
   * @return {boolean} True if the node is tree index is last in the depth level
   */
  _isLastInDepthLevel(index: number): boolean {
    const depth = this._depthOfIndex(index);
    return depth !== this._depthOfIndex(index + 1);
  }
}
