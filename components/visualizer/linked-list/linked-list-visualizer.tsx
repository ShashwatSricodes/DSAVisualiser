"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { LinkedListDisplay } from "@/components/visualizer/linked-list/linked-list-display"
import { LinkedListControls } from "@/components/visualizer/linked-list/linked-list-controls"
import { LinkedListOperations } from "@/components/visualizer/linked-list/linked-list-operations"
import { useLinkedList } from "@/hooks/use-linked-list"
import { ListType } from "./types"

const LIST_TYPES: { value: ListType; label: string }[] = [
  { value: 'SLL', label: 'SLL' },
  { value: 'DLL', label: 'DLL' },
  { value: 'CSLL', label: 'CSLL' },
  { value: 'CDLL', label: 'CDLL' },
]

interface LinkedListVisualizerProps {
  content: React.ReactNode
}

export function LinkedListVisualizer({ content }: LinkedListVisualizerProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Linked List</h1>
        <p className="text-muted-foreground">
          A dynamic data structure with nodes connected through references.
        </p>
      </div>

      <Tabs defaultValue="SLL" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {LIST_TYPES.map(type => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="explanation">Info</TabsTrigger>
        </TabsList>

        {LIST_TYPES.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-6">
            <LinkedListContent type={type.value} />
          </TabsContent>
        ))}
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LinkedListContent({ type }: { type: ListType }) {
  const {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
  } = useLinkedList(type)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 space-y-6">
        <LinkedListControls 
          onInsertFront={insertFront}
          onInsertBack={insertBack}
          onDeleteFront={deleteFront}
          onDeleteBack={deleteBack}
          onReverse={reverse}
          isAnimating={isAnimating}
          isEmpty={!list.head}
        />
        <LinkedListOperations operations={operations} />
      </div>
      <div className="xl:col-span-2">
        <LinkedListDisplay 
          list={list}
          highlightedNodes={animationState.highlightedNodes}
          message={animationState.message}
        />
      </div>
    </div>
  )
} 