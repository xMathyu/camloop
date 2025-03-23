import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, VideoOff, Users, Wifi, WifiOff } from "lucide-react";

interface VideoSectionProps {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  isStreaming: boolean;
  isConnected: boolean;
  connectionError: string | null;
  onStartVideo: () => void;
  onStopVideo: () => void;
  onFindPartner: () => void;
}

export const VideoSection = ({
  localVideoRef,
  remoteVideoRef,
  isStreaming,
  isConnected,
  connectionError,
  onStartVideo,
  onStopVideo,
  onFindPartner,
}: VideoSectionProps) => {
  return (
    <Card className="lg:w-3/4 flex flex-col border-2 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] group">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover bg-gradient-to-br from-blue-500/10 to-purple-500/10"
            />
            <div className="absolute bottom-4 left-4">
              <Badge
                variant={isStreaming ? "default" : "secondary"}
                className="px-4 py-1.5 text-sm font-medium shadow-md"
              >
                You
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] group">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            />
            <div className="absolute bottom-4 left-4">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium shadow-md"
              >
                Partner
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            {isConnected ? (
              <Badge
                variant="default"
                className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 shadow-md"
              >
                <Wifi className="h-4 w-4" />
                Connected
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="flex items-center gap-2 px-4 py-1.5 shadow-md"
              >
                <WifiOff className="h-4 w-4" />
                Disconnected
              </Badge>
            )}
            {connectionError && (
              <Badge
                variant="destructive"
                className="flex-1 px-4 py-1.5 shadow-md"
              >
                {connectionError}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant={isStreaming ? "destructive" : "default"}
              onClick={isStreaming ? onStopVideo : onStartVideo}
              className={`flex items-center gap-2 h-12 px-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                isStreaming
                  ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }`}
            >
              {isStreaming ? (
                <>
                  <VideoOff className="h-5 w-5" />
                  Stop Video
                </>
              ) : (
                <>
                  <Video className="h-5 w-5" />
                  Start Video
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={onFindPartner}
              disabled={!isStreaming}
              className="flex items-center gap-2 h-12 px-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
            >
              <Users className="h-5 w-5" />
              Find Partner
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
