import { BaseEdge, getStraightPath } from 'reactflow'

export default function CustomEdge({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY 
}: {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <BaseEdge 
      id={id} 
      path={edgePath} 
      style={{
        stroke: '#555',   // dull gray stroke
        strokeWidth: 2,
      }}
      markerEnd="url(#arrowhead)"  // add arrowhead here
    />
  )
} 
