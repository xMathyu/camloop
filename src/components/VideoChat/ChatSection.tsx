import { ChatSectionProps } from "@/types/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { ChangeEvent } from "react";

export const ChatSection = ({
  chatInputRef,
  chatMessagesRef,
  messages,
  newMessage,
  username,
  onNewMessageChange,
  onSendMessage,
}: ChatSectionProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onNewMessageChange(e.target.value);
  };

  return (
    <Card className="lg:w-1/4 min-w-[300px] flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea ref={chatMessagesRef} className="h-[500px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender !== "me" && (
                    <Avatar>
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {message.sender === "me" ? username : "Partner"}
                    </div>
                    <div className="text-sm mt-1">{message.text}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  {message.sender === "me" && (
                    <Avatar>
                      <AvatarFallback>
                        {username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-3">
        <form onSubmit={onSendMessage} className="flex w-full gap-2">
          <Input
            ref={chatInputRef}
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
