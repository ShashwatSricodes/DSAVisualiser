export interface Message {
  id: string
  content: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  timestamp: number
}

export interface MessageQueueState {
  queue: Message[]
  processed: Message[]
  currentMessage?: Message
  isProcessing: boolean
}

export interface Producer {
  id: string
  name: string
  messageCount: number
}

export interface Consumer {
  id: string
  name: string
  processedCount: number
  isProcessing: boolean
} 