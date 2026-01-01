"use client"

import { BinaryTreeControls } from "./binary-tree-controls"
import { BinaryTreeDisplay } from "./binary-tree-display"
import { BinaryTreeAnalysis } from "./binary-tree-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useBinaryTree } from "@/hooks/use-binary-tree"

interface BinaryTreeVisualizerProps {
  content: React.ReactNode
}

export function BinaryTreeVisualizer({ content }: BinaryTreeVisualizerProps) {
  const { 
    tree, 
    highlightedNodes, 
    insert, 
    inorderTraversal, 
    preorderTraversal, 
    postorderTraversal, 
    clear,
    isAnimating,
    traversalHistory
  } = useBinaryTree()

  const handleTraversal = async (type: "inorder" | "preorder" | "postorder") => {
    switch (type) {
      case "inorder":
        await inorderTraversal()
        break
      case "preorder":
        await preorderTraversal()
        break
      case "postorder":
        await postorderTraversal()
        break
    }
  }

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <BinaryTreeControls 
                onInsert={insert}
                onClear={clear}
                onTraversal={handleTraversal}
                isAnimating={isAnimating}
                traversalHistory={traversalHistory}
              />
            </div>
            <div className="xl:col-span-2">
              <BinaryTreeDisplay 
                tree={tree}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <BinaryTreeAnalysis tree={tree} />
        </TabsContent>
        
        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}