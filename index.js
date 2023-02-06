import { getStatus, updateHeartBeat, liveStatus } from './apis.js';
import express from "express";

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    // res.end();
    next();
});
const port = 3000;

import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

app.get('/status', async (req, res) => {
    const userId = req.query?.userId;
    const status = await getStatus(userId);
    const now_time = new Date().getTime();
    const hb_time = Number(status);
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
    // res.addHeader('Access-Control-Allow-Origin', '*');
    console.log(res);
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