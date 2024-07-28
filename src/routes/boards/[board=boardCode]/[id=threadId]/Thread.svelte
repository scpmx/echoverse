<script lang="ts">

	import { Post, PostsDB } from "$lib/database";
	import type { Peerbit } from "peerbit";
	import Reply from "./Reply.svelte";
	import { SearchRequest } from "@peerbit/document";

    type Props = {
        peer: Peerbit
    }

    var { peer }: Props = $props();

    async function init() {

        var sdf = await peer.open(new PostsDB());

        await sdf.posts.put(new Post("hello world"));

        return await sdf.posts.index.search(new SearchRequest());

    }

</script>

{#await init()}
    <p>loading</p>
{:then address}
    <p>{address.map(x => x.message)}</p>
    <div class="bg-gray-100 text-gray-800">
        <div class="container mx-auto p-4">
            <div class="bg-white shadow-md rounded-lg p-4 mb-4">
                <div class="flex">
                    <img src="https://i.imgur.com/W33X57A.jpeg" alt="Thread" class="w-64 h-64 object-cover mr-4" />
                    <div>
                        <h1 class="text-2xl font-bold mb-2">Thread Title</h1>
                        <p class="text-gray-700">
                            Thread description goes here. It can be a brief overview of the thread's topic or
                            discussion. Thread description goes here. It can be a brief overview of the thread's topic or
                            discussion. Thread description goes here. It can be a brief overview of the thread's topic or
                            discussion. Thread description goes here. It can be a brief overview of the thread's topic or
                            discussion. Thread description goes here.
                        </p>
                    </div>
                </div>
            </div>
    
            <!-- Replies -->
            {#each Array.from({length: 20}, (_, x) => x) as _}
                <Reply imageUrl="https://i.imgur.com/3nH7AWk.png" 
                       name="Annoymous"
                       postDate="07/25/2024 15:30"
                       postId="No.123456789"
                       message="Reply content goes here. This is the message left by the user in response to the thread." />
            {/each}
    
        </div>
    </div>    
{/await}


