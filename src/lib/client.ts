import { Peerbit } from "peerbit";
import { Board } from "./database";

let peer : Peerbit | null = null
let boards = new Map<string, Board>()

export async function getPeer() : Promise<Peerbit> {
    if (peer == null) {
        peer = await Peerbit.create();
    }
    return peer;
}

export async function getBoard(name: string) : Promise<Board> {
    if (boards.has(name)) {
        return boards.get(name)!
    }

    var peer = await getPeer();
    var board = await peer.open(new Board(name));

    boards.set(name, board);
    
    return board;
}