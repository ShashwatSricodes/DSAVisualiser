"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CompressionDisplayProps {
  originalText: string
  codes: Map<string, string>
}

export function CompressionDisplay({ originalText, codes }: CompressionDisplayProps) {
  if (!originalText || codes.size === 0) return null

  const originalBits = originalText.length * 8
  const compressedBits = Array.from(originalText).reduce((total, char) => {
    return total + (codes.get(char)?.length || 0)
  }, 0)

  const compressionRatio = originalBits / compressedBits
  const spaceSaving = ((1 - 1/compressionRatio) * 100).toFixed(1)

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Compression Visualization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Original Text ({originalBits} bits):</div>
          <div className="flex flex-wrap gap-1">
            {Array.from(originalText).map((char, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center 
                         bg-primary/10 border border-primary/20 rounded-md
                         font-mono text-sm"
                title="8 bits per character"
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Compressed ({compressedBits} bits):
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from(originalText).map((char, i) => {
              const code = codes.get(char) || ''
              return (
                <div
                  key={i}
                  className="h-8 flex items-center justify-center px-2
                           bg-green-500/10 border border-green-500/20 rounded-md
                           font-mono text-xs"
                  title={`${code.length} bits`}
                >
                  {code}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm">Compression Ratio:</div>
          <div className="font-mono text-green-500">
            {compressionRatio.toFixed(2)}x ({spaceSaving}% smaller)
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 