"use client"

import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { HuffmanNode } from './types'
import TreeNode from './tree-node'
import { useTheme } from 'next-themes'
import { useEffect, useCallback, useState } from 'react'

interface HuffmanDisplayProps {
  tree: HuffmanNode | null
  highlightedNodes: string[]
  message: string
}

const nodeTypes = {
  huffman: TreeNode,
}

export function HuffmanDisplay({ 
  tree, 
  highlightedNodes,
  message 
}: HuffmanDisplayProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const { theme } = useTheme()

  const onInit = useCallback((flowInstance: ReactFlowInstance) => {
    setReactFlowInstance(flowInstance)
  }, [])

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.2,
          duration: 400,
          maxZoom: 1.5,
        })
      }, 50)
    }
  }, [reactFlowInstance])

  useEffect(() => {
    if (!tree) {
      setNodes([])
      setEdges([])
      return
    }

    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    const processNode = (
      node: HuffmanNode,
      x: number = 0,
      y: number = 0,
      level: number = 0,
      parentId?: string
    ) => {
      const baseSpacing = 100
      const spacing = Math.pow(1.8, level) * baseSpacing
      const verticalSpacing = 120

      newNodes.push({
        id: node.id,
        type: 'huffman',
        position: { x, y },
        data: { 
          value: node.value,
          frequency: node.frequency,
          code: node.code,
          highlighted: highlightedNodes.includes(node.id)
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
            opacity: highlightedNodes.includes(node.id) ? 1 : 0.5,
          },
          animated: highlightedNodes.includes(node.id),
          label: node === tree.left ? '0' : '1',
          labelStyle: { 
            fill: theme === 'dark' ? '#ffffff' : '#000000',
            fontWeight: 'bold',
          },
          labelBgStyle: { 
            fill: 'transparent' 
          }
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

    processNode(tree)
    setNodes(newNodes)
    setEdges(newEdges)
    fitView()
  }, [tree, highlightedNodes, setNodes, setEdges, theme, fitView])

  return (
    <div className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden border">
      {message && (
        <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg border">
          {message}
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
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
        className="transition-all duration-300"
      >
        <Background 
          color={theme === 'dark' ? '#ffffff' : '#000000'} 
          gap={12} 
          size={1} 
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
