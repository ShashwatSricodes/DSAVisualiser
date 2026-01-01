"use client"

import { StackControls } from "@/components/visualizer/stack/stack-controls"
import { StackDisplay } from "@/components/visualizer/stack/stack-display"
import { StackOperations } from "@/components/visualizer/stack/stack-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useStack } from "@/hooks/use-stack"

interface StackVisualizerProps {
  content: React.ReactNode
}

export function StackVisualizer({ content }: StackVisualizerProps) {
  const { 
    stack,
    operations,
    isAnimating,
    highlightedIndex,
    push,
    pop,
    clear,
    isFull,
    isEmpty,
  } = useStack()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Stack</h1>
        <p className="text-muted-foreground">
          A Last-In-First-Out (LIFO) data structure with push and pop operations.
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
              <StackControls 
                onPush={push}
                onPop={pop}
                onClear={clear}
                isAnimating={isAnimating}
                isFull={isFull}
                isEmpty={isEmpty}
              />
              <StackOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <StackDisplay 
                stack={stack}
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