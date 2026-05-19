// Three main routes to be made 
// 1. POST /api/rooms/create  ---  Create rooms while also specifying the settings 
// 2. GET  /api/rooms/  ---  Get a list of all public rooms available 
// 3. GET /api/rooms/${roomId}  ---  Get a single room with the given id 

import express from "express";

const roomRouter = express.Router();

// roomRouter.post("/create", ())