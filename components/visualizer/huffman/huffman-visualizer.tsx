"use client"

import { HuffmanControls } from "./huffman-controls"
import { HuffmanDisplay } from "./huffman-display"
import { HuffmanAnalysis } from "./huffman-analysis"
import { HuffmanCodes } from "./huffman-codes"
import { CompressionDisplay } from "./compression-display"
import { FrequencyList } from "./frequency-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useHuffman } from "@/hooks/use-huffman"

interface HuffmanVisualizerProps {
  content: React.ReactNode
}

export function HuffmanVisualizer({ content }: HuffmanVisualizerProps) {
  const {
    tree,
    steps,
    currentStep,
    highlightedNodes,
    codes,
    isAnimating,
    buildHuffmanTree,
    nextStep,
    previousStep,
    reset,
    originalText,
    frequencies
  } = useHuffman()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Huffman Coding</h1>
        <p className="text-muted-foreground">
          A data compression technique that assigns variable-length codes to characters based on their frequencies.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HuffmanControls
                onEncode={buildHuffmanTree}
                onNext={nextStep}
                onPrevious={previousStep}
                onReset={reset}
                isAnimating={isAnimating}
                currentStep={currentStep}
                totalSteps={steps.length}
              />
              <HuffmanCodes codes={codes} />
              <CompressionDisplay 
                originalText={originalText}
                codes={codes}
              />
            </div>
            <div className="xl:col-span-2 space-y-6">
              <HuffmanDisplay
                tree={tree}
                highlightedNodes={highlightedNodes}
                message={steps[currentStep]?.message || ''}
              />
              <FrequencyList 
                frequencies={frequencies}
                totalChars={originalText.length}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <HuffmanAnalysis tree={tree} codes={codes} />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 