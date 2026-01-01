export interface HeapNode {
  id: string
  value: number
  left: HeapNode | null
  right: HeapNode | null
}

export type HeapType = 'max' | 'min' 