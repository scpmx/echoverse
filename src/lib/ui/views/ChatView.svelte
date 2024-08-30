<script lang="ts">
  import type { ChatContext } from "$lib/contexts/chat.svelte";
  import type { AppController } from "$lib/controller.svelte";
  import MessageContentPreview from "../components/MessageContentPreview.svelte";
      
  type Props = {
    controller: AppController,
    chat: ChatContext
  };

  let { controller, chat }: Props = $props();

  let input = $state("");

  let messageContainer: HTMLDivElement;

  function scrollToBottom() {
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  $effect(() => {
    if (chat.messages.length) {
      scrollToBottom();
    }
  });

  function extractUrls(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }
  
</script>

<svelte:head>
  <title>/{chat.ticker}/ {chat.title}</title>
</svelte:head>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">{chat.title}</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div class="flex flex-col h-full">
    <div class="flex-grow overflow-y-scroll" bind:this={messageContainer}>
      <!-- Chat content and image -->
      <div class="p-2 bg-base-100">
        <div class="flex items-center mb-1">
          <span class="font-bold mr-2">{chat.identifier}</span>
          <span class="text-xs opacity-50">{chat.messageIdentifier}</span>
          <span class="mx-2">|</span>
          <time class="text-xs opacity-50">{new Date(chat.date).toLocaleDateString()} {new Date(chat.date).toLocaleTimeString()}</time>
        </div>
        <MessageContentPreview url={chat.imageUrl} />
        <p class="mt-4 whitespace-pre-wrap">{chat.content}</p>
      </div>
      
      <!-- Messages -->
      {#each chat.messages as message}
        <div class="flex flex-col p-2">
          <div class="flex items-center mb-1">
            <span class="font-bold mr-2">{message.identifier}</span>
            <span class="text-xs opacity-50">{message.messageIdentifier}</span>
            <span class="mx-2">|</span>
            <time class="text-xs opacity-50">{message.date.toLocaleDateString()} {message.date.toLocaleTimeString()}</time>
          </div>
          <div class="break-words whitespace-pre-wrap">
            {#each message.content.split('\n') as line}
              {#if line.startsWith('>')}
                <span class="text-green-500">{line}</span><br>
              {:else}
                {line}<br>
              {/if}
            {/each}
          </div>
        </div>
        {#each extractUrls(message.content) as url}
          <div class="p-2 {message.fromSelf ? 'bg-base-200' : 'bg-base-100'}">
            <MessageContentPreview {url} />
          </div>
        {/each}
      {/each}
    </div>
    <div class="flex items-center p-4 rounded-lg shadow">
      <textarea
        class="flex-1 resize-none p-2 rounded-lg border focus:outline-none focus:ring-2"
        placeholder="Type your reply..."
        bind:value={input}
        rows="3"
      ></textarea>
      <button
        class="btn btn-accent m-4"
        onclick={async () => {
          chat.addMessage(input);
          input = '';
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  </div>
</main>