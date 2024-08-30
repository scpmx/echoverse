<script lang="ts">
  import { onMount } from 'svelte';
  
  export let content: string;
  export let messages: Array<{ messageIdentifier: string; content: string }>;

  let hoveredQuote: string | null = null;
  let previewElement: HTMLDivElement;
  let hoverTimeout: ReturnType<typeof setTimeout>;

  function showQuotePreview(quote: string, event: MouseEvent) {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredQuote = quote;
      if (previewElement) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        previewElement.style.left = `${rect.left}px`;
        previewElement.style.top = `${rect.bottom + 5}px`;
      }
    }, 300); // 300ms delay before showing preview
  }

  function hideQuotePreview() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredQuote = null;
    }, 300); // 300ms delay before hiding preview
  }

  onMount(() => {
    return () => clearTimeout(hoverTimeout);
  });

  $: quotedMessage = hoveredQuote 
    ? messages.find(m => m.messageIdentifier === hoveredQuote)?.content 
    : null;
</script>

<div class="break-words whitespace-pre-wrap">
  {#each content.split('\n') as line}
    {@const parts = line.split(/(>>[\S]+)/)}
    {#each parts as part, i}
      {#if part.startsWith('>>')}
        <button 
          class="text-blue-500 cursor-pointer hover:underline"
          onmouseenter={(e) => showQuotePreview(part.slice(2), e)}
          onmouseleave={hideQuotePreview}
        >
          {part}
        </button>
      {:else if part.startsWith('>')}
        <span class="text-green-500">{part}</span>
      {:else}
        {part}
      {/if}
    {/each}
    <br>
  {/each}
</div>

{#if hoveredQuote && quotedMessage}
  <div 
    bind:this={previewElement}
    class="fixed bg-base-200 p-2 rounded shadow-lg max-w-md z-50"
    onmouseenter={() => clearTimeout(hoverTimeout)}
    onmouseleave={hideQuotePreview}
    role="article"
  >
    <p class="text-sm">{quotedMessage}</p>
  </div>
{/if}
