import { nanoid, customAlphabet } from "nanoid";
import { Room, RoomState, Settings } from "../types";
import { Request, Response } from "express";
import { Socket } from "socket.io";
import { setRedisRoom } from "../utils/redis";

export async function createEmptyRoom (socket : Socket, isPrivate : boolean, settings : Settings){

    const code = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
    const roomId = nanoid(8);    
    const roomCode = code();

    const room : Room = {
        roomId, 
        roomCode,
        hostId : socket.id,
        players : [],
        gameState : {
            currentRound : 0, 
            drawingData : [], //currently gave string but can be reviewed 
            guessedWords : [],
            currentWord : "", 
            currentDrawer : 0,
            hintLetters : [],
            roomState : RoomState.NOT_STARTED,
            startedAt : new Date()
        },
        settings : settings,
        isPrivate : isPrivate
    };

    await setRedisRoom(room.roomId, room);
    return roomId;
}
