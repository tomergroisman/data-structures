import {Heap} from '.';
import {HeapType} from './interfaces';

describe('Heap Tests', () => {
  it('should initialize a new heap', () => {
    const heap = new Heap(HeapType.MAX);

    expect(heap).toBeDefined();
  });

  it('should enqueue numbers to the heap', () => {
    const heap = new Heap<number>(HeapType.MAX);

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

    heap.toString(); // ?
  });
});
