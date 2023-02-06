import client from "./connection.js";
const SET_NAME = 'online-offline'

const getStatus = async (userId) => {
    return await client.hGet(SET_NAME, userId);
}

const updateHeartBeat = async (userId, value) => {
    return await client.hSet(SET_NAME, userId, value);
}

const liveStatus = async () => {
    return await client.hGetAll(SET_NAME);
}

export {
    getStatus,
    updateHeartBeat,
    liveStatus
}