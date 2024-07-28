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

    @field({ type: "string" })
    name: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    message: string;

    @field({ type: option("string") })
    imageUrl?: string;

    constructor(
        name: string,
        date: string,
        message: string,
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
        title: string,
        imageUrl: string,
        message: string
    ) {
        super();
        this.id = id;
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
            type: Reply
        });
    }
}

@variant("board")
export class Board extends Program {

    @field({ type: "string" })
    shortName: string;

    @field({ type: Documents })
    threads: Documents<Thread>;

    constructor(
        shortName: string
    ) {
        super();
        this.shortName = shortName;
        this.threads =
            new Documents<Thread>({
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
            type: Thread
        });
    }
}