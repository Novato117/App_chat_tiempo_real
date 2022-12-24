import express from "express"; /*Importamos nuestros modulos */
import morgan from "morgan"
import { Server as SocketServer } from "socket.io";
import htpp from 'http';
import cors from 'cors';

import { PORT } from "./config.js";

const app = express()
const server = htpp.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log(socket.id)
    console.log("user connected")

    socket.on('message', (message) => {
        console.log(message)
        socket.broadcast.emit("message", {
            body: message,
            from: socket.id,
        })
    })
})

server.listen(PORT)
console.log("Server started on port", PORT)