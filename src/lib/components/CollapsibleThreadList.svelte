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
      <ul>
        <!-- TODO: Display thread image -->
        {#each activeThreads.threads as thread}
          {#if thread.hasUnreadMessages}
            <li class="font-bold mb-2 ml-4">{thread.name}*</li>
          {:else}
            <li class="font-light mb-2 ml-4">{thread.name}</li>
          {/if} 
        {/each}
      </ul>
    </div>
  {/if}
</div>
