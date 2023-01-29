"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var config_1 = require("./config");
var socket_1 = __importDefault(require("./socket"));
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
app.get("/", function (_, res) { return res.send("Server is up and running version "); });
httpServer.listen(config_1.SERVER_PORT, +config_1.SERVER_HOST, function () {
    console.log("server started on port ".concat(config_1.SERVER_PORT));
    (0, socket_1.default)({ io: io });
});
