import { field, option, variant } from "@dao-xyz/borsh";
import { Program } from "@peerbit/program";
import { Documents } from "@peerbit/document";
import { v4 as uuid } from "uuid";
import { sha256Sync } from "@peerbit/crypto";
import { concat } from "uint8arrays";

@variant(0)
export class Reply {

    @field({ type: "string" })
    id: string;

    @field({ type: option("string") })
    name?: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    message: string;

    @field({ type: option("string") })
    imageUrl?: string;

    constructor(
        date: string,
        message: string,
        name?: string,
        imageUrl?: string
    ) {
        this.id = uuid();
        this.name = name;
        this.date = date;
        this.message = message;
        this.imageUrl = imageUrl;
    }

}

@variant("thread")
export class Thread extends Program {

    @field({ type: "string" })
    id: string;

    @field({ type: option("string") })
    name?: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    title: string;

    @field({ type: "string" })
    imageUrl: string;

    @field({ type: "string"})
    message: string;

    @field({ type: Documents })
    replies: Documents<Reply>;

    constructor(
        id: string,
        date: string,
        title: string,
        imageUrl: string,
        message: string,
        name?: string,
    ) {
        super();
        this.id = id;
        this.date = date;
        this.name = name;
        this.title = title;
        this.imageUrl = imageUrl;
        this.message = message;
        this.replies =
            new Documents<Reply>({
                id: sha256Sync(
                    concat([
                        new TextEncoder().encode("thread"),
                        new TextEncoder().encode(this.id)
                    ])
                ),
            });

    }

    async open(): Promise<void> {
        await this.replies.open({
            type: Reply,
        });
    }
}

@variant(0)
export class IndexableThread {

    @field({ type: "string" })
    id: string;

    @field({ type: option("string") })
    name?: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    imageUrl: string;

    @field({ type: "string" })
    title: string;

    @field({ type: "string"})
    message: string;

    @field({ type: "string" })
    address: string;

    constructor(
        id: string,
        date: string,
        imageUrl: string,
        title: string,
        message: string,
        address: string,
        name?: string,
    ) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.imageUrl = imageUrl;
        this.title = title;
        this.message = message;
        this.address = address;
    }
}

@variant("board")
export class Board extends Program {

    @field({ type: "string" })
    shortName: string;

    @field({ type: Documents })
    threads: Documents<Thread, IndexableThread>;

    constructor(
        shortName: string
    ) {
        super();
        this.shortName = shortName;
        this.threads =
            new Documents<Thread, IndexableThread>({
                id: sha256Sync(
                    concat([
                        new TextEncoder().encode("board"),
                        new TextEncoder().encode(this.shortName)
                    ])
                )
            });
    }

    async open(): Promise<void> {
        await this.threads.open({
            type: Thread,
            index: {
                idProperty: "id",
                type: IndexableThread,
                transform: async (thread, _) => {
                    return new IndexableThread(
                        thread.id,
                        thread.date,
                        thread.imageUrl, 
                        thread.title, 
                        thread.message, 
                        await thread.calculateAddress(),
                        thread.name
                    )
                }
            },
            canOpen: (thread) => {
                return true;
            }
        });
    }
}