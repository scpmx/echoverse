<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";
  import { onMount } from "svelte";
  import type { SidebarContext } from "$lib/contexts/sidebar.svelte";
  import CollapsibleThreadList from "../components/CollapsibleThreadList.svelte";

  type Props = {
    controller: AppController;
    context: SidebarContext;
  };

  let { controller, context }: Props = $props();

  onMount(async () => {
    await controller.initContext(context);
    await context.listen();
  });
</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h2 class="text-xl font-bold">Your Threads</h2>
</div>
<div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
  {#if Object.keys(context.tickers).length > 0}
    {#each Object.keys(context.tickers) as ticker}
      <CollapsibleThreadList
        {controller}
        {ticker}
        chats={context.tickers[ticker]}
      />
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
