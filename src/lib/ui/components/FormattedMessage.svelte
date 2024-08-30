<script lang="ts">
  import { onMount } from 'svelte';
  
  export let content: string;
  export let messages: Array<{ messageIdentifier: string; content: string; identifier: string; date: string }>;

  let hoveredQuote: string | null = null;
  let hoverTimeout: ReturnType<typeof setTimeout>;
  let showPreview = false;

  function showQuotePreview(quote: string) {
    clearTimeout(hoverTimeout);
    hoveredQuote = quote;
    showPreview = true;
  }

  function hideQuotePreview() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      showPreview = false;
      hoveredQuote = null;
    }, 300);
  }

  onMount(() => {
    return () => clearTimeout(hoverTimeout);
  });

  $: quotedMessage = hoveredQuote 
    ? messages.find(m => m.messageIdentifier === hoveredQuote)
    : null;
</script>

<div class="break-words whitespace-pre-wrap">
  {#each content.split('\n') as line}
    {@const parts = line.split(/(>>[\S]+)/)}
    {#each parts as part, i}
      {#if part.startsWith('>>')}
        <button 
          class="text-blue-500 cursor-pointer hover:underline"
          onmouseenter={() => showQuotePreview(part.slice(2))}
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

{#if showPreview && quotedMessage}
  <div 
    class="fixed inset-0 flex items-center justify-center z-50"
    role="tooltip"
  >
    <div class="bg-base-200 p-4 rounded shadow-lg max-w-md" role="article">
      <div class="flex items-center mb-1">
        <span class="font-bold mr-2 font-mono">{quotedMessage.identifier}</span>
        <span class="text-xs opacity-50 font-mono">{quotedMessage.messageIdentifier}</span>
        <span class="mx-2">|</span>
        <time class="text-xs opacity-50 font-mono">
          {new Date(quotedMessage.date).toLocaleDateString()}
          {new Date(quotedMessage.date).toLocaleTimeString()}
        </time>
      </div>
      <p class="text-sm">{quotedMessage.content}</p>
    </div>
  </div>
{/if}
