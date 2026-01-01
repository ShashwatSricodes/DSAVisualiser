import { useState, useCallback } from "react"
import { Message, Producer, Consumer } from "@/components/visualizer/queue-applications/types"

let messageIdCounter = 0

const DEFAULT_PROCESS_TIME = 2000 // 2 seconds per message

export function useMessageQueue() {
  const [queue, setQueue] = useState<Message[]>([])
  const [processed, setProcessed] = useState<Message[]>([])
  const [producers, setProducers] = useState<Producer[]>([
    { id: 'p1', name: 'Producer 1', messageCount: 0 },
    { id: 'p2', name: 'Producer 2', messageCount: 0 },
  ])
  const [consumers, setConsumers] = useState<Consumer[]>([
    { id: 'c1', name: 'Consumer 1', processedCount: 0, isProcessing: false },
    { id: 'c2', name: 'Consumer 2', processedCount: 0, isProcessing: false },
  ])

  const produceMessage = useCallback(async (producerId: string, content: string) => {
    const message: Message = {
      id: `msg-${messageIdCounter++}`,
      content,
      status: 'pending',
      timestamp: Date.now(),
    }

    setQueue(prev => [...prev, message])
    setProducers(prev => prev.map(p => 
      p.id === producerId 
        ? { ...p, messageCount: p.messageCount + 1 }
        : p
    ))
  }, [])

  const processNextMessage = useCallback(async (consumerId: string) => {
    if (queue.length === 0) return

    const message = queue[0]
    const newQueue = queue.slice(1)

    // Update message and consumer status
    message.status = 'processing'
    setQueue(newQueue)
    setConsumers(prev => prev.map(c => 
      c.id === consumerId 
        ? { ...c, isProcessing: true }
        : c
    ))

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, DEFAULT_PROCESS_TIME))

    // Mark as completed and update consumer
    message.status = 'completed'
    setProcessed(prev => [...prev, message])
    setConsumers(prev => prev.map(c => 
      c.id === consumerId 
        ? { ...c, processedCount: c.processedCount + 1, isProcessing: false }
        : c
    ))
  }, [queue])

  const clear = () => {
    setQueue([])
    setProcessed([])
    setProducers(prev => prev.map(p => ({ ...p, messageCount: 0 })))
    setConsumers(prev => prev.map(c => ({ ...c, processedCount: 0, isProcessing: false })))
    messageIdCounter = 0
  }

  return {
    queue,
    processed,
    producers,
    consumers,
    produceMessage,
    processNextMessage,
    clear,
  }
}