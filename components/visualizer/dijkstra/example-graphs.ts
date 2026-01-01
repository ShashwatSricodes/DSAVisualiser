export interface ExampleGraph {
  name: string
  description: string
  nodes: { id: string; x: number; y: number }[]
  edges: { source: string; target: string; weight: number }[]
  startNode: string
  endNode: string
}

export const exampleGraphs: ExampleGraph[] = [
  {
    name: "Simple Path",
    description: "A linear path with 4 nodes",
    nodes: [
      { id: "A", x: 100, y: 250 },
      { id: "B", x: 300, y: 250 },
      { id: "C", x: 500, y: 250 },
      { id: "D", x: 700, y: 250 },
    ],
    edges: [
      { source: "A", target: "B", weight: 4 },
      { source: "B", target: "C", weight: 3 },
      { source: "C", target: "D", weight: 5 },
    ],
    startNode: "A",
    endNode: "D",
  },
  {
    name: "Complex Network",
    description: "A network with multiple paths and nodes",
    nodes: [
      { id: "A", x: 200, y: 200 },
      { id: "B", x: 400, y: 100 },
      { id: "C", x: 400, y: 300 },
      { id: "D", x: 600, y: 100 },
      { id: "E", x: 600, y: 300 },
      { id: "F", x: 800, y: 200 },
    ],
    edges: [
      { source: "A", target: "B", weight: 4 },
      { source: "A", target: "C", weight: 5 },
      { source: "B", target: "C", weight: 11 },
      { source: "B", target: "D", weight: 9 },
      { source: "C", target: "E", weight: 3 },
      { source: "D", target: "E", weight: 13 },
      { source: "D", target: "F", weight: 2 },
      { source: "E", target: "F", weight: 6 },
    ],
    startNode: "A",
    endNode: "F",
  },
  {
    name: "Large Network",
    description: "A large network with multiple possible paths",
    nodes: [
      { id: "A", x: 100, y: 300 },  // Starting node
      { id: "B", x: 250, y: 200 },
      { id: "C", x: 250, y: 400 },
      { id: "D", x: 400, y: 150 },
      { id: "E", x: 400, y: 300 },
      { id: "F", x: 250, y: 500 },
      { id: "G", x: 550, y: 500 },
      { id: "H", x: 400, y: 400 },
      { id: "I", x: 550, y: 400 },
      { id: "J", x: 700, y: 400 },
      { id: "K", x: 550, y: 300 },
      { id: "L", x: 700, y: 200 },
      { id: "M", x: 550, y: 100 },
      { id: "N", x: 700, y: 500 },
      { id: "O", x: 850, y: 200 },
      { id: "P", x: 850, y: 300 },
    ],
    edges: [
      { source: "A", target: "B", weight: 5 },
      { source: "A", target: "C", weight: 5 },
      { source: "B", target: "D", weight: 3 },
      { source: "B", target: "C", weight: 4 },
      { source: "C", target: "E", weight: 7 },
      { source: "C", target: "H", weight: 8 },
      { source: "D", target: "M", weight: 14 },
      { source: "D", target: "L", weight: 13 },
      { source: "D", target: "K", weight: 16 },
      { source: "E", target: "F", weight: 4 },
      { source: "F", target: "G", weight: 9 },
      { source: "G", target: "N", weight: 12 },
      { source: "H", target: "I", weight: 3 },
      { source: "I", target: "J", weight: 4 },
      { source: "J", target: "N", weight: 3 },
      { source: "K", target: "P", weight: 4 },
      { source: "L", target: "O", weight: 4 },
      { source: "M", target: "O", weight: 5 },
      { source: "N", target: "P", weight: 7 },
      { source: "O", target: "P", weight: 8 },
    ],
    startNode: "A",
    endNode: "P",
  },
] 