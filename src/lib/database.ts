import { field, option, variant } from "@dao-xyz/borsh";
import { Documents } from "@peerbit/document";
import { Program } from "@peerbit/program";
import { sha256Sync } from "@peerbit/crypto";
import { v4 as uuid } from "uuid";
import { concat } from "uint8arrays";

@variant(0)
export class Message {

    @field({ type: "string" })
    id: string;

    @field({ type: option("string") })
    name?: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    content: string;

    constructor(
        date: string,
        content: string,
        name?: string
    ) {
        this.id = uuid();
        this.name = name;
        this.date = date;
        this.content = content;
    }
}

@variant("chat")
export class Chat extends Program {

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
    content: string;

    @field({ type: Documents })
    messages: Documents<Message>;

    constructor(
        id: string,
        date: string,
        title: string,
        imageUrl: string,
        content: string,
        name?: string,
    ) {
        super();
        this.id = id;
        this.date = date;
        this.name = name;
        this.title = title;
        this.imageUrl = imageUrl;
        this.content = content;
        this.messages =
            new Documents<Message>({
                id: sha256Sync(
                    concat([
                        new TextEncoder().encode("chat"),
                        new TextEncoder().encode(this.id)
                    ])
                ),
            });

    }

    async open(): Promise<void> {
        await this.messages.open({
            type: Message,
        });
    }
}

@variant(0)
export class IndexableChat {

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

@variant("topic")
export class Topic extends Program {

    @field({ type: "string" })
    ticker: string;

    @field({ type: Documents })
    chats: Documents<Chat, IndexableChat>;

    constructor(
        ticker: string
    ) {
        super();
        this.ticker = ticker;
        this.chats =
            new Documents<Chat, IndexableChat>({
                id: sha256Sync(
                    concat([
                        new TextEncoder().encode("topic"),
                        new TextEncoder().encode(this.ticker)
                    ])
                )
            });
    }

    async open(): Promise<void> {
        await this.chats.open({
            type: Chat,
            index: {
                idProperty: "id",
                type: IndexableChat,
                transform: async (thread, _) => {
                    return new IndexableChat(
                        thread.id,
                        thread.date,
                        thread.imageUrl, 
                        thread.title, 
                        thread.content, 
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