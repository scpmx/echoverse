import type { Peerbit } from "peerbit";

export interface IContext {
    open(peer: Peerbit): Promise<void>
}