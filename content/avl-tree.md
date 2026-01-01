# AVL Tree

An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes.

## Properties
- For each node, the heights of its left and right subtrees differ by at most 1
- All operations (insertion, deletion, search) take O(log n) time
- Balance factor = height(left subtree) - height(right subtree)
- Balance factor must be -1, 0, or 1 for all nodes

## Rotations
- Left Rotation: Used when right subtree becomes higher
- Right Rotation: Used when left subtree becomes higher
- Left-Right Rotation: Combination used for more complex imbalances
- Right-Left Rotation: Combination used for more complex imbalances

## Applications
- Databases where frequent insertions and deletions occur
- Memory management systems
- File systems requiring balanced tree structures 