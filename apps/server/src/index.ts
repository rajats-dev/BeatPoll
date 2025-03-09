import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend domain
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
  },
});

initSocket(io);
export { io };

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
