"use client";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const features = [
  {
    title: "Stacks",
    description: "LIFO data structure with push and pop operations",
    image: "/ds-st.png",
    url: "/visualizer/stack"
  },
  {
    title: "Queues",
    description: "FIFO data structure with enqueue and dequeue operations",
    image: "/ds-q.png",
    url: "/visualizer/queue"
  },
  {
    title: "Linked Lists",
    description: "Linear data structure with elements linked using pointers",
    image: "/ds-ll.png",
    url: "/visualizer/linked-list"
  },
  {
    title: "Binary Search Trees",
    description: "Basic binary tree with BST properties",
    image: "/ds-bst.png",
    url: "/visualizer/binary-tree"
  },
  {
    title: "AVL Trees",
    description: "Self-balancing binary search tree with O(log n) time complexity for search, insert, and delete operations",
    image: "/ds-avl.png",
    url: "/visualizer/avl-tree"
  },
  {
    title: "Heaps",
    description: "Priority queue implemented using a binary tree with heap properties",
    image: "/ds-heap.png",
    url: "/visualizer/heap"
  },
  {
    title: "Infix to Postfix Conversion",
    description: "Visualize the conversion of infix expressions to postfix notation using a stack.",
    image: "/ds-infix-to-postfix.png",
    url: "/visualizer/stack-applications"
  },
  {
    title: "Message Queue System",
    description: "Use a message queue to simulate a producer-consumer system. Visualize message flow and queue operations.",
    image: "/ds-mq.png",
    url: "/visualizer/queue-applications"
  },
  {
    title: "Polynomial Multiplication",
    description: "See polynomial multiplication in action using linked list representation. Follow term-by-term multiplication steps.",
    image: "/ds-polynomial-multiplication.png",
    url: "/visualizer/polynomial"
  },
  {
    title: "Huffman Coding",
    description: "Huffman coding is a popular data compression technique that creates variable-length prefix codes based on the frequency of characters in the input text.",
    image: "/ds-huffman.png",
    url: "/visualizer/huffman"
  },
  {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm is a popular algorithm for finding the shortest path between nodes in a graph.",
    image: "/ds-dijkstra.png",
    url: "/visualizer/dijkstra"
  },
];

interface SelectedFeature {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Features</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Interactive Learning Tools
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Learn data structures and their applications through hands-on visualizations and real-world examples.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-2 cursor-pointer group"
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="relative aspect-video rounded-md overflow-hidden mb-2 ring-1 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedFeature?.title}
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {selectedFeature?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="relative aspect-video rounded-lg overflow-hidden my-4 border">
            {selectedFeature && (
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <DialogFooter className="sm:justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedFeature(null)}
            >
              Close Preview
            </Button>
            <Button asChild>
              <Link href={selectedFeature?.url ?? "#"} className="gap-2">
                Try it out <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};