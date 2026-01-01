"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useInfixConversion } from "@/hooks/use-infix-conversion"
import { ConversionSteps } from "./conversion-steps"
import { Token } from "./types"
import { PostfixEvaluation } from "./postfix-evaluation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"

const EXAMPLE_EXPRESSION = "K+L-M*N+(O^P)*W/U/V*T+Q"

interface InfixPostfixVisualizerProps {
  content: React.ReactNode
}

export function InfixPostfixVisualizer({ content }: InfixPostfixVisualizerProps) {
  const [expression, setExpression] = useState("")
  const { steps, isConverting, result, convert } = useInfixConversion()

  const handleConvert = () => {
    if (!expression.trim() || isConverting) return
    convert(expression)
  }

  const formatResult = (tokens: Token[]) => {
    return tokens.map(t => t.value).join(' ')
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Infix to Postfix Conversion</h1>
        <p className="text-muted-foreground">
          Convert infix expressions to postfix notation using a stack.
        </p>
      </div>

      <Tabs defaultValue="conversion" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversion" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expression Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Enter infix expression (e.g., 3+4*2)"
                    onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                    disabled={isConverting}
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleConvert}
                      disabled={isConverting || !expression.trim()}
                      className="flex-1"
                    >
                      Convert to Postfix
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setExpression(EXAMPLE_EXPRESSION)}
                      disabled={isConverting}
                    >
                      Use Example
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-muted rounded-md font-mono break-all">
                      {formatResult(result)}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="xl:col-span-2">
              <ConversionSteps steps={steps} currentExpression={expression} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6">
          {result.length > 0 ? (
            <PostfixEvaluation expression={result} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Convert an infix expression first to see its evaluation
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 