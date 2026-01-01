import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListOperation } from "./types"
import { ArrowRight, ArrowLeft, Repeat } from "lucide-react"

interface LinkedListOperationsProps {
  operations: ListOperation[]
}

export function LinkedListOperations({ operations }: LinkedListOperationsProps) {
  if (operations.length === 0) return null

  const getIcon = (type: ListOperation['type']) => {
    switch (type) {
      case 'insert-front':
        return <ArrowLeft className="h-4 w-4 text-green-500" />
      case 'insert-back':
        return <ArrowRight className="h-4 w-4 text-green-500" />
      case 'delete-front':
        return <ArrowLeft className="h-4 w-4 text-red-500" />
      case 'delete-back':
        return <ArrowRight className="h-4 w-4 text-red-500" />
      case 'reverse':
        return <Repeat className="h-4 w-4 text-blue-500" />
    }
  }

  const getMessage = (op: ListOperation) => {
    switch (op.type) {
      case 'insert-front':
        return `Insert ${op.value} at front`
      case 'insert-back':
        return `Insert ${op.value} at back`
      case 'delete-front':
        return 'Delete from front'
      case 'delete-back':
        return 'Delete from back'
      case 'reverse':
        return 'Reverse list'
    }
  }

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
              {getIcon(op.type)}
              <span>{getMessage(op)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 