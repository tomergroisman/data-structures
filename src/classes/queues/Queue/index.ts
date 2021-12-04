export class Queue<T> {
  private _queue: T[];
  private _size: number;

  constructor() {
    this._queue = [];
    this._size = 0;
  }

  get queue() {
    return this._queue;
  }

  get size() {
    return this._size;
  }

  enqueue(instance: T): void {
    this._size++;
    this._queue.push(instance);
  }

  dequeue(): T | undefined {
    this._size--;
    return this._queue.shift();
  }

  peek(): T | undefined {
    return this._queue[this._size - 1];
  }

  isEmpty(): boolean {
    return !this._queue.length;
  }
}
