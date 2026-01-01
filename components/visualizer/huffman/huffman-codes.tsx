import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HuffmanCodesProps {
  codes: Map<string, string>
}

export function HuffmanCodes({ codes }: HuffmanCodesProps) {
  if (codes.size === 0) return null

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Huffman Codes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {Array.from(codes.entries()).map(([char, code]) => (
            <div 
              key={char}
              className="flex justify-between items-center p-2 bg-muted rounded-md"
            >
              <span className="font-mono">'{char}'</span>
              <span className="font-mono text-primary">{code}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 