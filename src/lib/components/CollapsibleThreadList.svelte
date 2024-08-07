<script lang="ts">
  import type { PinnedBoard } from "$lib/types";

  type Props = {
    board: PinnedBoard;
  };

  let { board }: Props = $props();

  let collapsed = $state(false);
</script>

<div class="max-w-md mx-auto">
  <button class="btn btn-ghost" onclick="{() => collapsed = !collapsed}">
    <h2 class="text-xl font-bold">{board.name}</h2>
  </button>
  {#if !collapsed}
    <div id="threads" class="p-4 rounded-b">
      {#each board.threads as thread}
        {#if thread.hasUnreadMessages}
          <button class="btn btn-link font-bold">{thread.name}</button>
        {:else}
          <button class="btn btn-link font-light">{thread.name}</button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
