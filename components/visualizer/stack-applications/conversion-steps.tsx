"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConversionStep, Token } from "./types"
import { motion, AnimatePresence } from "framer-motion"

interface ConversionStepsProps {
  steps: ConversionStep[]
  currentExpression: string
}

function TokenDisplay({ token, highlighted = false }: { token: Token; highlighted?: boolean }) {
  const getColor = () => {
    switch (token.type) {
      case 'operator': return 'bg-blue-500/20 text-blue-500'
      case 'operand': return 'bg-green-500/20 text-green-500'
      case 'parenthesis': return 'bg-orange-500/20 text-orange-500'
      default: return 'bg-muted'
    }
  }

  return (
    <div className={`px-3 py-1.5 rounded-md font-mono text-sm ${getColor()} ${
      highlighted ? 'ring-2 ring-primary' : ''
    }`}>
      {token.value}
    </div>
  )
}

export function ConversionSteps({ steps, currentExpression }: ConversionStepsProps) {
  if (steps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversion Steps</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-center py-8">
          Enter an expression to see the conversion steps
        </CardContent>
      </Card>
    )
  }

  const currentStep = steps[steps.length - 1]
  const currentToken = currentStep.state.currentToken
  const currentPosition = currentStep.state.currentPosition

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current character */}
        <div>
          <div className="text-sm font-medium mb-2">Current Expression</div>
          <div className="font-mono text-lg p-4 bg-muted/50 rounded-lg flex flex-wrap gap-2">
            {currentExpression.split('').map((char, i) => (
              <div 
                key={i}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  i === currentPosition
                    ? 'bg-primary/20 text-primary ring-2 ring-primary font-bold' 
                    : 'bg-muted/50'
                }`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* Stack visualization */}
        <div>
          <div className="text-sm font-medium mb-2">Stack Contents</div>
          <div className="relative h-[300px] border-2 border-primary/50 rounded-lg overflow-hidden flex flex-col justify-end">
            <div className="p-4">
              <AnimatePresence mode="popLayout">
                {[...currentStep.state.stack].reverse().map((token, i) => (
                  <motion.div
                    key={`${token.value}-${i}`}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-3 border-b border-primary/20 first:border-t"
                  >
                    <TokenDisplay 
                      token={token} 
                      highlighted={currentToken?.value === token.value}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Output visualization */}
        <div>
          <div className="text-sm font-medium mb-2">Output</div>
          <div className="flex flex-wrap gap-2 min-h-[64px] p-4 bg-muted/50 rounded-lg">
            <AnimatePresence mode="popLayout">
              {currentStep.state.output.map((token, i) => (
                <motion.div
                  key={`${token.value}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <TokenDisplay token={token} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Current action */}
        <div className="text-base text-muted-foreground font-medium">
          {currentStep.action}
        </div>
      </CardContent>
    </Card>
  )
} 