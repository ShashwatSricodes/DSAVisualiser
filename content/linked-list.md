# Linked List Data Structures

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.

## Types of Linked Lists

### Singly Linked List (SLL)
- Each node has data and a reference to the next node
- Traversal only in forward direction
- Memory efficient
- Simple implementation

### Doubly Linked List (DLL)
- Each node has data and references to both next and previous nodes
- Bidirectional traversal
- More memory usage
- Easier deletion operations

### Circular Singly Linked List (CSLL)
- Last node points back to first node
- No null references
- Useful for circular queues
- Round-robin scheduling

### Circular Doubly Linked List (CDLL)
- Combines features of DLL and CSLL
- Bidirectional circular traversal
- Most flexible but complex
- Most memory usage

## Operations

### Insertion (O(1) at ends, O(n) at position)
- Insert at front
- Insert at back
- Insert at position

### Deletion (O(1) at front, O(n) at back/position)
- Delete from front
- Delete from back
- Delete at position

### Traversal (O(n))
- Forward traversal
- Backward traversal (DLL/CDLL)
- Cycle detection

## Applications
- Implementation of stacks and queues
- Music playlist (circular)
- Undo/Redo operations (doubly)
- Memory allocation
- Hash tables (chaining) 