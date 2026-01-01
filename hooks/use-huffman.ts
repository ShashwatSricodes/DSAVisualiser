import { useState } from 'react'
import { HuffmanNode, HuffmanStep } from '@/components/visualizer/huffman/types'

let nodeIdCounter = 0

export function useHuffman() {
  const [tree, setTree] = useState<HuffmanNode | null>(null)
  const [steps, setSteps] = useState<HuffmanStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [codes, setCodes] = useState<Map<string, string>>(new Map())
  const [isAnimating, setIsAnimating] = useState(false)
  const [originalText, setOriginalText] = useState("")
  const [frequencies, setFrequencies] = useState<Map<string, number>>(new Map())

  const getFrequencies = (text: string): Map<string, number> => {
    const frequencies = new Map<string, number>()
    for (const char of text) {
      frequencies.set(char, (frequencies.get(char) || 0) + 1)
    }
    return frequencies
  }

  const createNode = (value: string, frequency: number): HuffmanNode => ({
    id: `node-${nodeIdCounter++}`,
    value,
    frequency,
    left: null,
    right: null,
  })

  const buildHuffmanTree = async (text: string) => {
    if (!text.trim() || isAnimating) return
    setIsAnimating(true)
    nodeIdCounter = 0
    setSteps([])
    setCurrentStep(-1)
    setCodes(new Map())
    setOriginalText(text)

    // Get character frequencies
    const freqs = getFrequencies(text)
    setFrequencies(freqs)
    const leafNodes = Array.from(freqs.entries()).map(([char, freq]) => 
      createNode(char, freq)
    )

    // Create priority queue
    let priorityQueue = [...leafNodes].sort((a, b) => a.frequency - b.frequency)
    let allNodes = [...leafNodes]
    
    // Initial state
    setSteps([{
      type: 'BUILD_QUEUE',
      nodes: allNodes,
      priorityQueue: [...priorityQueue],
      message: 'Initial nodes with frequencies',
      highlightedNodes: allNodes.map(n => n.id)
    }])

    // Build tree step by step
    while (priorityQueue.length > 1) {
      const left = priorityQueue.shift()!
      const right = priorityQueue.shift()!

      // Highlight nodes being merged
      setSteps(prev => [...prev, {
        type: 'MERGE_NODES',
        nodes: allNodes,
        priorityQueue: [...priorityQueue],
        message: `Selecting nodes with frequencies ${left.frequency} and ${right.frequency}`,
        highlightedNodes: [left.id, right.id]
      }])

      const parent = createNode(
        `${left.frequency + right.frequency}`,
        left.frequency + right.frequency
      )
      parent.left = left
      parent.right = right
      allNodes.push(parent)

      // Insert new node in correct position
      let i = 0
      while (i < priorityQueue.length && 
             priorityQueue[i].frequency < parent.frequency) {
        i++
      }
      priorityQueue.splice(i, 0, parent)

      // Show merged result
      setSteps(prev => [...prev, {
        type: 'MERGE_NODES',
        nodes: allNodes,
        priorityQueue: [...priorityQueue],
        message: `Created new node with frequency ${parent.frequency}`,
        highlightedNodes: [parent.id]
      }])
    }

    const root = priorityQueue[0]
    setTree(root)

    // Generate codes step by step
    const newCodes = new Map<string, string>()
    const assignCodes = (node: HuffmanNode, code: string = '') => {
      if (!node.left && !node.right) {
        newCodes.set(node.value, code)
        node.code = code
        setSteps(prev => [...prev, {
          type: 'ASSIGN_CODES',
          nodes: allNodes,
          priorityQueue: [],
          message: `Assigning code ${code} to character '${node.value}'`,
          highlightedNodes: [node.id],
          codes: new Map(newCodes)
        }])
      }
      if (node.left) {
        setSteps(prev => [...prev, {
          type: 'ASSIGN_CODES',
          nodes: allNodes,
          priorityQueue: [],
          message: `Going left (0) from ${node.frequency}`,
          highlightedNodes: [node.id, node.left?.id || ''],
          codes: new Map(newCodes)
        }])
        assignCodes(node.left, code + '0')
      }
      if (node.right) {
        setSteps(prev => [...prev, {
          type: 'ASSIGN_CODES',
          nodes: allNodes,
          priorityQueue: [],
          message: `Going right (1) from ${node.frequency}`,
          highlightedNodes: [node.id, node.right?.id || ''],
          codes: new Map(newCodes)
        }])
        assignCodes(node.right, code + '1')
      }
    }
    assignCodes(root)

    setCodes(newCodes)
    setCurrentStep(0)
    setHighlightedNodes(steps[0]?.highlightedNodes || [])
    setIsAnimating(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      const step = steps[currentStep + 1]
      setHighlightedNodes(step.highlightedNodes)
      if (step.codes) {
        setCodes(step.codes)
      }
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      const step = steps[currentStep - 1]
      setHighlightedNodes(step.highlightedNodes)
      if (step.codes) {
        setCodes(step.codes)
      }
    }
  }

  const reset = () => {
    setTree(null)
    setSteps([])
    setCurrentStep(-1)
    setHighlightedNodes([])
    setCodes(new Map())
    setOriginalText("")
    setFrequencies(new Map())
    nodeIdCounter = 0
  }

  return {
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
    frequencies,
  }
} 