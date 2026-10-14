import { Server } from "socket.io";

let connections = {};
let messages = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://voxmeetfrontend.onrender.com",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (typeof path !== "string" || !path.trim()) {
        return;
      }
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      if (!connections[path].includes(socket.id)) {
        connections[path].push(socket.id);
      }

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path],
        );
      }

      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"],
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      const isSameRoom = Object.values(connections).some(
        (users) => users.includes(socket.id) && users.includes(toId),
      );

      if (isSameRoom) {
        io.to(toId).emit("signal", socket.id, message);
      }
    });

    socket.on("chat-message", (data, sender) => {
      if (typeof data !== "string" || !data.trim() || data.length > 2000) {
        return;
      }

      const safeSender =
        typeof sender === "string" ? sender.slice(0, 100) : "Anonymous";

      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }

          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: safeSender,
          data: data,
          "socket-id-sender": socket.id,
        });

        if (messages[matchingRoom].length > 100) {
          messages[matchingRoom].shift();
        }

        console.log("message", matchingRoom, ":", safeSender, data);

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, safeSender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [room, users] of Object.entries(connections)) {
        const index = users.indexOf(socket.id);

        if (index !== -1) {
          users.splice(index, 1);

          for (const userId of users) {
            io.to(userId).emit("user-left", socket.id);
          }

          if (users.length === 0) {
            delete connections[room];
            delete messages[room];
          }
        }
      }
    });
  });
  return io;
};
