import { UsernameFormProps } from "@/types/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Video, UserCircle } from "lucide-react";
import { ChangeEvent } from "react";

export const UsernameForm = ({
  username,
  setUsername,
  onSubmit,
}: UsernameFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <Card className="w-full max-w-md relative border-2 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="space-y-6 pb-2">
          <div className="mx-auto bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Video className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to CamLoop
            </h2>
            <p className="text-sm text-muted-foreground font-normal">
              Connect with others through video chat
            </p>
          </CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit} className="px-2">
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="username"
                className="text-base font-medium pl-1 inline-flex items-center gap-2"
              >
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                Choose your username
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter your username..."
                  className="w-full h-12 transition-all duration-300 border-2 rounded-xl bg-background/50 focus-visible:ring-offset-2 pl-4 pr-4 text-base"
                  autoFocus
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-8 px-8">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 rounded-xl text-base font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100"
              disabled={!username.trim()}
            >
              Join Chat
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
