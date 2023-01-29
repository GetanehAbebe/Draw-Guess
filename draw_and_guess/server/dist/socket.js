"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
        SEND_GUESS: "SEND_GUESS",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
        BAD_GUESS: "BAD_GUESS",
        RIGHT_GUESS: "RIGHT_GUESS",
    },
};
var rooms = {};
function socket(_a) {
    var io = _a.io;
    console.info("Sockets enabled");
    io.on(EVENTS.connection, function (socket) {
        console.info("User connected ".concat(socket.id));
        socket.emit(EVENTS.SERVER.ROOMS, rooms);
        socket.on("send_message", function (data) {
            socket.broadcast.emit("recieve_message", data);
        });
        /*
         * When a user creates a new room
         */
        socket.on(EVENTS.CLIENT.CREATE_ROOM, function (_a) {
            var roomName = _a.roomName;
            // create a roomId
            var roomId = (0, uuid_1.v4)();
            // add a new room to the rooms object
            rooms[roomId] = {
                name: roomName,
                messages: [],
                roomId: roomId,
                word: "",
            };
            socket.join(roomId);
            // broadcast an event saying there is a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            // emit back to the room creator with all the rooms
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            // emit event back the room creator saying they have joined a room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, function (_a) {
            var roomId = _a.roomId, content = _a.content, contentType = _a.contentType, username = _a.username, _b = _a.word, word = _b === void 0 ? "" : _b;
            var date = new Date();
            rooms[roomId].word = word;
            socket.emit(EVENTS.SERVER.ROOM_MESSAGE, {
                roomId: roomId,
                content: content,
                contentType: contentType,
                username: username,
                messageId: (0, uuid_1.v4)(),
                sendTime: "".concat(date.getFullYear(), "-").concat(date.getHours(), ":").concat(date.getMinutes()),
                wordLength: word.length,
            });
        });
        /*
         * When a user joins a room
         */
        socket.on(EVENTS.CLIENT.JOIN_ROOM, function (roomId) {
            socket.join(roomId);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
        socket.on(EVENTS.CLIENT.SEND_GUESS, function (_a) {
            var roomId = _a.roomId, word = _a.word;
            if (rooms[roomId].word.toLocaleLowerCase() === word.toLocaleLowerCase()) {
                socket.emit(EVENTS.SERVER.RIGHT_GUESS, { roomId: roomId });
            }
            else {
                socket.emit(EVENTS.SERVER.BAD_GUESS);
            }
        });
    });
}
exports.default = socket;
