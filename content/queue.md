# Queue Data Structure

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue).

## Operations

### Enqueue (O(1))
- Adds an element to the rear of the queue
- If queue is full, results in queue overflow

### Dequeue (O(1))
- Removes and returns the element from the front
- If queue is empty, results in queue underflow

### Front/Peek (O(1))
- Returns the front element without removing it
- Does not modify the queue

## Properties
- Fixed size (in array implementation)
- Elements are ordered by arrival time
- Only front element is accessible for removal
- Follows FIFO principle
- Maintains two pointers: front and rear

## Applications
- Process scheduling in operating systems
- Print job scheduling
- Breadth-first search in graphs
- Request handling in web servers
- Message queues in system design
- Buffering in data streams

## Implementation Approaches
1. Array-based implementation
   - Simple but fixed size
   - Circular array for better space utilization

2. Linked list implementation
   - Dynamic size
   - More memory overhead per element

3. Priority Queue variant
   - Elements have priorities
   - Dequeue based on highest/lowest priority 