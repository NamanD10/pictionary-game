import { nanoid, customAlphabet } from "nanoid";

console.log("Hello from index.ts");
const code = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
const roomId = nanoid(8);    
const roomCode = code();

