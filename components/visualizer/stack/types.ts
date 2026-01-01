export interface StackNode {
  id: string
  value: number
  index: number
}

export interface StackOperation {
  type: 'push' | 'pop'
  value?: number
  timestamp: number
} 