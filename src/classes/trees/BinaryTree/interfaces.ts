export type Element<T> = T | null

export interface Node<T> {
  element: Element<T>,
  index: number
}

export interface BinaryTreeConstructor<T> {
  tree?: (Element<T>)[]
}

export interface BinaryTreeMaps {
  nodeToIndex: number[],
  indexToNode: (number | null)[],
}
