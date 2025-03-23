import { Button } from "@/components/ui/button";
import { Video, Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 font-semibold">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              CamLoop
            </span>
          </div>
          <nav>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
              asChild
            >
              <a
                href="https://github.com/xMathyu/camloop"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                <span className="hidden md:inline">View on GitHub</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
