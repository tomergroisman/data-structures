import {Queue} from './classes/Queue';

const q = new Queue<number>();

q.enqueue(1);

q.peek();

function hi() {
  return 2;
}

hi(); // ?

const a = {
  name: 'tomer',
};

a;
