"use client"

import { BinaryTreeNode } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface TreeAnalysis {
  nodeCount: number
  height: number
  leafCount: number
  isBalanced: boolean
  isBST: boolean
  minValue: number | null
  maxValue: number | null
  internalNodes: number
  fullNodes: number
}

function analyzeTree(tree: BinaryTreeNode | null): TreeAnalysis {
  const analysis: TreeAnalysis = {
    nodeCount: 0,
    height: 0,
    leafCount: 0,
    isBalanced: true,
    isBST: true,
    minValue: null,
    maxValue: null,
    internalNodes: 0,
    fullNodes: 0,
  }

  if (!tree) return analysis

  // Helper function to check if BST
  function isBSTUtil(node: BinaryTreeNode | null, min: number, max: number): boolean {
    if (!node) return true

    if (node.value <= min || node.value >= max) return false

    return isBSTUtil(node.left, min, node.value) && 
           isBSTUtil(node.right, node.value, max)
  }

  // Helper function to get height
  function getHeight(node: BinaryTreeNode | null): number {
    if (!node) return 0
    return 1 + Math.max(getHeight(node.left), getHeight(node.right))
  }

  // Helper function to check balance
  function checkBalance(node: BinaryTreeNode | null): number {
    if (!node) return 0

    const leftHeight = checkBalance(node.left)
    if (leftHeight === -1) return -1

    const rightHeight = checkBalance(node.right)
    if (rightHeight === -1) return -1

    if (Math.abs(leftHeight - rightHeight) > 1) return -1

    return Math.max(leftHeight, rightHeight) + 1
  }

  // Traverse tree to collect data
  function traverse(node: BinaryTreeNode) {
    analysis.nodeCount++

    if (!node.left && !node.right) {
      analysis.leafCount++
    } else {
      analysis.internalNodes++
      if (node.left && node.right) {
        analysis.fullNodes++
      }
    }

    if (analysis.minValue === null || node.value < analysis.minValue) {
      analysis.minValue = node.value
    }
    if (analysis.maxValue === null || node.value > analysis.maxValue) {
      analysis.maxValue = node.value
    }

    if (node.left) traverse(node.left)
    if (node.right) traverse(node.right)
  }

  traverse(tree)
  analysis.height = getHeight(tree)
  analysis.isBalanced = checkBalance(tree) !== -1
  analysis.isBST = isBSTUtil(tree, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

  return analysis
}

export function BinaryTreeAnalysis({ tree }: { tree: BinaryTreeNode | null }) {
  const analysis = analyzeTree(tree)

  if (!tree) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No tree data available. Insert some nodes to see the analysis.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Properties</CardTitle>
          <CardDescription>Core tree characteristics</CardDescription>
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
          <CardTitle>Structure Analysis</CardTitle>
          <CardDescription>Tree organization details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Internal Nodes:</span>
            <span className="font-mono">{analysis.internalNodes}</span>
          </div>
          <div className="flex justify-between">
            <span>Full Nodes:</span>
            <span className="font-mono">{analysis.fullNodes}</span>
          </div>
          <div className="flex justify-between">
            <span>Is Balanced:</span>
            <span className={analysis.isBalanced ? "text-green-500" : "text-red-500"}>
              {analysis.isBalanced ? "Yes" : "No"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>BST Properties</CardTitle>
          <CardDescription>Binary Search Tree validation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Is Valid BST:</span>
            <span className={analysis.isBST ? "text-green-500" : "text-red-500"}>
              {analysis.isBST ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Min Value:</span>
            <span className="font-mono">{analysis.minValue}</span>
          </div>
          <div className="flex justify-between">
            <span>Max Value:</span>
            <span className="font-mono">{analysis.maxValue}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 