"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FrequencyListProps {
  frequencies: Map<string, number>
  totalChars: number
}

export function FrequencyList({ frequencies, totalChars }: FrequencyListProps) {
  if (frequencies.size === 0) return null

  // Sort frequencies by count (descending)
  const sortedFrequencies = Array.from(frequencies.entries())
    .sort((a, b) => b[1] - a[1])

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Character Frequencies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {sortedFrequencies.map(([char, count]) => (
            <div 
              key={char}
              className="flex items-center justify-between p-2 
                         bg-muted/50 rounded-md"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono bg-primary/10 px-2 py-1 rounded">
                  '{char}'
                </span>
                <span className="text-sm">
                  × {count}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {((count / totalChars) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 