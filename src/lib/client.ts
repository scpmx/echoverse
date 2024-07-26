import { Peerbit } from "peerbit";

let peer : Peerbit | null = null

export async function getPeer() : Promise<Peerbit> {
    if (peer == null) {
        peer = await Peerbit.create();
    }
    return peer;
}