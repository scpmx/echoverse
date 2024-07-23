import { field, variant } from "@dao-xyz/borsh";
import { Program } from "@peerbit/program";
import { Documents, SearchRequest } from "@peerbit/document";
import { v4 as uuid } from "uuid";

@variant(0)
export class Post {
    
    @field({ type: "string" })
    id: string;

    @field({ type: "string" })
    message: string;

    constructor(message: string) {
        this.id = uuid();
        this.message = message;
    }
}

// This class extends Program which allows it to be replicated amongst peers
@variant("posts")
export class PostsDB extends Program {
    @field({ type: Documents })
    posts: Documents<Post>; // Documents<?> provide document store functionality around your Posts

    constructor() {
        super();
        this.posts = new Documents();
    }

    async open(): Promise<void> {
        // We need to setup the store in the setup hook
        // we can also modify properties of our store here, for example set access control
        await this.posts.open({
            type: Post
            // You can add more properties here, like
            /* canPerform: (entry) => true */
        });
    }
}
