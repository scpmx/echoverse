import { field, variant } from "@dao-xyz/borsh";
import { Documents, SearchRequest } from "@peerbit/document";
import { Program } from "@peerbit/program";
import { sha256Sync } from "@peerbit/crypto";
import { v4 as uuid } from "uuid";

export class SimpleDocument {
    @field({ type: "string" })
    id: string;

    @field({ type: "string" })
    content: string;

    constructor(properties: { content: string }) {
        this.id = uuid();
        this.content = properties.content;
    }
}

@variant("example-store")
export class ExampleStore extends Program {
    @field({ type: Documents })
    documents: Documents<SimpleDocument>;

    constructor() {
        super();
        this.documents = new Documents({
            id: sha256Sync(new TextEncoder().encode("example-store")),
        });
    }

    async open(args?: any): Promise<void> {
        await this.documents.open({
            type: SimpleDocument,
        });
    }
}