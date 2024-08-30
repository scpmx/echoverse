<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let visible = false;
  export let x = 0;
  export let y = 0;

  const dispatch = createEventDispatcher();

  function handleAction(action: string) {
    dispatch('action', { action });
    visible = false;
  }
</script>

{#if visible}
  <div 
    class="fixed z-50 bg-base-200 shadow-lg rounded-lg p-2" 
    style="
      top: {y}px;
      {x > window.innerWidth - 200 ? `right: ${window.innerWidth - x}px` : `left: ${x}px`};
    "
  >
    <button class="block w-full text-left px-2 py-1 hover:bg-base-300 rounded" on:click={() => handleAction('copy')}>Copy</button>
    <button class="block w-full text-left px-2 py-1 hover:bg-base-300 rounded" on:click={() => handleAction('reply')}>Reply</button>
    <button class="block w-full text-left px-2 py-1 hover:bg-base-300 rounded" on:click={() => handleAction('delete')}>Delete</button>
  </div>
{/if}
