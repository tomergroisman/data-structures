import {BinarySearchTree} from '.';

describe('Binary Search Tree Tests', () => {
  it('should initialize a new binary search tree', () => {
    const bst = new BinarySearchTree<number>();

    expect(bst).toBeDefined();
  });

  it('should insert elements to the tree', () => {
    const bst = new BinarySearchTree<number>();

    expect(bst.size).toBe(0);

    bst.insert(5);
    expect(bst.size).toBe(1);
    expect(bst.isLeaf(0)).toBeTruthy();

    bst.insert(10);
    expect(bst.size).toBe(2);
    expect(bst.leftChild(0)).toBeNull();
    expect(bst.rightChild(0)).toBe(1);
    expect(bst.isLeaf(1)).toBeTruthy();

    bst.insert(1);
    expect(bst.size).toBe(3);
    expect(bst.leftChild(0)).toBe(1);
    expect(bst.rightChild(0)).toBe(2);
    expect(bst.isLeaf(1)).toBeTruthy();
    expect(bst.isLeaf(2)).toBeTruthy();

    bst.insert(2);
    expect(bst.size).toBe(4);
    expect(bst.isLeaf(2)).toBeTruthy();
    expect(bst.leftChild(1)).toBeNull();
    expect(bst.rightChild(1)).toBe(3);

    bst.insert(4);
    expect(bst.size).toBe(5);
    expect(bst.leftChild(3)).toBeNull();
    expect(bst.rightChild(3)).toBe(4);

    expect(bst.element(0)).toBe(5);
    expect(bst.element(1)).toBe(1);
    expect(bst.element(2)).toBe(10);
    expect(bst.element(3)).toBe(2);
    expect(bst.element(4)).toBe(4);
  });
});
