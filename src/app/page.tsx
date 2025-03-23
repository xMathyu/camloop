import { ClientVideoChat } from "@/components/ClientVideoChat";

export default function Home() {
  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <ClientVideoChat />
      </div>
    </div>
  );
}
