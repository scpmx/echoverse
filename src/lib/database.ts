import { field, option, variant } from "@dao-xyz/borsh";
import { Documents } from "@peerbit/document";
import { Program } from "@peerbit/program";
import { PublicSignKey, sha256Sync } from "@peerbit/crypto";
import { v4 as uuid } from "uuid";
import { concat } from "uint8arrays";

@variant(0)
export class Message {

    @field({ type: "string" })
    id: string;

    @field({ type: PublicSignKey })
    from: PublicSignKey;

    @field({ type: option("string") })
    name?: string;

    @field({ type: "string" })
    date: string;

    @field({ type: "string" })
    content: string;

    constructor(
        from: PublicSignKey,
        date: string,
        content: string,
        name?: string
    ) {
        this.id = uuid();
        this.from = from;
        this.name = name;
        this.date = date;
        this.content = content;
    }
}

@variant("chat")
export class Chat extends Program {

    @field({ type: "string" })
    id: string;

    @field({ type: PublicSignKey })
    creator: PublicSignKey;

    @field({ type: "string" })
    ticker: string;

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
        creator: PublicSignKey,
        ticker: string,
        date: string,
        title: string,
        imageUrl: string,
        content: string,
        name?: string,
    ) {
        super();
        this.id = id;
        this.creator = creator;
        this.ticker = ticker;
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

    @field({ type: PublicSignKey })
    creator: PublicSignKey;

    @field({ type: "string" })
    ticker: string;

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
        creator: PublicSignKey,
        ticker: string,
        date: string,
        imageUrl: string,
        title: string,
        message: string,
        address: string,
        name?: string,
    ) {
        this.id = id;
        this.creator = creator;
        this.ticker = ticker;
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

    @field({ type: "string" })
    name: string;

    @field({ type: Documents })
    chats: Documents<Chat, IndexableChat>;

    constructor(
        ticker: string,
        name: string
    ) {
        super();
        this.ticker = ticker;
        this.name = name;
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
                        thread.creator,
                        thread.ticker,
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

@variant(0)
export class PinnedChat {

    @field({ type: "string" })
    id: string;

    @field({ type: "string" })
    ticker: string;

    @field({ type: "string" })
    title: string;

    @field({ type: "string" })
    address: string;

    constructor(
        ticker: string,
        title: string,
        address: string
    ) {
        this.id = uuid();
        this.ticker = ticker;
        this.title = title;
        this.address = address;
    }
}

@variant("sidebar")
export class Sidebar extends Program {

    @field({ type: PublicSignKey })
    owner: PublicSignKey;

    @field({ type: Documents })
    chats: Documents<PinnedChat>;

    constructor(
        owner: PublicSignKey
    ) {
        super();
        this.owner = owner;
        this.chats = new Documents<PinnedChat>({
            id: sha256Sync(
                concat([
                    new TextEncoder().encode("sidebar"),
                    owner.bytes
                ])
            )
        });
    }

    async open(): Promise<void> {
        await this.chats.open({
            type: PinnedChat
        });
    }
}