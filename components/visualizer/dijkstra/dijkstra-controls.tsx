"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Node } from "@/hooks/use-dijkstra"
import { exampleGraphs } from "./example-graphs"
import { Play, Pause } from "lucide-react"

interface DijkstraControlsProps {
  onAddNode: (x: number, y: number) => void
  onAddEdge: (source: string, target: string, weight: number) => void
  onSetStartNode: (nodeId: string) => void
  onSetEndNode: (nodeId: string) => void
  onFindPath: () => void
  onClear: () => void
  onNext: () => void
  onPrevious: () => void
  isAnimating: boolean
  currentStep: number
  totalSteps: number
  onLoadExample: (graphIndex: number) => void
  startNodeId: string | null
  endNodeId: string | null
  path: string[]
  distances: Map<string, number>
  onAutoPlay: () => void
  isAutoPlaying: boolean
}

export function DijkstraControls({
  onAddNode,
  onAddEdge,
  onSetStartNode,
  onSetEndNode,
  onFindPath,
  onClear,
  onNext,
  onPrevious,
  isAnimating,
  currentStep,
  totalSteps,
  onLoadExample,
  startNodeId,
  endNodeId,
  path,
  distances,
  onAutoPlay,
  isAutoPlaying,
}: DijkstraControlsProps) {
  const [sourceNode, setSourceNode] = useState("")
  const [targetNode, setTargetNode] = useState("")
  const [weight, setWeight] = useState("")

  const handleAddEdge = () => {
    const weightNum = Number(weight)
    if (sourceNode && targetNode && !isNaN(weightNum)) {
      onAddEdge(sourceNode, targetNode, weightNum)
      setSourceNode("")
      setTargetNode("")
      setWeight("")
    }
  }

  const getTotalDistance = () => {
    if (path.length === 0) return null
    const lastNode = path[path.length - 1]
    return distances.get(lastNode)
  }

  return (
    <Card className="w-full h-[800px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
        <CardDescription>Configure and run the algorithm</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="build" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="build">Build Graph</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Example Graphs</CardTitle>
                  <CardDescription>Load a predefined graph</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => onLoadExample(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an example" />
                    </SelectTrigger>
                    <SelectContent>
                      {exampleGraphs.map((graph, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          <div className="flex flex-col">
                            <span>{graph.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {graph.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Manual Build</CardTitle>
                  <CardDescription>Add nodes and edges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Button 
                      onClick={() => onAddNode(Math.random() * 500, Math.random() * 300)}
                      className="w-full"
                    >
                      Add Random Node
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={sourceNode}
                        onChange={(e) => setSourceNode(e.target.value)}
                        placeholder="Source node ID"
                      />
                      <Input
                        value={targetNode}
                        onChange={(e) => setTargetNode(e.target.value)}
                        placeholder="Target node ID"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Edge weight"
                        type="number"
                        className="flex-1"
                      />
                      <Button onClick={handleAddEdge}>Add Edge</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Find Shortest Path</CardTitle>
                <CardDescription>Set start/end nodes and find path</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Node</label>
                    <Input
                      key="start-node"
                      defaultValue={startNodeId ?? ""}
                      placeholder="Node ID"
                      onChange={(e) => onSetStartNode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Node</label>
                    <Input
                      key="end-node"
                      defaultValue={endNodeId ?? ""}
                      placeholder="Node ID"
                      onChange={(e) => onSetEndNode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={onFindPath}
                    disabled={isAnimating}
                    className="w-full"
                    variant="default"
                  >
                    Find Shortest Path
                  </Button>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={onPrevious}
                      disabled={currentStep <= 0 || isAnimating}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={onAutoPlay}
                      disabled={currentStep >= totalSteps - 1}
                      variant="outline"
                    >
                      {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={onNext}
                      disabled={currentStep >= totalSteps - 1 || isAnimating}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Path</CardTitle>
                <CardDescription>Path details and distance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {path.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Path:</span>
                        <span className="font-mono text-sm">
                          {path.join(" → ")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Distance:</span>
                        <span className="font-mono text-sm">
                          {getTotalDistance() === Infinity ? "∞" : getTotalDistance()}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {path.length === 1 
                        ? "Click 'Find Shortest Path' to start" 
                        : `Found path with ${path.length - 1} edges`
                      }
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground text-center">
                    No path found yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <Button 
          variant="destructive" 
          onClick={onClear}
          className="w-full"
        >
          Clear Graph
        </Button>

        {totalSteps > 0 && (
          <div className="text-sm text-muted-foreground text-center mt-4">
            Step {currentStep + 1} of {totalSteps}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 