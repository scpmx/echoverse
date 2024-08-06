<script lang="ts">
  import type { ActiveThreadsPerBoard } from "$lib/types";

  type Props = {
    activeThreads: ActiveThreadsPerBoard;
  };

  let { activeThreads }: Props = $props();

  let collapsed = $state(false);
</script>

<div class="max-w-md mx-auto">
  <button class="btn btn-ghost" onclick="{() => collapsed = !collapsed}">
    <h2 class="text-xl font-bold">{activeThreads.board}</h2>
  </button>
  {#if !collapsed}
    <div id="threads" class="p-4 rounded-b">
      {#each activeThreads.threads as thread}
        {#if thread.hasUnreadMessages}
          <button class="btn btn-link font-bold">{thread.name}</button>
        {:else}
          <button class="btn btn-link font-light">{thread.name}</button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
