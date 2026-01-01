// CustomEdge.tsx
import { BaseEdge, getStraightPath } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd="url(#arrowhead)"
      style={{
        stroke: '#fff',
        strokeWidth: 2
      }}
    />
  );
}
