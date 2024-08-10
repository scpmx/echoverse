<script lang="ts">
  import CollapsibleThreadList from "$lib/components/CollapsibleThreadList.svelte";
  import { pinnedBoards } from "$lib/state.svelte";
  import type { Peerbit } from "peerbit";
  import CatalogView from "./CatalogView.svelte";
  import ChatView from "./ChatView.svelte";
  import BoardsView from "./BoardsView.svelte";
  import { navigation } from "$lib/navigation.svelte";

  type Props = {
    peer: Peerbit;
  };

  let { peer }: Props = $props();

</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <div class="p-4 bg-base-200 border-b border-base-300">
      <h2 class="text-xl font-bold">Your Threads</h2>
    </div>
    <div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
      {#each pinnedBoards as board}
        <CollapsibleThreadList {board} />
      {/each}
      <div class="p-4">
        <button class="btn btn-ghost" onclick={() => navigation.navigate({ route: "catalogs" })}>
          Explore more...
        </button>
        <button class="btn btn-ghost" onclick={() => {}}>
            Go Back
        </button>
      </div>
    </div>
  </div>
  <div class="flex-1 flex flex-col">
    {#if navigation.current.route == "chat"}
      <ChatView id={navigation.current.id} />
    {:else if navigation.current.route == "catalog"}
      <CatalogView ticker={navigation.current.ticker} />
    {:else if navigation.current.route == "catalogs"}
      <BoardsView />
    {/if}
  </div>
</div>
