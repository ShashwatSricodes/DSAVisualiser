"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useMessageQueue } from "@/hooks/use-message-queue"
import { MessageQueueDisplay } from "@/components/visualizer/queue-applications/message-queue-display"
import { ProducerControls } from "@/components/visualizer/queue-applications/producer-controls"
import { ConsumerControls } from "@/components/visualizer/queue-applications/consumer-controls"

export function MessageQueueVisualizer({ content }: { content: React.ReactNode }) {
  const { 
    queue,
    processed,
    producers,
    consumers,
    produceMessage,
    processNextMessage,
    clear,
  } = useMessageQueue()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Message Queue</h1>
        <p className="text-muted-foreground">
          A queue-based system for handling asynchronous message processing between producers and consumers.
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
              <ProducerControls 
                producers={producers}
                onProduce={produceMessage}
              />
              <ConsumerControls 
                consumers={consumers}
                onProcess={processNextMessage}
                queueSize={queue.length}
              />
            </div>
            <div className="xl:col-span-2">
              <MessageQueueDisplay 
                queue={queue}
                processed={processed}
                consumers={consumers}
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