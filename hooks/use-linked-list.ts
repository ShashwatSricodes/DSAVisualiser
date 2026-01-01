import { useState } from 'react'
import { ListType, ListNode, LinkedList, ListOperation, AnimationState } from '@/components/visualizer/linked-list/types'

let nodeIdCounter = 0

const createNode = (value: number): ListNode => ({
  id: `node-${nodeIdCounter++}`,
  value: value.toString(),
  next: null,
  prev: null,
})

export function useLinkedList(type: ListType) {
  const [list, setList] = useState<LinkedList>({
    type,
    head: null,
    tail: null,
    nodes: new Map(),
  })
  const [operations, setOperations] = useState<ListOperation[]>([])
  const [animationState, setAnimationState] = useState<AnimationState>({
    highlightedNodes: [],
    message: '',
  })
  const [isAnimating, setIsAnimating] = useState(false)

  const addOperation = (operation: Omit<ListOperation, 'timestamp'>) => {
    setOperations(prev => [...prev, { ...operation, timestamp: Date.now() }])
  }

  const setHighlight = (nodeIds: string[], message: string) => {
    setAnimationState({ highlightedNodes: nodeIds, message })
  }

  const insertFront = async (value: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    addOperation({ type: 'insert-front', value })

    const newNode = createNode(value)
    const nodes = new Map(list.nodes)
    nodes.set(newNode.id, newNode)

    if (!list.head) {
      // Empty list
      setHighlight([newNode.id], 'Creating first node')
      await new Promise(r => setTimeout(r, 500))
      
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = newNode.id
        if (type === 'CDLL') newNode.prev = newNode.id
      }
      
      setList({ ...list, head: newNode.id, tail: newNode.id, nodes })
    } else {
      // Non-empty list
      setHighlight([newNode.id], 'Creating new node')
      await new Promise(r => setTimeout(r, 500))

      const oldHead = nodes.get(list.head)!
      newNode.next = list.head
      
      if (type === 'DLL' || type === 'CDLL') {
        oldHead.prev = newNode.id
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        const tail = nodes.get(list.tail!)!
        tail.next = newNode.id
        if (type === 'CDLL') newNode.prev = list.tail
      }

      setHighlight([newNode.id, list.head], 'Linking nodes')
      await new Promise(r => setTimeout(r, 500))
      
      setList({ ...list, head: newNode.id, nodes })
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const insertBack = async (value: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    addOperation({ type: 'insert-back', value })

    const newNode = createNode(value)
    const nodes = new Map(list.nodes)
    nodes.set(newNode.id, newNode)

    if (!list.tail) {
      // Empty list - same as insertFront
      setHighlight([newNode.id], 'Creating first node')
      await new Promise(r => setTimeout(r, 500))
      
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = newNode.id
        if (type === 'CDLL') newNode.prev = newNode.id
      }
      
      setList({ ...list, head: newNode.id, tail: newNode.id, nodes })
    } else {
      // Non-empty list
      setHighlight([newNode.id], 'Creating new node')
      await new Promise(r => setTimeout(r, 500))

      const oldTail = nodes.get(list.tail)!
      oldTail.next = newNode.id
      
      if (type === 'DLL' || type === 'CDLL') {
        newNode.prev = list.tail
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        newNode.next = list.head
      }

      setHighlight([list.tail, newNode.id], 'Linking nodes')
      await new Promise(r => setTimeout(r, 500))
      
      setList({ ...list, tail: newNode.id, nodes })
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const deleteFront = async () => {
    if (isAnimating || !list.head) return
    setIsAnimating(true)
    addOperation({ type: 'delete-front' })

    const nodes = new Map(list.nodes)
    const oldHead = nodes.get(list.head)!
    
    setHighlight([list.head], 'Removing front node')
    await new Promise(r => setTimeout(r, 500))

    if (list.head === list.tail) {
      // Last node
      setList({ ...list, head: null, tail: null, nodes: new Map() })
    } else {
      const newHead = oldHead.next!
      const newHeadNode = nodes.get(newHead)!
      
      if (type === 'DLL' || type === 'CDLL') {
        newHeadNode.prev = type === 'CDLL' ? list.tail : null
      }
      
      if (type === 'CSLL' || type === 'CDLL') {
        const tail = nodes.get(list.tail!)!
        tail.next = newHead
      }

      nodes.delete(list.head)
      setList({ ...list, head: newHead, nodes })
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const deleteBack = async () => {
    if (isAnimating || !list.tail) return
    setIsAnimating(true)
    addOperation({ type: 'delete-back' })

    const nodes = new Map(list.nodes)
    
    setHighlight([list.tail], 'Removing back node')
    await new Promise(r => setTimeout(r, 500))

    if (list.head === list.tail) {
      // Last node
      setList({ ...list, head: null, tail: null, nodes: new Map() })
    } else {
      // Find new tail - with null checks
      let newTail: string | null = list.head
      let current: string | null = list.head
      
      while (current !== null) {
        const currentNode = nodes.get(current)
        if (!currentNode) break
        if (currentNode.next === list.tail) {
          newTail = current
          break
        }
        current = currentNode.next
      }

      if (newTail) {
        const newTailNode = nodes.get(newTail)
        if (newTailNode) {
          newTailNode.next = type === 'CSLL' || type === 'CDLL' ? list.head : null
          
          if (type === 'CDLL' && list.head) {
            const headNode = nodes.get(list.head)
            if (headNode) {
              headNode.prev = newTail
            }
          }

          nodes.delete(list.tail)
          setList({ ...list, tail: newTail, nodes })
        }
      }
    }

    setHighlight([], '')
    setIsAnimating(false)
  }

  const reverse = async () => {
    if (isAnimating || !list.head) return
    setIsAnimating(true)
    addOperation({ type: 'reverse' })

    const nodes = new Map(list.nodes)
    let curr: string | null = list.head
    let prev: string | null = null
    let next: string | null = null
    const reversedLinks = new Set<string>()

    // Helper to update reversal state
    const updateReverseStep = (
      activeLink: { from: string; to: string } | null = null
    ) => {
      setAnimationState({
        highlightedNodes: [curr, prev, next].filter((id): id is string => id !== null),
        message: `Current: ${curr ? nodes.get(curr)?.value : 'null'}, 
                 Next: ${next ? nodes.get(next)?.value : 'null'}, 
                 Prev: ${prev ? nodes.get(prev)?.value : 'null'}`,
        reverseStep: {
          curr,
          prev,
          next,
          reversedLinks: new Set(reversedLinks),
          activeLink
        }
      })
    }

    // Initialize pointers
    updateReverseStep()
    await new Promise(r => setTimeout(r, 1000))

    while (curr) {
      const currentNode = nodes.get(curr)
      if (!currentNode) break

      next = currentNode.next

      // Show next pointer movement
      if (next) {
        updateReverseStep({ from: curr, to: next })
        await new Promise(r => setTimeout(r, 1000))
      }

      // Reverse current node's pointer
      currentNode.next = prev
      reversedLinks.add(curr)
      
      if (type === 'DLL' || type === 'CDLL') {
        if (prev) {
          const prevNode = nodes.get(prev)
          if (prevNode) {
            prevNode.prev = curr
          }
        }
        currentNode.prev = next
      }

      if (prev) {
        updateReverseStep({ from: curr, to: prev })
        await new Promise(r => setTimeout(r, 1000))
      }

      // Move pointers
      prev = curr
      curr = next
      updateReverseStep()
      await new Promise(r => setTimeout(r, 1000))
    }

    // Update circular links if needed
    if (type === 'CSLL' || type === 'CDLL') {
      if (list.head && list.tail) {
        const oldHead = nodes.get(list.head)
        const oldTail = nodes.get(list.tail)
        if (oldHead && oldTail) {
          oldHead.next = list.tail
          if (type === 'CDLL') {
            oldTail.prev = list.head
          }
        }
      }
    }

    setList({
      ...list,
      head: list.tail,
      tail: list.head,
      nodes,
    })

    setHighlight([], '')
    setIsAnimating(false)
  }

  return {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
  }
} 