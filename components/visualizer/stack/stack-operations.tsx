import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StackOperation } from "./types"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StackOperationsProps {
  operations: StackOperation[]
}

export function StackOperations({ operations }: StackOperationsProps) {
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
              {op.type === 'push' ? (
                <>
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <span>Push: {op.value}</span>
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4 text-red-500" />
                  <span>Pop: {op.value}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 