"use client"

import * as React from "react"
import Link from "next/link"
import { BrainCircuit, Github } from "lucide-react"
import { ModeToggle } from "@/components/global/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Data Structures",
    href: "/visualizer/binary-tree",
    description: "Interactive visualizations of common data structures"
  },
  {
    title: "Algorithms",
    href: "/algorithms",
    description: "Step-by-step algorithm animations"
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn about data structures and algorithms"
  }
]

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/60 backdrop-blur-lg border-b">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          <span className="font-semibold">Data Structure Visualizer</span>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-transparent text-sm text-muted-foreground hover:text-foreground"
                    )}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild size="sm" variant="ghost">
            <Link
              href="https://github.com/yourusername/data-structure-visualizer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
        
      </div>
    </header>
  )
}