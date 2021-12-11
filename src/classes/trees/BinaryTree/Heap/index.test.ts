import {Heap} from '.';
import {Person} from '../../../../interfaces';
import {HeapType} from './interfaces';

describe('Heap Tests', () => {
  describe('Max Heap Tests', () => {
    it('should initialize a new heap', () => {
      const heap = new Heap<number>({type: HeapType.MAX});

      expect(heap).toBeDefined();
    });

    it('should initialize a heap out of a tree', () => {
      const tree = [
        0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11,
      ];
      const heap = new Heap<number>({type: HeapType.MAX, tree: tree});

      expect(heap.toString()).toBe('11\n10 6\n8 9 5 0\n7 3 1 4 2');
    });

    it('should insert numbers to the heap', () => {
      const heap = new Heap<number>({type: HeapType.MAX});

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
    it('should extract max from the heap', () => {
      const heap = new Heap<number>({type: HeapType.MAX});

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

    it('should extract null from an empty heap', () => {
      const heap = new Heap<number>({type: HeapType.MAX});

      const max = heap.extract();
      expect(max).toBeNull();
    });
  });

  describe('Min Heap Tests', () => {
    it('should initialize a new heap', () => {
      const heap = new Heap<number>({type: HeapType.MIN});

      expect(heap).toBeDefined();
    });

    it('should initialize a heap out of a tree', () => {
      const tree = [
        31,
        30, 29,
        28, 27, 26, 25,
        24, 23, 22, 21, 20, 19, 18, 17,
        16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 0,
      ];
      const heap = new Heap<number>({type: HeapType.MIN, tree: tree});

      expect(heap.toString()).toBe(
          '0\n' +
          '9 2\n' +
          '13 10 5 3\n' +
          '15 14 11 21 7 6 4 17\n' +
          '16 24 28 23 12 22 27 30 8 20 26 19 31 18 25 29',
      );
    });

    it('should insert numbers to the heap', () => {
      const heap = new Heap<number>({type: HeapType.MIN});

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

    it('should extract min from the heap', () => {
      const heap = new Heap<number>({type: HeapType.MIN});

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

  describe('Generic Type Heap Tests', () => {
    it('should initialize a new heap', () => {
      const heap = new Heap<Person>({type: HeapType.MAX});

      expect(heap).toBeDefined();
    });

    it('should initialize a new heap', () => {
      const [p1, p2, p3] = generatePersons();

      const heap = new Heap<Person>({
        type: HeapType.MAX,
        comparisonFunction: (a: Person, b: Person) => a.age - b.age,
        tree: [p2, p1, p3],
      });

      let extracted;
      extracted = heap.extract();
      expect(extracted).toEqual(p1);

      extracted = heap.extract();
      expect(extracted).toEqual(p2);

      extracted = heap.extract();
      expect(extracted).toEqual(p3);

      extracted = heap.extract();
      expect(extracted).toBeNull();
    });

    it('should initialize a new heap', () => {
      const [p1, p2, p3] = generatePersons();

      const heap = new Heap<Person>({
        type: HeapType.MIN,
        comparisonFunction: (a: Person, b: Person) => a.age - b.age,
        tree: [p1, p2, p3],
      });

      let extracted;
      extracted = heap.extract();
      expect(extracted).toEqual(p3);

      extracted = heap.extract();
      expect(extracted).toEqual(p2);

      extracted = heap.extract();
      expect(extracted).toEqual(p1);

      extracted = heap.extract();
      expect(extracted).toBeNull();
    });
  });
});

/**
 * Generate an array of persons
 * @return {Person[]} an array of three persons
 */
function generatePersons(): Person[] {
  return [
    {
      firstName: 'Angelina',
      lastName: 'Julie',
      age: 50,
    },
    {
      firstName: 'Kanye',
      lastName: 'West',
      age: 40,
    },
    {
      firstName: 'Noa',
      lastName: 'Kirel',
      age: 23,
    },
  ];
}
