import {BinaryTreeConstructor, BinaryTreeMaps, Child, Element, Node} from './interfaces';

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
  constructor({tree}: BinaryTreeConstructor<T> = {}) {
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
   * Insert a new node to the end of the tree
   * @param {Element<T>} element the element to insert
   */
  insert(element: Element<T>): void {
    const newTreeIndex = this._tree.length;
    const newNodeIndex = this.size;
    const newNode = this.createNode(element, newTreeIndex);

    this.insertToTree(newNode, newNodeIndex, newTreeIndex);
  }

  /**
   * Insert a new node as a left child os a existing node
   * @param {Element<T>} element the element to insert
   * @param {number} nodeIndex the upcoming parent node index
   * @throws {RangeError} node is not a valid node
   */
  insertLeftChild(element: Element<T>, nodeIndex: number): void {
    const leftChildNodeIndex = this.leftChild(nodeIndex);
    const hasLeftChild = leftChildNodeIndex !== null;
    if (hasLeftChild) {
      this.replace(element, leftChildNodeIndex);
    } else {
      this.insertChild(element, nodeIndex, Child.LEFT);
    }
  }

  /**
   * Insert a new node as a right child os a existing node
   * @param {Element<T>} element the element to insert
   * @param {number} nodeIndex the upcoming parent node index
   * @throws {RangeError} node is not a valid node
   */
  insertRightChild(element: Element<T>, nodeIndex: number): void {
    const rightChildNodeIndex = this.rightChild(nodeIndex);
    const hasRightChild = rightChildNodeIndex !== null;
    if (hasRightChild) {
      this.replace(element, rightChildNodeIndex);
    } else {
      this.insertChild(element, nodeIndex, Child.RIGHT);
    }
  }

  /**
   * Replace an existing node with a new provided element
   * @param {Element<T>} element the element to add
   * @param {number} nodeIndex the node index to replace
   * @throws {RangeError} node is not a valid node
   */
  replace(element: Element<T>, nodeIndex: number): void {
    const treeIndex = this.getTreeIndex(nodeIndex);
    const newNode = this.createNode(element, treeIndex);

    this._tree[treeIndex] = newNode;
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
      prev += current !== null ? current.element : null;
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
   * Create a node from element and index
   * @param {Element<T>} element the element of the node
   * @param {number} index the index of the node
   * @return {Node<T>} the node object
   */
  protected createNode(element: Element<T>, index: number): Node<T> {
    const node: Node<T> = {
      element: element,
      index: index,
    };

    return node;
  }

  /**
   * Insert a new node as a child of a existing node
   * @param {Element<T>} element the element to insert
   * @param {number} nodeIndex the upcoming parent node index
   * @param {Child} child the child direction (left or right)
   * @throws {RangeError} node is not a valid node
   */
  private insertChild(element: Element<T>, nodeIndex: number, child: Child): void {
    const treeIndex = this.getTreeIndex(nodeIndex);
    const newTreeIndex = child === Child.LEFT ?
      ((treeIndex + 1) * 2) - 1 :
      (treeIndex + 1) * 2;
    const newNode = this.createNode(element, newTreeIndex);
    const isExistingInTree = newTreeIndex < this._tree.length;
    if (isExistingInTree) {
      this.nodeifyNullTreeIndex(newNode, newTreeIndex);
    } else {
      const newNodeIndex = this.size;
      this.insertToTree(newNode, newNodeIndex, newTreeIndex);
    }
  }

  /**
   * Replace a null tree index with a valid node
   * @param {Node<T>} node the new node to insert
   * @param {number} treeIndex the added element tree index
   */
  private nodeifyNullTreeIndex(node: Node<T>, treeIndex: number) {
    if (node.element !== null) {
      const nodeIndex = this.nextNodeIndex(treeIndex);
      if (nodeIndex) {
        this._tree.splice(treeIndex, 1, node);
        this._maps.indexToNode.splice(treeIndex, 1, nodeIndex);
        this._maps.nodeToIndex.splice(nodeIndex, 0, treeIndex);
        this.updateIndexesInTreeIndexMap(nodeIndex);
      }
    };
  }

  /**
   * Returns the nearest node index to the provided tree index
   * @param {number} treeIndex the tree index
   * @return {number} the nearest next node index
   */
  private nextNodeIndex(treeIndex: number): number | undefined {
    for (let i = treeIndex; i < this._tree.length; i++) {
      const nodeIndex = this._maps.indexToNode[i];
      if (nodeIndex != null) {
        return nodeIndex;
      }
    }
  }

  /**
   * Update the index to node index map after nodeify
   * @param {number} startFrom the map index to start from
   */
  private updateIndexesInTreeIndexMap(startFrom: number): void {
    const map = this._maps.indexToNode;
    const correctIndexes = map.slice(0, startFrom + 1);
    const incorrectIndexes = map.slice(startFrom + 1);
    const fixesIndexes = incorrectIndexes.map((index) => index !== null ? index + 1 : null);
    this._maps.indexToNode = [...correctIndexes, ...fixesIndexes];
  }

  /**
   * Update the tree maps after new node insertion
   * @param {Node<T>} node the new node to insert
   * @param {number} nodeIndex the added element node index
   * @param {number} treeIndex the added element tree index
   */
  private insertToTree(node: Node<T>, nodeIndex: number, treeIndex: number): void {
    const numberOfAddedNullNodes = treeIndex - this._tree.length;
    const nullNodes = Array(numberOfAddedNullNodes).fill(null);
    this._tree.push(...nullNodes, node);
    if (node.element !== null) {
      this._maps.indexToNode.push(...nullNodes, nodeIndex);
      this._maps.nodeToIndex.push(treeIndex);
    } else {
      this._maps.indexToNode.push(...nullNodes, null);
    };
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
