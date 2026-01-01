"use client"

import { Handle, Position } from 'reactflow'
import { motion } from 'framer-motion'

export default function TreeNode({ data }: { data: { id: string, value: number, highlighted: boolean } }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <motion.div 
        className={`
          w-[50px] h-[50px] 
          rounded-full flex items-center justify-center 
          border-2 border-white
          font-medium text-white
          ${data.highlighted ? 'bg-purple-500 shadow-lg shadow-purple-500/50' : 'bg-slate-600'}
        `}
        animate={{
          scale: data.highlighted ? 1.1 : 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        {data.value}
      </motion.div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
} 