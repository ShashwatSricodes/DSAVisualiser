"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { PolynomialMultiplication } from "./polynomial-multiplication"
import { Card } from "@/components/ui/card"

interface PolynomialVisualizerProps {
  content: React.ReactNode
}

export function PolynomialVisualizer({ content }: PolynomialVisualizerProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Polynomial Multiplication</h1>
        <p className="text-muted-foreground">
          Visualize polynomial multiplication using linked lists.
        </p>
      </div>

      <Tabs defaultValue="multiply" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="multiply">Multiply</TabsTrigger>
          <TabsTrigger value="explanation">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="multiply" className="space-y-6">
          <Card className="p-6">
            <PolynomialMultiplication />
          </Card>
        </TabsContent>
        
        <TabsContent value="explanation" className="prose dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 