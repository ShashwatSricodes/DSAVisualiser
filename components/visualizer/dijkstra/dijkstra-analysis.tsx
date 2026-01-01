"use client"

import { Graph } from "@/hooks/use-dijkstra"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DijkstraAnalysisProps {
  graph: Graph
  distances: Map<string, number>
  path: string[]
  visitedNodes: Set<string>
}

export function DijkstraAnalysis({
  graph,
  distances,
  path,
  visitedNodes,
}: DijkstraAnalysisProps) {
  const shortestDistance = path.length > 0 ? distances.get(path[path.length - 1]) : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Graph Structure</CardTitle>
          <CardDescription>Basic graph metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Nodes:</span>
            <span className="font-mono">{graph.nodes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Edges:</span>
            <span className="font-mono">{graph.edges.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Average Degree:</span>
            <span className="font-mono">
              {graph.nodes.length > 0 
                ? (2 * graph.edges.length / graph.nodes.length).toFixed(2)
                : '0.00'
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Algorithm Progress</CardTitle>
          <CardDescription>Current search status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Visited Nodes:</span>
            <span className="font-mono">{visitedNodes.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining Nodes:</span>
            <span className="font-mono">
              {graph.nodes.length - visitedNodes.size}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Progress:</span>
            <span className="font-mono">
              {graph.nodes.length > 0
                ? `${((visitedNodes.size / graph.nodes.length) * 100).toFixed(1)}%`
                : '0%'
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Path Analysis</CardTitle>
          <CardDescription>Shortest path details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Path Length:</span>
            <span className="font-mono">{path.length - 1} edges</span>
          </div>
          <div className="flex justify-between">
            <span>Total Distance:</span>
            <span className="font-mono">
              {shortestDistance === null || shortestDistance === Infinity 
                ? '∞' 
                : shortestDistance
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span>Path:</span>
            <span className="font-mono">
              {path.length > 0 ? path.join(' → ') : 'None'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 