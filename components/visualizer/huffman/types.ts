export interface HuffmanNode {
  id: string
  value: string
  frequency: number
  code?: string
  left: HuffmanNode | null
  right: HuffmanNode | null
}

export interface AnimationState {
  highlightedNodes: string[]
  message: string
  currentStep: number
}

export interface HuffmanStep {
  type: 'BUILD_QUEUE' | 'MERGE_NODES' | 'ASSIGN_CODES'
  nodes: HuffmanNode[]
  priorityQueue: HuffmanNode[]
  message: string
  highlightedNodes: string[]
  codes?: Map<string, string>
} 