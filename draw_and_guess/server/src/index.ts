import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SERVER_PORT, SERVER_HOST } from "./config";
import socket from "./socket";
import cors from "cors";
const app = express();

const httpServer = createServer(app);

app.use(
  cors({
    origin: ["https://draw-guess-brown.vercel.app"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: ["*", "https://draw-guess-brown.vercel.app"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
  allowEIO3: true,
});

app.get("/", (_, res) =>
  res.send(`Server is up and running version, ${SERVER_HOST} `)
);

httpServer.listen(SERVER_PORT, +SERVER_HOST, () => {
  console.log(`server started on port ${SERVER_PORT}`);
  socket({ io });
});
