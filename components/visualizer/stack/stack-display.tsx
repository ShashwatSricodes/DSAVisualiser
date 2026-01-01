"use client"

import { StackNode } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface StackDisplayProps {
  stack: StackNode[]
  highlightedIndex: number | null
}

export function StackDisplay({ stack, highlightedIndex }: StackDisplayProps) {
  return (
    <div className="relative h-[600px] bg-card rounded-lg p-6 flex items-center justify-center">
      <div className="relative w-48 h-full border-2 border-primary/50 rounded-lg overflow-hidden">
        {/* Stack pointer */}
        <motion.div
          className="absolute right-full mr-4 flex items-center text-primary"
          animate={{ 
            top: stack.length > 0 ? `${64 * (8 - stack.length)}px` : "calc(100% - 64px)"
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="mr-2 font-mono">top</span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>

        {/* Stack elements */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
          <AnimatePresence mode="popLayout">
            {stack.map((node) => (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  backgroundColor: highlightedIndex === node.index 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--muted))',
                }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="h-16 border-t border-primary/20 flex items-center justify-center"
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
  )
} 