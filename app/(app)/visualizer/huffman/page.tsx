import { HuffmanVisualizer } from "@/components/visualizer/huffman/huffman-visualizer"

const content = `
# Huffman Coding

Huffman coding is a popular data compression technique that creates variable-length prefix codes based on the frequency of characters in the input text.

## How it Works

1. Calculate frequency of each character in the input text
2. Create a priority queue of nodes, each containing a character and its frequency
3. Repeatedly merge the two nodes with lowest frequencies until only one node remains
4. Traverse the resulting tree to assign binary codes (0 for left, 1 for right)

## Features

- Variable-length prefix codes
- Optimal compression for given character frequencies
- Guaranteed unique decodability
- Lossless compression

## Example

For the text "hello", the process would be:
- Count frequencies: h(1), e(1), l(2), o(1)
- Build tree by merging lowest frequency nodes
- Assign codes: h(00), e(01), l(1), o(11)
`

export default function HuffmanPage() {
  return <HuffmanVisualizer content={content} />
} 