"use client"

import { HuffmanNode } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface TreeAnalysis {
  nodeCount: number
  height: number
  leafCount: number
  averageCodeLength: number
  compressionRatio: number
  internalNodes: number
}

function analyzeTree(tree: HuffmanNode | null, codes: Map<string, string>): TreeAnalysis {
  const analysis: TreeAnalysis = {
    nodeCount: 0,
    height: 0,
    leafCount: 0,
    averageCodeLength: 0,
    compressionRatio: 0,
    internalNodes: 0,
  }

  if (!tree) return analysis

  function getHeight(node: HuffmanNode | null): number {
    if (!node) return 0
    return 1 + Math.max(getHeight(node.left), getHeight(node.right))
  }

  function traverse(node: HuffmanNode) {
    analysis.nodeCount++

    if (!node.left && !node.right) {
      analysis.leafCount++
    } else {
      analysis.internalNodes++
    }

    if (node.left) traverse(node.left)
    if (node.right) traverse(node.right)
  }

  traverse(tree)
  analysis.height = getHeight(tree)

  // Calculate average code length and compression ratio
  if (codes.size > 0) {
    let totalBits = 0
    let totalFrequency = 0
    
    for (const [char, code] of codes.entries()) {
      const node = findNode(tree, char)
      if (node) {
        totalBits += code.length * node.frequency
        totalFrequency += node.frequency
      }
    }

    analysis.averageCodeLength = totalBits / totalFrequency
    analysis.compressionRatio = (8 * totalFrequency) / totalBits
  }

  return analysis
}

function findNode(node: HuffmanNode | null, value: string): HuffmanNode | null {
  if (!node) return null
  if (node.value === value) return node
  return findNode(node.left, value) || findNode(node.right, value)
}

export function HuffmanAnalysis({ tree, codes }: { tree: HuffmanNode | null, codes: Map<string, string> }) {
  const analysis = analyzeTree(tree, codes)

  if (!tree) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No tree data available. Enter some text to build the Huffman tree.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Tree Structure</CardTitle>
          <CardDescription>Basic tree properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Total Nodes:</span>
            <span className="font-mono">{analysis.nodeCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Height:</span>
            <span className="font-mono">{analysis.height}</span>
          </div>
          <div className="flex justify-between">
            <span>Leaf Nodes:</span>
            <span className="font-mono">{analysis.leafCount}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compression Analysis</CardTitle>
          <CardDescription>Encoding efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Avg. Code Length:</span>
            <span className="font-mono">
              {analysis.averageCodeLength.toFixed(2)} bits
            </span>
          </div>
          <div className="flex justify-between">
            <span>Compression Ratio:</span>
            <span className="font-mono">
              {analysis.compressionRatio.toFixed(2)}x
            </span>
          </div>
          <div className="flex justify-between">
            <span>Space Saving:</span>
            <span className="font-mono">
              {((1 - 1/analysis.compressionRatio) * 100).toFixed(1)}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Code Distribution</CardTitle>
          <CardDescription>Character encoding details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Unique Chars:</span>
            <span className="font-mono">{codes.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Min Code Length:</span>
            <span className="font-mono">
              {Math.min(...Array.from(codes.values()).map(c => c.length))}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Max Code Length:</span>
            <span className="font-mono">
              {Math.max(...Array.from(codes.values()).map(c => c.length))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 