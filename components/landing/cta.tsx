import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MoveRight } from "lucide-react";

export const CTA = () => (
  <section className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-muted/50 to-muted p-16">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px] [mask-image:radial-gradient(white,transparent_85%)]" />
        
        <div className="relative flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore data structures through interactive visualizations and hands-on examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/home">
              <RainbowButton className="gap-4">
                Start Exploring <MoveRight className="w-4 h-4 ml-2" />
              </RainbowButton>
            </Link>
          </div>
        </div>

        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl" />
      </div>
    </div>
  </section>
); 