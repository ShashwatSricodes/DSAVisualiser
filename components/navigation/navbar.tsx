"use client";
import { BrainCircuit, Github, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/global/mode-toggle";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
  url: string;
}

const routeList: RouteProps[] = [
  {
    href: "/visualizer",
    label: "Dashboard",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Stacks",
    description: "Learn stacks, queues, and linked lists through interactive visualizations.",
    url: "/visualizer/stack"
  },
  {
    title: "Queues",
    description: "Learn queues, stacks, and linked lists through interactive visualizations.",
    url: "/visualizer/queue"
  },
  {
    title: "Linked Lists",
    description: "Learn linked lists, stacks, and queues through interactive visualizations.",
    url: "/visualizer/linked-list"
  },
  {
    title: "Binary Search Trees",
    description: "Learn binary search trees, stacks, and queues through interactive visualizations.",
    url: "/visualizer/binary-tree"
  },
  {
    title: "AVL Trees",
    description: "Learn AVL trees, stacks, and queues through interactive visualizations.",
    url: "/visualizer/avl-tree"
  },
  {
    title: "Heaps",
    description: "Learn heaps, stacks, and queues through interactive visualizations.",
    url: "/visualizer/heap"
  },
  {
    title: "Infix to Postfix",
    description: "Learn how to convert infix expressions to postfix notation using a stack.",
    url: "/visualizer/stack-applications"
  },
  {
    title: "Message Queue",
    description: "Learn how to use a message queue to simulate a producer-consumer system.",
    url: "/visualizer/queue-applications"
  },
  {
    title: "Polynomial Multiplication",
    description: "Learn how to multiply polynomials using a stack.",
    url: "/visualizer/polynomial"
  },
  {
    title: "Huffman Coding",
    description: "Learn how to encode and decode messages using a Huffman tree.",
    url: "/visualizer/huffman"
  },
  {
    title: "Dijkstra's Algorithm",
    description: "Learn how to find the shortest path between nodes in a graph using Dijkstra's algorithm.",
    url: "/visualizer/dijkstra"
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card/60 backdrop-blur-md">
      <Link href="/" className="font-bold text-lg flex items-center">
        <BrainCircuit className="h-6 w-6 mr-2" />
        DS Visualizer
      </Link>

      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <BrainCircuit className="h-6 w-6 mr-2" />
                    DS Visualizer
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="secondary"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <ModeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Data Structures
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                {featureList.map(({ title, description, url }) => (
                  <NavigationMenuLink key={title} asChild>
                    <Link href={url}>
                      <li key={title} className="rounded-md p-3 hover:bg-muted">
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          {title}
                    </p>
                    <p className="line-clamp-2 text-muted-foreground">
                      {description}
                        </p>
                      </li>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex items-center gap-2">
        <ModeToggle />
        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/yourusername/ds-visualizer"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};