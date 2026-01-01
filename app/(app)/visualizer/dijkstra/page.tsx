"use client"

import { DijkstraVisualizer } from "@/components/visualizer/dijkstra/dijkstra-visualizer"

const content = `
# Dijkstra's Algorithm

Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights.

## How it Works

1. Initialize distances to all vertices as infinite except the source vertex (distance = 0)
2. Keep track of vertices in two sets: visited and unvisited
3. For the current vertex, consider all unvisited neighbors and calculate their distances
4. Mark the current vertex as visited and remove it from the unvisited set
5. If the destination vertex has been visited or the smallest distance among unvisited vertices is infinity, stop
6. Otherwise, set the unvisited vertex with the smallest distance as the current vertex and repeat step 3

## Features

- Finds shortest path between nodes in a graph
- Handles weighted edges
- Guarantees optimal solution for non-negative weights
- Widely used in routing and networking applications
`

export default function DijkstraPage() {
  return <DijkstraVisualizer content={content} />
} 