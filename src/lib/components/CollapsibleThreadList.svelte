<script lang="ts">
  import type { SidebarChat } from "$lib/contexts/sidebar.svelte";
  import type { AppController } from "$lib/controller.svelte";
  import { topicNamesByTicker } from "$lib/static/topics";

  type Props = {
    controller: AppController,
    ticker: string;
    chats: SidebarChat[];
  };

  let { controller, ticker, chats }: Props = $props();

  let collapsed = $state(false);
</script>

<div class="max-w-md mx-auto">
  <button class="btn btn-ghost" onclick={() => (collapsed = !collapsed)}>
    <h2 class="text-xl font-bold">{topicNamesByTicker.get(ticker)}</h2>
  </button>
  {#if !collapsed}
    <div class="p-4 rounded-b">
      {#each chats as chat}
        <button
          onclick={async () => controller.openChat(chat.address)} 
          class="btn btn-link {chat.hasUnreadMessages
            ? 'font-bold'
            : 'font-light'}"
        >
          {chat.title}
        </button>
      {/each}
    </div>
  {/if}
</div>
