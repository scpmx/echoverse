<script lang="ts">
  import type { SidebarChat } from "$lib/controller.svelte";


  type Props = {
    chat: SidebarChat;
  };

  let { chat }: Props = $props();

  let collapsed = $state(false);
</script>

<div class="max-w-md mx-auto">
  <button class="btn btn-ghost" onclick={() => (collapsed = !collapsed)}>
    <h2 class="text-xl font-bold">{chat.ticker}</h2>
  </button>
  {#if !collapsed}
    <div class="p-4 rounded-b">
      <p>Chat here</p>
      <!-- {#each chat. as chat}
        <button
          class="btn btn-link {chat.hasUnreadMessages
            ? 'font-bold'
            : 'font-light'}">
            {chat.title}
        </button> -->
      <!-- {/each} -->
    </div>
  {/if}
</div>
