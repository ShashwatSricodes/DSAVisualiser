import { useState } from "react"
import { AVLTreeNode } from "@/components/visualizer/avl-tree/types"

let nodeIdCounter = 0

export function useAVLTree() {
  const [tree, setTree] = useState<AVLTreeNode | null>(null)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [traversalHistory, setTraversalHistory] = useState<number[]>([])
  const [rotationHistory, setRotationHistory] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Get height of a node
  const getHeight = (node: AVLTreeNode | null): number => {
    return node ? node.height : 0
  }

  // Get balance factor
  const getBalance = (node: AVLTreeNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0
  }

  // Update height of a node
  const updateHeight = (node: AVLTreeNode): number => {
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1
  }

  // Right rotation
  const rightRotate = (y: AVLTreeNode): AVLTreeNode => {
    const x = y.left!
    const T2 = x.right

    x.right = y
    y.left = T2

    y.height = updateHeight(y)
    x.height = updateHeight(x)

    setRotationHistory(prev => [...prev, `Right rotation at ${y.value}`])
    return x
  }

  // Left rotation
  const leftRotate = (x: AVLTreeNode): AVLTreeNode => {
    const y = x.right!
    const T2 = y.left

    y.left = x
    x.right = T2

    x.height = updateHeight(x)
    y.height = updateHeight(y)

    setRotationHistory(prev => [...prev, `Left rotation at ${x.value}`])
    return y
  }

  const insert = (value: number) => {
    if (isNaN(value)) return

    const insertNode = (node: AVLTreeNode | null): AVLTreeNode => {
      // Base case: create new node
      if (!node) {
        return {
          id: `node-${nodeIdCounter++}`,
          value,
          height: 1,
          left: null,
          right: null,
        }
      }

      // Create a new node object to maintain immutability
      const newNode = { ...node }

      // Perform BST insertion
      if (value < newNode.value) {
        newNode.left = insertNode(newNode.left)
      } else {
        newNode.right = insertNode(newNode.right)
      }

      // Update height
      newNode.height = 1 + Math.max(
        getHeight(newNode.left),
        getHeight(newNode.right)
      )

      // Get balance factor
      const balance = getBalance(newNode)

      // Left Left Case
      if (balance > 1 && value < newNode.left!.value) {
        return rightRotate(newNode)
      }

      // Right Right Case
      if (balance < -1 && value >= newNode.right!.value) {
        return leftRotate(newNode)
      }

      // Left Right Case
      if (balance > 1 && value >= newNode.left!.value) {
        newNode.left = leftRotate(newNode.left!)
        return rightRotate(newNode)
      }

      // Right Left Case
      if (balance < -1 && value < newNode.right!.value) {
        newNode.right = rightRotate(newNode.right!)
        return leftRotate(newNode)
      }

      return newNode
    }

    setTree(prevTree => insertNode(prevTree))
  }

  // Traversal functions similar to binary tree
  const traverseWithAnimation = async (
    node: AVLTreeNode | null,
    visit: (node: AVLTreeNode) => void,
    order: "inorder" | "preorder" | "postorder"
  ) => {
    if (!node) return

    const highlight = (nodeId: string, value: number) => {
      setHighlightedNodes(prev => [...prev, nodeId])
      setTraversalHistory(prev => [...prev, value])
      
      setTimeout(() => {
        setHighlightedNodes(prev => prev.filter(id => id !== nodeId))
      }, 1000)
    }

    const wait = () => new Promise(resolve => setTimeout(resolve, 800))

    try {
      if (order === "preorder") {
        highlight(node.id, node.value)
        visit(node)
        await wait()
        if (node.left) await traverseWithAnimation(node.left, visit, order)
        if (node.right) await traverseWithAnimation(node.right, visit, order)
      } else if (order === "inorder") {
        if (node.left) await traverseWithAnimation(node.left, visit, order)
        highlight(node.id, node.value)
        visit(node)
        await wait()
        if (node.right) await traverseWithAnimation(node.right, visit, order)
      } else {
        if (node.left) await traverseWithAnimation(node.left, visit, order)
        if (node.right) await traverseWithAnimation(node.right, visit, order)
        highlight(node.id, node.value)
        visit(node)
        await wait()
      }
    } catch (error) {
      console.error('Traversal error:', error)
      setIsAnimating(false)
    }
  }

  const clear = () => {
    setTree(null)
    setHighlightedNodes([])
    setTraversalHistory([])
    setRotationHistory([])
  }

  const inorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])
    
    try {
      await traverseWithAnimation(tree, () => {}, "inorder")
    } finally {
      setIsAnimating(false)
    }
  }

  const preorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])

    try {
      await traverseWithAnimation(tree, () => {}, "preorder")
    } finally {
      setIsAnimating(false)
    }
  }

  const postorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])

    try {
      await traverseWithAnimation(tree, () => {}, "postorder")
    } finally {
      setIsAnimating(false)
    }
  }

  return {
    tree,
    highlightedNodes,
    traversalHistory,
    rotationHistory,
    isAnimating,
    insert,
    clear,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
  }
} 