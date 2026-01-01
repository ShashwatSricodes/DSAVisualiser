# Stack Data Structure

A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack.

## Operations

### Push (O(1))
- Adds an element to the top of the stack
- If stack is full, results in stack overflow

### Pop (O(1))
- Removes and returns the top element
- If stack is empty, results in stack underflow

### Peek/Top (O(1))
- Returns the top element without removing it
- Does not modify the stack

## Properties
- Fixed size (in array implementation)
- Elements are ordered by insertion time
- Only top element is accessible
- Follows LIFO principle

## Applications
- Function call stack in programming languages
- Expression evaluation and syntax parsing
- Undo operations in text editors
- Browser history (back button)
- Backtracking algorithms 