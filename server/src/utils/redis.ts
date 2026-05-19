import * as redis from "redis";
import { configDotenv } from "dotenv";
import { Room } from "../types";

configDotenv();

const client = redis.createClient({
    url : process.env.REDIS_URL
});

client.on('error', (err) => console.log(`Redis client error `, err));
client.connect().then(() => console.log(`Redis client connected`));

const ROOM_PREFIX = "room:";
const PUBLIC_ROOM_PREFIX = "publicRoom:";

export async function getRedisRoom(roomId: string): Promise<Room | null> {
  let data = await client.get(`${ROOM_PREFIX}${roomId}`);
  if (!data) data = await client.get(`${PUBLIC_ROOM_PREFIX}${roomId}`);
  return data ? JSON.parse(data) : null;
}

export async function setRedisRoom(roomId : string, roomData : Room){
    if(roomData.isPrivate){
        await client.set(
            `${ROOM_PREFIX}:${roomId}`, 
            JSON.stringify(roomData)
        );
    }
    else {
        await client.set(
            `${PUBLIC_ROOM_PREFIX}:${roomId}`,
            JSON.stringify(roomData)
        );
    }
}

export async function deleteRedisRoom(roomId: string) {
  const deletedPublic = await client.del(`${PUBLIC_ROOM_PREFIX}${roomId}`);
  if(deletedPublic == 0){
    await client.del(`${ROOM_PREFIX}${roomId}`);
  }
}   