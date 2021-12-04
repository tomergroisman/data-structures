import {Person} from '../../interfaces';

import {Queue} from './index';

describe('Regular Queue Tests', () => {
  it('should return an empty initialized queue', () => {
    const q = new Queue();
    expect(q.queue).toEqual([]);
    expect(q.size).toEqual(0);
    expect(q.isEmpty()).toEqual(true);
  });

  it('should add a person to the queue', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);

    expect(q.queue).toEqual([mockedPerson1]);
    expect(q.size).toEqual(1);
    expect(q.isEmpty()).toEqual(false);
  });

  it('should remove a person from the queue', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    q.dequeue();

    expect(q.queue).toEqual([]);
    expect(q.size).toEqual(0);
    expect(q.isEmpty()).toEqual(true);
  });

  it('should peek a person from the queue', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    const peekedPerson = q.peek();

    expect(peekedPerson).toEqual(mockedPerson1);
    expect(q.queue).toEqual([mockedPerson1]);
    expect(q.size).toEqual(1);
    expect(q.isEmpty()).toEqual(false);
  });

  it('should add two persons to the queue', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    q.enqueue(mockedPerson2);

    expect(q.queue).toEqual([mockedPerson1, mockedPerson2]);
    expect(q.size).toEqual(2);
    expect(q.isEmpty()).toEqual(false);
  });

  it('should add two persons to the queue', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    q.enqueue(mockedPerson2);

    expect(q.queue).toEqual([mockedPerson1, mockedPerson2]);
    expect(q.size).toEqual(2);
    expect(q.isEmpty()).toEqual(false);
  });

  it('should dequeue two persons to the queue and', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    q.enqueue(mockedPerson2);

    q.dequeue();
    q.dequeue();

    expect(q.queue).toEqual([]);
    expect(q.size).toEqual(0);
    expect(q.isEmpty()).toEqual(true);
  });

  it('should add two persons to the queue and dequeue one', () => {
    const q = new Queue<Person>();

    q.enqueue(mockedPerson1);
    q.enqueue(mockedPerson2);

    q.dequeue();

    expect(q.queue).toEqual([mockedPerson2]);
    expect(q.size).toEqual(1);
    expect(q.isEmpty()).toEqual(false);
  });
});

const mockedPerson1: Person = {
  firstName: 'Tomer',
  lastName: 'Groisman',
  age: 29,
};
const mockedPerson2: Person = {
  firstName: 'Aya',
  lastName: 'Erel',
  age: 29,
};
