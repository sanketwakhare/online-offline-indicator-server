import { getStatus, updateHeartBeat } from './apis.js';
import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

app.get('/status', async (req, res) => {
    const userId = req.query?.userId;
    const status = await getStatus(userId);
    const now_time = new Date().getTime();
    const hb_time = Number(status);
    const diff = (now_time - hb_time);
    // const lastActiveTimeInMils = Math.ceil(diff);
    // const lastActiveTimeInSeconds = Math.ceil(lastActiveTimeInMils / 1000);
    // const lastActiveTimeInMinutes = lastActiveTimeInSeconds / 60;
    // const lastActiveTimeInHours = lastActiveTimeInMinutes / 60;
    res.send({
        status,
        // lastActiveTimeInMils,
        // lastActiveTimeInSeconds,
        // lastActiveTimeInMinutes,
        // lastActiveTimeInHours
    });
});

app.post('/heartbeat', async (req, res) => {
    const userId = req.query?.userId;
    const lastActivity = req?.body?.last_activity;
    if (userId) {
        await updateHeartBeat(userId, lastActivity);
        res.send('updated successfully');
    } else
        res.send('heartbeat updating failed');
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})
