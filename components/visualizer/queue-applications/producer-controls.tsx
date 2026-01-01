"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Producer } from "./types"

interface ProducerControlsProps {
  producers: Producer[]
  onProduce: (producerId: string, content: string) => void
}

export function ProducerControls({ producers, onProduce }: ProducerControlsProps) {
  const [message, setMessage] = useState("")
  const [selectedProducer, setSelectedProducer] = useState(producers[0].id)

  const handleProduce = () => {
    if (message.trim()) {
      onProduce(selectedProducer, message.trim())
      setMessage("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Producers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {producers.map((producer) => (
            <Button
              key={producer.id}
              variant={selectedProducer === producer.id ? "default" : "outline"}
              onClick={() => setSelectedProducer(producer.id)}
              className="relative"
            >
              {producer.name}
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {producer.messageCount}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            onKeyDown={(e) => e.key === 'Enter' && handleProduce()}
          />
          <Button onClick={handleProduce}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 