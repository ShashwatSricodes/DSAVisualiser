import { useState } from "react"
import { StackNode, StackOperation } from "@/components/visualizer/stack/types"

let nodeIdCounter = 0

export function useStack(maxSize: number = 8) {
  const [stack, setStack] = useState<StackNode[]>([])
  const [operations, setOperations] = useState<StackOperation[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const push = async (value: number) => {
    if (stack.length >= maxSize || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { type: 'push', value, timestamp: Date.now() }])

    // Highlight the new position
    setHighlightedIndex(stack.length)
    
    // Add new node with animation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setStack(prev => [
      ...prev,
      {
        id: `node-${nodeIdCounter++}`,
        value,
        index: prev.length,
      }
    ])

    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const pop = async () => {
    if (stack.length === 0 || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { type: 'pop', value: stack[stack.length - 1].value, timestamp: Date.now() }])

    // Highlight the top element
    setHighlightedIndex(stack.length - 1)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setStack(prev => prev.slice(0, -1))
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const clear = () => {
    setStack([])
    setOperations([])
    setHighlightedIndex(null)
    setIsAnimating(false)
    nodeIdCounter = 0
  }

  return {
    stack,
    operations,
    isAnimating,
    highlightedIndex,
    push,
    pop,
    clear,
    isFull: stack.length >= maxSize,
    isEmpty: stack.length === 0,
  }
} 