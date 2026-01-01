"use client"

import { Card } from "@/components/ui/card"
import { LinkedList } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface LinkedListDisplayProps {
  list: LinkedList
  highlightedNodes: string[]
  message: string
  format?: (value: string) => React.ReactNode
}

interface Pointer {
  name: string
  nodeId: string | null
  color: string
}

interface ListNodeProps {
  id: string
  value: string
  isHighlighted: boolean
  showPrevArrow: boolean
  format?: (value: string) => React.ReactNode
}

function ListNode({ 
  id, 
  value, 
  isHighlighted,
  showPrevArrow,
  format,
}: ListNodeProps) {
  const displayValue = format ? format(value) : value.toString()
  
  return (
    <motion.div
      layout
      data-id={id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        backgroundColor: isHighlighted 
          ? 'hsl(var(--primary))' 
          : 'hsl(var(--muted))',
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center border border-border"
    >
      {showPrevArrow && (
        <motion.div 
          className="absolute -left-12 top-[60%] w-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full">
            <div className="h-[2px] w-full bg-muted-foreground" />
            <ArrowLeft className="h-4 w-4 text-muted-foreground absolute left-0 -translate-x-[2px] top-1/2 -translate-y-1/2" />
          </div>
        </motion.div>
      )}
      <span className={`text-lg font-mono ${
        isHighlighted ? 'text-primary-foreground' : ''
      }`}>
        {displayValue}
      </span>
    </motion.div>
  )
}

function NextArrow({ isHighlighted, isCurved = false }: { isHighlighted: boolean, isCurved?: boolean }) {
  if (isCurved) {
    return (
      <motion.div 
        className="flex-shrink-0 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={`h-16 w-[2px] ${
          isHighlighted ? 'bg-primary' : 'bg-muted-foreground'
        }`} />
        <div className="relative w-32 h-8">
          <div className={`absolute inset-0 border-t-2 border-r-2 rounded-tr-2xl ${
            isHighlighted ? 'border-primary' : 'border-muted-foreground'
          }`} />
          <ArrowRight className={`h-4 w-4 absolute right-0 translate-x-[2px] top-1/2 -translate-y-1/2 ${
            isHighlighted ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="flex-shrink-0 w-12 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full -translate-y-2">
        <div className={`h-[2px] w-full ${
          isHighlighted ? 'bg-primary' : 'bg-muted-foreground'
        }`} />
        <ArrowRight className={`h-4 w-4 absolute right-0 translate-x-[2px] top-1/2 -translate-y-1/2 ${
          isHighlighted ? 'text-primary' : 'text-muted-foreground'
        }`} />
      </div>
    </motion.div>
  )
}

function PointerLabel({ name, position, color }: { 
  name: string
  position: { x: number; y: number }
  color: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute pointer-events-none"
      style={{ 
        left: position.x,
        top: position.y,
        color: color
      }}
    >
      <div className="flex flex-col items-center">
        <div className="text-sm font-mono">{name}</div>
        <div className="h-6 w-[2px]" style={{ backgroundColor: color }} />
      </div>
    </motion.div>
  )
}

export function LinkedListDisplay({ 
  list, 
  highlightedNodes, 
  message,
  pointers = [],
  format,
}: LinkedListDisplayProps & { pointers?: Pointer[] }) {

  const getNodeChain = () => {
    const chain: string[] = []
    let current = list.head
    const visited = new Set<string>()

    while (current) {
      const node = list.nodes.get(current)
      if (!node) break
      
      chain.push(current)
      visited.add(current)
      
      if (node.next && visited.has(node.next)) {
        break
      }
      
      current = node.next
    }

    return chain
  }

  const nodeChain = getNodeChain()
  const isCircular = list.type === 'CSLL' || list.type === 'CDLL'
  const isDoubly = list.type === 'DLL' || list.type === 'CDLL'

  const getNodePosition = (nodeId: string): { x: number; y: number } | null => {
    const element = document.querySelector(`[data-id="${nodeId}"]`)
    if (!element) return null
    const rect = element.getBoundingClientRect()
    const container = document.querySelector('.list-container')
    if (!container) return null
    const containerRect = container.getBoundingClientRect()
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 40
    }
  }

  return (
    <Card className="p-6 relative">
      {message && (
        <div className="absolute top-4 left-4 text-sm text-muted-foreground">
          {message}
        </div>
      )}

      <div className="mt-12 flex items-center justify-center">
        <div className="list-container relative">
          <AnimatePresence>
            {pointers.map(pointer => 
              pointer.nodeId && (
                <PointerLabel
                  key={pointer.name}
                  name={pointer.name}
                  color={pointer.color}
                  position={getNodePosition(pointer.nodeId) || { x: 0, y: 0 }}
                />
              )
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-0 items-center">
            <AnimatePresence mode="popLayout">
              {nodeChain.map((nodeId, index) => (
                <div key={nodeId} className="flex items-center">
                  <ListNode
                    id={nodeId}
                    value={list.nodes.get(nodeId)!.value}
                    isHighlighted={highlightedNodes.includes(nodeId)}
                    showPrevArrow={isDoubly && index > 0}
                    format={format}
                  />
                  {index < nodeChain.length - 1 && (
                    <NextArrow 
                      isHighlighted={
                        highlightedNodes.includes(nodeId) && 
                        highlightedNodes.includes(nodeChain[index + 1])
                      }
                    />
                  )}
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {isCircular && list.head && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <NextArrow 
              isHighlighted={
                highlightedNodes.includes(list.tail!) && 
                highlightedNodes.includes(list.head)
              }
              isCurved
            />
            <span className="text-xs text-muted-foreground mt-2">
              Circular Connection
            </span>
          </div>
        </div>
      )}
    </Card>
  )
} 