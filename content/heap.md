# Binary Heap

A binary heap is a complete binary tree that satisfies the heap property. In a max heap, for any given node I, the value of I is greater than or equal to the values of its children. In a min heap, the value of I is less than or equal to the values of its children.

## Properties

- Complete Binary Tree: All levels are filled except possibly the last level, which is filled from left to right
- Heap Property: Parent-child relationship follows either max-heap or min-heap property
- Array Representation: Can be efficiently stored in an array where:
  - For node at index i:
  - Left child: 2i + 1
  - Right child: 2i + 2
  - Parent: floor((i-1)/2)

## Operations

### Insertion (O(log n))
1. Add element at the next available position
2. Compare with parent and swap if heap property is violated
3. Continue until heap property is satisfied (heapify-up)

### Deletion (O(log n))
1. Remove root element
2. Replace with last element
3. Compare with children and swap with larger (max-heap) or smaller (min-heap) child
4. Continue until heap property is satisfied (heapify-down)

## Applications

- Priority Queues
- Heap Sort
- Graph Algorithms (Dijkstra's, Prim's)
- Memory Management
- Event-driven Simulation 