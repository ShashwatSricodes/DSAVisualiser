import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HeapArrayProps {
  array: number[]
}

export function HeapArray({ array }: HeapArrayProps) {
  if (array.length === 0) return null

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Array Representation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-2">
          {array.map((value, index) => (
            <div 
              key={index}
              className="flex flex-col items-center"
            >
              <div className="text-xs text-muted-foreground mb-1">{index}</div>
              <div className="bg-muted px-3 py-1.5 rounded-md text-sm font-medium">
                {value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 