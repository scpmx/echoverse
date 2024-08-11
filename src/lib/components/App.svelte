<script lang="ts">
  import type { Peerbit } from "peerbit";
  import CatalogView from "./CatalogView.svelte";
  import ChatView from "./ChatView.svelte";
  import BoardsView from "./BoardsView.svelte";
  import { navigation } from "$lib/navigation.svelte";
  import Sidebar from "./Sidebar.svelte";
  
  type Props = {
    peer: Peerbit;
  };

  let { peer }: Props = $props();

</script>

<div class="flex h-screen">
  <div class="w-96 flex-col hidden md:flex">
    <Sidebar />
  </div>
  <div class="flex-1 flex flex-col">
    {#if navigation.current.route == "chat"}
      <ChatView id={navigation.current.id} />
    {:else if navigation.current.route == "catalog"}
      <CatalogView {peer} ticker={navigation.current.ticker} />
    {:else if navigation.current.route == "boards"}
      <BoardsView />
    {/if}
  </div>
</div>
