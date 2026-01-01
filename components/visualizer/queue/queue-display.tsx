"use client"

import { QueueNode } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface QueueDisplayProps {
  queue: QueueNode[]
  highlightedIndex: number | null
}

export function QueueDisplay({ queue, highlightedIndex }: QueueDisplayProps) {
  return (
    <Card className="p-6 relative min-h-[400px] flex items-center">
      {/* Queue container */}
      <div className="w-full">
        {/* Front and Rear labels */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
            Front
          </div>
          {queue.length > 0 && (
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Rear
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Queue visualization */}
        <div className="relative h-32 border-2 border-primary/50 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="flex gap-2 px-4 w-full">
              <AnimatePresence mode="popLayout">
                {queue.map((node) => (
                  <motion.div
                    key={node.id}
                    layout
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      backgroundColor: highlightedIndex === node.index 
                        ? 'hsl(var(--primary))' 
                        : 'hsl(var(--muted))',
                    }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-20 h-20 rounded-md flex items-center justify-center border border-border"
                  >
                    <span className={`text-lg font-mono ${
                      highlightedIndex === node.index ? 'text-primary-foreground' : ''
                    }`}>
                      {node.value}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Queue size indicator */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Queue Size: {queue.length}
        </div>
      </div>
    </Card>
  )
} 