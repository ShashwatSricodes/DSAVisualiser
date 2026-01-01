"use client"

import { Handle, Position } from 'reactflow'
import { motion } from 'framer-motion'

interface GraphNodeData {
  id: string
  distance: number
  isVisited: boolean
  isCurrent: boolean
  isPath: boolean
}

export default function GraphNode({ data }: { data: GraphNodeData }) {
  return (
    <>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="target" 
        position={Position.Bottom} 
        style={{ background: '#555' }}
      />
      
      <motion.div 
        className={`
          w-16 h-16 rounded-full
          flex flex-col items-center justify-center 
          border-2 font-medium
          ${data.isCurrent 
            ? 'bg-purple-500 border-purple-300' 
            : data.isPath
            ? 'bg-green-500 border-green-300'
            : data.isVisited
            ? 'bg-blue-500 border-blue-300'
            : 'bg-slate-600 border-slate-400'
          }
          ${data.isCurrent && 'shadow-lg shadow-purple-500/50'}
          ${data.isPath && 'shadow-lg shadow-green-500/50'}
        `}
        animate={{
          scale: data.isCurrent ? 1.1 : 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <span className="text-white text-lg">{data.id}</span>
        <span className="text-xs text-white/80">
          {data.distance === Infinity ? '∞' : data.distance}
        </span>
      </motion.div>

      <Handle 
        type="source" 
        position={Position.Left} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="source" 
        position={Position.Top} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#555' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: '#555' }}
      />
    </>
  )
} 