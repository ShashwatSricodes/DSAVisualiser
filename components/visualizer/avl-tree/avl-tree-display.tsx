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
import { AVLTreeNode } from './types'
import TreeNode from '../binary-tree/tree-node'
import { useEffect, useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import CustomEdge from './CustomEdge'  // <-- import custom edge

interface AVLTreeDisplayProps {
  tree: AVLTreeNode | null
  highlightedNodes: string[]
}

const nodeTypes = {
  treeNode: TreeNode,
}

const edgeTypes = {             // <-- add edgeTypes with custom edge
  custom: CustomEdge,
}

export function AVLTreeDisplay({ tree, highlightedNodes }: AVLTreeDisplayProps) {
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
      node: AVLTreeNode,
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
          label: `h=${node.height}` // Show height for AVL tree
        },
      })

      if (parentId) {
        newEdges.push({
          id: `${parentId}->${node.id}`,
          source: parentId,
          target: node.id,
          type: 'custom',                 // <-- changed to 'custom'
          style: { 
            stroke: theme === 'dark' ? '#ffffff' : '#000000',
            strokeWidth: 1.5,
            opacity: 0.5,
          },
          animated: highlightedNodes.includes(node.id),
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
  }, [tree, highlightedNodes, setNodes, setEdges, fitView, theme])

  return (
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}               
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

        {/* SVG arrowhead marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
          </marker>
        </defs>
      </ReactFlow>
    </div>
  )
}
