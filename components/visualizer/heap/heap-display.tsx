"use client"

import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { HeapNode } from './types'
import TreeNode from '../binary-tree/tree-node'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

interface HeapDisplayProps {
  heap: HeapNode | null
  highlightedNodes: string[]
}

const nodeTypes = {
  treeNode: TreeNode,
}

export function HeapDisplay({ heap, highlightedNodes }: HeapDisplayProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { theme } = useTheme()

  useEffect(() => {
    if (!heap) {
      setNodes([])
      setEdges([])
      return
    }

    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    const processNode = (
      node: HeapNode,
      x: number = 0,
      y: number = 0,
      level: number = 0,
      parentId?: string
    ) => {
      const baseSpacing = 60
      const spacing = Math.pow(1.6, level) * baseSpacing
      const verticalSpacing = 80

      newNodes.push({
        id: node.id,
        type: 'treeNode',
        position: { x, y },
        data: { 
          id: node.id,
          value: node.value,
          highlighted: highlightedNodes.includes(node.id),
        },
      })

      if (parentId) {
        newEdges.push({
          id: `${parentId}->${node.id}`,
          source: parentId,
          target: node.id,
          type: 'default',
          style: { 
            stroke: theme === 'dark' ? '#ffffff' : '#000000',
            strokeWidth: 1.5,
            opacity: 0.5,
          },
        })
      }

      if (node.left) {
        processNode(
          node.left, 
          x - spacing, 
          y + verticalSpacing, 
          level + 1, 
          node.id
        )
      }

      if (node.right) {
        processNode(
          node.right, 
          x + spacing, 
          y + verticalSpacing, 
          level + 1, 
          node.id
        )
      }
    }

    processNode(heap)
    setNodes(newNodes)
    setEdges(newEdges)
  }, [heap, highlightedNodes, setNodes, setEdges, theme])

  return (
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          maxZoom: 1.5,
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color={theme === 'dark' ? '#ffffff' : '#000000'} 
          gap={12} 
          size={1} 
          className="opacity-[0.02]"
        />
        <Controls 
          position="bottom-right"
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            margin: '1rem',
            padding: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
      </ReactFlow>
    </div>
  )
} 