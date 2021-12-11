import {BinaryTree} from '.';

describe('Binary Tree Tests', () => {
  it('should initialize a new binary tree', () => {
    const tree = new BinaryTree();
    expect(tree).toBeDefined();
    expect(tree.size).toBe(0);
  });

  it('should initialize a new binary tree from a pre defined tree', () => {
    const tree = new BinaryTree([1, 2, null, 3]);
    expect(tree).toBeDefined();
    expect(tree.size).toBe(3);
  });

  it('should print the tree', () => {
    const tree = new BinaryTree([
      0,
      1, 2,
      3, 4, null, 5,
      null, null, 6, 7, null, null, null, null,
      null, null, null, null, 8,
    ]);
    const expectation = (
      '0\n1 2\n3 4 null 5\nnull null 6 7 null null null null\nnull null null null 8'
    );
    expect(tree.toString()).toBe(expectation);
  });

  it('should insert a new node to the tree', () => {
    const tree = new BinaryTree<number>();

    expect(tree.size).toBe(0);
    expect(() => tree.isLeaf(0)).toThrow(RangeError);

    tree.insert(0);

    expect(tree.size).toBe(1);
    expect(tree.isLeaf(0)).toBeTruthy();
  });

  it('should remove a node from the tree', () => {
    const tree = new BinaryTree<number>();

    tree.insert(0);
    tree.insert(1);
    tree.insert(2);

    expect(tree.size).toBe(3);
    tree.remove(1);
    expect(tree.size).toBe(2);
    expect(tree.toString()).toBe('0\n2');
  });

  it('should swap two nodes', () => {
    const tree = new BinaryTree();

    tree.insert(1);
    tree.insert(2);

    expect(tree.element(0)).toBe(1);
    expect(tree.element(1)).toBe(2);

    tree.swap(0, 1);

    expect(tree.element(0)).toBe(2);
    expect(tree.element(1)).toBe(1);
  });

  describe('Tree Node Tests', () => {
    let tree: BinaryTree<number>;

    beforeEach(() => {
      /**
       *      0
       *     / \
       *    1   2
       *   / \   \
       *  3   4   5
       *     / \
       *    6   7
       *   /
       *  8
       */
      tree = new BinaryTree(
          [
            0,
            1, 2,
            3, 4, null, 5,
            null, null, 6, 7, null, null, null,
            null, null, null, null, null, 8,
          ],
      );
    });

    it('should return node children', () => {
      expect(tree.size).toBe(9);

      expect(tree.leftChild(0)).toBe(1);
      expect(tree.rightChild(0)).toBe(2);

      expect(tree.leftChild(1)).toBe(3);
      expect(tree.rightChild(1)).toBe(4);

      expect(tree.leftChild(2)).toBeNull();
      expect(tree.rightChild(2)).toBe(5);

      expect(tree.leftChild(3)).toBeNull();
      expect(tree.rightChild(3)).toBeNull();

      expect(tree.leftChild(4)).toBe(6);
      expect(tree.rightChild(4)).toBe(7);

      expect(tree.leftChild(5)).toBeNull();
      expect(tree.rightChild(5)).toBeNull();

      expect(tree.leftChild(6)).toBe(8);
      expect(tree.rightChild(6)).toBeNull();

      expect(tree.leftChild(7)).toBeNull();
      expect(tree.rightChild(7)).toBeNull();

      expect(tree.leftChild(8)).toBeNull();
      expect(tree.rightChild(8)).toBeNull();

      expect(() => tree.rightChild(9)).toThrow(RangeError);
    });

    it('should return node parents', () => {
      expect(tree.parent(0)).toBeNull();

      expect(tree.parent(1)).toBe(0);
      expect(tree.parent(2)).toBe(0);

      expect(tree.parent(3)).toBe(1);
      expect(tree.parent(4)).toBe(1);

      expect(tree.parent(5)).toBe(2);

      expect(tree.parent(6)).toBe(4);
      expect(tree.parent(7)).toBe(4);

      expect(tree.parent(8)).toBe(6);

      expect(() => tree.parent(9)).toThrow(RangeError);
    });

    it('should return true for leafs anf false for non leaves', () => {
      expect(tree.isLeaf(0)).toBeFalsy();
      expect(tree.isLeaf(1)).toBeFalsy();
      expect(tree.isLeaf(2)).toBeFalsy();
      expect(tree.isLeaf(3)).toBeTruthy();
      expect(tree.isLeaf(4)).toBeFalsy();
      expect(tree.isLeaf(5)).toBeTruthy();
      expect(tree.isLeaf(6)).toBeFalsy();
      expect(tree.isLeaf(7)).toBeTruthy();
      expect(tree.isLeaf(8)).toBeTruthy();
      expect(() => tree.isLeaf(9)).toThrow(RangeError);
    });

    it('should return the depthOf of the nodes', () => {
      expect(tree.depthOf(0)).toBe(0);
      expect(tree.depthOf(1)).toBe(1);
      expect(tree.depthOf(2)).toBe(1);
      expect(tree.depthOf(3)).toBe(2);
      expect(tree.depthOf(4)).toBe(2);
      expect(tree.depthOf(5)).toBe(2);
      expect(tree.depthOf(6)).toBe(3);
      expect(tree.depthOf(7)).toBe(3);
      expect(tree.depthOf(8)).toBe(4);
      expect(() => tree.isLeaf(9)).toThrow(RangeError);
    });
  });
});
