import { Server } from "socket.io";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_APP_URL || "https://camloop.onrender.com"
          : "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("offer", (offer) => {
      console.log("Received offer from:", socket.id);
      socket.broadcast.emit("offer", offer);
    });

    socket.on("answer", (answer) => {
      console.log("Received answer from:", socket.id);
      socket.broadcast.emit("answer", answer);
    });

    socket.on("ice-candidate", (candidate) => {
      console.log("Received ICE candidate from:", socket.id);
      socket.broadcast.emit("ice-candidate", candidate);
    });

    socket.on("chat-message", (message) => {
      console.log("Received chat message from:", socket.id);
      socket.broadcast.emit("chat-message", {
        ...message,
        sender: "partner",
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, "Reason:", reason);
    });
  });

  const PORT = process.env.PORT ?? 3001;
  server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
    console.log(
      `CORS enabled for ${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_APP_URL || "https://camloop.onrender.com"
          : "http://localhost:3000"
      }`
    );
  });
});
