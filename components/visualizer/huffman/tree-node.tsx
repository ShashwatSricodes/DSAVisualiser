"use client"

import { Handle, Position } from 'reactflow'
import { motion } from 'framer-motion'

interface HuffmanTreeNodeData {
  value: string
  frequency: number
  code?: string
  highlighted: boolean
}

export default function TreeNode({ data }: { data: HuffmanTreeNodeData }) {
  const isLeaf = data.code !== undefined

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <motion.div 
        className={`
          min-w-[80px] px-3 py-2
          rounded-lg flex flex-col items-center justify-center 
          border-2 font-medium
          ${data.highlighted 
            ? 'bg-purple-500 border-purple-300 shadow-lg shadow-purple-500/50' 
            : 'bg-slate-600 border-slate-400'
          }
        `}
        animate={{
          scale: data.highlighted ? 1.1 : 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <span className="text-white">{isLeaf ? `'${data.value}'` : data.value}</span>
        <span className="text-xs text-white/80">f={data.frequency}</span>
        {data.code && (
          <span className="text-xs mt-1 font-bold text-white/90">{data.code}</span>
        )}
      </motion.div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
} 