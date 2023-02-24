import { getStatus, updateHeartBeat, liveStatus } from './apis.js';
import express from "express";

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
const port = 3000;

import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import { spawn } from 'child_process';
const io = new Server(server);

app.get('/status', (req, res) => {
    const userId = req.query?.userId;
    const status = getStatus(userId);
    res.send({
        status,
    });
});

app.post('/heartbeat', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const userId = req.query?.userId;
    const lastActivity = req?.params?.last_activity || req?.query?.last_activity;
    if (userId) {
        await updateHeartBeat(userId, lastActivity);
        res.send('updated successfully');
    } else
        res.send('heartbeat updating failed');
});

app.get('/live-status', async (req, res) => {
    const result = await liveStatus();
    res.send(result);
});

// app.listen(port, () => {
//     console.log(`Express app listening on port ${port}`)
// });

server.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.emit("foo", "bar");

    socket.onAny((event, ...args) => {
        console.log(`got event ${event}`, args);

    });
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
});