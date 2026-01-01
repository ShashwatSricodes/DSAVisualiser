"use client"

import { DijkstraControls } from "@/components/visualizer/dijkstra/dijkstra-controls"
import { DijkstraDisplay } from "@/components/visualizer/dijkstra/dijkstra-display"
import { DijkstraAnalysis } from "@/components/visualizer/dijkstra/dijkstra-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useDijkstra } from "@/hooks/use-dijkstra"

interface DijkstraVisualizerProps {
  content: React.ReactNode
}

export function DijkstraVisualizer({ content }: DijkstraVisualizerProps) {
  const {
    graph,
    distances,
    path,
    currentNode,
    visitedNodes,
    isAnimating,
    addNode,
    addEdge,
    setStartNode,
    setEndNode,
    findShortestPath,
    clear,
    nextStep,
    previousStep,
    currentStep,
    totalSteps,
    loadExample,
    startNodeId,
    endNodeId,
    isAutoPlaying,
    toggleAutoPlay,
  } = useDijkstra()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dijkstra's Algorithm</h1>
        <p className="text-muted-foreground">
          Visualize how Dijkstra's algorithm finds the shortest path between nodes in a weighted graph.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <DijkstraControls
                onAddNode={addNode}
                onAddEdge={addEdge}
                onSetStartNode={setStartNode}
                onSetEndNode={setEndNode}
                onFindPath={findShortestPath}
                onClear={clear}
                onNext={nextStep}
                onPrevious={previousStep}
                isAnimating={isAnimating}
                currentStep={currentStep}
                totalSteps={totalSteps}
                onLoadExample={loadExample}
                startNodeId={startNodeId}
                endNodeId={endNodeId}
                path={path}
                distances={distances}
                onAutoPlay={toggleAutoPlay}
                isAutoPlaying={isAutoPlaying}
              />
            </div>
            <div className="lg:col-span-3">
              <DijkstraDisplay
                graph={graph}
                distances={distances}
                path={path}
                currentNode={currentNode}
                visitedNodes={visitedNodes}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <DijkstraAnalysis
            graph={graph}
            distances={distances}
            path={path}
            visitedNodes={visitedNodes}
          />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 