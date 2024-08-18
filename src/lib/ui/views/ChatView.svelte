<script lang="ts">
  import type { ChatContext } from "$lib/contexts/chat.svelte";
  import type { AppController } from "$lib/controller.svelte";
  import { onMount } from "svelte";
  
  type Props = {
    controller: AppController,
    chat: ChatContext
  };

  let { controller, chat }: Props = $props();

  let input = $state("");

</script>

<svelte:head>
  <title>/{chat.ticker}/ {chat.title}</title>
</svelte:head>

<div class="p-4 bg-base-200 border-b border-base-300">
  <h1 class="text-xl font-bold">{chat.title}</h1>
</div>
<main class="relative flex-1 overflow-y-auto">
  <div class="flex flex-col h-full">
    <div class="flex-grow overflow-y-scroll">
      {#each chat.messages as message}
        <div class="chat {message.fromSelf ? 'chat-end' : 'chat-start'}">
          <div class="chat-header">
            {message.name}
            <time class="text-xs opacity-50">{message.date.toLocaleTimeString()}</time>
          </div>
          <div class="chat-bubble">
            <div class="max-w-96">
              {message.content}
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex items-center p-4 rounded-lg shadow">
      <textarea
        class="flex-1 resize-nonep-2 rounded-lg border focus:outline-none focus:ring-2"
        placeholder="Type your reply..."
        bind:value={input}
      ></textarea>
      <button
        class="btn btn-accent m-4"
        onclick={async () => chat.addMessage(input, "Anonymous") }
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