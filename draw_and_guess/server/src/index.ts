import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SERVER_PORT, SERVER_HOST } from "./config";
import socket from "./socket";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.get("/", (_, res) =>
  res.send(`Server is up and running version `)
);

httpServer.listen(SERVER_PORT, +SERVER_HOST, () => {
    console.log(`server started on port ${SERVER_PORT}`, )
  socket({ io });
});