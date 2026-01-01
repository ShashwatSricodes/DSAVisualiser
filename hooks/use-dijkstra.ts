import { useState, useEffect } from 'react'
import { exampleGraphs } from "@/components/visualizer/dijkstra/example-graphs"

export interface Node {
  id: string
  x: number
  y: number
}

export interface Edge {
  source: string
  target: string
  weight: number
}

export interface Graph {
  nodes: Node[]
  edges: Edge[]
}

interface Step {
  currentNode: string | null
  distances: Map<string, number>
  visited: Set<string>
  path: string[]
  message: string
}

export function useDijkstra() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] })
  const [startNodeId, setStartNodeId] = useState<string | null>(null)
  const [endNodeId, setEndNodeId] = useState<string | null>(null)
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const [distances, setDistances] = useState<Map<string, number>>(new Map())
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set())
  const [path, setPath] = useState<string[]>([])
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)

  const addNode = (x: number, y: number) => {
    const id = `node-${graph.nodes.length}`
    setGraph(prev => ({
      ...prev,
      nodes: [...prev.nodes, { id, x, y }]
    }))
  }

  const addEdge = (source: string, target: string, weight: number) => {
    setGraph(prev => ({
      ...prev,
      edges: [
        ...prev.edges,
        { source, target, weight },
        // Add reverse edge automatically
        { source: target, target: source, weight }
      ]
    }))
  }

  const setStartNode = (nodeId: string) => {
    if (graph.nodes.find(n => n.id === nodeId)) {
      setStartNodeId(nodeId)
    }
  }

  const setEndNode = (nodeId: string) => {
    if (graph.nodes.find(n => n.id === nodeId)) {
      setEndNodeId(nodeId)
    }
  }

  const findShortestPath = async () => {
    console.log("Starting pathfinding:", { startNodeId, endNodeId, isAnimating })
    
    if (!startNodeId || !endNodeId || isAnimating) {
      console.log("Cannot find path:", { startNodeId, endNodeId, isAnimating })
      return
    }

    setIsAnimating(true)
    
    // Initialize
    const distances = new Map<string, number>()
    const previous = new Map<string, string>()
    const unvisited = new Set(graph.nodes.map(n => n.id))
    
    // IMPORTANT: Set start node distance to 0 first!
    distances.set(startNodeId, 0)
    
    // Then set all other distances to Infinity
    graph.nodes.forEach(node => {
      if (node.id !== startNodeId) {
        distances.set(node.id, Infinity)
      }
    })

    console.log("Initial distances:", Object.fromEntries(distances))

    const steps: Step[] = []
    
    // Add initial step
    steps.push({
      currentNode: startNodeId,
      distances: new Map(distances),
      visited: new Set([startNodeId]),
      path: [startNodeId],
      message: `Starting from node ${startNodeId}`
    })

    let current: string | null = startNodeId
    
    while (unvisited.size > 0 && current) {
      const currentDistance = distances.get(current) || Infinity
      console.log(`Processing node ${current} with distance ${currentDistance}`)

      // Mark as visited
      unvisited.delete(current)
      const visited = new Set(graph.nodes.map(n => n.id).filter(id => !unvisited.has(id)))

      if (current === endNodeId) {
        console.log("Found end node!")
        break
      }

      // Update distances to all unvisited neighbors
      const neighbors = graph.edges
        .filter(e => e.source === current || e.target === current)
        .map(e => ({
          node: e.source === current ? e.target : e.source,
          weight: e.weight
        }))

      console.log("Checking neighbors:", neighbors)

      for (const { node: neighbor, weight } of neighbors) {
        if (unvisited.has(neighbor)) {
          const newDistance = (distances.get(current) || 0) + weight
          const currentDistance = distances.get(neighbor) || Infinity
          
          if (newDistance < currentDistance) {
            console.log(`Updating distance to ${neighbor}: ${currentDistance} -> ${newDistance}`)
            distances.set(neighbor, newDistance)
            previous.set(neighbor, current)
          }
        }
      }

      // Find next unvisited node with minimum distance
      let minDistance = Infinity
      let nextNode: string | null = null
      
      for (const nodeId of unvisited) {
        const distance = distances.get(nodeId) || Infinity
        if (distance < minDistance) {
          minDistance = distance
          nextNode = nodeId
        }
      }

      // Record this step
      const currentPath: string[] = []
      let pathNode: string | null = current
      while (pathNode) {
        currentPath.unshift(pathNode)
        pathNode = previous.get(pathNode) || null
      }

      steps.push({
        currentNode: current,
        distances: new Map(distances),
        visited,
        path: currentPath,
        message: `Visited ${current}, updated distances to neighbors`
      })

      current = nextNode // Move to next node
    }

    // Add final path step if we found the end node
    if (distances.get(endNodeId) !== Infinity) {
      const finalPath: string[] = []
      let pathNode: string | null = endNodeId
      while (pathNode) {
        finalPath.unshift(pathNode)
        pathNode = previous.get(pathNode) || null
      }

      steps.push({
        currentNode: endNodeId,
        distances: new Map(distances),
        visited: new Set(graph.nodes.map(n => n.id).filter(id => !unvisited.has(id))),
        path: finalPath,
        message: `Found shortest path with distance ${distances.get(endNodeId)}`
      })
    }

    console.log("Final distances:", Object.fromEntries(distances))
    console.log("Final steps:", steps)
    
    setSteps(steps)
    setCurrentStep(0)
    
    // Apply the first step immediately
    if (steps.length > 0) {
      const firstStep = steps[0]
      setCurrentNode(firstStep.currentNode)
      setDistances(firstStep.distances)
      setVisitedNodes(firstStep.visited)
      setPath(firstStep.path)
    }
    
    setIsAnimating(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = steps[currentStep + 1]
      setCurrentStep(prev => prev + 1)
      setCurrentNode(nextStep.currentNode)
      setDistances(nextStep.distances)
      setVisitedNodes(nextStep.visited)
      setPath(nextStep.path)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      const prevStep = steps[currentStep - 1]
      setCurrentStep(prev => prev - 1)
      setCurrentNode(prevStep.currentNode)
      setDistances(prevStep.distances)
      setVisitedNodes(prevStep.visited)
      setPath(prevStep.path)
    }
  }

  const clear = () => {
    setGraph({ nodes: [], edges: [] })
    setStartNodeId(null)
    setEndNodeId(null)
    setCurrentNode(null)
    setDistances(new Map())
    setVisitedNodes(new Set())
    setPath([])
    setSteps([])
    setCurrentStep(-1)
    setIsAnimating(false)
  }

  const loadExample = (index: number) => {
    const example = exampleGraphs[index]
    if (!example) return

    // Set up the graph
    setGraph({
      nodes: example.nodes,
      edges: example.edges,
    })

    // Set up initial distances
    const initialDistances = new Map<string, number>()
    example.nodes.forEach(node => {
      initialDistances.set(node.id, node.id === example.startNode ? 0 : Infinity)
    })

    // Set up initial state
    setStartNodeId(example.startNode)
    setEndNodeId(example.endNode)
    setCurrentNode(example.startNode) // Set current node to start node
    setDistances(initialDistances)
    setVisitedNodes(new Set([example.startNode])) // Add start node to visited
    setPath([example.startNode]) // Initialize path with start node
    
    // Create initial step
    const initialStep: Step = {
      currentNode: example.startNode,
      distances: initialDistances,
      visited: new Set([example.startNode]),
      path: [example.startNode],
      message: `Starting from node ${example.startNode}`
    }
    
    setSteps([initialStep])
    setCurrentStep(0)
    setIsAnimating(false)
  }

  const startAutoPlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0)
    }
    setIsAutoPlaying(true)
  }

  const stopAutoPlay = () => {
    setIsAutoPlaying(false)
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
      setAutoPlayInterval(null)
    }
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            stopAutoPlay()
            return prev
          }
          const nextStep = steps[prev + 1]
          setCurrentNode(nextStep.currentNode)
          setDistances(nextStep.distances)
          setVisitedNodes(nextStep.visited)
          setPath(nextStep.path)
          return prev + 1
        })
      }, 1000) // Adjust speed as needed
      setAutoPlayInterval(interval)
    }
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
      }
    }
  }, [isAutoPlaying, steps.length])

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay()
    } else {
      startAutoPlay()
    }
  }

  return {
    graph,
    distances,
    path,
    currentNode,
    visitedNodes,
    isAnimating,
    addNode,
    addEdge,
    setStartNode,
    setEndNode,
    findShortestPath,
    clear,
    nextStep,
    previousStep,
    currentStep,
    totalSteps: steps.length,
    loadExample,
    startNodeId,
    endNodeId,
    isAutoPlaying,
    toggleAutoPlay,
  }
} 