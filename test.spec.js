import { getStatus, updateHeartBeat } from './apis.js';


getStatus('user:1', client);
// updateHeartBeat('user:1', Date.now(), client);


const hb = await getStatus('user:1', client);
const now_time = new Date().getTime();
const hb_time = Number(hb);
console.log(now_time, hb_time);
const diff = (now_time - hb_time);
console.log(diff / 1000);
// await client.disconnect();


