import client from "./connection.js";

const getStatus = async (userId) => {
    return await client.GET(userId);
}

const updateHeartBeat = async (userId, value) => {
    return await client.SET(userId, value);
}

export {
    getStatus,
    updateHeartBeat
}