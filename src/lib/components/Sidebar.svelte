<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";
  import { onMount } from "svelte";
  import CollapsibleThreadList from "./CollapsibleThreadList.svelte";
  import type {
    SidebarChat,
    SidebarContext,
  } from "$lib/contexts/sidebar.svelte";

  type Props = {
    controller: AppController;
    context: SidebarContext;
  };

  let { controller, context }: Props = $props();

  onMount(async () => {
    await controller.initContext(context);
    await context.listen();
  });

  const groupByTicker = (
    chats: SidebarChat[]
  ): Record<string, SidebarChat[]> => {
    return chats.reduce(
      (acc, chat) => {
        if (!acc[chat.ticker]) {
          acc[chat.ticker] = [];
        }
        acc[chat.ticker].push(chat);
        return acc;
      },
      {} as Record<string, SidebarChat[]>
    );
  };

  let tickers = $derived(groupByTicker(context.chats))

</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h2 class="text-xl font-bold">Your Threads</h2>
</div>
<div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
  {#if Object.keys(tickers).length > 0}
    {#each Object.keys(tickers) as ticker}
      <CollapsibleThreadList {controller} {ticker} chats={tickers[ticker]} />
    {/each}
  {:else}
    <h3 class="p-2 text-xl font-bold">No pinned threads</h3>
  {/if}

  <div class="p-4">
    <button class="btn btn-ghost" onclick={() => controller.showTopics()}>
      Explore more...
    </button>
  </div>
</div>
