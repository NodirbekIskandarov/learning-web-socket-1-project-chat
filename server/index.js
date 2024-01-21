const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    // socket.on("send_message", (data) => {
    //     socket.broadcast.emit("receive_message", data)
    // })

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
})

server.listen(3001, () => {
    console.log("server is running")
})


// server.js

// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const rooms = {};

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("join_room", ({ room, signalData }) => {
//     if (!rooms[room]) {
//       rooms[room] = [socket.id];
//     } else if (rooms[room].length === 1) {
//       rooms[room].push(socket.id);
//       const otherUser = rooms[room][0];
//       io.to(otherUser).emit("receive_signal", { signalData, callerID: socket.id });
//     } else {
//       // Room is full
//       socket.emit("room_full");
//     }

//     socket.join(room);
//   });

//   socket.on("send_message", (data) => {
//     io.to(data.room).emit("receive_message", { message: data.message });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//     for (const room in rooms) {
//       const index = rooms[room].indexOf(socket.id);
//       if (index !== -1) {
//         rooms[room].splice(index, 1);
//         if (rooms[room].length === 0) {
//           delete rooms[room];
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
