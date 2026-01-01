import { useState } from "react"
import { QueueNode, QueueOperation } from "@/components/visualizer/queue/types"

let nodeIdCounter = 0

export function useQueue(maxSize: number = 8) {
  const [queue, setQueue] = useState<QueueNode[]>([])
  const [operations, setOperations] = useState<QueueOperation[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const enqueue = async (value: number) => {
    if (queue.length >= maxSize || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { type: 'enqueue', value, timestamp: Date.now() }])

    // Highlight the new position
    setHighlightedIndex(queue.length)
    
    // Add new node with animation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setQueue(prev => [
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

  const dequeue = async () => {
    if (queue.length === 0 || isAnimating) return
    
    setIsAnimating(true)
    setOperations(prev => [...prev, { 
      type: 'dequeue', 
      value: queue[0].value, 
      timestamp: Date.now() 
    }])

    // Highlight the first element
    setHighlightedIndex(0)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setQueue(prev => {
      const newQueue = prev.slice(1)
      // Update indices
      return newQueue.map((node, i) => ({
        ...node,
        index: i,
      }))
    })
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const clear = () => {
    setQueue([])
    setOperations([])
    setHighlightedIndex(null)
    setIsAnimating(false)
    nodeIdCounter = 0
  }

  return {
    queue,
    operations,
    isAnimating,
    highlightedIndex,
    enqueue,
    dequeue,
    clear,
    isFull: queue.length >= maxSize,
    isEmpty: queue.length === 0,
  }
} 