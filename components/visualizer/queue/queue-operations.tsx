import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QueueOperation } from "./types"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface QueueOperationsProps {
  operations: QueueOperation[]
}

export function QueueOperations({ operations }: QueueOperationsProps) {
  if (operations.length === 0) return null

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Operation History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {operations.map((op) => (
            <div 
              key={op.timestamp}
              className="flex items-center gap-2 text-sm"
            >
              {op.type === 'enqueue' ? (
                <>
                  <ArrowRight className="h-4 w-4 text-green-500" />
                  <span>Enqueue: {op.value}</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4 text-red-500" />
                  <span>Dequeue: {op.value}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 