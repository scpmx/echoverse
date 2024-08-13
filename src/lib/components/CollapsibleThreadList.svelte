<script lang="ts">
  // import { navigation } from "$lib/navigation.svelte";
  import type { PinnedBoard } from "$lib/sidebar.svelte";

  type Props = {
    board: PinnedBoard;
  };

  let { board }: Props = $props();

  let collapsed = $state(false);
</script>

<div class="max-w-md mx-auto">
  <button class="btn btn-ghost" onclick={() => (collapsed = !collapsed)}>
    <h2 class="text-xl font-bold">{board.name}</h2>
  </button>
  {#if !collapsed}
    <div class="p-4 rounded-b">
      {#each board.chats as chat}
        <button
          class="btn btn-link {chat.hasUnreadMessages
            ? 'font-bold'
            : 'font-light'}">
            {chat.title}
        </button>
      {/each}
    </div>
  {/if}
</div>
