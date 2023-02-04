import { createClient } from "@redis/client";

const config = {
    socket: {
        port: 6379,
        host: 'localhost'
    },
    database: 0
};

// const client = createClient();
const client = createClient();
client.on('error', (error) => console.error('Redis connection failed!', error));
await client.connect();
console.log(`Connected to Redis DB server ${config.socket.host}:${config.socket.port}`);

export default client;