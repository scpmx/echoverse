<script lang="ts">
  import type { AppController } from "$lib/controller.svelte";
  import CollapsibleThreadList from "./CollapsibleThreadList.svelte";
  
  type Props = {
    controller: AppController
  }

  let { controller }: Props = $props();

</script>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h2 class="text-xl font-bold">Your Threads</h2>
</div>
<div class="flex-1 overflow-y-auto p-4 border-r border-base-300">
  <!-- {#if controller.sidebarContext.chats.length > 0}
    {#each controller.sidebarContext.chats as chat}
      <CollapsibleThreadList {chat} />
    {/each}
  {:else}
    <h3 class="p-2 text-xl font-bold">No pinned threads</h3>
  {/if} -->

  <div class="p-4">
    <button
      class="btn btn-ghost"
      onclick={() => controller.showTopics()}
    >
      Explore more...
    </button>
  </div>
</div>
