export enum RoomState {
    NOT_STARTED = "NOT_STARTED",
    CHOOSING_WORD = "CHOOSING_WORD",
    DRAWING = "DRAWING",
    GUESSED = "GUESSED",
    TIMEUP = "TIMEUP",
    WINNER = "WINNER"
}

export interface PlayerData { 
    name : string,
    appearance : [number, number, number]
}

export interface Player {
    playerId : string,
    score : number, 
    guessed : boolean,
    guessedAt : Date | null
}

export interface GameState {
    currentRound : number, 
    drawingData : string[], //currently gave string[] but can be reviewed 
    guessedWords : string[],
    currentWord : string, 
    currentDrawer : number,
    hintLetters : GuessedLetter[],
    roomState : RoomState,
    startedAt : Date
}

export interface GuessedLetter {
    index : number,
    letter : string,
}

export interface Settings {
    maxPlayers : number,
    drawTime : number, 
    numberOfRounds : number,
    wordCount : number,
    hintInterval : number,
}

export interface Room { 
    roomId : string,
    roomCode : string,
    hostId : string,
    players : Player[],
    gameState : GameState,
    settings : Settings,
    isPrivate : boolean,
}