<script lang="ts">

    import { Board, IndexableThread, Thread } from "$lib/database";
	import { SearchRequest } from "@peerbit/document";
    import { page } from "$app/stores";
	import { onDestroy } from "svelte";
	import NewThread from "./NewThread.svelte";

    type Props = {
        board: Board
    }

    let { board }: Props = $props();

    let threads = $state<IndexableThread[]>([]);

    board.threads.index
        .search(new SearchRequest())
        .then(ts => threads.push(...ts));

    board.threads.events.addEventListener("change", x => {
        threads.push(...x.detail.added)
    })

    onDestroy(() => {
        board.close();
    });

</script>

<div class="bg-gray-100 h-full">

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {#each threads as thread}
            <a href="/boards/{$page.params["board"]}/{thread.address}" class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="{thread.imageUrl}" alt="" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold">{thread.title}</h3>
                    <p class="mt-2 text-gray-600">{thread.message}</p>
                </div>
            </a>
        {/each}

      </div>
    </div>
</div>


<NewThread { board } />
