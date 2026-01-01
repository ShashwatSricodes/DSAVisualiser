import { useState } from "react"
import { BinaryTreeNode } from "@/components/visualizer/binary-tree/types"

// Add a counter for generating unique IDs
let nodeIdCounter = 0;

export function useBinaryTree() {
  const [tree, setTree] = useState<BinaryTreeNode | null>(null)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [traversalHistory, setTraversalHistory] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const insert = (value: number) => {
    if (isNaN(value)) return

    const newNode: BinaryTreeNode = { 
      id: `node-${nodeIdCounter++}`,
      value, 
      left: null, 
      right: null 
    }

    if (!tree) {
      setTree(newNode)
      return
    }

    const insertIntoTree = (node: BinaryTreeNode): BinaryTreeNode => {
      if (value <= node.value) {
        if (!node.left) {
          return {
            ...node,
            left: newNode
          }
        }
        return {
          ...node,
          left: insertIntoTree(node.left)
        }
      } else {
        if (!node.right) {
          return {
            ...node,
            right: newNode
          }
        }
        return {
          ...node,
          right: insertIntoTree(node.right)
        }
      }
    }

    setTree(insertIntoTree(tree))
  }

  const traverseWithAnimation = async (
    node: BinaryTreeNode | null,
    visit: (node: BinaryTreeNode) => void,
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
  }

  const inorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])
    
    try {
      await traverseWithAnimation(tree, (node) => {
        console.log('Visiting:', node.value)
      }, "inorder")
    } finally {
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }

  const preorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])

    try {
      await traverseWithAnimation(tree, (node) => {
        console.log('Visiting:', node.value)
      }, "preorder")
    } finally {
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }

  const postorderTraversal = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setHighlightedNodes([])
    setTraversalHistory([])

    try {
      await traverseWithAnimation(tree, (node) => {
        console.log('Visiting:', node.value)
      }, "postorder")
    } finally {
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }

  return {
    tree,
    highlightedNodes,
    traversalHistory,
    isAnimating,
    insert,
    clear,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
  }
}