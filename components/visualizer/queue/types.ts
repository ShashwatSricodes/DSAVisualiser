export interface QueueNode {
  id: string
  value: number
  index: number
}

export interface QueueOperation {
  type: 'enqueue' | 'dequeue'
  value?: number
  timestamp: number
} 