"use client"

import { ModeToggle } from "@/components/global/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

const routes = {
  "/": {
    name: "Home",
    path: "/home",
  },
  "/visualizer": {
    name: "Visualizer",
    path: "/visualizer",
  },
  "/visualizer/stack": {
    name: "Stack",
    path: "/visualizer/stack",
  },
  "/visualizer/queue": {
    name: "Queue",
    path: "/visualizer/queue",
  },
  "/visualizer/stack-applications": {
    name: "Infix to Postfix",
    path: "/visualizer/stack-applications",
  },
  "/visualizer/queue-applications": {
    name: "Message Queue",
    path: "/visualizer/queue-applications",
  },
  "/visualizer/linked-list": {
    name: "Linked List",
    path: "/visualizer/linked-list",
  },
  "/visualizer/polynomial": {
    name: "Polynomial Multiplication",
    path: "/visualizer/polynomial",
  },
  "/visualizer/binary-tree": {
    name: "Binary Tree",
    path: "/visualizer/binary-tree",
  },
  "/visualizer/avl-tree": {
    name: "AVL Tree",
    path: "/visualizer/avl-tree",
  },
  "/visualizer/heap": {
    name: "Heap",
    path: "/visualizer/heap",
  },
  "/visualizer/huffman": {
    name: "Huffman Coding",
    path: "/visualizer/huffman",
  },
  "/visualizer/dijkstra": {
    name: "Dijkstra's Algorithm",
    path: "/visualizer/dijkstra",
  },
}

export function Breadcrumbs({ 
  action 
}: { 
  action?: React.ReactNode 
}) {
  const pathname = usePathname()
  
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const items = []
    let currentPath = ""
    
    // Always add home
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
    )

    // Add intermediate segments
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const route = routes[currentPath as keyof typeof routes]
      
      if (route) {
        items.push(<BreadcrumbSeparator key={`separator-${index}`} />)
        
        if (index === segments.length - 1) {
          // Last segment - show as current page
          items.push(
            <BreadcrumbItem key={currentPath}>
              <BreadcrumbPage>{route.name}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        } else {
          // Intermediate segment - show as link
          items.push(
            <BreadcrumbItem key={currentPath}>
              <BreadcrumbLink href={route.path}>{route.name}</BreadcrumbLink>
            </BreadcrumbItem>
          )
        }
      }
    })

    return items
  }

  return (
    <header className="flex h-20 shrink-0 sticky top-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {getBreadcrumbs()}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-4">
          {action}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 