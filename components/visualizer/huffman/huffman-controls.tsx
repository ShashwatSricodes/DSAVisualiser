"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface HuffmanControlsProps {
  onEncode: (text: string) => void
  onNext: () => void
  onPrevious: () => void
  onReset: () => void
  isAnimating: boolean
  currentStep: number
  totalSteps: number
}

export function HuffmanControls({
  onEncode,
  onNext,
  onPrevious,
  onReset,
  isAnimating,
  currentStep,
  totalSteps,
}: HuffmanControlsProps) {
  const [text, setText] = useState("")

  const handleEncode = () => {
    if (text.trim()) {
      onEncode(text)
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Huffman Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to encode"
              onKeyDown={(e) => e.key === 'Enter' && handleEncode()}
              disabled={isAnimating}
              className="flex-1"
            />
            <Button 
              onClick={handleEncode}
              disabled={isAnimating || !text.trim()}
            >
              Encode
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={onPrevious}
            disabled={currentStep <= 0 || isAnimating}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={currentStep >= totalSteps - 1 || isAnimating}
            variant="outline"
          >
            Next
          </Button>
          <Button
            onClick={onReset}
            disabled={isAnimating}
            variant="destructive"
          >
            Reset
          </Button>
        </div>

        {totalSteps > 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Step {currentStep + 1} of {totalSteps}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 