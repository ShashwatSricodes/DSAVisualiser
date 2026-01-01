"use client"

import { QueueControls } from "@/components/visualizer/queue/queue-controls"
import { QueueDisplay } from "@/components/visualizer/queue/queue-display"
import { QueueOperations } from "@/components/visualizer/queue/queue-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useQueue } from "@/hooks/use-queue"

interface QueueVisualizerProps {
  content: React.ReactNode
}

export function QueueVisualizer({ content }: QueueVisualizerProps) {
  const { 
    queue,
    operations,
    isAnimating,
    highlightedIndex,
    enqueue,
    dequeue,
    clear,
    isFull,
    isEmpty,
  } = useQueue()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Queue</h1>
        <p className="text-muted-foreground">
          A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations.
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
              <QueueControls 
                onEnqueue={enqueue}
                onDequeue={dequeue}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <QueueOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <QueueDisplay 
                queue={queue}
                highlightedIndex={highlightedIndex}
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