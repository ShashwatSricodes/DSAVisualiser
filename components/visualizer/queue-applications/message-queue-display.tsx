"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Message, Consumer } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

interface MessageQueueDisplayProps {
  queue: Message[]
  processed: Message[]
  consumers: Consumer[]
}

function MessageCard({ message }: { message: Message }) {
  const getStatusColor = () => {
    switch (message.status) {
      case 'pending': return 'bg-muted'
      case 'processing': return 'bg-yellow-500/20 text-yellow-500'
      case 'completed': return 'bg-green-500/20 text-green-500'
      case 'failed': return 'bg-red-500/20 text-red-500'
      default: return 'bg-muted'
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg ${getStatusColor()} transition-colors`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="font-mono text-sm">{message.content}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </p>
        </div>
        <span className="text-xs font-medium capitalize">
          {message.status}
        </span>
      </div>
    </motion.div>
  )
}

export function MessageQueueDisplay({ queue, processed, consumers }: MessageQueueDisplayProps) {
  const activeConsumers = consumers.filter(c => c.isProcessing).length

  return (
    <div className="space-y-6">
      {/* Queue Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Message Queue</CardTitle>
            <span className="text-sm text-muted-foreground">
              {queue.length} messages waiting
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {queue.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Processing Section */}
      {activeConsumers > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Currently Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {consumers.filter(c => c.isProcessing).map((consumer) => (
                <div key={consumer.id} className="text-sm text-muted-foreground">
                  {consumer.name} is processing...
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processed Messages */}
      {processed.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Processed Messages</CardTitle>
              <span className="text-sm text-muted-foreground">
                {processed.length} completed
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {[...processed].reverse().slice(0, 5).map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 