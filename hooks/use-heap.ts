import { useState } from "react"
import { HeapNode, HeapType } from "@/components/visualizer/heap/types"

let nodeIdCounter = 0

export function useHeap() {
  const [heap, setHeap] = useState<HeapNode | null>(null)
  const [heapArray, setHeapArray] = useState<number[]>([])
  const [heapType, setHeapType] = useState<HeapType>('max')
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])

  const shouldSwap = (parent: number, child: number): boolean => {
    if (heapType === 'max') {
      return parent < child
    }
    return parent > child
  }

  const heapifyUp = (array: number[], index: number) => {
    const parentIndex = Math.floor((index - 1) / 2)
    
    if (parentIndex >= 0 && shouldSwap(array[parentIndex], array[index])) {
      // Swap
      [array[parentIndex], array[index]] = [array[index], array[parentIndex]]
      heapifyUp(array, parentIndex)
    }
  }

  const arrayToTree = (array: number[], index: number = 0): HeapNode | null => {
    if (index >= array.length) return null

    return {
      id: `node-${nodeIdCounter++}`,
      value: array[index],
      left: arrayToTree(array, 2 * index + 1),
      right: arrayToTree(array, 2 * index + 2),
    }
  }

  const insert = (value: number) => {
    const newArray = [...heapArray, value]
    heapifyUp(newArray, newArray.length - 1)
    setHeapArray(newArray)
    setHeap(arrayToTree(newArray))
  }

  const insertMany = (values: string) => {
    const nums = values.split(',').map(v => parseInt(v.trim())).filter(n => !isNaN(n))
    const newArray = [...heapArray]
    
    nums.forEach(value => {
      newArray.push(value)
      heapifyUp(newArray, newArray.length - 1)
    })

    setHeapArray(newArray)
    setHeap(arrayToTree(newArray))
  }

  const toggleHeapType = () => {
    const newType = heapType === 'max' ? 'min' : 'max'
    setHeapType(newType)
    
    // Rebuild heap with new type
    const newArray = [...heapArray]
    for (let i = Math.floor(newArray.length / 2); i >= 0; i--) {
      heapifyDown(newArray, i)
    }
    
    setHeapArray(newArray)
    setHeap(arrayToTree(newArray))
  }

  const heapifyDown = (array: number[], index: number) => {
    const length = array.length
    let largest = index
    const left = 2 * index + 1
    const right = 2 * index + 2

    if (left < length && shouldSwap(array[largest], array[left])) {
      largest = left
    }

    if (right < length && shouldSwap(array[largest], array[right])) {
      largest = right
    }

    if (largest !== index) {
      [array[index], array[largest]] = [array[largest], array[index]]
      heapifyDown(array, largest)
    }
  }

  const clear = () => {
    setHeap(null)
    setHeapArray([])
    setHighlightedNodes([])
    nodeIdCounter = 0
  }

  return {
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  }
} 