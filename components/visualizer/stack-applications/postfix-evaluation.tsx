"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Token } from "./types"
import { usePostfixEvaluation } from "@/hooks/use-postfix-evaluation"
import { TokenDisplay } from "@/components/visualizer/stack-applications/token-display"

interface PostfixEvaluationProps {
  expression: Token[]
}

export function PostfixEvaluation({ expression }: PostfixEvaluationProps) {
  const { steps, isEvaluating, result, evaluate } = usePostfixEvaluation()

  const handleEvaluate = () => {
    if (!isEvaluating) {
      evaluate(expression)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Postfix Expression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
            {expression.map((token, i) => (
              <TokenDisplay 
                key={i} 
                token={token} 
                highlighted={steps.length > 0 && steps[steps.length - 1].currentPosition === i}
              />
            ))}
          </div>
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || expression.length === 0}
            className="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            Evaluate Expression
          </button>
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stack visualization */}
            <div>
              <div className="text-sm font-medium mb-2">Stack Contents</div>
              <div className="relative h-[300px] border-2 border-primary/50 rounded-lg overflow-hidden flex flex-col justify-end">
                <div className="p-4">
                  <AnimatePresence mode="popLayout">
                    {[...steps[steps.length - 1].stack].reverse().map((value, i) => (
                      <motion.div
                        key={`${value}-${i}`}
                        layout
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-3 border-b border-primary/20 first:border-t"
                      >
                        <div className="px-3 py-1.5 rounded-md font-mono text-sm bg-green-500/20 text-green-500">
                          {value}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Current action */}
            <div className="text-base text-muted-foreground font-medium">
              {steps[steps.length - 1].message}
            </div>
          </CardContent>
        </Card>
      )}

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold text-primary">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 