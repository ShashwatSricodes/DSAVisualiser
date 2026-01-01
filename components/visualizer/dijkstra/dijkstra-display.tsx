"use client"

import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Graph } from '@/hooks/use-dijkstra'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import GraphNode from '@/components/visualizer/dijkstra/graph-node'

interface DijkstraDisplayProps {
  graph: Graph
  distances: Map<string, number>
  path: string[]
  currentNode: string | null
  visitedNodes: Set<string>
}

const nodeTypes = {
  graph: GraphNode,
}

// Default edge settings
const defaultEdgeOptions = {
  type: 'straight',
  animated: false,
  style: { strokeWidth: 2 },
}

export function DijkstraDisplay({
  graph,
  distances,
  path,
  currentNode,
  visitedNodes,
}: DijkstraDisplayProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { theme } = useTheme()

  useEffect(() => {
    // Convert graph nodes to ReactFlow nodes
    const flowNodes: Node[] = graph.nodes.map(node => ({
      id: node.id,
      type: 'graph',
      position: { x: node.x, y: node.y },
      data: {
        id: node.id,
        distance: distances.get(node.id) || Infinity,
        isVisited: visitedNodes.has(node.id),
        isCurrent: node.id === currentNode,
        isPath: path.includes(node.id),
      },
    }))

    // Convert graph edges to ReactFlow edges
    const flowEdges: Edge[] = graph.edges.map(edge => {
      const isPathEdge = path.some((node, index) => {
        const nextNode = path[index + 1]
        return (
          nextNode && 
          ((edge.source === node && edge.target === nextNode) ||
           (edge.target === node && edge.source === nextNode))
        )
      })

      return {
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        label: edge.weight.toString(),
        type: 'straight',
        animated: isPathEdge,
        style: {
          strokeWidth: 2,
          stroke: isPathEdge 
            ? '#10b981' 
            : theme === 'dark' ? '#fff' : '#000',
        },
        labelStyle: {
          fill: theme === 'dark' ? '#fff' : '#000',
          fontWeight: '700',
          fontSize: '14px',
        },
        labelBgStyle: {
          fill: theme === 'dark' ? '#1e293b' : '#e2e8f0',
          fillOpacity: 0.9,
          rx: 4,
          stroke: theme === 'dark' ? '#334155' : '#94a3b8',
          strokeWidth: 1,
          padding: 4,
        },
        labelShowBg: true,
      }
    })

    setNodes(flowNodes)
    setEdges(flowEdges)
  }, [graph, distances, path, currentNode, visitedNodes, theme])

  return (
    <div className="h-[800px] bg-background rounded-lg overflow-hidden border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.Straight}
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