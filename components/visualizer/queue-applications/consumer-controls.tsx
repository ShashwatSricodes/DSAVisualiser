"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Consumer } from "./types"
import { Loader2 } from "lucide-react"

interface ConsumerControlsProps {
  consumers: Consumer[]
  onProcess: (consumerId: string) => void
  queueSize: number
}

export function ConsumerControls({ consumers, onProcess, queueSize }: ConsumerControlsProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Consumers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {consumers.map((consumer) => (
            <Button
              key={consumer.id}
              variant="outline"
              onClick={() => onProcess(consumer.id)}
              disabled={consumer.isProcessing || queueSize === 0}
              className="relative w-full"
            >
              <div className="flex items-center justify-between w-full">
                <span>{consumer.name}</span>
                {consumer.isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {consumer.processedCount} processed
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 