import {Heap} from '.';
import {HeapType} from './interfaces';

describe('Heap Tests', () => {
  it('should initialize a new heap', () => {
    const heap = new Heap(HeapType.MAX);

    expect(heap).toBeDefined();
  });

  describe('Max Heap Tests', () => {
    it('should insert numbers to the heap', () => {
      const heap = new Heap(HeapType.MAX);

      heap.insert(4);
      expect(heap.peek()).toBe(4);

      heap.insert(3);
      expect(heap.peek()).toBe(4);

      heap.insert(2);
      expect(heap.peek()).toBe(4);

      heap.insert(7);
      expect(heap.peek()).toBe(7);

      heap.insert(5);
      expect(heap.peek()).toBe(7);

      heap.insert(10);
      expect(heap.peek()).toBe(10);
    });
    it('should enqueue numbers to the heap', () => {
      const heap = new Heap(HeapType.MAX);

      heap.insert(4);
      heap.insert(3);
      heap.insert(2);
      heap.insert(7);
      heap.insert(5);
      heap.insert(10);

      let max;
      expect(heap.size).toBe(6);
      max = heap.extract();
      expect(max).toBe(10);
      expect(heap.peek()).toBe(7);
      expect(heap.size).toBe(5);

      max = heap.extract();
      expect(max).toBe(7);
      expect(heap.peek()).toBe(5);
      expect(heap.size).toBe(4);
    });
  });

  describe('Min Heap Tests', () => {
    it('should insert numbers to the heap', () => {
      const heap = new Heap(HeapType.MIN);

      heap.insert(4);
      expect(heap.peek()).toBe(4);

      heap.insert(3);
      expect(heap.peek()).toBe(3);

      heap.insert(2);
      expect(heap.peek()).toBe(2);

      heap.insert(7);
      expect(heap.peek()).toBe(2);

      heap.insert(5);
      expect(heap.peek()).toBe(2);

      heap.insert(10);
      expect(heap.peek()).toBe(2);

      heap.insert(-4);
      expect(heap.peek()).toBe(-4);
    });

    it('should enqueue numbers to the heap', () => {
      const heap = new Heap(HeapType.MIN);

      heap.insert(4);
      heap.insert(3);
      heap.insert(2);
      heap.insert(7);
      heap.insert(5);
      heap.insert(10);

      let max;
      expect(heap.size).toBe(6);
      max = heap.extract();
      expect(max).toBe(2);
      expect(heap.peek()).toBe(3);
      expect(heap.size).toBe(5);

      max = heap.extract();
      expect(max).toBe(3);
      expect(heap.peek()).toBe(4);
      expect(heap.size).toBe(4);
    });
  });
});
