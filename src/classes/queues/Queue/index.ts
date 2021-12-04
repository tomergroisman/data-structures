/**
 * Class of a queue representation
 */
export class Queue<T> {
  private _queue: T[];
  private _size: number;

  /**
   * A queue class constructor
   * @param {T[]} queue An array representation of a queue (optional)
   */
  constructor(queue?: T[]) {
    this._queue = queue ?? [];
    this._size = queue ? queue?.length : 0;
  }

  /**
   * Returns the number of elements in the queue
   * @return {number} The number of elements in the queue
   */
  get size() {
    return this._size;
  }

  /**
   * Adds a new element to the queue
   * @param {T} element An element to add to the queue
   */
  enqueue(element: T): void {
    this._size++;
    this._queue.push(element);
  }

  /**
   * Dequeue the next element from the queue
   * @return {T | undefined} The next element in the queue
   */
  dequeue(): T | undefined {
    if (!this.isEmpty()) {
      this._size--;
      return this._queue.shift();
    }
    throw new RangeError('Queue is empty');
  }

  /**
   * Peek at the next element of the queue (without dequeueing it)
   * @return {T} The next element in the queue
   */
  peek(): T | null {
    return this._queue[this._size - 1] ?? null;
  }

  /**
   * Returns true if the queue is empty, false otherwise
   * @return {boolean} True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return !this._queue.length;
  }
}
