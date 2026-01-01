export type ListType = 'SLL' | 'DLL' | 'CSLL' | 'CDLL'

export interface ListNode {
  id: string
  value: string
  next: string | null
  prev: string | null
}

export interface LinkedList {
  type: ListType
  head: string | null
  tail: string | null
  nodes: Map<string, ListNode>
}

export interface ListOperation {
  type: 'insert-front' | 'insert-back' | 'delete-front' | 'delete-back' | 'reverse'
  value?: number
  timestamp: number
}

export interface AnimationState {
  highlightedNodes: string[]
  message: string
  reverseStep?: {
    curr: string | null
    prev: string | null
    next: string | null
    reversedLinks: Set<string>
    activeLink: { from: string; to: string } | null
  } | null
} 