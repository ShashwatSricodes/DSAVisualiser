"use client"

import { HeapControls } from "@/components/visualizer/heap/heap-controls"
import { HeapDisplay } from "@/components/visualizer/heap/heap-display"
import { HeapArray } from "@/components/visualizer/heap/heap-array"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useHeap } from "@/hooks/use-heap"

interface HeapVisualizerProps {
  content: React.ReactNode
}

export function HeapVisualizer({ content }: HeapVisualizerProps) {
  const { 
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  } = useHeap()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {heapType === 'max' ? 'Max Heap' : 'Min Heap'}
        </h1>
        <p className="text-muted-foreground">
          A complete binary tree where each parent node is {heapType === 'max' ? 'greater' : 'smaller'} than its children.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HeapControls 
                onInsert={insert}
                onInsertMany={insertMany}
                onClear={clear}
                onToggleType={toggleHeapType}
                heapType={heapType}
              />
              <HeapArray array={heapArray} />
            </div>
            <div className="xl:col-span-2">
              <HeapDisplay 
                heap={heap}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 