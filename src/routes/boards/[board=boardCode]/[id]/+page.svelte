<script lang="ts">

	import { getBoard, getPeer } from "$lib/client";
    import { page } from "$app/stores";
	import { Board, Thread as DBThread } from "$lib/database";
    import Thread from './Thread.svelte'
	import { SearchRequest, StringMatch } from "@peerbit/document";
	import ThreadNotFound from "./ThreadNotFound.svelte";

    async function getThread() : Promise<DBThread | undefined> {

        var board = await getBoard($page.params.board);

        var [thread] = await board.threads.index.search(new SearchRequest({
            query: [
                    new StringMatch({ key: "id", value: $page.params.id }),
                ],
        }));

        return thread;
    }

</script>

{#await getThread()}
    <p>Loading</p>
{:then thread}
    {#if thread}
        <Thread { thread } />
    {:else}
        <ThreadNotFound />
    {/if}
{:catch error}
    <p style="color: red;">thread:</p>
    <p style="color: red">{error.message}</p>
    <p>{console.log(error)}</p>
{/await}
