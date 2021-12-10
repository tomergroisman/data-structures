import {PriorityQueue} from '.';
import {PriorityQueueType} from './interfaces';

describe('Prioritized Queue Tests', () => {
  it('should initialize a new priority queue', () => {
    const q = new PriorityQueue(PriorityQueueType.MAX);

    expect(q).toBeDefined();
  });

  it('should enqueue numbers to the priority queue', () => {
    const q = new PriorityQueue<number>(PriorityQueueType.MAX);

    q.enqueue(4);
    expect(q.peek()).toBe(4);

    q.enqueue(3);
    expect(q.peek()).toBe(4);

    q.enqueue(2);
    expect(q.peek()).toBe(4);

    q.enqueue(7);
    expect(q.peek()).toBe(7);

    q.enqueue(5);
    expect(q.peek()).toBe(7);

    q.enqueue(10);
    expect(q.peek()).toBe(10);
  });
});
