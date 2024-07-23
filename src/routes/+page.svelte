<script lang="ts">

    import { Peerbit } from "peerbit";
    import { PostsDB, Post } from '$lib/database'
    import { SearchRequest } from "@peerbit/document";

    async function init() {
        var peer = await Peerbit.create();

        const store = await peer.open(new PostsDB());

        await store.posts.put(new Post("hello world"));
        await store.posts.put(new Post("goodbye world"));

        const responses: Post[] = await store.posts.index.search(
            new SearchRequest({
                query: []
            }),
            {
                local: true,
                remote: true
            }
        );

        return responses;
    }

</script>

{#await init()}
    <p>loading...</p>
{:then x}
    {#each x as post}
        <p>{post.id}</p>
        <p>{post.message}</p>
    {/each}
{/await}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
