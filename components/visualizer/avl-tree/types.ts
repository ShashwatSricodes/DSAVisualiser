export interface AVLTreeNode {
  id: string
  value: number
  height: number
  left: AVLTreeNode | null
  right: AVLTreeNode | null
} 